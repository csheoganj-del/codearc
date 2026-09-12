from __future__ import annotations

import math
import os
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


SIZE = 1080
FPS = 30
DURATION = 3.6
BG = (11, 12, 11)
CREAM = (247, 242, 234)
INK = (23, 25, 23)
ORANGE = (232, 90, 47)
OUT_DIR = Path(__file__).resolve().parents[1] / "exports" / "codearc-social-kit"
FONT_PATH = Path(os.environ.get("WINDIR", r"C:\Windows")) / "Fonts" / "segoeuib.ttf"


def clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def ease_out_cubic(value: float) -> float:
    value = clamp(value)
    return 1 - (1 - value) ** 3


def ease_in_out(value: float) -> float:
    value = clamp(value)
    return value * value * (3 - 2 * value)


def bounce(value: float) -> tuple[float, float, float]:
    value = clamp(value)
    if value < 0.58:
        part = value / 0.58
        y = 42 * (1 - ease_out_cubic(part)) - 16 * math.sin(part * math.pi)
        scale = 0.84 + 0.22 * ease_out_cubic(part)
    elif value < 0.78:
        part = (value - 0.58) / 0.20
        y = -16 + 24 * ease_in_out(part)
        scale = 1.06 - 0.08 * ease_in_out(part)
    else:
        part = (value - 0.78) / 0.22
        y = 8 * (1 - ease_out_cubic(part))
        scale = 0.98 + 0.02 * ease_out_cubic(part)
    opacity = ease_out_cubic(value / 0.38)
    return y, scale, opacity


def cubic(p0, p1, p2, p3, steps=30):
    points = []
    for idx in range(steps + 1):
        t = idx / steps
        u = 1 - t
        points.append(
            (
                u**3 * p0[0] + 3 * u**2 * t * p1[0] + 3 * u * t**2 * p2[0] + t**3 * p3[0],
                u**3 * p0[1] + 3 * u**2 * t * p1[1] + 3 * u * t**2 * p2[1] + t**3 * p3[1],
            )
        )
    return points


def arch_points():
    return (
        [(32, 102), (32, 65)]
        + cubic((32, 65), (32, 35), (48, 20), (64, 20), steps=34)[1:]
        + cubic((64, 20), (80, 20), (96, 35), (96, 65), steps=34)[1:]
        + [(96, 102)]
    )


def inner_points():
    left = [(48, 102), (48, 67)] + cubic((48, 67), (48, 50), (55, 40), (64, 40), steps=25)[1:]
    right = cubic((64, 40), (73, 40), (80, 50), (80, 67), steps=25)[1:] + [(80, 102)]
    return left + right


def outer_arch_shape():
    outer = (
        [(26.5, 102), (26.5, 65)]
        + cubic((26.5, 65), (26.5, 31), (45, 14.5), (64, 14.5), steps=38)[1:]
        + cubic((64, 14.5), (83, 14.5), (101.5, 31), (101.5, 65), steps=38)[1:]
        + [(101.5, 102)]
    )
    inner = (
        [(90.5, 102), (90.5, 65)]
        + cubic((90.5, 65), (90.5, 39), (76, 25.5), (64, 25.5), steps=38)[1:]
        + cubic((64, 25.5), (52, 25.5), (37.5, 39), (37.5, 65), steps=38)[1:]
        + [(37.5, 102)]
    )
    return outer + inner


def draw_glow(canvas: Image.Image) -> None:
    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    draw.ellipse((230, 265, 850, 875), fill=(61, 155, 106, 22))
    draw.ellipse((445, 280, 1010, 820), fill=(200, 58, 33, 18))
    canvas.alpha_composite(glow.filter(ImageFilter.GaussianBlur(95)))


def draw_mark(canvas: Image.Image, progress: float, arch_progress: float, inner_progress: float, key_progress: float, pulse: float) -> None:
    mark_size = 250
    cx, cy = 315, 540
    scale = 0.82 + 0.18 * ease_out_cubic(progress)
    mark = Image.new("RGBA", (320, 320), (0, 0, 0, 0))
    draw = ImageDraw.Draw(mark)

    shadow = Image.new("RGBA", mark.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((37, 41, 283, 287), radius=58, fill=(0, 0, 0, 110))
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    mark.alpha_composite(shadow)

    draw.rounded_rectangle((35, 35, 285, 285), radius=59, fill=CREAM + (255,))

    factor = 250 / 128
    origin = 35
    path = [(origin + x * factor, origin + y * factor) for x, y in arch_points()]
    visible = max(2, int(len(path) * clamp(arch_progress)))
    if arch_progress >= 0.985:
        arch_fill = [(origin + x * factor, origin + y * factor) for x, y in outer_arch_shape()]
        draw.polygon(arch_fill, fill=INK + (255,))
        radius = 5.5 * factor
        for end_x in (32, 96):
            center_x = origin + end_x * factor
            center_y = origin + 102 * factor
            draw.ellipse(
                (center_x - radius, center_y - radius, center_x + radius, center_y + radius),
                fill=INK + (255,),
            )
    else:
        draw.line([(round(x), round(y)) for x, y in path[:visible]], fill=INK + (255,), width=22)

    inner = [(origin + x * factor, origin + (102 - (102 - y) * clamp(inner_progress)) * factor) for x, y in inner_points()]
    draw.polygon(inner, fill=INK + (255,))

    kp = ease_out_cubic(key_progress)
    key_y = origin + (13 - 12 * (1 - kp)) * factor
    key_scale = (0.72 + 0.28 * kp) * (1 + 0.045 * pulse)
    kw, kh = 18 * factor * key_scale, 13 * factor * key_scale
    kx = origin + 64 * factor
    draw.rounded_rectangle((kx - kw / 2, key_y, kx + kw / 2, key_y + kh), radius=8, fill=ORANGE + (255,))

    mark = mark.resize((round(320 * scale), round(320 * scale)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(mark, (round(cx - mark.width / 2), round(cy - mark.height / 2)))


def draw_wordmark(canvas: Image.Image, time_s: float, fade: float) -> None:
    font = ImageFont.truetype(str(FONT_PATH), 128)
    letters = list("CodeArc")
    colors = [CREAM] * 4 + [ORANGE] * 3
    advances = [font.getlength(letter) for letter in letters]
    total = sum(advances) - 10 * (len(letters) - 1)
    x = 475
    baseline = 540

    for index, (letter, color, advance) in enumerate(zip(letters, colors, advances)):
        start = 0.70 + index * 0.075 + (0.04 if index >= 4 else 0)
        progress = (time_s - start) / 0.62
        if progress <= 0:
            x += advance - 10
            continue
        y_offset, scale, opacity = bounce(progress)
        alpha = round(255 * opacity * fade)
        if alpha <= 0:
            x += advance - 10
            continue

        bbox = font.getbbox(letter)
        glyph = Image.new("RGBA", (max(8, bbox[2] - bbox[0] + 30), max(8, bbox[3] - bbox[1] + 30)), (0, 0, 0, 0))
        ImageDraw.Draw(glyph).text((15 - bbox[0], 15 - bbox[1]), letter, font=font, fill=color + (alpha,))
        glyph = glyph.resize((round(glyph.width * scale), round(glyph.height * scale)), Image.Resampling.LANCZOS)
        canvas.alpha_composite(glyph, (round(x - 15), round(baseline + y_offset - glyph.height / 2)))
        x += advance - 10


def make_frame(time_s: float, resolution: int = SIZE) -> Image.Image:
    canvas = Image.new("RGBA", (SIZE, SIZE), BG + (255,))
    draw_glow(canvas)

    fade = 1.0
    if time_s > 3.05:
        fade = 1 - ease_in_out((time_s - 3.05) / 0.48)

    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    pulse = 0.5 + 0.5 * math.sin(max(0, time_s - 1.3) * math.pi * 1.1)
    draw_mark(
        layer,
        (time_s - 0.02) / 0.52,
        (time_s - 0.18) / 0.72,
        (time_s - 0.43) / 0.52,
        (time_s - 0.76) / 0.42,
        pulse if time_s > 1.3 else 0,
    )
    draw_wordmark(layer, time_s, 1.0)
    if fade < 1:
        layer.putalpha(layer.getchannel("A").point(lambda value: round(value * fade)))
    canvas.alpha_composite(layer)

    if resolution != SIZE:
        canvas = canvas.resize((resolution, resolution), Image.Resampling.LANCZOS)
    return canvas.convert("RGB")


def place_square(frame: Image.Image, width: int, height: int, scale: float = 1.0) -> Image.Image:
    output = Image.new("RGB", (width, height), BG)
    target = max(1, round(min(width, height) * scale))
    placed = frame.resize((target, target), Image.Resampling.LANCZOS)
    output.paste(placed, ((width - target) // 2, (height - target) // 2))
    return output


def make_cover(
    width: int,
    height: int,
    lockup_width: float = 0.62,
    vertical_position: float = 0.5,
) -> Image.Image:
    output = Image.new("RGBA", (width, height), BG + (255,))
    glow = Image.new("RGBA", output.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse(
        (width * 0.24, -height * 0.7, width * 0.76, height * 1.7),
        fill=(61, 155, 106, 20),
    )
    glow_draw.ellipse(
        (width * 0.46, -height * 0.8, width * 0.92, height * 1.6),
        fill=(200, 58, 33, 18),
    )
    output.alpha_composite(glow.filter(ImageFilter.GaussianBlur(max(25, round(height * 0.22)))))

    lockup_layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw_mark(lockup_layer, 1, 1, 1, 1, 0.25)
    draw_wordmark(lockup_layer, 2.45, 1.0)
    lockup_bounds = lockup_layer.getbbox()
    if lockup_bounds is None:
        raise RuntimeError("Unable to render CodeArc lockup")
    lockup = lockup_layer.crop(lockup_bounds)
    target_width = round(width * lockup_width)
    target_height = round(target_width * lockup.height / lockup.width)
    max_height = round(height * 0.72)
    if target_height > max_height:
        target_height = max_height
        target_width = round(target_height * lockup.width / lockup.height)
    lockup = lockup.resize((target_width, target_height), Image.Resampling.LANCZOS)
    center_y = round(height * vertical_position)
    top = max(0, min(height - target_height, center_y - target_height // 2))
    output.alpha_composite(lockup, ((width - target_width) // 2, top))
    return output.convert("RGB")


def make_avatar() -> Image.Image:
    output = Image.new("RGBA", (SIZE, SIZE), BG + (255,))
    draw_glow(output)
    mark_layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw_mark(mark_layer, 1, 1, 1, 1, 0.25)
    bounds = mark_layer.getbbox()
    if bounds is None:
        raise RuntimeError("Unable to render CodeArc mark")
    source = mark_layer.crop(bounds).resize((590, 590), Image.Resampling.LANCZOS)
    output.alpha_composite(source, ((SIZE - 590) // 2, (SIZE - 590) // 2))
    return output.convert("RGB")


def make_whatsapp_cover() -> Image.Image:
    width, height = 1211, 681
    output = Image.new("RGBA", (width, height), BG + (255,))
    glow = Image.new("RGBA", output.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse((-90, -120, 650, 700), fill=(61, 155, 106, 18))
    glow_draw.ellipse((510, -160, 1280, 680), fill=(200, 58, 33, 20))
    output.alpha_composite(glow.filter(ImageFilter.GaussianBlur(90)))

    font = ImageFont.truetype(str(FONT_PATH), 138)
    draw = ImageDraw.Draw(output)
    code_width = draw.textlength("Code", font=font)
    arc_width = draw.textlength("Arc", font=font)
    total_width = code_width + arc_width - 8
    start_x = (width - total_width) / 2
    text_y = 215
    draw.text((start_x, text_y), "Code", font=font, fill=CREAM + (255,))
    draw.text((start_x + code_width - 8, text_y), "Arc", font=font, fill=ORANGE + (255,))
    return output.convert("RGB")


def write_mp4(path: Path, frames: list[Image.Image], width: int, height: int) -> None:
    import imageio_ffmpeg

    writer = imageio_ffmpeg.write_frames(
        str(path),
        (width, height),
        fps=FPS,
        codec="libx264",
        pix_fmt_in="rgb24",
        pix_fmt_out="yuv420p",
        macro_block_size=1,
        output_params=["-movflags", "+faststart", "-crf", "20"],
    )
    writer.send(None)
    for frame in frames:
        writer.send(np.asarray(frame))
    writer.close()


def save_assets() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    frames = [make_frame(index / FPS) for index in range(round(DURATION * FPS))]

    avatar = make_avatar()
    avatar.save(OUT_DIR / "codearc-universal-profile.png", optimize=True)

    profile_lockup = make_frame(2.45)
    profile_lockup.save(OUT_DIR / "codearc-profile-with-name.png", optimize=True)

    make_cover(1640, 624).save(OUT_DIR / "codearc-facebook-cover.png", optimize=True)
    make_whatsapp_cover().save(
        OUT_DIR / "codearc-whatsapp-business-cover.png",
        optimize=True,
    )
    make_cover(1128, 191, lockup_width=0.42).save(OUT_DIR / "codearc-linkedin-cover.png", optimize=True)
    make_cover(1500, 500, lockup_width=0.52).save(OUT_DIR / "codearc-x-header.png", optimize=True)
    make_cover(2560, 1440, lockup_width=0.44).save(OUT_DIR / "codearc-youtube-banner.png", optimize=True)

    gif_frames = [frame.resize((720, 720), Image.Resampling.LANCZOS) for frame in frames[::2]]
    gif_frames[0].save(
        OUT_DIR / "codearc-square-animation.gif",
        save_all=True,
        append_images=gif_frames[1:],
        duration=round(2000 / FPS),
        loop=0,
        optimize=True,
        disposal=2,
    )

    try:
        write_mp4(OUT_DIR / "codearc-square-animation.mp4", frames, SIZE, SIZE)
        vertical_frames = [place_square(frame, 1080, 1920, 1.0) for frame in frames]
        write_mp4(OUT_DIR / "codearc-story-reel-short.mp4", vertical_frames, 1080, 1920)
        landscape_frames = [place_square(frame, 1920, 1080, 1.0) for frame in frames]
        write_mp4(OUT_DIR / "codearc-landscape-animation.mp4", landscape_frames, 1920, 1080)
    except ImportError as error:
        raise SystemExit("Install imageio-ffmpeg before generating the MP4 files") from error

    print(OUT_DIR)


if __name__ == "__main__":
    save_assets()
