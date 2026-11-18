# 011 — historia encadenada: tú eres John Isner; la misma pista 18 durante tres días, con el marcador que se rinde. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["largo","marcador","funcionar","wimbledon","dieciocho","isner","mahut","sets","noche","mañana","quinto","súbita","dos","saque","diez","treinta","cuarenta",
 "apaga","programado","nueve","tres","ocho","rompes","setenta","ganado","once","juegos","horas","comentarios"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Y no es",type="rewind"),dict(seg=1,at="Wimbledon",type="court"),dict(seg=1,at="y se hace",type="night1"),dict(seg=2,at="Día dos",type="day2"),
   dict(seg=2,at="Entonces",type="rule"),dict(seg=3,at="Diez a",type="count"),dict(seg=3,at="y el marcador",type="crash"),dict(seg=4,at="Cincuenta y nueve",type="night2"),dict(seg=4,at="Día tres",type="day3"),
   dict(seg=4,at="le rompes",type="break"),dict(seg=5,at="Once horas",type="stats"),dict(seg=6,at="¿Tú habrías",type="ask"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="Hay partidos",type="loop")]
CUES={"deja":(0,"que el marcador"),"forma":(0,"Y no es"),"wimbledon":(1,"Wimbledon"),"eres":(1,"Eres John"),"empatais":(1,"Empatáis"),"noche":(1,"y se hace"),"manana":(1,"Se sigue"),
 "dia2":(2,"Día dos"),"quinto":(2,"Quinto"),"entonces":(2,"Entonces"),"muerte":(2,"el último set"),"ninguno":(2,"Y ninguno"),"diez":(3,"Diez a"),"treinta":(3,"Treinta"),"c47":(3,"Cuarenta y siete"),
 "apaga":(3,"y el marcador"),"programado":(3,"No estaba"),"c59":(4,"Cincuenta y nueve"),"noche2":(4,"Otra vez"),"dia3":(4,"Día tres"),"seguis":(4,"Seguís"),"c69":(4,"con sesenta"),"rompes":(4,"le rompes"),
 "s70":(4,"Setenta a"),"ganado":(4,"Has ganado"),"once":(5,"Once horas"),"c183":(5,"Ciento"),"solo":(5,"Solo el"),"pregunta":(6,"¿Tú habrías"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"Hay partidos")}
make(ICON,KEEP,S,CUES,["deja","apaga","s70"],["ganado","c183"],cut=CUT)
