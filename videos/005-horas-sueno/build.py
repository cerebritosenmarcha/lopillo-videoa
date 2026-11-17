import sys; sys.path.insert(0, '../../engine'); from build_lib import make
R,Y,B,P,G,O,W,V='0xff2d46','0xffc21a','0x3fb8ff','0xff4fd8','0x7dff9a','0xff7a1a','0xfff3dd','0xb18cff'
SRC='Fuente: National Sleep Foundation, recomendaciones de duración del sueño (2015)'
ICON={"horas":("clock-outline","W"),"bebé":("baby-face-outline","G"),"adolescente":("cellphone","B"),"unidos":("map-marker","R"),"expertos":("account-group","B"),
 "edad":("calendar-account","W"),"nacido":("baby-face-outline","G"),"niño":("human-child","G"),"adultos":("account","B"),"sesenta":("human-cane","G"),"ocho":("bed","P"),
 "cinco":("coffee","R"),"seis":("coffee","R"),"orientativos":("scale-balance","B"),"comentarios":("comment-text-multiple","B"),"pillas":("lightbulb-on","G")}
KEEP={"unidos","seis","orientativos"}
HOOK="¿DORMIR<br><b>8 HORAS?</b>"
BED={"R":17,"h":9,"ly":2.8,"a0":1.05,"av":-.1}
S=[
 dict(seg=0,at="",type="bed",p={"col":P,"ry":0},hook=HOOK,cam=BED),
 dict(seg=0,at="Un bebé",type="icon",p={"icon":"baby-face-outline","col":Y,"s":6.5,"anim":"float","pop":True},big="CASI EL DOBLE",cam={"R":23}),
 dict(seg=0,at="Y un adolescente",type="people",p={"list":[{"col":B,"s":2.1,"pose":"phone","phone":True}]},big="MÁS QUE TÚ",cam={"R":14,"h":5,"ly":4}),
 dict(seg=1,at="La Fundación",type="flag",p={"us":True},big="EE. UU.",src=SRC,cam={"R":22,"h":10,"ly":10,"a0":-.35,"av":.1}),
 dict(seg=1,at="reunió a expertos",type="people",p={"list":[{"col":W,"x":-4.2},{"col":B,"x":-1.4,"pose":"wave"},{"col":W,"x":1.4},{"col":G,"x":4.2}]},big="EXPERTOS",src=SRC,cam={"R":16,"h":5,"ly":3}),
 dict(seg=1,at="y fijó",type="icon",p={"icon":"clipboard-list","col":B,"s":6,"anim":"wobble"},big="SEGÚN LA EDAD",src=SRC,cam={"R":23}),
 dict(seg=1,at="Agárrate",type="icon",p={"icon":"weather-night","col":V,"s":6.5,"anim":"float"},cam={"R":23}),
 dict(seg=2,at="Un recién",type="icon",p={"icon":"baby-face-outline","col":Y,"s":6.5,"anim":"wobble"},big="14–17 h<small>recién nacido</small>",src=SRC,cam={"R":23}),
 dict(seg=2,at="Un niño",type="icon",p={"icon":"human-child","col":G,"s":6.5,"anim":"wobble"},big="9–11 h<small>de 6 a 13 años</small>",src=SRC,cam={"R":23}),
 dict(seg=2,at="Un adolescente: de",type="people",p={"list":[{"col":B,"s":2.1,"pose":"phone","phone":True}]},big="8–10 h<small>de 14 a 17 años</small>",src=SRC,cam={"R":14,"h":5,"ly":4}),
 dict(seg=2,at="Sí: un recién",type="clock",p={"h":20,"m":0,"spin":4},big="+12 h<small>más de medio día</small>",src=SRC,cam={"R":22}),
 dict(seg=3,at="Y los adultos",type="people",p={"list":[{"col":P,"s":2.2,"x":-1.6,"pose":"idle"},{"col":B,"s":2.3,"x":1.6,"pose":"wave"}]},big="7–9 h<small>de 18 a 64 años</small>",src=SRC,cam={"R":15,"h":5,"ly":4}),
 dict(seg=3,at="A partir",type="icon",p={"icon":"human-cane","col":Y,"s":6.5,"anim":"wobble"},big="7–8 h<small>65 años o más</small>",src=SRC,cam={"R":23}),
 dict(seg=3,at="O sea, el famoso",type="bed",p={"col":B,"ry":0},big="8 h<small>justo en medio</small>",src=SRC,cam=BED),
 dict(seg=4,at="O sea, si eres",type="icon",p={"icon":"coffee","col":O,"s":6.5,"anim":"float"},big="5–6 h<small>por debajo de lo recomendado</small>",src=SRC,cam={"R":23}),
 dict(seg=4,at="Y ojo",type="icon",p={"icon":"scale-balance","col":B,"s":6,"anim":"wobble"},big="RANGOS<small>orientativos</small>",cam={"R":23}),
 dict(seg=4,at="¿Cuántas",type="icon",p={"icon":"bed","col":P,"s":6,"anim":"float"},big="¿Y TÚ?",cam={"R":23}),
 dict(seg=4,at="Te leo",type="comments",cam={"R":20,"h":8,"ly":8,"a0":0}),
 dict(seg=4,at="Un bebé duerme",type="bed",p={"col":P,"ry":0},hook=HOOK,cam=BED),
]
CUES={"bebe":(0,"Un bebé"),"nacido":(2,"Un recién"),"adultos":(3,"Y los adultos"),"ocho":(3,"O sea, el famoso"),"debajo":(4,"O sea, si eres")}
make(ICON,KEEP,S,CUES,["bebe","nacido","adultos","debajo"],["ocho"])
