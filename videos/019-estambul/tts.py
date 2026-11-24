import json, base64, urllib.request, sys
SEG = [
 'Perdían tres a cero en el descanso de una final de Champions… y acabaron levantando la copa.',
 'Estambul, dos mil cinco. Eres Steven Gerrard, capitán del Liverpool. Descanso: Milan tres, Liverpool cero.',
 'En el vestuario, silencio. Pero en la grada… tu afición empieza a cantar.',
 'Vuelves al campo. Cabezazo: ¡gol! Otro: ¡gol! Penalti, rechace: ¡gol! En seis minutos. Tres a tres.',
 'Prórroga. Shevchenko remata dos veces a bocajarro… y tu portero, Dudek, para las dos.',
 'Penaltis. El último lo tira Shevchenko. Dudek se lanza… ¡y la para! ¡Campeones!',
 '¿Milagro o el Milan se confió? Te leo. ¿Lo pillas? Tres a cero en el descanso… y campeones.',
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
