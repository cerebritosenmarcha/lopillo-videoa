# 012 — historia encadenada épica: tú eres Roberto Carlos; el vuelo del balón a cámara ultralenta y la espiral explicada. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["fuera","física","dentro","lenta","lyon","brasil","cinco","carlos","balón","paso","dieciocho","barrera","zurda","efecto","abierto","recogepelotas","agacha",
 "gira","curva","palo","entra","barthez","magia","espiral","lejos","comentarios"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Quédate",type="rewind"),dict(seg=1,at="Lyon",type="stadium"),dict(seg=1,at="Eres Roberto",type="you"),dict(seg=2,at="Y te alejas",type="steps"),
   dict(seg=2,at="Barthez",type="wall"),dict(seg=3,at="Corres",type="kick"),dict(seg=3,at="El balón sale",type="flight"),dict(seg=3,at="Tan fuera",type="ballboy"),dict(seg=4,at="Y entonces",type="curve"),
   dict(seg=4,at="¡y entra!",type="goal"),dict(seg=5,at="¿Magia?",type="physics"),dict(seg=5,at="Y solo funciona",type="far"),dict(seg=6,at="¿Tú habrías",type="ask"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="A veces",type="loop")]
CUES={"fisica0":(0,"y la física"),"quedate":(0,"Quédate"),"lenta":(0,"que al final"),"lyon":(1,"Lyon"),"francia":(1,"Francia contra"),"falta":(1,"Falta a"),"eres":(1,"Eres Roberto"),
 "colocas":(2,"Colocas"),"alejas":(2,"Y te alejas"),"p1":(2,"Un paso"),"p2":(2,"Otro."),"p3":(2,"Y otro"),"p18":(2,"Dieciocho"),"barthez":(2,"Barthez"),"nadie":(2,"Nadie espera"),
 "corres":(3,"Corres"),"golpeas":(3,"y golpeas"),"efecto":(3,"fortísimo"),"disparado":(3,"El balón sale"),"abierto":(3,"muy abierto"),"barrera":(3,"por fuera"),"tanfuera":(3,"Tan fuera"),"agacha":(3,"que un recogepelotas"),
 "entonces":(4,"Y entonces"),"gira":(4,"gira."),"curva":(4,"Se curva"),"mas":(4,"más y más"),"roza":(4,"roza el palo"),"entra":(4,"¡y entra!"),"nimueve":(4,"Barthez ni"),
 "magia":(5,"¿Magia?"),"fisica":(5,"física."),"franceses":(5,"Unos físicos"),"gira2":(5,"un balón que gira"),"frenarse":(5,"al frenarse"),"espiral":(5,"como una espiral"),"lejos":(5,"Y solo funciona"),
 "pregunta":(6,"¿Tú habrías"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"A veces")}
make(ICON,KEEP,S,CUES,["golpeas","p18","fisica"],["entra"],cut=CUT,epic={"climax":["fisica0","entra"],"heart":[["nadie","golpeas"],["mas","entra"]],"roar":["entra"],"hit":["golpeas","fisica"]})
