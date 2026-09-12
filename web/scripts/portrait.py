"""Prepare the portrait for the site.

Takes the supplied illustrated portrait, cuts it off its flat backdrop, and writes a
transparent PNG at the size the hero frame uses.

The key is texture, not brightness. The illustration's backdrop measures ~0.002 local
standard deviation because it is flat fill, while the face measures 0.047 and the hair
0.083. Brightness is kept only as a second test, to exclude the dark shirt, which is
also smooth. Only backdrop connected to the frame edge is removed, so any enclosed
light area inside the subject survives.

    python scripts/portrait.py
"""
import cv2
import numpy as np
from PIL import Image

SRC = r"C:\Users\Venkat\Downloads\WhatsApp Image 2026-09-12 at 6.15.15 PM.jpeg"
OUT = r"C:\VSC- AI\Venkat\web\public\img\portrait-illustration.png"
OUT_W, OUT_H = 1100, 1375                 # 4:5, matching the hero frame
SCALE = 2                                 # work large, downsample for clean edges
W, H = OUT_W * SCALE, OUT_H * SCALE

# ------------------------------------------------------------------ load and crop
src = Image.open(SRC).convert("RGB")
W0, H0 = src.size
target = OUT_W / OUT_H
w, h = W0, int(W0 / target)
if h > H0:
    h = H0
    w = int(H0 * target)
left = (W0 - w) // 2
top = 0                                    # crop from the top; the head sits there
src = src.crop((left, top, left + w, top + h)).resize((W, H), Image.LANCZOS)
img = np.asarray(src)
gy = np.asarray(src.convert("L")).astype(np.float32) / 255.0

# ------------------------------------------------------ matte, keyed on saturation
#
# Texture nearly works but not quite: the illustration is drawn with a soft outer
# glow whose gradient reads as slight variation, so it survives a texture key and
# shows as a halo on a dark page. Saturation separates them outright. Measured on
# this image: backdrop and glow both sit at 0.106 saturation and 0.82 value, while
# skin is 0.47-0.60, the shirt 0.52, and hair is dark. So "neutral and light" is
# the backdrop and nothing else in the picture matches it.
hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
sat = hsv[..., 1].astype(np.float32) / 255.0
val = hsv[..., 2].astype(np.float32) / 255.0
cand = (((sat < 0.20) & (val > 0.65)).astype(np.uint8)) * 255
cand = cv2.medianBlur(cand, 7 * SCALE + 1) > 127

# keep only the backdrop that touches the frame edge, so light areas enclosed by the
# subject (eye whites, teeth) stay foreground
_, lab = cv2.connectedComponents(cand.astype(np.uint8))
border = (set(lab[0, :]) | set(lab[-1, :]) | set(lab[:, 0]) | set(lab[:, -1])) - {0}
fg = (~np.isin(lab, list(border))).astype(np.uint8) * 255

ell = lambda s: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (s, s))
fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, ell(7 * SCALE + 1))   # repair thin bites
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, ell(5 * SCALE + 1))    # drop stray specks
fg = cv2.erode(fg, ell(2 * SCALE + 1))                           # just off the boundary
fg = cv2.GaussianBlur(fg, (0, 0), 1.4 * SCALE)
A = np.clip((fg.astype(np.float32) / 255.0 - 0.45) / 0.28, 0, 1)

# ------------------------------------------------------- repaint the drawn outline
# The illustration has a pale outline drawn around the subject. Measured across the
# edge it is about 9px of FULLY OPAQUE cream at delivery size, so keying the repaint
# on alpha does nothing: alpha is already 255 there. Key on distance from the
# silhouette edge instead, and fill from colours sampled well inside the subject.
RIM = 7 * SCALE                                    # only the anti-aliased seam is left
fgb = (A > 0.5).astype(np.uint8)
dist = cv2.distanceTransform(fgb, cv2.DIST_L2, 5)

deep = (dist > RIM).astype(np.float32)             # only sample from real interior
num = cv2.GaussianBlur(img.astype(np.float32) * deep[..., None], (0, 0), RIM * 2.0)
den = cv2.GaussianBlur(deep, (0, 0), RIM * 2.0)
inner = num / np.maximum(den, 0.03)[..., None]

band = np.clip((RIM - dist) / RIM, 0, 1)[..., None]
rgb = np.clip(img * (1 - band) + inner * band, 0, 255)

# ----------------------------------------------------- bleed colour outward
# Critical for delivery, not for the file itself. Next re-encodes this as lossy WebP,
# which compresses RGB independently of alpha. Whatever colour sits in the fully
# transparent region therefore bleeds into the semi-transparent edge on decode. Left
# as-is those pixels were near-white, and the halo came back in the browser even
# though the PNG on disk was clean. Flood the subject's own colours outward so there
# is nothing bright left to bleed.
known = (A > 0.35).astype(np.float32)
filled = rgb.astype(np.float32) * known[..., None]
for sigma in (4, 10, 24, 56, 120):
    num = cv2.GaussianBlur(filled, (0, 0), sigma * SCALE / 2)
    den = cv2.GaussianBlur(known, (0, 0), sigma * SCALE / 2)
    avg = num / np.maximum(den, 1e-4)[..., None]
    gap = known < 0.5
    filled[gap] = avg[gap]
    known = np.maximum(known, (den > 1e-3).astype(np.float32))
rgb = np.where((A > 0.35)[..., None], rgb, filled)

rgba = np.dstack([np.clip(rgb, 0, 255).astype(np.uint8), (A * 255).astype(np.uint8)])
Image.fromarray(rgba, "RGBA").resize((OUT_W, OUT_H), Image.LANCZOS).save(OUT, optimize=True)
print("wrote", OUT, f"({OUT_W}x{OUT_H}) opaque {round(float((A > 0.5).mean()) * 100, 1)}%")
