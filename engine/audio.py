import json, numpy as np, wave
TL=json.load(open("timeline.json")); sr=44100; N=int(TL["end"]*sr)+sr
t=np.arange(N)/sr
def save(name,x):
    x=np.clip(x,-1,1); w=wave.open(name,"wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes((x*32767).astype(np.int16).tobytes()); w.close()
# ---- music
bpm=100; beat=60/bpm; chord_len=4*beat
chords=[(220.0,261.63,329.63),(174.61,220.0,261.63),(261.63,329.63,392.00),(196.0,246.94,293.66)]
mus=np.zeros(N)
for k in range(int(TL["end"]/chord_len)+2):
    t0=k*chord_len; ch=chords[k%4]; i0=int(t0*sr); i1=min(N,int((t0+chord_len+0.4)*sr))
    if i0>=N: break
    tt=np.arange(i1-i0)/sr; env=np.minimum(1,tt/0.4)*np.minimum(1,(chord_len+0.4-tt)/0.4)
    pad=sum(np.sin(2*np.pi*f*tt)+0.5*np.sin(2*np.pi*f*1.003*tt)+0.2*np.sin(2*np.pi*2*f*tt) for f in ch)
    mus[i0:i1]+=pad*env*0.035
    for n in range(8):  # arpeggio 8th notes
        f=(ch+tuple(2*x for x in ch))[[0,1,2,3,4,2,1,3][n]]*2
        a0=int((t0+n*beat/2)*sr); L=int(0.35*sr)
        if a0+L>N: break
        ta=np.arange(L)/sr; mus[a0:a0+L]+=np.sin(2*np.pi*f*ta)*np.exp(-ta*9)*0.03
    for b in (0,2):  # soft kick
        a0=int((t0+b*beat)*sr); L=int(0.18*sr)
        if a0+L>N: break
        ta=np.arange(L)/sr; fr=120*np.exp(-ta*18)+45; mus[a0:a0+L]+=np.sin(2*np.pi*np.cumsum(fr)/sr)*np.exp(-ta*16)*0.18
# gentle lowpass
y=np.zeros(N); a=0.12
for i in range(1,N): y[i]=y[i-1]+a*(mus[i]-y[i-1])
fade=np.minimum(1,t/1.0)*np.minimum(1,(TL["end"]-t)/1.0).clip(0,1)
save("music.wav", y*fade*1.6)
# ---- sfx
rng=np.random.default_rng(1); sfx=np.zeros(N)
def add(x,at):
    i=int(at*sr); j=min(N,i+len(x)); 
    if i<N: sfx[i:j]+=x[:j-i]
L=int(0.6*sr); ta=np.arange(L)/sr; nz=rng.standard_normal(L)
wh=np.zeros(L); c=0
for i in range(L): c+= (0.02+0.25*np.sin(np.pi*ta[i]/0.6))*(nz[i]-c); wh[i]=c
wh*=np.sin(np.pi*ta/0.6)**2*0.32
for v in [x["t"] for x in TL["shots"][1:]]: add(wh*0.7, v-0.3)
L=int(0.7*sr); ta=np.arange(L)/sr; boom=(np.sin(2*np.pi*(70*ta+10*np.exp(-ta*12)))*np.exp(-ta*9)*0.28+np.sin(2*np.pi*1046*ta)*np.exp(-ta*28)*0.12)
for v in TL["punch"]: add(boom, v)
L=int(0.8*sr); ta=np.arange(L)/sr; ding=(np.sin(2*np.pi*1318*ta)+0.6*np.sin(2*np.pi*1760*ta))*np.exp(-ta*5)*0.22
add(ding, TL["cues"]["cienmil"]); add(ding, [x["t"] for x in TL["shots"] if x["n"]=="bulb"][0]+0.2)
save("sfx.wav", sfx)
print("ok")
