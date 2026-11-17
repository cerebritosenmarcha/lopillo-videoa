import sys; sys.path.insert(0, '../../engine'); from build_lib import make
R,Y,B,P,G,O,W,V='0xff2d46','0xffc21a','0x3fb8ff','0xff4fd8','0x7dff9a','0xff7a1a','0xfff3dd','0xb18cff'
SRC='Fuente: estudios de déjà vu provocado en laboratorio (Live Science; Frontiers in Psychology, 2013)'
ICON={"vivido":("replay","P"),"futuro":("crystal-ball","P"),"cerebro":("brain","P"),"error":("alert","R"),"francés":("map-marker","B"),"familiar":("map-marker-question","P"),
 "segundos":("timer-outline","W"),"investigadores":("account-group","B"),"palabras":("text-box-multiple","W"),"memoria":("brain","P"),"escáner":("radar","B"),
 "frontal":("brain","P"),"errores":("shield-search","G"),"señal":("alert-decagram","R"),"revisa":("magnify","B"),"epilepsia":("flash","G"),"edad":("account-multiple","B"),
 "comentarios":("comment-text-multiple","B"),"pillas":("lightbulb-on","G"),"calidad":("check-decagram","G")}
KEEP={"error","francés","señal","edad"}
HOOK="ESTO YA<br><b>LO HE VIVIDO</b>"
S=[
 dict(seg=0,at="",type="people",p={"list":[{"col":B,"s":2.3,"pose":"idle"}],"extra":[{"icon":"replay","col":P,"s":2.6,"pos":[3,8.5,0],"anim":"spin"}]},hook=HOOK,cam={"R":14,"h":5,"ly":4,"a0":-.4,"av":.3}),
 dict(seg=0,at="no es ver",type="icon",p={"icon":"crystal-ball","col":V,"s":6,"anim":"float"},big="NO ES EL FUTURO",cam={"R":23}),
 dict(seg=0,at="Es tu cerebro",type="brain",p={"col":P,"extra":[{"icon":"alert","col":R,"s":2.2,"pos":[4,11,1],"anim":"pulse","d":.4}]},cam={"R":24}),
 dict(seg=1,at="Se llama",type="flag",p={"colors":["#0055a4","#ffffff","#ef4135"],"vertical":True},big="DÉJÀ VU",cam={"R":22,"h":10,"ly":10,"a0":.35,"av":-.1}),
 dict(seg=1,at="que en francés",type="icon",p={"icon":"eye","col":B,"s":6.5,"anim":"wobble"},big="«YA VISTO»",cam={"R":23}),
 dict(seg=1,at="Aparece cuando",type="icon",p={"icon":"map-marker-question","col":P,"s":6,"anim":"float"},big="FAMILIAR...",cam={"R":23}),
 dict(seg=1,at="pero sabes",type="icon",p={"icon":"numeric-1-circle","col":Y,"s":6,"anim":"spin"},big="...Y ES LA 1.ª VEZ",cam={"R":23}),
 dict(seg=1,at="Dura apenas",type="icon",p={"icon":"timer-outline","col":W,"s":6,"anim":"spin"},big="SEGUNDOS",cam={"R":23}),
 dict(seg=2,at="Un equipo",type="people",p={"list":[{"col":W,"x":-3,"pose":"idle"},{"col":B,"x":0,"pose":"wave"},{"col":W,"x":3,"pose":"idle"}]},big="EN EL LABORATORIO",src=SRC,cam={"R":15,"h":5,"ly":3}),
 dict(seg=2,at="con listas",type="icon",p={"icon":"text-box-multiple","col":W,"s":6,"anim":"wobble"},big="LISTAS DE PALABRAS",src=SRC,cam={"R":23}),
 dict(seg=2,at="y miró",type="mri",p={"in":True},big="ESCÁNER",src=SRC,cam={"R":22,"h":8,"ly":5,"a0":.7,"av":-.15}),
 dict(seg=2,at="Y la zona",type="icon",p={"icon":"archive-lock","col":V,"s":6,"anim":"wobble"},big="NO: MEMORIA",src=SRC,cam={"R":23}),
 dict(seg=2,at="era la parte",type="brain",p={"col":P,"glow":True,"glowPos":[-2.4,8,2.6],"glowCol":"0x7dff9a"},big="ZONA FRONTAL",src=SRC,cam={"R":24}),
 dict(seg=3,at="O sea, el",type="icon",p={"icon":"shield-search","col":G,"s":6.5,"anim":"wobble","pop":True},big="DETECTOR<small>de errores</small>",cam={"R":23}),
 dict(seg=3,at="tu cerebro nota",type="icon",p={"icon":"alert-decagram","col":R,"s":6,"anim":"shake"},big="«ESTO ME SUENA»",cam={"R":23}),
 dict(seg=3,at="y la revisa",type="icon",p={"icon":"magnify","col":B,"s":6,"anim":"float"},big="REVISIÓN",cam={"R":23}),
 dict(seg=3,at="También se estudia",type="icon",p={"icon":"flash","col":Y,"s":6.5,"anim":"pulse"},big="EPILEPSIA<small>del lóbulo temporal</small>",src=SRC,cam={"R":23}),
 dict(seg=3,at="Y tranquilo",type="icon",p={"icon":"check-decagram","col":G,"s":6.5,"anim":"spin","pop":True},big="NO ES MALA MEMORIA",src=SRC,cam={"R":23}),
 dict(seg=4,at="Y un dato",type="people",p={"list":[{"col":Y,"s":2.1,"x":-2.2,"pose":"cheer"},{"col":V,"s":1.9,"x":2.4,"pose":"tired"}]},big="CON LA EDAD,<small>menos déjà vus</small>",src=SRC,cam={"R":15,"h":5,"ly":3.5}),
 dict(seg=4,at="¿Cuándo tuviste",type="icon",p={"icon":"calendar-question","col":B,"s":6,"anim":"wobble"},big="¿Y TU ÚLTIMO?",cam={"R":23}),
 dict(seg=4,at="Te leo",type="comments",cam={"R":20,"h":8,"ly":8,"a0":0}),
 dict(seg=4,at="La próxima vez",type="people",p={"list":[{"col":B,"s":2.3,"pose":"idle"}],"extra":[{"icon":"replay","col":P,"s":2.6,"pos":[3,8.5,0],"anim":"spin"}]},hook=HOOK,cam={"R":14,"h":5,"ly":4,"a0":-.4,"av":.3}),
]
CUES={"futuro":(0,"no es ver"),"error":(0,"Es tu cerebro"),"frontal":(2,"era la parte"),"detector":(3,"O sea, el"),"edad":(4,"con la edad")}
make(ICON,KEEP,S,CUES,["futuro","error","frontal","edad"],["detector"])
