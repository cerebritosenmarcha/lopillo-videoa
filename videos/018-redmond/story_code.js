// ================= HISTORIA 018: tú eres Derek Redmond (Barcelona, 1992) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const FIN=-40, START=30, LX=1.2;
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0; floor.visible=false;
 const grass=new THREE.Mesh(new THREE.PlaneGeometry(120,200),M(0x2f6b34,{roughness:.95})); grass.rotation.x=-Math.PI/2; grass.position.set(10,0,-10); W0.add(grass);
 const trk=new THREE.Mesh(new THREE.PlaneGeometry(16,140),new THREE.MeshStandardMaterial({map:canvasTex(512,1024,(x,w,h)=>{x.fillStyle='#b5523b';x.fillRect(0,0,w,h);x.fillStyle='#f2f2f2';for(let i=0;i<=8;i++) x.fillRect(i*w/8-3,0,6,h);}),roughness:.85}));
 trk.rotation.x=-Math.PI/2; trk.position.set(0,.02,-5); W0.add(trk);
 const fl=new THREE.Mesh(new THREE.BoxGeometry(16,.03,.5),new THREE.MeshBasicMaterial({color:0xffffff})); fl.position.set(0,.05,FIN); W0.add(fl);
 for(const s of [-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.3,3,.3),M(0xd9dce3)); p.position.set(s*8.6,1.5,FIN); W0.add(p);}
 // grada lateral
 const pos=[]; const cs=[0xd9d2c4,0x2a62d8,0xffd23f,0x2e9a4a,0xffffff,0x3a3f4a,0xd92a2a]; const stM=M(0x22262f,{roughness:.8});
 for(let r=0;r<8;r++){const x=-12-r*2.6; const st=new THREE.Mesh(new THREE.BoxGeometry(2.6,1.6+r*1.6,130),stM); st.position.set(x,.8+r*.8,-5); W0.add(st); for(let k=0;k<52;k++) pos.push([x,2.2+r*1.6,-70+k*2.5,(k*7+r*3)%10/10]);}
 const wall=new THREE.Mesh(new THREE.BoxGeometry(.4,1.4,130),M(0x2a62d8)); wall.position.set(-10.6,.7,-5); W0.add(wall);
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.7,1.2,.7),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const cc=new THREE.Color(); ST.dm=new THREE.Object3D();
 pos.forEach((p,k)=>{ST.dm.position.set(p[0],p[1],p[2]); ST.dm.updateMatrix(); im.setMatrixAt(k,ST.dm.matrix); im.setColorAt(k,cc.setHex(cs[k%7]));}); W0.add(im); ST.crowd=im; ST.cpos=pos;
 // personajes
 const mk=(col,sc=1.6)=>{const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,sc); J.add(h); W0.add(J); return {J,h};};
 ST.you=mk(0xff9a4a); ST.head=ST.you.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 const bib=new THREE.Mesh(new THREE.PlaneGeometry(.5,.4),new THREE.MeshBasicMaterial({map:canvasTex(128,100,(x,w,h)=>{x.fillStyle='#fff';x.fillRect(0,0,w,h);x.fillStyle='#111';x.font='900 60px Nunito';x.textAlign='center';x.fillText('GBR',w/2,70);})})); bib.position.set(0,1.6,.36); ST.you.h.add(bib);
 ST.dad=mk(0x5a6a8a,1.6); const cap=new THREE.Mesh(new THREE.SphereGeometry(.32,16,10,0,Math.PI*2,0,Math.PI*.5),M(0x1a1c22)); cap.position.y=.05; ST.dad.h.children[1].add(cap);
 ST.guard=mk(0xffc21a,1.55);
 ST.riv=[-5.2,-3.2,3.2,5.2,7.2,-7.2].map((x,i)=>{const r=mk([0x2a62d8,0xd92a2a,0x2e9a4a,0xffffff,0x1d2a5a,0xffc21a][i]); r.x=x; return r;});
 ST.heart=await icon3D('heart',0xff4f6a,1.2,{depth:3}); W0.add(ST.heart);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.3,{depth:2}); b.userData={x:(rnd()-.5)*10,y:3+rnd()*6,z:(rnd()-.5)*6,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; window.popsReady=true;};
let K=null;
function setupK(c){
 K={Y:[[0,FIN+1],[c.como,FIN-2],[c.bcn,START],[c.disparo,START],[c.rompe,START-26],[c.caes,START-28],[c.levantas,START-28],[c.grada,START-38],[c.agarra,START-46],[c.meta,FIN],[c.enpie,FIN-2.5],[1e9,FIN-2.5]],
  D:[[0,-15,4.2,START-46],[c.grada,-15,4.2,START-46],[c.esquiva-.4,-8,0,START-44],[c.padre,-3,0,START-45],[c.agarra,LX-1.6,0,START-46],[1e9,LX-1.6,0,START-46]]};
 const W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 FX.ring(W([LX,.2,START-28]),c.caes,0xffffff,4,.6); FX.burst('dust',W([LX,.3,START-28]),c.caes,30);
 FX.ring(W([0,1.5,FIN]),c.meta,0xffd23f,8,1,new THREE.Vector3(0,0,1)); FX.burst('sparks',W([LX,3,FIN]),c.meta,120,[0xffd23f,0xffffff,0xff4f6a],1.4);
 FX.burst('confetti',W([0,14,FIN-4]),c.enpie,180,[0xffd23f,0xffffff,0xd92a2a,0x2a62d8],1.5);
 [[-26,30,-30],[-26,30,10],[20,30,-20]].forEach((p,i)=>FX.beam(W(p),0xfff2d0,40,i*1.3));
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
const S120=s=>'<span style="font-size:120px">'+s+'</span>', S100=s=>'<span style="font-size:100px">'+s+'</span>';
const BIG=[["","oficial",S120("NO GANÓ")],["oficial","como",S100("NI TERMINÓ")+"<small>oficialmente</small>"],["como","bcn",S100("Y NADIE LO OLVIDA")],["bcn","eres",S100("BARCELONA 1992")+"<small>semifinal de 400 m</small>"],["eres","disparo",S100("DEREK REDMOND")],
 ["rompe","levantas",S120("¡ROTURA!")+"<small>isquiotibial</small>"],["grada","padre",S100("ALGUIEN BAJA…")],["padre","agarra",S120("¡SU PADRE!")],["meta","pregunta",S120("¡JUNTOS!")+"<small>el estadio, en pie</small>"],["pregunta","leo","DNF<small>«no terminó», dice el acta</small>"]];
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 const loopT=t>=c.loop, hook=t<c.como; const together=hook||loopT||(t>=c.agarra&&t<c.pregunta+3);
 const reset=B=>{const u=B.h.userData; B.h.position.set(0,0,0); B.h.rotation.set(0,0,0); [u.aL,u.aR,u.lL,u.lR].forEach(l=>l.rotation.set(0,0,0)); return u;};
 // ---- tú
 const U2=reset(ST.you), h=ST.you.h; let yz=kf(K.Y,t)[0]; if(t>=c.disparo&&t<c.rompe) yz=kfl(K.Y,t)[0]; if(loopT) yz=lerp(FIN-2.5,FIN+1,seg(t,c.loop,c.loop+.6));
 let yr=0, yy=0;
 if(t>=c.disparo&&t<c.rompe){walk(h,t,15,0,1.1); h.rotation.x=.18;}
 else if(t>=c.rompe&&t<c.levantas){const f=seg(t,c.rompe+.3,c.caes); yr=-f*1.35; U2.lR.rotation.x=-1.6; U2.aL.rotation.x=U2.aR.rotation.x=-1.2*f; yy=f*.3;}
 else if(t>=c.levantas&&t<c.agarra){const up=seg(t,c.levantas,c.levantas+.6); yr=-(1-up)*1.3; U2.lR.rotation.x=-1.5; U2.lL.rotation.x=Math.sin(t*8)*.4; U2.aR.rotation.x=-.6; yy=Math.abs(Math.sin(t*8))*.35*up; h.rotation.z=Math.sin(t*8)*.08;}
 else if(together){U2.lR.rotation.x=-1.4; U2.lL.rotation.x=Math.sin(t*6)*.35; U2.aL.rotation.x=-2.4; U2.aL.rotation.z=.9; yy=Math.abs(Math.sin(t*6))*.25; if(t>=c.meta&&t<c.pregunta+3&&!loopT){U2.aR.rotation.x=-2.9*seg(t,c.meta,c.meta+.5);}}
 ST.you.J.position.set(LX,yy,yz); ST.you.J.rotation.set(yr,Math.PI,0);
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)||(t>c.rompe&&t<c.levantas)?.15:1,1));
 // ---- rivales: se van
 ST.riv.forEach((r,i)=>{reset(r); const on=t>=c.bcn&&t<c.grada; r.J.visible=on; if(!on) return; let z=START; if(t>=c.disparo){const a=t-c.disparo; z=START-a*(11+i*.4);} r.J.position.set(r.x,0,z); r.J.rotation.set(0,Math.PI,0); if(t>=c.disparo){walk(r.h,t,15,i,1.1); r.h.rotation.x=.18;}});
 // ---- tu padre: baja de la grada, esquiva al de seguridad y te sostiene
 const du=reset(ST.dad); let [dx,dy,dz]=kf(K.D,t); if(together&&(hook||loopT||t>=c.agarra)){dx=LX-1.6; dy=0; dz=yz;}
 if(t>=c.grada&&t<c.esquiva-.4) dy=4.2*(1-seg(t,c.grada+.6,c.esquiva-.4))+Math.sin(seg(t,c.grada+.6,c.esquiva-.4)*Math.PI)*1.5;
 if(t>=c.grada&&t<c.agarra) walk(ST.dad.h,t,12,0,.9);
 if(together){du.aR.rotation.x=-2.4; du.aR.rotation.z=-.9; walk(ST.dad.h,t,6,0,.4); du.aR.rotation.x=-2.4; du.aR.rotation.z=-.9;}
 const dyaw=t>=c.grada&&t<c.agarra?Math.atan2(LX-dx,yz-dz):Math.PI; ST.dad.J.position.set(dx,dy,dz); ST.dad.J.rotation.set(0,together?Math.PI:dyaw,0);
 ST.dad.J.visible=true;
 // ---- seguridad
 reset(ST.guard); const gz=START-44; ST.guard.J.visible=t>=c.grada&&t<c.pregunta&&!loopT; ST.guard.J.position.set(lerp(-5,-6.5,seg(t,c.esquiva,c.esquiva+.6)),0,gz+lerp(0,1.5,seg(t,c.esquiva,c.esquiva+.6))); ST.guard.J.rotation.set(0,-Math.PI/2,0);
 ST.guard.h.userData.aL.rotation.x=ST.guard.h.userData.aR.rotation.x=t<c.padre?-1.4:0;
 // ---- público en pie
 const stand=Math.max(hook||loopT?1:0,seg(t,c.agarra,c.agarra+.8)*(1-seg(t,c.pregunta+1,c.pregunta+2))); const dm=ST.dm;
 ST.cpos.forEach((q,k)=>{dm.position.set(q[0],q[1]+stand*(.5+.3*Math.abs(Math.sin(t*6+q[3]*6))),q[2]); dm.updateMatrix(); ST.crowd.setMatrixAt(k,dm.matrix);}); ST.crowd.instanceMatrix.needsUpdate=true;
 // ---- CÁMARA
 const youW=new THREE.Vector3(LX,0,yz), dadW=new THREE.Vector3(dx,0,dz); let L=youW.clone(), ly=2.6;
 if(t>=c.grada&&t<c.agarra){L=youW.clone().lerp(dadW,eio(seg(t,c.grada-.2,c.grada+.6))*(1-seg(t,c.padre,c.agarra))); }
 if(together){L=youW.clone().add(new THREE.Vector3(-.8,0,0));}
 const TP=Math.PI*2;
 const CK=[[0,3.0,10,.12,0],[c.oficial,3.1,9,.1,0],[c.como,2.6,13,.2,0],[c.bcn,.7,26,.35,0],[c.semi,.4,20,.25,0],[c.eres,3.0,7,.1,0],[c.disparo,.2,9,.12,0],[c.sales,.6,10,.15,0],[c.derepente,1.3,8,.12,0],
  [c.rompe,1.6,7,.1,0],[c.caes,1.9,7,.25,0],[c.levantas,2.6,7.5,.15,0],[c.cojeando,3.0,8,.1,0],[c.grada,1.6,13,.2,0],[c.esquiva,1.4,14,.22,0],[c.padre,2.2,10,.15,0],[c.agarra,2.9,8,.1,0],[c.hombro,3.0,7.5,.08,0],
  [c.juntos,3.1,9,.06,0],[c.meta,3.0,11,.1,0],[c.enpie,2.4,22,.3,0],[c.pregunta,2.6,16,.25,0],[c.pillas,2.9,14,.2,0],[c.loop,3.0,10,.12,0],[end,3.0,10,.12,0],[1e9,3.0,10,.12,0]];
 let [ca,cd,chh]=kf(CK,t); const Lw=ROOM.clone().add(L).add(new THREE.Vector3(0,ly,0));
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd)); if(P.y<ROOM.y+.8) P.y=ROOM.y+.8;
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.6) pkk=Math.max(pkk,Math.exp(-dd*6));}); const shake=pkk*1.2;
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*shake*.12; cam.position.y+=Math.cos(t*61)*shake*.12; cam.lookAt(Lw); cam.near=.1; cam.far=900;
 cam.fov=50-pkk*3-7*seg(t,c.derepente,c.rompe)*(1-seg(t,c.rompe,c.rompe+.5))-6*seg(t,c.juntos,c.meta)*(1-seg(t,c.meta+.3,c.enpie)); cam.updateProjectionMatrix();
 const icon=(m,on,pos,s)=>{m.visible=on>.01; if(!m.visible) return; m.position.copy(pos); m.scale.setScalar(s*back(on)); m.lookAt(cam.position);};
 icon(ST.heart,seg(t,c.hombro,c.hombro+.3)*(1-seg(t,c.pregunta,c.pregunta+.3)),new THREE.Vector3(LX-.8,6.4+Math.sin(t*4)*.15,yz),.9);
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.3); b.position.set(L.x+q.x,q.y,L.z+q.z); b.lookAt(cam.position);});
 const kb=Lw.clone(); key.position.set(kb.x+10,kb.y+26,kb.z+12); keyT.position.copy(kb); fill.position.set(kb.x-16,kb.y+12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,kb.y+6,kb.z-6); key.distance=220; key.angle=.9;
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true; parts.material.opacity=.3;
 sky.position.copy(cam.position);
 const cine=Math.max(hook?.6:0,seg(t,c.rompe,c.rompe+.3)*(1-seg(t,c.levantas+.5,c.levantas+1)),seg(t,c.padre,c.padre+.4)*(1-seg(t,c.enpie+.5,c.enpie+1.2)));
 FX.update(t,{cine,vig:.45*seg(t,c.rompe,c.rompe+.4)*(1-seg(t,c.padre,c.padre+.5)),beams:together?.16:.07,flash:together&&!(t>=c.pregunta&&t<c.loop)?.22:(t>c.bcn&&t<c.disparo?.08:0)});
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.35; document.getElementById('flash').style.opacity=0;
 C.render();
 let bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); let bh=bg?bg[2]:'';
 if(!bg&&t>=c.levantas&&t<c.grada) bh=S100('SIGUE…')+'<small>a la pata coja</small>';
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
