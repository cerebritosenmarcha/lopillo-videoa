import json, base64, urllib.request, sys
SEG = [
 "Tu dinero no está en el banco. ¡Ni un solo billete! Ni en la caja fuerte, ni en una cuenta con tu nombre. Y si mañana todas las personas fueran al cajero a la vez... pasaría algo que ya ha ocurrido. Y no acabó nada bien.",
 "Tranquilo, que te lo explico. Tú llevas tu nómina al banco. Pero el banco no guarda esos billetes: ellos lo prestan. A una familia para su casa, a un chaval para su coche, a una empresa para su fábrica. Y a cambio, cobra intereses.",
 "¿Y cuánto dinero le obliga la ley a guardar? En la zona euro... solo el uno por ciento. Sí, has oído bien: de cada cien monedas, una se queda en la caja. Las otras noventa y nueve están viajando.",
 "Por eso, si todos corremos al banco el mismo día, no hay billetes para todos. Eso se llama pánico bancario. En marzo de 2023, en California, un rumor saltó de móvil en móvil. Los clientes del Silicon Valley Bank intentaron sacar cuarenta y dos mil millones de dólares en un solo día. ¿Y al día siguiente? El banco cayó.",
 "Y cuando el pánico se contagia, llegan los corralitos. Grecia, verano de 2015: bancos cerrados, colas en cada cajero y un límite: sesenta euros al día. ¡Sesenta! Y gracias.",
 "Pero aquí viene lo bueno. En España hay un escudo: el Fondo de Garantía de Depósitos protege hasta cien mil euros por persona y banco. Aunque tu banco quiebre, ese dinero vuelve a tu bolsillo. Y el Banco Central Europeo puede prestar dinero a los bancos para apagar el fuego.",
 "Así que el verdadero peligro no es el banco: es el pánico. ¿Tú correrías al cajero? Te leo en comentarios. ¿Lo pillas? Porque, al final, tu dinero... no está en el banco.",
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
