"""
Original instrumental bed for the SomaliReading promo — written from scratch
(no samples, no third-party material), so the spot carries no music licence.

D major, 96 BPM, warm marimba-style plucks over a soft pad, light shaker and a
gentle kick. 56 s, stereo 48 kHz.
"""
import numpy as np
import wave

SR = 48000
DUR = 56.0
BEAT = 60 / 96
BAR = BEAT * 4
rng = np.random.default_rng(7)

NOTE = {name: i for i, name in enumerate(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])}
def f(name, octave):
    return 440.0 * 2 ** ((NOTE[name] + 12 * (octave - 4) - 9) / 12)

# D  A  Bm  G  — one bar each, a warm uplifting loop
CHORDS = [
    ('D',  [f('D', 3), f('F#', 3), f('A', 3), f('D', 4)]),
    ('A',  [f('A', 2), f('C#', 3), f('E', 3), f('A', 3)]),
    ('Bm', [f('B', 2), f('D', 3), f('F#', 3), f('B', 3)]),
    ('G',  [f('G', 2), f('B', 2), f('D', 3), f('G', 3)]),
]

n = int(SR * DUR)
mix = np.zeros((n, 2), dtype=np.float64)


def add(sig, t0, gain=1.0, pan=0.0):
    """Mix a mono signal in at t0 seconds."""
    i0 = int(t0 * SR)
    if i0 >= n:
        return
    seg = sig[: n - i0]
    l = np.sqrt(0.5 * (1 - pan))
    r = np.sqrt(0.5 * (1 + pan))
    mix[i0:i0 + len(seg), 0] += seg * gain * l
    mix[i0:i0 + len(seg), 1] += seg * gain * r


def env_ad(n_samples, attack, release, sr=SR):
    a = max(1, int(attack * sr))
    e = np.ones(n_samples)
    a = min(a, n_samples)
    e[:a] = np.linspace(0, 1, a) ** 1.4
    r = min(n_samples, int(release * sr))
    if r > 0:
        e[-r:] *= np.linspace(1, 0, r) ** 1.6
    return e


def pad(freqs, dur, gain=0.16):
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros_like(t)
    for k, fq in enumerate(freqs):
        for h, amp in ((1, 1.0), (2, 0.28), (3, 0.12), (4, 0.05)):
            det = 1 + (k - 1.5) * 0.0012
            out += amp * np.sin(2 * np.pi * fq * h * det * t + rng.random() * 6.28)
    out /= (len(freqs) * 1.45)
    return out * env_ad(len(t), 0.55, 0.9) * gain


def pluck(freq, dur=0.9, gain=0.22):
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros_like(t)
    for h, amp, dec in ((1, 1.0, 4.2), (3.9, 0.34, 7.0), (8.9, 0.12, 11.0), (2.0, 0.18, 5.5)):
        out += amp * np.sin(2 * np.pi * freq * h * t) * np.exp(-dec * t)
    out *= np.minimum(1, t / 0.004)  # tiny click-free attack
    return out * gain


def shaker(dur=0.09, gain=0.05):
    t = np.arange(int(dur * SR)) / SR
    noise = rng.standard_normal(len(t))
    # crude high-pass: difference of consecutive samples
    noise = np.diff(np.concatenate([[0.0], noise]))
    return noise * np.exp(-38 * t) * gain


def kick(gain=0.13):
    t = np.arange(int(0.34 * SR)) / SR
    fq = 92 * np.exp(-9 * t) + 44
    return np.sin(2 * np.pi * np.cumsum(fq) / SR) * np.exp(-7.5 * t) * gain


def swell(dur, f0, f1, gain=0.12):
    t = np.arange(int(dur * SR)) / SR
    noise = rng.standard_normal(len(t))
    noise = np.convolve(noise, np.ones(24) / 24, mode='same')
    ramp = (t / dur) ** 2.2
    tone = np.sin(2 * np.pi * (f0 + (f1 - f0) * (t / dur) ** 2) * t) * 0.35
    return (noise * 0.8 + tone) * ramp * gain


# ── arrangement ──────────────────────────────────────────────────────────
# sections: pad always, plucks from 6 s, rhythm from 22 s, breakdown 48–52,
# final resolution 52–56.
for bar_i in range(int(np.ceil(DUR / BAR))):
    t0 = bar_i * BAR
    if t0 >= DUR:
        break
    _, chord = CHORDS[bar_i % 4]
    section_full = 22 <= t0 < 48
    section_final = t0 >= 52

    pad_gain = 0.17 if not section_final else 0.24
    add(pad(chord, BAR + 0.6, pad_gain), t0, pan=-0.12)

    # arpeggio plucks on the 8th notes
    if t0 >= 6:
        steps = 8
        for s in range(steps):
            if t0 < 22 and s % 2 == 1:
                continue  # sparser before the rhythm enters
            if 48 <= t0 < 52:
                continue  # breathing space before the close
            fq = chord[s % len(chord)] * (2 if s in (3, 7) else 1)
            add(pluck(fq, 0.75, 0.16), t0 + s * BEAT / 2, pan=(-0.5 if s % 2 else 0.5) * 0.7)

    # bass + kick
    if section_full or section_final:
        for b in (0, 2):
            add(pluck(chord[0] / 2, 0.9, 0.20), t0 + b * BEAT, pan=0)
        add(kick(), t0, pan=0)
        add(kick(0.07), t0 + 2 * BEAT, pan=0)

    # shaker
    if section_full:
        for s in range(8):
            add(shaker(), t0 + s * BEAT / 2, pan=0.25 if s % 2 else -0.25)

# riser into the pricing→CTA lift, and a closing swell
add(swell(2.4, 180, 900, 0.10), 47.9, pan=0)
add(swell(1.6, 300, 1200, 0.12), 50.2, pan=0)

# last chord rings out
for k, fq in enumerate([f('D', 3), f('F#', 3), f('A', 3), f('D', 4), f('A', 4)]):
    add(pluck(fq, 3.4, 0.16), 52.0, pan=(k - 2) * 0.18)

# ── master ───────────────────────────────────────────────────────────────
# gentle low-pass (one-pole) to soften the top, then soft clip + fades
alpha = 0.55
lp = mix.copy()
for ch in range(2):
    x = mix[:, ch]
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):          # one-pole, vectorised below would be nicer
        acc += alpha * (x[i] - acc)
        y[i] = acc
    lp[:, ch] = y
mix = 0.75 * mix + 0.45 * lp

mix = np.tanh(mix * 1.15)
mix /= np.max(np.abs(mix)) + 1e-9
mix *= 0.89

fade_in = int(0.25 * SR)
mix[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
fade_out = int(2.0 * SR)
mix[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None] ** 1.3

pcm = (mix * 32767).astype('<i2')
with wave.open('promo/audio/music-bed.wav', 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())

print('wrote promo/audio/music-bed.wav', pcm.shape, f'{DUR}s')
