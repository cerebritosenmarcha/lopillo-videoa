# 011 — historia encadenada: tú eres John Isner; la misma pista 18 durante tres días, con el marcador que se rinde. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["largo","marcador","funcionar","wimbledon","dieciocho","isner","mahut","sets","noche","mañana","quinto","súbita","dos","saque","diez","treinta","cuarenta",
 "apaga","programado","nueve","tres","ocho","rompes","setenta","ganado","once","juegos","horas","comentarios","locos","nadie","falla","agotado","abarrotada","bola","red","revés","paralelo"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Y quédate",type="promise"),dict(seg=1,at="Wimbledon",type="court"),dict(seg=1,at="y se hace",type="night1"),dict(seg=2,at="Día dos",type="day2"),
   dict(seg=3,at="Diez a",type="count"),dict(seg=3,at="y el marcador",type="crash"),dict(seg=4,at="Cincuenta y nueve",type="night2"),dict(seg=4,at="Día tres",type="day3"),
   dict(seg=5,at="Sesenta y nueve",type="matchpoint"),dict(seg=5,at="Sube a",type="net"),dict(seg=5,at="y le pasas",type="pass"),dict(seg=5,at="¡Has ganado",type="win"),dict(seg=6,at="Once horas",type="stats"),
   dict(seg=7,at="¿Tú habrías",type="ask"),dict(seg=7,at="¿Lo pillas?",type="end"),dict(seg=7,at="Hay partidos",type="loop")]
CUES={"deja":(0,"que rompió"),"forma":(0,"Y quédate"),"wimbledon":(1,"Wimbledon"),"eres":(1,"Eres John"),"empatais":(1,"Dos sets"),"noche":(1,"y se hace"),"manana":(1,"Se sigue"),
 "entonces":(2,"Y entonces"),"muerte":(2,"el último set"),"dia2":(2,"Día dos"),"quinto":(2,"Día dos"),"ninguno":(2,"Nadie falla"),"diez":(3,"Diez a"),"treinta":(3,"Treinta"),"c47":(3,"Cuarenta y siete"),
 "apaga":(3,"y el marcador"),"programado":(3,"No estaba"),"c59":(4,"Cincuenta y nueve"),"noche2":(4,"Otra vez"),"agotado":(4,"Estás agotado"),"dia3":(4,"Día tres"),"abarrotada":(4,"La pista"),
 "c69":(5,"Sesenta y nueve"),"saca":(5,"Saca él"),"quinta":(5,"Quinta bola"),"red":(5,"Sube a"),"reves":(5,"y le pasas"),"s70":(5,"¡Setenta"),"ganado":(5,"¡Has ganado"),
 "once":(6,"Once horas"),"c183":(6,"Ciento"),"solo":(6,"Solo el"),"pregunta":(7,"¿Tú habrías"),"leo":(7,"Te leo"),"pillas":(7,"¿Lo pillas?"),"loop":(7,"Hay partidos")}
make(ICON,KEEP,S,CUES,["deja","apaga","once","c183"],["ganado"],cut=CUT,epic={"climax":["apaga","s70"],"heart":[["c69","reves"]],"roar":["s70"],"hit":["deja","solo"]})
