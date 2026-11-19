// ================= HISTORIA 010: tú eres Felix Baumgartner (Red Bull Stratos, 2012) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const U=h=>h<=1?20*h:20+(h-1)*3.5; const RE=1000, BASE=10;
function earthTex(){return canvasTex(2048,1024,(x,w,h)=>{x.fillStyle='#b38a5a';x.fillRect(0,0,w,h);
 for(let i=0;i<260;i++){x.fillStyle=['#9a7448','#c9a06a','#7a6a42','#8a9a5a','#a68050'][i%5];x.globalAlpha=.55;x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,20+Math.random()*120,10+Math.random()*60,Math.random()*3,0,7);x.fill();}
 x.globalAlpha=.85;x.fillStyle='#ffffff';for(let i=0;i<140;i++){x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,30+Math.random()*90,8+Math.random()*25,Math.random()*.5,0,7);x.fill();} x.globalAlpha=1;});}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0; floor.visible=false;
 ST.earth=new THREE.Mesh(new THREE.SphereGeometry(RE,128,64),new THREE.MeshStandardMaterial({map:earthTex(),roughness:.95,fog:false})); W0.add(ST.earth);
 ST.atmo=new THREE.Mesh(new THREE.SphereGeometry(RE+14,128,64),new THREE.MeshBasicMaterial({color:0x5aa8ff,transparent:true,opacity:.22,side:THREE.BackSide,depthWrite:false,fog:false})); W0.add(ST.atmo);
 ST.skyT=new THREE.Mesh(new THREE.SphereGeometry(420,32,16),new THREE.MeshBasicMaterial({color:0x2f5f9f,transparent:true,opacity:.6,side:THREE.BackSide,depthWrite:false,fog:false})); S.add(ST.skyT);
 ST.sunL=new THREE.DirectionalLight(0xfff2e0,1.5); ST.sunL.position.set(300,600,200); S.add(ST.sunL); S.add(ST.sunL.target);
 // plataforma de despegue (sobre la Tierra)
 ST.pad=new THREE.Group(); const padM=new THREE.Mesh(new THREE.CylinderGeometry(9,9,.3,48),M(0x6a6f7c,{roughness:.8})); padM.position.y=.15; ST.pad.add(padM);
 const trailer=new THREE.Mesh(new THREE.BoxGeometry(6,3,2.6),M(0xeeeeee)); trailer.position.set(-12,1.5,4); ST.pad.add(trailer); const tr2=new THREE.Mesh(new THREE.BoxGeometry(2.5,2.5,2.4),M(0x2a62d8)); tr2.position.set(-8,1.25,4); ST.pad.add(tr2);
 ST.crew=[0,1,2,3].map(i=>{const h=human([0x8a8f9c,0x3fb8ff,0xffc21a,0x7dff9a][i],1.2); h.position.set(-6+i*2.2,0,8); h.rotation.y=Math.PI; ST.pad.add(h); return h;});
 W0.add(ST.pad);
 // cápsula y globo
 ST.cap=new THREE.Group(); const shellM=M(0xdfe4ec,{metalness:.5,roughness:.3});
 const shell=new THREE.Mesh(new THREE.SphereGeometry(2.3,32,20,Math.PI/2+.55,Math.PI*2-1.1,0,Math.PI*.62),shellM); shell.position.y=0; ST.cap.add(shell);
 const base=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.1,.6,32),M(0x30343c,{metalness:.6})); base.position.y=-.3; ST.cap.add(base);
 const step=new THREE.Mesh(new THREE.BoxGeometry(1.4,.12,1.2),M(0xffd23f)); step.position.set(0,-.05,2.7); ST.cap.add(step);
 ST.door=new THREE.Mesh(new THREE.CylinderGeometry(2.32,2.32,2.6,24,1,true,-.55,1.1),M(0xcfd6e6,{metalness:.6,side:THREE.DoubleSide})); ST.door.position.y=1.3; ST.cap.add(ST.door);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(2.35,.12,8,40),M(0x30343c)); ring.rotation.x=Math.PI/2; ring.position.y=2.4; ST.cap.add(ring);
 ST.bal=new THREE.Mesh(new THREE.SphereGeometry(10,48,32),new THREE.MeshStandardMaterial({color:0xf2f4f8,roughness:.35,transparent:true,opacity:.88})); ST.cap.add(ST.bal);
 ST.lines=[]; for(let i=0;i<8;i++){const a=i/8*Math.PI*2; const l=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1,4),M(0x888888)); l.userData.a=a; ST.cap.add(l); ST.lines.push(l);}
 W0.add(ST.cap);
 // tú, con casco y traje
 ST.J=new THREE.Group(); ST.J.rotation.order='YXZ'; ST.h=human(0xff9a4a,1.6); ST.h.position.y=-2.4; ST.J.add(ST.h); W0.add(ST.J); ST.head=ST.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 const helm=new THREE.Mesh(new THREE.SphereGeometry(.42,24,16),new THREE.MeshStandardMaterial({color:0xdfe4ec,metalness:.4,roughness:.3,transparent:true,opacity:.35})); helm.position.y=2.5; ST.h.add(helm); ST.helm=helm;
 const visor=new THREE.Mesh(new THREE.SphereGeometry(.43,24,16,-.9,1.8,.9,1.1),M(0xffd23f,{metalness:.9,roughness:.1})); visor.position.y=2.5; ST.h.add(visor); ST.visor=visor;
 const pack=new THREE.Mesh(new RoundedBoxGeometry(.7,.9,.35,3,.1),M(0x2a2f3a)); pack.position.set(0,1.6,-.42); ST.h.add(pack);
 // cono del sonido, líneas de velocidad, paracaídas
 ST.cone=new THREE.Mesh(new THREE.ConeGeometry(2.6,7,40,1,true),new THREE.MeshBasicMaterial({color:0xdff0ff,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false})); W0.add(ST.cone);
 ST.ring=new THREE.Mesh(new THREE.TorusGeometry(2.6,.08,8,48),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.6})); W0.add(ST.ring);
 ST.sl=[]; for(let i=0;i<60;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.04,1,.04),new THREE.MeshBasicMaterial({color:0xcfe6ff,transparent:true,opacity:.6})); m.userData={a:rnd()*6.28,r:1.6+rnd()*5,ph:rnd()}; W0.add(m); ST.sl.push(m);}
 ST.chute=new THREE.Group(); const can=new THREE.Mesh(new THREE.SphereGeometry(4,32,12,0,Math.PI*2,0,Math.PI*.42),new THREE.MeshStandardMaterial({color:0xd92a2a,roughness:.6,side:THREE.DoubleSide})); can.position.y=4; ST.chute.add(can);
 for(let i=0;i<10;i++){const a=i/10*Math.PI*2; const l=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,6.4,4),M(0xdddddd)); l.position.set(Math.cos(a)*1.4,4.6,Math.sin(a)*1.4); l.rotation.z=Math.cos(a)*.42; l.rotation.x=-Math.sin(a)*.42; ST.chute.add(l);}
 W0.add(ST.chute);
 ST.warn=await icon3D('alert',0xff2d46,1.2,{depth:3}); W0.add(ST.warn); ST.astro=await icon3D('account-astronaut',0x3fb8ff,1.4,{depth:3}); W0.add(ST.astro);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.2,{depth:2}); b.userData={x:(rnd()-.5)*10,y:2+rnd()*5,z:(rnd()-.5)*6,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); [ST.earth,ST.atmo,ST.skyT,ST.cone,ST.ring,ST.bal].forEach(m=>m.castShadow=false); window.popsReady=true;};
let K=null;
function setupFX(c){const W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 FX.ring(W([0,BASE+.4,5.7]),c.sonido,0xffffff,9,1.0); FX.ring(W([0,BASE+.4,5.7]),c.sonido+.3,0xcfe6ff,12,1.1); FX.burst('sparks',W([0,BASE+.4,5.7]),c.sonido,90,[0xffffff,0xcfe6ff,0x3fb8ff],1.4);
 FX.ring(W([0,BASE+1,5.7]),c.controlas,0x7dff9a,6,.7);
 const L=W([0,BASE-2.4,5.7]); FX.burst('dust',L,c.aterrizas,70); FX.ring(L.clone().add(new THREE.Vector3(0,.2,0)),c.aterrizas,0xffd23f,7,.9);
 FX.burst('confetti',W([0,BASE+9,5.7]),c.aterrizas+.15,220,[0xffd23f,0xd92a2a,0x3fb8ff,0xffffff],1.5); FX.burst('confetti',W([-6,BASE+9,9]),c.aterrizas+.4,140);}
function setupK(c){const end=TL.end;
 const rw=c.como+(c.octubre-c.como)*.55, pm=(c.pillas+c.loop)/2;
 K={HY:[[0,30.6],[c.como,29.8],[rw,39],[c.octubre,0],[c.globo,0],[c.k10,10],[c.k20,20],[c.k30,30],[c.ahi-.2,39],[c.saltas,39],[c.aceleras,38.5],[c.sonido,29.8],[c.peonza,28.5],[c.controlas,23],[c.chute,2.5],[c.aterrizas,0],[c.pillas,0],[pm,31.5],[end,30.6]],
  HC:[[0,39],[rw,39],[c.octubre,0],[c.globo,0],[c.k10,10],[c.k20,20],[c.k30,30],[c.ahi-.2,39],[1e9,39]],
  SPD:[[0,1357],[c.como,1357],[rw-.2,0],[c.saltas,0],[c.s500,500],[c.s800,800],[c.s1000,1000],[c.sonido,1357],[c.bajar,1300],[c.chute,200],[c.chute+.8,25],[c.aterrizas,0],[c.pillas,0],[pm,1300],[end,1357]]};
 setupFX(c);}
const BIG=[["","sinavion","39 KM<small>de altura</small>"],["sinavion","romper","<span style=\"font-size:120px\">SIN AVIÓN</span><small>ni cohete</small>"],["romper","como","1.357 km/h<small>más rápido que el sonido</small>"],
 ["como","octubre","<span style=\"font-size:110px\">HASTA EL FINAL</span>"],["octubre","eres","<span style=\"font-size:120px\">NUEVO MÉXICO</span><small>14 de octubre de 2012</small>"],["eres","globo","<span style=\"font-size:100px\">FELIX BAUMGARTNER</span>"],
 ["visor","seguir","<span style=\"font-size:120px\">¡EL VISOR!</span><small>la calefacción falla</small>"],["ahi","millones","39 KM<small>el borde del espacio</small>"],["millones","abres","8 MILLONES<small>en directo en YouTube</small>"],
 ["curva","radio","<span style=\"font-size:100px\">LA CURVA DE LA TIERRA</span>"],["radio","saltas","<span style=\"font-size:100px\">JOE KITTINGER</span><small>tu mentor, por radio</small>"],
 ["sonido","peonza","MACH 1,25<small>1.357 km/h</small>"],["peonza","estiras","<span style=\"font-size:110px\">¡GIRO PELIGROSO!</span>"],["estiras","controlas","<span style=\"font-size:120px\">AGUANTA</span>"],["controlas","bajar","CONTROLADO"],
 ["tras","chute","4 min 20 s<small>de caída libre</small>"],["aterrizas","pregunta","¡DE PIE!"],["pregunta","leo","¿Y TÚ?"]];
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 const hy=kfl(K.HY,t)[0], hc=kfl(K.HC,t)[0], spd=kfl(K.SPD,t)[0];
 const onGround=hy<.001; const inCap=Math.abs(hy-hc)<.01&&t<c.saltas+.1;
 // mundo: suelo y Tierra relativos a tu altura (tú siempre en BASE)
 const gY=BASE-2.4-U(hy); ST.earth.position.set(0,gY-RE,0); ST.sunL.target.position.copy(ROOM).add(new THREE.Vector3(0,gY,0)); ST.sunL.position.copy(ST.sunL.target.position).add(new THREE.Vector3(300,600,200)); ST.atmo.position.copy(ST.earth.position); ST.pad.position.set(0,gY,0);
 const capY=BASE-2.4+U(hc)-U(hy); ST.cap.position.set(0,capY+.3,0);
 const infl=cl(hc/20); ST.bal.scale.set(lerp(.35,1.2,infl),lerp(1.6,1.3,infl),lerp(.35,1.2,infl)); ST.bal.position.y=lerp(20,22,infl);
 ST.lines.forEach(l=>{const a=l.userData.a, r0=1.8, r1=lerp(2.5,8,infl); const p0=new THREE.Vector3(Math.cos(a)*r0,2.4,Math.sin(a)*r0), p1=new THREE.Vector3(Math.cos(a)*r1,ST.bal.position.y-10*ST.bal.scale.y*.9,Math.sin(a)*r1); l.position.copy(p0).lerp(p1,.5); l.scale.y=p0.distanceTo(p1); l.lookAt(ST.cap.localToWorld(p1.clone())); l.rotateX(Math.PI/2);});
 const air=cl(1-hy/18); ST.skyT.material.opacity=.62*cl(1-hy/12); ST.skyT.position.copy(cam.position); parts.material.opacity=.75*Math.max(.05,air);
 const fog=seg(t,c.empana,c.empana+.6)*(1-seg(t,c.seguir+.4,c.seguir+1.2)); ST.helm.material.opacity=.35+.55*fog; ST.helm.material.color.setHex(fog>.01?0xf4f6fa:0xdfe4ec); ST.visor.material.color.setHex(fog>.3?0xc9ccd2:0xffd23f);
 ST.door.rotation.y=lerp(0,2.2,eio(seg(t,c.abres,c.abres+.8)))*(t<c.pillas?1:0);
 // tú: posición y pose
 const U2=ST.h.userData; let px=0, pz=0, pitch=0, yaw=0, roll=0; U2.aL.rotation.z=0; U2.aR.rotation.z=0;
 const stepOut=seg(t,c.curva-.6,c.curva+.2), jump=seg(t,c.saltas,c.saltas+1.4);
 if(inCap||onGround){pz=lerp(0,2.7,eio(stepOut))*(t<c.saltas+.5?1:0); U2.aL.rotation.x=U2.aR.rotation.x=0; U2.lL.rotation.x=U2.lR.rotation.x=0;}
 const falling=!onGround&&!inCap&&t<c.chute+.3; const fallW=falling?1:0;
 if(t>=c.saltas&&t<c.chute+.6){pz=2.7+jump*3; pitch=lerp(0,1.25,eio(jump));}
 if(t<c.como+.2||t>=c.loop-.4){pitch=1.25; pz=0;}
 if(falling||t<c.como+.2||t>=c.loop-.4){U2.aL.rotation.x=U2.aR.rotation.x=.5; U2.lL.rotation.x=.15; U2.lR.rotation.x=-.1;}
 const spin=seg(t,c.peonza,c.peonza+.6)*(1-seg(t,c.estiras,c.controlas)); let spinA=0; if(t>c.peonza){const tt=Math.min(t,c.controlas)-c.peonza; spinA=tt*tt*1.5+tt*4;} yaw=t>c.peonza&&t<c.chute+.6?spinA:0;
 if(t>=c.peonza&&t<c.chute+.6){pitch=lerp(1.25,1.5,spin); const arms=seg(t,c.estiras,c.estiras+.6); U2.aL.rotation.z=1.4*arms; U2.aR.rotation.z=-1.4*arms; U2.aL.rotation.x=U2.aR.rotation.x=lerp(.5,0,arms);}
 const chute=seg(t,c.chute,c.chute+.5)*(1-seg(t,c.aterrizas+.3,c.aterrizas+1)); if(t>=c.chute&&t<c.pillas){pitch=lerp(pitch,0,eio(seg(t,c.chute,c.chute+.6))); U2.aL.rotation.x=U2.aR.rotation.x=-2.6*eio(seg(t,c.chute,c.chute+.6)); U2.aL.rotation.z=U2.aR.rotation.z=0;}
 const landed=t>=c.aterrizas&&t<c.pillas; if(landed){pitch=0; const up=seg(t,c.aterrizas+.3,c.aterrizas+.8); U2.aL.rotation.x=U2.aR.rotation.x=-2.8*up; U2.lL.rotation.x=U2.lR.rotation.x=0;}
 if(t>=c.pillas&&t<c.loop-.4){pitch=lerp(0,1.25,seg(t,c.pillas,c.pillas+.6));}
 ST.J.position.set(px,BASE,pz); ST.J.rotation.set(pitch,yaw,roll);
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)||(t>c.perder&&t<c.estiras)?.15:1,1));
 ST.chute.visible=chute>.01; ST.chute.position.set(px,BASE+1.5,pz); ST.chute.scale.set(Math.max(.01,chute),Math.max(.01,lerp(.3,1,chute)),Math.max(.01,chute)); ST.chute.rotation.z=Math.sin(t*1.3)*.05;
 // cono del sonido y líneas de velocidad
 const mach=cl((spd-1150)/150)*(t<c.chute?1:0); ST.cone.visible=ST.ring.visible=mach>.01;
 const vdir=new THREE.Vector3(0,-1,0); ST.cone.position.set(px,BASE+2.4,pz); ST.cone.rotation.set(0,0,0); ST.cone.material.opacity=.22*mach; ST.ring.position.set(px,BASE-1.0-((t*3)%1)*.0,pz); ST.ring.rotation.x=Math.PI/2; ST.ring.scale.setScalar(1+((t*2.5)%1)*1.2); ST.ring.material.opacity=.6*mach*(1-((t*2.5)%1));
 const sv=cl(spd/1357)*(falling||t<c.como+.2||t>=c.loop-.4?1:0); ST.sl.forEach((m,i)=>{const u=m.userData; m.visible=sv>.05; if(!m.visible) return; const y=((u.ph*10+t*sv*30)%14)-4; m.position.set(px+Math.cos(u.a)*u.r,BASE+y,pz+Math.sin(u.a)*u.r); m.scale.y=1+sv*5; m.material.opacity=.5*sv;});
 ST.crew.forEach((h,i)=>{h.userData.aR.rotation.x=((t>c.globo&&t<c.globo+3)||t>c.aterrizas&&t<c.pillas)?-2.6+Math.sin(t*9+i)*.4:0;});
 // ---- CÁMARA [t, ángulo, distancia, altura, mirada y relativa]
 const CK=[[0,.6,11,.1,0],[c.como,1.6,13,.15,0],[c.octubre,.4,30,.04,7],[c.eres,.2,11,.1,.6],[c.globo,.5,24,.55,-3],[c.k30,.75,30,.5,-6],[c.visor,.2,8.5,.08,.6],[c.seguir,.25,9,.1,.6],
  [c.ahi,.5,26,.45,-5],[c.millones,.3,12,.12,.4],[c.abres,.9,12,.15,-1],[c.curva,1.15,13,.2,-2],[c.radio,.15,6.5,.05,.6],[c.angel,.1,5.5,.04,.5],[c.saltas,1.25,14,.22,-2.5],[c.frene,.8,12,.15,0],
  [c.sonido,1.4,11,.1,0],[c.mas,1.6,9,-.05,0],[c.peonza,1.0,13,.65,0],[c.controlas,1.5,12,.3,0],[c.bajar,1.7,12,.2,0],[c.chute,.6,15,.15,3],[c.aterrizas,.4,9,.03,1],[c.pregunta,.3,12,.15,1],[c.pillas,.6,14,.2,1],[c.loop,.6,11,.1,0],[end,.6,11,.1,0],[1e9,.6,11,.1,0]];
 let [ca,cd,chh,cly]=kf(CK,t); ca+=t*.03; const Lw=ROOM.clone().add(new THREE.Vector3(px,BASE+cly,pz));
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd));
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.5) pkk=Math.max(pkk,Math.exp(-dd*7));}); const shake=pkk+mach*.25;
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*shake*.12; cam.position.y+=Math.cos(t*61)*shake*.12; cam.lookAt(Lw); cam.near=.1; cam.far=1400; cam.fov=50-pkk*3-9*seg(t,c.angel,c.saltas)*(1-seg(t,c.saltas,c.saltas+.6))-6*seg(t,c.chute,c.aterrizas)*(1-seg(t,c.aterrizas,c.aterrizas+.8)); cam.updateProjectionMatrix();
 const icon=(m,on,pos,s)=>{m.visible=on>.01; if(!m.visible) return; m.position.copy(pos); m.scale.setScalar(s*back(on)); m.lookAt(cam.position);};
 icon(ST.warn,Math.max(seg(t,c.perder,c.perder+.3)*(1-seg(t,c.estiras+.4,c.estiras+.8)),seg(t,c.visor+.3,c.visor+.6)*(1-seg(t,c.seguir,c.seguir+.4))),new THREE.Vector3(px+2.4,BASE+2.6,pz),1.2);
 icon(ST.astro,0,new THREE.Vector3(px+1.8,BASE+2.2,pz+1),1.1);
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.2); b.position.set(q.x,BASE+q.y+Math.sin(t*2+q.ph)*.3,q.z); b.lookAt(cam.position);});
 const kb=new THREE.Vector3(Lw.x,BASE-6,Lw.z); key.position.set(kb.x+8,kb.y+30,kb.z+16); keyT.position.copy(kb); fill.position.set(kb.x-16,kb.y+12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,kb.y+6,kb.z-6);
 key.distance=200; key.angle=.9;
 parts.position.set(kb.x,BASE-15,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4)+(falling?t*sv*8:0))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true;
 sky.position.copy(cam.position);
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.4; document.getElementById('flash').style.opacity=0;
 const cine=Math.max(t<c.como?.6:0,seg(t,c.radio,c.radio+.5)*(1-seg(t,c.saltas+1.5,c.saltas+2.2)),seg(t,c.peonza,c.peonza+.4)*(1-seg(t,c.controlas+.4,c.controlas+1)),seg(t,c.chute,c.chute+.4)*(1-seg(t,c.pregunta-.4,c.pregunta)));
 FX.update(t,{cine,vig:Math.max(.45*seg(t,c.radio,c.radio+.5)*(1-seg(t,c.saltas,c.saltas+.5)),.5*seg(t,c.perder,c.perder+.4)*(1-seg(t,c.controlas,c.controlas+.4)),.3*seg(t,c.empana,c.empana+.4)*(1-seg(t,c.seguir,c.seguir+.4)))});
 C.render();
 let bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); let bh=bg?bg[2]:'';
 if(!bg&&t>=c.globo&&t<c.ahi&&!(t>=c.visor&&t<c.seguir)) bh=Math.round(hc)+' KM<small>de altura</small>';
 if(!bg&&((t>=c.saltas&&t<c.sonido)||(t>=c.bajar&&t<c.tras))) bh=Math.round(spd).toLocaleString('es-ES')+' km/h';
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
