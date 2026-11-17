// ================= HISTORIA 006: tú eres Dick Fosbury (instituto → México 1968) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return lerp(K[j][1],K[j+1][1],e);};
function mexTex(){return canvasTex(540,360,(x,w,h)=>{x.fillStyle='#006847';x.fillRect(0,0,w/3,h);x.fillStyle='#fff';x.fillRect(w/3,0,w/3,h);x.fillStyle='#ce1126';x.fillRect(2*w/3,0,w/3,h);x.fillStyle='#8a5a2b';x.beginPath();x.arc(w/2,h/2,46,0,7);x.fill();x.fillStyle='#2e7d32';x.beginPath();x.arc(w/2,h/2+30,40,0,Math.PI);x.fill();});}
function canTex(){return canvasTex(540,270,(x,w,h)=>{x.fillStyle='#d52b1e';x.fillRect(0,0,w,h);x.fillStyle='#fff';x.fillRect(w/4,0,w/2,h);x.fillStyle='#d52b1e';x.save();x.translate(w/2,h/2+10);x.beginPath();
 const P=[[0,-95],[18,-55],[45,-65],[35,-15],[75,-35],[65,0],[85,10],[30,40],[35,60],[5,50],[5,90],[-5,90],[-5,50],[-35,60],[-30,40],[-85,10],[-65,0],[-75,-35],[-35,-15],[-45,-65],[-18,-55]];
 P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])); x.closePath(); x.fill(); x.restore();});}
function paperTex(){return canvasTex(768,1024,(x,w,h)=>{x.fillStyle='#efe6cf';x.fillRect(0,0,w,h);x.fillStyle='#1d1b17';x.font='900 58px Georgia, serif';x.textAlign='center';x.fillText('MEDFORD MAIL TRIBUNE',w/2,80);
 x.fillRect(40,100,w-80,5);x.font='700 28px Georgia, serif';x.fillText('OREGÓN · 1964',w/2,140);x.fillRect(40,160,w-80,2);
 x.font='900 104px Georgia, serif';x.fillText('FOSBURY',w/2,270);x.fillText('FLOPS',w/2,375);x.fillText('OVER BAR',w/2,480);
 x.fillStyle='#2a2a2a';x.fillRect(70,520,w-140,330);x.strokeStyle='#ddd';x.lineWidth=8;x.beginPath();x.moveTo(120,640);x.lineTo(w-120,640);x.stroke();
 x.fillStyle='#ff9a4a';x.save();x.translate(w/2,610);x.rotate(-.12);x.beginPath();x.ellipse(0,0,150,34,0,0,7);x.fill();x.beginPath();x.arc(-175,22,30,0,7);x.fill();x.lineWidth=26;x.strokeStyle='#ff9a4a';x.beginPath();x.moveTo(130,10);x.lineTo(230,-60);x.stroke();x.restore();
 x.fillStyle='#8a8578';for(let i=0;i<7;i++){x.fillRect(70,880+i*20,(i%3==2?.6:1)*(w-140),9);} });}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 // suelo: zona de salto (tartán), césped, pista con calles
 const tart=M(0x8c3524,{roughness:.85}); const apron=new THREE.Mesh(new THREE.CircleGeometry(18,96),tart); apron.rotation.x=-Math.PI/2; apron.position.y=.03; W0.add(apron);
 const grass=new THREE.Mesh(new THREE.RingGeometry(18,26,96),M(0x1f4a2a,{roughness:1})); grass.rotation.x=-Math.PI/2; grass.position.y=.025; W0.add(grass);
 const track=new THREE.Mesh(new THREE.RingGeometry(26,34,128),tart); track.rotation.x=-Math.PI/2; track.position.y=.03; W0.add(track);
 for(let i=0;i<7;i++){const l=new THREE.Mesh(new THREE.RingGeometry(26.6+i*1.15,26.7+i*1.15,160),new THREE.MeshBasicMaterial({color:0xd8d2c8})); l.rotation.x=-Math.PI/2; l.position.y=.04; W0.add(l);}
 // zona de salto: postes, listón, foso (serrín / espuma)
 const postM=M(0xd9dde6,{metalness:.6,roughness:.3}); ST.posts=[]; for(const x of [-5.3,5.3]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,7.2,14),postM); p.position.set(x,3.6,0); W0.add(p); const b=new THREE.Mesh(new THREE.CylinderGeometry(.7,.8,.25,20),M(0x30343c)); b.position.set(x,.13,0); W0.add(b);
  const peg=new THREE.Mesh(new THREE.BoxGeometry(.5,.12,.3),M(0x30343c)); W0.add(peg); ST.posts.push(peg);}
 const barT=canvasTex(512,32,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=i%2?'#ffffff':'#ff3b30'; x.fillRect(i*w/8,0,w/8,h);}});
 ST.bar=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,10.4,12),new THREE.MeshStandardMaterial({map:barT,roughness:.4})); ST.bar.rotation.z=Math.PI/2; ST.barG=new THREE.Group(); ST.barG.add(ST.bar); W0.add(ST.barG);
 const sawT=canvasTex(256,256,(x,w,h)=>{x.fillStyle='#b98a52';x.fillRect(0,0,w,h);for(let i=0;i<2500;i++){x.fillStyle=['#d8aa6a','#8e6534','#c99a5c','#e8c48a'][i%4];x.fillRect(Math.random()*w,Math.random()*h,2+Math.random()*3,1+Math.random()*2);}}); sawT.wrapS=sawT.wrapT=THREE.RepeatWrapping; sawT.repeat.set(3,2);
 ST.saw=new THREE.Group(); const sw=new THREE.Mesh(new RoundedBoxGeometry(11,1,7,4,.45),new THREE.MeshStandardMaterial({map:sawT,roughness:1})); sw.position.y=.5; ST.saw.add(sw); ST.saw.position.set(0,0,-4.2); W0.add(ST.saw);
 ST.foam=new THREE.Group(); const fm=new THREE.Mesh(new RoundedBoxGeometry(11,1.8,7,4,.3),M(0x2f6fd6,{roughness:.75})); fm.position.y=.9; ST.foam.add(fm);
 const fc=new THREE.Mesh(new RoundedBoxGeometry(10.4,.08,6.4,2,.03),M(0x4a8cf0,{roughness:.8})); fc.position.y=1.81; ST.foam.add(fc); ST.foam.position.set(0,0,-4.2); W0.add(ST.foam);
 ST.station=new THREE.Group(); {const st=ST.station; for(const x of [-5.3,5.3]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,7.2,14),postM); p.position.set(x,3.6,0); st.add(p);} const b=ST.bar.clone(); b.position.y=5.15; st.add(b); const f=fm.clone(); f.position.set(0,.9,-4.2); st.add(f);}
 // tú: el muñeco naranja con ojos, dentro de un pivote en el centro del cuerpo
 const mkJ=(col,sc)=>{const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,sc); h.position.y=-1.5*sc; J.add(h); W0.add(J); return [J,h];};
 [ST.J,ST.h]=mkJ(0xff9a4a,1.6); ST.head=ST.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 ST.medal=new THREE.Group(); const md=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.05,28),goldM); md.rotation.x=Math.PI/2; md.position.set(0,1.75,.4); ST.medal.add(md);
 for(const s of [-1,1]){const rb=new THREE.Mesh(new THREE.BoxGeometry(.07,.55,.03),M(0x2a62d8)); rb.position.set(s*.12,2.0,.36); rb.rotation.z=s*.35; ST.medal.add(rb);} ST.h.add(ST.medal);
 // los campeones de hoy (copias del gancho)
 ST.copies=[-11,11,-22,22,-33,33].map((dx,i)=>{const g=new THREE.Group(); g.position.x=dx; const st=ST.station.clone(); g.add(st); const [J,h]=mkJ(PCOLS[i%6],1.6); W0.remove(J); g.add(J); W0.add(g); return {g,J,h,dx};});
 // gradas del instituto con compañeros
 ST.bleach=new THREE.Group(); const bm=M(0x5d6878,{metalness:.5,roughness:.4}); for(let i=0;i<3;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(3,1+i*1.1,13),bm); b.position.set(-15.5-i*3,(1+i*1.1)/2,1); ST.bleach.add(b);} W0.add(ST.bleach);
 ST.mates=[]; for(let i=0;i<6;i++){const h=human([0x3fb8ff,0x7dff9a,0xff4fd8,0xffc21a,0xb18cff,0x17bebb][i],1.3); const row=i%3; h.position.set(-15.5-row*3,(1+row*1.1)-.5,-3.5+i*1.7); h.rotation.y=Math.PI/2; h.userData.lL.rotation.x=-1.5; h.userData.lR.rotation.x=-1.5; h.userData.y0=h.position.y; ST.bleach.add(h); ST.mates.push(h);}
 // entrenador (gorra) y fotógrafo (cámara con flash)
 ST.coach=human(0x5a7fa8,1.6); const cap=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.16,20),M(0x1d2433)); cap.position.y=2.72; ST.coach.add(cap); const vis=new THREE.Mesh(new THREE.BoxGeometry(.4,.04,.3),M(0x1d2433)); vis.position.set(0,2.66,.35); ST.coach.add(vis); W0.add(ST.coach);
 ST.photo=human(0x9aa3b5,1.5); const camB=new THREE.Mesh(new THREE.BoxGeometry(.5,.35,.3),M(0x1a1a1a)); camB.position.set(0,2.45,.45); ST.photo.add(camB); const lens=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.25,14),M(0x333333)); lens.rotation.x=Math.PI/2; lens.position.set(0,2.45,.7); ST.photo.add(lens);
 ST.flashB=new THREE.Mesh(new THREE.SphereGeometry(.35,16,12),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true})); ST.flashB.position.set(.18,2.75,.55); ST.photo.add(ST.flashB); ST.photo.userData.aR.rotation.x=-1.9; ST.photo.userData.aL.rotation.x=-1.9; W0.add(ST.photo);
 ST.paper=new THREE.Mesh(new THREE.PlaneGeometry(3.6,4.8),new THREE.MeshBasicMaterial({map:paperTex(),side:THREE.DoubleSide,transparent:true,fog:false})); S.add(ST.paper);
 // estadio de México 1968
 ST.stad=new THREE.Group(); W0.add(ST.stad); const tierM=new THREE.MeshStandardMaterial({color:0x262a33,roughness:.8,side:THREE.DoubleSide});
 const wall=new THREE.Mesh(new THREE.CylinderGeometry(35.6,35.6,2.2,128,1,true),M(0x6a1d1d,{side:THREE.DoubleSide})); wall.position.y=1.1; ST.stad.add(wall);
 const pos=[], cols=[]; const crowdCols=[0xd9d2c4,0xff4f4f,0x3fb8ff,0xffc21a,0x7a7f8c,0x5a5f6b,0xffffff,0x2e7d32];
 for(let i=0;i<6;i++){const r=36+i*3.4; const tier=new THREE.Mesh(new THREE.CylinderGeometry(r+3.4,r,2.8,128,1,true),tierM); tier.position.y=1.4+i*2.8; ST.stad.add(tier);
  const n=Math.floor(2*Math.PI*(r+1.7)/1.05); for(let k=0;k<n;k++){const a=k/n*Math.PI*2+i*.3; pos.push([Math.sin(a)*(r+1.9),2.4+i*2.8,Math.cos(a)*(r+1.9),a]); cols.push(crowdCols[Math.floor(rnd()*crowdCols.length)]);}}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.6,1.1,.6),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const dm=new THREE.Object3D(), cc=new THREE.Color();
 pos.forEach((p,k)=>{dm.position.set(p[0],p[1],p[2]); dm.rotation.y=p[3]; dm.updateMatrix(); im.setMatrixAt(k,dm.matrix); im.setColorAt(k,cc.setHex(cols[k]));}); ST.stad.add(im); ST.crowd=im;
 ST.towers=[]; for(let k=0;k<4;k++){const a=Math.PI/4+k*Math.PI/2; const tw=new THREE.Group(); tw.position.set(Math.sin(a)*58,0,Math.cos(a)*58); tw.rotation.y=a+Math.PI;
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,34,10),M(0x50555f,{metalness:.6})); pole.position.y=17; tw.add(pole);
  const pan=new THREE.Mesh(new THREE.BoxGeometry(8,4,.6),M(0x30343c)); pan.position.set(0,35,0); tw.add(pan);
  const lit=new THREE.Mesh(new THREE.PlaneGeometry(7.4,3.4),new THREE.MeshBasicMaterial({color:0xfff2d0})); lit.position.set(0,35,.31); tw.add(lit); ST.stad.add(tw); ST.towers.push(lit);}
 ST.stadL=new THREE.HemisphereLight(0xfff0d8,0x221810,0); S.add(ST.stadL);
 // banderas
 ST.fMex=makeFlag(['#fff'],true); ST.fMex.userData.fl.material.map=mexTex(); ST.fMex.scale.setScalar(.5); ST.fMex.position.set(-14,0,-10); W0.add(ST.fMex);
 ST.fGer=makeFlag(['#000000','#dd0000','#ffce00'],false); ST.fGer.scale.setScalar(.5); ST.fGer.position.set(-14,0,-4); W0.add(ST.fGer);
 ST.fCan=makeFlag(['#fff'],false); ST.fCan.userData.fl.material.map=canTex(); ST.fCan.scale.setScalar(.42); ST.fCan.position.set(-11,0,4); W0.add(ST.fCan);
 // Múnich: 40 saltadores (28 saltan de espaldas)
 ST.forty=[]; for(let i=0;i<40;i++){const a=Math.PI*.55+i/39*Math.PI*.9; const rr=i%2?16:13; const [J,h]=mkJ(0x6a6f7c,1.15); J.position.set(Math.sin(a)*rr,1.73,Math.cos(a)*rr-1); J.rotation.y=a+Math.PI; J.userData={a,flop:((i*7)%40)<28,ph:rnd()*6}; ST.forty.push({J,h});}
 // Debbie Brill
 [ST.brill,ST.brillH]=mkJ(0xff4fd8,1.5); ST.brill.position.set(-8.5,2.25,4);
 // aviso en el cuello, nube de serrín, burbujas
 ST.alert=await icon3D('alert-circle',0xff2d46,1.3,{depth:3}); W0.add(ST.alert);
 ST.dust=[]; const dM=new THREE.MeshStandardMaterial({color:0xc99a5c,roughness:1}); for(let i=0;i<46;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(.12+rnd()*.12,8,6),dM); d.userData={v:[(rnd()-.5)*5,2+rnd()*4,(rnd()-.5)*4]}; d.visible=false; W0.add(d); ST.dust.push(d);}
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.2,{depth:2}); b.userData={x:(rnd()-.5)*12,y:5+rnd()*5,z:1+(rnd()-.5)*5,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.paper.castShadow=false; ST.towers.forEach(l=>l.castShadow=false); ST.crowd.castShadow=false; ST.stad.traverse(o=>o.castShadow=false); window.popsReady=true;};
// ---------- el salto
const FLOPP=[[7,11],[5,3.5],[1,2.2]];
function runPath(style,s){if(style==='flop'){const u=1-s,P=FLOPP; return [u*u*P[0][0]+2*u*s*P[1][0]+s*s*P[2][0], u*u*P[0][1]+2*u*s*P[1][1]+s*s*P[2][1]];} return [0,lerp(11,2.4,s)];}
const runYaw=(st,s)=>{const b=runPath(st,Math.min(1,s+.02)),a=runPath(st,Math.max(0,s-.02)); return Math.atan2(b[0]-a[0],b[1]-a[1]);};
const qE=(y,p,r=0)=>new THREE.Quaternion().setFromEuler(new THREE.Euler(p,y,r,'YXZ'));
const qStr=new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0,0,1),new THREE.Vector3(-1,0,0),new THREE.Vector3(0,-1,0)));
const LYING={flop:1,lean2:1,straddle:1};
function landed(style,pitTop){const ly=LYING[style]; const z=ly?-3.7:-2.6; const y=ly?pitTop+.55:pitTop+2.4;
 const q=style==='flop'?qE(0,-Math.PI/2):style==='lean2'?qE(Math.PI-1.3,-1.45):style==='straddle'?qStr.clone():qE(Math.PI,0); return {x:0,y,z,q,lL:style==='flop'?-.5:0,lR:style==='flop'?-.5:0,aL:.2,aR:.2};}
function pose(style,ph,barY,pitTop,t,target){const r={x:0,y:2.4,z:0,q:null,lL:0,lR:0,aL:0,aR:0};
 if(ph<1){const p=runPath(style,ph); r.x=p[0]; r.z=p[1]; r.y=2.4+Math.abs(Math.sin(t*13))*.18; r.q=qE(runYaw(style,ph),.18); const s=Math.sin(t*13)*1.05; r.lL=s; r.lR=-s; r.aL=-s; r.aR=s; return r;}
 if(ph<=2){const p=ph-1, tk=runPath(style,1), L=landed(style,pitTop); r.x=lerp(tk[0],L.x,p); r.z=lerp(tk[1],L.z,p);
  const peak=style==='flop'?barY+.72:style==='straddle'?barY+.62:style==='low'?barY+.25:style==='scissor'?barY+1.05:style==='lean1'?barY+.95:barY+.85;
  const hh=peak-(2.4+L.y)/2; r.y=lerp(2.4,L.y,p)+4*hh*p*(1-p);
  if(style==='flop'){r.q=qE(lerp(runYaw('flop',1),0,eio(seg(p,0,.3))),-1.62*eio(seg(p,.05,.72))); const a=.85*seg(p,.15,.5)-1.4*seg(p,.5,.92); r.lL=a; r.lR=a; r.aL=r.aR=.25;}
  else if(style==='straddle'){const s=eio(seg(p,.05,.5)); r.q=qE(Math.PI,0).slerp(qStr,s); r.lR=-1.6*s; r.aL=r.aR=-1.2*s;}
  else {const turn=style==='lean2'?1.3:style==='lean1'?.6:0, lean=style==='lean2'?1.45:style==='lean1'?.6:.1;
   r.q=qE(Math.PI-turn*eio(seg(p,0,.6)),-lean*eio(seg(p,.1,.65))); r.lL=-1.4*seg(p,0,.3)*(1-seg(p,.45,.7)); r.lR=-1.4*seg(p,.4,.7)*(1-seg(p,.85,1)); r.aL=r.aR=-2.3;}
  return r;}
 const L=landed(style,pitTop); if(ph<=2.3) return Object.assign(r,L);
 const b=(ph-2.3)/.7, g=eio(seg(b,0,.3)); const up={x:L.x,y:pitTop+2.4,z:L.z};
 const qUp=qE(new THREE.Euler().setFromQuaternion(L.q,'YXZ').y,0);
 if(b<=.3){r.x=L.x; r.z=L.z; r.y=lerp(L.y,up.y,g); r.q=L.q.clone().slerp(qUp,g); r.lL=lerp(L.lL,0,g); r.lR=lerp(L.lR,0,g); return r;}
 const W=[[L.x,L.z],[7.5,-2],[7.5,6],target]; const u=seg(b,.3,1)*3, i=Math.min(2,Math.floor(u)), f=u-i; const A=W[i],B=W[i+1];
 r.x=lerp(A[0],B[0],f); r.z=lerp(A[1],B[1],f); r.y=(u<.6?lerp(up.y,2.4,eio(u/.6))+Math.sin(u/.6*Math.PI)*.8:2.4)+Math.abs(Math.sin(t*13))*.15;
 const yaw=b>=.999?Math.atan2(-target[0]*0, -1):Math.atan2(B[0]-A[0],B[1]-A[1]); r.q=qE(yaw,.12); const s=Math.sin(t*13)*1.0; r.lL=s; r.lR=-s; r.aL=-s; r.aR=s; return r;}
function applyPose(J,h,r){J.position.set(r.x,r.y,r.z); J.quaternion.copy(r.q); const U=h.userData; U.lL.rotation.x=r.lL; U.lR.rotation.x=r.lR; U.aL.rotation.x=r.aL; U.aR.rotation.x=r.aR;}
let ATT=null;
function setupAtt(c){const end=TL.end; const lnd=c.giras+2*(c.dos24-c.giras);
 ATT=[{st:'flop',K:[[0,1.45],[c.como,1.62],[c.oregon,0]]},
  {st:'low',K:[[c.metro-.5,0],[c.metro+.1,1],[c.metro+.9,2],[c.metro+1.4,2.3],[c.metro+2.5,3]],fall:1},
  {st:'straddle',K:[[c.lado-.6,0],[c.lado,1],[c.lado+.8,2],[c.asi,2.3],[c.asi+.8,3]],fall:1},
  {st:'scissor',K:[[c.cadera-1.55,0],[c.cadera-1.1,1],[c.cadera-.5,2],[c.cadera-.5,2.3],[c.cadera+.18,3]]},
  {st:'lean1',K:[[c.cadera+.18,0],[c.cadera+.58,1],[c.cadera+1.28,2],[c.cadera+1.28,2.3],[c.hombros+.15,3]]},
  {st:'lean2',K:[[c.hombros+.15,0],[c.hombros+.5,1],[c.hombros+1.2,2],[c.hombros+1.2,2.3],[c.espaldas+.48,3]]},
  {st:'flop',K:[[c.espaldas+.48,0],[c.espaldas+.88,1],[c.espaldas+1.78,2],[c.instituto+.2,2.3],[c.ahora-1.1,3]],dust:1},
  {st:'flop',K:[[c.ahora-1.1,0],[c.ahora-.6,1],[c.ahora+.2,2],[c.ahora+1.0,2.3],[c.ahora+1.8,3]],bounce:1},
  {st:'flop',K:[[c.foto-.95,0],[c.foto-.45,1],[c.foto+.45,2],[c.titular,2.3],[c.sigues+.1,3]]},
  {st:'flop',K:[[c.sigues+.1,0],[c.sigues+.55,1],[c.sigues+1.35,2],[c.mexico+.3,2.3],[c.final-.15,3]],bounce:1},
  {st:'flop',K:[[c.corres,0],[c.giras,1],[lnd,2],[lnd+.2,2.3],[lnd+.7,2.51],[c.pillas,2.51],[c.pillas+.8,3]],bounce:1},
  {st:'flop',K:[[c.loop,0],[c.loop+1.1,1],[c.loop+1.7,1.38],[end,1.45]]}];
 ATT.forEach((a,i)=>{a.t0=a.K[0][0]; a.t1=a.K[a.K.length-1][0]; const nx=ATT[i+1]; a.target=nx?runPath(nx.st,0):runPath('flop',0);});}
const BIG=[["","oro","DE ESPALDAS<small>sin ver el listón</small>"],["oro","hoy","ORO<small>olímpico</small>"],["hoy","como","CASI TODOS<small>los campeones saltan así</small>"],
 ["oregon","metro","OREGÓN<small>años sesenta</small>"],["metro","entren","1,5 m<small>tu tope</small>"],["lado","asi","DE LADO<small>como todos</small>"],["tijera","espaldas","LA TIJERA<small>tu salto de niño</small>"],["espaldas","porque","¡DE ESPALDAS!"],
 ["serrin","instituto","SERRÍN<small>caer de espaldas era peligroso</small>"],["espuma","anio64","ESPUMA<small>ya puedes caer de espaldas</small>"],["anio64","titular","1964"],
 ["mexico","corres","<span style=\"font-size:130px\">MÉXICO 1968</span><small>final olímpica</small>"],["dos24","munich","2,24 m<small>oro y récord olímpico</small>"],["v28","ojo","28 de 40<small>Múnich 1972: ya saltaban así</small>"],
 ["brill","pregunta","<span style=\"font-size:120px\">BRILL BEND</span><small>Debbie Brill (Canadá)</small>"],["pregunta","leo","<span style=\"font-size:120px\">¿QUÉ OTRO HITO?</span>"]];
window.render=(t)=>{const c=TL.cues; if(!ATT) setupAtt(c); const W0=ST.W; const RR=a=>ROOM.clone().add(v3(a)); const end=TL.end;
 // --- escenario: estadio (México) ↔ instituto
 const SY=kfl([[0,1],[c.como,1],[c.oregon,0],[c.mexico,0],[c.mexico+2,1],[1e9,1]],t); ST.stad.visible=SY>.01; ST.stad.scale.set(1,Math.max(.01,eio(SY)),1); ST.stadL.intensity=.55*SY;
 const BL=1-SY; ST.bleach.visible=BL>.01; ST.bleach.scale.set(1,Math.max(.01,eio(BL)),1);
 ST.towers.forEach((l,i)=>l.material.color.setHex(SY>.5+i*.1?0xfff2d0:0x30343c));
 // foso: espuma ↔ serrín
 const F=kfl([[0,1],[c.como,1],[c.oregon,0],[c.instituto+.3,0],[c.espuma+.5,1],[1e9,1]],t); const pitTop=lerp(1,1.8,F);
 ST.saw.visible=F<.99; ST.saw.scale.set(1,Math.max(.01,1-F),1); ST.foam.visible=F>.01; ST.foam.scale.set(1,Math.max(.01,F),1);
 // altura del listón
 const a3=ATT[3],a4=ATT[4],a5=ATT[5];
 let barY=kfl([[0,5.15],[c.como,5.15],[c.oregon,3.45],[a3.K[2][0],3.45],[a3.t1,3.7],[a4.K[2][0],3.7],[a4.t1,3.95],[a5.K[2][0],3.95],[a5.t1,4.2],[c.sigues+1.6,4.2],[c.mexico+.5,4.7],[c.final,4.7],[c.final+.8,5.15],[1e9,5.15]],t);
 // salto activo
 let ai=0; for(let i=0;i<ATT.length;i++) if(t>=ATT[i].t0) ai=i; let A=ATT[ai]; let r;
 if(t>A.t1&&ai+1<ATT.length){const nx=ATT[ai+1], P0=runPath('flop',0); const tg=runPath(nx.st,0); const f=eio(seg(t,A.t1,Math.min(nx.t0,A.t1+1.2)));
   const tgt=A.target; r={x:lerp(tgt[0],tg[0],f),y:2.4,z:lerp(tgt[1],tg[1],f),q:qE(Math.PI-(nx.st==='flop'?.6:0),0),lL:0,lR:0,aL:0,aR:0}; if(f>0&&f<1){const s=Math.sin(t*9)*.6; r.lL=s; r.lR=-s; r.aL=-s; r.aR=s;}}
 else {const ph=kfl(A.K,t); r=pose(A.st,ph,barY,pitTop,t,A.target);
   if(A.bounce){const tl=A.K[2][0]; const d=t-tl; if(d>0&&d<1.2) r.y+=Math.abs(Math.sin(d*9))*.9*Math.exp(-d*3.2);}}
 if(t<c.oregon&&t>c.como){} applyPose(ST.J,ST.h,r);
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)?.15:1,1));
 // el listón cae si lo tiras
 let fall=0; ATT.forEach(a=>{if(!a.fall) return; const tc=a.K[1][0]+(a.K[2][0]-a.K[1][0])*.45; fall=Math.max(fall,seg(t,tc,tc+.4)*(1-seg(t,a.K[3][0],a.K[3][0]+.5)));});
 ST.barG.position.set(0,lerp(barY,pitTop+.12,eio(fall)),lerp(0,-1.6,eio(fall))); ST.barG.rotation.y=.18*fall; ST.posts.forEach((p,i)=>p.position.set(i?5.1:-5.1,barY-.12,0));
 // medalla
 const ms=t<c.oregon?1-seg(t,c.como,c.como+.5):back(seg(t,c.oro68,c.oro68+.45)); ST.medal.visible=ms>.01; ST.medal.scale.setScalar(Math.max(.01,ms)); ST.medal.position.y=t>c.oregon?(1-seg(t,c.oro68,c.oro68+.45))*2.5:0;
 // copias del gancho: «casi todos los campeones saltan así»
 const cpv=t<c.oregon; ST.copies.forEach((o,i)=>{const s=back(seg(t,c.hoy+i*.12,c.hoy+i*.12+.45))*(1-eio(seg(t,c.como,c.como+.6))); o.g.visible=cpv&&s>.01; o.g.scale.setScalar(Math.max(.01,s));
   if(o.g.visible){const rr=pose('flop',kfl(ATT[0].K,t)+i*.015,5.15,1.8,t,[7,11]); applyPose(o.J,o.h,rr);}});
 // entrenador
 const cIn=seg(t,c.entren,c.entren+1.1), cOut=seg(t,c.asi+.2,c.asi+1.6); ST.coach.visible=t>c.entren&&cOut<1;
 ST.coach.position.set(lerp(-13,-7,eio(cIn))-lerp(0,7,eio(cOut)),0,5); ST.coach.rotation.y=(cIn<1&&cIn>0)?Math.PI/2:(cOut>0?-Math.PI/2:Math.PI/2-.5);
 if((cIn>0&&cIn<1)||(cOut>0&&cOut<1)) walk(ST.coach,t,9,0,.7); else {walk(ST.coach,t,9,0,0); ST.coach.userData.aR.rotation.x=(t>c.lado-.8&&t<c.nosale)?-1.55:0;}
 ST.coach.children[1].rotation.y=(t>c.nosale&&t<c.asi+.3)?Math.sin(t*14)*.45:0;
 // compañeros que se ríen
 ST.mates.forEach((h,i)=>{const lg=t>c.rien-.1&&t<c.mexico; h.position.y=h.userData.y0+(lg?Math.abs(Math.sin(t*11+i))*.35:0); h.rotation.z=lg?Math.sin(t*9+i)*.12:0; h.userData.aR.rotation.x=lg?-1.5+Math.sin(t*10+i)*.2:-.2; h.userData.aL.rotation.x=lg?-.6:-.2; h.children[1].rotation.x=lg?-.35:0;});
 // fotógrafo y periódico
 const pIn=seg(t,c.anio64,c.anio64+1.3), pOut=seg(t,c.mexico+.3,c.mexico+1.8); ST.photo.visible=t>c.anio64&&pOut<1;
 ST.photo.position.set(lerp(-14,-6.5,eio(pIn))-lerp(0,10,eio(pOut)),0,lerp(12,6.5,eio(pIn))); ST.photo.rotation.y=(pIn>0&&pIn<1)?Math.atan2(7.5,-5.5):(pOut>0?-Math.PI/2:Math.atan2(6.5,-6.5));
 if((pIn>0&&pIn<1)||(pOut>0&&pOut<1)) walk(ST.photo,t,9,0,.6); else {ST.photo.userData.lL.rotation.x=ST.photo.userData.lR.rotation.x=0;} ST.photo.userData.aR.rotation.x=ST.photo.userData.aL.rotation.x=-1.9;
 const fl=t>c.foto&&t<c.foto+.35?1-seg(t,c.foto,c.foto+.35):0; ST.flashB.visible=fl>0; ST.flashB.scale.setScalar(.4+fl*1.1); ST.flashB.material.opacity=fl;
 // --- CÁMARA (órbita continua alrededor del foso) [t, ángulo, distancia, altura, mirada x,y,z]
 const CK=[[0,1.0,16,.3,0,6.0,-1.2],[c.oro,1.03,15.5,.3,0,6.0,-1.2],[c.hoy,1.06,16,.3,0,6.0,-1.2],[c.hoy+1.6,.55,30,.32,0,6.2,-2],[c.como,.5,31,.32,0,6.2,-2],[c.oregon,.95,19,.3,0,4.6,0],
  [c.metro-.4,1.0,18,.26,0,4.4,0],[c.entren,.7,21,.28,-2,4.2,1],[c.nosale,.65,21,.28,-2,4.2,1],[c.asi+.3,1.0,17,.26,0,4.8,-.5],[c.espaldas+.3,1.0,20,.28,0,5.4,-1],
  [c.porque+.2,.8,9.5,.55,0,2.6,-3.6],[c.cuello+.6,.75,8.5,.6,0,2.6,-3.6],[c.instituto,.9,10,.5,0,3,-3.4],[c.espuma+.3,1.0,17,.3,0,4.6,-1],[c.ahora+1,1.05,17,.3,0,4.8,-1],
  [c.anio64+.5,.25,22,.28,-2,4.8,1.5],[c.foto,.1,22,.28,-3.5,5,1.5],[c.rien,-.15,22,.25,-6,4.2,0],[c.sigues+.3,1.0,18,.28,0,5.2,-1],
  [c.mexico+.3,1.3,24,.75,0,4.5,-1],[c.mexico+2,2.0,27,.6,0,5.5,-1],[c.final,1.05,20,.3,0,6,-1],[c.corres+.4,.9,17,.25,2,4.8,4],[c.giras,1.05,15,.25,.5,5.8,1],[c.dos24,1.05,13,.28,0,6.2,-1.2],[c.oro68-.2,.4,14,.25,0,5,-3],[c.oro68+.8,.2,12,.22,0,5.2,-3.4],
  [c.munich+.3,.35,24,.75,0,3,-1],[c.v28+1,.0,27,.72,0,3,-1],[c.ojo+.2,.6,22,.3,-7,3.8,2.5],[c.famoso,.4,21,.3,-6,3.9,2],[c.famoso+1.4,.25,14,.25,0,5.2,-3],[c.pregunta+.3,.15,17,.3,0,6.5,-2],[c.leo+1,.1,18,.3,0,6.5,-2],
  [c.pillas,.3,19,.3,0,5.5,-1],[c.loop,.7,18,.3,0,5.8,-1],[end-.3,1.0,16,.3,0,6.0,-1.2],[1e9,1.0,16,.3,0,6.0,-1.2]];
 CK.forEach(r=>{if(r[0]>c.oregon+.01) r[1]-=Math.PI*2;}); CK.find(r=>r[0]===c.oregon)[1]-=Math.PI*2;
 const ck=kf(CK,t); let [ca,cd,chh,lx,ly,lz]=ck; ca+=Math.sin(t*.35)*.04;
 const Lk=new THREE.Vector3(lx,ly,lz); if(t>c.corres&&t<c.oro68-.2){const jp=ST.J.position; const w=.55*seg(t,c.corres,c.corres+.4)*(1-seg(t,c.dos24+.6,c.oro68-.2)); Lk.lerp(new THREE.Vector3(jp.x,jp.y,jp.z),w);}
 const Lw=ROOM.clone().add(Lk); const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd));
 let pk=0; TL.punch.forEach(v=>{const d=t-v; if(d>=0&&d<.5) pk=Math.max(pk,Math.exp(-d*7));});
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*pk*.12; cam.position.y+=Math.cos(t*61)*pk*.12; cam.lookAt(Lw); cam.near=.1; cam.fov=50-pk*3; cam.updateProjectionMatrix();
 // periódico: sale de la cámara del fotógrafo y vuela hasta la pantalla
 const nIn=seg(t,c.titular-.5,c.titular+.4), nOut=seg(t,c.sigues-.1,c.sigues+.5); ST.paper.visible=nIn>0&&nOut<1;
 if(ST.paper.visible){const p0=new THREE.Vector3(); ST.photo.children[ST.photo.children.length-3].getWorldPosition(p0); const fw=new THREE.Vector3(); cam.getWorldDirection(fw);
  const p1=cam.position.clone().addScaledVector(fw,7.6).add(new THREE.Vector3(0,.35,0)); const e=eio(nIn); ST.paper.position.copy(p0).lerp(p1,e); ST.paper.quaternion.copy(cam.quaternion); ST.paper.rotateZ((1-e)*Math.PI*4);
  ST.paper.scale.setScalar(Math.max(.02,e)); if(nOut>0){const rt=new THREE.Vector3(1,0,0).applyQuaternion(cam.quaternion); ST.paper.position.addScaledVector(rt,-eio(nOut)*9); ST.paper.rotateZ(nOut*2);}}
 // banderas
 const mx=seg(t,c.mexico+.3,c.mexico+2.2)*(1-seg(t,c.munich,c.munich+1.4)), gr=seg(t,c.munich+.3,c.munich+1.8);
 ST.fMex.visible=t>c.mexico&&t<c.munich+1.5; ST.fMex.userData.fl.position.y=lerp(3.5,13,eio(mx)); ST.fGer.visible=t>c.munich&&t<c.loop; ST.fGer.userData.fl.position.y=lerp(3.5,13,eio(gr*(1-seg(t,c.pillas,c.loop)))); ST.fGer.userData.fl.material.color.setHex(0xa8a8a8);
 const cn=seg(t,c.ojo,c.ojo+.8)*(1-seg(t,c.pregunta,c.pregunta+.5)); ST.fCan.visible=cn>0; ST.fCan.scale.setScalar(.42*Math.max(.01,back(cn)));
 [ST.fMex,ST.fGer,ST.fCan].forEach(f=>{if(f.visible) waveFlag(f.userData.fl,t);});
 // Múnich: 28 de 40
 ST.forty.forEach((o,i)=>{const s=back(seg(t,c.munich+.4+i*.02,c.munich+.85+i*.02))*(1-seg(t,c.ojo,c.ojo+.5)); o.J.visible=s>.01; if(!o.J.visible) return; o.J.scale.setScalar(Math.max(.01,s)); const u=o.J.userData;
  const on=u.flop&&t>c.v28-.2+i*.015; o.h.children[0].material.color.setHex(on?PCOLS[i%6]:0x6a6f7c); const hop=on?Math.max(0,Math.sin(t*4.2+u.ph)):0;
  o.J.position.y=1.73+hop*2.2; o.J.rotation.x=on?-1.5*hop:0; walk(o.h,t,4,u.ph,on?0:.08);});
 // Debbie Brill
 const bv=seg(t,c.ojo,c.ojo+.6)*(1-seg(t,c.pregunta,c.pregunta+.5)); ST.brill.visible=bv>.01; ST.brill.scale.setScalar(Math.max(.01,back(bv)));
 const bh=Math.max(0,Math.sin((t-c.brill)*3.4)); ST.brill.position.y=2.25+(t>c.brill?bh*2.4:0); ST.brill.rotation.set(t>c.brill?-1.5*bh:0,.6,0);
 // aviso en el cuello y nube de serrín
 const av=seg(t,c.cuello-.1,c.cuello+.3)*(1-seg(t,c.instituto,c.instituto+.4)); ST.alert.visible=av>0; if(av>0){const hp=new THREE.Vector3(); ST.head.getWorldPosition(hp); ST.alert.position.copy(hp).sub(ROOM).add(v3([0,1.9,0])); ST.alert.scale.setScalar(.8*back(av)*(1+Math.abs(Math.sin(t*6))*.12)); ST.alert.lookAt(cam.position);}
 const dt=ATT[6].K[2][0]; ST.dust.forEach((d,i)=>{const k=t-dt; d.visible=k>0&&k<1.6; if(!d.visible) return; const v=d.userData.v; d.position.set(v[0]*k*.7,1.1+v[1]*k-4.5*k*k,-3.7+v[2]*k*.7); if(d.position.y<1) d.position.y=1;});
 // comentarios
 ST.bub.forEach(b=>{const q=b.userData, d=t-c.leo-q.d; b.visible=d>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(d/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.2); b.position.set(q.x,q.y+Math.sin(t*2+q.ph)*.3,q.z); b.lookAt(cam.position);});
 // luces que siguen la mirada
 const kb=new THREE.Vector3(Lw.x,0,Lw.z); key.position.set(kb.x+8,30,kb.z+16); keyT.position.set(kb.x,3,kb.z); fill.position.set(kb.x-16,12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,6,kb.z-6);
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true;
 sky.position.copy(cam.position);
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0)+fl*.6; document.getElementById('gflash').style.opacity=Math.min(1,gf)*.4; document.getElementById('flash').style.opacity=0;
 C.render();
 const bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); document.getElementById('big').innerHTML=bg?bg[2]:''; document.getElementById('big').style.transform='scale('+(1+pk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
