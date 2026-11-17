# 004 v2 — historia encadenada con protagonista. Escena: story.html (ver plan.md)
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={"vivido":("eye","B"),"futuro":("crystal-ball","P"),"cerebro":("brain","P"),"error":("alert","R"),"cabeza":("head","B"),"temporal":("brain","P"),"recuerdos":("archive","Y"),
 "familiar":("bell","Y"),"suena":("bell","Y"),"suena»":("bell","Y"),"motivo":("help","Y"),"frontal":("magnify","B"),"comprueba":("magnify","B"),"archivo":("archive","Y"),"nada":("close","R"),
 "choque":("flash","R"),"vu":("eye","B"),"escocia":("map-marker","B"),"laboratorio":("flask","B"),"cama":("bed","B"),"almohada":("cloud","W"),"noche":("weather-night","B"),
 "d":("alpha-d","W"),"«dormir»":("sleep","B"),"escáner":("radar","B"),"conflictos":("flash","R"),"detector":("magnify","B"),"errores":("alert","R"),"memoria":("archive","Y"),
 "edad":("account","W"),"último":("clock","W"),"comentarios":("comment","B"),"pillas":("lightbulb-on","Y"),"calidad":("check-decagram","G")}
KEEP=set()
S=[dict(seg=0,at="",type="cafe"),dict(seg=1,at="Entremos",type="dive"),dict(seg=1,at="«esto me suena»",type="bell"),dict(seg=2,at="Entonces",type="frontal"),
   dict(seg=2,at="busca ese",type="search"),dict(seg=2,at="Ese choque",type="clash"),dict(seg=3,at="En Escocia",type="exit"),dict(seg=3,at="Oías",type="words"),
   dict(seg=3,at="¿Había",type="d"),dict(seg=3,at="¿Y «dormir»?",type="dormir"),dict(seg=3,at="Y en el escáner",type="scan"),dict(seg=4,at="O sea",type="detector"),
   dict(seg=4,at="Y tranquilo",type="memory"),dict(seg=4,at="y con la edad",type="age"),dict(seg=4,at="¿Cuándo",type="back"),dict(seg=4,at="¿Lo pillas?",type="end"),dict(seg=4,at="La próxima",type="loop")]
CUES={"vivido":(0,"«esto ya"),"nofut":(0,"No es ver"),"error":(0,"Es tu cerebro"),"entremos":(1,"Entremos"),"dentro":(1,"En el lóbulo"),"familiar":(1,"familiar:"),
 "suena1":(1,"«esto me suena»"),"expl":(1,"Y una explicación"),"dispara":(1,"se dispara"),"frontal":(2,"Entonces"),"busca":(2,"busca ese"),"nada":(2,"y no hay nada"),
 "choque":(2,"Ese choque"),"dejavu":(2,"déjà vu."),"escocia":(3,"En Escocia"),"oias":(3,"Oías"),"cama":(3,"cama,"),"almo":(3,"almohada"),"noche":(3,"noche…"),
 "conD":(3,"¿Había"),"no":(3,"No. ¿Y"),"dormir":(3,"¿Y «dormir»?"),"tesuena":(3,"Te suena"),"pero":(3,"pero sabes"),"escaner":(3,"Y en el escáner"),"zona":(3,"la zona frontal"),
 "recuerdos":(3,"no la de los recuerdos"),"osea":(4,"O sea"),"detector":(4,"detector"),"tranq":(4,"Y tranquilo"),"edad":(4,"y con la edad"),"cuando":(4,"¿Cuándo"),
 "leo":(4,"Te leo"),"pillas":(4,"¿Lo pillas?"),"final":(4,"La próxima vez")}
make(ICON,KEEP,S,CUES,["nada","dejavu","no","zona"],["dejavu","detector"],cut=CUT)
