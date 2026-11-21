# 014 — historia encadenada épica: tú eres Bob Beamon (México 1968); el salto que el medidor no alcanzaba. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["lejos","medir","llegaba","literal","final","increíble","méxico","longitud","beamon","récord","treinta","silencio","corres","zancada","tabla","despegas","aire","sigues","arena","lejísimos",
 "medidor","raíl","sale","cinta","minutos","marcador","noventa","cincuenta","pies","rodillas","veintitrés","altitud","viento","volado","comentarios"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Quédate",type="rewind"),dict(seg=1,at="México",type="stadium"),dict(seg=1,at="Eres Bob",type="you"),dict(seg=2,at="Primer salto",type="silence"),
   dict(seg=2,at="Corres",type="run"),dict(seg=3,at="Pisas",type="takeoff"),dict(seg=4,at="Caes",type="land"),dict(seg=5,at="Los jueces",type="optical"),dict(seg=6,at="Traen",type="tape"),
   dict(seg=7,at="Y el marcador",type="board"),dict(seg=8,at="Pero tú",type="feet"),dict(seg=8,at="y caes",type="knees"),dict(seg=9,at="Ese récord",type="years"),dict(seg=10,at="¿Tú hasta",type="ask"),
   dict(seg=10,at="¿Lo pillas?",type="end"),dict(seg=10,at="Saltó tan",type="loop")]
CUES={"medir":(0,"que el aparato"),"literal":(0,"Literal"),"como":(0,"Quédate"),"mexico":(1,"México"),"final":(1,"Final olímpica"),"eres":(1,"Eres Bob"),"record":(1,"El récord"),
 "primer":(2,"Primer salto"),"silencio":(2,"Silencio"),"corres":(2,"Corres"),"zancada":(2,"Cada zancada"),"pisas":(3,"Pisas"),"despegas":(3,"y despegas"),"subes":(3,"Subes"),"aire":(3,"Y sigues en"),"sigues":(3,"Y sigues."),
 "caes":(4,"Caes"),"lejisimos":(4,"lejísimos"),"mas":(4,"Más allá"),"jueces":(5,"Los jueces"),"sale":(5,"y se sale"),"nollega":(5,"No llega"),"nadie":(6,"Nadie se"),"cinta":(6,"Traen"),"mano":(6,"Miden a"),"pasan":(6,"Pasan"),
 "marcador":(7,"Y el marcador"),"noventa":(7,"¡ocho metros"),"cincuenta":(7,"Cincuenta"),"pies":(8,"Pero tú"),"traduce":(8,"Tu compañero"),"rodillas":(8,"y caes"),"anos":(9,"Ese récord"),"altitud":(9,"La altitud"),"nadie2":(9,"Pero nadie"),
 "pregunta":(10,"¿Tú hasta"),"leo":(10,"Te leo"),"pillas":(10,"¿Lo pillas?"),"loop":(10,"Saltó tan")}
make(ICON,KEEP,S,CUES,["despegas","caes","sale"],["noventa","nadie2"],cut=CUT,
 epic={"climax":["despegas","rodillas"],"heart":[["primer","corres"],["mano","marcador"]],"roar":["noventa","rodillas"],"hit":["caes","sale"]})
