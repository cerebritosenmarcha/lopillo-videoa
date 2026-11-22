import json, base64, urllib.request, sys
SEG = [
 'Dos rivales descalificados. Una piscina olímpica entera… para ti solo. Y un estadio lleno mirando. Quédate hasta el final: no sabes si vas a llegar.',
 'Sídney, dos mil. Eres Eric Moussambani, de Guinea Ecuatorial. Hace solo ocho meses que nadas. Entrenabas en un lago y en la piscina de un hotel.',
 'Y nunca has visto una piscina de cincuenta metros. Hasta hoy.',
 'Serie de cien libres. Tus dos rivales salen antes de tiempo. ¡Descalificados!',
 'Así que nadas solo. Silbato. Saltas.',
 'Los primeros cincuenta metros, a tope. Tocas la pared… y das la vuelta. Falta otro largo entero.',
 'Te pesan los brazos. Las piernas se agarrotan. Casi te paras.',
 'Y entonces el estadio entero se pone en pie. Te gritan. Te empujan con la voz.',
 'Un brazo más. Otro. La pared no llega nunca…',
 '¡Tocas! Un minuto, cincuenta y dos segundos. El cien libres más lento de la historia olímpica… y ganas tu serie.',
 'Años después, fuiste seleccionador de tu país. ¿Tú te habrías tirado al agua? Te leo en comentarios. ¿Lo pillas? A veces, terminar ya es ganar.',
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
