# 013 — historia encadenada épica: tú eres Romain Grosjean (Baréin 2020); el choque, el fuego y el halo que odiabas. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={k:("star","W") for k in ["noventa","fuego","veintisiete","vida","final","odiabas","baréin","grosjean","semáforo","vuelta","aceleras","toque","guardarraíl","frenar","impacto","siete","dos","metal","protege",
 "bum","gasolina","fuego","atrapado","visor","derrite","cinco","diez","quince","médico","extintor","empujas","trepas","andando","manos","halo","titanio","feo","mejor","comentarios"]}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Quédate",type="rewind"),dict(seg=1,at="Baréin",type="grid"),dict(seg=1,at="Se apaga",type="start"),dict(seg=2,at="Un toque",type="touch"),
   dict(seg=3,at="Impacto",type="impact"),dict(seg=3,at="Tu cabeza",type="halo0"),dict(seg=4,at="¡bum!",type="fire"),dict(seg=5,at="Estás atrapado",type="trapped"),dict(seg=6,at="Llega el coche",type="medic"),
   dict(seg=6,at="Empujas",type="climb"),dict(seg=7,at="¡Y sales",type="out"),dict(seg=8,at="¿Qué te salvó?",type="halo"),dict(seg=9,at="Después",type="best"),dict(seg=10,at="¿Tú confiarías",type="ask"),
   dict(seg=10,at="¿Lo pillas?",type="end"),dict(seg=10,at="A veces",type="loop")]
CUES={"fuego0":(0,"Fuego"),"y27":(0,"Y veintisiete"),"como":(0,"Quédate"),"bahrein":(1,"Baréin"),"eres":(1,"Eres Romain"),"luces":(1,"Se apaga"),"vuelta":(1,"Primera vuelta"),"aceleras":(1,"Aceleras"),
 "toque":(2,"Un toque"),"disparado":(2,"Tu coche sale"),"frenar":(2,"Sin frenar"),"impacto":(3,"Impacto"),"g67":(3,"sesenta y siete"),"parte":(3,"El coche se parte"),"cabeza":(3,"Tu cabeza"),"protege":(3,"pero algo"),
 "entonces":(4,"Y entonces"),"bum":(4,"¡bum!"),"gasolina":(4,"La gasolina"),"bola":(4,"Una bola"),"atrapado":(5,"Estás atrapado"),"visor":(5,"El visor"),"c5":(5,"Cinco segundos"),"c10":(5,"Diez."),"c15":(5,"Quince."),
 "medico":(6,"Llega el coche"),"extintor":(6,"Un comisario"),"empujas":(6,"Empujas"),"trepas":(6,"y trepas"),"sales":(7,"¡Y sales"),"s27":(7,"Veintisiete segundos"),"manos":(7,"Solo con"),
 "salvo":(8,"¿Qué te salvó?"),"halo":(8,"El halo"),"arco":(8,"un arco"),"mismo":(8,"Tú mismo"),"feo":(8,"feo"),"despues":(9,"Después dijiste"),"mejor":(9,"lo mejor"),
 "pregunta":(10,"¿Tú confiarías"),"leo":(10,"Te leo"),"pillas":(10,"¿Lo pillas?"),"loop":(10,"A veces")}
make(ICON,KEEP,S,CUES,["toque","impacto","bum","sales"],["halo","mejor"],cut=CUT,
 epic={"climax":["impacto","halo"],"heart":[["atrapado","sales"]],"roar":["sales","mejor"],"hit":["impacto","bum"]})
