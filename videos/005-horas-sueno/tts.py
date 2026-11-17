import json, base64, urllib.request, sys
SEG = [
 "Dormir ocho horas no vale para todo el mundo. Un bebé necesita casi el doble. Y un adolescente, más que tú.",
 "La Fundación Nacional del Sueño de Estados Unidos reunió a expertos y fijó cuánto hay que dormir según la edad. Agárrate.",
 "Un recién nacido: de catorce a diecisiete horas al día. Un niño de seis a trece años: de nueve a once horas. Un adolescente: de ocho a diez. Sí: un recién nacido se pasa durmiendo más de medio día.",
 "Y los adultos, de dieciocho a sesenta y cuatro años: de siete a nueve horas. A partir de los sesenta y cinco, de siete a ocho. O sea, el famoso ocho está justo en medio del rango de un adulto.",
 "O sea, si eres adulto y duermes cinco o seis horas, vas por debajo de lo recomendado, aunque te hayas acostumbrado. Y ojo: son rangos orientativos, cada persona es un poco distinta. ¿Cuántas horas duermes tú? Te leo en comentarios. ¿Lo pillas? Un bebé duerme casi el doble que tú... y tiene sus motivos.",
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
