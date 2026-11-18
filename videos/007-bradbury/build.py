# 007 — historia encadenada: tú eres Steven Bradbury; la misma pista de hielo de cuartos a la final (Salt Lake City 2002). Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["lento","oro","bradbury","rápidos","tercero","eliminado","descalifican","pasas","último","chocan","esquivas","primero","final","idea","atrás","caídas","lejos",
 "cinco","quince","vuelta","curva","li","ohno","ahn","suelo","dominó","hueco","solo","alto","australia","sur","suerte","rendiste","comentarios","pie"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="¿Cómo?",type="rewind"),dict(seg=1,at="Salt Lake",type="quarter"),dict(seg=1,at="hasta que",type="dq"),
   dict(seg=2,at="Semifinal",type="semi"),dict(seg=3,at="Y entonces",type="idea"),dict(seg=4,at="Final.",type="final"),dict(seg=4,at="Li roza",type="crash"),
   dict(seg=5,at="Tú pasas",type="win"),dict(seg=5,at="¡Oro!",type="gold"),dict(seg=6,at="¿Suerte?",type="luck"),dict(seg=6,at="¿Tú lo",type="ask"),
   dict(seg=6,at="¿Lo pillas?",type="end"),dict(seg=6,at="A veces",type="loop")]
CUES={"oro":(0,"y vas"),"como":(0,"¿Cómo?"),"salt":(1,"Salt Lake"),"eres":(1,"Eres Steven"),"rivales":(1,"y tus rivales"),"cuartos":(1,"En cuartos"),"elim":(1,"eliminado"),
 "descal":(1,"hasta que"),"pasas":(1,"Pasas"),"semi":(2,"Semifinal"),"ultimo":(2,"Vas último"),"curva":(2,"En la última"),"chocan":(2,"tus rivales chocan"),"esquivas":(2,"Tú los"),
 "entras":(2,"y entras"),"estas":(2,"Estás en"),"idea":(3,"Y entonces"),"atras":(3,"quédate"),"pista":(3,"En la pista"),"lejos":(3,"tú estarás"),"final":(4,"Final."),
 "cinco":(4,"Cinco"),"quince":(4,"a unos quince"),"ultvuelta":(4,"Última vuelta"),"ultcurva":(4,"Última curva"),"roza":(4,"Li roza"),"choca":(4,"Li choca"),"suelo":(4,"y los cuatro"),
 "domino":(4,"como fichas"),"hueco":(5,"Tú pasas"),"meta":(5,"y cruzas"),"brazos":(5,"con los brazos"),"oro2":(5,"¡Oro!"),"primer":(5,"El primer"),"hemis":(5,"y de todo"),
 "suerte":(6,"¿Suerte?"),"rendiste":(6,"Pero llegaste"),"pregunta":(6,"¿Tú lo"),"leo":(6,"Te leo"),"pillas":(6,"¿Lo pillas?"),"loop":(6,"A veces")}
make(ICON,KEEP,S,CUES,["elim","quince","suelo"],["oro2","entras"],cut=CUT)
