import json, base64, urllib.request, sys
SEG = [
 "Saltó de espaldas, sin ver la barra… y ganó el oro olímpico. Hoy casi todos los campeones saltan como él. ¿Cómo lo hizo?",
 "Oregón, años sesenta. Eres Dick Fosbury, estás en el instituto y no pasas del metro y medio. Tu entrenador te obliga a saltar como todos: de lado, con la tripa hacia la barra. Y no te sale.",
 "Así que vuelves a tu salto de niño, la tijera. Y en cada intento subes la cadera… echas los hombros atrás… hasta que pasas la barra de espaldas.",
 "¿Por qué nadie lo hacía? Porque se caía sobre serrín: caer de espaldas era jugarte el cuello. Pero tu instituto cambia el serrín por colchones de espuma. Ahora sí puedes.",
 "En mil novecientos sesenta y cuatro, un periódico publica tu foto: «Fosbury se desploma sobre la barra». Se ríen. Y tú sigues saltando.",
 "México, mil novecientos sesenta y ocho. Final olímpica. Corres en curva, giras, arqueas la espalda… ¡dos metros veinticuatro! Oro y récord olímpico.",
 "Cuatro años después, en Múnich, veintiocho de los cuarenta saltadores ya saltaban como tú. Ojo: otros, como la canadiense Debbie Brill, también lo probaron, pero Fosbury lo hizo famoso. ¿Qué otro hito quieres ver? Te leo en comentarios. ¿Lo pillas? A veces, para llegar más alto, hay que saltar de espaldas.",
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
