"""Illustrated portrait. Flatten broad areas into paint regions, but blend the real
photograph back wherever local contrast is high, so eyes, mouth and hair survive."""
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

SRC = r"C:\Users\Venkat\Downloads\WhatsApp Image 2026-09-12 at 4.19.32 PM.jpeg"
OUT = r"C:\VSC- AI\Venkat\web\public\img\portrait.png"
Wt, Ht = 1100, 1375

im = Image.open(SRC).convert("RGB")
W0, H0 = im.size
w, h = W0, int(W0 / (Wt / Ht))
if h > H0:
    h = H0; w = int(H0 * (Wt / Ht))
left = (W0 - w) // 2
top = max(0, int(H0 * 0.01))
if top + h > H0: top = H0 - h
im = im.crop((left, top, left + w, top + h)).resize((Wt, Ht), Image.LANCZOS)
gray = im.convert("L")

# ---------------- matte ----------------
sm = gray.resize((280, 350), Image.LANCZOS)
a = np.asarray(sm).astype(np.float32) / 255.0
bl = np.asarray(sm.filter(ImageFilter.GaussianBlur(2))).astype(np.float32) / 255.0
cand = (bl > 0.58) & (np.abs(a - bl) < 0.04)
seed = np.zeros_like(cand)
seed[0, :] = cand[0, :]; seed[-1, :] = cand[-1, :]
seed[:, 0] = cand[:, 0]; seed[:, -1] = cand[:, -1]
cur = Image.fromarray((seed * 255).astype(np.uint8))
for _ in range(240):
    grown = (np.asarray(cur.filter(ImageFilter.MaxFilter(3))) > 127) & cand
    if grown.sum() == (np.asarray(cur) > 127).sum():
        break
    cur = Image.fromarray((grown * 255).astype(np.uint8))
alpha = Image.fromarray(((~(np.asarray(cur) > 127)) * 255).astype(np.uint8)).resize((Wt, Ht), Image.BILINEAR)
alpha = alpha.point(lambda v: 255 if v > 128 else 0)
for _ in range(3):
    alpha = alpha.filter(ImageFilter.MinFilter(5))
alpha = alpha.filter(ImageFilter.GaussianBlur(2.0))
A = np.clip((np.asarray(alpha).astype(np.float32) / 255.0 - 0.4) / 0.32, 0, 1)

# ---------------- base grade on the real photo ----------------
base = ImageEnhance.Color(im).enhance(1.20)
B = np.asarray(base).astype(np.float32) / 255.0
B = np.power(np.clip(B, 0, 1), 0.88)
B = np.clip(0.5 + (B - 0.5) * 1.10, 0, 1)

# ---------------- flattened paint layer ----------------
soft = base.filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.MedianFilter(5))
soft = soft.filter(ImageFilter.GaussianBlur(2.0))
flat = soft.quantize(colors=28, method=Image.MEDIANCUT, dither=Image.NONE).convert("RGB")
flat = flat.filter(ImageFilter.GaussianBlur(1.3))
F = np.asarray(flat).astype(np.float32) / 255.0

# ---------------- detail mask: keep the photograph where it matters ----------------
g = np.asarray(gray).astype(np.float32) / 255.0
gb = np.asarray(gray.filter(ImageFilter.GaussianBlur(5))).astype(np.float32) / 255.0
detail = np.abs(g - gb)
D = np.clip((detail - 0.018) / 0.085, 0, 1)
D = np.asarray(
    Image.fromarray((D * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.5))
).astype(np.float32) / 255.0
D = np.clip(D * 1.5, 0, 1)[..., None]

rgb = F * (1 - D) + B * D                      # paint on skin, photo on features

# ---------------- soft ink lines ----------------
lg = np.asarray(flat.convert("L").filter(ImageFilter.GaussianBlur(1.6))).astype(np.float32)
gx = np.zeros_like(lg); gy = np.zeros_like(lg)
gx[:, 1:-1] = lg[:, 2:] - lg[:, :-2]
gy[1:-1, :] = lg[2:, :] - lg[:-2, :]
mag = np.sqrt(gx ** 2 + gy ** 2)
lines = np.clip((mag - 16.0) / 34.0, 0, 1)
lines = np.asarray(
    Image.fromarray((lines * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
).astype(np.float32) / 255.0
lines = np.clip(lines, 0, 1) * A
ink = np.array([0.12, 0.10, 0.11], np.float32)
rgb = rgb * (1 - lines[..., None] * 0.45) + ink * (lines[..., None] * 0.45)

# ---------------- warm light, gentle vignette, no rim ----------------
lum = rgb @ np.array([0.2126, 0.7152, 0.0722], np.float32)
hi = np.clip((lum - 0.40) / 0.50, 0, 1)[..., None]
lo = np.clip((0.40 - lum) / 0.40, 0, 1)[..., None]
rgb = rgb * (1 + (np.array([1.00, 0.965, 0.90], np.float32) - 1) * hi * 0.75)
rgb = rgb * (1 + (np.array([0.92, 0.94, 1.00], np.float32) - 1) * lo * 0.35)

yy, xx = np.mgrid[0:Ht, 0:Wt]
r = np.sqrt(((xx - Wt * 0.5) / (Wt * 0.84)) ** 2 + ((yy - Ht * 0.42) / (Ht * 0.94)) ** 2)
rgb *= np.clip(1.04 - 0.22 * np.clip(r, 0, 1.6) ** 2, 0, 1)[..., None]

out = np.dstack([(np.clip(rgb, 0, 1) * 255).astype(np.uint8), (A * 255).astype(np.uint8)])
img = Image.fromarray(out, "RGBA")
img = ImageEnhance.Sharpness(img).enhance(1.15)
img.save(OUT, optimize=True)
print("wrote", OUT)
