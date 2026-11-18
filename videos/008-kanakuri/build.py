# 008 — historia encadenada: tú eres Shizo Kanakuri; Estocolmo y Japón a ambos lados del mismo lago, de 1912 a 1967. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["doce","sesenta","siete","cincuenta","récord","kanakuri","japón","dieciocho","agotado","calor","sol","mitad","sueca","zumo","bollos","descansar",
 "vergüenza","nadie","desapareció","años","corriendo","relevos","famosísima","televisión","terminar","setenta","meta","ocho","seis","comentarios"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=1,at="Eres Shizo",type="rewind"),dict(seg=1,at="Llegas",type="arrive"),dict(seg=1,at="Y el día",type="heat"),
   dict(seg=2,at="Corres",type="run"),dict(seg=2,at="Una familia",type="farm"),dict(seg=3,at="Te da tanta",type="leave"),dict(seg=3,at="Y en Suecia",type="missing"),
   dict(seg=4,at="Pasan",type="years"),dict(seg=5,at="Hasta que",type="tv"),dict(seg=5,at="Con más",type="back"),dict(seg=6,at="Tiempo oficial",type="time"),
   dict(seg=6,at="¿Tú lo",type="ask"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="Nunca es",type="loop")]
CUES={"termin":(0,"y lo terminaste"),"c54":(0,"Cincuenta"),"record":(0,"Y es récord"),"eres":(1,"Eres Shizo"),"llegas":(1,"Llegas"),"agotado":(1,"agotado"),"calor":(1,"Y el día"),
 "corres":(2,"Corres"),"sol":(2,"El sol"),"mitad":(2,"Hacia la mitad"),"nopuedes":(2,"ya no puedes"),"familia":(2,"Una familia"),"zumo":(2,"zumo"),"sientas":(2,"Te sientas"),"novuelves":(2,"y ya no"),
 "verg":(3,"Te da tanta"),"suecia":(3,"Y en Suecia"),"decadas":(3,"durante décadas"),"anos":(4,"Pasan"),"japon":(4,"En Japón"),"entrenas":(4,"entrenas"),"relevos":(4,"carrera de relevos"),
 "hasta":(5,"Hasta que"),"y1967":(5,"en mil"),"tv":(5,"una televisión"),"setenta":(5,"Con más"),"vuelves":(5,"vuelves a"),"meta":(5,"y cruzas"),
 "oficial":(6,"Tiempo oficial"),"t54":(6,"cincuenta y cuatro"),"meses":(6,"ocho meses"),"pregunta":(6,"¿Tú lo"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"Nunca es")}
make(ICON,KEEP,S,CUES,["c54","nopuedes","t54"],["c54","meta"],cut=CUT)
