import json, base64, urllib.request, sys
SEG = [
 "Tres días sin móvil… y tu cerebro ya no es el mismo. No es un decir: lo han visto en un escáner. Y a las dos semanas pasa algo todavía más loco.",
 "En Alemania, investigadores de Heidelberg y Colonia pidieron a veinticinco jóvenes usar el móvil solo para lo imprescindible durante setenta y dos horas. Antes y después, los metieron en una resonancia y les enseñaron fotos de móviles.",
 "¿Resultado? Cambió la actividad en las zonas de la recompensa, las de los antojos, las que se encienden con la comida. Ojo: ellos no notaron cambios de humor, pero su cerebro reaccionaba distinto.",
 "Ahora, el experimento grande. En Estados Unidos, cuatrocientas sesenta y siete personas bloquearon el internet del móvil durante dos semanas. Podían llamar y mandar mensajes, pero nada de redes ni navegador.",
 "Y el noventa y uno por ciento mejoró en al menos una cosa: atención, salud mental o bienestar. En atención, los investigadores lo comparan con recuperar diez años de concentración perdida por la edad. Y la mejora seguía dos semanas después.",
 "Eso sí, solo una de cada cuatro personas aguantó las dos semanas enteras. ¿Tú podrías? Te leo en comentarios. ¿Lo pillas? Prueba tres días sin móvil… y mira qué le pasa a tu cerebro.",
]
text = " ".join(SEG)
voice = json.load(open("../../assets/voces.json"))["narrador"]
model = sys.argv[1] if len(sys.argv) > 1 else "eleven_v3"
TEMPO = 1.25  # el narrador va un 25 % más rápido
vs = {"stability": 0.5, "similarity_boost": 0.8, "style": 0.35, "use_speaker_boost": True, "speed": 0.92}
if model == "eleven_v3": vs = {"stability": 0.5, "similarity_boost": 0.8}
body = json.dumps({"text": text, "model_id": model, "voice_settings": vs}).encode()
req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128",
  data=body, headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
try: d = json.load(urllib.request.urlopen(req, timeout=300))
except urllib.error.HTTPError as e: print("ERR", e.code, e.read()[:300]); sys.exit(1)
open(f"voz_{model}.mp3", "wb").write(base64.b64decode(d["audio_base64"]))
a = d["alignment"]
json.dump({"text": text, "segments": SEG, "chars": a["characters"], "start": a["character_start_times_seconds"], "end": a["character_end_times_seconds"]}, open(f"align_{model}.json", "w"), ensure_ascii=False)
import subprocess
subprocess.run(["ffmpeg","-v","error","-y","-i",f"voz_{model}.mp3","-filter:a",f"atempo={TEMPO}","voz.mp3"],check=True)
f=1/TEMPO
json.dump({"text": text, "segments": SEG, "chars": a["characters"], "start": [x*f for x in a["character_start_times_seconds"]], "end": [x*f for x in a["character_end_times_seconds"]]}, open("align.json", "w"), ensure_ascii=False)
print(model, len(text), "caracteres; duración", round(a["character_end_times_seconds"][-1]*f,1), "s")
