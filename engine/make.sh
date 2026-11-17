#!/bin/bash
# Uso: engine/make.sh videos/NNN-slug
# Requiere en la carpeta del vídeo: voz.mp3, align.json (de tts.py), build.py, scene.html
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$(cd "$1" && pwd)"
PORT=${PORT:-8780}
cd "$DIR"
[ -d "$ROOT/node_modules" ] || (cd "$ROOT" && npm install --silent)
ln -sfn "$ROOT/node_modules" node_modules
cp "$ROOT/assets/atom.png" atom.png
python3 build.py
mkdir -p frames
pgrep -f "http.server $PORT" >/dev/null || (nohup python3 -m http.server $PORT >/dev/null 2>&1 &)
sleep 1
PORT=$PORT node "$ROOT/engine/render.js"
python3 "$ROOT/engine/audio.py"
END=$(python3 -c "import json;print(json.load(open('timeline.json'))['end'])")
ffmpeg -v error -y -i voz.mp3 -i music.wav -i sfx.wav -filter_complex "[0:a]loudnorm=I=-15:TP=-1.5:LRA=11,apad[v];[v]asplit[v1][v2];[1:a]volume=0.85[m];[m][v1]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=300[md];[v2][md][2:a]amix=inputs=3:duration=longest:normalize=0,alimiter=limit=0.95[a]" -map "[a]" -t $END mix.wav
ffmpeg -v error -y -framerate 30 -i frames/%05d.jpg -i mix.wav -map 0:v -map 1:a -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart video.mp4
echo "OK: $DIR/video.mp4"
