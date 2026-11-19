# 010 — historia encadenada épica: tú eres Felix Baumgartner; del desierto de Nuevo México a 39 km y de vuelta, en una sola toma. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["nueve","avión","sonido","cuerpo","final","baumgartner","globo","cápsula","diez","veinte","treinta","visor","empaña","seguir","millones","directo","puerta","curva",
 "tierra","kittinger","ángel","saltas","aire","aceleras","quinientos","ochocientos","mil","siete","peonza","conocimiento","acabó","brazos","aguantas","controlas","espesa","cuatro","paracaídas","pie","comentarios"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Quédate",type="rewind"),dict(seg=1,at="Octubre",type="ground"),dict(seg=1,at="Un globo",type="ascent"),dict(seg=2,at="Pero el visor",type="visor"),
   dict(seg=3,at="Treinta y nueve",type="top"),dict(seg=3,at="Abres",type="door"),dict(seg=4,at="Por la radio",type="radio"),dict(seg=4,at="Y saltas",type="jump"),dict(seg=5,at="Aceleras",type="accel"),
   dict(seg=6,at="Mil trescientos",type="mach"),dict(seg=7,at="Y empiezas",type="spin"),dict(seg=8,at="Estiras",type="control"),dict(seg=9,at="El aire se",type="brake"),dict(seg=9,at="Paracaídas",type="chute"),
   dict(seg=9,at="y aterrizas",type="land"),dict(seg=10,at="¿Tú te",type="ask"),dict(seg=10,at="¿Lo pillas?",type="end"),dict(seg=10,at="Sin aire que",type="loop")]
CUES={"sinavion":(0,"Sin avión"),"romper":(0,"Y vas a"),"cuerpo":(0,"con tu cuerpo"),"como":(0,"Quédate"),"octubre":(1,"Octubre"),"eres":(1,"Eres Felix"),"globo":(1,"Un globo"),
 "k10":(1,"Diez kil"),"k20":(1,"Veinte."),"k30":(1,"Treinta…"),"visor":(2,"Pero el visor"),"empana":(2,"Si se empaña"),"seguir":(2,"Decides"),
 "ahi":(3,"Treinta y nueve"),"millones":(3,"Ocho millones"),"abres":(3,"Abres la"),"curva":(3,"Ves la"),"radio":(4,"Por la radio"),"angel":(4,"«Tu ángel"),"saltas":(4,"Y saltas"),
 "frene":(5,"Casi no hay"),"aceleras":(5,"Aceleras"),"s500":(5,"Quinientos"),"s800":(5,"Ochocientos"),"s1000":(5,"Mil."),"sonido":(6,"Mil trescientos"),"mas":(6,"Más rápido"),
 "peonza":(7,"Y empiezas"),"perder":(7,"Si pierdes"),"acabo":(7,"se acabó"),"estiras":(8,"Estiras"),"aguantas":(8,"Aguantas"),"controlas":(8,"Y lo controlas"),
 "bajar":(9,"El aire se"),"tras":(9,"Cuatro minutos"),"chute":(9,"Paracaídas"),"aterrizas":(9,"y aterrizas"),"pregunta":(10,"¿Tú te"),"leo":(10,"Te leo"),"pillas":(10,"¿Lo pillas?"),"loop":(10,"Sin aire que")}
make(ICON,KEEP,S,CUES,["saltas","sonido","controlas"],["sonido","aterrizas"],cut=CUT,
 epic={"climax":["saltas","aterrizas"],"heart":[["radio","saltas"],["perder","controlas"]],"roar":["aterrizas"],"hit":["sonido","controlas"]})
