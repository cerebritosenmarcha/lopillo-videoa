import json, base64, urllib.request, sys
SEG = [
 'Saltó tan lejos… que el aparato de medir no llegaba. Literal. Quédate hasta el final: lo que pasó después es aún más increíble.',
 'México, mil novecientos sesenta y ocho. Final olímpica de salto de longitud. Eres Bob Beamon. El récord del mundo: ocho metros treinta y cinco.',
 'Primer salto. Silencio en el estadio. Corres. Cada zancada, más rápido.',
 'Pisas la tabla… y despegas. Subes. Y sigues en el aire. Y sigues.',
 'Caes en la arena… lejísimos. Más allá de la marca del récord.',
 'Los jueces mueven el medidor óptico por su raíl… y se sale. No llega a tu marca.',
 'Nadie se lo cree. Traen una cinta métrica. Miden a mano. Pasan los minutos.',
 'Y el marcador se enciende: ¡ocho metros noventa! Cincuenta y cinco centímetros más que el récord.',
 'Pero tú no piensas en metros. Tu compañero te lo traduce a pies… y caes de rodillas.',
 'Ese récord aguantó casi veintitrés años. La altitud y el viento, justo en el límite, ayudaron. Pero nadie había volado así.',
 '¿Tú hasta dónde llegas? Te leo en comentarios. ¿Lo pillas? Saltó tan lejos que no había con qué medirlo.',
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
