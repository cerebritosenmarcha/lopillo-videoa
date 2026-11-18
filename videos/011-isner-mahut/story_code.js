// ================= HISTORIA 011: tú eres John Isner (Wimbledon 2010) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const CL=28, CW=11; // pista estilizada (largo, ancho)
function courtTex(){return canvasTex(512,1024,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h); x.fillStyle='#3f8a3a'; x.fillRect(0,0,w,h);
 for(let i=0;i<12;i++){x.fillStyle=i%2?'#4a9a42':'#3a8034'; x.fillRect(0,i*h/12,w,h/12);} x.strokeStyle='#f4f4ee'; x.lineWidth=8; const m=40;
 x.strokeRect(m,m,w-2*m,h-2*m); const sx=m+(w-2*m)*.125; x.beginPath(); x.moveTo(sx,m); x.lineTo(sx,h-m); x.moveTo(w-sx,m); x.lineTo(w-sx,h-m);
 const sy=m+(h-2*m)*.23; x.moveTo(sx,sy); x.lineTo(w-sx,sy); x.moveTo(sx,h-sy); x.lineTo(w-sx,h-sy); x.moveTo(w/2,sy); x.lineTo(w/2,h-sy); x.stroke();
 x.fillStyle='#c9b98a'; x.globalAlpha=.35; x.beginPath(); x.ellipse(w/2,m+20,90,26,0,0,7); x.ellipse(w/2,h-m-20,90,26,0,0,7); x.fill(); x.globalAlpha=1;});}
function boardDraw(x,w,h,a,b,mode){x.fillStyle='#0a3a26';x.fillRect(0,0,w,h);x.strokeStyle='#1d5a3a';x.lineWidth=14;x.strokeRect(7,7,w-14,h-14);
 if(mode==='off'){x.fillStyle='#020302';x.fillRect(20,20,w-40,h-40);return;}
 x.fillStyle='#e8e0c8';x.font='900 70px Nunito, sans-serif';x.textAlign='left';x.fillText('ISNER',40,140);x.fillText('MAHUT',40,300);
 x.fillStyle=mode==='glitch'?'#ff5a3a':'#ffd23f';x.font='900 120px Nunito, sans-serif';x.textAlign='right';x.fillText(a,w-40,150);x.fillText(b,w-40,310);
 x.fillStyle='#9ab8a0';x.font='800 34px Nunito, sans-serif';x.textAlign='center';x.fillText(mode==='sets'?'SETS':'5.º SET · JUEGOS',w/2,375);
 if(mode==='glitch'){for(let i=0;i<40;i++){x.fillStyle=['#000','#ff5a3a','#ffd23f'][i%3];x.fillRect(Math.random()*w,Math.random()*h,Math.random()*120,6);}}}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 const surround=new THREE.Mesh(new THREE.PlaneGeometry(60,70),M(0x2f6a2c,{roughness:1})); surround.rotation.x=-Math.PI/2; surround.position.y=.02; W0.add(surround);
 const court=new THREE.Mesh(new THREE.PlaneGeometry(CW+5,CL+8),new THREE.MeshStandardMaterial({map:courtTex(),roughness:.95})); court.rotation.x=-Math.PI/2; court.position.y=.03; W0.add(court);
 const net=new THREE.Mesh(new THREE.PlaneGeometry(CW+3,1.6),new THREE.MeshStandardMaterial({color:0x111111,transparent:true,opacity:.75,side:THREE.DoubleSide})); net.position.set(0,.8,0); W0.add(net);
 const tape=new THREE.Mesh(new THREE.BoxGeometry(CW+3,.12,.06),M(0xffffff)); tape.position.set(0,1.62,0); W0.add(tape);
 for(const x of [-(CW+3)/2,(CW+3)/2]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,1.8,8),M(0x1d4a2a)); p.position.set(x,.9,0); W0.add(p);}
 // gradas laterales
 const pos=[]; const cs=[0xd9d2c4,0xffffff,0x6b5a8a,0x2e7d32,0xe8e0d0,0x3fb8ff,0xffc21a];
 for(const s of [-1,1]){for(let r=0;r<4;r++){const st=new THREE.Mesh(new THREE.BoxGeometry(2.4,1+r*1.1,30),M(0x2f5a3a)); st.position.set(s*(12+r*2.4),(1+r*1.1)/2,0); W0.add(st); for(let k=0;k<20;k++) pos.push([s*(12+r*2.4),1.6+r*1.1,-14+k*1.5,s]);}}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.6,1.1,.6),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const dm=new THREE.Object3D(), cc=new THREE.Color(); ST.cpos=pos; ST.crowd=im;
 pos.forEach((p,k)=>im.setColorAt(k,cc.setHex(cs[k%7]))); W0.add(im);
 // marcador electrónico
 const bc=document.createElement('canvas'); bc.width=768; bc.height=420; ST.bctx=bc.getContext('2d'); ST.btex=new THREE.CanvasTexture(bc); ST.btex.colorSpace=THREE.SRGBColorSpace; ST.bkey='';
 ST.boardG=new THREE.Group(); ST.boardG.position.set(-10,0,7); ST.boardG.rotation.y=.55; W0.add(ST.boardG);
 const fr=new THREE.Mesh(new THREE.BoxGeometry(8.4,4.8,.6),M(0x1d2a22)); fr.position.y=7.5; ST.boardG.add(fr); const bd=new THREE.Mesh(new THREE.PlaneGeometry(7.8,4.27),new THREE.MeshBasicMaterial({map:ST.btex})); bd.position.set(0,7.5,.31); ST.boardG.add(bd);
 for(const x of [-3,3]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,5.2,8),M(0x1d2a22)); p.position.set(x,2.6,0); ST.boardG.add(p);}
 ST.sparks=[]; for(let i=0;i<24;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.07,6,4),new THREE.MeshBasicMaterial({color:0xffd23f})); s.userData={v:[(rnd()-.5)*4,2+rnd()*3,1+rnd()*2]}; s.visible=false; ST.boardG.add(s); ST.sparks.push(s);}
 ST.smoke=[]; for(let i=0;i<10;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.6,10,8),new THREE.MeshBasicMaterial({color:0x777777,transparent:true,opacity:.35,depthWrite:false})); s.visible=false; ST.boardG.add(s); ST.smoke.push(s);}
 // jugadores
 const mk=(col)=>{const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,1.6); h.position.y=-2.4; J.add(h); W0.add(J);
  const rk=new THREE.Group(); const hd=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.6,6),M(0x222222)); hd.position.y=-.3; rk.add(hd); const fr2=new THREE.Mesh(new THREE.TorusGeometry(.32,.04,6,20),M(0xdddddd)); fr2.scale.set(.8,1.1,1); fr2.position.y=-.9; rk.add(fr2);
  rk.position.set(0,-.65,0); h.userData.aR.add(rk); return {J,h};};
 ST.you=mk(0xff9a4a); ST.riv=mk(0x3fb8ff); ST.head=ST.you.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 const band=new THREE.Mesh(new THREE.TorusGeometry(.31,.05,6,20),M(0xffffff)); band.rotation.x=Math.PI/2; band.position.y=2.6; ST.you.h.add(band);
 ST.ball=new THREE.Mesh(new THREE.SphereGeometry(.18,14,10),new THREE.MeshStandardMaterial({color:0xd8f25a,emissive:0x8aa020,emissiveIntensity:.15})); W0.add(ST.ball);
 ST.skyT=new THREE.Mesh(new THREE.SphereGeometry(420,32,16),new THREE.MeshBasicMaterial({color:0x4a7fc0,transparent:true,opacity:.5,side:THREE.BackSide,depthWrite:false,fog:false})); S.add(ST.skyT);
 ST.sun=new THREE.Mesh(new THREE.SphereGeometry(5,24,12),new THREE.MeshBasicMaterial({color:0xffe38a,fog:false})); W0.add(ST.sun); ST.moon=new THREE.Mesh(new THREE.SphereGeometry(3.5,24,12),new THREE.MeshBasicMaterial({color:0xdfe6ff,fog:false})); W0.add(ST.moon);
 ST.hemi=new THREE.HemisphereLight(0xdfeaff,0x203018,.6); S.add(ST.hemi);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.2,{depth:2}); b.userData={x:(rnd()-.5)*10,y:4+rnd()*5,z:(rnd()-.5)*5,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); [ST.skyT,ST.sun,ST.moon].forEach(m=>m.castShadow=false); ST.crowd.castShadow=false; setupFX(); window.popsReady=true;};

function setupFX(){const c=TL.cues, W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init(); const bn=new THREE.Vector3(Math.sin(.55),0,Math.cos(.55));
 FX.ring(W([-9.84,7.5,7.26]),c.deja,0xff5a3a,6,.7,bn); FX.burst('sparks',W([-9.8,7.5,7.4]),c.deja,90,[0xffd23f,0xff5a3a,0xffffff],1.2);
 FX.ring(W([-9.84,7.5,7.26]),c.apaga,0xff5a3a,8,.8,bn); FX.burst('sparks',W([-9.8,7.5,7.4]),c.apaga,140,[0xffd23f,0xff5a3a,0xffffff],1.5);
 FX.burst('dust',W([-4.6,.3,-11.5]),c.s70,70,undefined,1.2); FX.ring(W([-4.6,.15,-11.5]),c.s70,0xffffff,8,.8); FX.burst('sparks',W([-4.6,.5,-11.5]),c.s70,60,[0xd8f25a,0xffffff],1);
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
let K=null;
function setupK(c){const end=TL.end;
 // luz del día: 1 = día, 0 = noche
 K={DAY:[[0,1],[c.forma,1],[c.wimbledon,1],[c.noche,1],[c.noche+.8,0],[c.dia2-.4,0],[c.dia2+.4,1],[c.c59+.6,1],[c.noche2+.2,0],[c.dia3-.2,0],[c.dia3+.5,1],[1e9,1]],
  RATE:[[0,1.2],[c.forma,1.2],[c.forma+.3,-3],[c.wimbledon-.2,-3],[c.wimbledon,1],[c.noche,1],[c.noche+.6,0],[c.dia2+.2,0],[c.dia2+.5,1],[c.diez-.3,1],[c.diez,3.2],[c.apaga,3.2],[c.apaga+.5,1.2],[c.noche2,1.2],[c.noche2+.5,0],[c.dia3+.3,0],[c.dia3+.6,.8],[c.c69,.8],[c.c69+.2,0],[c.loop-.3,0],[c.loop,1.2],[end,1.2]],
  G:[[0,46],[1.25,47],[c.forma,47],[c.wimbledon,0],[c.dia2,0],[c.diez,10],[c.treinta,30],[c.c47,47],[c.apaga+.3,47],[c.c59,59],[c.c69,69],[c.s70,70],[c.pillas,70],[c.loop,46],[end,46]]};
 // integra la fase del peloteo
 K.PH=[]; let ph=0; const dt=1/60; for(let tt=0;tt<=end+.1;tt+=dt){K.PH.push(ph); ph+=kfl(K.RATE,tt)[0]*dt*.62;} K.PH0=K.PH[0];}
const phaseAt=t=>{const i=Math.max(0,Math.min(K.PH.length-1,Math.floor(t*60))); return K.PH[i];};
const BIG=[["deja","forma","<span style=\"font-size:120px\">¡SE APAGA!</span>"],["forma","wimbledon","<span style=\"font-size:110px\">QUÉDATE AL FINAL</span><small>el último punto es de locos</small>"],
 ["wimbledon","eres","<span style=\"font-size:120px\">WIMBLEDON 2010</span><small>pista 18 · primera ronda</small>"],["eres","empatais","<span style=\"font-size:120px\">ISNER – MAHUT</span>"],["empatais","noche","2 – 2<small>en sets</small>"],
 ["noche","entonces","<span style=\"font-size:120px\">SE HACE DE NOCHE</span><small>se sigue mañana</small>"],["muerte","dia2","<span style=\"font-size:110px\">SIN MUERTE SÚBITA</span><small>hay que ganar por 2 juegos</small>"],["dia2","ninguno","DÍA 2"],["ninguno","diez","NADIE FALLA"],
 ["apaga","programado","<span style=\"font-size:120px\">¡SE APAGA!</span>"],["programado","c59","<span style=\"font-size:100px\">NO SABÍA CONTAR TANTO</span>"],["noche2","dia3","<span style=\"font-size:120px\">OTRA VEZ DE NOCHE</span>"],["dia3","abarrotada","DÍA 3"],
 ["abarrotada","c69","PISTA 18<small>abarrotada</small>"],["quinta","red","<span style=\"font-size:110px\">BOLA DE PARTIDO</span><small>la quinta</small>"],["reves","s70","<span style=\"font-size:110px\">¡REVÉS PARALELO!</span>"],["s70","once","70 – 68"],
 ["once","c183","11 h 5 min"],["c183","solo","183 JUEGOS"],["solo","pregunta","+8 HORAS<small>solo el quinto set</small>"],["pregunta","leo","¿Y TÚ?"]];
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 const day=kfl(K.DAY,t)[0]; const G=Math.round(kfl(K.G,t)[0]);
 // cielo, sol y luna
 ST.skyT.material.opacity=.55*day; ST.skyT.position.copy(cam.position); ST.hemi.intensity=.25+.5*day; key.intensity=150*(.35+.65*day); fill.intensity=80*(.3+.7*day);
 ST.sun.visible=day>.05; ST.sun.position.set(-30,lerp(-10,40,day),-60); ST.moon.visible=day<.95; ST.moon.position.set(30,lerp(40,-10,day),-60);
 // peloteo: la pelota va y viene; los jugadores la siguen
 const ph=phaseAt(t); const half=Math.floor(ph), f=ph-half; const toFar=half%2===0; const zA=toFar?CL/2-1.5:-(CL/2-1.5), zB=-zA;
 const bx=Math.sin(half*2.3)*3.2, bx2=Math.sin((half+1)*2.3)*3.2; const rally=Math.abs(kfl(K.RATE,t)[0])>.05;
 const ballP=new THREE.Vector3(lerp(bx,bx2,f),1.2+Math.sin(f*Math.PI)*4.5-(f>.7?Math.sin((f-.7)/.3*Math.PI)*1.2:0),lerp(zA,zB,f));
 ST.ball.position.copy(ballP); ST.ball.visible=rally||t<c.ganado;
 const tired=cl((t-c.dia2)/20)*(t<c.pillas?1:0); const rp=(sk,side,targetX,hitPh)=>{const J=sk.J, U2=sk.h.userData; const z=side*(CL/2+.5);
  J.position.set(lerp(J.position.x||0,targetX,.25),2.4,z); J.rotation.set(.1+.25*tired,side>0?Math.PI:0,0); const sw=Math.max(0,1-Math.abs(hitPh)*4);
  U2.aR.rotation.x=-1.2-1.4*sw*(rally?1:0); U2.aR.rotation.z=-.4; U2.aL.rotation.x=-.3; const st=Math.sin(t*9)*.3*(rally?1:0); U2.lL.rotation.x=st; U2.lR.rotation.x=-st;};
 const myHit=toFar?f:1-f; const rvHit=toFar?1-f:f;
 rp(ST.you,1,toFar?bx:bx2,myHit-0.02); rp(ST.riv,-1,toFar?bx2:bx,rvHit-0.02);
 if(!rally){ST.you.h.userData.aR.rotation.x=-.3; ST.riv.h.userData.aR.rotation.x=-.3;}
 // ---- el último punto (coreografía): saque, resto, Mahut sube a la red y revés paralelo a cámara lenta
 if(t>=c.c69+.2&&t<c.ganado+.6){const T0=c.saca,T1=T0+.8,T2=c.quinta+.5,T3=c.reves,T4=c.s70;
  const arc=(p0,p1,h,u)=>new THREE.Vector3(lerp(p0[0],p1[0],u),lerp(p0[1],p1[1],u)+Math.sin(u*Math.PI)*h,lerp(p0[2],p1[2],u));
  let bp; if(t<T0) bp=new THREE.Vector3(-1.5,2.6+Math.abs(Math.sin(t*4))*.6,-14.6); else if(t<T1) bp=arc([-1.5,4.6,-14.6],[1.6,1.2,13.6],1.2,seg(t,T0,T1));
  else if(t<T2) bp=arc([1.6,1.2,13.6],[-.5,1.2,-13.6],4,seg(t,T1,T2)); else if(t<T3) bp=arc([-.5,1.2,-13.6],[-3.8,1.2,13.4],2.6,seg(t,T2,T3));
  else if(t<T4) bp=arc([-3.8,1.2,13.4],[-4.6,.12,-11.5],1.0,seg(t,T3,T4)); else bp=arc([-4.6,.12,-11.5],[-5,.6,-17],.8,seg(t,T4,T4+.7));
  ST.ball.position.copy(bp); ST.ball.visible=true;
  const yx=t<T1?lerp(0,1.6,seg(t,c.c69,T1)):lerp(1.6,-3.8,eio(seg(t,T1+.2,T3-.1))); ST.you.J.position.x=yx;
  const yU=ST.you.h.userData; const sw1=Math.max(0,1-Math.abs(t-T1)*4), sw3=Math.max(0,1-Math.abs(t-T3)*3); yU.aR.rotation.x=-1.0-1.3*sw1-.6*sw3; yU.aR.rotation.z=-.4+1.6*sw3; yU.aL.rotation.x=-.4-1.0*sw3;
  ST.you.J.rotation.y=Math.PI+.7*sw3; const runY=t>T1+.2&&t<T3; yU.lL.rotation.x=runY?Math.sin(t*14)*.6:0; yU.lR.rotation.x=-yU.lL.rotation.x;
  const mJ=ST.riv.J, mU=ST.riv.h.userData; const toNet=eio(seg(t,T2,T3+.3)); mJ.position.set(lerp(-1.5,-1,toNet),2.4,lerp(-14.5,-4.2,toNet));
  const lunge=seg(t,T3+.5,T3+1.0); mJ.position.x=lerp(mJ.position.x,-3.4,lunge); mJ.rotation.set(.1,0,-.7*lunge); mJ.position.y=2.4-.5*lunge;
  mU.aR.rotation.x=t<T0+.3?-2.9*Math.max(0,1-Math.abs(t-T0)*3):(-1.2-1.2*Math.max(0,1-Math.abs(t-T2)*4)); mU.aR.rotation.z=-.4-1.2*lunge; const runM=t>T2&&t<T3+.3; mU.lL.rotation.x=runM?Math.sin(t*14)*.6:0; mU.lR.rotation.x=-mU.lL.rotation.x;}
 // celebración: caes de espaldas en la hierba
 const cel=seg(t,c.ganado-.2,c.ganado+.5)*(1-seg(t,c.pillas,c.loop-.3)); if(cel>0){const J=ST.you.J; J.position.y=lerp(2.4,.6,eio(cel)); J.rotation.x=lerp(.1,-Math.PI/2,eio(cel)); const U2=ST.you.h.userData; U2.aL.rotation.x=U2.aR.rotation.x=-2.9*cel;
  ST.riv.J.rotation.x=.5*cel; ST.riv.h.children[1].rotation.x=.4*cel;}
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)?.15:1,1));
 // público: aplaude al final
 const cheer=Math.max(seg(t,c.s70,c.s70+.4)*(1-seg(t,c.solo,c.solo+1)),.25*seg(t,c.abarrotada,c.abarrotada+.5)*(1-seg(t,c.c69,c.c69+.5))); const dm=new THREE.Object3D(); ST.cpos.forEach((p,k)=>{dm.position.set(p[0],p[1]+(cheer>0?Math.abs(Math.sin(t*9+k))*.5*cheer:0),p[2]); dm.rotation.y=p[3]>0?-Math.PI/2:Math.PI/2; dm.updateMatrix(); ST.crowd.setMatrixAt(k,dm.matrix);}); ST.crowd.instanceMatrix.needsUpdate=true;
 // marcador
 let mode='games', a=String(G), b=String(G>=70?68:G); if(t<c.deja){mode='games';} else if(t<c.forma+.3) mode=t<c.deja+.5?'glitch':'off';
 if(t>=c.wimbledon&&t<c.quinto){mode='sets'; a='2'; b='2';} if(t>=c.c47+.4&&t<c.apaga) mode='glitch'; if(t>=c.apaga&&t<c.pillas+.3) mode='off'; if(t>=c.pillas+.3) {mode='games';}
 if(G>=69&&t<c.s70){a='69';b='68';}
 const bkey=mode+a+b+(mode==='glitch'?Math.floor(t*12):''); if(bkey!==ST.bkey){ST.bkey=bkey; boardDraw(ST.bctx,768,420,a,b,mode); ST.btex.needsUpdate=true;}
 const spk=(t>=c.deja&&t<c.deja+1.4)?t-c.deja:(t>=c.apaga&&t<c.apaga+1.6)?t-c.apaga:-1;
 ST.sparks.forEach((s,i)=>{s.visible=spk>=0&&spk<1.2; if(!s.visible) return; const v=s.userData.v; s.position.set(v[0]*spk,7.5+v[1]*spk-6*spk*spk,.4+v[2]*spk);});
 const smk=(t>=c.apaga&&t<c.c59)?t-c.apaga:(t>=c.deja&&t<c.forma+.3)?t-c.deja:-1; ST.smoke.forEach((s,i)=>{s.visible=smk>=0; if(!s.visible) return; const k=(smk*.5+i*.1)%1; s.position.set(Math.sin(i*2)*1.5,9.5+k*4,.2); s.scale.setScalar(.5+k*1.5); s.material.opacity=.35*(1-k);});
 // ---- CÁMARA [t, ángulo, distancia, altura, mirada x, y, z]
 const CK=[[0,-.3,19,.25,-4.5,5.5,11],[c.deja,-.35,17,.22,-5.5,6.2,10],[c.forma,-.3,22,.4,-3,4,-2],[c.wimbledon,0,30,.42,0,1.5,-3],[c.eres,.15,15,.22,0,3.2,13],[c.empatais,-.3,20,.28,-5,5.5,9],
  [c.noche,0,30,.42,0,1.5,-3],[c.entonces,.9,26,.3,0,2,0],[c.dia2,.05,30,.42,0,1.5,-3],[c.ninguno,.6,18,.2,0,2,0],[c.diez,-.3,20,.26,-5,5.5,10],[c.c47,-.4,16,.2,-6.5,6.5,9.5],[c.programado,-.45,15,.18,-7,6.8,9],
  [c.c59,0,30,.42,0,1.5,-3],[c.agotado,.2,11,.18,0,3,13.5],[c.dia3,.1,28,.4,0,1.5,-3],[c.abarrotada,.9,30,.35,8,4,0],[c.c69,0,24,.32,0,2,-2],[c.saca,.05,22,.3,0,2,-4],
  [c.red,.25,11,.16,-2.5,2.6,12],[c.reves,.35,9,.14,-3.6,2.6,12.5],[c.reves+.7,.25,10,.12,-3.8,2,9],[c.s70,.05,12,.2,-4.5,1,-9],[c.ganado,.35,13,.45,0,1,13.5],[c.once,.2,32,.65,0,1,0],
  [c.pregunta,.3,16,.35,0,2,12],[c.pillas,-.3,20,.28,-4,5,10],[c.loop,-.3,19,.25,-4.5,5.5,11],[end,-.3,19,.25,-4.5,5.5,11],[1e9,-.3,19,.25,-4.5,5.5,11]];
 const [ca,cd,chh,lx,ly,lz]=kf(CK,t); const Lw=ROOM.clone().add(new THREE.Vector3(lx,ly,lz)); const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd));
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.5) pkk=Math.max(pkk,Math.exp(-dd*7));});
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*pkk*.3; cam.position.y+=Math.cos(t*61)*pkk*.3; cam.lookAt(Lw); cam.near=.1; cam.fov=50-pkk*6-8*seg(t,c.quinta,c.reves)*(1-seg(t,c.s70,c.s70+.5)); cam.updateProjectionMatrix();
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.2); b.position.set(q.x,q.y+Math.sin(t*2+q.ph)*.3,12+q.z); b.lookAt(cam.position);});
 const kb=new THREE.Vector3(Lw.x,0,Lw.z); key.position.set(kb.x+8,30,kb.z+16); keyT.position.set(kb.x,3,kb.z); fill.position.set(kb.x-16,12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,6,kb.z-6);
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true;
 sky.position.copy(cam.position);
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.4; document.getElementById('flash').style.opacity=0;
 const fin=seg(t,c.c69,c.c69+.4)*(1-seg(t,c.solo+.4,c.solo+1));
 FX.update(t,{cine:Math.max(fin,t<c.forma?.8*(1-seg(t,c.forma-.4,c.forma)):0,seg(t,c.c47,c.c47+.3)*(1-seg(t,c.programado,c.programado+.5))),vig:Math.max(.5*seg(t,c.agotado-.3,c.agotado+.3)*(1-seg(t,c.dia3,c.dia3+.5)),.35*fin*(t<c.s70?1:0)),flash:(t>c.abarrotada&&t<c.c69)?.08:(t>c.s70&&t<c.solo)?.22:(t>c.reves&&t<c.s70?.12:0)});
 C.render();
 let bg=BIG.find(bb=>t>=(bb[0]?c[bb[0]]:0)&&t<c[bb[1]]); let bh=bg?bg[2]:'';
 if(!bg&&(t<c.deja||(t>=c.diez&&t<c.apaga)||(t>=c.c59&&t<c.noche2)||(t>=c.c69&&t<c.quinta))) bh=(G===69?'69 – 68':G+' – '+G);
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
