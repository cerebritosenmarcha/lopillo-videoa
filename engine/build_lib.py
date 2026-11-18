"""Generador común de timeline.json para los vídeos de ¡Lo Pillo!

Uso en videos/NNN-slug/build.py:
    import sys; sys.path.insert(0, '../../engine'); from build_lib import make
    make(ICON, KEEP, SCENES, CUES, PUNCH, DING)

SCENES: lista de dicts con
  seg (bloque del guion), at (primeras palabras de la frase, '' en la primera escena),
  type (icon | phone | clock | calendar | flag | mri | crowd | people | bed | brain | comments),
  tr (transición desde la escena anterior: travel | depth | morph | stay | follow; d = distancia, fcol/fpos para follow),
  p (parámetros del tipo), big, bigAt (clave de CUES), src, cam {R,h,ly,a0,av}, hook, hero (icono a no repetir como complemento).
CUES: {clave: (bloque, palabras)}; PUNCH y DING: listas de claves de CUES.
"""
import json, re

def make(ICON, KEEP, SCENES, CUES, PUNCH, DING, pad=0.6, cut=None, epic=None):
    A = json.load(open("align.json")); text = A["text"]; st = A["start"]; en = A["end"]
    segs, pos = [], 0
    for s in A["segments"]:
        i = text.index(s, pos); segs.append((i, i + len(s))); pos = i + len(s)
    segT = [st[a] for a, b in segs]
    def cue(seg, sub):
        a, b = segs[seg]; i = text.index(sub, a); assert i < b, (seg, sub); return round(st[i], 3)
    norm = lambda w: w.lower().strip("¿?¡!.,:…«»")
    words = []
    for m in re.finditer(r"\S+", text):
        seg = next(k for k, (a, b) in enumerate(segs) if a <= m.start() < b)
        w = m.group(); words.append({"w": w, "t0": st[m.start()], "t1": en[m.end()-1], "seg": seg, "k": norm(w) in ICON})
    cues = {k: cue(*v) for k, v in CUES.items()}
    pops, last = [], {}
    for w in words:
        n = norm(w["w"])
        if n in ICON and n in KEEP and w["t0"] - last.get(n, -9) > 2.5:
            pops.append({"t": round(w["t0"], 3), "icon": ICON[n][0], "c": ICON[n][1]}); last[n] = w["t0"]
    shots, scenes = [], []
    for i, sc in enumerate(SCENES):
        name = f"s{i:02d}_{sc['type']}"
        t = 0 if i == 0 else cue(sc["seg"], sc["at"])
        shots.append({"t": t, "n": name, "seg": sc["seg"]})
        d = {k: v for k, v in sc.items() if k not in ("seg", "at")}; d["n"] = name; scenes.append(d)
    for a, b in zip(shots, shots[1:]):
        assert b["t"] > a["t"], ("escenas fuera de orden", a, b)
    end = en[-1] + pad
    if cut:  # versión recortada (demos)
        end = cut; shots = [s for s in shots if s['t'] < cut]; scenes = scenes[:len(shots)]
        pops = [p for p in pops if p['t'] < cut]; words = [w for w in words if w['t0'] < cut]
    ep = {}
    for k, v in (epic or {}).items():  # sonido épico: climax, riser, heart [inicio, fin], roar, hit
        if isinstance(v, str): ep[k] = cues[v]
        else: ep[k] = [cues[x] if isinstance(x, str) else [cues[y] for y in x] for x in v]
    json.dump({"epic": ep, "fps": 30, "frames": int(end*30), "segT": segT, "words": words, "cues": cues, "punch": [cues[k] for k in PUNCH],
               "pops": pops, "shots": shots, "scenes": scenes, "ding": [cues[k] for k in DING], "end": end}, open("timeline.json", "w"), ensure_ascii=False)
    print(len(pops), "complementos;", len(shots), "escenas;", round(end, 1), "s")
    for s in shots: print(f"  {s['t']:6.2f}  {s['n']}")
