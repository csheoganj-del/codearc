"""
CODEARC — 8-SECOND SHOWREEL VIDEO COMPOSITOR
Renders 192 cinematic 1080p frames and compiles with synchronized audio via ffmpeg.
"""

import os
import math
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import imageio_ffmpeg

WIDTH = 1920
HEIGHT = 1080
FPS = 24
TOTAL_FRAMES = 192

OUTPUT_DIR = "exports/showreel"
FRAMES_DIR = os.path.join(OUTPUT_DIR, "frames")
os.makedirs(FRAMES_DIR, exist_ok=True)
AUDIO_FILE = os.path.join(OUTPUT_DIR, "showreel_audio.wav")
FINAL_VIDEO = os.path.join(OUTPUT_DIR, "codearc_showreel_8s.mp4")

FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()

# Font definitions
FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REG = "C:/Windows/Fonts/segoeui.ttf"
FONT_ARIAL_BD = "C:/Windows/Fonts/arialbd.ttf"

def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

# ----------------------------------------------------------------------
# Asset Preloader
# ----------------------------------------------------------------------
print("Preloading real CodeArc website assets...")
assets = {}

def load_img(path, target_size=(WIDTH, HEIGHT)):
    if os.path.exists(path):
        img = cv2.imread(path)
        if img is not None:
            return cv2.resize(img, target_size, interpolation=cv2.INTER_LANCZOS4)
    return np.zeros((target_size[1], target_size[0], 3), dtype=np.uint8)

assets['wild_jawai'] = load_img("public/assets/wild_jawai_live.webp")
assets['wild_jawai_safari'] = load_img("public/assets/wild_jawai_safari_hero.webp")
assets['leopard_trails'] = load_img("public/assets/leopard_trails_live.png")
assets['bros_bar'] = load_img("public/assets/brosbar_poster.png")
assets['restrosuite'] = load_img("public/assets/restrosuite_hero.png")
assets['restrosuite_preview'] = load_img("public/assets/restrosuite_preview.png")
assets['deora'] = load_img("public/assets/deora_poster.png")

# Extract frames from videos
def extract_video_frames(path, max_frames=80):
    frames = []
    if os.path.exists(path):
        cap = cv2.VideoCapture(path)
        while len(frames) < max_frames:
            ret, frame = cap.read()
            if not ret:
                break
            frames.append(cv2.resize(frame, (WIDTH, HEIGHT)))
        cap.release()
    return frames

wild_video_frames = extract_video_frames("public/assets/studio/wild-jawai-motion.mp4", 80)
leopard_video_frames = extract_video_frames("public/assets/studio/leopard-trails-motion.mp4", 80)
print(f"Loaded {len(wild_video_frames)} Wild Jawai video frames, {len(leopard_video_frames)} Leopard Trails frames.")

# ----------------------------------------------------------------------
# Helper: Text Drawer with PIL
# ----------------------------------------------------------------------
def draw_text_overlay(cv_img, lines, font, color=(255, 255, 255), align="center", line_spacing=1.1, offset=(0, 0), letter_spacing=0):
    pil_img = Image.fromarray(cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(pil_img)
    
    total_h = 0
    line_boxes = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        w = bbox[2] - bbox[0] + len(line) * letter_spacing
        h = bbox[3] - bbox[1]
        line_boxes.append((line, w, h))
        total_h += int(h * line_spacing)
    
    start_y = (HEIGHT - total_h) // 2 + offset[1]
    curr_y = start_y
    for line, w, h in line_boxes:
        if align == "center":
            x = (WIDTH - w) // 2 + offset[0]
        elif align == "left":
            x = 120 + offset[0]
        else:
            x = WIDTH - 120 - w + offset[0]
        
        # Draw with letter spacing if needed
        if letter_spacing == 0:
            draw.text((x, curr_y), line, font=font, fill=color)
        else:
            curr_x = x
            for char in line:
                draw.text((curr_x, curr_y), char, font=font, fill=color)
                c_bbox = draw.textbbox((0, 0), char, font=font)
                curr_x += (c_bbox[2] - c_bbox[0]) + letter_spacing
                
        curr_y += int(h * line_spacing)
        
    return cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

# Helper: Camera Zoom & Pan
def zoom_pan(img, zoom=1.0, pan_x=0.0, pan_y=0.0):
    if zoom == 1.0 and pan_x == 0.0 and pan_y == 0.0:
        return img
    h, w = img.shape[:2]
    new_w = int(w / zoom)
    new_h = int(h / zoom)
    
    cx = int(w / 2 + pan_x * w * 0.5)
    cy = int(h / 2 + pan_y * h * 0.5)
    
    x1 = max(0, min(cx - new_w // 2, w - new_w))
    y1 = max(0, min(cy - new_h // 2, h - new_h))
    x2 = x1 + new_w
    y2 = y1 + new_h
    
    crop = img[y1:y2, x1:x2]
    return cv2.resize(crop, (w, h), interpolation=cv2.INTER_LINEAR)

# Helper: Motion Blur
def apply_motion_blur(img, kernel_size=15, angle=0):
    if kernel_size <= 1:
        return img
    kernel = np.zeros((kernel_size, kernel_size))
    c = kernel_size // 2
    if angle == 0: # Horizontal
        kernel[c, :] = 1.0 / kernel_size
    else:
        kernel[:, c] = 1.0 / kernel_size
    return cv2.filter2D(img, -1, kernel)

# ----------------------------------------------------------------------
# Frame Rendering Pipeline (192 Frames)
# ----------------------------------------------------------------------
print("Rendering 192 cinematic showreel frames (24 fps)...")

for frame_idx in range(TOTAL_FRAMES):
    sec = frame_idx / FPS
    frame = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
    
    # ------------------------------------------------------------------
    # 0.00–0.55s (Frames 0–13): Opening darkness, laser sweep, typography slam
    # ------------------------------------------------------------------
    if frame_idx <= 13:
        if frame_idx < 4:
            # Deep Black
            pass
        elif frame_idx <= 7:
            # Laser line sweep across center
            sweep_p = (frame_idx - 4) / 3.0
            sweep_x = int(sweep_p * WIDTH)
            cv2.line(frame, (sweep_x - 300, HEIGHT // 2), (sweep_x + 300, HEIGHT // 2), (255, 255, 255), 2)
            cv2.line(frame, (sweep_x - 120, HEIGHT // 2), (sweep_x + 120, HEIGHT // 2), (255, 200, 100), 4) # Electric blue
        elif frame_idx <= 9:
            # Flash "CODEARC" in pure white
            font = load_font(FONT_BOLD, 72)
            frame = draw_text_overlay(frame, ["CODEARC"], font, color=(255, 255, 255), letter_spacing=18)
        else:
            # Typography Slam: "WE BUILD WEBSITES" with camera crash-through
            p = (frame_idx - 10) / 3.0 # 0.0 to 1.0
            zoom = 1.0 + p * 2.8
            font_size = int(120 * zoom)
            font = load_font(FONT_BOLD, min(font_size, 380))
            
            # Render on black
            temp = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
            alpha = int(255 * (1.0 - p * 0.4))
            temp = draw_text_overlay(temp, ["WE BUILD", "WEBSITES"], font, color=(alpha, alpha, alpha), line_spacing=0.9)
            if p > 0.3:
                temp = apply_motion_blur(temp, kernel_size=int(p * 25), angle=0)
            frame = temp

    # ------------------------------------------------------------------
    # 0.55–1.40s (Frames 14–33): Explode into REAL CODEARC HOMEPAGE HERO
    # ------------------------------------------------------------------
    elif frame_idx <= 33:
        p = (frame_idx - 14) / 19.0
        # Fast camera push-in through homepage hero
        zoom = 1.0 + p * 0.45
        pan_y = -p * 0.08
        
        # Base: Real website background (pearl/dark architectural canvas)
        bg = np.full((HEIGHT, WIDTH, 3), (12, 13, 14), dtype=np.uint8)
        
        # Composite Wild Jawai browser frame in the center
        browser_w, browser_h = 1400, 700
        browser = cv2.resize(assets['wild_jawai'], (browser_w, browser_h))
        # Add browser chrome
        cv2.rectangle(browser, (0, 0), (browser_w, 40), (22, 24, 28), -1)
        cv2.circle(browser, (20, 20), 5, (80, 80, 80), -1)
        cv2.circle(browser, (36, 20), 5, (80, 80, 80), -1)
        cv2.circle(browser, (52, 20), 5, (80, 80, 80), -1)
        
        # Place browser on canvas
        bx = (WIDTH - browser_w) // 2
        by = int(HEIGHT * 0.34)
        bg[by:by+browser_h, bx:bx+browser_w] = browser
        
        # Apply camera zoom & pan
        shot = zoom_pan(bg, zoom=zoom, pan_x=0.0, pan_y=pan_y)
        
        # Overlay crisp typography
        f_title = load_font(FONT_BOLD, 74)
        f_sub = load_font(FONT_REG, 24)
        
        shot = draw_text_overlay(shot, [
            "WE BUILD WEBSITES",
            "THAT MAKE BUSINESSES",
            "HARD TO IGNORE."
        ], f_title, color=(255, 255, 255), line_spacing=0.92, offset=(0, -220))
        
        shot = draw_text_overlay(shot, ["CODEARC · DIGITAL ATELIER & ENGINEERING"], f_sub, color=(160, 160, 160), offset=(0, -330), letter_spacing=6)
        
        # Subtle flash on entry
        if frame_idx <= 16:
            flash_intensity = (16 - frame_idx) / 3.0 * 0.4
            shot = cv2.addWeighted(shot, 1.0 - flash_intensity, np.full_like(shot, 255), flash_intensity, 0)
            
        frame = shot

    # ------------------------------------------------------------------
    # 1.40–2.25s (Frames 34–53): WHIP-PAN INTO WILD JAWAI (3 Rapid Cuts)
    # ------------------------------------------------------------------
    elif frame_idx <= 53:
        p_all = (frame_idx - 34) / 19.0
        
        # Cut A (Frames 34–40): Walking Leopard Hero Video
        if frame_idx <= 40:
            sub_p = (frame_idx - 34) / 6.0
            vid_idx = (frame_idx - 34) * 4 % len(wild_video_frames)
            v_frame = wild_video_frames[vid_idx] if wild_video_frames else assets['wild_jawai']
            # Zoom in slightly
            shot = zoom_pan(v_frame, zoom=1.0 + sub_p * 0.15, pan_x=sub_p * 0.05)
            
            # Whip-pan blur on first 2 frames
            if frame_idx <= 35:
                shot = apply_motion_blur(shot, kernel_size=25, angle=0)
                
            # Clean typography badge
            font_title = load_font(FONT_BOLD, 52)
            font_sub = load_font(FONT_REG, 20)
            shot = draw_text_overlay(shot, ["01 — WILD JAWAI"], font_title, color=(255, 255, 255), align="left", offset=(0, 360), letter_spacing=4)
            shot = draw_text_overlay(shot, ["TRAVEL / LUXURY HOSPITALITY"], font_sub, color=(0, 200, 255), align="left", offset=(0, 420), letter_spacing=3)
            frame = shot
            
        # Cut B (Frames 41–46): Macro Interface Crop of Booking & Terrain
        elif frame_idx <= 46:
            sub_p = (frame_idx - 41) / 5.0
            shot = zoom_pan(assets['wild_jawai'], zoom=1.8 + sub_p * 0.3, pan_x=-0.2, pan_y=0.1)
            # White shutter flash on cut frame
            if frame_idx == 41:
                shot = cv2.addWeighted(shot, 0.5, np.full_like(shot, 255), 0.5, 0)
            font_tag = load_font(FONT_BOLD, 36)
            shot = draw_text_overlay(shot, ["CINEMATIC STORYTELLING"], font_tag, color=(255, 255, 255), align="right", offset=(0, -400), letter_spacing=4)
            frame = shot
            
        # Cut C (Frames 47–53): Mobile Viewport Push
        else:
            sub_p = (frame_idx - 47) / 6.0
            shot = zoom_pan(assets['wild_jawai_safari'], zoom=1.2 + sub_p * 0.25, pan_x=0.0, pan_y=-0.1)
            if frame_idx == 47:
                shot = cv2.addWeighted(shot, 0.6, np.full_like(shot, 255), 0.4, 0)
            font_sub = load_font(FONT_BOLD, 32)
            shot = draw_text_overlay(shot, ["MOBILE-FIRST ARCHITECTURE"], font_sub, color=(255, 255, 255), align="left", offset=(0, -420), letter_spacing=4)
            frame = shot

    # ------------------------------------------------------------------
    # 2.25–3.05s (Frames 54–72): MATCH CUT INTO LEOPARD TRAILS
    # ------------------------------------------------------------------
    elif frame_idx <= 72:
        p = (frame_idx - 54) / 18.0
        vid_idx = (frame_idx - 54) * 3 % len(leopard_video_frames)
        v_frame = leopard_video_frames[vid_idx] if leopard_video_frames else assets['leopard_trails']
        
        # Fast camera push & slight rotation/pan
        zoom = 1.05 + p * 0.35
        shot = zoom_pan(v_frame, zoom=zoom, pan_x=-p * 0.08, pan_y=p * 0.05)
        
        # Reverse wipe flash on frame 54
        if frame_idx <= 55:
            shot = cv2.addWeighted(shot, 0.6, np.full_like(shot, 255), 0.4, 0)
            
        # Typography
        f_title = load_font(FONT_BOLD, 54)
        f_sub = load_font(FONT_REG, 20)
        shot = draw_text_overlay(shot, ["02 — LEOPARD TRAILS"], f_title, color=(255, 255, 255), align="left", offset=(0, 360), letter_spacing=4)
        shot = draw_text_overlay(shot, ["ULTRA-LUXURY SAFARI OUTPOST"], f_sub, color=(200, 200, 200), align="left", offset=(0, 420), letter_spacing=3)
        frame = shot

    # ------------------------------------------------------------------
    # 3.05–3.80s (Frames 73–90): HARD CUT INTO BRO'S BAR (Dark & Punchy)
    # ------------------------------------------------------------------
    elif frame_idx <= 90:
        p = (frame_idx - 73) / 17.0
        
        if frame_idx <= 81:
            # Full POS screen push
            sub_p = (frame_idx - 73) / 8.0
            shot = zoom_pan(assets['bros_bar'], zoom=1.1 + sub_p * 0.3, pan_x=0.0, pan_y=0.0)
            if frame_idx == 73:
                shot = cv2.addWeighted(shot, 0.5, np.full_like(shot, 255), 0.5, 0)
            f_title = load_font(FONT_BOLD, 52)
            f_sub = load_font(FONT_REG, 20)
            shot = draw_text_overlay(shot, ["03 — BRO'S BAR"], f_title, color=(255, 255, 255), align="right", offset=(0, 360), letter_spacing=4)
            shot = draw_text_overlay(shot, ["SERVICE-HOUR POS SPEED"], f_sub, color=(0, 200, 255), align="right", offset=(0, 420), letter_spacing=3)
        else:
            # Macro Billing Detail Crop
            sub_p = (frame_idx - 82) / 8.0
            shot = zoom_pan(assets['bros_bar'], zoom=2.2 + sub_p * 0.4, pan_x=0.25, pan_y=-0.15)
            if frame_idx == 82:
                shot = cv2.addWeighted(shot, 0.6, np.full_like(shot, 255), 0.4, 0)
            f_tag = load_font(FONT_BOLD, 36)
            shot = draw_text_overlay(shot, ["TOUCH-FIRST FLOOR OPS"], f_tag, color=(255, 255, 255), align="left", offset=(0, -400), letter_spacing=3)
            
        frame = shot

    # ------------------------------------------------------------------
    # 3.80–4.70s (Frames 91–112): MUSIC DROP (Silence) + RAPID WORDS FLASH
    # ------------------------------------------------------------------
    elif frame_idx <= 112:
        # Frames 91–94: Pure Black Pause
        if frame_idx <= 94:
            frame = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
            
        # Frames 95–98: Enormous statement
        elif frame_idx <= 98:
            f_state = load_font(FONT_BOLD, 68)
            frame = draw_text_overlay(frame, [
                "A GOOD WEBSITE",
                "SHOULD DO MORE",
                "THAN LOOK GOOD."
            ], f_state, color=(255, 255, 255), line_spacing=0.95)
            
        # Rapid synchronized flashes of single power verbs
        elif frame_idx <= 101:
            # 99–101: GET NOTICED
            f_word = load_font(FONT_BOLD, 120)
            frame = draw_text_overlay(frame, ["GET NOTICED"], f_word, color=(255, 255, 255), letter_spacing=8)
        elif frame_idx <= 104:
            # 102–104: BUILD TRUST
            f_word = load_font(FONT_BOLD, 120)
            frame = draw_text_overlay(frame, ["BUILD TRUST"], f_word, color=(0, 200, 255), letter_spacing=8)
        elif frame_idx <= 107:
            # 105–107: GENERATE ENQUIRIES
            f_word = load_font(FONT_BOLD, 96)
            frame = draw_text_overlay(frame, ["GENERATE ENQUIRIES"], f_word, color=(255, 255, 255), letter_spacing=6)
        elif frame_idx <= 110:
            # 108–110: SELL
            f_word = load_font(FONT_BOLD, 160)
            frame = draw_text_overlay(frame, ["SELL"], f_word, color=(0, 255, 180), letter_spacing=12)
        else:
            # 111–112: BOOK
            f_word = load_font(FONT_BOLD, 160)
            frame = draw_text_overlay(frame, ["BOOK."], f_word, color=(255, 255, 255), letter_spacing=12)

    # ------------------------------------------------------------------
    # 4.70–5.65s (Frames 113–135): DESIGN INTO DEEP TECHNOLOGY (RestroSuite)
    # ------------------------------------------------------------------
    elif frame_idx <= 135:
        p = (frame_idx - 113) / 22.0
        
        if frame_idx <= 123:
            # RestroSuite POS & Kitchen screen macro sweep
            sub_p = (frame_idx - 113) / 10.0
            shot = zoom_pan(assets['restrosuite'], zoom=1.1 + sub_p * 0.35, pan_x=-0.1 + sub_p * 0.2, pan_y=0.0)
            if frame_idx == 113:
                shot = cv2.addWeighted(shot, 0.5, np.full_like(shot, 255), 0.5, 0)
            f_title = load_font(FONT_BOLD, 52)
            f_sub = load_font(FONT_REG, 20)
            shot = draw_text_overlay(shot, ["RESTROSUITE"], f_title, color=(255, 255, 255), align="left", offset=(0, 360), letter_spacing=4)
            shot = draw_text_overlay(shot, ["RESTAURANT OS & BILLING ENGINE"], f_sub, color=(0, 200, 255), align="left", offset=(0, 420), letter_spacing=3)
        else:
            # Multi-unit Deora Plaza hospitality portal macro
            sub_p = (frame_idx - 124) / 11.0
            shot = zoom_pan(assets['deora'], zoom=1.3 + sub_p * 0.4, pan_x=0.1 - sub_p * 0.2, pan_y=-0.1)
            if frame_idx == 124:
                shot = cv2.addWeighted(shot, 0.6, np.full_like(shot, 255), 0.4, 0)
            f_title = load_font(FONT_BOLD, 52)
            f_sub = load_font(FONT_REG, 20)
            shot = draw_text_overlay(shot, ["DEORA PLAZA"], f_title, color=(255, 255, 255), align="right", offset=(0, 360), letter_spacing=4)
            shot = draw_text_overlay(shot, ["MULTI-UNIT HOSPITALITY OS"], f_sub, color=(200, 200, 200), align="right", offset=(0, 420), letter_spacing=3)
            
        frame = shot

    # ------------------------------------------------------------------
    # 5.65–6.45s (Frames 136–154): HUGE TYPOGRAPHIC HIT
    # ------------------------------------------------------------------
    elif frame_idx <= 154:
        if frame_idx <= 144:
            # BEAUTIFUL ON THE OUTSIDE (over Wild Jawai website background)
            p_sub = (frame_idx - 136) / 8.0
            bg = zoom_pan(assets['wild_jawai'], zoom=1.1 + p_sub * 0.1)
            bg = (bg * 0.3).astype(np.uint8) # Darkened
            f_hit = load_font(FONT_BOLD, 84)
            frame = draw_text_overlay(bg, ["BEAUTIFUL", "ON THE OUTSIDE."], f_hit, color=(255, 255, 255), line_spacing=0.92)
            if frame_idx == 136:
                frame = cv2.addWeighted(frame, 0.5, np.full_like(frame, 255), 0.5, 0)
        else:
            # SERIOUS UNDERNEATH (over software interface background)
            p_sub = (frame_idx - 145) / 9.0
            bg = zoom_pan(assets['restrosuite'], zoom=1.3 + p_sub * 0.15)
            bg = (bg * 0.25).astype(np.uint8) # Darkened
            f_hit = load_font(FONT_BOLD, 84)
            frame = draw_text_overlay(bg, ["SERIOUS", "UNDERNEATH."], f_hit, color=(0, 200, 255), line_spacing=0.92)
            if frame_idx == 145:
                frame = cv2.addWeighted(frame, 0.4, np.full_like(frame, 255), 0.6, 0)

    # ------------------------------------------------------------------
    # 6.45–7.20s (Frames 155–172): MASSIVE ACCELERATION (4 Ultra-Fast Flashes)
    # ------------------------------------------------------------------
    elif frame_idx <= 172:
        # Flash 1 (155–158): Wild Jawai
        if frame_idx <= 158:
            sub_p = (frame_idx - 155) / 3.0
            shot = zoom_pan(assets['wild_jawai'], zoom=1.2 + sub_p * 0.3, pan_x=-0.1)
            if frame_idx == 155:
                shot = np.full_like(shot, 255) # White flash
            f_tag = load_font(FONT_BOLD, 48)
            shot = draw_text_overlay(shot, ["WILD JAWAI"], f_tag, color=(255, 255, 255), letter_spacing=8)
            frame = shot
            
        # Flash 2 (159–162): Leopard Trails
        elif frame_idx <= 162:
            sub_p = (frame_idx - 159) / 3.0
            shot = zoom_pan(assets['leopard_trails'], zoom=1.2 + sub_p * 0.3, pan_x=0.1)
            if frame_idx == 159:
                shot = np.full_like(shot, 255)
            f_tag = load_font(FONT_BOLD, 48)
            shot = draw_text_overlay(shot, ["LEOPARD TRAILS"], f_tag, color=(255, 255, 255), letter_spacing=8)
            frame = shot
            
        # Flash 3 (163–166): Bro's Bar
        elif frame_idx <= 166:
            sub_p = (frame_idx - 163) / 3.0
            shot = zoom_pan(assets['bros_bar'], zoom=1.2 + sub_p * 0.3, pan_y=-0.1)
            if frame_idx == 163:
                shot = np.full_like(shot, 255)
            f_tag = load_font(FONT_BOLD, 48)
            shot = draw_text_overlay(shot, ["BRO'S BAR"], f_tag, color=(255, 255, 255), letter_spacing=8)
            frame = shot
            
        # Flash 4 (167–172): CodeArc Software
        else:
            sub_p = (frame_idx - 167) / 5.0
            shot = zoom_pan(assets['restrosuite'], zoom=1.1 + sub_p * 0.4)
            if frame_idx == 167:
                shot = np.full_like(shot, 255)
            f_tag = load_font(FONT_BOLD, 48)
            shot = draw_text_overlay(shot, ["CUSTOM SOFTWARE"], f_tag, color=(0, 200, 255), letter_spacing=8)
            frame = shot

    # ------------------------------------------------------------------
    # 7.20–8.00s (Frames 173–191): CUT TO SILENCE & ICONIC CODEARC FINALE
    # ------------------------------------------------------------------
    else:
        p = (frame_idx - 173) / 18.0
        # Luxurious deep obsidian background (#0a0a0a)
        frame = np.full((HEIGHT, WIDTH, 3), (10, 10, 10), dtype=np.uint8)
        
        # Subtle light sheen sweeping across typography
        light_pos = int((p * 2.0 - 0.5) * WIDTH)
        
        # Fonts
        f_brand = load_font(FONT_BOLD, 104)
        f_studio = load_font(FONT_REG, 20)
        f_headline = load_font(FONT_BOLD, 44)
        f_url = load_font(FONT_BOLD, 18)
        
        # Draw Brand Title
        frame = draw_text_overlay(frame, ["CODEARC"], f_brand, color=(255, 255, 255), offset=(0, -140), letter_spacing=14)
        
        # Subtitle
        frame = draw_text_overlay(frame, ["DIGITAL STUDIO · INDIA"], f_studio, color=(0, 180, 255), offset=(0, -50), letter_spacing=8)
        
        # Punchline
        frame = draw_text_overlay(frame, [
            "WE BUILD WEBSITES",
            "THAT MAKE BUSINESSES",
            "HARD TO IGNORE."
        ], f_headline, color=(230, 230, 230), line_spacing=1.05, offset=(0, 100))
        
        # Final URL
        frame = draw_text_overlay(frame, ["CODEARC.CO.IN"], f_url, color=(140, 140, 140), offset=(0, 360), letter_spacing=6)
        
        # Add subtle light sheen
        if 0.2 < p < 0.8:
            sheen_overlay = np.zeros_like(frame)
            cv2.line(sheen_overlay, (light_pos - 150, 0), (light_pos + 150, HEIGHT), (40, 60, 90), 80)
            sheen_overlay = cv2.GaussianBlur(sheen_overlay, (101, 101), 0)
            frame = cv2.add(frame, sheen_overlay)

    # Save frame
    frame_path = os.path.join(FRAMES_DIR, f"frame_{frame_idx:04d}.png")
    cv2.imwrite(frame_path, frame)
    
    if (frame_idx + 1) % 24 == 0 or frame_idx == TOTAL_FRAMES - 1:
        print(f"Rendered {frame_idx + 1}/{TOTAL_FRAMES} frames ({((frame_idx + 1)/FPS):.2f}s)...")

print("All 192 frames rendered successfully!")

# ----------------------------------------------------------------------
# 2. Encode to MP4 with FFMPEG
# ----------------------------------------------------------------------
print(f"Encoding final video with ffmpeg: {FINAL_VIDEO}...")
import subprocess

cmd = [
    FFMPEG_EXE,
    "-y",
    "-r", "24",
    "-i", os.path.join(FRAMES_DIR, "frame_%04d.png"),
    "-i", AUDIO_FILE,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "slow",
    "-crf", "16",
    "-c:a", "aac",
    "-b:a", "320k",
    "-shortest",
    FINAL_VIDEO
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode != 0:
    print("FFMPEG ERROR:", res.stderr)
    sys.exit(1)

print(f"SUCCESS! Output generated: {FINAL_VIDEO}")
file_size_mb = os.path.getsize(FINAL_VIDEO) / (1024 * 1024)
print(f"Final video size: {file_size_mb:.2f} MB")
