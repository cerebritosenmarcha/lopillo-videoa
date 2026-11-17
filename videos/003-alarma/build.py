import sys; sys.path.insert(0, '../../engine'); from build_lib import make
R,Y,B,P,G,O,W='0xff2d46','0xffc21a','0x3fb8ff','0xff4fd8','0x7dff9a','0xff7a1a','0xfff3dd'
SRC='Fuente: estudio del equipo de Jan Born sobre la ACTH al despertar (citado por NPR)'
ICON={"alarma":("alarm","R"),"cuerpo":("human","B"),"laboratorio":("flask","B"),"alemania":("map-marker","R"),"voluntarios":("account-group","B"),
 "sangre":("water","R"),"siete":("clock-outline","W"),"seis":("alarm","R"),"hormona":("molecule","G"),"acth":("molecule","G"),"cortisol":("lightning-bolt","G"),
 "estrés":("alert","R"),"energía":("battery-charging","G"),"sorpresa":("emoticon-confused","G"),"cerebro":("brain","P"),"circadiano":("clock-outline","W"),
 "luz":("white-balance-sunny","G"),"horario":("calendar-today","W"),"motor":("engine","R"),"móvil":("cellphone","B"),"hormonas":("molecule","G"),
 "comentarios":("comment-text-multiple","B"),"pillas":("lightbulb-on","G")}
KEEP={"alemania","sangre","estrés","sorpresa","luz"}
S=[
 dict(seg=0,at="",type="bed",p={"col":P,"ry":0,"extra":[{"icon":"alarm","col":R,"s":1.9,"pos":[4.2,8.5,-2],"anim":"shake","d":.2}]},hook="¿ANTES DE<br><b>LA ALARMA?</b>",cam={"R":17,"h":9,"ly":2.8,"a0":1.05,"av":-.1}),
 dict(seg=0,at="No es casualidad",type="brain",p={"col":P}),
 dict(seg=0,at="Y lo han medido",type="icon",p={"icon":"flask","col":B,"s":6,"anim":"spin"},big="LABORATORIO"),
 dict(seg=1,at="En Alemania",type="flag",p={"colors":["#000000","#dd0000","#ffcc00"]},big="ALEMANIA",src=SRC,cam={"R":22,"h":10,"ly":10,"a0":.35,"av":-.1}),
 dict(seg=1,at="el equipo",type="people",p={"list":[{"col":W,"x":-3,"pose":"idle"},{"col":B,"x":0,"pose":"wave"},{"col":W,"x":3,"pose":"idle"}]},big="JAN BORN<small>y su equipo</small>",src=SRC,cam={"R":15,"h":5,"ly":3}),
 dict(seg=1,at="metió a quince",type="crowd",p={"n":15,"w":5,"sp":1.6},big="15<small>voluntarios</small>",src=SRC,cam={"R":15,"h":8,"ly":1}),
 dict(seg=1,at="en un laboratorio",type="bed",p={"col":B,"ry":0,"extra":[{"icon":"flask","col":B,"s":2.4,"pos":[-4,8,1],"anim":"spin"}]},src=SRC,cam={"R":17,"h":9,"ly":2.8,"a0":1.05,"av":-.1}),
 dict(seg=1,at="y les sacó",type="icon",p={"icon":"needle","col":W,"s":6,"anim":"wobble","extra":[{"icon":"water","col":R,"s":2.4,"pos":[3.5,4,1],"anim":"float","d":.3}]},src=SRC),
 dict(seg=1,at="Todos solían",type="clock",p={"h":7,"m":0},big="7:00",src=SRC),
 dict(seg=1,at="A unos",type="clock",p={"h":6,"m":0,"ring":True},big="A LAS 6",src=SRC),
 dict(seg=2,at="Antes de las seis",type="clock",p={"h":5,"m":15,"spin":.25},big="¡ANTES!<small>de las 6</small>",src=SRC),
 dict(seg=2,at="una hormona",type="icon",p={"icon":"molecule","col":G,"s":6.5,"anim":"spin","pop":True},big="ACTH",src=SRC),
 dict(seg=2,at="que pone en marcha",type="icon",p={"icon":"lightning-bolt","col":Y,"s":6.5,"anim":"pulse"},big="CORTISOL",src=SRC),
 dict(seg=2,at="Es la misma",type="icon",p={"icon":"battery-charging","col":G,"s":6.5,"anim":"pulse"},big="ENERGÍA",src=SRC),
 dict(seg=2,at="A los que despertaron",type="icon",p={"icon":"emoticon-confused","col":Y,"s":6.5,"anim":"shake"},big="POR SORPRESA:<small>nada</small>",src=SRC),
 dict(seg=3,at="O sea, tu cerebro",type="brain",p={"col":P,"glow":True}),
 dict(seg=3,at="el reloj circadiano",type="clock",p={"h":6,"m":0,"spin":3},big="RELOJ<small>circadiano</small>"),
 dict(seg=3,at="que se ajusta",type="icon",p={"icon":"white-balance-sunny","col":Y,"s":6.5,"anim":"spin"},big="LUZ + RUTINA"),
 dict(seg=3,at="Si te levantas",type="calendar",p={"txt":"7:00","sub":"CADA DÍA","col":"#3fb8ff"},big="MISMA HORA"),
 dict(seg=3,at="empieza a encender",type="icon",p={"icon":"engine","col":O,"s":6,"anim":"shake"}),
 dict(seg=3,at="y a veces",type="phone",p={"extra":[{"icon":"alarm","col":R,"s":2.4,"pos":[3.8,9,1.5],"anim":"shake","d":.2}]},cam={"R":14,"h":6.5,"ly":6}),
 dict(seg=4,at="Eso sí",type="icon",p={"icon":"test-tube","col":B,"s":6,"anim":"wobble"},big="MIDIÓ HORMONAS<small>no despertares exactos</small>",src=SRC),
 dict(seg=4,at="Y si cambias",type="icon",p={"icon":"calendar-alert","col":R,"s":6,"anim":"shake"},big="HORARIO CAMBIANTE"),
 dict(seg=4,at="¿A ti te pasa?",type="people",p={"list":[{"col":B,"s":2.2,"pose":"idle"}],"extra":[{"icon":"help-circle","col":Y,"s":2.4,"pos":[2.8,8.2,0],"anim":"spin"}]},big="¿Y A TI?",cam={"R":14,"h":5,"ly":4}),
 dict(seg=4,at="Te leo",type="comments",cam={"R":20,"h":8,"ly":8,"a0":0}),
 dict(seg=4,at="Tu cuerpo ya sabe",type="bed",p={"col":P,"ry":0,"extra":[{"icon":"alarm","col":R,"s":1.9,"pos":[4.2,8.5,-2],"anim":"shake"}]},hook="¿ANTES DE<br><b>LA ALARMA?</b>",cam={"R":17,"h":9,"ly":2.8,"a0":1.05,"av":-.1}),
]
CUES={"medido":(0,"Y lo han medido"),"quince":(1,"metió a quince"),"seis":(1,"A unos"),"acth":(2,"una hormona"),"cortisol":(2,"que pone en marcha"),"sorpresa":(2,"A los que despertaron"),"reloj":(3,"el reloj circadiano")}
make(ICON,KEEP,S,CUES,["medido","quince","seis","acth","sorpresa"],["cortisol"])
