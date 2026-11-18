# 008 — historia encadenada: tú eres Shizo Kanakuri; Estocolmo y Japón a ambos lados del mismo lago, de 1912 a 1967. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["doce","sesenta","siete","cincuenta","récord","kanakuri","japón","dieciocho","agotado","calor","sol","mitad","sueca","zumo","bollos","descansar",
 "vergüenza","nadie","desapareció","años","corriendo","relevos","famosísima","televisión","terminar","setenta","meta","ocho","seis","comentarios"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=1,at="Eres Shizo",type="rewind"),dict(seg=1,at="Llegas",type="arrive"),dict(seg=2,at="¡Pum!",type="start"),
   dict(seg=2,at="Kilómetro",type="run"),dict(seg=2,at="Y en un jardín",type="farm"),dict(seg=3,at="Te da tanta",type="leave"),dict(seg=3,at="Y en Suecia",type="missing"),
   dict(seg=4,at="Pasan",type="years"),dict(seg=5,at="Hasta que",type="tv"),dict(seg=6,at="Vuelves",type="back"),dict(seg=6,at="y cruzas",type="finish"),dict(seg=6,at="Tiempo oficial",type="time"),
   dict(seg=7,at="¿Tú lo",type="ask"),dict(seg=7,at="¿Lo pillas?",type="end"),dict(seg=7,at="Nunca es",type="loop")]
CUES={"c54":(0,"en terminar"),"record":(0,"Y no es"),"estocolmo":(1,"Estocolmo"),"eres":(1,"Eres Shizo"),"llegas":(1,"Llegas"),"calor":(1,"destrozado"),"pum":(2,"¡Pum!"),"corres":(2,"Salida"),
 "sofocante":(2,"Un calor"),"mitad":(2,"Kilómetro"),"piernas":(2,"las piernas"),"familia":(2,"Y en un jardín"),"zumo":(2,"zumo"),"sientas":(3,"Te sientas"),"novuelves":(3,"Pero ya no"),
 "verg":(3,"Te da tanta"),"suecia":(3,"Y en Suecia"),"desap":(3,"el corredor"),"anos":(4,"Pasan"),"japon":(4,"Tú no paras"),"entrenas":(4,"entrenas"),"relevos":(4,"carrera de relevos"),
 "hasta":(5,"Hasta que"),"y1967":(5,"en mil"),"tv":(5,"una televisión"),"propone":(5,"y te propone"),"termina":(5,"termina lo"),"vuelves":(6,"Vuelves a"),"setenta":(6,"Con más"),
 "zancadas":(6,"Las últimas"),"meta":(6,"y cruzas"),"oficial":(6,"Tiempo oficial"),"t54":(6,"cincuenta y cuatro años, ocho"),"meses":(6,"ocho meses"),"pregunta":(7,"¿Tú lo"),"leo":(7,"Te leo"),"pillas":(7,"¿Lo pillas?"),"loop":(7,"Nunca es")}
make(ICON,KEEP,S,CUES,["c54","pum","desap","t54"],["meta"],cut=CUT,epic={"climax":["c54","meta"],"heart":[["zancadas","meta"]],"roar":["c54","meta"],"hit":["desap","t54"]})
