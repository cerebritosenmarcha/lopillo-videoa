import json, base64, urllib.request, sys
SEG = [
 'Nadie daba un duro por él: cuarenta y dos a uno. Y tumbó al hombre que nunca había perdido.',
 'Tokio, mil novecientos noventa. Eres Buster Douglas. Hace veintitrés días murió tu madre.',
 'Delante, Mike Tyson. Treinta y siete combates. Treinta y siete victorias.',
 'Suena la campana. Y tú… aguantas. Golpeas. Asalto tras asalto.',
 'Octavo asalto. Un gancho de Tyson te tumba. Uno, dos… nueve. ¡Te levantas!',
 'Décimo asalto. Gancho. Derecha. Izquierda. Y Tyson cae… por primera vez.',
 '¡Campeón del mundo! ¿Suerte o el combate de su vida? Te leo. ¿Lo pillas? Cuarenta y dos a uno… y ganó.',
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
