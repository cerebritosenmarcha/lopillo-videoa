# 005 v2 — historia encadenada: tu vida en tu cama, con un reloj de 24 h que cambia contigo. Escena: story.html
import sys, os; sys.path.insert(0, '../../engine'); from build_lib import make
CUT = float(os.environ['CUT']) if os.environ.get('CUT') else None
ICON={"ocho":("numeric-8","W"),"horas":("clock","W"),"bebé":("baby-face","P"),"doble":("multiplication","Y"),"adolescente":("account","B"),"sueño":("sleep","B"),"vida":("timeline","W"),
 "naciste":("baby-face","P"),"catorce":("numeric","W"),"diecisiete":("numeric","W"),"día":("weather-sunny","Y"),"creces":("arrow-up","G"),"nueve":("numeric","W"),"once":("numeric","W"),
 "adolescencia":("account","B"),"diez":("numeric","W"),"adultos":("account","B"),"siete":("numeric","W"),"medio":("target","Y"),"sesenta":("numeric","W"),"expertos":("account-group","W"),
 "cinco":("numeric","R"),"seis":("numeric","R"),"debajo":("arrow-down","R"),"recomendado":("check","G"),"orientativos":("information","B"),"distinta":("account-multiple","P"),
 "comentarios":("comment","B"),"pillas":("lightbulb-on","Y"),"motivos":("heart","P")}
KEEP=set()
S=[dict(seg=0,at="",type="intro"),dict(seg=0,at="Mira cómo",type="rewind"),dict(seg=1,at="Cuando naciste",type="baby"),dict(seg=1,at="Creces",type="kid"),
   dict(seg=2,at="Llega la",type="teen"),dict(seg=2,at="Y de los dieciocho",type="adult"),dict(seg=3,at="A partir",type="elder"),dict(seg=3,at="Lo dice",type="panel"),
   dict(seg=4,at="O sea",type="you"),dict(seg=4,at="Ojo",type="people"),dict(seg=4,at="¿Cuántas",type="ask"),dict(seg=4,at="¿Lo pillas?",type="end"),dict(seg=4,at="Un bebé duerme",type="loop")]
CUES={"bebe":(0,"Un bebé"),"adol":(0,"y un adolescente"),"mira":(0,"Mira cómo"),"naciste":(1,"Cuando naciste"),"medio":(1,"más de medio"),"creces":(1,"Creces"),"seis13":(1,"entre los seis"),
 "llega":(2,"Llega la"),"mas":(2,"Sí, más"),"adultos":(2,"Y de los dieciocho"),"famoso":(2,"El famoso"),"elder":(3,"A partir"),"dice":(3,"Lo dice"),"panel":(3,"después de reunir"),
 "osea":(4,"O sea"),"cinco":(4,"duermes cinco"),"acost":(4,"aunque te"),"ojo":(4,"Ojo"),"cada":(4,"y cada persona"),"cuantas":(4,"¿Cuántas"),"leo":(4,"Te leo"),
 "pillas":(4,"¿Lo pillas?"),"final":(4,"Un bebé duerme")}
make(ICON,KEEP,S,CUES,["bebe","medio","mas","cinco"],["famoso"],cut=CUT)
