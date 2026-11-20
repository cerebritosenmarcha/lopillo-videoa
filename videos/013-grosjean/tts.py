import json, base64, urllib.request, sys
SEG = [
 'Ciento noventa y dos kilómetros por hora. Fuego. Y veintisiete segundos para salir con vida. Quédate hasta el final: lo que te salva es lo que más odiabas.',
 'Baréin, dos mil veinte. Eres Romain Grosjean. Se apaga el semáforo. Primera vuelta. Aceleras entre los coches.',
 'Un toque. Tu coche sale disparado hacia el guardarraíl. Sin frenar.',
 'Impacto: sesenta y siete G. El coche se parte en dos. Tu cabeza atraviesa el metal… pero algo la protege.',
 'Y entonces: ¡bum! La gasolina explota. Una bola de fuego.',
 'Estás atrapado. El visor se derrite. Cinco segundos. Diez. Quince.',
 'Llega el coche médico. Un comisario dispara el extintor. Empujas… y trepas entre las llamas.',
 '¡Y sales andando! Veintisiete segundos dentro del fuego. Solo con quemaduras en las manos.',
 '¿Qué te salvó? El halo: un arco de titanio sobre tu cabeza. Tú mismo decías que era feo y no lo querías.',
 'Después dijiste que es lo mejor que ha llegado a la Fórmula Uno.',
 '¿Tú confiarías en él? Te leo en comentarios. ¿Lo pillas? A veces, lo que te salva es lo que más odiabas.',
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
