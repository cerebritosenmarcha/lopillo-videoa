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
   dict(seg=2,at="Tu cuerpo enciende",type="wake")]
CUES={"ojos":(0,"ojos"),"suena":(0,"suena"),"casual":(0,"¿Casualidad?"),"no":(0,"No:"),"entremos":(1,"Entremos"),"dentro":(1,"Tu cerebro"),
 "reloj":(1,"un reloj interno"),"aprende":(1,"que aprende"),"antes":(1,"Y antes"),"orden":(1,"da la orden"),"hipo":(1,"una glándula"),"suelta":(1,"suelta"),
 "acth":(1,"la ACTH."),"viaja":(2,"La ACTH viaja"),"supra":(2,"hasta las glándulas"),"estas":(2,"y estas fabrican"),"cortisol":(2,"cortisol:"),
 "motor":(2,"Tu cuerpo enciende"),"desp":(2,"despiertas"),"movil":(2,"móvil.")}
make(ICON,KEEP,S,CUES,["no","orden","cortisol"],["desp"],cut=CUT)
