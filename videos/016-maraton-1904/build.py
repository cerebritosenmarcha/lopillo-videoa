# 016 — historia encadenada épica corta: tú eres Thomas Hicks (San Luis 1904); el primero llegó en coche. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["primero","meta","coche","envenenado","hicks","calor","polvo","agua","rival","sentado","estricnina","veneno","huevo","brandi","tambaleándote","oro","pillan","descalificado","tuyo","trampa","loco"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Y el segundo",type="rewind"),dict(seg=1,at="San Luis",type="road"),dict(seg=2,at="A mitad",type="car"),dict(seg=3,at="Tú ya",type="poison"),
   dict(seg=4,at="Llegas",type="finish"),dict(seg=5,at="Le pillan",type="caught"),dict(seg=6,at="¿Trampa",type="ask"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="El primero",type="loop")]
CUES={"coche0":(0,"había hecho"),"como":(0,"Y el segundo"),"sanluis":(1,"San Luis"),"eres":(1,"Eres Thomas"),"calor":(1,"Calor"),"agua":(1,"y casi"),
 "mitad":(2,"A mitad"),"rival":(2,"te adelanta"),"sentado":(2,"Sentado"),"encoche":(2,"En un"),"nopuedes":(3,"Tú ya"),"equipo":(3,"Y tu equipo"),"estric":(3,"estricnina"),"huevo":(3,"con clara"),
 "llegas":(4,"Llegas"),"pero":(4,"Pero el"),"casi":(4,"y casi"),"pillan":(5,"Le pillan"),"descal":(5,"¡Descalificado!"),"oro":(5,"Y el oro"),"tiempo":(5,"tres horas"),
 "pregunta":(6,"¿Trampa"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"El primero")}
make(ICON,KEEP,S,CUES,["sentado","estric","descal"],["oro"],cut=CUT,
 epic={"climax":["rival","oro"],"heart":[["nopuedes","llegas"]],"roar":["casi","oro"],"hit":["encoche","descal"]})
