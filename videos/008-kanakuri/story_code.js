// ================= HISTORIA 008: tú eres Shizo Kanakuri (Estocolmo 1912 → 1967) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>typeof v==='number'?lerp(v,K[j+1][i+1],e):v);};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>typeof v==='number'?lerp(v,K[j+1][i+1],e):v);};
const kseg=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; return j;};
function signTex(l1,l2,bg='#0b1020',fg='#fff',ac='#ffd23f'){return canvasTex(768,320,(x,w,h)=>{x.fillStyle=bg;x.fillRect(0,0,w,h);x.strokeStyle=ac;x.lineWidth=10;x.strokeRect(8,8,w-16,h-16);
 x.fillStyle=fg;x.font='900 120px Nunito, sans-serif';x.textAlign='center';x.fillText(l1,w/2,150);x.fillStyle=ac;x.font='900 60px Nunito, sans-serif';x.fillText(l2,w/2,250);});}
function posterTex(found){return canvasTex(400,520,(x,w,h)=>{x.fillStyle='#efe6cf';x.fillRect(0,0,w,h);x.fillStyle=found?'#2e7d32':'#b3261e';x.font='900 52px Georgia, serif';x.textAlign='center';
 x.fillText(found?'¡ENCONTRADO!':'DESAPARECIDO',w/2,70);x.fillStyle='#ff9a4a';x.beginPath();x.arc(w/2,230,95,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(w/2-32,215,16,0,7);x.arc(w/2+32,215,16,0,7);x.fill();
 x.fillStyle='#111';x.beginPath();x.arc(w/2-32,218,7,0,7);x.arc(w/2+32,218,7,0,7);x.fill();x.fillStyle='#1d1b17';x.font='700 34px Georgia, serif';x.fillText('Corredor japonés',w/2,380);x.fillText('Maratón 1912',w/2,425);});}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 const pl=(w,d,col,x,z,y,o={})=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),M(col,Object.assign({roughness:1},o))); m.rotation.x=-Math.PI/2; m.position.set(x,y,z); W0.add(m); return m;};
 pl(160,60,0x2a4a26,-10,20,.02); pl(160,50,0x0e2a4a,-10,-35,.025,{roughness:.12,metalness:.35}); pl(160,40,0x34522a,-10,-80,.02);
 pl(75,5,0x8a6a44,3,0,.035); pl(44,4,0x8a6a44,0,-66,.035);
 // estadio de ladrillo (1912)
 const brick=M(0x9a4a32,{roughness:.85}), brickD=M(0x7a3828,{roughness:.9});
 for(const z of [-6.5,6.5]){const tw=new THREE.Mesh(new THREE.BoxGeometry(4,14,4),brick); tw.position.set(-36,7,z); W0.add(tw); const cap=new THREE.Mesh(new THREE.ConeGeometry(3,3.5,4),brickD); cap.rotation.y=Math.PI/4; cap.position.set(-36,15.7,z); W0.add(cap);}
 const arch=new THREE.Mesh(new THREE.BoxGeometry(4,2.5,17),brick); arch.position.set(-36,12.2,0); W0.add(arch);
 for(const z of [-1,1]){const w=new THREE.Mesh(new THREE.BoxGeometry(2,8,24),brickD); w.position.set(-37,4,z*20.5); W0.add(w);}
 pl(36,50,0x6b4a3a,-56,0,.03);
 const pos=[]; for(let r=0;r<5;r++){const wl=new THREE.Mesh(new THREE.BoxGeometry(3,2+r*1.6,46),brickD); wl.position.set(-66-r*3,1+r*.8,0); W0.add(wl); for(let k=0;k<30;k++) pos.push([-66-r*3,2.6+r*1.6,-21+k*1.45]);}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.6,1.1,.6),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const dm=new THREE.Object3D(), cc=new THREE.Color(); const cs=[0xd9d2c4,0x3a3a3a,0x6b5a4a,0xe8e0d0,0x2a3a5a];
 pos.forEach((p,k)=>{dm.position.set(p[0],p[1],p[2]); dm.updateMatrix(); im.setMatrixAt(k,dm.matrix); im.setColorAt(k,cc.setHex(cs[k%5]));}); W0.add(im);
 ST.board=new THREE.Mesh(new THREE.PlaneGeometry(10,4.2),new THREE.MeshBasicMaterial({map:signTex('MARATÓN','ESTOCOLMO 1912'),})); ST.board.position.set(-36,17.6,0); ST.board.rotation.y=Math.PI/2; W0.add(ST.board); ST.board2=new THREE.Mesh(ST.board.geometry,new THREE.MeshBasicMaterial({map:ST.board.material.map})); ST.board2.position.set(-36.05,17.6,0); ST.board2.rotation.y=-Math.PI/2; W0.add(ST.board2); ST.boardKey='';
 ST.tape=[-1,1].map(s=>{const g=new THREE.Group(); g.position.set(-37.5,2.6,s*3.2); const m=new THREE.Mesh(new THREE.BoxGeometry(.06,.12,3.2),new THREE.MeshBasicMaterial({color:0xffffff})); m.position.z=-s*1.6; g.add(m); W0.add(g); return g;});
 for(const z of [-3.3,3.3]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,2.8,8),M(0xdddddd)); p.position.set(-37.5,1.4,z); W0.add(p);}
 // árboles junto al camino
 const treeM=M(0x2f5a2a,{roughness:.9}), trunkM=M(0x5a3a22); for(let i=0;i<16;i++){const x=-28+i*4.6+rnd()*2, z=(i%2?1:-1)*(5.5+rnd()*3); if(x>1&&x<16&&z<0) continue; const t=new THREE.Group(); const c1=new THREE.Mesh(new THREE.ConeGeometry(1.6,4.5,8),treeM); c1.position.y=4; t.add(c1); const tr=new THREE.Mesh(new THREE.CylinderGeometry(.25,.3,2,6),trunkM); tr.position.y=1; t.add(tr); t.position.set(x,0,z); W0.add(t);}
 // granja roja con jardín
 const falu=M(0xa0282a,{roughness:.8}), white=M(0xf2efe6); const house=new THREE.Group(); house.position.set(12.5,0,-6.5); W0.add(house);
 const hb=new THREE.Mesh(new THREE.BoxGeometry(7,4.4,5),falu); hb.position.y=2.2; house.add(hb); const roof=new THREE.Mesh(new THREE.CylinderGeometry(.01,4.2,7.4,4,1),M(0x2a2a30)); roof.rotation.set(0,0,Math.PI/2); roof.rotation.order='ZYX'; roof.scale.set(1,1,.62); roof.position.y=5.4; house.add(roof);
 for(const x of [-2,2]){const w=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.2,.1),white); w.position.set(x,2.6,2.55); house.add(w);} const dr=new THREE.Mesh(new THREE.BoxGeometry(1.2,2.2,.1),white); dr.position.set(0,1.1,2.55); house.add(dr);
 const tbl=new THREE.Group(); tbl.position.set(6,0,-3.6); W0.add(tbl); const top=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.4,.15,24),white); top.position.y=1.7; tbl.add(top); const lg=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,1.7,8),white); lg.position.y=.85; tbl.add(lg);
 const jug=new THREE.Mesh(new THREE.CylinderGeometry(.25,.3,.7,16),M(0xff9a1a,{roughness:.3})); jug.position.set(-.4,2.12,0); tbl.add(jug); const plate=new THREE.Mesh(new THREE.CylinderGeometry(.55,.5,.06,20),white); plate.position.set(.45,1.8,.2); tbl.add(plate);
 for(let i=0;i<4;i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.17,12,8),M(0xc98a3a)); b.position.set(.45+Math.cos(i*1.6)*.25,1.92,.2+Math.sin(i*1.6)*.25); tbl.add(b);}
 const chair=new THREE.Mesh(new THREE.BoxGeometry(1.2,.15,1.2),M(0x7a5a3a)); chair.position.set(6.6,1.05,-5.2); W0.add(chair);
 ST.fam=[[0x5a7fa8,1.5,8.4,-2.4],[0xffc21a,1.45,4.2,-5.2],[0xff4fd8,.95,8.9,-4.3]].map(f=>{const h=human(f[0],f[1]); h.position.set(f[2],0,f[3]); h.rotation.y=Math.atan2(6-f[2],-3.6-f[3]); W0.add(h); return h;});
 // muelles, barco, Japón
 const plank=M(0x6a4a2a,{roughness:.9}); [[-31,-13],[18,-13],[0,-57]].forEach(d=>{const p=new THREE.Mesh(new THREE.BoxGeometry(3,.4,6),plank); p.position.set(d[0],.45,d[1]); W0.add(p);});
 ST.ship=new THREE.Group(); const hull=new THREE.Mesh(new THREE.BoxGeometry(3.4,1.6,9),M(0x1d2433,{roughness:.5})); hull.position.y=.9; ST.ship.add(hull);
 const bow=new THREE.Mesh(new THREE.ConeGeometry(1.7,2.4,4),M(0x1d2433)); bow.rotation.x=Math.PI/2; bow.rotation.y=Math.PI/4; bow.scale.set(1,1,.8); bow.position.set(0,.9,5.6); ST.ship.add(bow);
 const deck=new THREE.Mesh(new THREE.BoxGeometry(3.2,.15,8.6),M(0xc9a77a)); deck.position.y=1.75; ST.ship.add(deck); const cab=new THREE.Mesh(new THREE.BoxGeometry(2.2,1.6,2.6),white); cab.position.set(0,2.6,-2.4); ST.ship.add(cab);
 const fun=new THREE.Mesh(new THREE.CylinderGeometry(.4,.45,2,12),M(0xb3261e)); fun.position.set(0,4.2,-2.4); ST.ship.add(fun); W0.add(ST.ship);
 const red=M(0xd9381e,{roughness:.6}); const torii=new THREE.Group(); torii.position.set(6,0,-70); W0.add(torii); for(const x of [-2.6,2.6]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.3,.35,7,12),red); p.position.set(x,3.5,0); torii.add(p);}
 const b1=new THREE.Mesh(new THREE.BoxGeometry(8,.6,.6),M(0x1a1a1a)); b1.position.y=7.2; torii.add(b1); const b2=new THREE.Mesh(new THREE.BoxGeometry(6.4,.4,.4),red); b2.position.y=6; torii.add(b2);
 for(let i=0;i<8;i++){const t=new THREE.Group(); const c1=new THREE.Mesh(new THREE.SphereGeometry(1.6,10,8),M(0xd9a0c0,{roughness:.9})); c1.position.y=4; t.add(c1); const tr=new THREE.Mesh(new THREE.CylinderGeometry(.22,.3,3,6),trunkM); tr.position.y=1.5; t.add(tr); t.position.set(-20+i*5.5,0,-72-rnd()*4); W0.add(t);}
 ST.hemi=new THREE.HemisphereLight(0xbcd0ff,0x203018,.55); S.add(ST.hemi);
 // el sol
 ST.sun=new THREE.Mesh(new THREE.SphereGeometry(7,32,16),new THREE.MeshBasicMaterial({color:0xffd23f,fog:false})); ST.sun.position.set(-95,16,0); W0.add(ST.sun);
 // tú
 ST.J=new THREE.Group(); ST.J.rotation.order='YXZ'; ST.h=human(0xff9a4a,1.6); ST.h.position.y=-2.4; ST.J.add(ST.h); W0.add(ST.J); ST.head=ST.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 ST.hair=new THREE.Mesh(new THREE.SphereGeometry(.31,20,12,0,Math.PI*2,0,Math.PI*.5),M(0xeeeeee,{roughness:.9})); ST.hair.position.set(0,2.53,-.02); ST.h.add(ST.hair);
 ST.glasses=new THREE.Group(); for(const x of [-.11,.11]){const r=new THREE.Mesh(new THREE.TorusGeometry(.085,.018,6,16),M(0x111111)); r.position.set(x,2.56,.33); ST.glasses.add(r);} ST.h.add(ST.glasses);
 ST.bib=new THREE.Mesh(new THREE.PlaneGeometry(.5,.4),new THREE.MeshBasicMaterial({map:canvasTex(128,100,(x,w,h)=>{x.fillStyle='#fff';x.fillRect(0,0,w,h);x.fillStyle='#111';x.font='900 60px Nunito';x.textAlign='center';x.fillText('822',w/2,72);})})); ST.bib.position.set(0,1.75,.37); ST.h.add(ST.bib);
 ST.sash=new THREE.Mesh(new THREE.TorusGeometry(.42,.06,8,24),M(0xd9381e)); ST.sash.scale.set(1,1.6,1); ST.sash.rotation.set(Math.PI/2,0,.5); W0.add(ST.sash); ST.sash.visible=false;
 // corredores de 1912, alumnos en Japón, cámara de televisión
 ST.run=[0x3fb8ff,0xffc21a,0x7dff9a,0xb18cff,0xff4fd8].map((c,i)=>{const h=human(c,1.55); W0.add(h); h.userData.i=i; return h;});
 ST.kids=[0,1,2].map(i=>{const h=human(0xf2f2f2,1.35); W0.add(h); return h;});
 ST.tv=human(0x8a8f9c,1.5); const cam1=new THREE.Mesh(new THREE.BoxGeometry(.6,.5,.9),M(0x222222)); cam1.position.set(.3,2.5,.5); ST.tv.add(cam1); const tri=new THREE.Mesh(new THREE.ConeGeometry(.5,2,3,1,true),M(0x555555)); tri.position.set(.3,1,.5); ST.tv.add(tri); W0.add(ST.tv);
 ST.poster=new THREE.Group(); const pst=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,4,8),M(0x6a4a2a)); pst.position.y=2; ST.poster.add(pst); ST.pmesh=new THREE.Mesh(new THREE.PlaneGeometry(2.2,2.9),new THREE.MeshBasicMaterial({map:posterTex(false),side:THREE.DoubleSide})); ST.pmesh.position.set(0,3.6,.12); ST.poster.add(ST.pmesh); ST.poster.position.set(-3,0,3.2); ST.poster.rotation.y=.5; W0.add(ST.poster);
 ST.thermo=await icon3D('thermometer-high',0xff2d46,1.6,{depth:3}); W0.add(ST.thermo);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.2,{depth:2}); b.userData={x:(rnd()-.5)*10,y:5+rnd()*5,z:(rnd()-.5)*6,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.sun.castShadow=false; setupFX(); window.popsReady=true;};

function setupFX(){const c=TL.cues, W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 FX.burst('confetti',W([-38,8,0]),c.c54,180,undefined,1.2); FX.ring(W([-37.5,2.6,0]),c.c54,0xffd23f,3.5,.7,new THREE.Vector3(1,0,0));
 FX.burst('dust',W([-31,1,0]),c.pum,60); FX.ring(W([-30,.3,0]),c.pum,0xffffff,9,.7);
 FX.ring(W([-3,3.6,3.3]),c.desap,0xff2d46,5,.7,new THREE.Vector3(0,0,1));
 FX.burst('confetti',W([-38,9,0]),c.meta,240,undefined,1.4); FX.burst('confetti',W([-36,12,-6]),c.meta+.15,160); FX.burst('confetti',W([-36,12,6]),c.meta+.3,160);
 FX.ring(W([-37.5,2.6,0]),c.meta,0xffd23f,9,.9,new THREE.Vector3(1,0,0)); FX.burst('sparks',W([-36,17.6,0]),c.t54,90,[0xffd23f,0xffffff,0xff7a1a],1.2);
 const pts=[]; for(let r=0;r<5;r++) for(let k=0;k<30;k++) pts.push([ROOM.x-66-r*3,ROOM.y+3.2+r*1.6,ROOM.z-21+k*1.45]); FX.flashField(pts);}
let K=null;
function setupK(c){const end=TL.end;
 K={YOU:[[0,-30,0,'run'],[c.c54,-37.6,0,'run'],[c.c54+1.6,-39.5,0,'stand'],[c.eres,-39.5,0,'back'],[c.eres+.6,-31.5,-3,'back'],[c.eres+1.2,-31,-13,'deck'],[c.llegas+.3,-31,-13,'deck'],[c.llegas+1.0,-31,-11,'walk'],[c.calor,-31,-3,'walk'],
  [c.calor+.4,-30,0,'stand'],[c.corres,-30,0,'run'],[c.piernas,-6,0,'run'],[c.familia,4,0,'walk'],[c.familia+1.4,6,-2.4,'walk'],[c.sientas,6.6,-4.7,'sit'],[c.sientas+.35,6.6,-4.7,'sit'],[c.verg,6.6,-4.7,'sit'],
  [c.verg+.4,6.6,-4.7,'walk'],[c.verg+1.3,18,-12,'walk'],[c.verg+1.4,18,-13,'deck'],[c.suecia+.4,0,-55,'deck'],[c.suecia+1.3,0,-60,'walk'],[c.anos,-12,-66,'stand'],[c.japon,-12,-66,'run'],[c.relevos,4,-66,'run'],[c.hasta+.8,9,-66,'run'],[c.hasta+1.3,9.5,-66,'stand'],
  [c.termina+.2,9.5,-66,'walk'],[c.termina+.6,0,-59,'walk'],[c.termina+.7,0,-57,'deck'],[c.vuelves+.6,-31,-13,'deck'],[c.setenta+.4,-31.5,-2.5,'run'],[c.zancadas+.3,-33.5,-.6,'run'],[c.meta,-37.6,0,'run'],[c.meta+1.0,-39.5,0,'stand'],[c.pillas,-39.5,0,'back'],[c.loop+.15,-25.8,0,'run'],[end,-30,0,'run']],
  SHIP:[[0,-31,-15,-.67],[c.eres,-31,-15,-.67],[c.eres+1.2,-31,-15,0],[c.eres+2.3,-31,-34,0],[c.llegas+.3,-31,-15,0],[c.corres+.3,-31,-15,0],[c.corres+1.1,-29,-22,1.57],[c.verg-.5,14,-22,1.57],[c.verg+.4,18,-15.5,0],[c.verg+1.4,18,-15.5,0],[c.verg+2.0,16,-19,-2.71],[c.suecia+.4,0,-54,-2.71],[c.termina+.7,0,-54,-2.71],[c.termina+1.2,-3,-50,-.67],[c.vuelves+.6,-31,-15,-.67],[end,-31,-15,-.67]],
  AGE:[[0,1],[c.eres,1],[c.eres+1.2,0],[c.anos,0],[c.hasta+1.5,1],[1e9,1]]};}
function shipAt(t){const [x,z,yaw]=kf(K.SHIP,t); return {x,z,yaw};}
function poseHuman(h,mode,t,sp,ph=0){const U=h.userData; let r={lL:0,lR:0,aL:0,aR:0,pitch:0,y:0};
 if(mode==='run'||mode==='back'){const s=Math.sin(t*12+ph)*1.0*cl(sp/4); r={lL:s,lR:-s,aL:-s*.9,aR:s*.9,pitch:.15,y:Math.abs(Math.sin(t*12+ph))*.15};}
 else if(mode==='walk'){const s=Math.sin(t*8+ph)*.55*cl(sp/1.5); r={lL:s,lR:-s,aL:-s,aR:s,pitch:.05,y:0};}
 else if(mode==='sit'){r={lL:-1.5,lR:-1.5,aL:-.6,aR:-.3,pitch:-.05,y:-1.05};}
 U.lL.rotation.x=r.lL; U.lR.rotation.x=r.lR; U.aL.rotation.x=r.aL; U.aR.rotation.x=r.aR; return r;}
let lastYaw=-Math.PI/2;
const BIG=[["","record","54 AÑOS<small>para terminar un maratón</small>"],["record","estocolmo","<span style=\"font-size:120px\">RÉCORD OFICIAL</span><small>Guinness</small>"],["estocolmo","eres","<span style=\"font-size:120px\">ESTOCOLMO 1912</span>"],
 ["eres","llegas","<span style=\"font-size:110px\">SHIZO KANAKURI</span><small>uno de los 2 primeros de Japón</small>"],["llegas","pum","18 DÍAS<small>de viaje</small>"],["pum","sofocante","¡SALIDA!"],["sofocante","familia","¡CALOR!"],
 ["zumo","sientas","<span style=\"font-size:120px\">ZUMO Y BOLLOS</span>"],["novuelves","verg","<span style=\"font-size:110px\">NO TE LEVANTAS</span>"],["verg","suecia","VERGÜENZA"],["desap","anos","<span style=\"font-size:110px\">DESAPARECIDO</span><small>el misterio de Suecia</small>"],
 ["relevos","hasta","<span style=\"font-size:110px\">HAKONE EKIDEN</span><small>carrera de relevos</small>"],["termina","vuelves","<span style=\"font-size:100px\">«TERMINA LO QUE EMPEZASTE»</span>"],["setenta","zancadas","+70 AÑOS"],
 ["meta","oficial","¡META!"],["oficial","pregunta","54 AÑOS<small>8 meses · 6 días</small>"],["pregunta","leo","¿Y TÚ?"]];
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 // barco
 const sh=shipAt(t); ST.ship.position.set(sh.x,0,sh.z); ST.ship.rotation.y=sh.yaw; ST.ship.position.y=Math.sin(t*1.6)*.08;
 // tú
 const j=kseg(K.YOU,t); const A0=K.YOU[j], A1=K.YOU[Math.min(K.YOU.length-1,j+1)]; const mode=A0[3]; let [yx,yz]=kfl(K.YOU,t); const [x2,z2]=kfl(K.YOU,t+.05);
 const sp=Math.hypot(x2-yx,z2-yz)*20; let yy=2.4;
 const nxt=A1[3], eSeg=seg(t,A0[0],A1[0]); let animMode=mode;
 if(mode==='deck'&&nxt==='deck'){yx=sh.x; yz=sh.z; yy=4.3+ST.ship.position.y;}
 else if(mode==='deck'){yx=lerp(sh.x,A1[1],eSeg); yz=lerp(sh.z,A1[2],eSeg); yy=lerp(4.3,2.4,eSeg); animMode='walk';}
 else if(nxt==='deck'&&mode!=='stand'){yx=lerp(A0[1],sh.x,eSeg); yz=lerp(A0[2],sh.z,eSeg); yy=lerp(2.4,4.3,eSeg);}
 if(sp>.2&&!(mode==='deck'&&nxt==='deck')){const yw=Math.atan2(x2-yx,z2-yz); lastYaw=mode==='back'?yw+Math.PI:yw;}
 if(mode==='sit') lastYaw=Math.atan2(6-6.6,-3.6+4.7); if(mode==='stand'&&t>c.calor&&t<c.corres) lastYaw=Math.PI/2; if(mode==='deck') lastYaw=sh.yaw;
 const pr=poseHuman(ST.h,(mode==='deck'&&nxt==='deck')?'stand':animMode,t,sp); const A=kfl(K.AGE,t)[0];
 ST.J.position.set(yx,yy+pr.y,yz); ST.J.rotation.set(pr.pitch+.18*A,lastYaw,0);
 const tired=seg(t,c.llegas+.3,c.llegas+.8)*(1-seg(t,c.corres,c.corres+.3))+seg(t,c.mitad,c.piernas)*(1-seg(t,c.verg,c.verg+.8)); ST.head.rotation.x=.35*tired; if(tired>.3&&mode!=='run'){ST.h.userData.aL.rotation.x=.1; ST.h.userData.aR.rotation.x=.1;}
 ST.hair.scale.setScalar(Math.max(.01,A)); ST.hair.visible=A>.02; ST.glasses.visible=A>.5; ST.glasses.scale.setScalar(Math.max(.01,(A-.5)*2));
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)?.15:1,1));
 // cinta de meta
 const broken=(t>=c.c54-.05&&t<c.eres+.6)?1-seg(t,c.eres,c.eres+.6):(t>=c.meta-.05&&t<c.loop)?seg(t,c.meta-.05,c.meta+.3)*(1-seg(t,c.pillas,51.7)):0;
 const bk=Math.max(0,Math.min(1,broken)); ST.tape.forEach((g,i)=>{g.rotation.x=(i?-1:1)*bk*1.3; g.rotation.y=(i?1:-1)*bk*.6;});
 // marcador
 const res=(t>=c.c54&&t<c.eres)||(t>=c.t54&&t<c.loop); const key2=res?'54 AÑOS|8 MESES · 6 DÍAS':'MARATÓN|ESTOCOLMO 1912';
 if(key2!==ST.boardKey){ST.boardKey=key2; const [a,b]=key2.split('|'); ST.board.material.map=signTex(a,b); ST.board.material.needsUpdate=true; ST.board2.material.map=ST.board.material.map; ST.board2.material.needsUpdate=true;}
 // sol, calor y paso de los años
 const heat=seg(t,c.sofocante,c.sofocante+.6)*(1-seg(t,c.verg,c.verg+1)); ST.sun.scale.setScalar(1+heat*.6+Math.sin(t*9)*.03*heat);
 const yrs=seg(t,c.anos,c.hasta); const dayN=(t>c.anos&&t<c.hasta+.5)?.5+.5*Math.cos(yrs*Math.PI*2*14):1;
 ST.sun.position.set(-95+(t>c.anos&&t<c.hasta?Math.sin(yrs*Math.PI*2*14)*60:0),16+(t>c.anos&&t<c.hasta?Math.cos(yrs*Math.PI*2*14)*30-30:0),0);
 key.intensity=150*(.35+.65*dayN); ST.hemi.intensity=.55*(.5+.5*dayN); fill.intensity=80*(.4+.6*dayN);
 ST.thermo.visible=heat>.02&&t<c.mitad+1; if(ST.thermo.visible){ST.thermo.position.set(-29,7.2+Math.sin(t*3)*.2,0); ST.thermo.scale.setScalar(1.6*back(heat));}
 // corredores de 1912
 ST.run.forEach((h,i)=>{const v=t>c.llegas+.5&&t<c.verg+1; h.visible=v; if(!v) return; const z=-3.6+i*1.8; let x; if(t<c.calor) x=lerp(-39,-31,eio(seg(t,c.llegas+.5,c.calor+.3))); else if(t<c.corres) x=-31; else x=-31+(t-c.corres)*(9.2+i*.25);
  const moving=t>=c.corres||t<c.calor; h.position.set(x,moving&&t>=c.corres?Math.abs(Math.sin(t*12+i))*.15:0,z); h.rotation.y=Math.PI/2; poseHuman(h,t>=c.corres?'run':(moving?'walk':'stand'),t,6,i);});
 // familia
 ST.fam.forEach((h,i)=>{const wave=t>c.familia&&t<c.sientas; h.userData.aR.rotation.x=wave?-2.6+Math.sin(t*9+i)*.4:(t>c.zumo&&t<c.verg&&i===0?-1.2:0); walk(h,t,3,i,.05);});
 // cartel de desaparecido
 const pv=seg(t,c.suecia,c.suecia+.5); ST.poster.visible=pv>0&&t<c.meta; ST.poster.scale.setScalar(Math.max(.01,back(pv)));
 const found=t>c.tv+.4; if(ST.pfound!==found){ST.pfound=found; ST.pmesh.material.map=posterTex(found); ST.pmesh.material.needsUpdate=true;}
 // alumnos y relevo
 ST.kids.forEach((h,i)=>{const v=t>c.japon-.3&&t<c.tv+.5; h.visible=v; if(!v) return; const [kx]=kfl(K.YOU,t-.45*(i+1)); const vx=t<36.9?1:0; h.position.set(Math.max(-14,kx-2.6*(i+1)*vx-(1-vx)*(i+1)*2.4),0,-66+(i%2?.9:-.9)); h.rotation.y=vx?Math.PI/2:Math.atan2(yx-h.position.x,yz-h.position.z); poseHuman(h,vx?'run':'stand',t,vx?6:0,i);});
 const sv=t>c.entrenas&&t<c.hasta; ST.sash.visible=sv; if(sv){const hand=t<c.relevos+.6?ST.J:ST.kids[0]; const p=new THREE.Vector3(); (hand===ST.J?ST.h:ST.kids[0]).children[0].getWorldPosition(p); ST.sash.position.copy(p.sub(ROOM)); ST.sash.rotation.z=.5+t;}
 // cámara de televisión
 const tvIn=seg(t,c.tv-.4,c.tv+.5); ST.tv.visible=t>c.tv-.4&&t<40.4; ST.tv.position.set(lerp(18,13,eio(tvIn)),0,-65.2); ST.tv.rotation.y=-Math.PI/2; if(tvIn>0&&tvIn<1) walk(ST.tv,t,8,0,.6); else walk(ST.tv,t,8,0,0);
 // ---- CÁMARA [t, ángulo, distancia, altura, peso hacia ti, mirada x, y, z]
 const CK=[[0,-1.3,13,.25,1,-36,3.4,0],[c.c54,-1.2,12,.22,1,-36,3.6,0],[c.record,-1.1,22,.3,.5,-36,7.5,0],[c.eres,-1.25,16,.4,1,-36,3.4,0],[c.eres+.6,-1.15,22,1.4,.6,-33,3,-6],[c.eres+1.3,0,30,1.0,.5,-31,3,-14],[c.eres+1.9,.15,24,.38,.5,-31,3,-16],
  [c.llegas,.25,20,.35,.7,-31,3,-12],[c.calor,1.45,17,.1,.35,-36,6.5,0],[c.pum,1.3,15,.12,.5,-31,4,0],[c.corres+.6,.2,15,.22,1,0,3.2,0],[c.sofocante,.15,13,.5,1,0,3,0],[c.piernas,.3,10,.42,1,0,3,0],
  [c.familia,.5,15,.28,.55,6,3,-3.6],[c.sientas+.3,.25,8.5,.25,.5,6.5,2.6,-4.4],[c.novuelves,.35,7,.2,.5,6.5,2.6,-4.4],[c.verg+.4,.75,16,.3,1,0,3,0],[c.verg+2.4,.55,30,.5,.5,9,2,-30],[c.suecia+.3,.25,12,.2,0,-3,3.8,3],[c.desap+.2,.2,9,.15,0,-3,3.8,3],
  [c.anos+.5,.3,26,.42,.5,0,3,-64],[c.japon+.5,.25,17,.27,1,0,3,0],[c.relevos,.4,15,.27,1,0,3,0],[c.tv+.3,.55,16,.27,.7,12,3,-65.5],[c.termina+1.0,.75,36,.5,.5,-14,2,-34],[c.vuelves+.8,-.3,18,.3,1,0,3.2,0],
  [c.setenta,.6,16,.3,1,0,3.4,0],[c.zancadas,1.25,11,.18,1,-36,3.6,0],[c.meta,1.4,10,.15,1,-36,4,0],[c.meta+.5,.2,20,1.0,.7,-36,6,0],[c.meta+1.3,-1.2,18,.4,.6,-36,6,0],[c.oficial+.3,-1.12,30,.28,.45,-36,12,0],[c.pregunta,-1.0,18,.3,.8,-36,4,0],
  [c.pillas,-1.2,15,.27,1,-36,3.4,0],[end-.2,-1.3,13,.25,1,-36,3.4,0],[1e9,-1.3,13,.25,1,-36,3.4,0]];
 const [ca,cd,chh,cw,lx,ly,lz]=kf(CK,t); const T=new THREE.Vector3(lx,0,lz).lerp(new THREE.Vector3(yx,0,yz),cw); const Lw=ROOM.clone().add(new THREE.Vector3(T.x,ly+(cw>.5&&mode==='deck'?1.6:0),T.z));
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd));
 let pk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.5) pk=Math.max(pk,Math.exp(-dd*7));});
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*pk*.3; cam.position.y+=Math.cos(t*61)*pk*.3; cam.lookAt(Lw); cam.near=.1; cam.fov=50-pk*6-6*seg(t,c.zancadas,c.meta)*(1-seg(t,c.meta,c.meta+.6)); cam.updateProjectionMatrix();
 if(ST.thermo.visible) ST.thermo.lookAt(cam.position);
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.2); b.position.set(yx+q.x,q.y+Math.sin(t*2+q.ph)*.3,yz+q.z); b.lookAt(cam.position);});
 const kb=new THREE.Vector3(Lw.x,0,Lw.z); key.position.set(kb.x+8,30,kb.z+16); keyT.position.set(kb.x,3,kb.z); fill.position.set(kb.x-16,12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,6,kb.z-6);
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true;
 sky.position.copy(cam.position);
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.4; document.getElementById('flash').style.opacity=0;
 const fin=seg(t,c.zancadas-.3,c.zancadas+.3)*(1-seg(t,c.oficial+.6,c.oficial+1.2)), hk=t<c.c54+1.2?1-seg(t,c.c54+.6,c.c54+1.2):0;
 FX.update(t,{cine:Math.max(fin,hk*.8),vig:Math.max(.55*seg(t,c.piernas,c.sientas)*(1-seg(t,c.verg,c.verg+.6)),.3*fin),flash:(t>c.meta-.2&&t<c.oficial+1)?.18:(t<c.c54+1?.12:0)});
 C.render();
 let bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); let bh=bg?bg[2]:'';
 if(!bg&&t>=c.anos&&t<c.termina){const yr=Math.round(lerp(1912,1967,eio(seg(t,c.anos,c.y1967+.3)))); bh=yr+'<small>'+(t<c.japon?'pasan los años':t<c.hasta?'en Japón':'la televisión te encuentra')+'</small>';}
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
