import json, base64, urllib.request, sys
SEG = [
 "Vas a caer más rápido que el sonido. Sin avión, sin cohete… solo con tu traje. ¿Cómo es posible?",
 "Octubre de dos mil doce, Nuevo México. Eres Felix Baumgartner. Un globo de helio gigante te sube en una cápsula hasta casi treinta y nueve kilómetros de altura.",
 "Ahí arriba casi no hay aire. Por eso llevas un traje presurizado, como un astronauta. Abres la puerta, ves la curva de la Tierra… y saltas.",
 "Como apenas hay aire que te frene, aceleras sin parar. A los cincuenta segundos vas a mil trescientos cincuenta y siete kilómetros por hora: más rápido que el sonido.",
 "De pronto empiezas a girar como una peonza. Si no paras, podrías perder el conocimiento. Estiras los brazos… y lo controlas.",
 "Al bajar, el aire se vuelve más denso y te frena. Abres el paracaídas y, tras cuatro minutos y veinte segundos de caída libre… aterrizas de pie.",
 "¿Tú te atreverías a saltar? Te leo en comentarios. ¿Lo pillas? Sin aire que te frene, caes más rápido que el sonido.",
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
