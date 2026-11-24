import json, base64, urllib.request, sys
SEG = [
 'No ganó. Oficialmente, ni siquiera terminó. Y es uno de los momentos más emocionantes de la historia olímpica.',
 'Barcelona, mil novecientos noventa y dos. Semifinal de cuatrocientos metros. Eres Derek Redmond. Suena el disparo.',
 'Sales fuerte. Y de repente… un pinchazo. Se te rompe el isquiotibial. Caes.',
 'Te levantas. Y sigues. Cojeando. A la pata coja.',
 'En la grada, alguien salta. Esquiva a los de seguridad. Es tu padre.',
 'Te agarra. Te apoyas en su hombro. Y juntos… llegáis a la meta. El estadio entero, en pie.',
 '¿Debería contar como terminada? Te leo. ¿Lo pillas? No ganó… y nadie lo ha olvidado.',
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
