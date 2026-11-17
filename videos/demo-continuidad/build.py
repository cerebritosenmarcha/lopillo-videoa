# Demo de continuidad (primeros 21,6 s del vídeo 003) — ver plan.md
import sys; sys.path.insert(0, '../../engine'); from build_lib import make
R,Y,B,P,G,O,W='0xff2d46','0xffc21a','0x3fb8ff','0xff4fd8','0x7dff9a','0xff7a1a','0xfff3dd'
SRC='Fuente: estudio del equipo de Jan Born sobre la ACTH al despertar (citado por NPR)'
ICON={"alarma":("alarm","R"),"cuerpo":("human","B"),"laboratorio":("flask","B"),"alemania":("map-marker","R"),"voluntarios":("account-group","B"),
 "sangre":("water","R"),"siete":("clock-outline","W"),"seis":("alarm","R"),"hormona":("molecule","G"),"acth":("molecule","G")}
KEEP={"sangre"}
S=[
 dict(seg=0,at="",type="bed",p={"col":P,"ry":0,"extra":[{"icon":"alarm","col":R,"s":1.9,"pos":[4.2,8.5,-2],"anim":"shake","d":.2}]},hook="¿ANTES DE<br><b>LA ALARMA?</b>",cam={"R":18,"h":9,"ly":2.8,"a0":.7,"av":-.08}),
 dict(seg=0,at="No es casualidad",tr="morph",type="brain",p={"col":P},cam={"R":19,"h":8,"ly":6.5,"a0":.45,"av":-.1}),
 dict(seg=0,at="Y lo han medido",tr="travel",type="icon",p={"icon":"flask","col":B,"s":6,"anim":"spin"},big="LABORATORIO",cam={"R":21,"h":7,"ly":6,"a0":.15,"av":-.08}),
 dict(seg=1,at="En Alemania",tr="follow",fcol=B,fpos=[0,7,0],type="flag",p={"colors":["#000000","#dd0000","#ffcc00"]},big="ALEMANIA",src=SRC,cam={"R":23,"h":10,"ly":10,"a0":.2,"av":-.08}),
 dict(seg=1,at="el equipo",tr="travel",d=11,type="people",p={"list":[{"col":W,"x":-3,"pose":"idle"},{"col":B,"x":0,"pose":"wave"},{"col":W,"x":3,"pose":"idle"}]},big="JAN BORN<small>y su equipo</small>",src=SRC,cam={"R":17,"h":5,"ly":3,"a0":.1,"av":-.06}),
 dict(seg=1,at="metió a quince",tr="depth",d=24,type="crowd",p={"n":15,"w":5,"sp":1.6},big="15<small>voluntarios</small>",src=SRC,cam={"R":16,"h":8,"ly":1,"a0":.05,"av":-.06}),
 dict(seg=1,at="en un laboratorio",tr="travel",d=15,type="bed",p={"col":B,"ry":0,"extra":[{"icon":"flask","col":B,"s":2.4,"pos":[-4,8,1],"anim":"spin"}]},src=SRC,cam={"R":18,"h":9,"ly":2.8,"a0":.5,"av":-.08}),
 dict(seg=1,at="y les sacó",tr="travel",d=10,type="icon",p={"icon":"needle","col":W,"s":5,"anim":"wobble","extra":[{"icon":"water","col":R,"s":2.4,"pos":[3.5,4,1],"anim":"float","d":.3}]},src=SRC,cam={"R":19,"h":7,"ly":5,"a0":.25,"av":-.08}),
 dict(seg=1,at="Todos solían",tr="morph",type="clock",p={"h":7,"m":0},big="7:00",src=SRC,cam={"R":20,"h":7,"ly":6,"a0":.15,"av":-.05}),
 dict(seg=1,at="A unos",tr="stay",type="clock",p={"from":7,"h":6,"m":0,"ring":True},big="A LAS 6",src=SRC),
 dict(seg=2,at="Antes de las seis",tr="stay",type="clock",p={"from":6,"h":5,"m":15,"spin":.25},big="¡ANTES!<small>de las 6</small>",src=SRC),
 dict(seg=2,at="una hormona",tr="follow",fcol=G,fpos=[0,6,1],type="icon",p={"icon":"molecule","col":G,"s":6.5,"anim":"spin","pop":True},big="ACTH",src=SRC,cam={"R":21,"h":7,"ly":6.5,"a0":.1,"av":-.08}),
]
CUES={"medido":(0,"Y lo han medido"),"quince":(1,"metió a quince"),"seis":(1,"A unos"),"acth":(2,"una hormona")}
make(ICON,KEEP,S,CUES,["medido","quince","seis","acth"],["acth"],cut=21.58)
