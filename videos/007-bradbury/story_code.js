// ================= HISTORIA 007: tú eres Steven Bradbury (Salt Lake City 2002) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return lerp(K[j][1],K[j+1][1],e);};
const kfs=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return lerp(K[j][1],K[j+1][1],e);};
// pista: rectas de 40 y curvas de radio 16 (sentido antihorario)
const SL=40, RC=16, LT=2*SL+2*Math.PI*RC, ARC=Math.PI*RC;
function trackPos(s,d){s=((s%LT)+LT)%LT; if(s<SL) return {x:-20+s,z:RC+d,yaw:Math.PI/2,cv:0}; s-=SL;
 if(s<ARC){const a=s/RC; return {x:20+Math.sin(a)*(RC+d),z:Math.cos(a)*(RC+d),yaw:Math.atan2(Math.cos(a),-Math.sin(a)),cv:1};} s-=ARC;
 if(s<SL) return {x:20-s,z:-RC-d,yaw:-Math.PI/2,cv:0}; s-=SL; const a=s/RC; return {x:-20-Math.sin(a)*(RC+d),z:-Math.cos(a)*(RC+d),yaw:Math.atan2(-Math.cos(a),Math.sin(a)),cv:1};}
function ausTex(){return canvasTex(600,300,(x,w,h)=>{x.fillStyle='#012169';x.fillRect(0,0,w,h);const cw=w/2,ch=h/2;
 x.save();x.beginPath();x.rect(0,0,cw,ch);x.clip();x.strokeStyle='#fff';x.lineWidth=30;x.beginPath();x.moveTo(0,0);x.lineTo(cw,ch);x.moveTo(cw,0);x.lineTo(0,ch);x.stroke();
 x.strokeStyle='#c8102e';x.lineWidth=10;x.beginPath();x.moveTo(0,0);x.lineTo(cw,ch);x.moveTo(cw,0);x.lineTo(0,ch);x.stroke();
 x.fillStyle='#fff';x.fillRect(cw/2-25,0,50,ch);x.fillRect(0,ch/2-25,cw,50);x.fillStyle='#c8102e';x.fillRect(cw/2-15,0,30,ch);x.fillRect(0,ch/2-15,cw,30);x.restore();
 const star=(cx,cy,r)=>{x.beginPath();for(let i=0;i<14;i++){const a=i/14*Math.PI*2-Math.PI/2, rr=i%2?r*.45:r; x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);} x.closePath(); x.fill();};
 x.fillStyle='#fff'; star(cw/2,ch*1.5,34); [[450,240,18],[380,140,18],[450,50,18],[520,120,18],[480,165,10]].forEach(s=>star(...s));});}
function boardTex(l1,l2){return canvasTex(512,256,(x,w,h)=>{x.fillStyle='#0b1020';x.fillRect(0,0,w,h);x.strokeStyle='#3fb8ff';x.lineWidth=8;x.strokeRect(6,6,w-12,h-12);
 x.fillStyle='#fff';x.font='900 92px Nunito, sans-serif';x.textAlign='center';x.fillText(l1,w/2,120);x.fillStyle='#ffd23f';x.font='900 52px Nunito, sans-serif';x.fillText(l2,w/2,200);});}
function rrShape(w,d,r){const s=new THREE.Shape(); const x0=-w/2,z0=-d/2; s.moveTo(x0+r,z0); s.lineTo(x0+w-r,z0); s.absarc(x0+w-r,z0+r,r,-Math.PI/2,0); s.lineTo(x0+w,z0+d-r); s.absarc(x0+w-r,z0+d-r,r,0,Math.PI/2); s.lineTo(x0+r,z0+d); s.absarc(x0+r,z0+d-r,r,Math.PI/2,Math.PI); s.lineTo(x0,z0+r); s.absarc(x0+r,z0+r,r,Math.PI,Math.PI*1.5); return s;}
function mkSkater(col,W0){const J=new THREE.Group(); J.rotation.order='YXZ'; const h=human(col,1.6); h.position.y=-2.4; J.add(h); W0.add(J);
 const hm=new THREE.Mesh(new THREE.SphereGeometry(.34,20,12,0,Math.PI*2,0,Math.PI*.55),M(col===0xff9a4a?0xffd23f:0xf2f2f2,{roughness:.3,metalness:.2})); hm.position.y=2.55; h.add(hm);
 const gg=new THREE.Mesh(new THREE.BoxGeometry(.42,.1,.12),M(0x111111,{roughness:.2,metalness:.6})); gg.position.set(0,2.52,.27); h.add(gg);
 for(const L of [h.userData.lL,h.userData.lR]){const bl=new THREE.Mesh(new THREE.BoxGeometry(.06,.08,1.1),M(0xcfd6e6,{metalness:.9,roughness:.2})); bl.position.set(0,-1.12,.15); L.add(bl);}
 return {J,h};}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 const ice=new THREE.Mesh(new THREE.ShapeGeometry(rrShape(100,64,28),48),M(0xc9d8e6,{roughness:.22,metalness:.15})); ice.rotation.x=-Math.PI/2; ice.position.y=.03; W0.add(ice);
 // líneas pintadas y tacos de las curvas
 const lineM=new THREE.MeshBasicMaterial({color:0xd14a5a}); [-30,30].forEach(x=>{const l=new THREE.Mesh(new THREE.PlaneGeometry(.5,62),new THREE.MeshBasicMaterial({color:0x4a7fd6})); l.rotation.x=-Math.PI/2; l.position.set(x,.04,0); W0.add(l);});
 const cen=new THREE.Mesh(new THREE.RingGeometry(5.6,6,64),lineM); cen.rotation.x=-Math.PI/2; cen.position.y=.04; W0.add(cen);
 const blkM=M(0x15171d,{roughness:.6}); for(const cx of [20,-20]) for(let i=0;i<7;i++){const a=i/6*Math.PI; const b=new THREE.Mesh(new THREE.CylinderGeometry(.35,.45,.45,12),blkM); const sg=cx>0?1:-1; b.position.set(cx+sg*Math.sin(a)*RC,.25,(cx>0?1:-1)*Math.cos(a)*RC); W0.add(b);}
 const fin=new THREE.Mesh(new THREE.PlaneGeometry(.45,14),new THREE.MeshBasicMaterial({color:0xff2d46})); fin.rotation.x=-Math.PI/2; fin.position.set(-12,.05,RC+3); W0.add(fin);
 // vallas acolchadas
 const ring=rrShape(104,68,30); ring.holes.push(rrShape(100,64,28)); const bd=new THREE.Mesh(new THREE.ExtrudeGeometry(ring,{depth:3,bevelEnabled:false,curveSegments:48}),M(0x2f6fd6,{roughness:.7})); bd.rotation.x=-Math.PI/2; W0.add(bd);
 const ring2=rrShape(104.6,68.6,30.3); ring2.holes.push(rrShape(103.4,67.4,29.7)); const tp=new THREE.Mesh(new THREE.ExtrudeGeometry(ring2,{depth:.4,bevelEnabled:false,curveSegments:48}),M(0xf2f2f2)); tp.rotation.x=-Math.PI/2; tp.position.y=3; W0.add(tp);
 // gradas (pabellón) con público
 const ST2=new THREE.Group(); ST2.scale.set(1.45,1,1); W0.add(ST2); const tierM=new THREE.MeshStandardMaterial({color:0x22262f,roughness:.8,side:THREE.DoubleSide});
 const pos=[],cols=[]; const cc0=[0xd9d2c4,0xff4f4f,0x3fb8ff,0xffc21a,0x7a7f8c,0x5a5f6b,0xffffff,0x2e7d32];
 for(let i=0;i<7;i++){const r=42+i*3.2; const t=new THREE.Mesh(new THREE.CylinderGeometry(r+3.2,r,2.6,128,1,true),tierM); t.position.y=1.3+i*2.6+1; ST2.add(t);
  const n=Math.floor(2*Math.PI*(r+1.6)/1.2); for(let k=0;k<n;k++){const a=k/n*Math.PI*2+i*.2; pos.push([Math.sin(a)*(r+1.8),3.3+i*2.6,Math.cos(a)*(r+1.8),a]); cols.push(cc0[Math.floor(rnd()*cc0.length)]);}}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.55,1.1,.8),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const dm=new THREE.Object3D(), cc=new THREE.Color();
 pos.forEach((p,k)=>{dm.position.set(p[0],p[1],p[2]); dm.rotation.y=p[3]; dm.updateMatrix(); im.setMatrixAt(k,dm.matrix); im.setColorAt(k,cc.setHex(cols[k]));}); ST2.add(im); ST.crowd=im;
 ST.hall=new THREE.HemisphereLight(0xe8f0ff,0x1a1a22,.5); S.add(ST.hall);
 // cartel de la carrera junto a la meta
 ST.board=new THREE.Mesh(new THREE.PlaneGeometry(6,3),new THREE.MeshBasicMaterial({map:boardTex('CUARTOS','1000 m')})); ST.board.position.set(-12,4.2,RC-6.5); W0.add(ST.board);
 const bp=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,2.8,8),M(0x50555f)); bp.position.set(-12,1.4,RC-6.6); W0.add(bp); ST.boardKey='';
 // patinadores: tú (naranja) y 4 rivales (A=Ohno, B=Li, C=Ahn, D=Turcotte)
 ST.you=mkSkater(0xff9a4a,W0); ST.head=ST.you.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.02,.27); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 ST.riv=[0x3fb8ff,0xff2d46,0xffc21a,0x7dff9a].map(c=>mkSkater(c,W0));
 ST.medal=new THREE.Group(); const md=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.05,28),goldM); md.rotation.x=Math.PI/2; md.position.set(0,1.75,.4); ST.medal.add(md);
 for(const s of [-1,1]){const rb=new THREE.Mesh(new THREE.BoxGeometry(.07,.55,.03),M(0x2a62d8)); rb.position.set(s*.12,2.0,.36); rb.rotation.z=s*.35; ST.medal.add(rb);} ST.you.h.add(ST.medal);
 ST.flag=makeFlag(['#fff'],false); ST.flag.userData.fl.material.map=ausTex(); ST.flag.scale.setScalar(.6); ST.flag.position.set(7,0,1); W0.add(ST.flag);
 ST.xI=await icon3D('close-circle',0xff2d46,1.1,{depth:3}); ST.okI=await icon3D('check-circle',0x7dff9a,1.1,{depth:3}); ST.bulb=await icon3D('lightbulb-on',0xffd23f,1.2,{depth:3}); ST.earth=await icon3D('earth',0x3fb8ff,1.6,{depth:3});
 [ST.xI,ST.okI,ST.bulb,ST.earth].forEach(m=>{m.visible=false; W0.add(m);});
 ST.rule=new THREE.Mesh(new THREE.BoxGeometry(1,.08,.25),new THREE.MeshBasicMaterial({color:0xffd23f})); ST.rule.visible=false; W0.add(ST.rule);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.2,{depth:2}); b.userData={x:(rnd()-.5)*12,y:5+rnd()*5,z:(rnd()-.5)*5,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; window.popsReady=true;};
let RACE=null;
function setupRace(c){const end=TL.end;
 RACE={LEAD:[[0,100],[c.como,118],[c.salt,8],[6.88,8],[12.9,188.5],[c.semi,250],[c.chocan,333],[23.3,350],[c.idea,370],[32.5,560],[c.ultvuelta,646],[c.roza,690],[41,705],[50,708],[58.5,801],[end,822]],
  YOU:[[0,78],[c.como,96],[c.salt,8],[6.88,8],[13.25,188.5],[c.semi,240],[c.chocan,321],[c.esquivas,345],[c.entras,369],[c.idea,385],[32.5,545],[c.quince,592],[c.ultvuelta,624],[c.roza,668],[40.5,690],[c.hueco,712],[44.3,730],[47,758],[55,760],[58.5,781],[end,800]],
  YD:[[0,1],[c.como,1],[c.salt,.8],[6.88,.8],[8.5,1],[20.6,1],[21.2,-2.8],[22.3,-2.8],[23.2,1],[40.8,1],[41.6,-2.8],[43.4,-2.8],[44.6,1],[1e9,1]],
  OFF:[[[0,0],[1e9,0]],[[0,3],[c.salt,0],[6.88,0],[9,2.5],[c.semi,3],[1e9,3]],[[0,6],[c.salt,0],[6.88,0],[10,15],[13.6,15],[c.semi,6],[1e9,6]],[[0,9],[1e9,9]]],
  D:[[[0,0],[c.salt,-2.4],[6.88,-2.4],[8.5,0],[1e9,0]],[[0,1.6],[c.salt,-.8],[6.88,-.8],[8.5,1.6],[c.roza-.5,1.6],[c.roza,.4],[c.choca-.4,.4],[c.choca,-.6],[1e9,-.6]],[[0,-1.2],[c.salt,2.4],[6.88,2.4],[8.5,-1.2],[1e9,-1.2]],[[0,2.4],[1e9,2.4]]],
  CR:[[[c.chocan,23.0],[c.roza+.15,50]],[[c.chocan+.12,23.2],[c.roza+.2,50.3]],[[c.chocan+.28,23.4],[c.choca+.1,50.6]],[[c.suelo+.2,50.9]]]};}
const leadS=t=>kfl(RACE.LEAD,t);
function rivalS(i,t){return leadS(t)-kfs(RACE.OFF[i],t);}
function skPose(J,h,p,o){const U=h.userData; J.position.set(p.x,o.y,p.z); J.rotation.set(o.pitch,o.yaw,o.roll);
 U.lL.rotation.set(o.lx,0,o.lz); U.lR.rotation.set(o.rx,0,o.rz); U.aL.rotation.set(o.ax,0,.15); U.aR.rotation.set(o.bx,0,-.15);}
function crouch(yaw,cv,sp,t,ph){const k=cl(sp/24), st=Math.sin(t*7+ph); return {y:2.0,yaw,pitch:.85,roll:-.32*cv,lx:-.85,rx:-.85,lz:.25+.35*k*Math.max(0,st),rz:-(.25+.35*k*Math.max(0,-st)),ax:.9,bx:-.2+.9*k*st};}
const lying=(yaw,spin)=>({y:.62,yaw:yaw+spin,pitch:0,roll:Math.PI/2,lx:-.4,rx:.3,lz:.4,rz:-.3,ax:-1.6,bx:-.4});
function mixPose(a,b,e){const r={}; for(const k in a) r[k]=lerp(a[k],b[k],e); return r;}
const BIG=[["","oro","EL MÁS LENTO<small>de la final olímpica</small>"],["oro","como","ORO<small>sin adelantar a nadie</small>"],["salt","rivales","<span style=\"font-size:120px\">SALT LAKE 2002</span><small>1000 m · patinaje en pista corta</small>"],
 ["cuartos","elim","CUARTOS"],["elim","descal","3.º<small>eliminado</small>"],["descal","pasas","<span style=\"font-size:120px\">DESCALIFICADO</span><small>un rival</small>"],["pasas","semi","PASAS"],
 ["semi","chocan","SEMIFINAL"],["entras","idea","1.º<small>¡a la final!</small>"],["atras","final","<span style=\"font-size:120px\">QUÉDATE ATRÁS</span><small>en pista corta hay muchas caídas</small>"],
 ["final","quince","FINAL<small>5 patinadores</small>"],["quince","ultvuelta","15 m<small>detrás de todos</small>"],["ultvuelta","ultcurva","<span style=\"font-size:130px\">ÚLTIMA VUELTA</span>"],["ultcurva","roza","<span style=\"font-size:130px\">ÚLTIMA CURVA</span>"],
 ["oro2","hemis","¡ORO!<small>primer oro de Australia en invierno</small>"],["hemis","suerte","<span style=\"font-size:120px\">HEMISFERIO SUR</span><small>el primero de todo el hemisferio</small>"],["suerte","pregunta","¿SUERTE?"],["pregunta","leo","¿Y TÚ?"]];
window.render=(t)=>{const c=TL.cues; if(!RACE) setupRace(c); const end=TL.end; const W0=ST.W;
 // ---- rivales
 const RP=[]; ST.riv.forEach((sk,i)=>{let s=rivalS(i,t), d=kfs(RACE.D[i],t), pose=null; const sp=(rivalS(i,t+.05)-rivalS(i,t-.05))*10;
  let tp=trackPos(s,d);
  if(i===3){ // D espera en el centro de la pista hasta la final
   const inf={x:2,z:-2,yaw:Math.PI/2,cv:0}; const toIn=seg(t,c.como,c.salt), toTr=seg(t,c.final,c.final+1.4); const wIn=t<c.final?toIn:1-eio(toTr);
   if(wIn>0){tp={x:lerp(tp.x,inf.x,eio(wIn)),z:lerp(tp.z,inf.z,eio(wIn)),yaw:wIn>.5?inf.yaw:tp.yaw,cv:tp.cv*(1-wIn)};}
   if(wIn>=1){pose={y:2.4,yaw:Math.PI/2+Math.sin(t*.8)*.3,pitch:0,roll:0,lx:0,rx:0,lz:.05,rz:-.05,ax:.1,bx:.1};}}
  for(const [tc,tu] of RACE.CR[i]){if(t>=tc&&t<tu+1.6){const s0=rivalS(i,tc), v0=Math.max(6,(rivalS(i,tc+.05)-rivalS(i,tc-.05))*10)*.7, k=1.1, dt=Math.min(t,tu)-tc;
    const ss=s0+v0*(1-Math.exp(-dt*k))/k, dd=kfs(RACE.D[i],tc)+7*(1-Math.exp(-dt*1.3)); const tps=trackPos(ss,dd); const ly=lying(tps.yaw,dt*2.2*(i%2?1:-1)); const fall=eio(seg(t,tc,tc+.35));
    const cr=crouch(tps.yaw,tps.cv,sp,t,i); let ps=mixPose(cr,ly,fall), P=tps;
    if(t>=tu){const g=eio(seg(t,tu,tu+1.6)); const up=crouch(tp.yaw,tp.cv,10,t,i); ps=mixPose(ly,up,g); P={x:lerp(tps.x,tp.x,g),z:lerp(tps.z,tp.z,g)};}
    tp=P; pose=ps; break;}}
  if(!pose) pose=crouch(tp.yaw,tp.cv,Math.abs(sp),t,i*1.7);
  skPose(sk.J,sk.h,tp,pose); RP.push(new THREE.Vector3(tp.x,0,tp.z));});
 // ---- tú
 const ys=kfl(RACE.YOU,t), yd=kfs(RACE.YD,t), ysp=(kfl(RACE.YOU,t+.05)-kfl(RACE.YOU,t-.05))*10; const yp=trackPos(ys,yd);
 let yo=crouch(yp.yaw,yp.cv,Math.abs(ysp),t,.5); const upr=seg(t,c.meta+.3,c.meta+1)*(1-seg(t,55,56.5)); const arms=seg(t,c.brazos-.2,c.brazos+.4)*(1-seg(t,c.oro2+1.2,c.oro2+2));
 if(upr>0){const u={y:2.4,yaw:yp.yaw,pitch:.05,roll:0,lx:0,rx:0,lz:.12,rz:-.12,ax:-2.9*arms+.1*(1-arms),bx:-2.9*arms+.1*(1-arms)}; yo=mixPose(yo,u,eio(upr));}
 skPose(ST.you.J,ST.you.h,yp,yo); const Y=new THREE.Vector3(yp.x,0,yp.z);
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)?.15:1,1));
 const PC=RP.slice(0,3).reduce((a,b)=>a.add(b),new THREE.Vector3()).multiplyScalar(1/3);
 // ---- cartel
 const bk=t<c.como?'FINAL|ÚLTIMA VUELTA':t<c.semi?'CUARTOS|1000 m':t<c.final?'SEMIFINAL|1000 m':t<c.ultvuelta?'FINAL|1000 m':'FINAL|ÚLTIMA VUELTA';
 if(bk!==ST.boardKey){ST.boardKey=bk; const [a,b]=bk.split('|'); ST.board.material.map=boardTex(a,b); ST.board.material.needsUpdate=true;}
 // regla de 15 m entre tú y el grupo
 const rv=seg(t,c.quince,c.quince+.3)*(1-seg(t,c.ultvuelta+.6,c.ultvuelta+1)); ST.rule.visible=rv>0; if(rv>0){const tg=RP[3]; const mid=Y.clone().lerp(tg,.5); ST.rule.position.set(mid.x,.15,mid.z); const dl=Y.distanceTo(tg); ST.rule.scale.set(dl*rv,1,1); ST.rule.rotation.y=-Math.atan2(tg.z-Y.z,tg.x-Y.x);}
 // medalla y bandera
 const ms=back(seg(t,c.oro2,c.oro2+.45)); ST.medal.visible=t>c.oro2; ST.medal.scale.setScalar(Math.max(.01,ms)); ST.medal.position.y=(1-seg(t,c.oro2,c.oro2+.45))*2.5;
 const fu=seg(t,c.primer,c.primer+1.6)*(1-seg(t,c.pillas,c.loop)); ST.flag.userData.fl.position.y=lerp(3.5,13,eio(fu)); ST.flag.userData.fl.visible=fu>.02; waveFlag(ST.flag.userData.fl,t);
 // ---- CÁMARA [t, ángulo, distancia, altura, peso hacia el grupo, altura de la mirada]
 const CK=[[0,1.95,19,.3,.3,3.2],[c.como,1.9,19,.32,.3,3.2],[c.salt,.15,20,.33,.5,2.6],[6.88,.25,19,.32,.5,2.6],[9.5,.6,22,.36,.5,2.4],[12.4,.15,18,.3,.5,2.4],[c.elim,.05,15,.3,.3,2.6],[c.descal+.2,.1,18,.3,.85,3.2],
  [c.semi,-.2,20,.4,.6,2.6],[c.curva,-.75,19,.48,.6,2.4],[c.chocan+.6,-.95,16,.55,.5,2.2],[c.esquivas,-1.1,15,.5,.2,2.4],[c.entras,-.2,15,.32,.05,2.6],[c.idea+.3,.05,11,.28,0,3.4],
  [c.atras,.0,24,.7,.5,2.4],[c.lejos,.2,28,.75,.5,2.4],[c.final,.25,22,.45,.5,2.6],[c.quince,.1,24,.4,.5,2.4],[c.ultvuelta,1.3,20,.42,.55,2.4],[c.ultcurva,-.6,18,.5,.7,2.4],
  [c.roza,-.8,15,.5,.75,2.2],[c.suelo,-1.15,15,.55,.7,2],[c.domino,-1.3,16,.55,.55,2],[c.hueco,-.9,14,.4,.15,2.4],[c.meta,-.1,13,.3,0,2.8],[c.brazos+.4,1.2,11,.26,0,3.4],
  [c.oro2+.5,1.3,10,.24,0,3.8],[c.primer+.6,.55,17,.3,0,4.5],[c.suerte,.6,14,.28,0,3.8],[c.pregunta,.9,15,.3,0,4.2],[c.leo+1,1.0,17,.3,0,4.8],[c.pillas,1.2,16,.3,.2,3.4],[c.loop,1.7,17,.3,.3,3.0],[end-.2,1.95,19,.3,.3,3.2],[1e9,1.95,19,.3,.3,3.2]];
 const [ca,cd,chh,cw,cly]=kf(CK,t); const T=Y.clone().lerp(PC,cw); const Lw=ROOM.clone().add(new THREE.Vector3(T.x,cly,T.z));
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd));
 let pk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.5) pk=Math.max(pk,Math.exp(-dd*7));});
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*pk*.12; cam.position.y+=Math.cos(t*61)*pk*.12; cam.lookAt(Lw); cam.near=.1; cam.fov=50-pk*3; cam.updateProjectionMatrix();
 // ---- iconos sobre las cabezas
 const above=(m,P,s,on,yo2=6.2)=>{m.visible=on>0.01; if(!m.visible) return; m.position.set(P.x,yo2+Math.sin(t*3)*.15,P.z); m.scale.setScalar(s*back(on)); m.lookAt(cam.position);};
 above(ST.xI,RP[1],.8,seg(t,c.descal,c.descal+.4)*(1-seg(t,c.semi,c.semi+.3)));
 above(ST.okI,Y,1.1,seg(t,c.pasas-.1,c.pasas+.3)*(1-seg(t,c.semi+.2,c.semi+.5)));
 above(ST.bulb,Y,1.2,seg(t,c.idea,c.idea+.4)*(1-seg(t,c.lejos+.6,c.lejos+1)));
 above(ST.earth,Y,1.05,seg(t,c.hemis,c.hemis+.4)*(1-seg(t,c.suerte,c.suerte+.4)),6.6); if(ST.earth.visible) ST.earth.rotateY(t*1.5%6.28);
 // comentarios
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.2); b.position.set(Y.x+q.x,q.y+Math.sin(t*2+q.ph)*.3,Y.z+q.z); b.lookAt(cam.position);});
 const kb=new THREE.Vector3(Lw.x,0,Lw.z); key.position.set(kb.x+8,30,kb.z+16); keyT.position.set(kb.x,3,kb.z); fill.position.set(kb.x-16,12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,6,kb.z-6);
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true;
 sky.position.copy(cam.position);
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.4; document.getElementById('flash').style.opacity=0;
 C.render();
 const bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); document.getElementById('big').innerHTML=bg?bg[2]:''; document.getElementById('big').style.transform='scale('+(1+pk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
