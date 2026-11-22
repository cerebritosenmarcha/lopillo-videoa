// ================= HISTORIA 015: tú eres Eric Moussambani (Sídney, 2000) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const PL=60, DECK=.6, LX=2.5;
function boardTex(l1,l2){return canvasTex(1024,512,(x,w,h)=>{x.fillStyle='#0a0d14';x.fillRect(0,0,w,h);x.strokeStyle='#3a4256';x.lineWidth=14;x.strokeRect(10,10,w-20,h-20);
 x.fillStyle='#ffd23f';x.font='900 80px Nunito, sans-serif';x.textAlign='center';x.fillText(l1,w/2,140);x.fillStyle='#ffffff';x.font='900 180px Nunito, sans-serif';x.fillText(l2,w/2,380);});}
function ropeTex(){return canvasTex(64,512,(x,w,h)=>{for(let i=0;i<24;i++){x.fillStyle=['#d92a2a','#ffffff','#2a62d8'][i%3];x.fillRect(0,i*h/24,w,h/24);}});}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 const floorP=new THREE.Mesh(new THREE.PlaneGeometry(42,PL+2),new THREE.MeshStandardMaterial({map:canvasTex(512,512,(x,w,h)=>{x.fillStyle='#bfe6f5';x.fillRect(0,0,w,h);x.fillStyle='#1a2a4a';for(let i=0;i<8;i++) x.fillRect(w*(i+.5)/8-4,20,8,h-40);}),roughness:.6}));
 floorP.rotation.x=-Math.PI/2; floorP.position.set(0,-4,-PL/2); W0.add(floorP);
 ST.water=new THREE.Mesh(new THREE.PlaneGeometry(42,PL+2,1,1),new THREE.MeshStandardMaterial({color:0x1a8fd6,emissive:0x0b4f86,emissiveIntensity:.45,transparent:true,opacity:.8,roughness:.12,metalness:.15})); ST.water.rotation.x=-Math.PI/2; ST.water.position.set(0,.03,-PL/2); floor.visible=false; ST.water.receiveShadow=true; W0.add(ST.water);
 const deckM=M(0xe8e4dc,{roughness:.7}); for(const [w,d,x,z] of [[90,14,0,8],[90,14,0,-PL-8],[24,PL+30,-33,-PL/2],[24,PL+30,33,-PL/2]]){const dk=new THREE.Mesh(new THREE.BoxGeometry(w,DECK+4,d),deckM); dk.position.set(x,DECK/2-2,z); W0.add(dk);}
 const rt=ropeTex(); rt.wrapT=THREE.RepeatWrapping; rt.repeat.set(1,10); for(let i=-3;i<=3;i++){const r=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,PL,10),new THREE.MeshStandardMaterial({map:rt,roughness:.5})); r.rotation.x=Math.PI/2; r.position.set(i*5,.08,-PL/2); W0.add(r);}
 // poyetes de salida
 ST.blocks=[]; for(let i=-3;i<=4;i++){const x=(i-.5)*5; const b=new THREE.Mesh(new THREE.BoxGeometry(2.2,1.2,2),M(i===0||i===1?0xffd23f:0xd9dce3)); b.position.set(x,DECK+.6,1.4); W0.add(b); const n=new THREE.Mesh(new THREE.BoxGeometry(2.2,.3,.1),M(0x1a1c22)); n.position.set(x,DECK+.9,.38); W0.add(n);}
 // marcador
 ST.texA=boardTex('100 m LIBRES · SERIE 1','MOUSSAMBANI'); ST.texB=boardTex('1. MOUSSAMBANI · GEQ','1:52.72');
 ST.scr=new THREE.Mesh(new THREE.PlaneGeometry(20,10),new THREE.MeshBasicMaterial({map:ST.texA})); ST.scr.position.set(0,14,-PL-14); W0.add(ST.scr);
 const sf=new THREE.Mesh(new THREE.BoxGeometry(21,11,1),M(0x1a1c22)); sf.position.set(0,14,-PL-14.6); W0.add(sf);
 // gradas y público
 const pos=[]; const cs=[0xd9d2c4,0x2a62d8,0xffd23f,0x2e9a4a,0xffffff,0x3a3f4a,0xd92a2a]; const stM=M(0x22262f,{roughness:.8});
 for(const s of [-1,1]) for(let r=0;r<8;r++){const x=s*(26+r*2.6); const st=new THREE.Mesh(new THREE.BoxGeometry(2.6,1.6+r*1.6,90),stM); st.position.set(x,.8+r*.8,-PL/2); W0.add(st); for(let k=0;k<40;k++) pos.push([x,2.2+r*1.6,-PL/2-43+k*2.2,(k*7+r*3)%10/10]);}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.7,1.2,.7),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const cc=new THREE.Color(); ST.dm=new THREE.Object3D();
 pos.forEach((p,k)=>{ST.dm.position.set(p[0],p[1],p[2]); ST.dm.updateMatrix(); im.setMatrixAt(k,ST.dm.matrix); im.setColorAt(k,cc.setHex(cs[k%7]));}); W0.add(im); ST.crowd=im; ST.cpos=pos;
 // personajes
 const mk=(col,sc=1.6)=>{const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,sc); J.add(h); W0.add(J); return {J,h};};
 ST.you=mk(0xff9a4a); ST.head=ST.you.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 const cap=new THREE.Mesh(new THREE.SphereGeometry(.32,16,10,0,Math.PI*2,0,Math.PI*.55),M(0x2e9a4a)); cap.position.y=.03; ST.head.add(cap);
 ST.riv=[[0x2a62d8,-2.5],[0xd92a2a,7.5]].map(r=>{const a=mk(r[0]); a.x=r[1]; return a;});
 ST.xs=[]; for(let i=0;i<2;i++){const x=await icon3D('close-circle',0xff2d46,1.3,{depth:3}); W0.add(x); ST.xs.push(x);}
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.4,{depth:2}); b.userData={x:(rnd()-.5)*10,y:3+rnd()*6,z:(rnd()-.5)*6,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; ST.water.castShadow=false; window.popsReady=true;};
let K=null;
function swimZ(t,c){return kfl(K.Z,t)[0];}
function setupK(c){const end=TL.end;
 K={Z:[[0,-30],[c.como,-24],[c.saltas+.3,-4],[c.pared,-PL+1],[c.vuelta,-PL+1],[c.pesan,-46],[c.paras,-36],[c.pie,-34],[c.voz,-24],[c.brazo,-16],[c.nollega,-7],[c.tocas,-1],[1e9,-1]]};
 const W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 FX.ring(W([LX,.15,-4]),c.saltas+.3,0xffffff,5,.8); FX.burst('sparks',W([LX,.4,-4]),c.saltas+.3,80,[0xffffff,0x9fdcff],1.2);
 [-2.5,7.5].forEach(x=>{FX.burst('sparks',W([x,.4,-6]),c.rivales+.5,40,[0xffffff,0x9fdcff],.9);});
 FX.ring(W([LX,.2,-PL+.5]),c.pared,0xffffff,4,.6);
 for(let tt=c.saltas+.6;tt<c.tocas;tt+=(tt>c.pesan&&tt<c.pie?.75:.45)){const z=kfl(K.Z,tt)[0]; FX.burst('sparks',W([LX+(Math.round(tt*5)%2?.9:-.9),.3,z+(tt<c.pared?-1.6:1.6)]),tt,12,[0xffffff,0x9fdcff],.5);}
 FX.ring(W([LX,.2,-.8]),c.tocas,0xffd23f,6,.9); FX.burst('sparks',W([LX,1.2,-.8]),c.tocas,120,[0xffd23f,0xffffff],1.4);
 FX.burst('confetti',W([0,16,-10]),c.tocas+.15,220,[0xffd23f,0x2e9a4a,0xd92a2a,0x2a62d8,0xffffff],1.6); FX.burst('confetti',W([-20,14,-30]),c.ganas,160); FX.burst('confetti',W([20,14,-25]),c.ganas+.2,160);
 [[-26,30,-10],[26,30,-10],[-26,30,-50],[26,30,-50]].forEach((p,i)=>FX.beam(W(p),0xfff2d0,40,i*1.3));
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
const S120=s=>'<span style="font-size:120px">'+s+'</span>', S100=s=>'<span style="font-size:100px">'+s+'</span>';
const BIG=[["","piscina0",S100("2 DESCALIFICADOS")],["piscina0","estadio0",S120("NADAS SOLO")],["estadio0","como",S100("ESTADIO LLENO")],["como","sidney",S100("HASTA EL FINAL")],
 ["sidney","eres",S120("SÍDNEY 2000")+"<small>Juegos Olímpicos</small>"],["eres","meses",S100("ERIC MOUSSAMBANI")+"<small>Guinea Ecuatorial</small>"],["meses","lago","8 MESES<small>nadando</small>"],["lago","nunca",S100("LAGO Y HOTEL")+"<small>sus piscinas</small>"],
 ["nunca","serie","50 m<small>nunca había visto una</small>"],["serie","rivales",S100("100 m LIBRES")],["rivales","descal",S100("¡SALIDA NULA!")],["descal","solo",S100("DESCALIFICADOS")],["solo","saltas",S120("SOLO")],
 ["pie","gritan",S120("¡EN PIE!")],["tocas","lento","1:52,72"],["lento","ganas",S100("EL MÁS LENTO")+"<small>de la historia olímpica</small>"],["ganas","coach",S100("¡GANAS LA SERIE!")],["coach","pregunta",S100("SELECCIONADOR")+"<small>de su país, años después</small>"],["pregunta","leo","¿Y TÚ?"]];
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 // ---- tú
 const U2=ST.you.h.userData, h=ST.you.h; h.position.set(0,0,0); h.rotation.set(0,0,0); [U2.aL,U2.aR,U2.lL,U2.lR].forEach(l=>l.rotation.set(0,0,0));
 let p=new THREE.Vector3(LX,DECK+1.2,1.4), pitch=0, yaw=Math.PI, mode='block';
 const swimming=t<c.como||(t>=c.saltas+.3&&t<c.tocas)||t>=c.loop;
 if(t<c.como){p.set(LX,-.2,swimZ(t,c)); mode='swim'; yaw=0;}
 else if(t<c.sidney){const a=eio(seg(t,c.como,c.sidney-.3)); p.set(LX,lerp(-.2,DECK+1.2,a),lerp(-24,1.4,a)); mode=a<.8?'swim':'block'; yaw=a<.8?0:Math.PI;}
 else if(t<c.saltas){mode=t>=c.silbato?'crouch':'block';}
 else if(t<c.saltas+.3){const a=seg(t,c.saltas,c.saltas+.3); p.set(LX,lerp(DECK+1.2,-.2,a)+Math.sin(a*Math.PI)*1.5,lerp(1.4,-4,a)); mode='dive'; pitch=lerp(.6,Math.PI/2,a);}
 else if(t<c.tocas){p.set(LX,-.2,swimZ(t,c)); mode='swim'; yaw=t<c.vuelta?Math.PI:0; if(t>=c.pared&&t<c.vuelta){yaw=lerp(Math.PI,TAU(),seg(t,c.pared,c.vuelta));}}
 else if(t<c.loop){p.set(LX,-2.6,-1); mode='touch'; yaw=Math.PI;}
 else {const a=seg(t,c.loop,c.loop+.8); p.set(LX,lerp(-2.6,-.2,a),lerp(-1,-30,eio(a))); mode='swim'; yaw=0;}
 function TAU(){return Math.PI*2;}
 const tired=seg(t,c.pesan,c.paras)*(1-seg(t,c.pie,c.voz)); const om=mode==='swim'?(9-6*tired):0;
 if(mode==='swim'){pitch=Math.PI/2; const ph=t*om; U2.aL.rotation.x=-ph; U2.aR.rotation.x=-ph-Math.PI; U2.lL.rotation.x=Math.sin(t*14)*.35*(1-tired*.7); U2.lR.rotation.x=-Math.sin(t*14)*.35*(1-tired*.7); h.rotation.y=Math.sin(ph)*.25; p.y+=Math.sin(t*3)*.05;}
 else if(mode==='crouch'){U2.aL.rotation.x=U2.aR.rotation.x=1.0; h.rotation.x=.6; U2.lL.rotation.x=U2.lR.rotation.x=-.4; h.position.y=-.4;}
 else if(mode==='dive'){U2.aL.rotation.x=U2.aR.rotation.x=Math.PI;}
 else if(mode==='touch'){const up=seg(t,c.ganas,c.ganas+.4); U2.aR.rotation.x=-2.9*Math.max(seg(t,c.tocas,c.tocas+.3),up); U2.aL.rotation.x=-2.9*up; U2.lL.rotation.x=Math.sin(t*6)*.4; U2.lR.rotation.x=-Math.sin(t*6)*.4;}
 ST.you.J.position.copy(p); ST.you.J.rotation.set(pitch,yaw,0);
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)?.15:1,1));
 // ---- rivales: salida nula y fuera
 ST.riv.forEach((r,i)=>{const ru=r.h.userData; r.h.position.set(0,0,0); r.h.rotation.set(0,0,0); [ru.aL,ru.aR,ru.lL,ru.lR].forEach(l=>l.rotation.set(0,0,0));
  let q=new THREE.Vector3(r.x,DECK+1.2,1.4), pr=0, yr=Math.PI; const d=seg(t,c.rivales+.2,c.rivales+.6), out=seg(t,c.descal,c.solo);
  if(t<c.sidney){q.set(r.x*4,DECK,-80); r.J.visible=false;} else r.J.visible=true;
  if(t>=c.silbato-.1&&t<c.rivales+.2){ru.aL.rotation.x=ru.aR.rotation.x=1.0; r.h.rotation.x=.6;}
  if(d>0&&out<=0){q.set(r.x,lerp(DECK+1.2,-.2,d)+Math.sin(d*Math.PI)*1.4,lerp(1.4,-6,d)); pr=lerp(.6,Math.PI/2,d); ru.aL.rotation.x=ru.aR.rotation.x=Math.PI; if(d>=1){q.z=-6-(t-c.rivales-.6)*2;}}
  if(out>0){const z0=-6-(c.descal-c.rivales-.6)*2; q.set(r.x,lerp(-.2,DECK,out)+Math.sin(out*Math.PI)*1.2,lerp(z0,5.5,eio(out))); pr=lerp(Math.PI/2,0,out); yr=Math.PI+(r.x<0?-.4:.4);}
  if(t>=c.loop){r.J.visible=false;}
  r.J.position.copy(q); r.J.rotation.set(pr,yr,0);});
 // ---- público que se pone en pie
 const stand=seg(t,c.pie,c.pie+.8)*(1-seg(t,c.coach,c.coach+1))+(t<c.como?.4:0); if(stand>0||t<c.pie+1){const dm=ST.dm; ST.cpos.forEach((q,k)=>{dm.position.set(q[0],q[1]+stand*(.5+.35*Math.abs(Math.sin(t*7+q[3]*6))),q[2]); dm.updateMatrix(); ST.crowd.setMatrixAt(k,dm.matrix);}); ST.crowd.instanceMatrix.needsUpdate=true;}
 ST.scr.material.map=t>=c.tocas&&t<c.loop?ST.texB:ST.texA;
 // ---- CÁMARA
 const youW=new THREE.Vector3(p.x,0,p.z); let L=youW.clone(), ly=(mode==='block'||mode==='crouch')?4.4:1.4;
 if(t>=c.rivales&&t<c.solo){L=youW.clone().lerp(new THREE.Vector3(2.5,0,-3),seg(t,c.rivales,c.rivales+.5));}
 const TP=Math.PI*2;
 const CK=[[0,.6,30,.9,0],[c.piscina0,.3,40,1.1,0],[c.estadio0,.9,36,.5,0],[c.como,1.2,22,.4,0],[c.sidney,.2,34,.45,0],[c.eres,3.0,8,.12,0],[c.meses,2.8,9,.15,0],[c.nunca,.1,16,.45,0],[c.hoy,.0,24,.5,0],
  [c.serie,2.7,15,.2,0],[c.rivales,2.6,18,.25,0],[c.descal,2.2,20,.3,0],[c.solo,3.0,10,.15,0],[c.silbato,3.1,8,.1,0],[c.saltas,1.4,12,.18,0],[c.tope,.15,11,.35,0],[c.pared,1.3,10,.3,0],[c.vuelta,1.6,11,.25,0],
  [c.falta,3.1,12,.3,0],[c.pesan,2.6,7,.25,0],[c.paras,2.4,6.5,.2,0],[c.pie,1.4,30,.35,0],[c.gritan,1.7,26,.3,0],[c.brazo,3.0,9,.2,0],[c.nollega,3.1,8,.12,0],[c.tocas,2.9,9,.15,0],[c.tiempo,2.7,11,.2,0],
  [c.lento,2.4,14,.3,0],[c.ganas,2.9,10,.15,0],[c.coach,2.6,12,.25,0],[c.pregunta,2.3,14,.3,0],[c.pillas,2.1,15,.3,0],[c.loop,TP+.4,30,.8,0],[end,TP+.6,30,.9,0],[1e9,TP+.6,30,.9,0]];
 let [ca,cd,chh]=kf(CK,t); const Lw=ROOM.clone().add(L).add(new THREE.Vector3(0,ly,0));
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd)); if(P.y<ROOM.y+1.2) P.y=ROOM.y+1.2;
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.6) pkk=Math.max(pkk,Math.exp(-dd*6));}); const shake=pkk*1.2;
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*shake*.12; cam.position.y+=Math.cos(t*61)*shake*.12; cam.lookAt(Lw); cam.near=.1; cam.far=900;
 cam.fov=50-pkk*3-8*seg(t,c.silbato,c.saltas)*(1-seg(t,c.saltas,c.saltas+.5))-7*seg(t,c.nollega,c.tocas)*(1-seg(t,c.tocas+.3,c.tiempo)); cam.updateProjectionMatrix();
 const icon=(m,on,pos,s)=>{m.visible=on>.01; if(!m.visible) return; m.position.copy(pos); m.scale.setScalar(s*back(on)); m.lookAt(cam.position);};
 ST.riv.forEach((r,i)=>icon(ST.xs[i],seg(t,c.descal,c.descal+.3)*(1-seg(t,c.saltas,c.saltas+.3)),r.J.position.clone().add(new THREE.Vector3(0,6.2,0)),1.1));
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.3); b.position.set(L.x+q.x,q.y,L.z+q.z); b.lookAt(cam.position);});
 const kb=Lw.clone(); key.position.set(kb.x+8,kb.y+26,kb.z+14); keyT.position.copy(kb); fill.position.set(kb.x-16,kb.y+12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,kb.y+6,kb.z-6); key.distance=220; key.angle=.9;
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true; parts.material.opacity=.25;
 sky.position.copy(cam.position);
 const cine=Math.max(t<c.como?.6:0,seg(t,c.silbato-.3,c.silbato)*(1-seg(t,c.tope,c.tope+.5)),seg(t,c.pesan,c.pesan+.4)*(1-seg(t,c.tocas+.6,c.tocas+1.2)));
 FX.update(t,{cine,vig:Math.max(.45*seg(t,c.pesan,c.pesan+.5)*(1-seg(t,c.pie,c.pie+.4)),.35*seg(t,c.brazo,c.brazo+.4)*(1-seg(t,c.tocas,c.tocas+.3))),beams:(t>c.pie&&t<c.coach)?.14:.06,
  flash:(t>c.pie&&t<c.coach)?.24:(t>c.sidney&&t<c.serie?.08:(t<c.como?.1:0))});
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.35; document.getElementById('flash').style.opacity=0;
 C.render();
 let bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); let bh=bg?bg[2]:'';
 if(!bg&&t>=c.saltas&&t<c.tocas){const z=p.z; const m=t<c.vuelta?50*cl((-z-1)/(PL-2)):50+50*cl((PL-1+z)/(PL-2)); bh=Math.round(m)+' m<small>de 100</small>';}
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
