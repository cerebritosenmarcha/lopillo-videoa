import json, base64, urllib.request, sys
SEG = [
 "Entras en un sitio por primera vez… y de repente: «esto ya lo he vivido». No es ver el futuro. Es tu cerebro pillándose a sí mismo en un error.",
 "Entremos en tu cabeza. En el lóbulo temporal, junto a tus recuerdos, hay un sistema que te avisa cuando algo te resulta familiar: «esto me suena». Y una explicación es que, a veces, se dispara sin motivo.",
 "Entonces la parte frontal, la que comprueba, busca ese recuerdo en el archivo… y no hay nada. Ese choque entre «me suena» y «es la primera vez» es lo que sientes como déjà vu.",
 "En Escocia lo provocaron en un laboratorio. Oías: cama, almohada, noche… ¿Había alguna palabra con D? No. ¿Y «dormir»? Te suena… pero sabes que no estaba. Y en el escáner se encendió la zona frontal, la que resuelve conflictos, no la de los recuerdos.",
 "O sea, el déjà vu es tu detector de errores funcionando. Y tranquilo: tener más déjà vus no significa tener peor memoria, y con la edad se tienen menos. ¿Cuándo tuviste el último? Te leo en comentarios. ¿Lo pillas? La próxima vez que lo sientas, es tu cerebro haciendo control de calidad.",
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
