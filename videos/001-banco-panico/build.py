import json, re
A = json.load(open("align.json")); text = A["text"]; st = A["start"]; en = A["end"]
segs, pos = [], 0
for s in A["segments"]:
    i = text.index(s, pos); segs.append((i, i + len(s))); pos = i + len(s)
segT = [st[a] for a, b in segs]
def cue(seg, sub):
    a, b = segs[seg]; i = text.index(sub, a); assert i < b, sub; return round(st[i], 3)
ICON = {"dinero":("cash-multiple","G"),"banco":("bank","B"),"bancos":("bank","B"),"bank":("bank","B"),"billete":("cash","G"),"billetes":("cash","G"),"caja":("safe","P"),
 "cuenta":("card-account-details","B"),"personas":("account-group","B"),"cajero":("atm","P"),"nómina":("file-document","W"),"familia":("human-male-female-child","B"),
 "casa":("home","P"),"chaval":("account","B"),"coche":("car","P"),"empresa":("domain","B"),"fábrica":("factory","P"),"intereses":("percent","G"),"ley":("gavel","W"),
 "euro":("currency-eur","G"),"euros":("currency-eur","G"),"ciento":("percent","G"),"monedas":("circle-multiple","G"),"viajando":("airplane","B"),"corremos":("run","R"),
 "correrías":("run","R"),"día":("calendar-today","W"),"pánico":("alert","R"),"marzo":("calendar-month","W"),"california":("map-marker","R"),"rumor":("bullhorn","R"),
 "móvil":("cellphone","B"),"clientes":("account-multiple","B"),"dólares":("currency-usd","G"),"cayó":("trending-down","R"),"corralitos":("lock","R"),"grecia":("flag","B"),
 "verano":("white-balance-sunny","G"),"cerrados":("door-closed-lock","R"),"colas":("human-queue","B"),"límite":("hand-back-right","R"),"escudo":("shield-check","B"),
 "españa":("map-marker","G"),"fondo":("piggy-bank","P"),"protege":("shield","B"),"persona":("account","B"),"quiebre":("flash","R"),"bolsillo":("wallet","G"),
 "europeo":("earth","B"),"prestar":("hand-coin","G"),"prestan":("hand-coin","G"),"fuego":("fire","R"),"peligro":("alert-octagon","R"),"comentarios":("comment-text-multiple","B"),
 "pillas":("lightbulb-on","G"),"mañana":("calendar-arrow-right","W"),"explico":("lightbulb","G"),"oído":("ear-hearing","P"),"todos":("account-group","B"),"guarda":("safe","P"),"guardar":("safe","P")}
norm = lambda w: w.lower().strip("¿?¡!.,:…")
words = []
for m in re.finditer(r"\S+", text):
    seg = next(k for k, (a, b) in enumerate(segs) if a <= m.start() < b)
    w = m.group(); words.append({"w": w, "t0": st[m.start()], "t1": en[m.end()-1], "seg": seg, "k": norm(w) in ICON})
cues = {"billete": cue(0,"¡Ni un"), "ocurrido": cue(0,"pasaría"), "nobien": cue(0,"Y no acabó"),
 "prestan": cue(1,"ellos lo prestan"), "uno": cue(2,"solo el uno"), "uno2": cue(2,"Sí, has"),
 "panico": cue(3,"pánico bancario"), "svb": cue(3,"cuarenta y dos"), "cayo": cue(3,"El banco cayó"),
 "sesenta": cue(4,"sesenta euros"), "sesenta2": cue(4,"¡Sesenta!"), "cienmil": cue(5,"cien mil"), "central": cue(5,"Y el Banco Central"),
 "peligro": cue(6,"es el pánico"), "pillas": cue(6,"¿Lo pillas"), "loop": cue(6,"Porque, al final")}
KEEP={"explico","viajando","pánico","california","rumor","dólares","cayó","cerrados","límite","quiebre"}
pops=[]; last={}
for w in words:
    n=norm(w["w"])
    if n in ICON and n in KEEP and w["t0"]-last.get(n,-9)>2.5:
        pops.append({"t":round(w["t0"],3),"icon":ICON[n][0],"c":ICON[n][1]}); last[n]=w["t0"]
SC=[(0,"Tu dinero","bank_idle"),(0,"billete","notes"),(0,"Ni en la caja","vault"),(0,"Y si mañana","atm_run"),
 (1,"Tranquilo","bank_walk"),(1,"ellos lo prestan","bank_lend"),(1,"A una familia","house"),(1,"a un chaval","car"),(1,"a una empresa","factory"),(1,"Y a cambio","percent"),
 (2,"¿Y cuánto","gavel"),(2,"En la zona","euro"),(2,"solo el uno","coins"),
 (3,"Por eso","bank_run"),(3,"En marzo","phones"),(3,"Los clientes","bank_drain"),(3,"¿Y al día","bank_fall"),
 (4,"Y cuando","lock"),(4,"Grecia","bank_closed"),(4,"colas","atm_queue"),
 (5,"Pero aquí","bulb"),(5,"En España","shield"),(5,"Aunque","wallet"),(5,"Y el Banco Central","bank_central"),
 (6,"Así que","alert"),(6,"¿Tú correrías","atm_solo"),(6,"Te leo","comments"),(6,"Porque, al final","bank_loop")]
shots=[{"t":(0 if i==0 else cue(s,sub)),"n":n,"seg":s} for i,(s,sub,n) in enumerate(SC)]
cues["otras"]=cue(2,"Las otras"); cues["llama"]=cue(3,"Eso se llama")
punch = [cues[k] for k in ["billete","nobien","uno","svb","cayo","sesenta","sesenta2","cienmil","peligro"]]
end = en[-1] + 0.6
json.dump({"fps": 30, "frames": int(end*30), "segT": segT, "words": words, "cues": cues, "punch": punch, "pops": pops, "shots": shots, "end": end}, open("timeline.json","w"), ensure_ascii=False)
print(len(pops),"pops");print(int(end*30), round(end,1), segT)
