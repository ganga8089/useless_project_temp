/**
 * Web Audio API Ambient Synthesizer for 90s Kerala Courtyard Experience.
 * Provides Rain (Mazha), Birds (Kili), and Chiratta Clinks (Stirring).
 * Zero external mp3 dependencies, lightweight, and responsive.
 */

let audioCtx: AudioContext | null = null;
let rainNode: AudioNode | null = null;
let rainGain: GainNode | null = null;
let birdTimer: number | null = null;
let clinkTimer: number | null = null;

let isRainPlaying = false;
let isBirdPlaying = false;
let isClinkPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!audioCtx) {
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") {
      void audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// 🌧️ Synthesized Kerala Monsoon Rain
export function toggleRain(enable?: boolean): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  const targetState = enable ?? !isRainPlaying;

  if (targetState) {
    if (isRainPlaying) return true;
    try {
      // Create pink noise buffer for rain
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const sample = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        data[i] = sample;
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Filter for gentle raindrops on leaves
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1200;

      rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(0.08, ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(rainGain);
      rainGain.connect(ctx.destination);

      noiseSource.start(0);
      rainNode = noiseSource;
      isRainPlaying = true;
    } catch {
      isRainPlaying = false;
    }
  } else {
    if (rainNode) {
      try {
        if (rainGain && ctx) {
          rainGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        }
        setTimeout(() => {
          (rainNode as AudioBufferSourceNode)?.stop();
          rainNode = null;
        }, 500);
      } catch {
        /* ignore */
      }
    }
    isRainPlaying = false;
  }
  return isRainPlaying;
}

// 🐦 Synthesized Kerala Morning Courtyard Birds (Prabhatha Kili)
export function toggleBirds(enable?: boolean): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  const targetState = enable ?? !isBirdPlaying;

  if (targetState) {
    if (isBirdPlaying) return true;
    isBirdPlaying = true;

    const playMorningBirdSong = () => {
      if (!isBirdPlaying || !ctx) return;

      const now = ctx.currentTime;
      const birdType = Math.floor(Math.random() * 3); // 3 different morning bird species

      if (birdType === 0) {
        // Morning Sparrow / Bulbul: 3 rapid sweet chirps (Twee-twee-twee)
        const baseFreq = 2600 + Math.random() * 500;
        for (let i = 0; i < 3; i++) {
          const chirpTime = now + i * 0.09;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(baseFreq + i * 150, chirpTime);
          osc.frequency.exponentialRampToValueAtTime(baseFreq + i * 150 + 600, chirpTime + 0.04);
          osc.frequency.exponentialRampToValueAtTime(baseFreq + i * 150 + 200, chirpTime + 0.07);

          gain.gain.setValueAtTime(0.001, chirpTime);
          gain.gain.exponentialRampToValueAtTime(0.04, chirpTime + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.001, chirpTime + 0.075);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(chirpTime);
          osc.stop(chirpTime + 0.08);
        }
      } else if (birdType === 1) {
        // Myna / Cuckoo Trill: Rising pitch slide (Pi-wheee-t)
        const baseFreq = 2200 + Math.random() * 400;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 1200, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 800, now + 0.22);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        // Courtyard Warbler: Double high-pitch whistle (Cheep! Cheep!)
        const baseFreq = 3100 + Math.random() * 600;
        for (let i = 0; i < 2; i++) {
          const chirpTime = now + i * 0.14;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(baseFreq, chirpTime);
          osc.frequency.exponentialRampToValueAtTime(baseFreq - 400, chirpTime + 0.05);
          osc.frequency.exponentialRampToValueAtTime(baseFreq + 300, chirpTime + 0.09);

          gain.gain.setValueAtTime(0.001, chirpTime);
          gain.gain.exponentialRampToValueAtTime(0.035, chirpTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, chirpTime + 0.1);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(chirpTime);
          osc.stop(chirpTime + 0.11);
        }
      }

      // Next morning song phrase between 1.2s and 3.2s
      const nextDelay = 1200 + Math.random() * 2000;
      birdTimer = window.setTimeout(playMorningBirdSong, nextDelay);
    };

    playMorningBirdSong();
  } else {
    if (birdTimer) {
      clearTimeout(birdTimer);
      birdTimer = null;
    }
    isBirdPlaying = false;
  }
  return isBirdPlaying;
}

// 🥥 Synthesized Chiratta (Coconut Shell) Wood Clinks
export function toggleClinks(enable?: boolean): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  const targetState = enable ?? !isClinkPlaying;

  if (targetState) {
    if (isClinkPlaying) return true;
    isClinkPlaying = true;

    const playClinkSound = () => {
      if (!isClinkPlaying || !ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = 650 + Math.random() * 150;
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.06);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);

      // Schedule next clink between 1s and 3s
      const nextDelay = 1000 + Math.random() * 2000;
      clinkTimer = window.setTimeout(playClinkSound, nextDelay);
    };

    playClinkSound();
  } else {
    if (clinkTimer) {
      clearTimeout(clinkTimer);
      clinkTimer = null;
    }
    isClinkPlaying = false;
  }
  return isClinkPlaying;
}

export function getAudioStates() {
  return {
    rain: isRainPlaying,
    birds: isBirdPlaying,
    clinks: isClinkPlaying,
  };
}
