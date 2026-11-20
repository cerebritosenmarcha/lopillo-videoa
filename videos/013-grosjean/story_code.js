// ================= HISTORIA 013: tú eres Romain Grosjean (Baréin, 2020) =================
const ROOM=new THREE.Vector3(0,0,-400); const ST={}; const cl=x=>Math.min(1,Math.max(0,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const kf=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=eio(seg(t,K[j][0],K[j+1][0])); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const kfl=(K,t)=>{let j=0; while(j<K.length-2&&t>=K[j+1][0]) j++; const e=seg(t,K[j][0],K[j+1][0]); return K[j].slice(1).map((v,i)=>lerp(v,K[j+1][i+1],e));};
const BX=9.6, IPZ=-200; // guardarraíl en x=BX; punto de impacto en z=IPZ
function trackTex(){return canvasTex(512,2048,(x,w,h)=>{x.fillStyle='#2a2d33';x.fillRect(0,0,w,h);for(let i=0;i<3000;i++){x.fillStyle=Math.random()<.5?'#30333a':'#25282d';x.fillRect(Math.random()*w,Math.random()*h,3,3);}
 x.fillStyle='#e8e8e8';x.fillRect(8,0,10,h);x.fillRect(w-18,0,10,h);});}
function kerbTex(){return canvasTex(64,512,(x,w,h)=>{for(let i=0;i<16;i++){x.fillStyle=i%2?'#f2f2f2':'#d92a2a';x.fillRect(0,i*h/16,w,h/16);}});}
function makeCar(col,acc){const G=new THREE.Group(); const F=new THREE.Group(), Rr=new THREE.Group(); G.add(F); G.add(Rr);
 const body=M(col,{roughness:.35,metalness:.35}), dark=M(0x1a1c22,{roughness:.6}), red=M(acc,{roughness:.4}), tyre=M(0x15161a,{roughness:.8});
 const mono=new THREE.Mesh(new RoundedBoxGeometry(1.5,.85,4.6,3,.25),body); mono.position.set(0,.6,-.8); F.add(mono);
 const nose=new THREE.Mesh(new THREE.CylinderGeometry(.18,.45,2.2,16),body); nose.rotation.x=Math.PI/2; nose.position.set(0,.45,-4.1); F.add(nose);
 const stripe=new THREE.Mesh(new THREE.BoxGeometry(.3,.02,4.2),red); stripe.position.set(0,1.04,-1.4); F.add(stripe);
 const fw=new THREE.Mesh(new THREE.BoxGeometry(3.6,.1,.8),red); fw.position.set(0,.18,-4.9); F.add(fw);
 for(const s of [-1,1]){const ep=new THREE.Mesh(new THREE.BoxGeometry(.08,.5,.9),dark); ep.position.set(s*1.8,.35,-4.9); F.add(ep);
  const w=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,.55,24),tyre); w.rotation.z=Math.PI/2; w.position.set(s*1.55,.6,-3.0); F.add(w);
  const sp=new THREE.Mesh(new RoundedBoxGeometry(.9,.6,2.2,2,.2),body); sp.position.set(s*1.05,.45,.6); F.add(sp);}
 const halo=new THREE.Group(); const hm=M(0x9aa0aa,{metalness:.8,roughness:.25,emissive:0xffc21a,emissiveIntensity:0});
 const arc=new THREE.Mesh(new THREE.TorusGeometry(.62,.09,10,32,Math.PI),hm); arc.rotation.x=-Math.PI/2; arc.rotation.z=Math.PI; arc.position.set(0,1.45,.35); halo.add(arc);
 for(const s of [-1,1]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.5,8),hm); leg.position.set(s*.62,1.2,.35); halo.add(leg);}
 const strut=new THREE.Mesh(new THREE.CylinderGeometry(.06,.07,.85,8),hm); strut.position.set(0,1.2,-.45); strut.rotation.x=-.85; halo.add(strut); F.add(halo);
 const eng=new THREE.Mesh(new RoundedBoxGeometry(1.2,1.0,3.0,3,.3),body); eng.position.set(0,.75,2.9); Rr.add(eng);
 const fin=new THREE.Mesh(new THREE.BoxGeometry(.06,.5,1.6),red); fin.position.set(0,1.4,3.2); Rr.add(fin);
 const rw=new THREE.Mesh(new THREE.BoxGeometry(2.6,.12,.7),red); rw.position.set(0,1.75,4.4); Rr.add(rw);
 for(const s of [-1,1]){const ep=new THREE.Mesh(new THREE.BoxGeometry(.08,1.1,1),dark); ep.position.set(s*1.3,1.3,4.4); Rr.add(ep);
  const w=new THREE.Mesh(new THREE.CylinderGeometry(.66,.66,.75,24),tyre); w.rotation.z=Math.PI/2; w.position.set(s*1.5,.66,3.4); Rr.add(w);}
 G.userData={F,Rr,hm}; return G;}
async function buildStory(){
 const W0=new THREE.Group(); W0.position.copy(ROOM); S.add(W0); ST.W=W0;
 const tr=new THREE.Mesh(new THREE.PlaneGeometry(20,340),new THREE.MeshStandardMaterial({map:trackTex(),roughness:.85})); tr.rotation.x=-Math.PI/2; tr.position.set(0,.02,-130); W0.add(tr);
 const run=new THREE.Mesh(new THREE.PlaneGeometry(40,340),M(0x3a3326,{roughness:.95})); run.rotation.x=-Math.PI/2; run.position.set(0,.01,-130); W0.add(run);
 const kt=kerbTex(); kt.wrapT=THREE.RepeatWrapping; kt.repeat.set(1,12); for(const s of [-1,1]){const k=new THREE.Mesh(new THREE.PlaneGeometry(1.2,120),new THREE.MeshStandardMaterial({map:kt,roughness:.7})); k.rotation.x=-Math.PI/2; k.position.set(s*10.4,.03,-200); W0.add(k);}
 for(let i=0;i<6;i++){const g=new THREE.Mesh(new THREE.BoxGeometry(3,.01,.15),new THREE.MeshBasicMaterial({color:0xeeeeee})); g.position.set(i%2?-3:3,.04,8+i*7-2); W0.add(g);}
 // semáforo de salida
 const gan=new THREE.Mesh(new THREE.BoxGeometry(14,1.4,.6),M(0x1a1c22)); gan.position.set(0,7,-10); W0.add(gan);
 for(const s of [-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,7,10),M(0x30343c)); p.position.set(s*7.4,3.5,-10); W0.add(p);}
 ST.lights=[0,1,2,3,4].map(i=>{const l=new THREE.Mesh(new THREE.SphereGeometry(.42,16,12),new THREE.MeshStandardMaterial({color:0x330808,emissive:0xff1a1a,emissiveIntensity:0})); l.position.set(-4+i*2,7,-9.6); W0.add(l); return l;});
 // guardarraíl triple
 ST.rails=[]; const rm=M(0xc9ced6,{metalness:.7,roughness:.3});
 for(let z=-140;z>-262;z-=4){for(const y of [.55,.95,1.35]){const r=new THREE.Mesh(new THREE.BoxGeometry(.14,.32,4.05),rm); r.userData={z:z-2,y}; r.position.set(BX,y,z-2); W0.add(r); ST.rails.push(r);}
  const post=new THREE.Mesh(new THREE.BoxGeometry(.2,1.6,.2),M(0x6a6f7c)); post.position.set(BX+.25,.8,z); W0.add(post);}
 // gradas, focos y público
 const pos=[]; const cs=[0xd9d2c4,0x2a62d8,0xffd23f,0x2e9a4a,0xffffff,0x3a3f4a,0xd92a2a]; const stM=M(0x22262f,{roughness:.8});
 for(let r=0;r<6;r++){const st=new THREE.Mesh(new THREE.BoxGeometry(2.8,1.4+r*1.4,70),stM); st.position.set(-15-r*2.8,.7+r*.7,-15); W0.add(st); for(let k=0;k<34;k++) pos.push([-15-r*2.8,1.9+r*1.4,-49+k*2.05]);}
 for(let r=0;r<5;r++){const st=new THREE.Mesh(new THREE.BoxGeometry(2.8,1.4+r*1.4,70),stM); st.position.set(-22-r*2.8,.7+r*.7,-205); W0.add(st); for(let k=0;k<34;k++) pos.push([-22-r*2.8,1.9+r*1.4,-239+k*2.05]);}
 const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.6,1.1,.6),new THREE.MeshStandardMaterial({roughness:.8}),pos.length); const dm=new THREE.Object3D(), cc=new THREE.Color();
 pos.forEach((p,k)=>{dm.position.set(p[0],p[1],p[2]); dm.updateMatrix(); im.setMatrixAt(k,dm.matrix); im.setColorAt(k,cc.setHex(cs[k%7]));}); W0.add(im); ST.crowd=im; ST.cpos=pos;
 for(let z=10;z>-260;z-=45){const p=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,16,8),M(0x30343c)); p.position.set(-13,8,z); W0.add(p); const lamp=new THREE.Mesh(new THREE.BoxGeometry(2.4,1,.6),new THREE.MeshBasicMaterial({color:0xfff2d0})); lamp.position.set(-12,16,z); W0.add(lamp);}
 // coches
 ST.car=makeCar(0xd9dce3,0xd92a2a); W0.add(ST.car);
 ST.riv=[[0x2a62d8,0xffffff,-3.5,-7],[0xd92a2a,0xffd23f,5.6,-1.5],[0x19c3b0,0x1a1c22,-3.5,-21],[0xffc21a,0x1a1c22,4.5,-16],[0x1d2a5a,0xff4fd8,-3.5,9]].map(r=>{const c=makeCar(r[0],r[1]); c.userData.x0=r[2]; c.userData.z0=r[3]; W0.add(c); return c;});
 // tú: piloto con casco
 ST.J=new THREE.Group(); ST.J.rotation.order='YXZ'; ST.h=human(0xff9a4a,.75); ST.J.add(ST.h); W0.add(ST.J); ST.head=ST.h.children[1];
 ST.eyes=[-.11,.11].map(ex=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),new THREE.MeshBasicMaterial({color:0xffffff})); e.position.set(ex,.06,.26); const pu=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0x111111})); pu.position.z=.055; e.add(pu); ST.head.add(e); return e;});
 ST.helm=new THREE.Mesh(new THREE.SphereGeometry(.4,24,16),new THREE.MeshStandardMaterial({color:0xf2f2f2,metalness:.3,roughness:.3,transparent:true,opacity:.4})); ST.head.add(ST.helm);
 ST.visorM=new THREE.MeshStandardMaterial({color:0x2a3550,metalness:.8,roughness:.15,emissive:0xff6a1a,emissiveIntensity:0,transparent:true,opacity:.55});
 ST.visor=new THREE.Mesh(new THREE.SphereGeometry(.41,24,12,Math.PI/2-.95,1.9,1.05,.75),ST.visorM); ST.head.add(ST.visor);
 // fuego
 ST.flames=[]; const fg=new THREE.IcosahedronGeometry(1,1); for(let i=0;i<110;i++){const m=new THREE.Mesh(fg,new THREE.MeshBasicMaterial({color:0xffa020,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));
  const a=rnd()*6.28, r=Math.sqrt(rnd())*2.8; m.userData={x:Math.cos(a)*r,z:Math.sin(a)*r*1.4,ph:rnd(),sp:.7+rnd()*.6,s:.6+rnd()*.8}; m.castShadow=false; W0.add(m); ST.flames.push(m);}
 ST.fireL=new THREE.PointLight(0xff7a2a,0,45,1.4); W0.add(ST.fireL);
 // coche médico y comisario con extintor
 ST.med=new THREE.Group(); const mb=new THREE.Mesh(new RoundedBoxGeometry(2.4,1.5,5,3,.35),M(0xc9ced6,{metalness:.6,roughness:.3})); mb.position.y=1.05; ST.med.add(mb);
 const mw=new THREE.Mesh(new THREE.BoxGeometry(2.3,.6,2.4),M(0x1a1c22,{metalness:.6,roughness:.2})); mw.position.set(0,1.6,.2); ST.med.add(mw);
 ST.medL=[0xffc21a,0x3fb8ff].map((c,i)=>{const l=new THREE.Mesh(new THREE.BoxGeometry(.8,.25,.4),new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:0})); l.position.set(i?.5:-.5,1.95,.2); ST.med.add(l); return l;});
 for(const s of [-1,1]) for(const z of [-1.6,1.6]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.3,16),M(0x15161a)); w.rotation.z=Math.PI/2; w.position.set(s*1.2,.42,z); ST.med.add(w);} W0.add(ST.med);
 ST.mar=new THREE.Group(); ST.mh=human(0xf2f2f2,.75); ST.mar.add(ST.mh); const ext=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.7,12),M(0xd92a2a)); ext.position.set(0,1.3,.45); ext.rotation.x=1.2; ST.mar.add(ext); W0.add(ST.mar);
 ST.down=await icon3D('thumb-down',0xff2d46,1.3,{depth:3}); W0.add(ST.down); ST.up=await icon3D('thumb-up',0x7dff9a,1.5,{depth:3}); W0.add(ST.up);
 ST.bub=[]; for(let i=0;i<9;i++){const b=await icon3D(i%3?'message-text':'comment-question',[0x3fb8ff,0xff4fd8,0xffc21a,0x7dff9a,0xff7a1a][i%5],1.2,{depth:2}); b.userData={x:(rnd()-.5)*10,y:2+rnd()*5,z:(rnd()-.5)*6,d:i*.1,ph:rnd()*6}; b.visible=false; W0.add(b); ST.bub.push(b);}
}
window.setTL=async x=>{TL=x; await buildStory(); S.traverse(o=>{if(o.isMesh&&o!==floor&&o!==sky){o.castShadow=true; o.receiveShadow=true;}}); ST.crowd.castShadow=false; ST.flames.forEach(m=>{m.castShadow=false;m.receiveShadow=false;}); window.popsReady=true;};
let K=null, CELL=null, REAR=null;
function setupK(c){const end=TL.end;
 // [t, x, z, yaw] del coche entero hasta el impacto
 K={CAR:[[0,8.2,IPZ,-.45],[c.como,8.2,IPZ,-.45],[c.bahrein-.4,2,0,0],[c.luces,2,0,0],[c.vuelta,1.6,-14,0],[c.aceleras,.6,-50,0],[c.toque,0,-112,0],[c.disparado,2.6,-140,-.42],[c.impacto,8.2,IPZ,-.45],[1e9,8.2,IPZ,-.45]],
  CNT:[[0,0],[c.atrapado,1],[c.c5,5],[c.c10,10],[c.c15,15],[c.medico,17],[c.sales,25],[c.s27,27],[1e9,27]]};
 CELL={x:10.6,z:IPZ-2.4,yaw:-.5}; REAR={x:5.2,z:IPZ+5.5,yaw:-2.2};
 const W=v=>ROOM.clone().add(new THREE.Vector3(...v)); FX.init();
 const tp=kfl(K.CAR,c.toque); FX.burst('sparks',W([tp[0]+1.7,.6,tp[1]-2.8]),c.toque,70,[0xffd23f,0xffffff,0xff7a1a],1);
 FX.ring(W([BX,1,IPZ]),c.impacto,0xffffff,8,.7,new THREE.Vector3(1,0,0)); FX.burst('sparks',W([BX,1,IPZ]),c.impacto,160,[0xffd23f,0xffffff,0xff7a1a],1.6);
 FX.ring(W([8.5,1.5,IPZ+1]),c.bum,0xff7a1a,14,1.1); FX.burst('sparks',W([8.5,1.5,IPZ+1]),c.bum,220,[0xffd23f,0xff7a1a,0xd92a2a],2.2);
 [0,.45,.9,1.35,1.8,2.25].forEach(d=>FX.burst('dust',W([8.6,1.4,IPZ+2.2]),c.extintor+.3+d,40));
 FX.ring(W([7.6,.2,IPZ+2]),c.sales,0xffd23f,6,.9);
 FX.ring(W([CELL.x,1.5,CELL.z]),c.halo,0xffd23f,3,.9); FX.burst('sparks',W([CELL.x,1.6,CELL.z]),c.halo,90,[0xffd23f,0xffffff],1);
 FX.burst('sparks',W([CELL.x,1.8,CELL.z]),c.mejor,120,[0x7dff9a,0xffd23f,0xffffff],1.4); FX.ring(W([CELL.x,1.6,CELL.z]),c.mejor,0x7dff9a,7,1);
 FX.flashField(ST.cpos.map(p=>[ROOM.x+p[0],ROOM.y+p[1]+.6,ROOM.z+p[2]]));}
const S120=s=>'<span style="font-size:120px">'+s+'</span>', S100=s=>'<span style="font-size:100px">'+s+'</span>';
const BIG=[["","fuego0","192 km/h"],["fuego0","y27",S120("¡FUEGO!")],["y27","como","27 s<small>para salir con vida</small>"],["como","bahrein",S100("HASTA EL FINAL")],["bahrein","eres",S120("BARÉIN 2020")+"<small>Gran Premio de Fórmula 1</small>"],
 ["eres","luces",S100("ROMAIN GROSJEAN")],["luces","vuelta",S120("¡SALIDA!")],["vuelta","toque",S120("VUELTA 1")],["toque","disparado",S120("¡TOQUE!")],["disparado","impacto","192 km/h<small>hacia el guardarraíl</small>"],
 ["impacto","parte","67 G<small>de impacto</small>"],["parte","cabeza",S100("PARTIDO EN DOS")],["bum","atrapado",S120("¡FUEGO!")],["s27","manos","27 s<small>dentro del fuego</small>"],["manos","salvo",S120("¡VIVO!")+"<small>quemaduras en las manos</small>"],
 ["halo","mismo","HALO<small>arco de titanio</small>"],["mismo","despues",S120("«FEO»")+"<small>eso decías tú</small>"],["despues","pregunta",S100("LO MEJOR DE LA F1")],["pregunta","leo","¿Y TÚ?"]];
const _v=new THREE.Vector3();
window.render=(t)=>{const c=TL.cues; if(!K) setupK(c); const end=TL.end; const W0=ST.W;
 const hook=t<c.como||t>=c.loop-.2; const crashed=t>=c.impacto||t<c.como;
 // ---- tu coche: entero hasta el impacto, partido después (y en el gancho)
 let [cx,cz,cyaw]=kf(K.CAR,t); if(t>=c.disparado&&t<c.impacto){[cx,cz,cyaw]=kfl(K.CAR,t);}
 const split=t<c.como?1:t<c.bahrein-.4?1-eio(seg(t,c.como,c.bahrein-.4)):eio(seg(t,c.impacto,c.impacto+.9));
 const car=ST.car, F=car.userData.F, Rr=car.userData.Rr; car.position.set(cx,0,cz); car.rotation.set(0,cyaw,0);
 const loc=(dx,dz)=>[dx*Math.cos(cyaw)-dz*Math.sin(cyaw),dx*Math.sin(cyaw)+dz*Math.cos(cyaw)]; const fl=loc(CELL.x-cx,CELL.z-cz), rl=loc(REAR.x-cx,REAR.z-cz);
 F.position.set(lerp(0,fl[0],split),0,lerp(0,fl[1],split)); F.rotation.y=lerp(0,CELL.yaw-cyaw,split);
 Rr.position.set(lerp(0,rl[0],split),Math.sin(split*Math.PI)*1.5,lerp(0,rl[1],split)); Rr.rotation.set(0,lerp(0,REAR.yaw-cyaw,split),Math.sin(split*Math.PI)*.6);
 if(t>=c.disparado&&t<c.impacto){car.rotation.z=-Math.sin(seg(t,c.disparado,c.impacto)*Math.PI)*.04;}
 const glow=Math.max(.35*Math.sin(seg(t,c.protege,c.protege+1)*Math.PI),.5*seg(t,c.halo,c.halo+.4)*(1-seg(t,c.pregunta,c.pregunta+.5)),hook?.12:0); car.userData.hm.emissiveIntensity=glow;
 // ---- rivales
 ST.riv.forEach((r,i)=>{const u=r.userData; let z=u.z0; if(t>c.luces) z=u.z0-112*Math.pow(seg(t,c.luces,c.toque),1.6); if(t>c.toque) z=u.z0-112-(t-c.toque)*60;
  if(hook||t<c.bahrein-.4) z=u.z0-900; const x=u.x0-(i===1?2.2*Math.sin(seg(t,c.toque-.5,c.toque+.8)*Math.PI):0); r.position.set(x,0,z); r.rotation.set(0,0,0); r.visible=z>-330;});
 // ---- semáforo
 ST.lights.forEach((l,i)=>{const on=t>=lerp(c.eres,c.luces-.5,i/4)&&t<c.luces; l.material.emissiveIntensity=on?1.6:0; l.material.color.setHex(on?0xff2a2a:0x330808);});
 // ---- guardarraíl que se abre
 const imp=eio(seg(t,c.impacto,c.impacto+.35))*(t>=c.impacto||t<c.como?1:0)+(t<c.como?1:0)*0; const impH=t<c.como?1:imp;
 ST.rails.forEach(r=>{const u=r.userData, d=Math.abs(u.z-IPZ), p=impH*Math.max(0,1-d/7); r.position.set(BX+p*2.4,u.y+(u.y>1.2?p*.5:0),u.z); r.rotation.set(0,(u.z<IPZ?-1:1)*p*.5,u.y>1.2?p*.25:0);});
 // ---- fuego
 const fBum=seg(t,c.bum,c.bum+.3)*(1+.7*(1-seg(t,c.bum+.3,c.bum+1.6)))*(1-.45*seg(t,c.sales,c.sales+1))*(1-seg(t,c.manos,c.salvo));
 const fire=t<c.como?1:t<c.bum?(1-seg(t,c.como,c.como+.8)):t>=c.loop-.4?seg(t,c.loop-.4,c.loop+.8):fBum;
 const FC=new THREE.Vector3(8.6,0,IPZ+.2); ST.flames.forEach((m,i)=>{const u=m.userData; const life=(t*u.sp+u.ph)%1; m.visible=fire>.02; if(!m.visible) return;
  m.position.set(FC.x+u.x*(.6+fire*.4),life*7*Math.min(1.3,fire)+.3,FC.z+u.z*(.6+fire*.4)); m.scale.setScalar(Math.max(.01,(1-life)*u.s*1.5*Math.min(1.4,fire)));
  m.material.color.setHex(life<.25?0xffd23f:life<.6?0xff7a1a:0xd92a2a); m.material.opacity=.2*(1-life*.8);});
 ST.fireL.position.set(FC.x,3,FC.z); ST.fireL.intensity=fire*(60+20*Math.sin(t*23)+14*Math.sin(t*37));
 // ---- tú: sentado en la cabina, luego trepas y sales andando
 const U2=ST.h.userData; F.updateMatrixWorld(true); const seat=F.localToWorld(_v.set(0,.05,.35)).sub(ROOM); let jp=seat.clone(), jy=cyaw+F.rotation.y+Math.PI, jx=.45, sitting=true;
 const P1=new THREE.Vector3(BX-.4,2.0,CELL.z+1.4), P2=new THREE.Vector3(7.8,0,IPZ+2.5), P3=new THREE.Vector3(4.2,0,IPZ+6);
 if(t>=c.empujas&&t<c.salvo){sitting=false; const a=eio(seg(t,c.empujas,c.trepas+.5)), b=eio(seg(t,c.trepas+.5,c.sales+.3)), w=seg(t,c.sales+.3,c.manos+.6);
  jp=seat.clone().lerp(P1,a); if(b>0) jp=P1.clone().lerp(P2,b); if(w>0) jp=P2.clone().lerp(P3,eio(w)); jp.y+=b>0&&b<1?Math.sin(b*Math.PI)*.6:0; jy=Math.atan2(P3.x-P2.x,P3.z-P2.z); jx=lerp(.45,0,a);}
 if(t>=c.salvo&&t<c.pillas){sitting=false; jp=P3.clone(); jy=Math.atan2(CELL.x-P3.x,CELL.z-P3.z); jx=0;}
 ST.J.position.copy(jp); ST.J.rotation.set(jx,jy,0);
 if(sitting){U2.lL.rotation.x=U2.lR.rotation.x=1.45; U2.aL.rotation.x=U2.aR.rotation.x=1.1; U2.aL.rotation.z=U2.aR.rotation.z=0;}
 else if(t<c.sales+.3){const cl2=Math.sin(t*9); U2.aL.rotation.x=-2.4+cl2*.4; U2.aR.rotation.x=-2.4-cl2*.4; U2.lL.rotation.x=.6+cl2*.5; U2.lR.rotation.x=.6-cl2*.5;}
 else if(t<c.manos+.6){walk(ST.h,t,9,0,.7); if(t>c.manos){U2.aL.rotation.x=U2.aR.rotation.x=-1.0;}}
 else {U2.lL.rotation.x=U2.lR.rotation.x=0; const up=seg(t,c.mejor,c.mejor+.4); U2.aL.rotation.x=lerp(0,-2.8,up); U2.aR.rotation.x=lerp(0,-2.8,up)+(t>c.feo&&t<c.despues?.0:0);}
 ST.eyes.forEach(e=>e.scale.set(1,(Math.sin(t*2.7)>.985)||(t>c.visor&&t<c.medico)?.15:1,1));
 const melt=seg(t,c.visor,c.visor+1)*(1-seg(t,c.sales,c.sales+.5)); ST.visorM.emissiveIntensity=melt*.6; ST.visorM.color.setHex(melt>.3?0xff6a1a:0x2a3550); ST.visor.scale.set(1,1+melt*.25,1); ST.visor.position.y=-melt*.06;
 // ---- coche médico y comisario
 const mz=lerp(IPZ+70,IPZ+9,eio(seg(t,c.medico-1.2,c.medico+.6))); const medOn=t>=c.medico-1.2&&t<c.pillas; ST.med.visible=medOn; ST.med.position.set(7.2,0,mz+2); ST.med.rotation.y=0;
 ST.medL.forEach((l,i)=>l.material.emissiveIntensity=((Math.floor(t*6)+i)%2)?1.2:.05);
 const mp=seg(t,c.extintor-.4,c.extintor+.3); ST.mar.visible=medOn&&t>=c.extintor-.4; ST.mar.position.set(lerp(7.6,7.4,mp),0,lerp(IPZ+8,IPZ+4.2,mp)); ST.mar.rotation.y=Math.PI+.35;
 ST.mh.userData.aL.rotation.x=ST.mh.userData.aR.rotation.x=-1.2; if(mp<1&&mp>0) walk(ST.mh,t,9,0,.6); else {ST.mh.userData.lL.rotation.x=ST.mh.userData.lR.rotation.x=0;}
 // ---- CÁMARA [t, ángulo, distancia, altura, mirada y] alrededor de un objetivo que cambia
 const carW=new THREE.Vector3(cx,0,cz), cellW=new THREE.Vector3(CELL.x,0,CELL.z), youW=jp.clone().setY(0);
 let L; if(t<c.como) L=cellW.clone(); else if(t<c.impacto) L=cellW.clone().lerp(carW,seg(t,c.como,c.como+.6)); else if(t<c.empujas-.3) L=carW.clone().lerp(cellW,seg(t,c.impacto,c.impacto+1.2));
 else if(t<c.salvo) L=cellW.clone().lerp(youW,seg(t,c.empujas-.3,c.empujas+.6)); else if(t<c.loop) L=youW.clone().lerp(cellW,eio(seg(t,c.salvo,c.halo))); else L=cellW.clone();
 const TP=Math.PI*2;
 const CK=[[0,.9,13,.28,1.2],[c.como,1.3,14,.3,1.2],[c.bahrein,.35,15,.32,1.5],[c.eres,2.7,6.5,.32,1.4],[c.luces-.3,2.9,7,.3,1.4],[c.luces+.3,.15,13,.24,1.2],[c.aceleras,.1,12,.22,1],
  [c.toque,.7,10,.22,1],[c.disparado,1.25,14,.28,1],[c.frenar,2.2,15,.1,1.2],[c.impacto,2.3,14,.1,1.2],[c.parte,1.7,17,.35,1],[c.cabeza,1.0,7.5,.75,1.2],[c.protege,1.1,6.5,.7,1.3],
  [c.bum,1.45,19,.3,2],[c.bola,1.6,21,.32,2.5],[c.atrapado,2.3,5,.75,1.6],[c.visor,2.64,3.4,.8,1.7],[c.c15,2.75,3.9,.75,1.7],[c.medico,.45,17,.3,1.5],[c.extintor,.9,12,.25,1.5],
  [c.empujas,1.9,8.5,.25,1.6],[c.trepas,1.6,9.5,.22,1.8],[c.sales,-1.3,9,.1,1.6],[c.s27,-1.1,10,.12,1.6],[c.manos,-1.0,7,.15,1.5],[c.salvo,1.8,8,.6,1.2],[c.halo,2.64,5.5,.9,1.3],
  [c.arco,3.0,5.5,.85,1.3],[c.mismo,2.2,6,.8,1.3],[c.despues,2.6,7,.7,1.3],[c.mejor,3.0,8,.6,1.4],[c.pregunta,3.7,12,.3,1.4],[c.pillas,3.9,13,.3,1.3],[c.loop,TP+.6,13,.28,1.2],[end,TP+.9,13,.28,1.2],[1e9,TP+.9,13,.28,1.2]];
 let [ca,cd,chh,cly]=kf(CK,t); const Lw=ROOM.clone().add(L).add(new THREE.Vector3(0,cly,0));
 const P=Lw.clone().add(new THREE.Vector3(Math.sin(ca)*cd,cd*chh,Math.cos(ca)*cd));
 let pkk=0; TL.punch.forEach(v=>{const dd=t-v; if(dd>=0&&dd<.6) pkk=Math.max(pkk,Math.exp(-dd*6));}); const shake=pkk*1.6+fire*.08+(t>c.disparado&&t<c.impacto?.15:0);
 cam.up.set(0,1,0); cam.position.copy(P); cam.position.x+=Math.sin(t*70)*shake*.12; cam.position.y+=Math.cos(t*61)*shake*.12; cam.lookAt(Lw); cam.near=.1; cam.far=900;
 cam.fov=50-pkk*3-8*seg(t,c.frenar-.4,c.impacto)*(1-seg(t,c.impacto,c.impacto+.6))-7*seg(t,c.salvo,c.halo)*(1-seg(t,c.halo+.5,c.mismo)); cam.updateProjectionMatrix();
 const icon=(m,on,pos,s)=>{m.visible=on>.01; if(!m.visible) return; m.position.copy(pos); m.scale.setScalar(s*back(on)); m.lookAt(cam.position);};
 icon(ST.down,seg(t,c.feo-.3,c.feo)*(1-seg(t,c.despues,c.despues+.3)),new THREE.Vector3(CELL.x-1.2,3.0,CELL.z+.6),.75);
 icon(ST.up,seg(t,c.mejor-.2,c.mejor+.2)*(1-seg(t,c.pregunta,c.pregunta+.3)),new THREE.Vector3(CELL.x-1.2,3.1,CELL.z+.6),.85);
 ST.bub.forEach(b=>{const q=b.userData, dd=t-c.leo-q.d; b.visible=dd>0&&t<c.pillas+.2; b.scale.setScalar(Math.max(.01,back(dd/.4)*(1-seg(t,c.pillas-.2,c.pillas+.2)))*1.2); b.position.set(L.x+q.x,q.y,L.z+q.z); b.lookAt(cam.position);});
 const kb=Lw.clone(); key.position.set(kb.x+8,kb.y+26,kb.z+14); keyT.position.copy(kb); fill.position.set(kb.x-16,kb.y+12,kb.z-8); fillT.position.copy(kb); rim.position.set(kb.x-6,kb.y+6,kb.z-6); key.distance=200; key.angle=.9;
 parts.position.set(kb.x,0,kb.z); for(let i=0;i<PN;i++){const q=pb[i]; pp[i*3]=q[0]+Math.sin(t*.25+q[3]*9)*.8; pp[i*3+1]=(q[1]+t*(.25+q[3]*.4))%35; pp[i*3+2]=q[2];} pg.attributes.position.needsUpdate=true; parts.material.opacity=.35;
 sky.position.copy(cam.position);
 const cine=Math.max(t<c.como?.6:0,seg(t,c.disparado,c.disparado+.4)*(1-seg(t,c.parte,c.parte+.6)),seg(t,c.atrapado,c.atrapado+.4)*(1-seg(t,c.sales+.6,c.sales+1.2)),seg(t,c.salvo,c.salvo+.5)*(1-seg(t,c.pregunta-.4,c.pregunta)));
 FX.update(t,{cine,vig:Math.max(.5*seg(t,c.atrapado,c.atrapado+.5)*(1-seg(t,c.sales,c.sales+.5)),.35*seg(t,c.frenar,c.frenar+.3)*(1-seg(t,c.impacto+.3,c.impacto+.8))),flash:(t>c.sales&&t<c.manos)||(t>c.mejor&&t<c.pregunta)?.18:(t>c.bahrein&&t<c.luces?.08:0)});
 const gf=(TL.ding||[]).reduce((m,d)=>Math.max(m,1-Math.abs(t-d-.1)/.5),0); document.getElementById('gflash').style.opacity=Math.min(1,gf)*.35; document.getElementById('flash').style.opacity=0;
 C.render();
 let bg=BIG.find(b=>t>=(b[0]?c[b[0]]:0)&&t<c[b[1]]); let bh=bg?bg[2]:'';
 if(!bg&&t>=c.atrapado&&t<c.s27) bh=Math.round(kfl(K.CNT,t)[0])+' s<small>dentro del fuego</small>';
 document.getElementById('big').innerHTML=bh; document.getElementById('big').style.transform='scale('+(1+pkk*.06)+')';
 document.getElementById('hook').innerHTML='';
 const ws=TL.words; let ci=ws.findIndex(w=>t<w.t1+0.04);
 document.getElementById('cap').innerHTML=ci>=0?'<span class="'+(ws[ci].k?'k':'')+'" style="opacity:'+(t>=ws[ci].t0-0.04?1:.35)+'">'+ws[ci].w+'</span>':'';
 document.getElementById('src').textContent=''; const ec=t>=c.pillas&&t<c.loop; document.getElementById('endc').style.opacity=ec?ease((t-c.pillas)/.3)*(1-ease((t-c.loop+.25)/.25)):0; if(ec){document.getElementById('cap').innerHTML='';document.getElementById('big').innerHTML='';}
 document.getElementById('bar').style.width=(100*t/TL.end).toFixed(2)+'%';
};
