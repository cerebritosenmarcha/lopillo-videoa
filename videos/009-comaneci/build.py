# 009 — historia encadenada: tú eres Nadia Comăneci; pabellón de Montreal 1976, barras asimétricas y el marcador que no sabía poner 10. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["perfecto","uno","truco","comăneci","catorce","asimétrica","baja","giras","alta","sueltas","coger","salida","pie","diez","perfecta","nunca","olímpicos",
 "cifra","coma","imposible","cero","nada","tampoco","megafonía","siete","oros","comentarios","marcador"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Espera",type="rewind"),dict(seg=1,at="Montreal",type="arena"),dict(seg=2,at="Saltas",type="routine"),dict(seg=2,at="y clavas",type="landing"),
   dict(seg=3,at="Los jueces",type="judges"),dict(seg=4,at="Pero el marcador",type="board"),dict(seg=4,at="Así que",type="digits"),dict(seg=5,at="El público",type="confused"),
   dict(seg=5,at="Hasta que",type="announce"),dict(seg=5,at="Y en esos",type="seven"),dict(seg=6,at="¿Te imaginas",type="ask"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="A veces",type="loop")]
CUES={"uno1":(0,"y el marcador"),"unq":(0,"¿Un uno?"),"espera":(0,"Espera"),"montreal":(1,"Montreal"),"eres":(1,"Eres Nadia"),"catorce":(1,"tienes catorce"),"toca":(1,"y te toca"),
 "saltas":(2,"Saltas"),"giras":(2,"giras"),"vuelas":(2,"vuelas"),"sueltas":(2,"te sueltas"),"coger":(2,"la vuelves"),"clavas":(2,"y clavas"),"publico":(2,"El público"),
 "jueces":(3,"Los jueces"),"diez":(3,"un diez"),"perfecta":(3,"La nota"),"nadie":(3,"Nadie"),"pero":(4,"Pero el marcador"),"fabricante":(4,"Al fabricante"),"asi":(4,"Así que"),
 "d1":(4,"uno, coma"),"dc":(4,"coma, cero"),"d0a":(4,"cero, cero"),"d0b":(4,"cero."),"nada":(5,"El público"),"tampoco":(5,"Tú tampoco"),"anuncian":(5,"Hasta que"),"esdiez":(5,"es un diez"),
 "repites":(5,"Y en esos"),"siete":(5,"siete veces"),"oros":(5,"tres oros"),"imagina":(6,"¿Te imaginas"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"A veces")}
make(ICON,KEEP,S,CUES,["diez","d1","esdiez"],["diez","oros"],cut=CUT)
