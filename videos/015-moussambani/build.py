# 015 — historia encadenada épica: tú eres Eric Moussambani (Sídney 2000); nadar solo los 100 libres. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["descalificados","piscina","solo","estadio","final","llegar","sídney","moussambani","guinea","ocho","lago","hotel","nunca","cincuenta","hoy","cien","rivales","tiempo","silbato","saltas",
 "tope","pared","vuelta","largo","brazos","agarrotan","paras","pie","gritan","voz","brazo","otro","tocas","minuto","dos","lento","ganas","seleccionador","agua","comentarios","ganar"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Quédate",type="rewind"),dict(seg=1,at="Sídney",type="pool"),dict(seg=1,at="Hace solo",type="months"),dict(seg=2,at="Y nunca",type="fifty"),
   dict(seg=3,at="Tus dos",type="false"),dict(seg=4,at="Así que",type="alone"),dict(seg=4,at="Saltas",type="dive"),dict(seg=5,at="Tocas la",type="turn"),dict(seg=6,at="Te pesan",type="tired"),
   dict(seg=7,at="Y entonces",type="crowd"),dict(seg=8,at="Un brazo",type="push"),dict(seg=9,at="¡Tocas!",type="touch"),dict(seg=10,at="Años después",type="coach"),dict(seg=10,at="¿Tú te",type="ask"),
   dict(seg=10,at="¿Lo pillas?",type="end"),dict(seg=10,at="A veces",type="loop")]
CUES={"piscina0":(0,"Una piscina"),"estadio0":(0,"Y un estadio"),"como":(0,"Quédate"),"sidney":(1,"Sídney"),"eres":(1,"Eres Eric"),"meses":(1,"Hace solo"),"lago":(1,"Entrenabas"),
 "nunca":(2,"Y nunca"),"hoy":(2,"Hasta hoy"),"serie":(3,"Serie de"),"rivales":(3,"Tus dos"),"descal":(3,"¡Descalificados!"),"solo":(4,"Así que"),"silbato":(4,"Silbato"),"saltas":(4,"Saltas"),
 "tope":(5,"Los primeros"),"pared":(5,"Tocas la"),"vuelta":(5,"y das"),"falta":(5,"Falta otro"),"pesan":(6,"Te pesan"),"agarrotan":(6,"Las piernas"),"paras":(6,"Casi te"),
 "pie":(7,"Y entonces"),"gritan":(7,"Te gritan"),"voz":(7,"Te empujan"),"brazo":(8,"Un brazo"),"otro":(8,"Otro."),"nollega":(8,"La pared no"),
 "tocas":(9,"¡Tocas!"),"tiempo":(9,"Un minuto"),"lento":(9,"El cien"),"ganas":(9,"y ganas"),"coach":(10,"Años después"),"pregunta":(10,"¿Tú te"),"leo":(10,"Te leo"),"pillas":(10,"¿Lo pillas?"),"loop":(10,"A veces")}
make(ICON,KEEP,S,CUES,["descal","saltas","pared"],["tocas","ganas"],cut=CUT,
 epic={"climax":["saltas","tocas"],"heart":[["pesan","pie"],["brazo","tocas"]],"roar":["pie","tocas"],"hit":["descal","pared"]})
