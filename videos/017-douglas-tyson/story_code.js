// ================= HISTORIA 017: tú eres Buster Douglas (Tokio, 1990) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const FLR=1.4, RS=7;
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 const plat=new THREE.Mesh(new THREE.BoxGeometry(RS*2+1,FLR,RS*2+1),M(0x1a1c22)); plat.position.y=FLR/2; W0.add(plat);
 const canvas=new THREE.Mesh(new THREE.PlaneGeometry(RS*2,RS*2),new THREE.MeshStandardMaterial({map:canvasTex(512,512,(x,w,h)=>{x.fillStyle='#d9d2c4';x.fillRect(0,0,w,h);x.fillStyle='#2a62d8';x.globalAlpha=.25;x.beginPath();x.arc(w/2,h/2,120,0,7);x.fill();}),roughness:.8}));
 canvas.rotation.x=-Math.PI/2; canvas.position.y=FLR+.01; W0.add(canvas);
 const cols=[0xd92a2a,0xf2f2f2,0x2a62d8]; for(const [x,z] of [[-RS,-RS],[RS,-RS],[RS,RS],[-RS,RS]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,3.4,10),M(0xc9ced6,{metalness:.6})); p.position.set(x,FLR+1.7,z); W0.add(p);}
 for(let i=0;i<3;i++){const y=FLR+1+i*.9; for(const [a,b] of [[[-RS,-RS],[RS,-RS]],[[RS,-RS],[RS,RS]],[[RS,RS],[-RS,RS]],[[-RS,RS],[-RS,-RS]]]){const r=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,RS*2,8),M(cols[i])); r.position.set((a[0]+b[0])/2,y,(a[1]+b[1])/2); if(a[1]===b[1]) r.rotation.z=Math.PI/2; else r.rotation.x=Math.PI/2; W0.add(r);}}
 // público alrededor
 const pos=[]; const cs=[0xd9d2c4,0x2a62d8,0xffd23f,0x2e9a4a,0xffffff,0x3a3f4a,0xd92a2a]; const stM=M(0x22262f,{roughness:.8});
 for(let r=0;r<7;r++){const R0=16+r*2.8; for(let k=0;k<64;k++){const a=k/64*Math.PI*2; pos.push([Math.cos(a)*R0,1.2+r*1.5,Math.sin(a)*R0]);} const st=new THREE.Mesh(new THREE.CylinderGeometry(R0+1.4,R0+1.4,.8+r*1.5,64,1,true),stM); st.position.y=(.8+r*1.5)/2; W0.add(st);}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.7,1.2,.7),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const dm=new THREE.Object3D(), cc=new THREE.Color();
 pos.forEach((p,k)=>{dm.position.set(p[0],p[1],p[2]); dm.updateMatrix(); im.setMatrixAt(k,dm.matrix); im.setColorAt(k,cc.setHex(cs[k%7]));}); W0.add(im); ST.crowd=im; ST.cpos=pos;
 // boxeadores
 const glove=(h,col)=>{['aL','aR'].forEach(n=>{const g=new THREE.Mesh(new THREE.SphereGeometry(.34,16,12),M(col,{roughness:.35})); g.position.y=-.85; h.userData[n].add(g);});};
 const mk=(col,sc=1.6)=>{const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,sc); J.add(h); W0.add(J); return {J,h};};
 ST.you=mk(0xff9a4a); glove(ST.you.h,0xd92a2a); ST.head=ST.you.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 const trunks=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.45,16),M(0xf2f2f2)); trunks.position.y=1.0; ST.you.h.add(trunks);
 ST.ty=mk(0x3a3f4a); glove(ST.ty.h,0x1a1c22); const tt=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.45,16),M(0x111111)); tt.position.y=1.0; ST.ty.h.add(tt);
 ST.ref=mk(0xf2f2f2,1.45);
 ST.belt=await icon3D('trophy',0xffc21a,1.5,{depth:3}); W0.add(ST.belt);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.3,{depth:2}); b.userData={x:(rnd()-.5)*10,y:4+rnd()*6,z:(rnd()-.5)*6,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; window.popsReady=true;};
let K=null;
function setupK(c){K=true; const W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 const hit=(t0,x,col=[0xffffff,0xffd23f])=>FX.burst('sparks',W([x,FLR+3.4,0]),t0,40,col,.9);
 hit(c.gancho1+.1,-1.4); hit(c.g2+.1,1.2); hit(c.der+.1,1.2); hit(c.izq+.1,1.2,[0xffd23f,0xffffff,0xff7a1a]); hit(.4,1.2);
 FX.ring(W([-2.6,FLR+.1,0]),c.gancho1+.5,0xffffff,4,.6); FX.burst('dust',W([-2.6,FLR+.2,0]),c.gancho1+.5,30);
 FX.ring(W([2.8,FLR+.1,0]),c.cae+.3,0xffd23f,6,.9); FX.burst('dust',W([2.8,FLR+.2,0]),c.cae+.3,40);
 FX.ring(W([0,FLR+.1,0]),c.campana,0xffd23f,5,.7);
 FX.burst('confetti',W([0,16,0]),c.campeon+.1,240,[0xffd23f,0xd92a2a,0xffffff,0x2a62d8],1.8); FX.burst('confetti',W([-8,14,-6]),c.campeon+.3,160);
 [[-14,26,-14],[14,26,-14],[-14,26,14],[14,26,14]].forEach((p,i)=>FX.beam(W(p),0xfff2d0,30,i*1.3));
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
const S120=s=>'<span style="font-size:120px">'+s+'</span>', S100=s=>'<span style="font-size:100px">'+s+'</span>';
const BIG=[["","como","42 a 1<small>nadie daba un duro por él</small>"],["como","tokio",S100("CONTRA EL INVENCIBLE")],["tokio","eres",S120("TOKIO 1990")],["eres","madre",S100("BUSTER DOUGLAS")],["madre","delante","23 DÍAS<small>desde que murió su madre</small>"],
 ["delante","campana","37 – 0<small>Mike Tyson, invicto</small>"],["campana","octavo",S120("¡DING!")],["octavo","uno",S120("8.º ASALTO")],["levantas","decimo",S120("¡ARRIBA!")],["decimo","cae",S120("10.º ASALTO")],["cae","campeon",S100("¡TYSON CAE!")+"<small>por primera vez</small>"],
 ["campeon","pregunta",S100("¡CAMPEÓN!")],["pregunta","leo",S100("¿SUERTE O GESTA?")]];
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 const hook=t<c.como, loopT=t>=c.loop;
 const pose=(B,o)=>{const u=B.h.userData, h=B.h; h.position.set(0,0,0); h.rotation.set(0,0,0); [u.aL,u.aR,u.lL,u.lR].forEach(l=>l.rotation.set(0,0,0));
  u.aL.rotation.x=-1.4; u.aR.rotation.x=-1.2; u.aL.rotation.z=.35; u.aR.rotation.z=-.35; const bob=Math.sin(t*6+(o.ph||0)); h.position.y=Math.abs(bob)*.08; u.lL.rotation.x=bob*.2; u.lR.rotation.x=-bob*.2;
  if(o.punchL!==undefined&&o.punchL>0){u.aL.rotation.x=lerp(-1.4,-1.62,o.punchL); u.aL.rotation.z=lerp(.35,-.1,o.punchL);} if(o.punchR!==undefined&&o.punchR>0){u.aR.rotation.x=lerp(-1.2,-1.62,o.punchR); u.aR.rotation.z=lerp(-.35,.1,o.punchR);}
  if(o.up!==undefined&&o.up>0){u.aR.rotation.x=lerp(-1.2,-2.4,o.up);}
  if(o.fall>0){h.rotation.x=0; B.J.rotation.z=0; u.aL.rotation.x=u.aR.rotation.x=lerp(-1.4,-2.8,o.fall);}
  if(o.win>0){u.aL.rotation.x=u.aR.rotation.x=-2.9*o.win; u.aL.rotation.z=.3*o.win; u.aR.rotation.z=-.3*o.win;}};
 const pk=(t0,d=.25)=>Math.sin(seg(t,t0,t0+d)*Math.PI);
 // ---- tú
 let yx=-2.2, yfall=0, ywin=0; const youDown=seg(t,c.gancho1+.1,c.gancho1+.6)*(1-seg(t,c.nueve,c.levantas+.2)); yfall=youDown;
 if(t>=c.campeon&&!loopT) ywin=seg(t,c.campeon,c.campeon+.4);
 let jabs=t>=c.campana&&t<c.octavo?Math.max(pk(c.golpeas),pk(c.golpeas+.6),pk(c.asaltos),pk(c.asaltos+.5)):0;
 let comboL=Math.max(pk(c.izq),hook?pk(.35,.3):0,loopT?pk(c.loop+1.2,.3):0), comboR=Math.max(pk(c.der),jabs), upp=pk(c.g2);
 if(t>=c.tokio&&t<c.campana){yx=-5;}
 else if(t>=c.campana&&t<c.decimo){yx=-2.4+Math.sin(t*1.3)*.4;}
 ST.you.J.position.set(yx,FLR+youDown*.35,0); ST.you.J.rotation.set(-youDown*Math.PI/2*.92,Math.PI/2,0);
 pose(ST.you,{punchL:comboL,punchR:comboR,up:upp,win:ywin});
 if(t>=c.tokio&&t<c.delante){const u=ST.you.h.userData; u.aL.rotation.x=u.aR.rotation.x=-.4;}
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)||(youDown>.5)?.15:1,1));
 // ---- Tyson
 let tx=2.2; if(t>=c.tokio&&t<c.campana) tx=5; else if(t>=c.campana&&t<c.decimo) tx=2.4+Math.sin(t*1.1+1)*.4;
 const tyDown=Math.max(hook?seg(t,.5,1.4):0,seg(t,c.cae,c.cae+.6)*(loopT?0:1),loopT?seg(t,c.loop+1.3,c.loop+2.1):0);
 const stag=Math.max(pk(c.g2,.4),pk(c.der,.4),pk(c.izq,.4))*(t<c.cae?1:0);
 ST.ty.J.position.set(tx+stag*.5,FLR+tyDown*.35,0); ST.ty.J.rotation.set(-tyDown*Math.PI/2*.92-stag*.25,-Math.PI/2,0);
 pose(ST.ty,{ph:1.3,up:pk(c.gancho1,.35),punchL:t>=c.campana&&t<c.octavo?pk(c.aguantas+.3):0});
 if(t>=c.campeon&&!loopT){ST.ty.J.position.set(4.2,FLR,-3.4); ST.ty.J.rotation.set(0,-.8,0); const u=ST.ty.h.userData; u.aL.rotation.x=u.aR.rotation.x=-.3;}
 // ---- árbitro: cuenta y separa
 const counting=(t>=c.gancho1+.5&&t<c.levantas)||(t>=c.cae+.5&&t<c.campeon); const ru=ST.ref.h.userData; [ru.aL,ru.aR,ru.lL,ru.lR].forEach(l=>l.rotation.set(0,0,0));
 let rp=new THREE.Vector3(0,FLR,-3.2), ry=0; if(t>=c.gancho1+.4&&t<c.levantas){rp.set(-1.4,FLR,-1.6); ry=-.6;} if(t>=c.cae+.4&&t<c.campeon){rp.set(1.8,FLR,-1.8); ry=.6;}
 if(counting) ru.aR.rotation.x=-1.6+Math.sin(t*6)*.6; if(t>=c.campeon&&!loopT){rp.set(-.6,FLR,-1.2); ry=0; ru.aR.rotation.x=-2.9; ru.aR.rotation.z=-.6;}
 ST.ref.J.position.copy(rp); ST.ref.J.rotation.set(0,ry,0);
 // ---- CÁMARA
 let L=new THREE.Vector3(hook||loopT?1.4:0,0,0), ly=FLR+2.6;
 if(t>=c.tokio&&t<c.delante){L.set(-5,0,0);} else if(t>=c.delante&&t<c.campana){L.set(5,0,0);} else if(t>=c.gancho1+.3&&t<c.decimo){L.set(lerp(-4.4,-2.4,seg(t,c.levantas-.3,c.levantas+.4)),0,0); ly=FLR+1.4;} else if(t>=c.cae&&t<c.campeon){L.set(lerp(2.4,4.6,seg(t,c.cae,c.cae+.6)),0,0); ly=FLR+1.2;} else if(t>=c.campeon&&t<c.loop){L.set(-2.2,0,0);}
 const sm=v=>v; const TP=Math.PI*2;
 const CK=[[0,.1,13,.15,0],[c.odds,.2,13,.15,0],[c.como,.6,13,.2,0],[c.tokio,1.0,8,.1,0],[c.madre,1.3,6.5,.08,0],[c.delante,-1.2,8,.1,0],[c.v37,-1.4,7,.06,0],[c.campana,.1,16,.35,0],[c.golpeas,.4,12,.2,0],
  [c.octavo,.9,10,.15,0],[c.gancho1,1.1,8,.1,0],[c.uno,.6,8,.5,0],[c.nueve,.4,7,.35,0],[c.levantas,.9,9,.12,0],[c.decimo,.3,10,.15,0],[c.g2,.9,8,.08,0],[c.izq,1.3,8,.08,0],[c.cae,1.0,9,.4,0],[c.primera,.7,10,.45,0],
  [c.campeon,1.2,9,.08,0],[c.pregunta,1.5,12,.2,0],[c.pillas,1.8,14,.25,0],[c.loop,TP+.1,11,.15,0],[end,TP+.2,11,.15,0],[1e9,TP+.2,11,.15,0]];
 let [ca,cd,chh]=kf(CK,t); const Lw=ROOM.clone().add(L).add(new THREE.Vector3(0,ly,0));
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd));
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.6) pkk=Math.max(pkk,Math.exp(-dd*6));}); const shake=pkk*1.6;
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*shake*.12; cam.position.y+=Math.cos(t*61)*shake*.12; cam.lookAt(Lw); cam.near=.1; cam.far=900;
 cam.fov=50-pkk*3-8*seg(t,c.decimo,c.izq)*(1-seg(t,c.cae,c.cae+.6))-6*seg(t,c.uno,c.nueve)*(1-seg(t,c.levantas,c.levantas+.4)); cam.updateProjectionMatrix();
 const icon=(m,on,pos,s)=>{m.visible=on>.01; if(!m.visible) return; m.position.copy(pos); m.scale.setScalar(s*back(on)); m.lookAt(cam.position);};
 icon(ST.belt,seg(t,c.campeon,c.campeon+.3)*(1-seg(t,c.pregunta+.5,c.pregunta+.8)),new THREE.Vector3(-2.2,FLR+6.6,0),1.3);
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.3); b.position.set(L.x+q.x,q.y,L.z+q.z); b.lookAt(cam.position);});
 const kb=ROOM.clone().add(new THREE.Vector3(L.x,FLR,0)); key.position.set(kb.x+4,kb.y+24,kb.z+8); keyT.position.copy(kb); fill.position.set(kb.x-14,kb.y+10,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,kb.y+6,kb.z-6); key.distance=200; key.angle=.7;
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true; parts.material.opacity=.3;
 sky.position.copy(cam.position);
 const cine=Math.max(hook?.6:0,seg(t,c.madre,c.madre+.4)*(1-seg(t,c.campana,c.campana+.4)),seg(t,c.octavo,c.octavo+.3)*(1-seg(t,c.levantas+.3,c.levantas+.8)),seg(t,c.decimo,c.decimo+.3)*(1-seg(t,c.campeon+.6,c.campeon+1.2)));
 FX.update(t,{cine,vig:Math.max(.4*seg(t,c.madre,c.madre+.4)*(1-seg(t,c.delante,c.delante+.4)),.45*seg(t,c.uno,c.uno+.3)*(1-seg(t,c.levantas,c.levantas+.3))),beams:(t>c.campeon&&t<c.pregunta)||hook?.16:.08,
  flash:(t>c.levantas&&t<c.decimo)||(t>c.cae&&t<c.pregunta)?.25:(t>c.campana&&t<c.octavo?.1:(hook?.15:0))});
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.35; document.getElementById('flash').style.opacity=0;
 C.render();
 let bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); let bh=bg?bg[2]:'';
 if(!bg&&t>=c.uno&&t<c.levantas){const n=Math.min(9,1+Math.floor(lerp(0,8.99,seg(t,c.uno,c.nueve+.3)))); bh=n+'<small>cuenta el árbitro</small>';}
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
