// ================= HISTORIA 014: tú eres Bob Beamon (México, 1968) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const UM=2.4, ZREC=-8.35*UM, ZJ=-8.90*UM, ZSTART=48, RAILX=4.2, RAILEND=-8.5*UM, PEAK=3.6;
const flight=u=>new THREE.Vector3(0,PEAK*4*u*(1-u),ZJ*u);
function boardTex(l1,l2,col){return canvasTex(1024,512,(x,w,h)=>{x.fillStyle='#0a0d14';x.fillRect(0,0,w,h);x.strokeStyle='#3a4256';x.lineWidth=14;x.strokeRect(10,10,w-20,h-20);
 x.fillStyle='#ffd23f';x.font='900 92px Nunito, sans-serif';x.textAlign='center';x.fillText(l1,w/2,150);x.fillStyle=col;x.font='900 210px Nunito, sans-serif';x.fillText(l2,w/2,390);});}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 const grass=new THREE.Mesh(new THREE.PlaneGeometry(60,160),M(0x2f6b34,{roughness:.95})); grass.rotation.x=-Math.PI/2; grass.position.set(0,.01,-10); W0.add(grass);
 const run=new THREE.Mesh(new THREE.PlaneGeometry(3.2,62),M(0xb5523b,{roughness:.85})); run.rotation.x=-Math.PI/2; run.position.set(0,.03,31); W0.add(run);
 const lane=new THREE.Mesh(new THREE.PlaneGeometry(14,160),M(0xa84a35,{roughness:.9})); lane.rotation.x=-Math.PI/2; lane.position.set(-16,.02,-10); W0.add(lane);
 const board=new THREE.Mesh(new THREE.BoxGeometry(3.2,.06,.5),M(0xf4f4f4)); board.position.set(0,.05,-.25); W0.add(board);
 const pit=new THREE.Mesh(new THREE.BoxGeometry(5,.2,26),M(0xe0c48c,{roughness:1})); pit.position.set(0,.02,-14.5); W0.add(pit);
 const rim=M(0xdddddd); for(const s of [-1,1]){const r=new THREE.Mesh(new THREE.BoxGeometry(.2,.3,26.4),rim); r.position.set(s*2.6,.1,-14.5); W0.add(r);}
 ST.recL=new THREE.Mesh(new THREE.BoxGeometry(5.6,.05,.14),new THREE.MeshBasicMaterial({color:0xffffff})); ST.recL.position.set(0,.16,ZREC); W0.add(ST.recL);
 ST.recF=new THREE.Mesh(new THREE.ConeGeometry(.25,.9,4),M(0xffffff)); ST.recF.position.set(-3,.45,ZREC); W0.add(ST.recF);
 ST.jL=new THREE.Mesh(new THREE.BoxGeometry(5.6,.05,.16),new THREE.MeshBasicMaterial({color:0xffd23f})); ST.jL.position.set(0,.17,ZJ); W0.add(ST.jL);
 ST.peg=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.8,8),M(0xd92a2a)); ST.peg.position.set(0,.4,ZJ); W0.add(ST.peg);
 // medidor óptico y su raíl
 const rail=new THREE.Mesh(new THREE.BoxGeometry(.25,.25,RAILEND*-1+4),M(0x8a8f9c,{metalness:.6,roughness:.3})); rail.position.set(RAILX,.6,(RAILEND-4)/2); W0.add(rail);
 for(let z=-4;z>=RAILEND;z-=4){const l=new THREE.Mesh(new THREE.BoxGeometry(.15,.6,.15),M(0x6a6f7c)); l.position.set(RAILX,.3,z); W0.add(l);}
 ST.opt=new THREE.Group(); const ob=new THREE.Mesh(new RoundedBoxGeometry(1.1,.8,1.1,2,.1),M(0x2a62d8,{metalness:.3})); ob.position.y=.4; ST.opt.add(ob);
 const lens=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.5,16),M(0x1a1c22,{metalness:.8})); lens.rotation.z=Math.PI/2; lens.position.set(-.7,.5,0); ST.opt.add(lens);
 const arm=new THREE.Mesh(new THREE.BoxGeometry(3.2,.08,.08),M(0xffd23f)); arm.position.set(-2,.75,0); ST.opt.add(arm); W0.add(ST.opt);
 // cinta métrica
 ST.tape=new THREE.Mesh(new THREE.BoxGeometry(.12,.03,1),new THREE.MeshBasicMaterial({color:0xffd23f})); W0.add(ST.tape);
 // marcador
 ST.texA=boardTex('BEAMON · USA','—.——','#7fd4ff'); ST.texB=boardTex('BEAMON · USA','8.90 m','#ffffff');
 ST.scr=new THREE.Mesh(new THREE.PlaneGeometry(18,9),new THREE.MeshBasicMaterial({map:ST.texA})); ST.scr.position.set(0,12,-60); W0.add(ST.scr);
 const sf=new THREE.Mesh(new THREE.BoxGeometry(19,10,1),M(0x1a1c22)); sf.position.set(0,12,-60.6); W0.add(sf); for(const s of [-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.8,8,.8),M(0x30343c)); p.position.set(s*7,4,-60.6); W0.add(p);}
 // gradas y público
 const pos=[]; const cs=[0xd9d2c4,0x2a62d8,0xffd23f,0x2e9a4a,0xffffff,0x3a3f4a,0xd92a2a]; const stM=M(0x22262f,{roughness:.8});
 for(const s of [-1,1]) for(let r=0;r<7;r++){const x=s*(26+r*2.8); const st=new THREE.Mesh(new THREE.BoxGeometry(2.8,1.6+r*1.6,130),stM); st.position.set(x,.8+r*.8,-5); W0.add(st); for(let k=0;k<50;k++) pos.push([x,2.2+r*1.6,-68+k*2.6]);}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.7,1.2,.7),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const dm=new THREE.Object3D(), cc=new THREE.Color();
 pos.forEach((p,k)=>{dm.position.set(p[0],p[1],p[2]); dm.updateMatrix(); im.setMatrixAt(k,dm.matrix); im.setColorAt(k,cc.setHex(cs[k%7]));}); W0.add(im); ST.crowd=im; ST.cpos=pos;
 // personajes
 const mk=(col,sc=1.6)=>{const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,sc); J.add(h); W0.add(J); return {J,h};};
 ST.you=mk(0xff9a4a); ST.head=ST.you.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 ST.ghost=human(0xffd23f,1.6); ST.ghost.traverse(o=>{if(o.isMesh){o.material=new THREE.MeshBasicMaterial({color:0xffd23f,transparent:true,opacity:.45,depthWrite:false});}}); W0.add(ST.ghost);
 const pts=[]; for(let i=0;i<=60;i++) pts.push(flight(i/60).add(new THREE.Vector3(0,2.2,0))); ST.trail=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),120,.1,8,false),new THREE.MeshBasicMaterial({color:0xffd23f})); W0.add(ST.trail); ST.trailN=ST.trail.geometry.index.count;
 ST.judges=[0,1].map(i=>{const j=mk(0xf2f2f2,1.5); return j;});
 ST.mate=mk(0x2a62d8); ST.ath=[0xd92a2a,0x2e9a4a,0xffc21a].map((c,i)=>{const a=mk(c); a.J.position.set(-8-i*1.8,0,-12-i*2.2); a.J.rotation.y=Math.PI/2; return a;});
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.4,{depth:2}); b.userData={x:(rnd()-.5)*10,y:3+rnd()*6,z:(rnd()-.5)*6,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; window.popsReady=true;};
let K=null;
function setupK(c){K=true; const W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 FX.burst('dust',W([0,.3,ZJ]),c.caes,90,undefined,1.4); FX.ring(W([0,.25,ZJ]),c.caes,0xffd23f,5,.8);
 FX.burst('sparks',W([RAILX,.8,RAILEND]),c.sale,50,[0xffffff,0xffd23f],1);
 FX.burst('confetti',W([0,16,ZJ-6]),c.noventa+.1,220,[0xffd23f,0x2a62d8,0xd92a2a,0xffffff],1.6); FX.burst('confetti',W([-14,14,ZJ+4]),c.noventa+.3,160); FX.ring(W([0,12,-59.4]),c.noventa,0xffd23f,9,.9,new THREE.Vector3(0,0,1));
 FX.burst('confetti',W([-5,12,ZJ]),c.rodillas+.2,160,[0xffd23f,0xffffff,0xff4fd8]);
 FX.ring(W([0,.3,ZJ]),c.nadie2,0xffd23f,6,.9); FX.burst('sparks',W([0,3,ZJ]),c.nadie2+.1,110,[0xffd23f,0xffffff],1.4);
 [[-24,32,-40],[24,32,-40],[-24,32,30],[24,32,30]].forEach((p,i)=>FX.beam(W(p),0xfff2d0,40,i*1.3));
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
const S120=s=>'<span style="font-size:120px">'+s+'</span>', S100=s=>'<span style="font-size:100px">'+s+'</span>';
const BIG=[["","literal","8,90 m"],["literal","como",S120("¡NO LLEGABA!")],["como","mexico",S100("HASTA EL FINAL")],["mexico","eres",S120("MÉXICO 1968")+"<small>final olímpica de longitud</small>"],["eres","record",S100("BOB BEAMON")],
 ["record","primer","8,35 m<small>récord del mundo</small>"],["primer","corres",S120("1.<sup>er</sup> SALTO")],["despegas","caes",S120("¡EN EL AIRE!")],["caes","jueces",S120("¡LEJÍSIMOS!")],["jueces","sale",S100("MEDIDOR ÓPTICO")],["sale","nadie",S120("¡NO LLEGA!")],
 ["cinta","marcador",S120("A MANO")+"<small>con cinta métrica</small>"],["noventa","pies","8,90 m<small>55 cm más que el récord</small>"],["traduce","rodillas","29 pies<small>y 2½ pulgadas</small>"],
 ["altitud","nadie2",S100("ALTITUD + VIENTO")+"<small>2,0 m/s: justo el límite</small>"],["nadie2","pregunta",S100("NADIE VOLÓ ASÍ")],["pregunta","leo","¿Y TÚ?"]];
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 // ---- tú: vuelo del gancho, rebobinado, carrera, salto, aterrizaje, rodillas
 const U2=ST.you.h.userData; let p=new THREE.Vector3(0,0,ZSTART), yaw=Math.PI, mode='stand';
 const hookU=.3+.35*seg(t,0,c.como), landP=new THREE.Vector3(0,0,ZJ), sideP=new THREE.Vector3(-5.5,0,ZJ+3);
 if(t<c.como){p=flight(hookU); mode='fly';}
 else if(t<c.mexico){const a=eio(seg(t,c.como,c.mexico-.4)); p=flight(.65).lerp(new THREE.Vector3(0,0,ZSTART),a); p.y=flight(.65).y*(1-a); mode=a<.9?'fly':'stand';}
 else if(t<c.corres){p.set(0,0,ZSTART);}
 else if(t<c.despegas){const a=seg(t,c.corres,c.despegas); p.set(0,0,ZSTART*(1-Math.pow(a,1.35))); mode='run';}
 else if(t<c.caes){p=flight(seg(t,c.despegas,c.caes)); mode='fly';}
 else if(t<c.lejisimos+.6){p=landP.clone(); mode='land';}
 else if(t<c.loop-.3){const a=eio(seg(t,c.lejisimos+.6,c.jueces+.4)); p=landP.clone().lerp(sideP,a); mode=a>0&&a<1?'walk':'stand'; yaw=a<1?Math.PI/2+Math.PI:-.6;
  if(t>=c.pies) yaw=2.26; if(t>=c.rodillas) mode='knees'; if(t>=c.anos+.8) mode='arms';}
 else {const a=eio(seg(t,c.loop-.3,c.loop+.7)); p=sideP.clone().lerp(flight(.3),a); mode='fly';}
 ST.you.J.position.copy(p); ST.you.J.rotation.set(0,yaw,0);
 const h=ST.you.h; h.position.set(0,0,0); h.rotation.set(0,0,0); U2.aL.rotation.set(0,0,0); U2.aR.rotation.set(0,0,0); U2.lL.rotation.set(0,0,0); U2.lR.rotation.set(0,0,0);
 if(mode==='run'){walk(h,t,16,0,1.1); h.rotation.x=.18;}
 else if(mode==='walk'){walk(h,t,8,0,.6);}
 else if(mode==='fly'){const k=Math.sin(t*7); U2.aL.rotation.x=-2.6+k*.4; U2.aR.rotation.x=-2.6-k*.4; U2.lL.rotation.x=-.9+k*.7; U2.lR.rotation.x=-.9-k*.7; h.rotation.x=-.12;}
 else if(mode==='land'){U2.lL.rotation.x=U2.lR.rotation.x=-1.4; U2.aL.rotation.x=U2.aR.rotation.x=-1.2; h.position.y=-.9;}
 else if(mode==='knees'){U2.lL.rotation.x=U2.lR.rotation.x=1.5; h.position.y=-1.1; const a=seg(t,c.rodillas,c.rodillas+.5); U2.aL.rotation.x=U2.aR.rotation.x=-2.7*a; U2.aL.rotation.z=.5*a; U2.aR.rotation.z=-.5*a; h.rotation.x=.25*a;}
 else if(mode==='arms'){const a=seg(t,c.anos+.8,c.anos+1.3); U2.aL.rotation.x=U2.aR.rotation.x=-2.8*a; U2.lL.rotation.x=U2.lR.rotation.x=0;}
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)||(t>c.rodillas&&t<c.rodillas+.8)?.15:1,1));
 // ---- marcas
 ST.recL.visible=ST.recF.visible=t>=c.record||t<c.como; ST.jL.visible=t>=c.noventa||t<c.como; ST.peg.visible=t>=c.nollega&&t<c.loop;
 // ---- medidor óptico: recorre el raíl y se sale al final
 const oz=lerp(-6,RAILEND,eio(seg(t,c.jueces,c.sale))); const off=seg(t,c.sale,c.sale+.7); ST.opt.position.set(RAILX,.75-off*off*.75,oz-off*1.2); ST.opt.rotation.set(-off*1.1,0,off*.4);
 // ---- jueces y cinta
 const j0=ST.judges[0], j1=ST.judges[1]; j0.J.position.set(RAILX+1.6,0,lerp(-8,RAILEND+1,seg(t,c.jueces,c.sale))); j0.J.rotation.y=-Math.PI/2;
 const tp=seg(t,c.cinta,c.pasan+.4); j1.J.position.set(lerp(3.4,1.4,tp),0,lerp(ZJ+3,0,eio(tp))); j1.J.rotation.y=tp>0&&tp<1?0:-Math.PI/2; if(tp>0&&tp<1) walk(j1.h,t,8,0,.6);
 ST.tape.visible=t>=c.cinta&&t<c.anos; const tl=Math.max(.01,-ZJ*eio(tp)); ST.tape.scale.z=tl; ST.tape.position.set(.8,.2,ZJ+tl/2);
 // ---- compañero que te traduce
 ST.mate.J.position.set(-3.3,0,ZJ+1.2); ST.mate.J.rotation.y=Math.atan2(-2.2,1.8); const mu=ST.mate.h.userData; mu.aR.rotation.x=t>c.traduce&&t<c.rodillas?-1.6+Math.sin(t*9)*.3:0; mu.aL.rotation.x=t>=c.rodillas&&t<c.pregunta?-2.6:0;
 ST.ath.forEach((a,i)=>{const au=a.h.userData; const cheer=(t>c.noventa&&t<c.pregunta)?-2.6+Math.sin(t*10+i)*.4:0; au.aL.rotation.x=au.aR.rotation.x=cheer;});
 // ---- marcador
 ST.scr.material.map=t>=c.noventa&&t<c.loop?ST.texB:ST.texA;
 // ---- repetición fantasma: nadie había volado así
 const gu=seg(t,c.nadie2,c.nadie2+1.6); ST.ghost.visible=gu>0&&gu<1; if(ST.ghost.visible){const g=flight(gu); ST.ghost.position.copy(g); ST.ghost.rotation.set(-.12,Math.PI,0); const gk=ST.ghost.userData; gk.aL.rotation.x=gk.aR.rotation.x=-2.6; gk.lL.rotation.x=-.9; gk.lR.rotation.x=-.5;}
 const trv=Math.max(seg(t,c.nadie2,c.nadie2+1.6),t<c.como?1:0)*(t<c.pregunta||t<c.como?1:0); ST.trail.visible=trv>0; ST.trail.geometry.setDrawRange(0,Math.floor(ST.trailN*trv/3)*3);
 // ---- CÁMARA
 const youW=p.clone().setY(0), optW=new THREE.Vector3(RAILX,0,ST.opt.position.z), scrW=new THREE.Vector3(0,0,-60), midW=new THREE.Vector3(0,0,ZJ/2);
 let L=youW.clone(), ly=2.6;
 if(t>=c.jueces&&t<c.cinta){L=youW.clone().lerp(optW,seg(t,c.jueces-.3,c.jueces+.6));}
 else if(t>=c.cinta&&t<c.marcador){L=optW.clone().lerp(midW,seg(t,c.cinta-.2,c.cinta+.8));}
 else if(t>=c.marcador&&t<c.pies){L=midW.clone().lerp(scrW,eio(seg(t,c.marcador-.3,c.marcador+.6))); ly=lerp(2.6,12,seg(t,c.marcador-.3,c.marcador+.6));}
 else if(t>=c.pies&&t<c.pies+.9){L=scrW.clone().lerp(youW,eio(seg(t,c.pies,c.pies+.9))); ly=lerp(12,2,seg(t,c.pies,c.pies+.9));}
 else if(t>=c.nadie2&&t<c.pregunta){L=youW.clone().lerp(midW,seg(t,c.nadie2-.3,c.nadie2+.4)); ly=2.6;}
 const TP=Math.PI*2;
 const CK=[[0,1.3,11,.12,0],[c.literal,1.6,12,.15,0],[c.como,1.9,12,.2,0],[c.mexico,.25,28,.3,0],[c.final,.1,32,.35,0],[c.eres,2.9,8,.15,0],[c.record,2.7,9,.15,0],[c.primer,3.0,7,.1,0],[c.silencio,2.9,6.5,.08,0],
  [c.corres,.5,11,.18,0],[c.pisas,1.4,10,.12,0],[c.despegas,1.55,11,.1,0],[c.aire,1.7,12,.05,0],[c.sigues,1.8,12,.08,0],[c.caes,1.5,10,.25,0],[c.lejisimos,1.0,12,.4,0],[c.mas,.7,16,.6,0],
  [c.jueces,1.2,12,.35,0],[c.sale,1.5,9,.2,0],[c.nollega,1.7,10,.25,0],[c.cinta,.9,24,.5,0],[c.pasan,.6,26,.55,0],[c.marcador,.05,30,.1,0],[c.noventa,0,26,.05,0],[c.cincuenta,.1,30,.08,0],
  [c.pies,1.2,10,.15,0],[c.traduce,1.3,8.5,.12,0],[c.rodillas,1.4,7,.15,0],[c.anos,1.5,8,.2,0],[c.altitud,1.6,11,.3,0],[c.nadie2,1.57,19,.15,0],[c.nadie2+1.6,1.4,20,.2,0],
  [c.pregunta,1.0,13,.3,0],[c.pillas,.9,14,.3,0],[c.loop,1.0,11,.12,0],[end,1.3,11,.12,0],[1e9,1.3,11,.12,0]];
 let [ca,cd,chh]=kf(CK,t); const Lw=ROOM.clone().add(L).add(new THREE.Vector3(0,ly+(mode==='fly'?p.y:0),0));
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd)); if(P.y<ROOM.y+.6) P.y=ROOM.y+.6;
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.6) pkk=Math.max(pkk,Math.exp(-dd*6));}); const shake=pkk*1.2;
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*shake*.12; cam.position.y+=Math.cos(t*61)*shake*.12; cam.lookAt(Lw); cam.near=.1; cam.far=900;
 cam.fov=50-pkk*3-8*seg(t,c.zancada,c.despegas)*(1-seg(t,c.despegas,c.despegas+.6))-6*seg(t,c.traduce,c.rodillas)*(1-seg(t,c.rodillas+.3,c.anos)); cam.updateProjectionMatrix();
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.3); b.position.set(L.x+q.x,q.y,L.z+q.z); b.lookAt(cam.position);});
 const kb=Lw.clone(); key.position.set(kb.x+8,kb.y+26,kb.z+14); keyT.position.copy(kb); fill.position.set(kb.x-16,kb.y+12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,kb.y+6,kb.z-6); key.distance=220; key.angle=.9;
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true; parts.material.opacity=.3;
 sky.position.copy(cam.position);
 const cine=Math.max(t<c.como?.6:0,seg(t,c.primer,c.primer+.4)*(1-seg(t,c.caes+.4,c.caes+1)),seg(t,c.traduce,c.traduce+.4)*(1-seg(t,c.anos,c.anos+.6)),seg(t,c.nadie2-.2,c.nadie2+.2)*(1-seg(t,c.pregunta-.3,c.pregunta)));
 FX.update(t,{cine,vig:Math.max(.45*seg(t,c.primer,c.primer+.4)*(1-seg(t,c.despegas,c.despegas+.4)),.35*seg(t,c.mano,c.mano+.4)*(1-seg(t,c.noventa,c.noventa+.3))),beams:(t>c.noventa&&t<c.pregunta)?.14:.06,
  flash:(t>c.noventa&&t<c.pies)||(t>c.rodillas&&t<c.anos+1)?.22:(t>c.despegas&&t<c.caes?.12:(t>c.mexico&&t<c.primer?.08:0))});
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.35; document.getElementById('flash').style.opacity=0;
 C.render();
 let bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); let bh=bg?bg[2]:'';
 if(!bg&&t>=c.anos&&t<c.altitud) bh=Math.round(lerp(1968,1991,eio(seg(t,c.anos+.2,c.altitud-.4))))+'<small>23 años de récord</small>';
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
