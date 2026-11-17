import json, base64, urllib.request, sys
SEG = [
 "Dormir ocho horas no vale para todo el mundo. Un bebé necesita casi el doble… y un adolescente, más que tú. Mira cómo cambia tu sueño a lo largo de la vida.",
 "Cuando naciste dormías de catorce a diecisiete horas al día: más de medio día durmiendo. Creces, y entre los seis y los trece años bastan de nueve a once.",
 "Llega la adolescencia: de ocho a diez horas. Sí, más de lo que duermen casi todos los adultos. Y de los dieciocho a los sesenta y cuatro años, de siete a nueve. El famoso ocho está justo en medio.",
 "A partir de los sesenta y cinco, de siete a ocho. Lo dice la Fundación Nacional del Sueño de Estados Unidos, después de reunir a un panel de expertos.",
 "O sea: si eres adulto y duermes cinco o seis horas, vas por debajo de lo recomendado, aunque te hayas acostumbrado. Ojo, son rangos orientativos y cada persona es distinta. ¿Cuántas horas duermes tú? Te leo en comentarios. ¿Lo pillas? Un bebé duerme casi el doble que tú… y tiene sus motivos.",
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
