// ================= HISTORIA 009: tú eres Nadia Comăneci (Montreal 1976) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const LOW={y:5.0,z:1.6}, HIGH={y:7.2,z:-1.6}, RH=2.1, MAT=.4;
// marcador de 7 segmentos
const SEGS={0:'abcdef',1:'bc',2:'abged',3:'abgcd',4:'fgbc',5:'afgcd',6:'afgedc',7:'abc',8:'abcdefg',9:'abfgcd','-':'g'};
function drawDigit(x,cx,cy,w,h,ch,on){const t=w*.18; const P={a:[cx-w/2+t,cy-h/2,w-2*t,t],d:[cx-w/2+t,cy+h/2-t,w-2*t,t],g:[cx-w/2+t,cy-t/2,w-2*t,t],f:[cx-w/2,cy-h/2+t,t,h/2-t*1.5],b:[cx+w/2-t,cy-h/2+t,t,h/2-t*1.5],e:[cx-w/2,cy+t/2,t,h/2-t*1.5],c:[cx+w/2-t,cy+t/2,t,h/2-t*1.5]};
 for(const k in P){const lit=on&&(SEGS[ch]||'').includes(k); x.fillStyle=lit?'#ffb21a':'#2a2016'; x.fillRect(...P[k]);}}
function boardDraw(x,w,h,str,hl){x.fillStyle='#07080c';x.fillRect(0,0,w,h);x.strokeStyle='#3a3f4a';x.lineWidth=14;x.strokeRect(7,7,w-14,h-14);
 x.fillStyle='#e8e0d0';x.font='900 64px Nunito, sans-serif';x.textAlign='left';x.fillText('COMĂNECI',50,95);x.textAlign='right';x.fillText('ROU',w-50,95);
 x.fillStyle='#8a8f9c';x.font='800 34px Nunito, sans-serif';x.textAlign='center';x.fillText('BARRAS ASIMÉTRICAS',w/2,145);
 const slots=[[w*.3,'d0'],[w*.5,'d1'],[w*.7,'d2']]; const ch=[str[0],str[2],str[3]]; const on=[str[0]!==' ',str[2]!==' ',str[3]!==' '];
 slots.forEach((s,i)=>{if(hl===i){x.strokeStyle='#3fb8ff';x.lineWidth=8;x.strokeRect(s[0]-95,175,190,300);} drawDigit(x,s[0],325,150,260,ch[i]===' '?'8':ch[i],on[i]);});
 x.fillStyle=str[1]==='.'?'#ffb21a':'#2a2016'; x.beginPath(); x.arc(w*.4,450,18,0,7); x.fill();}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 const pod=new THREE.Mesh(new THREE.BoxGeometry(34,.4,30),M(0x1f4fa8,{roughness:.9})); pod.position.set(0,.2,0); W0.add(pod);
 const mat=new THREE.Mesh(new RoundedBoxGeometry(8,.5,14,3,.15),M(0x3a5fc0,{roughness:.9})); mat.position.set(0,.45,-1); W0.add(mat);
 // barras asimétricas
 const steel=M(0xd9dde6,{metalness:.7,roughness:.3}), wood=M(0xe8d2a8,{roughness:.5});
 [[LOW,5.2],[HIGH,5.2]].forEach(([B,hw])=>{const bar=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,hw*2,16),wood); bar.rotation.z=Math.PI/2; bar.position.set(0,B.y,B.z); W0.add(bar);
  for(const x of [-hw,hw]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.13,.16,B.y,12),steel); p.position.set(x,B.y/2,B.z); W0.add(p);
   for(const s of [-1,1]){const cab=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,Math.hypot(B.y,3),6),steel); cab.position.set(x+s*1.5,B.y/2,B.z); cab.rotation.z=-s*Math.atan2(3,B.y); W0.add(cab);}}});
 // gradas con público
 const tierM=new THREE.MeshStandardMaterial({color:0x22262f,roughness:.8,side:THREE.DoubleSide}); const pos=[],cols=[]; const cc0=[0xd9d2c4,0xff4f4f,0x3fb8ff,0xffc21a,0x7a7f8c,0x5a5f6b,0xffffff,0x2e7d32];
 for(let i=0;i<7;i++){const r=24+i*3; const t=new THREE.Mesh(new THREE.CylinderGeometry(r+3,r,2.6,96,1,true,Math.PI*.15,Math.PI*1.7),tierM); t.position.y=1.3+i*2.6; t.rotation.y=Math.PI; W0.add(t);
  const n=Math.floor(Math.PI*1.7*(r+1.5)/1.15); for(let k=0;k<n;k++){const a=Math.PI+Math.PI*.15+k/n*Math.PI*1.7; pos.push([Math.sin(a)*(r+1.7),2.6+i*2.6,Math.cos(a)*(r+1.7),a,i]); cols.push(cc0[Math.floor(rnd()*cc0.length)]);}}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.55,1.1,.8),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); ST.cpos=pos; ST.crowd=im; const cc=new THREE.Color(); pos.forEach((p,k)=>im.setColorAt(k,cc.setHex(cols[k]))); W0.add(im);
 // marcador
 const bc=document.createElement('canvas'); bc.width=1024; bc.height=512; ST.bctx=bc.getContext('2d'); ST.btex=new THREE.CanvasTexture(bc); ST.btex.colorSpace=THREE.SRGBColorSpace; ST.bkey='';
 const bframe=new THREE.Mesh(new THREE.BoxGeometry(15,7.8,.8),M(0x30343c,{metalness:.5})); bframe.position.set(0,13,-16); bframe.scale.set(.7,.7,1); W0.add(bframe);
 ST.board=new THREE.Mesh(new THREE.PlaneGeometry(14,7),new THREE.MeshBasicMaterial({map:ST.btex})); ST.board.position.set(0,13,-15.55); ST.board.scale.set(.7,.7,1); W0.add(ST.board);
 for(const x of [-6,6]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,9.5,10),M(0x30343c)); p.position.set(x,4.75,-16.2); W0.add(p);}
 // jueces
 const tbl=new THREE.Mesh(new THREE.BoxGeometry(9,2,1.8),M(0x2a3a5a)); tbl.position.set(-9,1.4,9); W0.add(tbl);
 const card10=()=>new THREE.Mesh(new THREE.PlaneGeometry(.9,.65),new THREE.MeshBasicMaterial({map:canvasTex(128,96,(x,w,hh)=>{x.fillStyle='#fff';x.fillRect(0,0,w,hh);x.fillStyle='#111';x.font='900 70px Nunito';x.textAlign='center';x.fillText('10',w/2,74);}),side:THREE.DoubleSide}));
 ST.judges=[0,1,2,3].map(i=>{const h=human([0x9aa3b5,0x7a8090,0xb0b6c2,0x8a8f9c][i],1.4); h.position.set(-12.3+i*2.2,-.2,10.4); h.rotation.y=Math.PI; h.userData.lL.rotation.x=-1.4; h.userData.lR.rotation.x=-1.4;
  const card=card10(); card.position.set(0,-1.0,.1); h.userData.aR.add(card); W0.add(h); return h;});
 // tú
 ST.J=new THREE.Group(); ST.J.rotation.order='YXZ'; ST.h=human(0xff9a4a,1.6); ST.h.position.y=0; ST.J.add(ST.h); W0.add(ST.J); ST.head=ST.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 const bun=new THREE.Mesh(new THREE.SphereGeometry(.13,12,8),M(0x5a3a22)); bun.position.set(0,2.62,-.22); ST.h.add(bun);
 ST.medals=[0,1,2].map(i=>{const g=new THREE.Group(); const md=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.05,24),goldM); md.rotation.x=Math.PI/2; md.position.set((i-1)*.3,1.7-Math.abs(i-1)*.08,.38); g.add(md);
  const rb=new THREE.Mesh(new THREE.BoxGeometry(.05,.5,.03),M(0x2a62d8)); rb.position.set((i-1)*.3,1.98,.35); g.add(rb); ST.h.add(g); return g;});
 ST.tens=[0,1,2,3,4,5,6].map(i=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1),new THREE.MeshBasicMaterial({map:canvasTex(160,112,(x,w,h)=>{x.fillStyle='#ffd23f';x.fillRect(0,0,w,h);x.fillStyle='#111';x.font='900 84px Nunito';x.textAlign='center';x.fillText('10',w/2,86);}),side:THREE.DoubleSide})); W0.add(m); return m;});
 ST.qs=[]; for(let i=0;i<8;i++){const q=await icon3D('help-circle',0xffd23f,1.3,{depth:3}); q.userData={a:Math.PI+.5+i*.3,r:27+(i%3)*3,y:6+(i%3)*2.6}; W0.add(q); ST.qs.push(q);}
 ST.fact=await icon3D('factory',0x8a8f9c,1.6,{depth:3}); W0.add(ST.fact); ST.horn=await icon3D('bullhorn',0x3fb8ff,1.6,{depth:3}); W0.add(ST.horn);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.2,{depth:2}); b.userData={x:(rnd()-.5)*10,y:5+rnd()*5,z:(rnd()-.5)*5,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; setupFX(); window.popsReady=true;};

function setupFX(){const c=TL.cues, W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 FX.burst('dust',W([0,.8,-7.2]),c.clavas,70); FX.ring(W([0,.5,-7.2]),c.clavas,0xffffff,7,.7);
 FX.burst('dust',W([0,.8,-7.2]),2.0,40); FX.ring(W([0,13,-15.4]),c.uno1,0xffb21a,6,.7,new THREE.Vector3(0,0,1));
 FX.ring(W([0,13,-15.4]),c.d0b,0xffb21a,8,.8,new THREE.Vector3(0,0,1)); FX.burst('sparks',W([0,13,-15]),c.d0b,80,[0xffb21a,0xffffff],1);
 FX.burst('confetti',W([0,16,-6]),c.esdiez,260,undefined,1.4); FX.burst('confetti',W([-6,15,-3]),c.esdiez+.15,150); FX.burst('confetti',W([6,15,-3]),c.esdiez+.3,150); FX.burst('sparks',W([0,13,-15]),c.esdiez,120,[0xffd23f,0xffffff,0xff4fd8],1.4);
 [[-14,26,-10],[14,26,-10],[-12,26,10],[12,26,10]].forEach((p,i)=>FX.beam(W(p),0xfff2d0,40,i*1.7));
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
// ---- el ejercicio como línea de tiempo propia (T): [T, y, z, rx, brazos(0 abajo..1 arriba), piernas(0..1 carpado)]
let RT=null;
const hang=(B,th,arms=1,pk=0)=>[B.y-RH*Math.cos(th),B.z-RH*Math.sin(th),th,arms,pk];
function buildRoutine(){const K=[]; const add=(T,v)=>K.push([T,...v]); const ST0=[MAT+2.4,5.5,0,.9,0];
 add(11.0,ST0); add(12.16,[MAT+2.4,5.5,0,.15,0]); add(12.5,[MAT+2.4,4.4,.1,.6,0]); add(12.75,[MAT+3.4,3.6,-.4,1,.3]); add(13.0,hang(LOW,-.8));
 const c0=-.8,c1=2*Math.PI-.8+.3; for(let i=1;i<=14;i++){const f=i/14; add(13.0+f*1.15,hang(LOW,lerp(c0,c1,f),1,.3*Math.sin(f*Math.PI)));}
 const rel=hang(LOW,c1); const cat=hang(HIGH,-.9+2*Math.PI); // vuela a la alta
 for(let i=1;i<=5;i++){const f=i/5; const y=lerp(rel[0],cat[0],f)+Math.sin(f*Math.PI)*1.6, z=lerp(rel[1],cat[1],f); add(14.15+f*.45,[y,z,lerp(c1,-.9+2*Math.PI,f),1,.6*Math.sin(f*Math.PI)]);}
 const h0=-.9+2*Math.PI, h1=3.4+2*Math.PI; for(let i=1;i<=8;i++){const f=i/8; add(14.6+f*.44,hang(HIGH,lerp(h0,h1,f)));}
 const r1=hang(HIGH,h1); for(let i=1;i<=6;i++){const f=i/6; add(15.04+f*.7,[r1[0]+Math.sin(f*Math.PI)*2.4,r1[1]-Math.sin(f*Math.PI)*.4,h1+f*2*Math.PI,1-.4*Math.sin(f*Math.PI),.9*Math.sin(f*Math.PI)]);}
 const g0=h1+2*Math.PI, g1=4*Math.PI+.9+2*Math.PI; for(let i=1;i<=12;i++){const f=i/12; add(15.74+f*1.06,hang(HIGH,lerp(g0,g1,f)));}
 const d0=hang(HIGH,g1), land=[MAT+2.2,-7.2,10*Math.PI,.5,.5]; for(let i=1;i<=8;i++){const f=i/8; add(16.8+f*.9,[lerp(d0[0],land[0],f)+Math.sin(f*Math.PI)*3.2,lerp(d0[1],land[1],f),lerp(g1,10*Math.PI,eio(f)),lerp(1,.4,f),.8*Math.sin(f*Math.PI)]);}
 add(17.95,[MAT+2.4,-7.2,10*Math.PI,.95,0]); add(19.0,[MAT+2.4,-7.2,10*Math.PI,.95,0]); add(19.6,[MAT+2.4,-7.2,10*Math.PI,.05,0]);
 return K;}
const BIG=[["","uno1","<span style=\"font-size:120px\">EJERCICIO PERFECTO</span>"],["unq","montreal","¿UN 1?"],["montreal","eres","<span style=\"font-size:130px\">MONTREAL 1976</span>"],["eres","toca","<span style=\"font-size:120px\">NADIA COMĂNECI</span><small>Rumanía · 14 años</small>"],
 ["toca","respira","<span style=\"font-size:120px\">BARRA ASIMÉTRICA</span>"],["clavas","jueces","¡PERFECTO!"],["diez","nadie","10<small>la nota perfecta</small>"],["nadie","pero","PRIMER 10<small>en unos Juegos Olímpicos</small>"],["pero","fabricante","1 CIFRA<small>antes de la coma</small>"],
 ["fabricante","asi","<span style=\"font-size:110px\">«UN 10 ES IMPOSIBLE»</span>"],["esdiez","repites","ES UN 10"],["repites","imagina","7 DIECES<small>y 3 oros</small>"],["imagina","leo","¿Y TÚ?"]];
window.render=(t)=>{const c=TL.cues; if(!RT) RT=buildRoutine(); const end=TL.end; const W0=ST.W;
 // tiempo del ejercicio: gancho, rebobinado, ejercicio real, rebobinado bajo la tarjeta y repetición acelerada (bucle)
 const TAU=[[0,16.95],[2.6,18.6],[c.espera,18.6],[c.montreal,11.0],[c.saltas-.6,12.16],[c.saltas,12.75],[c.saltas+.3,13.0],[c.giras,13.05],[c.vuelas,14.15],[c.vuelas+.45,14.6],[c.sueltas,15.04],[c.coger,15.74],[c.ultima,16.8],[c.clavas,17.7],[c.clavas+.45,17.95],[c.publico+1.0,19.0],[c.publico+1.6,19.6],[c.pillas,19.6],[c.loop,11.0],[end,16.95]];
 const tau=kfl(TAU,t)[0];
 const [py,pz,rx,ar,pk]=kfl(RT,tau); ST.J.position.set(0,py,pz); ST.J.rotation.set(rx,Math.PI,0);
 // el cuerpo se pivota en el centro: el muñeco va desplazado para que el centro sea el de la cadera
 ST.h.position.y=-2.4; const U=ST.h.userData; const standing=Math.abs(py-(MAT+2.4))<.05&&(tau<12.4||tau>17.9);
 U.aL.rotation.x=U.aR.rotation.x=-Math.PI*ar; U.lL.rotation.x=U.lR.rotation.x=-1.3*pk;
 if(tau<12.16&&tau>11.05&&t>c.toca-1.5){U.aR.rotation.x=-2.7; U.aL.rotation.x=-.1;} // saludo
 const conf=seg(t,c.unq-.1,c.unq+.3)*(1-seg(t,c.espera,c.espera+.3))+seg(t,c.nada,c.nada+.4)*(1-seg(t,c.anuncian,c.anuncian+.4)); ST.head.rotation.z=.35*conf;
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)?.15:1,1));
 // público: se pone en pie y salta
 const cheer=seg(t,c.publico-.2,c.publico+.4)*(1-seg(t,c.jueces+.5,c.jueces+1.5))+seg(t,c.esdiez,c.esdiez+.4)*(1-seg(t,c.imagina,c.imagina+1));
 const dm=new THREE.Object3D(); ST.cpos.forEach((p,k)=>{dm.position.set(p[0],p[1]+(cheer>0?Math.abs(Math.sin(t*9+k))*.5*cheer:0),p[2]); dm.rotation.y=p[3]; dm.updateMatrix(); ST.crowd.setMatrixAt(k,dm.matrix);}); ST.crowd.instanceMatrix.needsUpdate=true;
 // jueces con el 10
 ST.judges.forEach((h,i)=>{const up=seg(t,c.diez-.2+i*.08,c.diez+.2+i*.08)*(1-seg(t,c.pero,c.pero+.5)); h.userData.aR.rotation.x=-2.7*up; h.userData.aR.children[1].visible=up>.05; h.children[1].rotation.y=Math.sin(t*2+i)*.2*(t>c.jueces&&t<c.diez?1:0);});
 // marcador
 let str='    ', hl=-1; if(t>=c.uno1&&t<c.espera+.3) str='1.00'; else if(t>=c.d1&&t<c.loop) str=(t>=c.d0b?'1.00':t>=c.d0a?'1.0 ':t>=c.dc?'1.  ':'1   ');
 if(t>=c.pero&&t<c.fabricante) hl=0; const bkey=str+hl; if(bkey!==ST.bkey){ST.bkey=bkey; boardDraw(ST.bctx,1024,512,str,hl); ST.btex.needsUpdate=true;}
 // medallas y dieces
 ST.medals.forEach((g,i)=>{const s=back(seg(t,c.oros+i*.15,c.oros+.4+i*.15))*(1-seg(t,c.pillas,c.loop)); g.visible=s>.01; g.scale.setScalar(Math.max(.01,s));});
 ST.tens.forEach((m,i)=>{const s=back(seg(t,c.siete+i*.1,c.siete+.4+i*.1))*(1-seg(t,c.imagina+.5,c.imagina+1)); m.visible=s>.01; const a=-1.2+i*.4; m.position.set(Math.sin(a)*4,5.5+Math.sin(t*2+i)*.2+(i%2)*1.2,-7.2+Math.cos(a)*4); m.scale.setScalar(Math.max(.01,s)*1.3);});
 // ---- CÁMARA [t, ángulo, distancia, altura, mirada x, y, z, peso hacia ti]
 const CK=[[0,1.35,20,.22,0,6.2,-1,.3],[c.uno1,.75,26,.18,0,9,-7,.2],[c.unq,.35,19,.2,0,8,-9,.3],[c.espera+.4,1.2,22,.25,0,6,-1,.3],[c.montreal,.4,26,.3,0,5.5,0,0],[c.eres,.25,13,.22,0,3.6,5.5,.8],
  [c.toca,.9,19,.25,0,5,0,.2],[c.respira,.3,24,.3,0,5,0,.1],[c.saltas-.3,1.2,17,.22,0,5.5,0,.3],[c.saltas,1.4,18,.2,0,6,-.5,.4],[c.sueltas,1.45,16,.12,0,8,-1,.6],[c.aire,1.55,13,.02,0,9.5,-1.2,.8],[c.coger,1.35,17,.15,0,7,-1.5,.5],[c.ultima,1.2,18,.18,0,6,-3,.5],[c.clavas,.9,12,.1,0,4,-7,.9],[c.publico,.5,22,.3,0,6,-6,.5],[c.jueces,3.3,13,.2,-9,3.4,9.8,0],[c.diez,3.25,9.5,.18,-9,4.2,9.8,0],[c.diez+.6,3.2,9.5,.18,-9,4.2,9.8,0],
  [c.perfecta+.5,.25,14,.22,0,4.5,-7,.9],[c.nadie,.5,24,.22,0,7,-6,.3],[c.pero,0,20,.08,0,13,-15,0],[c.asi,0,17.5,.05,0,13,-15,0],[c.d0b+.5,0,18,.05,0,13,-15,0],[c.nada,.9,28,.28,0,7,-5,.2],
  [c.tampoco,.25,11,.22,0,4.2,-7.2,1],[c.anuncian,.1,23,.12,0,12.5,-12,0],[c.repites,.3,15,.24,0,5.5,-7.2,1],[c.imagina,.5,17,.25,0,5.5,-7.2,1],[c.leo+1,.6,18,.28,0,6,-7,1],
  [c.pillas,.9,20,.25,0,6,-3,.4],[c.loop,1.4,20,.22,0,6,-1,.35],[end-.2,1.35,20,.22,0,6.2,-1,.3],[1e9,1.35,20,.22,0,6.2,-1,.3]];
 const [ca,cd,chh,lx,ly,lz,cw]=kf(CK,t); const T=new THREE.Vector3(lx,ly,lz).lerp(new THREE.Vector3(0,py+1,pz),cw); const Lw=ROOM.clone().add(T);
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd));
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.5) pkk=Math.max(pkk,Math.exp(-dd*7));});
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*pkk*.3; cam.position.y+=Math.cos(t*61)*pkk*.3; cam.lookAt(Lw); cam.near=.1; cam.fov=50-pkk*3; cam.updateProjectionMatrix();
 ST.tens.forEach(m=>m.lookAt(cam.position));
 ST.qs.forEach((q,i)=>{const s=back(seg(t,c.nada+i*.06,c.nada+.4+i*.06))*(1-seg(t,c.anuncian,c.anuncian+.4)); q.visible=s>.01; if(!q.visible) return; const u=q.userData; q.position.set(Math.sin(u.a)*u.r,u.y+Math.sin(t*3+i)*.3,Math.cos(u.a)*u.r); q.scale.setScalar(1.3*s); q.lookAt(cam.position);});
 const fv=seg(t,c.fabricante,c.fabricante+.4)*(1-seg(t,c.asi,c.asi+.4)); ST.fact.visible=fv>.01; if(fv>.01){ST.fact.position.set(-3.6,17.6,-15); ST.fact.scale.setScalar(1.6*back(fv)); ST.fact.lookAt(cam.position);}
 const hv=seg(t,c.anuncian,c.anuncian+.4)*(1-seg(t,c.repites,c.repites+.4)); ST.horn.visible=hv>.01; if(hv>.01){ST.horn.position.set(3.6,17.6,-15); ST.horn.scale.setScalar(1.6*back(hv)*(1+Math.abs(Math.sin(t*10))*.08)); ST.horn.lookAt(cam.position);}
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.2); b.position.set(q.x,q.y+Math.sin(t*2+q.ph)*.3,-7.2+q.z); b.lookAt(cam.position);});
 const kb=new THREE.Vector3(Lw.x,0,Lw.z); key.position.set(kb.x+8,30,kb.z+16); keyT.position.set(kb.x,3,kb.z); fill.position.set(kb.x-16,12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,6,kb.z-6);
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true;
 sky.position.copy(cam.position);
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.4; document.getElementById('flash').style.opacity=0;
 const cine=Math.max(seg(t,c.vuelas,c.vuelas+.4)*(1-seg(t,c.publico+.8,c.publico+1.4)),seg(t,c.asi,c.asi+.4)*(1-seg(t,c.d0b+.6,c.d0b+1.2)),seg(t,c.esdiez-.2,c.esdiez+.2)*(1-seg(t,c.oros+.6,c.oros+1.2)),t<2.8?.8*(1-seg(t,2.2,2.8)):0);
 FX.update(t,{cine,vig:.45*seg(t,c.respira,c.respira+.6)*(1-seg(t,c.saltas,c.saltas+.4))+.4*seg(t,c.nada,c.nada+.4)*(1-seg(t,c.anuncian,c.anuncian+.4)),beams:(t>c.respira&&t<c.jueces)||(t>c.esdiez-.2&&t<c.imagina)?.12:.04,flash:(t>c.clavas&&t<c.jueces)||(t>c.esdiez&&t<c.imagina)?.2:(t<2.6?.1:0)});
 C.render();
 const bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); document.getElementById('big').innerHTML=bg?bg[2]:''; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
