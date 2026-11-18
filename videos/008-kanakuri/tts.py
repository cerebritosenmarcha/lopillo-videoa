import json, base64, urllib.request, sys
SEG = [
 "Este hombre tardó cincuenta y cuatro años en terminar un maratón. Y no es una broma: es récord oficial.",
 "Estocolmo, mil novecientos doce. Eres Shizo Kanakuri, uno de los dos primeros deportistas de Japón en unos Juegos. Llegas tras dieciocho días de viaje… destrozado.",
 "¡Pum! Salida. Un calor sofocante. Kilómetro a kilómetro, las piernas te fallan. Y en un jardín, una familia sueca te hace señas: zumo, bollos, una silla…",
 "Te sientas. Solo un momento. Pero ya no te levantas. Te da tanta vergüenza que vuelves a Japón sin decírselo a nadie. Y en Suecia te conviertes en un misterio: el corredor que desapareció.",
 "Pasan los años. Tú no paras: entrenas a otros y ayudas a crear una carrera de relevos que hoy es famosísima.",
 "Hasta que, en mil novecientos sesenta y siete, una televisión sueca te encuentra… y te propone algo: termina lo que empezaste.",
 "Vuelves a Estocolmo. Con más de setenta años. Las últimas zancadas… y cruzas la meta. Tiempo oficial: cincuenta y cuatro años, ocho meses y seis días.",
 "¿Tú lo habrías terminado? Te leo en comentarios. ¿Lo pillas? Nunca es tarde para cruzar la meta.",
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
