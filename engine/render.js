const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const TL = JSON.parse(fs.readFileSync('timeline.json','utf8'));
  const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
  fs.mkdirSync('frames', { recursive: true });
  const b = await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: Number(process.env.SS||1.5) });
  p.on('pageerror', e => console.log('err:', e.message));
  await p.goto('http://localhost:'+(process.env.PORT||8780)+'/'+(process.env.SCENE||'scene.html')); await p.waitForFunction('window.ready===true'); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(tl => setTL(tl), TL); await p.waitForFunction('window.popsReady===true');
  const list = only ? only.map(s => Math.round(s * TL.fps)) : [...Array(TL.frames).keys()];
  const t0=Date.now();
  for (const f of list) { if (!only && fs.existsSync(`frames/${String(f+1).padStart(5,"0")}.jpg`)) continue; await p.evaluate(t => render(t), f / TL.fps);
    await p.screenshot({ path: only ? `check_${f}.png` : `frames/${String(f).padStart(5,'0')}.jpg`, type: only?'png':'jpeg', quality: only?undefined:95 }); }
  console.log('ms/frame', Math.round((Date.now()-t0)/list.length));
  await b.close();
})();
