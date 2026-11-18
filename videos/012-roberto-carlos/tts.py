import json, base64, urllib.request, sys
SEG = [
 "Este balón iba directo fuera… y la física lo metió dentro. Quédate, que al final lo verás a cámara lenta.",
 "Lyon, tres de junio de mil novecientos noventa y siete. Francia contra Brasil. Falta a unos treinta y cinco metros. Eres Roberto Carlos.",
 "Colocas el balón. Y te alejas. Un paso. Otro. Y otro. Dieciocho pasos hacia atrás. Barthez coloca la barrera. Nadie espera un tiro desde ahí.",
 "Corres… y golpeas con la zurda, fortísimo y con muchísimo efecto. El balón sale disparado… muy abierto, por fuera de la barrera. Tan fuera… que un recogepelotas se agacha.",
 "Y entonces… gira. Se curva hacia dentro, más y más… roza el palo… ¡y entra! Barthez ni se mueve.",
 "¿Magia? No: física. Unos físicos franceses lo explicaron: un balón que gira, al frenarse, se curva cada vez más, como una espiral. Y solo funciona si chutas desde muy lejos.",
 "¿Tú habrías intentado ese tiro? Te leo en comentarios. ¿Lo pillas? A veces, para meterla, hay que tirar fuera.",
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
