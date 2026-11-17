# 003 v2 — historia encadenada con protagonista (ver plan.md). La escena es story.html.
import sys; sys.path.insert(0, '../../engine'); from build_lib import make
import os
CUT = float(sys.argv[1]) if len(sys.argv) > 1 else (float(os.environ['CUT']) if os.environ.get('CUT') else None)   # demo recortada: CUT=25.55
ICON={"alarma":("alarm","R"),"ojos":("eye","B"),"cabeza":("head","B"),"cerebro":("brain","P"),"reloj":("clock-outline","W"),"circadiano":("clock-outline","W"),
 "orden":("bullhorn","Y"),"hipófisis":("circle","O"),"hormona":("molecule","G"),"acth":("molecule","G"),"sangre":("water","R"),"suprarrenales":("circle","O"),
 "cortisol":("lightning-bolt","Y"),"motor":("engine","R"),"despiertas":("eye","B"),"móvil":("cellphone","B"),"alemania":("map-marker","R"),"laboratorio":("flask","B"),
 "voluntarios":("account-group","B"),"seis":("alarm","R"),"siete":("clock-outline","W"),"sorpresa":("emoticon-confused","Y"),"comentarios":("comment","B"),"pillas":("lightbulb-on","Y")}
KEEP=set()
S=[dict(seg=0,at="",type="room"),
   dict(seg=1,at="Entremos",type="dive"),
   dict(seg=1,at="da la orden",type="order"),
   dict(seg=2,at="La ACTH viaja",type="blood"),
   dict(seg=2,at="cortisol:",type="cortisol"),
   dict(seg=2,at="Tu cuerpo enciende",type="wake"),
   dict(seg=3,at="¿Y cómo",type="lab"),dict(seg=3,at="En Alemania",type="team"),dict(seg=3,at="metió a quince",type="beds"),dict(seg=3,at="y les sacó",type="tubes"),
   dict(seg=3,at="Solían",type="clock"),dict(seg=3,at="A unos",type="groups"),dict(seg=4,at="Y casi",type="rise"),dict(seg=4,at="A los que",type="flat"),
   dict(seg=4,at="Eso sí",type="caveat"),dict(seg=4,at="¿A ti",type="back"),dict(seg=4,at="¿Lo pillas?",type="end"),dict(seg=4,at="Tu cuerpo ya sabe",type="loop")]
CUES={"ojos":(0,"ojos"),"suena":(0,"suena"),"casual":(0,"¿Casualidad?"),"no":(0,"No:"),"entremos":(1,"Entremos"),"dentro":(1,"Tu cerebro"),
 "reloj":(1,"un reloj interno"),"aprende":(1,"que aprende"),"antes":(1,"Y antes"),"orden":(1,"da la orden"),"hipo":(1,"una glándula"),"suelta":(1,"suelta"),
 "acth":(1,"la ACTH."),"viaja":(2,"La ACTH viaja"),"supra":(2,"hasta las glándulas"),"estas":(2,"y estas fabrican"),"cortisol":(2,"cortisol:"),
 "motor":(2,"Tu cuerpo enciende"),"desp":(2,"despiertas"),"movil":(2,"móvil."),
 "como":(3,"¿Y cómo"),"alem":(3,"En Alemania"),"quince":(3,"metió a quince"),"sangre":(3,"y les sacó"),"solian":(3,"Solían"),"unos":(3,"A unos"),
 "casi":(4,"Y casi"),"sorpresa":(4,"A los que"),"esosi":(4,"Eso sí"),"ati":(4,"¿A ti"),"pillas":(4,"¿Lo pillas?"),"final":(4,"Tu cuerpo ya sabe")}
make(ICON,KEEP,S,CUES,["no","orden","cortisol","quince","casi","sorpresa"],["desp","casi"],cut=CUT)
