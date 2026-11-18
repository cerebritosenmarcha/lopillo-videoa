# 010 — historia encadenada: tú eres Felix Baumgartner; del desierto de Nuevo México a 39 km y de vuelta, en una sola toma. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["sonido","avión","cohete","traje","baumgartner","globo","cápsula","nueve","aire","presurizado","astronauta","puerta","curva","tierra","saltas","frene",
 "aceleras","cincuenta","siete","peonza","conocimiento","brazos","controlas","denso","paracaídas","veinte","pie","comentarios"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="¿Cómo",type="rewind"),dict(seg=1,at="Octubre",type="ground"),dict(seg=1,at="Un globo",type="ascent"),dict(seg=2,at="Ahí arriba",type="noair"),
   dict(seg=2,at="Abres",type="door"),dict(seg=2,at="y saltas",type="jump"),dict(seg=3,at="A los cincuenta",type="mach"),dict(seg=4,at="De pronto",type="spin"),dict(seg=4,at="Estiras",type="control"),
   dict(seg=5,at="Al bajar",type="brake"),dict(seg=5,at="Abres el",type="chute"),dict(seg=5,at="aterrizas",type="land"),dict(seg=6,at="¿Tú te",type="ask"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="Sin aire que",type="loop")]
CUES={"sinavion":(0,"Sin avión"),"traje":(0,"solo con"),"como":(0,"¿Cómo"),"octubre":(1,"Octubre"),"eres":(1,"Eres Felix"),"globo":(1,"Un globo"),"ahi":(2,"Ahí arriba"),"presu":(2,"Por eso"),
 "astro":(2,"como un"),"abres":(2,"Abres la"),"curva":(2,"ves la"),"saltas":(2,"y saltas"),"frene":(3,"Como apenas"),"aceleras":(3,"aceleras"),"cincuenta":(3,"A los cincuenta"),"sonido":(3,"más rápido"),
 "peonza":(4,"De pronto"),"siNo":(4,"Si no paras"),"perder":(4,"podrías"),"estiras":(4,"Estiras"),"controlas":(4,"y lo controlas"),"bajar":(5,"Al bajar"),"denso":(5,"el aire se"),
 "chute":(5,"Abres el"),"tras":(5,"tras cuatro"),"aterrizas":(5,"aterrizas"),"pregunta":(6,"¿Tú te"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"Sin aire que")}
make(ICON,KEEP,S,CUES,["saltas","sonido","chute"],["sonido","aterrizas"],cut=CUT)
