# 019 — historia encadenada épica corta: tú eres Steven Gerrard (Estambul 2005); de 0–3 a campeones. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["tres","cero","descanso","champions","copa","estambul","gerrard","capitán","liverpool","milan","vestuario","silencio","grada","cantar","campo","cabezazo","gol","penalti","rechace","seis","prórroga","shevchenko","bocajarro","dudek","dos","penaltis","último","lanza","para","campeones","milagro","confió"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="y acabaron",type="rewind"),dict(seg=1,at="Estambul",type="stadium"),dict(seg=2,at="En el vestuario",type="room"),dict(seg=2,at="Pero en",type="fans"),
   dict(seg=3,at="Vuelves",type="back"),dict(seg=3,at="Cabezazo",type="g1"),dict(seg=3,at="Penalti",type="g3"),dict(seg=4,at="Prórroga",type="et"),dict(seg=5,at="Penaltis",type="pens"),dict(seg=5,at="¡Campeones!",type="champ"),
   dict(seg=6,at="¿Milagro",type="ask"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="Tres a cero en el descanso… y",type="loop")]
CUES={"copa0":(0,"y acabaron"),"como":(0,"y acabaron"),"estambul":(1,"Estambul"),"eres":(1,"Eres Steven"),"descanso":(1,"Descanso"),"vest":(2,"En el vestuario"),"canta":(2,"Pero en"),
 "vuelves":(3,"Vuelves"),"g1":(3,"Cabezazo"),"gol1":(3,"¡gol! Otro"),"g2":(3,"Otro"),"g3":(3,"Penalti"),"gol3":(3,"rechace"),"seis":(3,"En seis"),"tres3":(3,"Tres a tres"),
 "pro":(4,"Prórroga"),"shev":(4,"Shevchenko remata"),"dudek":(4,"y tu portero"),"para2":(4,"para las dos"),"pens":(5,"Penaltis"),"ultimo":(5,"El último"),"lanza":(5,"Dudek se"),"lapara":(5,"¡y la para!"),"campeones":(5,"¡Campeones!"),
 "pregunta":(6,"¿Milagro"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"Tres a cero en el descanso… y")}
make(ICON,KEEP,S,CUES,["g1","g2","gol3","para2"],["lapara"],cut=CUT,
 epic={"climax":["g1","lapara"],"heart":[["vest","canta"],["ultimo","lapara"]],"roar":["g1","g2","gol3","campeones"],"hit":["para2","lapara"]})
