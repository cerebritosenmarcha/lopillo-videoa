import json, base64, urllib.request, sys
SEG = [
 "Abres los ojos… y un minuto después suena la alarma. ¿Casualidad? No: tu cuerpo llevaba un buen rato preparándose.",
 "Entremos en tu cabeza. Tu cerebro tiene un reloj interno, el reloj circadiano, que aprende a qué hora te levantas. Y antes de la alarma, da la orden: una glándula del cerebro, la hipófisis, suelta una hormona, la ACTH.",
 "La ACTH viaja por la sangre hasta las glándulas suprarrenales, y estas fabrican cortisol: la hormona que te pone en marcha por la mañana. Tu cuerpo enciende el motor… y te despiertas antes que el móvil.",
 "¿Y cómo lo sabemos? En Alemania, el equipo de Jan Born metió a quince voluntarios en un laboratorio del sueño y les sacó sangre durante la noche. Solían levantarse sobre las siete. A unos les dijeron: mañana os despertamos a las seis.",
 "Y casi una hora antes, su ACTH ya estaba subiendo. A los que despertaron por sorpresa… nada: su cuerpo no sabía que tocaba. Eso sí, midieron hormonas, no despertares exactos. ¿A ti te pasa? Te leo en comentarios. ¿Lo pillas? Tu cuerpo ya sabe a qué hora suena tu alarma.",
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
