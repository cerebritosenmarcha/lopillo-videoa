# 006 — historia encadenada: tú eres Dick Fosbury; una sola pista que pasa del instituto (1963) a México 1968. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["espaldas","oro","campeones","fosbury","metro","medio","tripa","tijera","cadera","hombros","serrín","cuello","espuma","periódico","ríen","saltando",
 "méxico","olímpica","curva","giras","arqueas","veinticuatro","récord","múnich","veintiocho","cuarenta","brill","famoso","comentarios","alto"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="¿Cómo lo hizo?",type="rewind"),dict(seg=1,at="Oregón",type="oregon"),dict(seg=1,at="Tu entrenador",type="coach"),
   dict(seg=2,at="Así que",type="scissors"),dict(seg=3,at="¿Por qué nadie",type="sawdust"),dict(seg=3,at="Pero tu instituto",type="foam"),
   dict(seg=4,at="En mil",type="newspaper"),dict(seg=5,at="México",type="mexico"),dict(seg=5,at="Corres",type="flop68"),dict(seg=6,at="Cuatro años",type="munich"),
   dict(seg=6,at="Ojo",type="brill"),dict(seg=6,at="¿Qué otro",type="ask"),dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="A veces",type="loop")]
CUES={"oro":(0,"y ganó"),"hoy":(0,"Hoy casi"),"como":(0,"¿Cómo lo hizo?"),"oregon":(1,"Oregón"),"metro":(1,"no pasas"),"entren":(1,"Tu entrenador"),"lado":(1,"de lado"),"nosale":(1,"Y no te sale"),
 "asi":(2,"Así que"),"tijera":(2,"la tijera"),"cadera":(2,"Y en cada"),"hombros":(2,"echas"),"espaldas":(2,"hasta que"),
 "porque":(3,"¿Por qué nadie"),"serrin":(3,"Porque se caía"),"cuello":(3,"caer de espaldas"),"instituto":(3,"Pero tu instituto"),"espuma":(3,"colchones"),"ahora":(3,"Ahora sí"),
 "anio64":(4,"En mil"),"foto":(4,"publica tu foto"),"titular":(4,"«Fosbury"),"rien":(4,"Se ríen"),"sigues":(4,"Y tú sigues"),
 "mexico":(5,"México"),"final":(5,"Final olímpica"),"corres":(5,"Corres"),"giras":(5,"giras"),"arqueas":(5,"arqueas"),"dos24":(5,"¡dos metros"),"oro68":(5,"Oro y"),
 "munich":(6,"Cuatro años"),"v28":(6,"veintiocho"),"ojo":(6,"Ojo"),"brill":(6,"Debbie"),"famoso":(6,"pero Fosbury"),"pregunta":(6,"¿Qué otro"),"leo":(6,"Te leo"),
 "pillas":(6,"¿Lo pillas?"),"loop":(6,"A veces")}
make(ICON,KEEP,S,CUES,["metro","cuello","dos24","v28"],["espuma","oro68"],cut=CUT)
