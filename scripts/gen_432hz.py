import math
import struct
import wave
import subprocess
import os

sample_rate = 44100
duration = 45.0 # 45 seconds seamless meditative loop
num_samples = int(sample_rate * duration)

left_channel = [0.0] * num_samples
right_channel = [0.0] * num_samples

# 1. 432Hz Fundamental & Theta Binaural (432Hz Left, 436.5Hz Right -> 4.5Hz Theta relaxation wave)
f_base = 432.0
f_right = 436.0  # 4Hz Theta beat
f_sub1 = 216.0   # A3
f_sub2 = 108.0   # A2
f_fifth = 648.0  # E5 (natural harmonic fifth 3/2)
f_high = 864.0   # A5

for i in range(num_samples):
    t = i / sample_rate
    # Slow breathing envelope (period 9.0s -> ~6.6 breaths per min)
    breath = 0.75 + 0.25 * math.sin(2.0 * math.pi * t / 9.0)
    # Slow micro-movement LFO
    lfo1 = 0.5 + 0.5 * math.sin(2.0 * math.pi * t * 0.15)
    lfo2 = 0.5 + 0.5 * math.cos(2.0 * math.pi * t * 0.12)
    
    # Left channel: 432Hz + warm subharmonics + fifth
    s_l = (
        0.28 * math.sin(2.0 * math.pi * f_base * t) +
        0.22 * math.sin(2.0 * math.pi * f_sub1 * t) +
        0.18 * math.sin(2.0 * math.pi * f_sub2 * t) +
        0.08 * math.sin(2.0 * math.pi * f_fifth * t) +
        0.04 * math.sin(2.0 * math.pi * f_high * t)
    ) * breath * (0.85 + 0.15 * lfo1)
    
    # Right channel: 436Hz binaural theta + warm subharmonics
    s_r = (
        0.28 * math.sin(2.0 * math.pi * f_right * t) +
        0.22 * math.sin(2.0 * math.pi * f_sub1 * t) +
        0.18 * math.sin(2.0 * math.pi * f_sub2 * t) +
        0.08 * math.sin(2.0 * math.pi * (f_fifth + 2.0) * t) +
        0.04 * math.sin(2.0 * math.pi * (f_high + 2.0) * t)
    ) * breath * (0.85 + 0.15 * lfo2)
    
    left_channel[i] += s_l
    right_channel[i] += s_r

# 2. Singing Bowl Strikes tuned precisely to 432Hz
# Strikes at t = 3.0s, 18.0s, 33.0s
bowl_strike_times = [3.0, 18.0, 33.0]
bowl_harmonics = [
    (432.0, 0.35, 7.0),       # fundamental 432Hz, amp 0.35, decay 7s
    (432.0 * 2.76, 0.18, 4.5), # bowl rim harmonic 1192Hz
    (432.0 * 5.4, 0.08, 3.0),  # bowl bright shimmer 2332Hz
    (216.0, 0.20, 8.0)         # deep warm bowl resonance
]

for strike_t in bowl_strike_times:
    start_idx = int(strike_t * sample_rate)
    strike_duration = 14.0 # seconds of ring
    strike_samples = int(strike_duration * sample_rate)
    
    for j in range(strike_samples):
        idx = start_idx + j
        if idx >= num_samples:
            # wrap around for seamless loop
            idx = idx % num_samples
        
        t_strike = j / sample_rate
        bowl_val = 0.0
        for freq, amp, decay in bowl_harmonics:
            env = amp * math.exp(-t_strike / decay)
            # subtle vibrato in bowl ring (4.8Hz wobble)
            wobble = 1.0 + 0.003 * math.sin(2.0 * math.pi * 4.8 * t_strike)
            bowl_val += env * math.sin(2.0 * math.pi * freq * wobble * t_strike)
        
        # gentle stereo pan (strike slightly left/center or right/center)
        left_channel[idx] += bowl_val * 0.55
        right_channel[idx] += bowl_val * 0.52

# 3. Soft Zen Chimes at 432 * 2 (864Hz) and 432 * 3 (1296Hz)
chime_times = [9.0, 26.0, 40.0]
for ct in chime_times:
    start_idx = int(ct * sample_rate)
    chime_samples = int(7.0 * sample_rate)
    for j in range(chime_samples):
        idx = (start_idx + j) % num_samples
        t_chime = j / sample_rate
        env = 0.12 * math.exp(-t_chime / 2.2)
        v = env * (
            math.sin(2.0 * math.pi * 864.0 * t_chime) +
            0.6 * math.sin(2.0 * math.pi * 1296.0 * t_chime)
        )
        left_channel[idx] += v * 0.4
        right_channel[idx] += v * 0.6

# 4. Seamless loop crossfade at boundaries (2 seconds fade)
fade_len = int(2.0 * sample_rate)
for i in range(fade_len):
    weight = i / fade_len
    # smooth cosine crossfade
    fade_in = 0.5 * (1.0 - math.cos(math.pi * weight))
    fade_out = 1.0 - fade_in
    
    end_idx = num_samples - fade_len + i
    # blend end into beginning
    blended_l = left_channel[i] * fade_in + left_channel[end_idx] * fade_out
    blended_r = right_channel[i] * fade_in + right_channel[end_idx] * fade_out
    
    left_channel[i] = blended_l
    right_channel[i] = blended_r
    left_channel[end_idx] = blended_l
    right_channel[end_idx] = blended_r

# Normalize to avoid clipping
max_peak = max(
    max(abs(x) for x in left_channel),
    max(abs(x) for x in right_channel)
)
if max_peak > 0:
    target_peak = 0.82
    norm = target_peak / max_peak
    left_channel = [x * norm for x in left_channel]
    right_channel = [x * norm for x in right_channel]

# Write WAV
wav_path = '/tmp/meditation_432hz.wav'
with wave.open(wav_path, 'w') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(sample_rate)
    
    frames = bytearray()
    for i in range(num_samples):
        l_int = int(max(-32767, min(32767, left_channel[i] * 32767)))
        r_int = int(max(-32767, min(32767, right_channel[i] * 32767)))
        frames.extend(struct.pack('<hh', l_int, r_int))
    wf.writeframes(frames)

print(f"Generated WAV at {wav_path}")
# Convert to mp3 using ffmpeg
out_mp3 = '/app/applet/public/audio/meditation-432hz.mp3'
os.makedirs(os.path.dirname(out_mp3), exist_ok=True)
cmd = f"ffmpeg -y -i {wav_path} -codec:a libmp3lame -b:a 192k {out_mp3}"
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
if res.returncode == 0:
    print(f"Successfully created {out_mp3} (size: {os.path.getsize(out_mp3)} bytes)")
else:
    print(f"FFmpeg failed: {res.stderr}")
