# 002 v2 — historia encadenada: guardas el móvil en un cajón. Escena: story.html (la versión anterior está en build_v1.py / scene.html)
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={"móvil":("cellphone","B"),"cajón":("archive","W"),"días":("calendar","W"),"cerebro":("brain","P"),"distinto":("flash","G"),"semanas":("calendar","W"),"alemania":("map-marker","R"),
 "jóvenes":("account-group","B"),"imprescindible":("phone","G"),"horas":("clock","W"),"cabeza":("head","B"),"fotos":("image","P"),"móviles":("cellphone","B"),"recompensa":("star","Y"),
 "placer":("heart","P"),"ganas":("candy","P"),"humor":("emoticon-neutral","W"),"dentro":("brain","P"),"estudio":("flask","B"),"personas":("account-group","B"),"internet":("web-off","R"),
 "llamadas":("phone","G"),"mensajes":("message","G"),"¿resultado?":("chart-bar","Y"),"ciento":("percent","G"),"atención":("target","G"),"mental":("head-heart","P"),"bienestar":("emoticon-happy","G"),
 "años":("timer-sand","W"),"edad":("account","W"),"cuarta":("numeric-4","R"),"aguantó":("timer","R"),"aguantarías":("help","Y"),"comentarios":("comment","B"),"pillas":("lightbulb-on","Y")}
KEEP=set()
S=[dict(seg=0,at="",type="drawer"),dict(seg=0,at="y en solo",type="days"),dict(seg=0,at="Y a las dos",type="weeks"),dict(seg=1,at="En Alemania",type="group"),dict(seg=1,at="Entremos",type="dive"),
   dict(seg=1,at="al ver",type="reward"),dict(seg=2,at="Eso sí",type="mood"),dict(seg=3,at="Otro estudio",type="crowd"),dict(seg=3,at="¿Resultado?",type="result"),dict(seg=3,at="Y la mejora",type="years"),
   dict(seg=4,at="Ojo",type="quarter"),dict(seg=4,at="¿Tú",type="ask"),dict(seg=4,at="¿Lo pillas?",type="end"),dict(seg=4,at="Tu cerebro empieza",type="loop")]
CUES={"tres":(0,"y en solo"),"cerebro":(0,"tu cerebro"),"dos":(0,"Y a las dos"),"alem":(1,"En Alemania"),"jov":(1,"veinticinco"),"impr":(1,"solo para"),"h72":(1,"durante setenta"),
 "entremos":(1,"Entremos"),"dentro":(1,"al ver"),"zonas":(1,"cambiaba"),"placer":(1,"las del placer"),"esosi":(2,"Eso sí"),"humor":(2,"no notaron"),"elcambio":(2,"El cambio"),
 "otro":(3,"Otro estudio"),"p467":(3,"cuatrocientas"),"bloq":(3,"bloquearon"),"llam":(3,"Llamadas"),"res":(3,"¿Resultado?"),"p91":(3,"El noventa"),"mejora":(3,"Y la mejora"),"diez":(3,"unos diez"),
 "ojo":(4,"Ojo"),"cuarta":(4,"una cuarta"),"tu":(4,"¿Tú"),"leo":(4,"Te leo"),"pillas":(4,"¿Lo pillas?"),"final":(4,"Tu cerebro empieza")}
make(ICON,KEEP,S,CUES,["tres","p467","p91","diez","cuarta"],["p91"],cut=CUT)
