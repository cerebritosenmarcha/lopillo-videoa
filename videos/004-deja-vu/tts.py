import json, base64, urllib.request, sys
SEG = [
 "Esa sensación de «esto ya lo he vivido»... no es ver el futuro. Es tu cerebro pillándose a sí mismo en un error.",
 "Se llama déjà vu, que en francés significa «ya visto». Aparece cuando algo te resulta familiar... pero sabes perfectamente que es la primera vez. Dura apenas unos segundos y llega sin avisar.",
 "Un equipo de investigadores provocó déjà vus en el laboratorio, con listas de palabras parecidas para engañar a la memoria, y miró el cerebro con un escáner. Y la zona que se encendía no era la de guardar recuerdos: era la parte frontal, la que comprueba si lo que recuerdas es verdad.",
 "O sea, el déjà vu sería como un detector de errores: tu cerebro nota una falsa señal de «esto me suena» y la revisa. También se estudia en personas con epilepsia del lóbulo temporal, donde puede aparecer al estimular esa zona. Y tranquilo: en otro estudio, tener más déjà vus no tenía nada que ver con tener peor memoria.",
 "Y un dato curioso: con la edad, se tienen menos déjà vus. ¿Cuándo tuviste el último? Te leo en comentarios. ¿Lo pillas? La próxima vez que lo sientas, es tu cerebro haciendo control de calidad.",
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
