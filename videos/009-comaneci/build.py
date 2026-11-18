# 009 — historia encadenada: tú eres Nadia Comăneci; pabellón de Montreal 1976, barras asimétricas y el marcador que no sabía poner 10. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["perfecto","uno","truco","comăneci","catorce","asimétrica","baja","giras","alta","sueltas","coger","salida","pie","diez","perfecta","nunca","olímpicos",
 "cifra","coma","imposible","cero","nada","tampoco","megafonía","siete","oros","comentarios","marcador","respiración","aire","clavas","explota","problema","silencio"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="¿Qué ha",type="rewind"),dict(seg=1,at="Montreal",type="arena"),dict(seg=1,at="y el pabellón",type="hush"),dict(seg=2,at="Saltas",type="routine"),dict(seg=2,at="Te sueltas",type="release"),
   dict(seg=2,at="Última salida",type="dismount"),dict(seg=3,at="Los jueces",type="judges"),dict(seg=4,at="Pero hay",type="board"),dict(seg=4,at="Así que",type="digits"),dict(seg=5,at="Silencio",type="confused"),
   dict(seg=5,at="Hasta que",type="announce"),dict(seg=5,at="Y lo repites",type="seven"),dict(seg=6,at="¿Te imaginas",type="ask"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="A veces",type="loop")]
CUES={"uno1":(0,"y el marcador"),"unq":(0,"Un uno."),"espera":(0,"¿Qué ha"),"montreal":(1,"Montreal"),"eres":(1,"Eres Nadia"),"toca":(1,"Te toca"),"respira":(1,"y el pabellón"),
 "saltas":(2,"Saltas"),"giras":(2,"Giras"),"vuelas":(2,"Vuelas"),"sueltas":(2,"Te sueltas"),"aire":(2,"en el aire"),"coger":(2,"¡y la vuelves"),"ultima":(2,"Última salida"),"clavas":(2,"y la clavas"),"publico":(2,"¡El pabellón"),
 "jueces":(3,"Los jueces"),"deciden":(3,"Y deciden"),"diez":(3,"un diez"),"perfecta":(3,"La nota"),"nadie":(3,"Nunca nadie"),"pero":(4,"Pero hay"),"cifra":(4,"El marcador solo"),"fabricante":(4,"al fabricante"),
 "asi":(4,"Así que"),"d1":(4,"uno…"),"dc":(4,"coma…"),"d0a":(4,"cero… cero"),"d0b":(4,"cero."),"nada":(5,"Silencio"),"tampoco":(5,"Ni tú"),"anuncian":(5,"Hasta que"),"esdiez":(5,"¡es un diez!"),
 "repites":(5,"Y lo repites"),"siete":(5,"siete veces"),"oros":(5,"Y te llevas"),"imagina":(6,"¿Te imaginas"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"A veces")}
make(ICON,KEEP,S,CUES,["diez","d1","d0b"],["esdiez"],cut=CUT,epic={"climax":["clavas","esdiez"],"heart":[["respira","saltas"],["asi","d0b"]],"roar":["clavas","esdiez"],"hit":["uno1"]})
