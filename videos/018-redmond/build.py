# 018 — historia encadenada épica corta: tú eres Derek Redmond (Barcelona 1992); tu padre baja a la pista. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["ganó","terminó","emocionantes","barcelona","semifinal","cuatrocientos","redmond","disparo","fuerte","pinchazo","isquiotibial","caes","levantas","sigues","cojeando","coja","grada","salta","seguridad","padre","agarra","hombro","juntos","meta","pie","terminada","olvidado"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Y es uno",type="rewind"),dict(seg=1,at="Barcelona",type="stadium"),dict(seg=2,at="Sales",type="run"),dict(seg=2,at="Caes",type="fall"),
   dict(seg=3,at="Te levantas",type="limp"),dict(seg=4,at="En la grada",type="dad"),dict(seg=5,at="Te agarra",type="together"),dict(seg=5,at="El estadio",type="ovation"),dict(seg=6,at="¿Debería",type="ask"),
   dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="No ganó",type="loop")]
CUES={"oficial":(0,"Oficialmente"),"como":(0,"Y es uno"),"bcn":(1,"Barcelona"),"semi":(1,"Semifinal"),"eres":(1,"Eres Derek"),"disparo":(1,"Suena el"),
 "sales":(2,"Sales"),"derepente":(2,"Y de repente"),"rompe":(2,"Se te rompe"),"caes":(2,"Caes"),"levantas":(3,"Te levantas"),"sigues":(3,"Y sigues"),"cojeando":(3,"Cojeando"),
 "grada":(4,"En la grada"),"esquiva":(4,"Esquiva"),"padre":(4,"Es tu"),"agarra":(5,"Te agarra"),"hombro":(5,"Te apoyas"),"juntos":(5,"Y juntos"),"meta":(5,"llegáis"),"enpie":(5,"El estadio"),
 "pregunta":(6,"¿Debería"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"No ganó")}
make(ICON,KEEP,S,CUES,["disparo","rompe","esquiva"],["meta"],cut=CUT,
 epic={"climax":["padre","meta"],"heart":[["levantas","padre"]],"roar":["agarra","enpie"],"hit":["rompe"]})
