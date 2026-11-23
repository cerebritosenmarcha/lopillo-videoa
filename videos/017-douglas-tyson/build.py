# 017 — historia encadenada épica corta: tú eres Buster Douglas (Tokio 1990); 42 a 1 contra Tyson. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["duro","cuarenta","dos","uno","tumbó","perdido","tokio","douglas","veintitrés","madre","tyson","treinta","siete","victorias","campana","aguantas","golpeas","asalto","octavo","gancho","tumba","nueve","levantas","décimo","derecha","izquierda","cae","primera","campeón","suerte","ganó"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Y tumbó",type="rewind"),dict(seg=1,at="Tokio",type="arena"),dict(seg=2,at="Delante",type="tyson"),dict(seg=3,at="Suena",type="bell"),
   dict(seg=4,at="Octavo",type="down"),dict(seg=5,at="Décimo",type="ko"),dict(seg=6,at="¡Campeón",type="champ"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="Cuarenta y dos a uno… y",type="loop")]
CUES={"odds":(0,"cuarenta y dos"),"como":(0,"Y tumbó"),"tokio":(1,"Tokio"),"eres":(1,"Eres Buster"),"madre":(1,"Hace veintitrés"),"delante":(2,"Delante"),"c37":(2,"Treinta y siete combates"),"v37":(2,"Treinta y siete victorias"),
 "campana":(3,"Suena"),"aguantas":(3,"Y tú"),"golpeas":(3,"Golpeas"),"asaltos":(3,"Asalto tras"),"octavo":(4,"Octavo"),"gancho1":(4,"Un gancho"),"uno":(4,"Uno, dos"),"nueve":(4,"nueve."),"levantas":(4,"¡Te levantas!"),
 "decimo":(5,"Décimo"),"g2":(5,"Gancho."),"der":(5,"Derecha"),"izq":(5,"Izquierda"),"cae":(5,"Y Tyson"),"primera":(5,"por primera"),"campeon":(6,"¡Campeón"),"pregunta":(6,"¿Suerte"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"Cuarenta y dos a uno… y")}
make(ICON,KEEP,S,CUES,["gancho1","der","izq"],["campeon"],cut=CUT,
 epic={"climax":["levantas","cae"],"heart":[["delante","campana"],["uno","levantas"]],"roar":["levantas","campeon"],"hit":["gancho1","izq"]})
