// ================= HISTORIA 012: tú eres Roberto Carlos (Lyon, 1997) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const SPOT=new THREE.Vector3(6,.25,12), GZ=-30.6, POST=4.4, BAR=2.93;
const BZ=[SPOT.clone(),new THREE.Vector3(16,4,-4),new THREE.Vector3(14,3.5,-22),new THREE.Vector3(3.8,1.8,GZ-.2)];
const GH=[new THREE.Vector3(2,.25,-12),new THREE.Vector3(7,2.4,-18),new THREE.Vector3(8.2,2.2,-25),new THREE.Vector3(7.4,1.6,GZ-.4)]; // balón fantasma desde cerca
const bez=(P,u)=>{const v=1-u; return P[0].clone().multiplyScalar(v*v*v).add(P[1].clone().multiplyScalar(3*v*v*u)).add(P[2].clone().multiplyScalar(3*v*u*u)).add(P[3].clone().multiplyScalar(u*u*u));};
function pitchTex(){return canvasTex(1024,1024,(x,w,h)=>{for(let i=0;i<14;i++){x.fillStyle=i%2?'#2f7a34':'#2a6c2e';x.fillRect(0,i*h/14,w,h/14);}x.strokeStyle='#eef2ea';x.lineWidth=6;
 // área grande y pequeña junto a la portería (arriba de la textura = portería)
 x.strokeRect(w*.22,0,w*.56,h*.25);x.strokeRect(w*.38,0,w*.24,h*.08);x.beginPath();x.arc(w/2,h*.18,4,0,7);x.stroke();x.beginPath();x.arc(w/2,h*.16,h*.14,.65,Math.PI-.65);x.stroke();});}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 const pitch=new THREE.Mesh(new THREE.PlaneGeometry(90,90),new THREE.MeshStandardMaterial({map:pitchTex(),roughness:.95})); pitch.rotation.x=-Math.PI/2; pitch.position.set(0,.03,GZ+45); W0.add(pitch);
 // portería con red
 const white=M(0xf4f4f4,{roughness:.4}); for(const x of [-POST,POST]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,BAR,12),white); p.position.set(x,BAR/2,GZ); W0.add(p);}
 const cb=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,POST*2+.24,12),white); cb.rotation.z=Math.PI/2; cb.position.set(0,BAR,GZ); W0.add(cb);
 const netT=canvasTex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=2;for(let i=0;i<=16;i++){x.beginPath();x.moveTo(i*16,0);x.lineTo(i*16,h);x.stroke();x.beginPath();x.moveTo(0,i*16);x.lineTo(w,i*16);x.stroke();}}); netT.wrapS=netT.wrapT=THREE.RepeatWrapping; netT.repeat.set(4,2);
 const netM=new THREE.MeshBasicMaterial({map:netT,transparent:true,side:THREE.DoubleSide,depthWrite:false});
 ST.net=new THREE.Mesh(new THREE.PlaneGeometry(POST*2,BAR,24,10),netM); ST.net.position.set(0,BAR/2,GZ-2.2); ST.net.userData.base=ST.net.geometry.attributes.position.array.slice(); W0.add(ST.net);
 for(const s of [-1,1]){const sn=new THREE.Mesh(new THREE.PlaneGeometry(2.2,BAR),netM); sn.rotation.y=Math.PI/2; sn.position.set(s*POST,BAR/2,GZ-1.1); W0.add(sn);} const tn=new THREE.Mesh(new THREE.PlaneGeometry(POST*2,2.2),netM); tn.rotation.x=Math.PI/2; tn.position.set(0,BAR,GZ-1.1); W0.add(tn);
 // estadio: gradas y focos
 const pos=[]; const cs=[0xd9d2c4,0x2a62d8,0xffd23f,0x2e9a4a,0xffffff,0x3a3f4a,0xd92a2a];
 const standM=M(0x22262f,{roughness:.8}); for(let r=0;r<7;r++){for(const [cx,cz,w,ry] of [[0,GZ-14,90,0],[-34,GZ+30,90,Math.PI/2],[34,GZ+30,90,-Math.PI/2]]){const st=new THREE.Mesh(new THREE.BoxGeometry(w,1.6+r*1.6,2.8),standM); st.position.set(cx+(ry?Math.sign(cx)*r*2.8:0),.8+r*.8,cz-(ry?0:r*2.8)); st.rotation.y=ry; W0.add(st);
  for(let k=0;k<40;k++){const off=-w/2+1+k*(w-2)/39; const px=ry?cx+Math.sign(cx)*r*2.8:cx+off, pz=ry?cz+off:cz-r*2.8; pos.push([px,2.2+r*1.6,pz,ry]);}}}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.6,1.1,.6),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const dm=new THREE.Object3D(), cc=new THREE.Color(); ST.cpos=pos; ST.crowd=im;
 pos.forEach((p,k)=>im.setColorAt(k,cc.setHex(cs[k%7]))); W0.add(im);
 // personajes
 const mk=(col,sc=1.6)=>{const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,sc); h.position.y=-1.5*sc; J.add(h); W0.add(J); return {J,h};};
 ST.you=mk(0xff9a4a); ST.head=ST.you.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 ST.wall=[0,1,2,3].map(i=>{const s=mk(0x2a62d8); s.J.position.set(3.2+i*1.15,2.4,1); s.J.rotation.y=Math.PI*0+Math.atan2(SPOT.x-(3.2+i*1.15),SPOT.z-1); return s;});
 ST.gk=mk(0x7dff9a); ST.gk.J.position.set(.8,2.4,GZ+.8); ST.gk.J.rotation.y=Math.atan2(SPOT.x-.8,SPOT.z-GZ);
 ST.boy=mk(0xffc21a,1.2); ST.boy.J.position.set(12.5,1.8,GZ-1.5); ST.boy.J.rotation.y=-.3;
 // balón con gajos
 const ballT=canvasTex(256,128,(x,w,h)=>{x.fillStyle='#f4f4f4';x.fillRect(0,0,w,h);x.fillStyle='#14161c';for(let i=0;i<10;i++){x.beginPath();x.arc((i*53)%w,(i*37)%h,13,0,7);x.fill();}});
 ST.ball=new THREE.Mesh(new THREE.SphereGeometry(.28,24,16),new THREE.MeshStandardMaterial({map:ballT,roughness:.4})); W0.add(ST.ball);
 ST.ghost=new THREE.Mesh(new THREE.SphereGeometry(.28,20,14),new THREE.MeshBasicMaterial({color:0x9fdcff,transparent:true,opacity:.6})); W0.add(ST.ghost);
 // estela (espiral) y flechas de giro
 const pts=[]; for(let i=0;i<=120;i++) pts.push(bez(BZ,i/120)); ST.trail=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),240,.09,8,false),new THREE.MeshBasicMaterial({color:0xffd23f})); W0.add(ST.trail); ST.trailN=ST.trail.geometry.index.count;
 const gp=[]; for(let i=0;i<=60;i++) gp.push(bez(GH,i/60)); ST.gtrail=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(gp),120,.08,8,false),new THREE.MeshBasicMaterial({color:0x9fdcff})); W0.add(ST.gtrail); ST.gtrailN=ST.gtrail.geometry.index.count;
 ST.arrows=[0.35,.55,.75,.9].map(u=>{const g=new THREE.Group(); const sh=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,2,8),new THREE.MeshBasicMaterial({color:0xff4fd8})); sh.rotation.z=Math.PI/2; sh.position.x=-1; g.add(sh);
  const hd=new THREE.Mesh(new THREE.ConeGeometry(.35,.7,12),new THREE.MeshBasicMaterial({color:0xff4fd8})); hd.rotation.z=Math.PI/2; hd.position.x=-2.2; g.add(hd); g.userData.u=u; W0.add(g); return g;});
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.2,{depth:2}); b.userData={x:(rnd()-.5)*10,y:4+rnd()*5,z:(rnd()-.5)*5,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
function setupFX(){const c=TL.cues, W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 FX.ring(W([SPOT.x,.4,SPOT.z]),c.golpeas,0xffffff,5,.6); FX.burst('dust',W([SPOT.x,.4,SPOT.z]),c.golpeas,40);
 FX.ring(W([3.8,1.8,GZ-1]),c.entra,0xffd23f,6,.8,new THREE.Vector3(0,0,1)); FX.burst('sparks',W([3.8,1.8,GZ-1]),c.entra,90,[0xffd23f,0xffffff,0x7dff9a],1.3);
 FX.ring(W([3.8,1.8,GZ-1]),2.35,0xffd23f,5,.7,new THREE.Vector3(0,0,1));
 FX.burst('confetti',W([0,14,GZ-12]),c.entra+.1,200,[0xffd23f,0x2e9a4a,0x2a62d8,0xffffff],1.4); FX.burst('confetti',W([-20,14,GZ+10]),c.entra+.3,140,[0xffd23f,0x2e9a4a,0xffffff]);
 [[-30,30,GZ+5],[30,30,GZ+5],[-30,30,GZ+50],[30,30,GZ+50]].forEach((p,i)=>FX.beam(W(p),0xfff2d0,50,i*1.3));
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; setupFX(); window.popsReady=true;};
const BIG=[["","fisica0","<span style=\"font-size:120px\">IBA FUERA…</span>"],["fisica0","quedate","<span style=\"font-size:120px\">…Y ENTRÓ</span>"],["quedate","lyon","<span style=\"font-size:110px\">QUÉDATE AL FINAL</span><small>lo verás a cámara lenta</small>"],
 ["lyon","falta","<span style=\"font-size:130px\">LYON 1997</span><small>Francia – Brasil</small>"],["falta","eres","35 m<small>de distancia</small>"],["eres","alejas","<span style=\"font-size:110px\">ROBERTO CARLOS</span>"],
 ["barthez","nadie","BARRERA<small>y Barthez en la portería</small>"],["golpeas","disparado","<span style=\"font-size:120px\">¡ZURDAZO!</span>"],["agacha","entonces","<span style=\"font-size:110px\">¡IBA FUERA!</span>"],["entra","magia","¡GOOOL!"],
 ["magia","franceses","¿MAGIA?"],["franceses","espiral","FÍSICA<small>Dupeux y otros, 2010</small>"],["espiral","lejos","<span style=\"font-size:120px\">UNA ESPIRAL</span>"],["lejos","pregunta","<span style=\"font-size:110px\">SOLO DESDE LEJOS</span>"],["pregunta","leo","¿Y TÚ?"]];
window.render=(t)=>{const c=TL.cues, end=TL.end, W0=ST.W;
 // ---- parámetro del vuelo del balón (u: 0 pie → 1 red) con cámara ultralenta
 const UK=[[0,.45],[c.fisica0,.78],[2.35,1],[c.quedate,1],[c.lyon-.3,0],[c.golpeas,0],[c.disparado,.15],[c.abierto,.28],[c.barrera,.38],[c.tanfuera,.5],[c.agacha,.6],[c.entonces,.7],[c.gira,.75],[c.curva,.8],[c.mas,.88],[c.roza,.96],[c.entra,1],[c.pillas,1],[c.loop,0],[c.loop+.25,0],[end,.45]];
 const u=kfl(UK,t)[0]; const inNet=(t>=2.35&&t<c.quedate)||(t>=c.entra&&t<c.pillas);
 let bp=bez(BZ,Math.min(1,u)); if(inNet){const d=Math.min(1.4,(t-(t<c.quedate?2.35:c.entra))*3); bp.z-=d*1.5; bp.y=Math.max(.3,bp.y-d*.8);} ST.ball.position.copy(bp); ST.ball.rotation.y=t*25; ST.ball.rotation.x=t*7;
 // red que se hincha al entrar
 const nk=t>=c.entra&&t<c.pillas?t-c.entra:(t>=2.35&&t<c.quedate?t-2.35:-1); const na=ST.net.geometry.attributes.position.array, nb=ST.net.userData.base;
 for(let i=0;i<na.length;i+=3){const dx=nb[i]-3.8+0, dy=nb[i+1]-(1.8-BAR/2); const r=Math.sqrt(dx*dx+dy*dy); na[i+2]=nk>=0?-Math.max(0,1.6-r*.45)*Math.exp(-nk*2)*Math.sin(Math.min(1,nk*4)*Math.PI/2):0;} ST.net.geometry.attributes.position.needsUpdate=true;
 // ---- tú: colocar, 18 pasos atrás, carrera y golpeo
 const BK=new THREE.Vector3(.14,0,.99); const Y=ST.you, U2=Y.h.userData; let yp=SPOT.clone().add(BK.clone().multiplyScalar(1.2)), yaw=Math.atan2(-BK.x,-BK.z), pitch=0;
 const stepsDone=Math.min(18,Math.floor(seg(t,c.p1,c.p18+.5)*18.99)); const st=seg(t,c.alejas,c.barthez);
 if(t<c.lyon-.3){yp=SPOT.clone().add(BK.clone().multiplyScalar(1.4)); }
 if(t>=c.alejas&&t<c.corres){yp=SPOT.clone().add(BK.clone().multiplyScalar(1.2+eio(st)*10)); const w=st>0&&st<1; U2.lL.rotation.x=w?Math.sin(t*8)*.5:0; U2.lR.rotation.x=-U2.lL.rotation.x;}
 if(t>=c.corres&&t<c.golpeas+.6){const r=seg(t,c.corres,c.golpeas); yp=SPOT.clone().add(BK.clone().multiplyScalar(lerp(11.2,1.0,r)).add(new THREE.Vector3(.8,0,0))); pitch=.25; const s=Math.sin(t*14)*.9*(r<1?1:0); U2.lL.rotation.x=s; U2.lR.rotation.x=-s;
  const kick=seg(t,c.golpeas-.15,c.golpeas+.25); if(kick>0){U2.lL.rotation.x=lerp(1.2,-1.8,kick); U2.lR.rotation.x=.2; U2.aR.rotation.x=-1.2*kick; U2.aL.rotation.x=.8*kick;}}
 if(t>=c.golpeas+.6&&t<c.pillas){yp=SPOT.clone().add(new THREE.Vector3(.4,0,.6)); yaw=Math.atan2(bp.x-yp.x,bp.z-yp.z); U2.lL.rotation.x=U2.lR.rotation.x=0; pitch=0;
  const cel=seg(t,c.entra,c.entra+.4); U2.aL.rotation.x=U2.aR.rotation.x=-2.9*cel; if(cel>0){yp.y+=Math.abs(Math.sin((t-c.entra)*8))*.6*(1-seg(t,c.magia,c.magia+.5));}}
 if(t>=c.colocas&&t<c.alejas){const b2=seg(t,c.colocas,c.colocas+.6); pitch=.9*Math.sin(b2*Math.PI); U2.aR.rotation.x=-1.2*Math.sin(b2*Math.PI);}
 if(t>=c.loop-.2){const r=seg(t,c.loop-.2,c.loop+.25); yp=SPOT.clone().add(BK.clone().multiplyScalar(lerp(4,1,r)).add(new THREE.Vector3(.8,0,0))); const kick=seg(t,c.loop+.05,c.loop+.4); U2.lL.rotation.x=lerp(1.2,-1.8,kick);}
 Y.J.position.set(yp.x,2.4+(yp.y-SPOT.y>0?yp.y-SPOT.y-.0:0),yp.z); Y.J.rotation.set(pitch,yaw,0);
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)?.15:1,1));
 // barrera y portero (Barthez no se mueve), recogepelotas que se agacha
 ST.wall.forEach((s,i)=>{const U=s.h.userData; U.aL.rotation.x=U.aR.rotation.x=-.5; const jump=t>c.golpeas&&t<c.golpeas+1.2?Math.sin(seg(t,c.golpeas,c.golpeas+1.2)*Math.PI)*.8:0; s.J.position.y=2.4+jump; s.h.children[1].rotation.y=Math.atan2(bp.x-s.J.position.x,bp.z-s.J.position.z)*.3;});
 const gkU=ST.gk.h.userData; gkU.aL.rotation.z=.5; gkU.aR.rotation.z=-.5; ST.gk.h.children[1].rotation.y=t>c.entra?.6:0;
 const duck=seg(t,c.agacha-.2,c.agacha+.4)*(1-seg(t,c.roza,c.roza+.6)); ST.boy.J.position.y=1.8-1.1*duck; ST.boy.J.rotation.x=.6*duck; ST.boy.h.userData.aL.rotation.x=ST.boy.h.userData.aR.rotation.x=-2.8*duck;
 // ---- repetición explicada: estela, flechas, balón fantasma
 const rep=t>=c.franceses&&t<c.pregunta; const ru=seg(t,c.franceses+.2,c.espiral+.3); ST.trail.visible=rep; ST.trail.geometry.setDrawRange(0,Math.floor(ST.trailN*ru/3)*3);
 ST.arrows.forEach(a=>{const uu=a.userData.u; const on=rep&&ru>uu&&t>c.frenarse-.2; a.visible=on; if(!on) return; const p=bez(BZ,uu), p2=bez(BZ,uu+.01); a.position.copy(p).add(new THREE.Vector3(0,.6,0)); a.rotation.y=Math.atan2(p2.x-p.x,p2.z-p.z)+Math.PI/2; a.scale.setScalar(.6+uu*1.4);});
 const gv=t>=c.lejos&&t<c.pregunta; const gu=seg(t,c.lejos+.2,c.lejos+1.8); ST.gtrail.visible=gv; ST.gtrail.geometry.setDrawRange(0,Math.floor(ST.gtrailN*gu/3)*3); ST.ghost.visible=gv; ST.ghost.position.copy(bez(GH,gu));
 // público
 const cheer=seg(t,c.entra,c.entra+.4)*(1-seg(t,c.franceses,c.franceses+1)); const dmm=new THREE.Object3D(); ST.cpos.forEach((p,k)=>{dmm.position.set(p[0],p[1]+(cheer>0?Math.abs(Math.sin(t*9+k))*.5*cheer:0),p[2]); dmm.rotation.y=p[3]; dmm.updateMatrix(); ST.crowd.setMatrixAt(k,dmm.matrix);}); ST.crowd.instanceMatrix.needsUpdate=true;
 // ---- CÁMARA [t, ángulo, distancia, altura, mirada x,y,z, peso hacia el balón]
 const flightA=t>=c.disparado&&t<c.entra?(t-c.disparado)*.18:0;
 const CK=[[0,1.2,6,.2,0,0,0,1],[c.fisica0,1.7,7,.15,0,0,0,1],[2.35,.25,9,.12,3.8,1.6,GZ,0],[c.quedate,.3,10,.15,0,0,0,1],[c.lyon-.3,.2,9,.2,6,2,12,0],[c.lyon,.6,48,.6,0,2,GZ+15,0],[c.falta,.25,30,.35,4,2,-6,0],
  [c.eres,Math.PI-.15,8,.12,6,3.4,13.2,0],[c.colocas,Math.PI-.4,6,.4,6,1.2,12.4,0],[c.alejas,1.4,14,.2,7,2.6,17,0],[c.p18,1.25,16,.2,7.5,2.6,20,0],[c.barthez,.05,14,.14,4,3,0,0],[c.nadie,0,11,.12,3,2.8,-6,0],
  [c.corres,.95,13,.14,7,2.6,18,0],[c.golpeas,.7,5,.08,6,.8,12.4,0],[c.disparado,1.0,7,.12,0,0,0,1],[c.barrera,1.6,8,.15,0,0,0,1],[c.agacha,.55,13,.18,12.5,1.4,-31.5,0],[c.entonces,2.7,8,.12,0,0,0,1],[c.curva,3.2,7,.1,0,0,0,1],[c.roza,3.6,6,.1,0,0,0,1],
  [c.entra,.15,10,.12,3.4,1.8,GZ,0],[c.nimueve,.4,8,.12,.8,3.2,GZ+.8,0],[c.magia,.3,16,.3,2,3,GZ+6,0],[c.franceses,.02,48,1.6,8,0,-9,0],[c.lejos,.02,46,1.6,7,0,-10,0],[c.pregunta,.4,16,.3,6,3,12,0],[c.pillas,.6,12,.2,6,2,12,0],[c.loop,.9,8,.15,6,1.5,12,0],[end,1.2,6,.2,0,0,0,1],[1e9,1.2,6,.2,0,0,0,1]];
 let [ca,cd,chh,lx,ly,lz,cw]=kf(CK,t); ca+=flightA*0; const T=new THREE.Vector3(lx,ly,lz).lerp(bp,cw); const Lw=ROOM.clone().add(T); const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd));
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.5) pkk=Math.max(pkk,Math.exp(-dd*7));});
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*pkk*.3; cam.position.y+=Math.cos(t*61)*pkk*.3; cam.lookAt(Lw); cam.near=.1; cam.fov=50-pkk*6-8*seg(t,c.mas,c.entra)*(1-seg(t,c.entra,c.entra+.6)); cam.updateProjectionMatrix();
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.2); b.position.set(6+q.x,q.y+Math.sin(t*2+q.ph)*.3,12+q.z); b.lookAt(cam.position);});
 const kb=new THREE.Vector3(Lw.x,0,Lw.z); key.position.set(kb.x+8,30,kb.z+16); keyT.position.set(kb.x,3,kb.z); fill.position.set(kb.x-16,12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,6,kb.z-6);
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true;
 sky.position.copy(cam.position);
 const flight=t>=c.golpeas&&t<c.nimueve+.5; const cine=Math.max(t<c.quedate?.8:0,seg(t,c.nadie,c.nadie+.4)*(1-seg(t,c.nimueve+.6,c.nimueve+1.2)));
 FX.update(t,{cine,vig:Math.max(.45*seg(t,c.nadie,c.nadie+.5)*(1-seg(t,c.golpeas,c.golpeas+.3)),.35*seg(t,c.mas,c.mas+.4)*(1-seg(t,c.entra,c.entra+.3))),beams:(t>c.lyon&&t<c.falta)||(t>c.entra&&t<c.magia+1)?.14:.05,flash:(t>c.entra&&t<c.magia+1)?.22:(t>c.lyon&&t<c.falta?.1:(t<2.8?.08:0))});
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.4; document.getElementById('flash').style.opacity=0;
 C.render();
 let bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); let bh=bg?bg[2]:''; if(!bg&&t>=c.p1&&t<c.barthez) bh='PASO '+Math.max(1,stepsDone)+'<small>de 18</small>';
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};

