// Kısa ses efektleri (Web Audio). Dosya gerektirmez.
// Ses ilk kullanıcı dokunuşundan sonra başlar; desteklenmeyen ya da kapalı
// durumda tüm çağrılar sessizce hiçbir şey yapmaz.

let enabled = true;
let ctx = null;

export function setSoundEnabled(on) {
  enabled = !!on;
}

function audio() {
  if (!enabled) return null;
  try {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    ctx ??= new Ctor();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq, start, dur, type = "sine", vol = 0.15) {
  const a = audio();
  if (!a) return;
  const t0 = a.currentTime + start;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export const sfx = {
  correct: () => { tone(523, 0, 0.12); tone(659, 0.1, 0.12); tone(784, 0.2, 0.22); },
  wrong: () => tone(180, 0, 0.2, "square", 0.07),
  pass: () => tone(330, 0, 0.15, "triangle"),
  timeout: () => { tone(440, 0, 0.15, "triangle"); tone(330, 0.15, 0.22, "triangle"); },
  tick: () => tone(1200, 0, 0.04, "square", 0.04),
  end: () => { [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.12, 0.2)); },
};
