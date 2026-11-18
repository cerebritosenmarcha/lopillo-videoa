# ¡Lo Pillo! — motor de producción de vídeos

Este repositorio produce los vídeos de **¡Lo Pillo!** (Instagram @lopillociencia, YouTube @lopillo, TikTok). Una tarea programada abre una sesión nueva cada día que sigue este documento para crear un vídeo y dejarlo en Metricool pendiente de aprobación.

## La marca

- **Promesa:** «Lo que nadie te explica, en 60 segundos». Curiosidades, mitos, noticias, dinero, ciencia y salud, explicados tan fácil que el espectador diga «¡lo pillo!».
- **Público:** general, 16–45 años, España.
- **Tono:** cercano, alegre, con intriga. Nunca alarmista ni con bulos.
- **Idioma:** español de España.

## El estilo de vídeo (decidido con el dueño, no cambiar sin que lo pida)

**Estilo de historia encadenada** (aprobado por el dueño el 17/11/2026). Referencias: `videos/003-alarma`, `004-deja-vu`, `005-horas-sueno`, `002-movil-una-semana` y, para historias del deporte, `006-fosbury` (el protagonista es el deportista, el escenario evoluciona alrededor y el salto/movimiento se anima con `pose()`), todos con `story.html` y `plan.md`.

1. **Vertical 1080×1920, 30 fps. Duración: entre 50 y 60 s por lo general, y nunca más de 1 min 5 s (65 s).**
2. **Un protagonista:** «tú», el muñeco naranja (`human(0xff9a4a,1.6)` con ojos), el mismo en todos los vídeos y durante todo el vídeo. Todo le pasa a él.
3. **Reacción en cadena:** cada escena **provoca** la siguiente (el reloj interno da la orden → sale la hormona → viaja por la sangre…). Nada aparece sin causa. Unas **10–12 escenas** de unos 5 s.
4. **Una sola toma continua:** sin cortes ni destellos. La cámara se mueve siempre y conecta las escenas con travelling, seguimiento, zoom continuo o transformación. Los escenarios evolucionan; no se salta de un sitio a otro sin mostrar cómo se llega.
   - **Entrar en el cuerpo o la cabeza:** zoom continuo. La cabeza se vuelve transparente, dentro hay una copia en miniatura del interior (escala `KM=0.05`), la cámara se acerca de forma exponencial y, en el instante en que encaja, pasa al interior a tamaño real (mira `dive`/`camIn` en `003-alarma/story.html`).
   - **Salir:** el zoom inverso (`LOUT`, como en el 004 y el 002) o un fundido de la energía que llena la pantalla (003).
   - **Revelar:** alejar la cámara y descubrir que el sitio era otro, como la habitación que resulta ser el laboratorio del 003.
5. **Objetos reales y reconocibles** que actúan según la frase; nada de formas abstractas. Los textos que explican van superpuestos (cifra grande arriba y subtítulo de una palabra), no dentro de la animación.
6. **Look:** fondo casi negro, foco cálido, colores vivos solo en lo importante, sin halo (nitidez del paso 8). Dentro del cuerpo, fondo granate o morado oscuro.
7. **Texto:** subtítulo de una palabra (palabras clave en amarillo) y cifras grandes arriba. **No se pone la fuente en pantalla** (pedido del dueño): las fuentes van solo en el texto de la publicación y en `fuentes.md`.
8. **Gancho en el primer segundo** (afirmación que choca o cifra imposible) y bucle abierto en los primeros 10 s.
9. **Cierre:** pregunta para comentarios (burbujas), «¿Lo pillas?» con el átomo, y la última frase vuelve al plano del principio para que el vídeo haga bucle.
10. **Sonido:** música de `engine/audio.py`, «whoosh» en cada escena del plan, golpe suave en los datos y «clin» en la revelación.

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

1. **Elige el tema:** el primero de la «Cola de producción» de `temas.md` que no esté en `publicados.md` (ahora mismo, la serie de deportes; la investigación de cada historia está en `deportes.md`, y en esa serie «tú» eres el deportista protagonista, como Fosbury en `videos/006-fosbury`). Respeta el orden; la reserva solo cuando la cola se acabe. La cola está ordenada por lo que más visualizaciones consigue en este tipo de vídeos (ver «Qué funciona» abajo). Si el tema que toca es de la misma familia que los dos vídeos anteriores (por ejemplo, un tercero seguido sobre sueño), salta al siguiente y deja ese para después.
2. Crea `videos/NNN-slug/` copiando `tts.py` de `videos/003-alarma/`. **Si ya existe una carpeta de ese tema con trabajo hecho** (por ejemplo `tts.py`, `voz.mp3`, `fuentes.md`, `story.html` o `plan.md`, como pasa con `010-baumgartner` y `011-isner-mahut`), no empieces de cero: revísala, comprueba de nuevo los datos, corrige lo que haga falta y sigue desde ahí.
3. **Investiga** y escribe `fuentes.md`.
4. **Guion encadenado** en `tts.py` (lista `SEG`): escrito para que cada frase cause la siguiente, en segunda persona («tú»). Ejecuta `python3 tts.py` → `voz.mp3` y `align.json`.
5. **`plan.md`** antes de animar: una tabla con frase, qué pasa, causa → efecto que lleva a la siguiente, cámara y qué se conserva.
6. **`build.py`** (como el del 003): `SCENES` con una entrada por escena del plan (dan los «whoosh»), `CUES` con las palabras que disparan cada acción, `PUNCH` y `DING`. **`story.html`** = `engine/scene_lib.html` con el código de la historia antes de `window.ready=true;` (construye el mundo en `buildStory()` y lo anima en `window.render(t)` con los `TL.cues`). Toma como base el `story.html` del vídeo de referencia más parecido. Trampas conocidas:
   - **Coordenadas:** lo que añadas a `room` va en coordenadas locales; lo que se coloca con posiciones del mundo (`getWorldPosition`) va en `S`.
   - **Nombres:** no llames `R` a ninguna variable dentro de `render`, porque es el renderizador.
   - **Manchas negras:** dentro del cuerpo desactiva el resplandor (`bloom.enabled=!inside`) y oculta las luces que no se usen (`visible=false`, no `intensity=0`). Si no, aparecen manchas negras.
   - **Cerebro en miniatura:** no puede quedar dentro de la almohada ni de otro objeto. Quita sus sombras.
   - **Demo:** `CUT=25 python3 build.py` genera una versión recortada para enseñar.
7. Revisa fotogramas sueltos con `SCENE=story.html PORT=8780 SS=1 node ../../engine/render.js 1.5,10,20` (crea `check_*.png`), sobre todo en mitad de cada transición, y corrige encuadres antes del render completo.
8. Render completo: **borra antes `frames/`** (el render reutiliza los fotogramas que ya existen) y lanza `SCENE=story.html engine/make_par.sh videos/NNN-slug 4` → `video.mp4` (4 procesos a la vez, unos 25–30 min). Calidad estándar: supermuestreo 1,5× (`SS=1.5`, se reduce a 1080×1920 con lanczos), sombras suaves (`key.castShadow`, `S.traverse` que activa `castShadow/receiveShadow`) y CRF 16. No uses `RoomEnvironment` como mapa de entorno: lava los colores y triplica el tiempo. **Nitidez (pedido del dueño):** brillo contenido — bloom 0.18/0.3/0.85, `emissiveIntensity` bajo (0.05 en iconos, 0.02 en personas), exposición 0.95 y `unsharp` en el encode. No vuelvas a subir el brillo: las figuras deben verse nítidas, sin halo.
9. **Sube el vídeo** a la rama `media` del repositorio (rama huérfana solo para mp4; las *releases* de GitHub no están permitidas en estas sesiones):
   `git clone --depth 1 --branch media https://github.com/cerebritosenmarcha/lopillo-videoa /home/user/lopillo-media`, copia `video.mp4` como `NNN-slug.mp4`, commit y push.
   URL pública: `https://raw.githubusercontent.com/cerebritosenmarcha/lopillo-videoa/media/NNN-slug.mp4`.
   Metricool copia el vídeo a su propio almacenamiento al programarlo, así que después puedes borrar de `media` los mp4 de vídeos ya programados para que la rama no crezca.
10. **Programa en Metricool** (ver abajo) y añade una línea a `publicados.md`.
11. Commit y push de la carpeta del vídeo (sin `frames/` ni el mp4).

## Qué funciona (para elegir y escribir temas)

Revisado el 17/11/2026 con búsquedas sobre los Shorts, Reels y TikTok de curiosidades y ciencia sin cara. No hay rankings oficiales, así que se trata como orientación, y manda nuestra propia analítica en cuanto haya datos.
- **Formatos que más se repiten entre los vídeos virales:**
  - «¿Qué pasaría si…?» (hipótesis imposibles de física o del espacio).
  - «¿Qué le pasa a tu cuerpo si…?».
  - Mitos que casi todo el mundo cree.
  - Física que parece imposible.
  - Espacio.
  - Datos de psicología y cerebro.
- **Títulos que responden a una pregunta concreta** («¿Por qué…?», «¿Qué pasa si…?», «¿Cómo…?»): además del feed, se encuentran por búsqueda.
- **Gancho en los 3 primeros segundos** y un dato sorprendente o una cifra imposible antes del segundo 10.
- **Variedad:** no repetir la misma familia (sueño, cerebro, espacio…) más de dos días seguidos. En la serie de deportes, la familia es el deporte: nunca dos vídeos seguidos del mismo deporte.
- **Revisión semanal:** cuando el dueño lo pida, o en una sesión con Metricool conectado, consulta la analítica de los vídeos publicados (visualizaciones, retención, compartidos y guardados). Sube en la cola los temas parecidos a los que mejor funcionen y anota aquí lo aprendido.

## Publicación en Metricool

- Marca `blogId` **8128189**, zona horaria **Europe/Madrid**.
- Redes: Instagram (`type: REEL`), TikTok y YouTube (`type: short`, `madeForKids: false`, categoría `EDUCATION`).
- Marca siempre el contenido como generado con IA: `isAiGenerated` (Instagram), `isAigc` (TikTok), `isAiGeneratedContent` (YouTube).
- **Hora:** consulta `getBestTimeToPostByNetwork` para la semana; por ahora la mejor franja es **10:00** (y 18:00 como segunda opción).
- **El dueño publica a mano** hasta que diga lo contrario. El plan de Metricool es gratuito y no tiene flujo de aprobación (`createScheduledPostForReview` da error 403), así que usa `createScheduledPost` con `draft: false` y `autoPublish: false`: a la hora programada Metricool envía un aviso al móvil del dueño, que revisa el vídeo y lo publica desde la app.
- Texto: gancho + pregunta para comentarios + fuentes + aviso + 6–8 hashtags.

## Cadencia y capacidad

- **Un vídeo al día, publicado a las 10:00** (Reels + TikTok + Shorts), todos los días que permita la capacidad de ElevenLabs.
- **Margen de 3 días (pedido del dueño el 18/11):** siempre debe haber unos 3 vídeos programados por delante. La tarea diaria produce uno nuevo cada día para el siguiente día libre de `publicados.md`.
- Antes de grabar la voz, consulta los caracteres disponibles (`curl -sS https://api.elevenlabs.io/v1/user/subscription`: `character_limit - character_count`). Si quedan menos de 2.000, no produzcas: avisa en el resumen de que el cupo del mes se ha agotado y de la fecha de renovación (`next_character_count_reset_unix`).
- Más adelante, 2 vídeos largos de YouTube por semana (pendiente de definir formato).
