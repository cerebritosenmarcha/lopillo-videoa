import json, base64, urllib.request, sys
SEG = [
 "Eres el más lento de la final olímpica… y vas a ganar el oro sin adelantar a nadie. ¿Cómo? Mira.",
 "Salt Lake City, dos mil dos. Patinaje de velocidad, mil metros. Eres Steven Bradbury, australiano, y tus rivales son mucho más rápidos que tú. En cuartos llegas tercero: eliminado… hasta que descalifican a un rival. Pasas.",
 "Semifinal. Vas último. En la última curva, tus rivales chocan y se caen delante de ti. Tú los esquivas… y entras primero. Estás en la final.",
 "Y entonces tienes una idea: si no puedes ganarles corriendo, quédate atrás. En la pista corta hay muchas caídas, y si pasa algo, tú estarás lejos.",
 "Final. Cinco patinadores, y tú, último, a unos quince metros. Última vuelta. Última curva. Li roza a Ohno, Li choca con Ahn… y los cuatro acaban por el suelo, como fichas de dominó.",
 "Tú pasas por el hueco… y cruzas la meta solo, con los brazos en alto, sin creértelo. ¡Oro! El primer oro de Australia en unos Juegos de Invierno, y de todo el hemisferio sur.",
 "¿Suerte? Sí. Pero llegaste ahí porque nunca te rendiste. ¿Tú lo celebrarías a lo grande o te daría vergüenza? Te leo en comentarios. ¿Lo pillas? A veces, para ganar, basta con seguir de pie.",
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
