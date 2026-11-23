// ================= HISTORIA 016: tú eres Thomas Hicks (maratón de San Luis, 1904) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const FIN=-80;
function roadTex(){return canvasTex(256,1024,(x,w,h)=>{x.fillStyle='#a8875a';x.fillRect(0,0,w,h);for(let i=0;i<2500;i++){x.fillStyle=['#9a7a4e','#b8966a','#8f7048'][i%3];x.fillRect(Math.random()*w,Math.random()*h,3,3);}
 x.strokeStyle='rgba(90,70,40,.5)';x.lineWidth=6;for(const u of [.35,.65]){x.beginPath();x.moveTo(w*u,0);x.lineTo(w*u,h);x.stroke();}});}
function makeCar(){const G=new THREE.Group(); const body=M(0x2a2f3a,{roughness:.5,metalness:.4}), brass=M(0xd9a441,{metalness:.8,roughness:.3});
 const b=new THREE.Mesh(new RoundedBoxGeometry(2.6,1.0,4.6,2,.2),body); b.position.y=1.5; G.add(b);
 const hood=new THREE.Mesh(new RoundedBoxGeometry(2.0,.9,1.4,2,.2),M(0x8a1f1f,{roughness:.4})); hood.position.set(0,1.7,-2.6); G.add(hood);
 const rad=new THREE.Mesh(new THREE.BoxGeometry(1.8,1.0,.15),brass); rad.position.set(0,1.75,-3.35); G.add(rad);
 for(const z of [-.3,1.4]){const seat=new THREE.Mesh(new RoundedBoxGeometry(2.4,1.1,.4,2,.1),M(0x5a3a22)); seat.position.set(0,2.4,z+.5); G.add(seat);}
 const wm=M(0x1a1c22), sm=M(0xd9cdb4); for(const sx of [-1.45,1.45]) for(const z of [-2.2,1.6]){const w=new THREE.Group(); const tyre=new THREE.Mesh(new THREE.TorusGeometry(.95,.12,8,24),wm); w.add(tyre);
  for(let k=0;k<6;k++){const sp=new THREE.Mesh(new THREE.BoxGeometry(.06,1.8,.06),sm); sp.rotation.z=k*Math.PI/6; w.add(sp);} w.rotation.y=Math.PI/2; w.position.set(sx,1,z); G.add(w); (G.userData.wheels=G.userData.wheels||[]).push(w);}
 const steer=new THREE.Mesh(new THREE.TorusGeometry(.35,.05,6,16),brass); steer.position.set(.5,2.6,-1.1); steer.rotation.x=-.9; G.add(steer); return G;}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0; floor.visible=false;
 const grass=new THREE.Mesh(new THREE.PlaneGeometry(220,260),M(0x5d6b2e,{roughness:.95})); grass.rotation.x=-Math.PI/2; grass.position.set(0,0,-40); W0.add(grass);
 const rt=roadTex(); rt.wrapT=THREE.RepeatWrapping; rt.repeat.set(1,6); const road=new THREE.Mesh(new THREE.PlaneGeometry(9,160),new THREE.MeshStandardMaterial({map:rt,roughness:1})); road.rotation.x=-Math.PI/2; road.position.set(0,.02,-20); W0.add(road);
 // árboles y vallas de madera
 for(let i=0;i<22;i++){const z=50-i*7, s=i%2?1:-1, x=s*(9+((i*37)%7)); const tr=new THREE.Mesh(new THREE.CylinderGeometry(.35,.45,3,8),M(0x5a3a22)); tr.position.set(x,1.5,z); W0.add(tr);
  const cr=new THREE.Mesh(new THREE.IcosahedronGeometry(2.4,1),M(0x3e6b2e,{roughness:.9})); cr.position.set(x,4.4,z); W0.add(cr);}
 for(let z=40;z>FIN+12;z-=4) for(const s of [-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.2,1.1,.2),M(0x7a5a3a)); p.position.set(s*5.5,.55,z); W0.add(p); const r=new THREE.Mesh(new THREE.BoxGeometry(.1,.12,4),M(0x8a6a48)); r.position.set(s*5.5,.9,z-2); W0.add(r);}
 // estadio y meta
 const stM=M(0x6a5a48,{roughness:.9}); const pos=[]; const cs=[0xd9d2c4,0x2a2f3a,0xffffff,0x8a6a48,0x3a3f4a,0xd92a2a,0x2a62d8];
 for(const s of [-1,1]) for(let r=0;r<6;r++){const x=s*(10+r*2.6); const st=new THREE.Mesh(new THREE.BoxGeometry(2.6,1.4+r*1.4,40),stM); st.position.set(x,.7+r*.7,FIN-8); W0.add(st); for(let k=0;k<18;k++) pos.push([x,1.9+r*1.4,FIN-26+k*2.1]);}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.7,1.2,.7),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const dm=new THREE.Object3D(), cc=new THREE.Color();
 pos.forEach((p,k)=>{dm.position.set(p[0],p[1],p[2]); dm.updateMatrix(); im.setMatrixAt(k,dm.matrix); im.setColorAt(k,cc.setHex(cs[k%7]));}); W0.add(im); ST.crowd=im; ST.cpos=pos;
 for(const s of [-1,1]){const tw=new THREE.Mesh(new THREE.BoxGeometry(1.4,9,1.4),M(0xe8e0cc)); tw.position.set(s*6,4.5,FIN+12); W0.add(tw);}
 const ban=new THREE.Mesh(new THREE.PlaneGeometry(12,2.2),new THREE.MeshBasicMaterial({map:canvasTex(1024,190,(x,w,h)=>{x.fillStyle='#f2ead6';x.fillRect(0,0,w,h);x.fillStyle='#8a1f1f';x.font='900 120px Nunito, sans-serif';x.textAlign='center';x.fillText('ST. LOUIS 1904',w/2,140);})}));
 ban.position.set(0,8,FIN+12); W0.add(ban);
 const fl=new THREE.Mesh(new THREE.BoxGeometry(9,.04,.4),new THREE.MeshBasicMaterial({color:0xffffff})); fl.position.set(0,.06,FIN); W0.add(fl);
 // personajes
 const mk=(col,sc=1.6)=>{const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,sc); J.add(h); W0.add(J); return {J,h};};
 ST.you=mk(0xff9a4a); ST.head=ST.you.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 const bib=new THREE.Mesh(new THREE.PlaneGeometry(.5,.4),new THREE.MeshBasicMaterial({map:canvasTex(128,100,(x,w,h)=>{x.fillStyle='#fff';x.fillRect(0,0,w,h);x.fillStyle='#111';x.font='900 70px Nunito';x.textAlign='center';x.fillText('20',w/2,76);})})); bib.position.set(0,1.6,.36); ST.you.h.add(bib);
 ST.car=makeCar(); W0.add(ST.car); ST.drv=mk(0x8a8f9c,1.3); ST.lorz=mk(0xf2f2f2,1.3); ST.helper=mk(0x2a62d8,1.5);
 ST.bottle=new THREE.Group(); const bt=new THREE.Mesh(new THREE.CylinderGeometry(.18,.22,.6,12),new THREE.MeshStandardMaterial({color:0x3a6a3a,transparent:true,opacity:.85})); ST.bottle.add(bt); W0.add(ST.bottle);
 ST.skull=await icon3D('skull-crossbones',0xf2f2f2,1.1,{depth:3}); W0.add(ST.skull); ST.medal=await icon3D('medal',0xffc21a,1.3,{depth:3}); W0.add(ST.medal);
 ST.x=await icon3D('close-circle',0xff2d46,1.3,{depth:3}); W0.add(ST.x); ST.carI=await icon3D('car-side',0xffd23f,1.2,{depth:3}); W0.add(ST.carI);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.4,{depth:2}); b.userData={x:(rnd()-.5)*10,y:3+rnd()*6,z:(rnd()-.5)*6,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; window.popsReady=true;};
let K=null;
function setupK(c){const end=TL.end;
 K={Y:[[0,-14],[c.como,-17],[c.sanluis,0],[c.mitad,-24],[c.nopuedes,-32],[c.llegas,-50],[c.pero,-58],[c.descal,-70],[c.oro,FIN-3],[1e9,FIN-3]],
  C:[[0,-2],[c.como,-40],[c.sanluis,60],[c.mitad,4],[c.sentado,-26],[c.nopuedes+.6,-40],[c.llegas,-66],[c.pero,FIN+14],[1e9,FIN+14]],
  L:[[0,FIN+14],[c.llegas,FIN+14],[c.pero,FIN-5],[1e9,FIN-5]]};
 const W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 for(let tt=0;tt<c.loop+3;tt+=.35){const inHook=tt<c.como, inCar=tt>c.mitad&&tt<c.pero; if(!(inHook||inCar||tt>=c.loop)) continue; const z=kfl(K.C,tt>=c.loop?tt-c.loop:tt)[0]; FX.burst('dust',W([.6,.4,z+2.4]),tt,14,undefined,.8);}
 for(let tt=c.sanluis;tt<c.oro;tt+=.6){const z=kfl(K.Y,tt)[0]; FX.burst('dust',W([0,.2,z+.6]),tt,5,undefined,.4);}
 FX.ring(W([0,4,FIN-5]),c.descal,0xff2d46,5,.7,new THREE.Vector3(0,0,1));
 FX.burst('confetti',W([0,14,FIN-6]),c.oro+.1,220,[0xffd23f,0xd92a2a,0xffffff,0x2a62d8],1.5); FX.ring(W([0,.3,FIN-3]),c.oro,0xffd23f,6,.9); FX.burst('sparks',W([0,4,FIN-3]),c.oro,90,[0xffd23f,0xffffff],1.2);
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
const S120=s=>'<span style="font-size:120px">'+s+'</span>', S100=s=>'<span style="font-size:100px">'+s+'</span>';
const BIG=[["","como",S100("EL 1.º LLEGÓ EN COCHE")],["como","sanluis",S100("Y EL 2.º, ENVENENADO")],["sanluis","eres",S120("SAN LUIS 1904")+"<small>maratón olímpico</small>"],["eres","calor",S100("THOMAS HICKS")],["calor","mitad",S120("CALOR Y POLVO")],
 ["sentado","nopuedes",S120("¡EN COCHE!")],["estric","llegas",S120("ESTRICNINA")+"<small>un veneno</small>"],["casi","pillan",S100("¡CASI LE DAN EL ORO!")],["pillan","oro",S100("¡DESCALIFICADO!")],["oro","pregunta","ORO<small>3 h 28 min 53 s</small>"],["pregunta","leo",S100("¿TRAMPA O LOCURA?")]];
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 const loopT=t>=c.loop; const tc=loopT?t-c.loop:t;
 // ---- tú
 const U2=ST.you.h.userData, h=ST.you.h; h.position.set(0,0,0); h.rotation.set(0,0,0); [U2.aL,U2.aR,U2.lL,U2.lR].forEach(l=>l.rotation.set(0,0,0));
 let yz=loopT?lerp(FIN-3,-14,eio(seg(t,c.loop,c.loop+.8))):kf(K.Y,t)[0]; if(t>=c.mitad&&t<c.oro) yz=kfl(K.Y,t)[0];
 const tired=seg(t,c.nopuedes,c.estric)*(1-seg(t,c.oro,c.oro+.5)); const won=t>=c.oro&&t<c.loop;
 if(!won){walk(h,t,lerp(12,7,tired),0,lerp(.9,.5,tired)); h.rotation.x=.12+tired*.1; h.rotation.z=Math.sin(t*3.3)*.18*tired;}
 else {const up=seg(t,c.oro,c.oro+.4); U2.aL.rotation.x=U2.aR.rotation.x=-2.8*up;}
 ST.you.J.position.set(Math.sin(t*1.7)*.4*tired,0,yz); ST.you.J.rotation.set(0,Math.PI,0);
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)?.15:lerp(1,.45,tired),1));
 // ---- coche con el rival dentro
 const cz=loopT?kfl(K.C,tc)[0]:kfl(K.C,t)[0]; const carOn=t<c.como||(t>=c.mitad&&t<c.pregunta)||loopT; ST.car.visible=ST.drv.J.visible=carOn; ST.car.position.set(1.2,0,cz); ST.car.rotation.y=0;
 (ST.car.userData.wheels||[]).forEach(w=>w.rotation.x=-t*6*(carOn&&cz>FIN+15?1:0));
 ST.drv.J.position.set(1.7,1.5,cz-.6); ST.drv.J.rotation.set(0,Math.PI,0); const du=ST.drv.h.userData; du.lL.rotation.x=du.lR.rotation.x=1.4; du.aR.rotation.x=du.aL.rotation.x=1.2;
 const lu=ST.lorz.h.userData; [lu.aL,lu.aR,lu.lL,lu.lR].forEach(l=>l.rotation.set(0,0,0)); let lp, inCarL=t<c.pero-1.2||loopT;
 if(inCarL){lp=new THREE.Vector3(.7,1.5,cz+1.1); lu.lL.rotation.x=lu.lR.rotation.x=1.4; lu.aR.rotation.x=(t>c.sentado&&t<c.nopuedes)||t<c.como?-2.6+Math.sin(t*8)*.4:0;}
 else {const lz=kf(K.L,t)[0]; lp=new THREE.Vector3(lerp(.8,4.6,eio(seg(t,c.descal,c.oro))),0,lz); if(t<c.pero) walk(ST.lorz.h,t,10,0,.7); else if(t<c.pillan){lu.aL.rotation.x=lu.aR.rotation.x=-2.7;}}
 ST.lorz.J.visible=carOn||(!inCarL&&t<c.pregunta); ST.lorz.J.position.copy(lp); ST.lorz.J.rotation.set(0,Math.PI+(t>=c.pero&&!loopT?Math.PI:0),0);
 // ---- ayudante con la botella
 const hp=seg(t,c.equipo-.8,c.equipo)*(1-seg(t,c.llegas,c.llegas+.6)); ST.helper.J.visible=hp>0; ST.helper.J.position.set(-2.2,0,yz+1.2-(1-hp)*6); ST.helper.J.rotation.set(0,Math.PI+.4,0); walk(ST.helper.h,t,10,0,.7); ST.helper.h.userData.aR.rotation.x=-1.4;
 const bo=seg(t,c.estric-.2,c.estric+.3)*(1-seg(t,c.llegas-.3,c.llegas)); ST.bottle.visible=bo>0; ST.bottle.position.set(lerp(-1.6,-.6,bo),2.8,yz+.4); ST.bottle.rotation.z=bo*.8;
 // ---- CÁMARA
 const youW=new THREE.Vector3(0,0,yz), carW=new THREE.Vector3(1.2,0,cz), finW=new THREE.Vector3(0,0,FIN-4);
 let L=youW.clone(), ly=2.6;
 if(t>=c.casi&&t<c.oro){L=youW.clone().lerp(finW,eio(seg(t,c.casi-.4,c.casi+.4))); if(t>=c.descal) L=finW.clone().lerp(youW,eio(seg(t,c.descal,c.oro)));}
 const TP=Math.PI*2;
 const CK=[[0,.9,13,.18,0],[c.coche0,1.5,11,.15,0],[c.como,2.4,14,.2,0],[c.sanluis,2.9,10,.15,0],[c.eres,3.05,7.5,.1,0],[c.calor,2.6,10,.3,0],[c.mitad,.6,14,.2,0],[c.sentado,1.4,10,.12,0],[c.encoche,1.8,11,.14,0],
  [c.nopuedes,3.0,7.5,.12,0],[c.estric,2.6,6.5,.15,0],[c.huevo,2.4,7,.2,0],[c.llegas,.3,16,.3,0],[c.casi,3.0,17,.28,0],[c.pillan,3.05,14,.2,0],[c.descal,3.1,12,.15,0],[c.oro,2.9,9,.12,0],[c.tiempo,2.7,11,.2,0],
  [c.pregunta,2.4,13,.25,0],[c.pillas,2.2,14,.25,0],[c.loop,TP+.6,13,.18,0],[end,TP+.9,13,.18,0],[1e9,TP+.9,13,.18,0]];
 let [ca,cd,chh]=kf(CK,t); const Lw=ROOM.clone().add(L).add(new THREE.Vector3(0,ly,0));
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd)); if(P.y<ROOM.y+.8) P.y=ROOM.y+.8;
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.6) pkk=Math.max(pkk,Math.exp(-dd*6));}); const shake=pkk*1.2+tired*.15;
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*shake*.12; cam.position.y+=Math.cos(t*61)*shake*.12; cam.lookAt(Lw); cam.near=.1; cam.far=900;
 cam.fov=50-pkk*3-7*seg(t,c.pero,c.casi)*(1-seg(t,c.casi,c.casi+.5))-6*seg(t,c.descal,c.oro)*(1-seg(t,c.oro+.3,c.tiempo)); cam.updateProjectionMatrix();
 const icon=(m,on,pos,s)=>{m.visible=on>.01; if(!m.visible) return; m.position.copy(pos); m.scale.setScalar(s*back(on)); m.lookAt(cam.position);};
 icon(ST.carI,Math.max(t<c.como?seg(t,.2,.6):0,seg(t,c.sentado,c.sentado+.3)*(1-seg(t,c.nopuedes,c.nopuedes+.3))),new THREE.Vector3(1.2,5.2,cz),1.2);
 icon(ST.skull,seg(t,c.estric,c.estric+.3)*(1-seg(t,c.llegas-.3,c.llegas)),new THREE.Vector3(-1.4,4.6,yz+.4),.7);
 const mt=seg(t,c.descal,c.oro); const mpos=new THREE.Vector3(.8,6,kf(K.L,t)[0]).lerp(new THREE.Vector3(0,6.4,yz),eio(mt)); icon(ST.medal,seg(t,c.casi,c.casi+.3)*(1-seg(t,c.pregunta,c.pregunta+.3)),mpos,1.2);
 icon(ST.x,seg(t,c.pillan,c.pillan+.3)*(1-seg(t,c.oro,c.oro+.3)),new THREE.Vector3(.8,5.4,kf(K.L,t)[0]),1.0);
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.3); b.position.set(L.x+q.x,q.y,L.z+q.z); b.lookAt(cam.position);});
 const kb=Lw.clone(); key.position.set(kb.x+10,kb.y+28,kb.z+12); keyT.position.copy(kb); fill.position.set(kb.x-16,kb.y+12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,kb.y+6,kb.z-6); key.distance=220; key.angle=.95;
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true; parts.material.opacity=.45;
 sky.position.copy(cam.position);
 const cine=Math.max(t<c.como?.6:0,seg(t,c.nopuedes,c.nopuedes+.4)*(1-seg(t,c.llegas,c.llegas+.5)),seg(t,c.pillan,c.pillan+.3)*(1-seg(t,c.tiempo,c.tiempo+.6)));
 FX.update(t,{cine,vig:.45*seg(t,c.nopuedes,c.nopuedes+.4)*(1-seg(t,c.llegas,c.llegas+.5)),flash:(t>c.casi&&t<c.pillan)||(t>c.oro&&t<c.pregunta)?.2:0});
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.35; document.getElementById('flash').style.opacity=0;
 C.render();
 let bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); let bh=bg?bg[2]:'';
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
