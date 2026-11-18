import json, numpy as np, wave
TL=json.load(open("timeline.json")); sr=44100; END=TL["end"]; N=int(END*sr)+sr
t=np.arange(N)/sr; EP=TL.get("epic",{}) or {}; rng=np.random.default_rng(1)
def save(name,x):
    x=np.clip(x,-1,1); w=wave.open(name,"wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes((x*32767).astype(np.int16).tobytes()); w.close()
def lp(x,a):
    y=np.zeros_like(x); 
    for i in range(1,len(x)): y[i]=y[i-1]+a*(x[i]-y[i-1])
    return y
def put(buf,x,at,g=1.0):
    i=int(at*sr)
    if i<0: x=x[-i:]; i=0
    j=min(len(buf),i+len(x))
    if i<len(buf) and j>i: buf[i:j]+=x[:j-i]*g
# ---- intensidad musical: 0 calma · 1 épica (sube antes de cada clímax y se mantiene un rato)
cl=EP.get("climax"); cls=[cl] if isinstance(cl,(int,float)) else (cl or [])
riser=EP.get("riser",[]) or []; heart=EP.get("heart",[]) or []; roar=EP.get("roar",[]) or []; hits=EP.get("hit",[]) or []
inten=np.full(N,0.35)
for c in cls+riser:
    up=np.clip((t-(c-4))/4,0,1); down=np.clip(1-(t-(c+5))/3,0,1); inten=np.maximum(inten,np.where(t<c,0.35+0.65*up**2,down*1.0+0.35*(1-down)))
inten*=np.minimum(1,t/1.0)*np.clip((END-t)/1.0,0,1)
bpm=100; beat=60/bpm; chord_len=4*beat
chords=[(220.0,261.63,329.63),(174.61,220.0,261.63),(261.63,329.63,392.00),(196.0,246.94,293.66)]
mus=np.zeros(N)
for k in range(int(END/chord_len)+2):
    t0=k*chord_len; ch=chords[k%4]; i0=int(t0*sr); i1=min(N,int((t0+chord_len+0.4)*sr))
    if i0>=N: break
    tt=np.arange(i1-i0)/sr; env=np.minimum(1,tt/0.4)*np.minimum(1,(chord_len+0.4-tt)/0.4); I=inten[i0:i1]
    pad=sum(np.sin(2*np.pi*f*tt)+0.5*np.sin(2*np.pi*f*1.003*tt)+0.2*np.sin(2*np.pi*2*f*tt) for f in ch)
    saw=sum(sum(np.sin(2*np.pi*f*h*tt)/h for h in range(1,6)) for f in (ch[0]/2,ch[0],ch[1]))  # metales épicos
    mus[i0:i1]+=pad*env*0.035+saw*env*0.03*np.clip((I-0.5)*2,0,1)
    for n in range(8):
        f=(ch+tuple(2*x for x in ch))[[0,1,2,3,4,2,1,3][n]]*2; a0=int((t0+n*beat/2)*sr); L=int(0.35*sr)
        if a0+L>N: break
        ta=np.arange(L)/sr; mus[a0:a0+L]+=np.sin(2*np.pi*f*ta)*np.exp(-ta*9)*0.03
    for b in range(4):  # bombo: suave en calma, en cada tiempo en la parte épica; caja en 2 y 4
        a0=int((t0+b*beat)*sr); L=int(0.2*sr)
        if a0+L>N: break
        I0=inten[min(N-1,a0)]
        if b%2==0 or I0>0.6:
            ta=np.arange(L)/sr; fr=120*np.exp(-ta*18)+45; mus[a0:a0+L]+=np.sin(2*np.pi*np.cumsum(fr)/sr)*np.exp(-ta*16)*(0.18+0.12*I0)
        if b%2==1 and I0>0.55:
            ta=np.arange(L)/sr; mus[a0:a0+L]+=rng.standard_normal(L)*np.exp(-ta*22)*0.09*I0
y=lp(mus,0.12)*0.65+lp(mus,0.45)*0.35*inten
save("music.wav", y*1.6)
# ---- efectos
sfx=np.zeros(N)
L=int(0.6*sr); ta=np.arange(L)/sr; nz=rng.standard_normal(L); wh=np.zeros(L); c=0
for i in range(L): c+=(0.02+0.25*np.sin(np.pi*ta[i]/0.6))*(nz[i]-c); wh[i]=c
wh*=np.sin(np.pi*ta/0.6)**2*0.32
for v in [x["t"] for x in TL["shots"][1:]]: put(sfx,wh*0.7,v-0.3)
L=int(0.7*sr); ta=np.arange(L)/sr; boom=(np.sin(2*np.pi*(70*ta+10*np.exp(-ta*12)))*np.exp(-ta*9)*0.28+np.sin(2*np.pi*1046*ta)*np.exp(-ta*28)*0.12)
for v in TL["punch"]: put(sfx,boom,v)
L=int(0.8*sr); ta=np.arange(L)/sr; ding=(np.sin(2*np.pi*1318*ta)+0.6*np.sin(2*np.pi*1760*ta))*np.exp(-ta*5)*0.22
for d in TL.get("ding",[]): put(sfx,ding,d)
# subida (riser) de 3 s que termina en el clímax: ruido que se abre + tono que sube + redoble que acelera
def make_riser(T=3.0):
    L=int(T*sr); ta=np.arange(L)/sr; u=ta/T; n=rng.standard_normal(L); out=np.zeros(L); c=0
    for i in range(L): c+=(0.01+0.35*u[i]**2)*(n[i]-c); out[i]=c
    tone=np.sin(2*np.pi*np.cumsum(110*2**(u*2))/sr)*0.08
    roll=np.zeros(L); k=0.0
    while k<T:
        step=0.25*(1-k/T)+0.035; i=int(k*sr); m=min(L-i,int(0.06*sr)); roll[i:i+m]+=rng.standard_normal(m)*np.exp(-np.arange(m)/sr*60)*0.12*(0.3+u[i]); k+=step
    return (out*0.35+tone)*u**1.5+roll
R=make_riser()
for c in cls+riser: put(sfx,R,c-3.0)
# golpe épico: grave + platillo
L=int(2.2*sr); ta=np.arange(L)/sr; crash=lp(rng.standard_normal(L),0.6)*np.exp(-ta*2.2)*0.16
hitS=np.sin(2*np.pi*(45*ta+25*np.exp(-ta*8)))*np.exp(-ta*3.5)*0.45+crash
for c in cls+hits: put(sfx,hitS,c)
# latidos entre [inicio, fin], cada vez más rápidos
L=int(0.25*sr); ta=np.arange(L)/sr; thump=np.sin(2*np.pi*55*ta)*np.exp(-ta*18)*0.4
for a,b in heart:
    k=a
    while k<b: put(sfx,thump,k); put(sfx,thump*0.7,k+0.18); k+=0.85-0.4*(k-a)/max(.1,b-a)
# rugido del público
L=int(3.5*sr); ta=np.arange(L)/sr; rr=lp(rng.standard_normal(L),0.08)*3; rr=lp(rr,0.3)
env=np.minimum(1,ta/0.4)*np.exp(-np.maximum(0,ta-1.2)*1.1); roarS=rr*env*0.22
for v in roar: put(sfx,roarS,v)
save("sfx.wav", sfx)
print("ok")
