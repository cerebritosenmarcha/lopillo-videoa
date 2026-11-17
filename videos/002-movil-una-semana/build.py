import json, re
A = json.load(open("align.json")); text = A["text"]; st = A["start"]; en = A["end"]
segs, pos = [], 0
for s in A["segments"]:
    i = text.index(s, pos); segs.append((i, i + len(s))); pos = i + len(s)
segT = [st[a] for a, b in segs]
def cue(seg, sub):
    a, b = segs[seg]; i = text.index(sub, a); assert i < b, sub; return round(st[i], 3)
# palabras clave (subtítulo en amarillo) e iconos de complemento
ICON = {"móvil":("cellphone","B"),"cerebro":("brain","P"),"escáner":("radar","B"),"semanas":("calendar-week","W"),"días":("calendar-today","W"),
 "alemania":("map-marker","R"),"jóvenes":("account-group","B"),"horas":("clock-outline","W"),"resonancia":("radar","B"),"fotos":("image-multiple","P"),
 "recompensa":("star","G"),"antojos":("candy","P"),"comida":("hamburger","G"),"humor":("emoticon-neutral","W"),"distinto":("flash","G"),
 "unidos":("map-marker","R"),"personas":("account-group","B"),"internet":("web-off","R"),"llamar":("phone","G"),"mensajes":("message-text","B"),"redes":("web-off","R"),
 "ciento":("percent","G"),"atención":("bullseye-arrow","G"),"mental":("head-heart","P"),"bienestar":("emoticon-happy","G"),"años":("timer-sand","W"),"después":("calendar-check","G"),
 "cuatro":("account-multiple","B"),"podrías":("help-circle","G"),"comentarios":("comment-text-multiple","B"),"pillas":("lightbulb-on","G")}
norm = lambda w: w.lower().strip("¿?¡!.,:…")
words = []
for m in re.finditer(r"\S+", text):
    seg = next(k for k, (a, b) in enumerate(segs) if a <= m.start() < b)
    w = m.group(); words.append({"w": w, "t0": st[m.start()], "t1": en[m.end()-1], "seg": seg, "k": norm(w) in ICON})
cues = {"escaner": cue(0,"lo han visto"), "dossem": cue(0,"Y a las dos"), "res": cue(1,"Antes y después"), "fotos": cue(1,"y les enseñaron"),
 "reward": cue(2,"Cambió"), "humor": cue(2,"Ojo"), "distinto": cue(2,"pero su cerebro"),
 "n467": cue(3,"cuatrocientas"), "block": cue(3,"bloquearon"), "llamar": cue(3,"Podían"), "redes": cue(3,"pero nada"),
 "p91": cue(4,"el noventa"), "diez": cue(4,"recuperar diez"), "seguia": cue(4,"Y la mejora"),
 "cuarta": cue(5,"solo una de cada"), "pillas": cue(5,"¿Lo pillas"), "loop": cue(5,"Prueba tres")}
# complementos: solo donde suman intriga o emoción
KEEP = {"alemania","antojos","humor","unidos","redes","años"}
pops=[]; last={}
for w in words:
    n=norm(w["w"])
    if n in ICON and n in KEEP and w["t0"]-last.get(n,-9)>2.5:
        pops.append({"t":round(w["t0"],3),"icon":ICON[n][0],"c":ICON[n][1]}); last[n]=w["t0"]
# plan de escenas: (bloque, primeras palabras, escena)
SC=[(0,"Tres días","phone_off"),(0,"y tu cerebro","brain"),(0,"lo han visto","mri_scan"),(0,"Y a las dos","calendar14"),
 (1,"En Alemania","flag_de"),(1,"pidieron","youth"),(1,"durante setenta","clock72"),(1,"Antes y después","mri_photos"),
 (2,"¿Resultado?","brain_reward"),(2,"las que se encienden","food"),(2,"Ojo","mood"),(2,"pero su cerebro","brain_diff"),
 (3,"Ahora","flag_us"),(3,"cuatrocientas","crowd467"),(3,"bloquearon","phone_block"),(3,"Podían","call_msg"),(3,"pero nada","no_social"),
 (4,"Y el noventa","crowd91"),(4,"atención","focus"),(4,"En atención","hourglass"),(4,"Y la mejora","calendar_after"),
 (5,"Eso sí","quarter"),(5,"¿Tú podrías?","you_phone"),(5,"Te leo","comments"),(5,"Prueba tres","phone_loop")]
shots=[{"t":(0 if i==0 else cue(s,sub)),"n":n,"seg":s} for i,(s,sub,n) in enumerate(SC)]
punch = [cues[k] for k in ["escaner","dossem","reward","distinto","n467","p91","diez","cuarta"]]
end = en[-1] + 0.6
json.dump({"fps": 30, "frames": int(end*30), "segT": segT, "words": words, "cues": cues, "punch": punch, "pops": pops, "shots": shots, "ding": [cues["p91"]], "end": end}, open("timeline.json","w"), ensure_ascii=False)
print(len(pops),"complementos;", len(shots), "escenas;", round(end,1), "s")
for s in shots: print(round(s["t"],1), s["n"])
