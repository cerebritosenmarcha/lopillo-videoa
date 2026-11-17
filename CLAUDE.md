# ¡Lo Pillo! — motor de producción de vídeos

Este repositorio produce los vídeos de **¡Lo Pillo!** (Instagram @lopillociencia, YouTube @lopillo, TikTok). Una tarea programada abre una sesión nueva cada día que sigue este documento para crear un vídeo y dejarlo en Metricool pendiente de aprobación.

## La marca

- **Promesa:** «Lo que nadie te explica, en 60 segundos». Curiosidades, mitos, noticias, dinero, ciencia y salud, explicados tan fácil que el espectador diga «¡lo pillo!».
- **Público:** general, 16–45 años, España.
- **Tono:** cercano, alegre, con intriga. Nunca alarmista ni con bulos.
- **Idioma:** español de España.

## El estilo de vídeo (decidido con el dueño, no cambiar sin que lo pida)

1. **Vertical 1080×1920, 30 fps. Duración: entre 50 y 60 s por lo general, y nunca más de 1 min 5 s (65 s).** El vídeo 001 dura 75 s porque se hizo antes de esta regla.
2. **El protagonista de la pantalla es el objeto real del que habla el narrador en ese momento.** Si dice «banco», se ve un edificio de banco; si dice «coche», un coche que circula. No formas geométricas abstractas. Cuando la frase cambia de tema, cambia la figura principal (unas 25–30 escenas por vídeo).
3. **Cada objeto actúa** según la frase: la caja fuerte se abre vacía, los billetes salen volando, el banco se derrumba, la gente corre al cajero…
4. **Complementos** (iconos 3D pequeños alrededor): **pocos**, unos 10–12 por vídeo, solo donde añaden intriga o emoción (pánico, rumor, caída, límite…). Nunca repiten el objeto principal. Se controlan con el conjunto `KEEP` de `build.py`.
5. **Look:** fondo casi negro, foco de luz cálida sobre cada escena, colores muy vivos solo en lo importante (dorado para el dinero, azul eléctrico, fucsia, rojo para el peligro). El dueño quiere ir variando colores: cambia la paleta cuando lo pida.
6. **Cámara siempre en movimiento** (giro o acercamiento), destello y «whoosh» en cada cambio de escena, pequeño golpe de cámara en los datos fuertes.
7. **Texto:** subtítulo de **una palabra** cada vez (palabras clave en amarillo), cifras grandes arriba en los datos clave, fuente pequeña abajo en los datos de salud, dinero y noticias.
8. **Gancho en el primer segundo:** una afirmación que choca o una cifra imposible (no una pregunta genérica). Bucle abierto en los primeros 10 s.
9. **Cierre:** pregunta para comentarios, «¿Lo pillas?» con el átomo, y la última frase enlaza con la primera para que el vídeo haga bucle.
10. **Sonido:** música suave generada por `engine/audio.py` (sin derechos de autor) que baja sola cuando habla el narrador, «whoosh» en los cambios, golpe suave en los datos y «clin» en el momento bombilla.

## La voz

- Voz del **Narrador** en ElevenLabs (ID en `assets/voces.json`, clave `narrador`): chico de unos 24 años, alegre y simpático.
- Modelo `eleven_v3`, después acelerado un **25 %** (`TEMPO = 1.25` en `tts.py`). El narrador va rápido y con frases densas.
- La clave de ElevenLabs la inyecta el proxy del entorno: no hace falta ni se debe escribir en ningún archivo.
- Guion: frases cortas, como se habla («Tranquilo, que te lo explico»), muchas cosas concretas por frase para que haya figuras que mostrar. Con `eleven_v3` + 25 % de velocidad salen unos 21 caracteres por segundo: apunta a **1.050–1.250 caracteres** (50–60 s) y **nunca más de 1.380** (65 s). Comprueba la duración real que imprime `tts.py`; si pasa de 65 s, recorta el guion y vuelve a generar la voz.

## Rigor (obligatorio)

- **Cada dato se comprueba en internet** antes de grabar la voz: abre al menos dos fuentes fiables (organismos oficiales, medios serios, estudios). Nada de cifras de memoria.
- **Salud:** nunca diagnósticos, dosis ni tratamientos; siempre fuente y «no sustituye la consulta médica».
- **Dinero:** «contenido divulgativo, no es asesoramiento financiero».
- Anota las fuentes con su enlace en `videos/NNN-slug/fuentes.md` y resúmelas en el texto de la publicación.

## Cómo se hace un vídeo

1. **Elige el tema:** el primero de la «Cola de producción» de `temas.md` que no esté en `publicados.md`. Respeta el orden; la reserva solo cuando la cola se acabe.
2. Crea `videos/NNN-slug/` copiando de `videos/001-banco-panico/` (es la referencia de calidad).
3. **Investiga** y escribe `fuentes.md`.
4. **Guion** en `tts.py` (lista `SEG`, una entrada por bloque) y ejecuta `python3 tts.py` → `voz.mp3` y `align.json`.
5. **Plan de escenas** en `build.py` (lista `SC`: bloque, primeras palabras de la frase, nombre de escena), los `cues` de cifras, el conjunto `KEEP` de complementos y la lista `ding` (momentos del «clin» de bombilla, normalmente la revelación principal) que se guarda en `timeline.json`.
6. **Escenas:** copia `engine/scene_lib.html` como `scene.html` y describe las escenas en `build.py` con `engine/build_lib.py` (`make(ICON, KEEP, SCENES, CUES, PUNCH, DING)`; mira `videos/003-alarma/build.py` como ejemplo). Tipos disponibles: `icon` (cualquiera de los más de 7.000 iconos de `@mdi/svg` en 3D), `phone`, `clock`, `calendar`, `flag`, `mri`, `crowd`, `people`, `bed`, `brain`, `comments`, con `extra` para iconos secundarios, `big`, `src`, `cam` y `hook`. Si un tema necesita un objeto que no existe (banco, coche, casa…), añade su tipo a `scene_lib.html` (los constructores del vídeo 001 sirven de modelo) y súbelo al repositorio para los siguientes vídeos.
7. Revisa fotogramas sueltos con `PORT=8780 node ../../engine/render.js 1.5,10,20` (crea `check_*.png`) y corrige encuadres antes del render completo.
8. Render completo: `engine/make.sh videos/NNN-slug` → `video.mp4` (unos 60 min). Calidad estándar: supermuestreo 1,5× (`SS=1.5`, se reduce a 1080×1920 con lanczos), sombras suaves (`key.castShadow`, `S.traverse` que activa `castShadow/receiveShadow`) y CRF 16. No uses `RoomEnvironment` como mapa de entorno: lava los colores y triplica el tiempo. **Nitidez (pedido del dueño):** brillo contenido — bloom 0.18/0.3/0.85, `emissiveIntensity` bajo (0.05 en iconos, 0.02 en personas), exposición 0.95 y `unsharp` en el encode. No vuelvas a subir el brillo: las figuras deben verse nítidas, sin halo.
9. **Sube el vídeo** a la rama `media` del repositorio (rama huérfana solo para mp4; las *releases* de GitHub no están permitidas en estas sesiones):
   `git clone --depth 1 --branch media https://github.com/cerebritosenmarcha/lopillo-videoa /home/user/lopillo-media`, copia `video.mp4` como `NNN-slug.mp4`, commit y push.
   URL pública: `https://raw.githubusercontent.com/cerebritosenmarcha/lopillo-videoa/media/NNN-slug.mp4`.
   Metricool copia el vídeo a su propio almacenamiento al programarlo, así que después puedes borrar de `media` los mp4 de vídeos ya programados para que la rama no crezca.
10. **Programa en Metricool** (ver abajo) y añade una línea a `publicados.md`.
11. Commit y push de la carpeta del vídeo (sin `frames/` ni el mp4).

## Publicación en Metricool

- Marca `blogId` **8128189**, zona horaria **Europe/Madrid**.
- Redes: Instagram (`type: REEL`), TikTok y YouTube (`type: short`, `madeForKids: false`, categoría `EDUCATION`).
- Marca siempre el contenido como generado con IA: `isAiGenerated` (Instagram), `isAigc` (TikTok), `isAiGeneratedContent` (YouTube).
- **Hora:** consulta `getBestTimeToPostByNetwork` para la semana; por ahora la mejor franja es **10:00** (y 18:00 como segunda opción).
- **El dueño publica a mano** hasta que diga lo contrario. El plan de Metricool es gratuito y no tiene flujo de aprobación (`createScheduledPostForReview` da error 403), así que usa `createScheduledPost` con `draft: false` y `autoPublish: false`: a la hora programada Metricool envía un aviso al móvil del dueño, que revisa el vídeo y lo publica desde la app.
- Texto: gancho + pregunta para comentarios + fuentes + aviso + 6–8 hashtags.

## Cadencia y capacidad

- **Un vídeo al día, publicado a las 10:00** (Reels + TikTok + Shorts), todos los días que permita la capacidad de ElevenLabs.
- Antes de grabar la voz, consulta los caracteres disponibles (`curl -sS https://api.elevenlabs.io/v1/user/subscription`: `character_limit - character_count`). Si quedan menos de 2.000, no produzcas: avisa en el resumen de que el cupo del mes se ha agotado y de la fecha de renovación (`next_character_count_reset_unix`).
- Más adelante, 2 vídeos largos de YouTube por semana (pendiente de definir formato).
