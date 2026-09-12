"""Cartoon portrait.

Flattens the photograph into paint regions and lays down ink lines, while blending the
original back wherever local contrast is high so the eyes, mouth and hair survive.

Two things this deliberately does NOT do, both tried and reverted:
  * Cel-banding the luminance. The studio key light is strong on one side of the face,
    and banding turns it into a hard-edged pale patch on the nose and cheek.
  * Flattening the broad lighting toward a local mean. It removes the blotch but also
    removes all the form, leaving a washed-out face.

    python scripts/portrait.py
"""
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

SRC = r"C:\Users\Venkat\Downloads\WhatsApp Image 2026-09-12 at 4.19.32 PM.jpeg"
OUT = r"C:\VSC- AI\Venkat\web\public\img\portrait-cartoon.png"
Wt, Ht = 1100, 1375

# ------------------------------------------------------------------ load and crop
im = Image.open(SRC).convert("RGB")
W0, H0 = im.size
w, h = W0, int(W0 / (Wt / Ht))
if h > H0:
    h = H0
    w = int(H0 * (Wt / Ht))
left = (W0 - w) // 2
top = max(0, int(H0 * 0.01))
if top + h > H0:
    top = H0 - h
im = im.crop((left, top, left + w, top + h)).resize((Wt, Ht), Image.LANCZOS)
gray = im.convert("L")

# ------------------------------------------------- matte: cut off the flat backdrop
#
# Brightness alone cannot do this. Lit skin on the ear reaches 0.81 while the backdrop
# only spans 0.62-0.71, so any brightness threshold eats part of the ear. Local texture
# separates them cleanly instead: the backdrop's standard deviation is 0.000 and skin's
# is 0.03-0.05. Brightness is kept only to exclude the dark shirt, which is also flat.
_g = np.asarray(gray).astype(np.float32) / 255.0
_mean = np.asarray(gray.filter(ImageFilter.BoxBlur(6))).astype(np.float32) / 255.0
_sq = np.asarray(
    Image.fromarray(np.clip(_g ** 2 * 255, 0, 255).astype(np.uint8)).filter(ImageFilter.BoxBlur(6))
).astype(np.float32) / 255.0
_std = np.sqrt(np.maximum(_sq - _mean ** 2, 0))
# Smooth the texture map, or JPEG noise spikes leave holes in the backdrop that the
# later closing inflates into opaque blocks.
_std = np.asarray(
    Image.fromarray(np.clip(_std * 2000, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(4))
).astype(np.float32) / 2000.0
cand_full = (_mean > 0.55) & (_std < 0.020)
cand_full = np.asarray(
    Image.fromarray((cand_full * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(9))
) > 127

# flood from the frame edge at half resolution, so only backdrop connected to the
# border is removed and any enclosed bright patch stays foreground
Sw, Sh = Wt // 2, Ht // 2
cand = np.asarray(
    Image.fromarray((cand_full * 255).astype(np.uint8)).resize((Sw, Sh), Image.BILINEAR)
) > 127
seed = np.zeros_like(cand)
seed[0, :] = cand[0, :]
seed[-1, :] = cand[-1, :]
seed[:, 0] = cand[:, 0]
seed[:, -1] = cand[:, -1]
cur = Image.fromarray((seed * 255).astype(np.uint8))
for _ in range(900):
    grown = (np.asarray(cur.filter(ImageFilter.MaxFilter(3))) > 127) & cand
    if grown.sum() == (np.asarray(cur) > 127).sum():
        break
    cur = Image.fromarray((grown * 255).astype(np.uint8))

fg = Image.fromarray(((~(np.asarray(cur) > 127)) * 255).astype(np.uint8))
fg = fg.resize((Wt, Ht), Image.BILINEAR).point(lambda v: 255 if v > 128 else 0)

# morphological closing repairs thin incursions, such as a bite taken out of an ear
for _ in range(2):
    fg = fg.filter(ImageFilter.MaxFilter(7))
for _ in range(2):
    fg = fg.filter(ImageFilter.MinFilter(7))

# Erode further than feels necessary. The closing above fills concavities along the
# hairline by pulling in backdrop pixels, and those show as a pale rim.
alpha = fg.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MinFilter(5))
alpha = alpha.filter(ImageFilter.GaussianBlur(1.2))
A = np.clip((np.asarray(alpha).astype(np.float32) / 255.0 - 0.45) / 0.25, 0, 1)

# ------------------------------------------------------- edge decontamination
# Pixels just inside the silhouette still carry some pale backdrop, which shows as a
# white outline. Replace the boundary band with an alpha-weighted average, so its
# colour is drawn from inside the subject rather than from the backdrop behind it.
_src = np.asarray(im).astype(np.float32) / 255.0
_num = np.asarray(
    Image.fromarray(np.clip(_src * A[..., None] * 255, 0, 255).astype(np.uint8))
    .filter(ImageFilter.GaussianBlur(11))
).astype(np.float32) / 255.0
_den = np.asarray(
    Image.fromarray(np.clip(A * 255, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(11))
).astype(np.float32) / 255.0
_inner = _num / np.maximum(_den, 0.02)[..., None]
_band = np.clip((0.998 - A) / 0.75, 0, 1)[..., None]        # 0 deep inside, 1 at the rim
im = Image.fromarray(
    (np.clip(_src * (1 - _band) + _inner * _band, 0, 1) * 255).astype(np.uint8)
)
gray = im.convert("L")

# ------------------------------------------------------------ graded photograph
base = ImageEnhance.Color(im).enhance(1.30)
B = np.asarray(base).astype(np.float32) / 255.0
B = np.power(np.clip(B, 0, 1), 0.88)
B = np.clip(0.5 + (B - 0.5) * 1.12, 0, 1)

# ------------------------------------------------------------------ paint layer
soft = base.filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.MedianFilter(5))
soft = soft.filter(ImageFilter.GaussianBlur(2.4))

# Squash the blown highlight on the nose and cheek before quantising. Left alone the
# quantiser spends a whole colour bin on it and the face gets a pale patch. This
# touches the paint layer only, so catchlights in the eyes survive via the photo blend.
_s = np.asarray(soft).astype(np.float32) / 255.0
_L = _s @ np.array([0.2126, 0.7152, 0.0722], np.float32)
_cap = np.where(_L > 0.58, 0.58 + (_L - 0.58) * 0.30, _L)
_s = np.clip(_s * (_cap / np.maximum(_L, 1e-3))[..., None], 0, 1)
soft = Image.fromarray((_s * 255).astype(np.uint8))

flat = soft.quantize(colors=16, method=Image.MEDIANCUT, dither=Image.NONE).convert("RGB")
flat = flat.filter(ImageFilter.GaussianBlur(1.5))
F = np.asarray(flat).astype(np.float32) / 255.0

# ------------------- detail mask: hand the photograph back where it matters
g = np.asarray(gray).astype(np.float32) / 255.0
gb = np.asarray(gray.filter(ImageFilter.GaussianBlur(5))).astype(np.float32) / 255.0
D = np.clip((np.abs(g - gb) - 0.016) / 0.078, 0, 1)
D = np.asarray(
    Image.fromarray((D * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.5))
).astype(np.float32) / 255.0
D = np.clip(D * 1.6, 0, 1)[..., None] * 0.70                # 0.70 keeps it cartoon

rgb = F * (1 - D) + B * D

# ------------------------------------------------------------------- ink lines
lg = np.asarray(flat.convert("L").filter(ImageFilter.GaussianBlur(1.5))).astype(np.float32)
gx = np.zeros_like(lg)
gy = np.zeros_like(lg)
gx[:, 1:-1] = lg[:, 2:] - lg[:, :-2]
gy[1:-1, :] = lg[2:, :] - lg[:-2, :]
mag = np.sqrt(gx ** 2 + gy ** 2)
lines = np.clip((mag - 11.0) / 26.0, 0, 1)
lines = np.asarray(
    Image.fromarray((lines * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
).astype(np.float32) / 255.0
lines = np.clip(lines, 0, 1) * A
ink = np.array([0.11, 0.09, 0.10], np.float32)
rgb = rgb * (1 - lines[..., None] * 0.66) + ink * (lines[..., None] * 0.66)

# ------------------------------------------------- warm light, gentle vignette
lum = rgb @ np.array([0.2126, 0.7152, 0.0722], np.float32)
hi = np.clip((lum - 0.40) / 0.50, 0, 1)[..., None]
lo = np.clip((0.40 - lum) / 0.40, 0, 1)[..., None]
rgb = rgb * (1 + (np.array([1.00, 0.965, 0.90], np.float32) - 1) * hi * 0.75)
rgb = rgb * (1 + (np.array([0.92, 0.94, 1.00], np.float32) - 1) * lo * 0.35)

yy, xx = np.mgrid[0:Ht, 0:Wt]
r = np.sqrt(((xx - Wt * 0.5) / (Wt * 0.84)) ** 2 + ((yy - Ht * 0.42) / (Ht * 0.94)) ** 2)
rgb *= np.clip(1.04 - 0.22 * np.clip(r, 0, 1.6) ** 2, 0, 1)[..., None]

out = np.dstack([(np.clip(rgb, 0, 1) * 255).astype(np.uint8), (A * 255).astype(np.uint8)])
Image.fromarray(out, "RGBA").save(OUT, optimize=True)
print("wrote", OUT)
