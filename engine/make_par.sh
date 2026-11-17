#!/bin/bash
# Uso: engine/make_par.sh videos/NNN-slug [N]  — como make.sh, pero renderiza los fotogramas en N procesos a la vez (por defecto 4)
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$(cd "$1" && pwd)"; N=${2:-4}
PORT=${PORT:-8780}
cd "$DIR"
[ -d "$ROOT/node_modules" ] || (cd "$ROOT" && npm install --silent)
ln -sfn "$ROOT/node_modules" node_modules
cp "$ROOT/assets/atom.png" atom.png
python3 build.py
mkdir -p frames
pkill -f "http.server $PORT" 2>/dev/null; sleep .5; (nohup python3 -m http.server $PORT >/dev/null 2>&1 &)  # siempre un servidor nuevo en la carpeta de ESTE vídeo
sleep 1
F=$(python3 -c "import json;print(json.load(open('timeline.json'))['frames'])")
for i in $(seq 0 $((N-1))); do
  START=$((F*i/N)) END=$((F*(i+1)/N)) PORT=$PORT node "$ROOT/engine/render.js" &
done
wait
# El resto (audio, mezcla y codificación) lo hace make.sh, que ya no tiene fotogramas pendientes
PORT=$PORT "$ROOT/engine/make.sh" "$DIR"
