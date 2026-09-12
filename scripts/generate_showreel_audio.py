"""
CODEARC — 8-SECOND FLAGSHIP SHOWREEL GENERATOR
Format: 1920x1080, 24 fps, Exactly 192 frames (8.00 seconds).
Native synchronized high-energy audio: sub bass, tight kick, percussion,
whooshes, camera shutters, UI clicks, risers, and decaying bass tail.
"""

import os
import sys
import math
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# ----------------------------------------------------------------------
# Paths & Settings
# ----------------------------------------------------------------------
WIDTH = 1920
HEIGHT = 1080
FPS = 24
TOTAL_SECONDS = 8.0
TOTAL_FRAMES = int(FPS * TOTAL_SECONDS) # 192 frames
SAMPLE_RATE = 48000 # Standard broadcast audio

OUTPUT_DIR = "exports/showreel"
os.makedirs(OUTPUT_DIR, exist_ok=True)
FRAMES_DIR = os.path.join(OUTPUT_DIR, "frames")
os.makedirs(FRAMES_DIR, exist_ok=True)

AUDIO_FILE = os.path.join(OUTPUT_DIR, "showreel_audio.wav")
FINAL_VIDEO = os.path.join(OUTPUT_DIR, "codearc_showreel_8s.mp4")

# Load Fonts
FONT_BOLD_PATH = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REG_PATH = "C:/Windows/Fonts/segoeui.ttf"
FONT_MONO_PATH = "C:/Windows/Fonts/consola.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

# ----------------------------------------------------------------------
# 1. AUDIO SYNTHESIZER
# ----------------------------------------------------------------------
def generate_audio():
    print("Synthesizing native synchronized sound design and music...")
    total_samples = int(SAMPLE_RATE * TOTAL_SECONDS)
    audio = np.zeros((total_samples, 2), dtype=np.float32)
    t = np.linspace(0, TOTAL_SECONDS, total_samples, endpoint=False)

    def add_sound(start_time, wave_data, pan=0.0, gain=1.0):
        start_idx = int(start_time * SAMPLE_RATE)
        num_samples = len(wave_data)
        if start_idx >= total_samples:
            return
        end_idx = min(start_idx + num_samples, total_samples)
        actual_len = end_idx - start_idx
        
        left_gain = gain * (0.5 - 0.5 * pan)
        right_gain = gain * (0.5 + 0.5 * pan)
        
        audio[start_idx:end_idx, 0] += wave_data[:actual_len] * left_gain
        audio[start_idx:end_idx, 1] += wave_data[:actual_len] * right_gain

    # Generator: Kick Drum with punch click and sub sweep
    def make_kick(duration=0.35, f_start=180.0, f_end=42.0):
        n = int(SAMPLE_RATE * duration)
        ts = np.linspace(0, duration, n, endpoint=False)
        # Exponential frequency decay
        freq = f_end + (f_start - f_end) * np.exp(-ts * 28.0)
        phase = 2 * np.pi * np.cumsum(freq) / SAMPLE_RATE
        sine = np.sin(phase)
        # Click transient
        click = np.random.randn(int(SAMPLE_RATE * 0.008)) * np.exp(-np.linspace(0, 1, int(SAMPLE_RATE * 0.008)) * 8)
        # Envelope
        env = np.exp(-ts * 8.5)
        kick = sine * env
        kick[:len(click)] += click * 0.6
        return np.tanh(kick * 1.5) # Soft saturation

    # Generator: Sub-Bass Impact (Deep cinematic slam)
    def make_sub_impact(duration=1.2, f0=52.0):
        n = int(SAMPLE_RATE * duration)
        ts = np.linspace(0, duration, n, endpoint=False)
        freq = f0 * np.exp(-ts * 1.2)
        phase = 2 * np.pi * np.cumsum(freq) / SAMPLE_RATE
        sub = np.sin(phase) + 0.25 * np.sin(phase * 2)
        env = np.exp(-ts * 2.8)
        # Initial transient snap
        snap_len = int(SAMPLE_RATE * 0.015)
        snap = np.sin(2 * np.pi * 320.0 * ts[:snap_len]) * np.exp(-ts[:snap_len] * 120.0)
        out = sub * env
        out[:snap_len] += snap * 0.8
        return np.tanh(out * 1.4)

    # Generator: Camera Shutter / Metallic Transient Click
    def make_shutter(duration=0.08):
        n = int(SAMPLE_RATE * duration)
        ts = np.linspace(0, duration, n, endpoint=False)
        noise = np.random.randn(n)
        filt = np.sin(2 * np.pi * 2400.0 * ts) * noise
        env = np.exp(-ts * 65.0)
        return filt * env * 0.7

    # Generator: UI Confirmation Tone / Digital Click
    def make_ui_click(duration=0.06, freq=2800.0):
        n = int(SAMPLE_RATE * duration)
        ts = np.linspace(0, duration, n, endpoint=False)
        tone = np.sin(2 * np.pi * freq * ts) + 0.4 * np.sin(2 * np.pi * freq * 1.5 * ts)
        env = np.exp(-ts * 90.0)
        return tone * env * 0.5

    # Generator: Whoosh / Air Displacement
    def make_whoosh(duration=0.35, pitch_up=True):
        n = int(SAMPLE_RATE * duration)
        ts = np.linspace(0, duration, n, endpoint=False)
        noise = np.random.randn(n)
        # Bandpass filter simulation via modulated sine
        f_center = (400.0 + 1600.0 * (ts / duration)) if pitch_up else (2000.0 - 1500.0 * (ts / duration))
        phase = 2 * np.pi * np.cumsum(f_center) / SAMPLE_RATE
        mod = np.sin(phase) * noise
        env = np.sin(np.pi * (ts / duration)) ** 1.8
        return mod * env * 0.65

    # Generator: Reverse Riser
    def make_riser(duration=0.8):
        n = int(SAMPLE_RATE * duration)
        ts = np.linspace(0, duration, n, endpoint=False)
        f = 60.0 * np.exp(ts * 3.5)
        phase = 2 * np.pi * np.cumsum(f) / SAMPLE_RATE
        saw = (phase % (2 * np.pi)) / np.pi - 1.0
        env = (ts / duration) ** 2.5
        noise = np.random.randn(n) * 0.2
        return (saw + noise) * env * 0.5

    # Generator: Low Electrical Rumble (Opening)
    def make_rumble(duration=0.6):
        n = int(SAMPLE_RATE * duration)
        ts = np.linspace(0, duration, n, endpoint=False)
        hum = np.sin(2 * np.pi * 48.0 * ts) + 0.5 * np.sin(2 * np.pi * 96.0 * ts)
        noise = np.random.randn(n) * 0.15
        env = (ts / duration) ** 2
        return (hum + noise) * env * 0.7

    # ------------------------------------------------------------------
    # SCORE TIMELINE (Synchronized with exact video beats)
    # ------------------------------------------------------------------
    # 0.00–0.55s: Opening rumble & typography slam
    add_sound(0.00, make_rumble(0.55), gain=0.6)
    add_sound(0.25, make_whoosh(0.20, pitch_up=True), pan=-0.3, gain=0.8)
    add_sound(0.38, make_sub_impact(1.2, f0=55.0), gain=1.3)
    add_sound(0.40, make_shutter(0.1), gain=0.7)

    # 0.55–1.40s: Explode into CodeArc Homepage Hero
    add_sound(0.55, make_whoosh(0.35, pitch_up=False), pan=0.4, gain=0.9)
    add_sound(0.58, make_kick(0.32), gain=1.1)
    add_sound(0.85, make_ui_click(0.05, 3200), pan=-0.2, gain=0.6)
    add_sound(1.05, make_kick(0.25), gain=0.9)
    add_sound(1.20, make_ui_click(0.05, 2800), pan=0.3, gain=0.6)
    add_sound(1.25, make_whoosh(0.20, pitch_up=True), pan=-0.5, gain=0.8)

    # 1.40–2.25s: Whip-pan into Wild Jawai (3 rapid cuts at 1.40, 1.70, 2.00)
    add_sound(1.40, make_kick(0.30), gain=1.2)
    add_sound(1.40, make_shutter(0.08), pan=0.2, gain=0.9)
    add_sound(1.70, make_kick(0.26), gain=1.0)
    add_sound(1.70, make_shutter(0.08), pan=-0.2, gain=0.85)
    add_sound(2.00, make_kick(0.26), gain=1.0)
    add_sound(2.00, make_whoosh(0.22, pitch_up=True), pan=0.3, gain=0.9)

    # 2.25–3.05s: Match cut into Leopard Trails
    add_sound(2.20, make_riser(0.18), gain=0.7)
    add_sound(2.25, make_sub_impact(0.8, f0=50.0), gain=1.2)
    add_sound(2.55, make_kick(0.25), gain=0.95)
    add_sound(2.85, make_kick(0.25), gain=1.0)
    add_sound(2.95, make_whoosh(0.15, pitch_up=False), pan=-0.4, gain=0.8)

    # 3.05–3.80s: Hard cut into Bro's Bar
    add_sound(3.05, make_kick(0.30), gain=1.15)
    add_sound(3.05, make_shutter(0.08), gain=0.9)
    add_sound(3.35, make_kick(0.25), gain=0.9)
    add_sound(3.55, make_ui_click(0.06, 2200), gain=0.7)
    add_sound(3.65, make_kick(0.22), gain=0.9)

    # 3.80–4.70s: MUSIC DROP (0.15s silence) then rapid percussive hits
    # Words flash: GET NOTICED (4.10), BUILD TRUST (4.25), GENERATE ENQUIRIES (4.40), SELL (4.52), BOOK (4.62)
    add_sound(3.95, make_whoosh(0.15, pitch_up=True), gain=0.6)
    add_sound(4.10, make_shutter(0.07), pan=-0.3, gain=1.1)
    add_sound(4.10, make_kick(0.18, f_start=240), gain=1.0)
    add_sound(4.25, make_shutter(0.07), pan=0.3, gain=1.1)
    add_sound(4.25, make_kick(0.18, f_start=240), gain=1.0)
    add_sound(4.40, make_shutter(0.07), pan=-0.2, gain=1.15)
    add_sound(4.40, make_kick(0.20, f_start=260), gain=1.1)
    add_sound(4.52, make_shutter(0.06), pan=0.2, gain=1.2)
    add_sound(4.52, make_kick(0.20, f_start=280), gain=1.15)
    add_sound(4.62, make_sub_impact(0.5, f0=65.0), gain=1.3)

    # 4.70–5.65s: Transition into Software & Technology
    add_sound(4.70, make_whoosh(0.30, pitch_up=False), pan=-0.3, gain=0.9)
    add_sound(4.80, make_kick(0.25), gain=1.0)
    add_sound(4.95, make_ui_click(0.05, 3400), pan=0.4, gain=0.7)
    add_sound(5.10, make_kick(0.25), gain=1.05)
    add_sound(5.25, make_ui_click(0.05, 3000), pan=-0.3, gain=0.7)
    add_sound(5.40, make_kick(0.25), gain=1.1)
    add_sound(5.50, make_riser(0.25), gain=0.8)

    # 5.65–6.45s: Typographic hits
    # BEAUTIFUL ON THE OUTSIDE (5.65), SERIOUS UNDERNEATH (6.05)
    add_sound(5.65, make_sub_impact(0.7, f0=55.0), gain=1.3)
    add_sound(5.65, make_shutter(0.09), gain=0.9)
    add_sound(6.05, make_sub_impact(0.7, f0=48.0), gain=1.4)
    add_sound(6.05, make_shutter(0.09), gain=1.0)

    # 6.45–7.20s: Acceleration montage (WILD JAWAI -> LEOPARD TRAILS -> BROS BAR -> SOFTWARE)
    add_sound(6.45, make_kick(0.22), gain=1.2)
    add_sound(6.45, make_whoosh(0.18, pitch_up=True), pan=-0.4, gain=0.9)
    add_sound(6.65, make_kick(0.22), gain=1.2)
    add_sound(6.65, make_whoosh(0.18, pitch_up=True), pan=0.4, gain=0.9)
    add_sound(6.85, make_kick(0.22), gain=1.25)
    add_sound(6.85, make_shutter(0.08), gain=1.0)
    add_sound(7.02, make_kick(0.22), gain=1.3)
    add_sound(7.10, make_riser(0.12), gain=0.9)

    # 7.20–8.00s: Drop to silence, deep final bass impact, warm decaying tail
    add_sound(7.20, make_sub_impact(1.8, f0=42.0), gain=1.5)
    add_sound(7.20, make_shutter(0.12), gain=0.85)
    add_sound(7.45, make_ui_click(0.08, 1800), pan=0.1, gain=0.4)

    # Master Limiter / Normalize
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        audio = audio / max_val * 0.94 # Normalize to -0.5 dBFS

    # Save to 16-bit stereo WAV using standard wave module
    import wave
    int_audio = (audio * 32767).astype(np.int16)
    with wave.open(AUDIO_FILE, 'wb') as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(SAMPLE_RATE)
        wav_file.writeframes(int_audio.tobytes())
    
    print(f"Audio synthesized successfully: {AUDIO_FILE} ({total_samples} samples, 8.0s)")

if __name__ == "__main__":
    generate_audio()
