// ================= HISTORIA 019: tú eres Steven Gerrard (Estambul, 2005) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const GA=-32, GB=32, V=(x,y,z)=>new THREE.Vector3(x,y,z);
function scoreTex(a,b,l2){return canvasTex(1024,512,(x,w,h)=>{x.fillStyle='#0a0d14';x.fillRect(0,0,w,h);x.strokeStyle='#3a4256';x.lineWidth=14;x.strokeRect(10,10,w-20,h-20);
 x.font='900 74px Nunito, sans-serif';x.textAlign='center';x.fillStyle='#ffd23f';x.fillText(l2||'FINAL · ESTAMBUL 2005',w/2,120);x.fillStyle='#fff';x.font='900 150px Nunito, sans-serif';x.fillText('MIL '+a+' – '+b+' LIV',w/2,350);});}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0; floor.visible=false;
 const pitch=new THREE.Mesh(new THREE.PlaneGeometry(52,72),new THREE.MeshStandardMaterial({map:canvasTex(512,720,(x,w,h)=>{for(let i=0;i<12;i++){x.fillStyle=i%2?'#2f7a34':'#2a6c2e';x.fillRect(0,i*h/12,w,h/12);}x.strokeStyle='#eef2ea';x.lineWidth=4;
  x.strokeRect(20,20,w-40,h-40);x.beginPath();x.moveTo(20,h/2);x.lineTo(w-20,h/2);x.stroke();x.beginPath();x.arc(w/2,h/2,60,0,7);x.stroke();x.strokeRect(w*.25,20,w*.5,110);x.strokeRect(w*.25,h-130,w*.5,110);}),roughness:.95}));
 pitch.rotation.x=-Math.PI/2; pitch.position.y=.02; W0.add(pitch);
 const white=M(0xf4f4f4,{roughness:.4}); ST.nets=[];
 for(const gz of [GA,GB]){const s=Math.sign(gz); for(const x of [-3.6,3.6]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,2.6,10),white); p.position.set(x,1.3,gz); W0.add(p);}
  const cb=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,7.4,10),white); cb.rotation.z=Math.PI/2; cb.position.set(0,2.6,gz); W0.add(cb);
  const net=new THREE.Mesh(new THREE.PlaneGeometry(7.2,2.6,12,6),new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.45})); net.position.set(0,1.3,gz+s*1.6); W0.add(net); net.userData.base=net.geometry.attributes.position.array.slice(); ST.nets.push(net);}
 // gradas
 const pos=[]; const stM=M(0x22262f,{roughness:.8});
 for(let r=0;r<8;r++){for(const [cx,cz,w,ry,side] of [[0,GA-12,60,0,0],[0,GB+12,60,0,1],[-30,0,80,1,2],[30,0,80,1,3]]){const st=new THREE.Mesh(new THREE.BoxGeometry(ry?2.6:w,1.6+r*1.6,ry?w:2.6),stM);
   const off=r*2.6*(side===0?-1:side===1?1:side===2?-1:1); st.position.set(ry?cx+off:cx,.8+r*.8,ry?cz:cz+off); W0.add(st);
   for(let k=0;k<30;k++){const o=-w/2+1+k*(w-2)/29; pos.push([ry?cx+off:cx+o,2.2+r*1.6,ry?cz+o:cz+off,side,(k*7+r*3)%10/10]);}}}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.7,1.2,.7),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const cc=new THREE.Color(); ST.dm=new THREE.Object3D();
 pos.forEach((p,k)=>{ST.dm.position.set(p[0],p[1],p[2]); ST.dm.updateMatrix(); im.setMatrixAt(k,ST.dm.matrix); const red=p[3]===1||p[3]===2; im.setColorAt(k,cc.setHex(red?(k%3?0xd92a2a:0xffffff):[0x1a1c22,0xd92a2a,0xffffff,0x3a3f4a][k%4]));}); W0.add(im); ST.crowd=im; ST.cpos=pos;
 // marcador
 ST.tex=[scoreTex(3,0),scoreTex(3,1),scoreTex(3,2),scoreTex(3,3),scoreTex(3,3,'PENALTIS: 2 – 3 LIV'),scoreTex(3,0,'DESCANSO')];
 ST.scr=new THREE.Mesh(new THREE.PlaneGeometry(20,10),new THREE.MeshBasicMaterial({map:ST.tex[0]})); ST.scr.position.set(0,20,GA-26); W0.add(ST.scr);
 // banquillo / túnel del descanso
 const tun=new THREE.Mesh(new THREE.BoxGeometry(5,4,4),M(0x30343c)); tun.position.set(-27,2,0); W0.add(tun); const bench=new THREE.Mesh(new THREE.BoxGeometry(1.2,1,4),M(0xd92a2a)); bench.position.set(-24.5,.5,0); W0.add(bench);
 // personajes
 const mk=(col,sc=1.6)=>{const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,sc); J.add(h); W0.add(J); return {J,h};};
 ST.you=mk(0xff9a4a); ST.head=ST.you.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 const band=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.12,10),M(0xffd23f)); band.position.y=-.35; ST.you.h.userData.aL.add(band);
 ST.mate1=mk(0xd92a2a); ST.mate2=mk(0xd92a2a); ST.dida=mk(0xffc21a); ST.dudek=mk(0x7dff9a); ST.shev=mk(0x2a2f3a);
 ST.ball=new THREE.Mesh(new THREE.SphereGeometry(.28,20,14),new THREE.MeshStandardMaterial({map:canvasTex(256,128,(x,w,h)=>{x.fillStyle='#f4f4f4';x.fillRect(0,0,w,h);x.fillStyle='#14161c';for(let i=0;i<10;i++){x.beginPath();x.arc((i*53)%w,(i*37)%h,13,0,7);x.fill();}}),roughness:.4})); W0.add(ST.ball);
 ST.cup=await icon3D('trophy',0xffc21a,1.6,{depth:3}); W0.add(ST.cup);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.3,{depth:2}); b.userData={x:(rnd()-.5)*10,y:3+rnd()*6,z:(rnd()-.5)*6,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; window.popsReady=true;};
let K=null; let BP=null;
const path=(t,P)=>{for(let i=0;i<P.length-1;i++){if(t<=P[i+1][0]){const a=seg(t,P[i][0],P[i+1][0]); const p=P[i][1].clone().lerp(P[i+1][1],a); p.y+=Math.sin(a*Math.PI)*(P[i+1][2]||0); return p;}} return P[P.length-1][1].clone();};
function setupK(c){K=true;
 BP=[[c.vuelves,V(14,.3,-20)],[c.g1-.5,V(14,.3,-20)],[c.g1-.05,V(1,4.6,-26),3],[c.g1+.35,V(-1.5,1.6,GA-1.2)],[c.g2-.3,V(6,.3,-13)],[c.g2+.3,V(2.5,2,GA-1.2),1],[c.g3-.3,V(0,.3,-21)],[c.g3+.15,V(1.6,1.1,GA+.6)],
  [c.gol3-.15,V(.8,.4,-25),1],[c.gol3+.25,V(-1,1,GA-1.2)],[c.pro,V(-1,.3,GA-1.2)],[c.shev,V(2,.4,25)],[c.shev+.4,V(.4,1.2,GB-.8)],[c.dudek+.3,V(4,1,25),1.5],[c.para2,V(-.4,2.1,GB-.8)],[c.para2+.5,V(-7,1,24),2],
  [c.pens,V(0,.3,21)],[c.lanza,V(0,.3,21)],[c.lapara,V(-2.4,1,GB-.6)],[c.lapara+.5,V(-5,.3,26),1.2],[1e9,V(-5,.3,26)]];
 const W=v=>ROOM.clone().add(v); FX.init();
 const goal=(t0,x)=>{FX.ring(W(V(x,1.3,GA-1)),t0,0xffd23f,5,.8,V(0,0,1)); FX.burst('sparks',W(V(x,1.5,GA-1)),t0,90,[0xffd23f,0xd92a2a,0xffffff],1.3); FX.burst('confetti',W(V(0,14,GB+14)),t0+.1,120,[0xd92a2a,0xffffff],1.4);};
 goal(c.g1+.35,-1.5); goal(c.g2+.3,2.5); goal(c.gol3+.25,-1);
 FX.burst('sparks',W(V(.4,1.2,GB-.8)),c.shev+.4,40,[0xffffff,0x7dff9a],.8); FX.burst('sparks',W(V(-.4,2.1,GB-.8)),c.para2,60,[0xffffff,0x7dff9a],1); FX.ring(W(V(-2.4,1,GB-.6)),c.lapara,0x7dff9a,6,.8,V(0,0,1));
 FX.burst('confetti',W(V(0,16,0)),c.campeones,260,[0xd92a2a,0xffffff,0xffd23f],2); FX.burst('confetti',W(V(-10,14,10)),c.campeones+.3,160,[0xd92a2a,0xffffff]); FX.burst('confetti',W(V(0,16,0)),.05,200,[0xd92a2a,0xffffff,0xffd23f],2);
 [[-28,30,-28],[28,30,-28],[-28,30,28],[28,30,28]].forEach((p,i)=>FX.beam(W(V(...p)),0xfff2d0,40,i*1.3));
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
const S120=s=>'<span style="font-size:120px">'+s+'</span>', S100=s=>'<span style="font-size:100px">'+s+'</span>';
const BIG=[["","como","0 – 3<small>en el descanso</small>"],["como","estambul",S100("…Y CAMPEONES")],["estambul","eres",S120("ESTAMBUL 2005")+"<small>final de la Champions</small>"],["eres","descanso",S100("STEVEN GERRARD")],
 ["vest","canta",S120("SILENCIO")],["canta","vuelves",S100("LA GRADA CANTA")],["g1","g2",S120("¡3 – 1!")],["g2","g3",S120("¡3 – 2!")],["gol3","pro",S120("¡3 – 3!")+"<small>en seis minutos</small>"],["pro","pens",S100("¡DOBLE PARADA!")],["pens","lapara",S120("PENALTIS")],
 ["lapara","pregunta",S100("¡CAMPEONES!")],["pregunta","leo",S100("¿MILAGRO O EXCESO DE CONFIANZA?")]];
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 const hook=t<c.como, loopT=t>=c.loop, champ=hook||loopT||t>=c.campeones;
 const reset=B=>{const u=B.h.userData; B.h.position.set(0,0,0); B.h.rotation.set(0,0,0); B.J.rotation.set(0,0,0); [u.aL,u.aR,u.lL,u.lR].forEach(l=>l.rotation.set(0,0,0)); return u;};
 const place=(B,x,z,yaw,y=0)=>{B.J.position.set(x,y,z); B.J.rotation.y=yaw;};
 // ---- tú
 const U2=reset(ST.you); let yp=V(0,0,0), yaw=Math.PI, jump=0;
 if(champ){yp.set(0,0,2); yaw=0; const up=hook||loopT?1:seg(t,c.campeones,c.campeones+.4); U2.aL.rotation.x=U2.aR.rotation.x=-2.9*up;}
 else if(t<c.vuelves){yp.set(-24,0,0); yaw=Math.PI/2; if(t>=c.descanso&&t<c.canta){ST.you.h.position.y=-.9; U2.lL.rotation.x=U2.lR.rotation.x=-1.5; ST.you.h.rotation.x=.4; U2.aL.rotation.x=U2.aR.rotation.x=-.4;} if(t>=c.canta){const a=seg(t,c.canta,c.canta+.8); U2.aL.rotation.x=U2.aR.rotation.x=-2.6*a;}}
 else if(t<c.g2-.3){const a=eio(seg(t,c.vuelves,c.g1-.4)); yp=V(-24,0,0).lerp(V(1,0,-26),a); if(a<1) walk(ST.you.h,t,14,0,1); jump=Math.sin(seg(t,c.g1-.4,c.g1+.2)*Math.PI)*1.6; if(t>c.g1+.4){U2.aL.rotation.x=U2.aR.rotation.x=-2.8;}}
 else if(t<c.pro){yp.set(-4,0,-17); yaw=Math.PI; if((t>c.g2+.3&&t<c.g3)||t>c.gol3+.25){U2.aL.rotation.x=U2.aR.rotation.x=-2.8;}}
 else {yp.set(-7,0,14); yaw=Math.PI*.15; if(t>c.para2&&t<c.pens+.5){U2.aL.rotation.x=U2.aR.rotation.x=-2.6;}}
 ST.you.J.position.set(yp.x,jump,yp.z); ST.you.J.rotation.y=yaw;
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)||(t>c.vest&&t<c.canta)?.15:1,1));
 // ---- compañeros y rivales
 const m1=reset(ST.mate1), m2=reset(ST.mate2); const actA=t>=c.vuelves&&t<c.pro;
 ST.mate1.J.visible=ST.mate2.J.visible=actA||champ; place(ST.mate1,champ?-2.5:6.4,champ?3:-12.4,Math.PI+(champ?Math.PI:0)); place(ST.mate2,champ?2.5:.4,champ?3:-20.2,Math.PI+(champ?Math.PI:0));
 if(champ){m1.aL.rotation.x=m1.aR.rotation.x=m2.aL.rotation.x=m2.aR.rotation.x=-2.7+Math.sin(t*9)*.3;} else {m1.lR.rotation.x=-1.2*Math.sin(seg(t,c.g2-.4,c.g2-.1)*Math.PI); m2.lR.rotation.x=-1.2*Math.sin(seg(t,c.g3-.4,c.g3-.1)*Math.PI);}
 reset(ST.dida); ST.dida.J.visible=!champ&&t>=c.vuelves&&t<c.pro; const dd3=Math.sin(seg(t,c.g3,c.g3+.4)*Math.PI); place(ST.dida,lerp(0,1.4,dd3),GA+.6,0); ST.dida.J.rotation.z=-dd3*1.1;
 const du=reset(ST.dudek); ST.dudek.J.visible=t>=c.pro&&!loopT||hook; let dx=0, dr=0; if(t>=c.shev&&t<c.pens){dr=Math.sin(seg(t,c.shev+.1,c.shev+.5)*Math.PI)*.7+Math.sin(seg(t,c.para2-.3,c.para2+.2)*Math.PI)*1.0;} if(t>=c.lanza&&t<c.campeones){const a=seg(t,c.lanza+.3,c.lapara); dx=-2.2*a; dr=a*1.3;}
 if(champ){place(ST.dudek,4.5,1,Math.PI); du.aL.rotation.x=du.aR.rotation.x=-2.7;} else {place(ST.dudek,dx,GB-.6,Math.PI,dr*.4); ST.dudek.J.rotation.z=dr; du.aL.rotation.x=du.aR.rotation.x=-2.4;}
 reset(ST.shev); ST.shev.J.visible=t>=c.pro&&t<c.campeones; place(ST.shev,t<c.pens?2:0,t<c.pens?24:20,0); ST.shev.h.userData.lR.rotation.x=-1.2*Math.max(Math.sin(seg(t,c.shev-.3,c.shev)*Math.PI),Math.sin(seg(t,c.lanza-.3,c.lanza)*Math.PI));
 if(t>=c.lapara&&t<c.campeones){ST.shev.h.rotation.x=.3; ST.shev.h.userData.aL.rotation.x=ST.shev.h.userData.aR.rotation.x=-2.4;}
 // ---- balón y redes
 const bp=champ||t<c.vuelves?V(0,-5,0):path(t,BP); ST.ball.position.copy(bp); ST.ball.rotation.x=t*9;
 const hits=[c.g1+.35,c.g2+.3,c.gol3+.25]; ST.nets.forEach((n,i)=>{const a=n.geometry.attributes.position, b=n.userData.base; const amp=i===0?hits.reduce((m,h0)=>Math.max(m,Math.exp(-Math.max(0,t-h0)*4)*(t>=h0?1:0)),0):0;
  for(let k=0;k<a.count;k++){const x=b[k*3], y=b[k*3+1]; a.setZ(k,-amp*1.2*Math.cos(x/7.2*Math.PI)*Math.cos((y)/2.6*Math.PI));} a.needsUpdate=true;});
 const sc=t>=c.lapara?4:t>=c.gol3+.25?3:t>=c.g2+.3?2:t>=c.g1+.35?1:(t>=c.descanso&&t<c.vuelves?5:0); ST.scr.material.map=ST.tex[champ?4:sc];
 // ---- público
 const sing=Math.max(seg(t,c.canta,c.canta+.6)*(1-seg(t,c.vuelves+1,c.vuelves+2)),champ?1:0,Math.max(...[c.g1+.35,c.g2+.3,c.gol3+.25,c.lapara].map(h0=>t>=h0?Math.exp(-(t-h0)*.8):0))); const dm=ST.dm;
 ST.cpos.forEach((q,k)=>{const red=q[3]===1||q[3]===2; dm.position.set(q[0],q[1]+(red?sing:0)*(.4+.3*Math.abs(Math.sin(t*6+q[4]*6))),q[2]); dm.updateMatrix(); ST.crowd.setMatrixAt(k,dm.matrix);}); ST.crowd.instanceMatrix.needsUpdate=true;
 // ---- CÁMARA
 let L=V(yp.x,0,yp.z), ly=2.6; if(t>=c.g2-.3&&t<c.pro) L=V(bp.x*.5,0,lerp(-24,GA+4,.4)); if(t>=c.pro&&t<c.campeones) L=V(0,0,GB-3.5);
 if(t>=c.descanso&&t<c.vest){L=V(0,0,GA-26); ly=18;} if(t>=c.canta&&t<c.vuelves){L=V(-24,0,0).lerp(V(-36,0,0),seg(t,c.canta,c.canta+1)*(1-seg(t,c.vuelves-1,c.vuelves))); ly=lerp(2.6,6,seg(t,c.canta,c.canta+1)*(1-seg(t,c.vuelves-1,c.vuelves)));}
 const TP=Math.PI*2;
 const CK=[[0,3.0,11,.15,0],[c.copa0,2.8,13,.2,0],[c.como,2.4,26,.45,0],[c.estambul,1.0,40,.6,0],[c.eres,1.4,8,.1,0],[c.descanso,.0,34,.1,0],[c.vest,1.3,7,.12,0],[c.canta,1.1,14,.3,0],[c.vuelves,.6,16,.3,0],
  [c.g1-.3,1.2,10,.15,0],[c.g1+.3,.9,12,.2,0],[c.g2,.5,18,.35,0],[c.g3,.2,16,.3,0],[c.gol3,.4,14,.25,0],[c.seis,.8,20,.4,0],[c.pro,2.6,18,.3,0],[c.shev,2.3,14,.2,0],[c.para2,2.0,12,.15,0],
  [c.pens,2.9,16,.15,0],[c.lanza,2.95,12,.1,0],[c.lapara,2.7,11,.1,0],[c.campeones,3.0,11,.15,0],[c.pregunta,2.6,15,.25,0],[c.pillas,2.4,17,.3,0],[c.loop,3.0,11,.15,0],[end,3.0,11,.15,0],[1e9,3.0,11,.15,0]];
 let [ca,cd,chh]=kf(CK,t); const Lw=ROOM.clone().add(L).add(V(0,ly,0));
 const P=Lw.clone().add(V(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd)); if(P.y<ROOM.y+.8) P.y=ROOM.y+.8;
 let pkk=0; TL.punch.forEach(v=>{const d0=t-v; if(d0>=0&&d0<.6) pkk=Math.max(pkk,Math.exp(-d0*6));}); const shake=pkk*1.2;
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*shake*.12; cam.position.y+=Math.cos(t*61)*shake*.12; cam.lookAt(Lw); cam.near=.1; cam.far=900;
 cam.fov=50-pkk*3-7*seg(t,c.ultimo,c.lanza)*(1-seg(t,c.lapara,c.lapara+.5)); cam.updateProjectionMatrix();
 const icon=(m,on,pos,s)=>{m.visible=on>.01; if(!m.visible) return; m.position.copy(pos); m.scale.setScalar(s*back(on)); m.lookAt(cam.position);};
 icon(ST.cup,champ&&!(t>=c.pregunta&&t<c.loop)?1:0,V(0,7.4+Math.sin(t*3)*.15,2),1.3);
 ST.bub.forEach(b=>{const q=b.userData, d0=t-c.leo-q.d; b.visible=d0>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(d0/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.3); b.position.set(L.x+q.x,q.y,L.z+q.z); b.lookAt(cam.position);});
 const kb=ROOM.clone().add(V(L.x,0,L.z)); key.position.set(kb.x+10,kb.y+28,kb.z+12); keyT.position.copy(kb); fill.position.set(kb.x-16,kb.y+12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,kb.y+6,kb.z-6); key.distance=220; key.angle=.95;
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true; parts.material.opacity=.3;
 sky.position.copy(cam.position);
 const cine=Math.max(hook?.6:0,seg(t,c.vest,c.vest+.4)*(1-seg(t,c.canta+.4,c.canta+1)),seg(t,c.pens,c.pens+.4)*(1-seg(t,c.campeones+.4,c.campeones+1)));
 FX.update(t,{cine,vig:Math.max(.45*seg(t,c.vest,c.vest+.4)*(1-seg(t,c.canta,c.canta+.5)),.35*seg(t,c.ultimo,c.ultimo+.4)*(1-seg(t,c.lapara,c.lapara+.3))),beams:champ?.16:.07,flash:champ?.24:(sing>.3?.15:(t>c.estambul&&t<c.descanso?.08:0))});
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
