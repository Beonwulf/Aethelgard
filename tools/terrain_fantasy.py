"""
terrain_fantasy.py – reines Python (kein Blender noetig)
Schritt 2a der Terrain-Pipeline:
  Mallorca_Master.npy → Fantasy-Sculpting → Aethelgard_Blender_16bit.raw + _norm.npy

Aufruf: python tools/terrain_fantasy.py
Danach: blender --background --python tools/terrain_png_export.py
"""

import numpy as np
import os
import json
from scipy.ndimage import zoom, gaussian_filter, distance_transform_edt

BASE_DIR    = r"d:\NPM\OpenWorld\Aethelgard"
INPUT_NPY   = os.path.join(BASE_DIR, "tools", "source", "Mallorca_Master.npy")
OUTPUT_RAW  = os.path.join(BASE_DIR, "tools", "source", "Aethelgard_Blender_16bit.raw")
OUTPUT_NORM = os.path.join(BASE_DIR, "tools", "source", "Aethelgard_norm.npy")
OUTPUT_META = os.path.join(BASE_DIR, "client", "assets", "world", "heightmaps", "blender", "metadata.json")
OUTPUT_SIZE = 26624

MOUNTAIN_SCALE  = 1.35
CRATER_RADIUS   = 0.12
CRATER_CX       = 0.72
CRATER_CZ       = 0.75
COAST_CLIFF_BOOST = 1.5
NOISE_STRENGTH  = 0.04
BLUR_PASSES     = 3
SHELF_DEPTH     = -40.0
SLOPE_DEPTH     = -180.0
TRENCH_DEPTH    = -291.0
TRENCH_DIST     = 0.18

print("=" * 60)
print("Aethelgard Terrain Fantasy Generator")
print(f"Mountain Scale: {MOUNTAIN_SCALE}x  |  Normalisierung: dynamisch")
print("=" * 60)

print(f"\n[1/6] Lade: {INPUT_NPY}")
raw = np.load(INPUT_NPY)
print(f"      Shape: {raw.shape}, Max: {raw.max():.1f}m")

print(f"\n[2/6] Resample auf {OUTPUT_SIZE}x{OUTPUT_SIZE}px...")
sy = OUTPUT_SIZE / raw.shape[0]
sx = OUTPUT_SIZE / raw.shape[1]
# order=1 (bilinear): kein Gibbs-Ringing an scharfen Küstenkanten
data = zoom(raw, (sy, sx), order=1, prefilter=False)
del raw
# Leichte Nachglättung nach Upsampling, nur positive Werte (vor Unterwasser-Step)
data = gaussian_filter(data, sigma=2.5)
np.clip(data, 0, None, out=data)   # Kein negativer Überschwinger
print(f"      Max nach Resample: {data.max():.1f}m")

print("\n[3/6] Fantasy-Modifikationen (Land)...")
H, W = data.shape
max_h = data.max()
yy = np.linspace(0, 1, H, dtype=np.float32)
xx = np.linspace(0, 1, W, dtype=np.float32)
gx, gy = np.meshgrid(xx, yy)
land_mask = (data > 0.5).astype(np.float32)

# Tramuntana Norden
mountain_mask = np.clip((0.35 - gy) / 0.25, 0, 1)
data *= (1.0 + (MOUNTAIN_SCALE - 1.0) * mountain_mask)
np.clip(data, 0, None, out=data)

# Glaeserene Oede Krater
dist_c = np.sqrt((gx - CRATER_CX)**2 + (gy - CRATER_CZ)**2)
cm = np.clip(1.0 - dist_c / CRATER_RADIUS, 0, 1) ** 2
data = data * (1 - cm) + max_h * 0.02 * cm
rim = np.clip(1.0 - np.abs(dist_c - CRATER_RADIUS) / (CRATER_RADIUS * 0.3), 0, 1)
data += rim * max_h * 0.08

# Kuestenklippen
coast_m = np.clip(1 - data / (max_h * 0.08), 0, 1) * (data > 1).astype(np.float32)
data *= (1.0 + (COAST_CLIFF_BOOST - 1.0) * coast_m)
np.clip(data, 0, None, out=data)

# Organischer Noise
if NOISE_STRENGTH > 0:
    rng = np.random.default_rng(42)
    noise = rng.standard_normal((H, W)).astype(np.float32)
    noise = gaussian_filter(noise, sigma=W / (NOISE_SCALE := 8.0 * 50))
    noise = (noise - noise.min()) / (noise.max() - noise.min()) - 0.5
    data += noise * data * NOISE_STRENGTH * land_mask

print("\n[4/6] Prozedurales Unterwasser...")
dist_to_land = distance_transform_edt(land_mask == 0).astype(np.float32)
dist_norm = dist_to_land / dist_to_land.max()
shelf_zone  = np.clip(dist_to_land / (0.04 * W), 0, 1)
trench_zone = np.clip((dist_norm - TRENCH_DIST) / (0.5 - TRENCH_DIST), 0, 1)
slope_zone  = np.clip(shelf_zone - trench_zone, 0, 1)
uw = SHELF_DEPTH * (1 - shelf_zone) + SLOPE_DEPTH * slope_zone + TRENCH_DEPTH * trench_zone
rng2 = np.random.default_rng(123)
uw_n = rng2.standard_normal((H, W)).astype(np.float32)
uw_n = gaussian_filter(uw_n, sigma=12.0)
uw_n = (uw_n - uw_n.min()) / (uw_n.max() - uw_n.min()) - 0.5
uw += uw_n * 25.0
np.clip(uw, TRENCH_DEPTH, 0, out=uw)
data[land_mask == 0] = uw[land_mask == 0]
print(f"      Unterwasser: {data[land_mask==0].min():.1f}m bis {data[land_mask==0].max():.1f}m")

print(f"\n[5/6] Blur + Normalisierung...")
for _ in range(BLUR_PASSES):
    blurred = gaussian_filter(data, sigma=2.0)
    data = np.where(land_mask > 0, blurred, data)

# Dynamische Normalisierung: gesamten Höhenbereich nutzen, kein Clipping
lo = float(data.min())   # tiefste Unterwasserstelle (negativ)
hi = float(data.max())   # höchster Berggipfel
sea_level_norm = float(-lo / (hi - lo))  # 0m → dieser Anteil
total_range    = float(hi - lo)

data_norm = np.clip((data - lo) / (hi - lo), 0.0, 1.0).astype(np.float32)
data_u16  = (data_norm * 65535).astype(np.uint16)

sl16 = int(sea_level_norm * 65535)
print(f"      Höhenbereich:  {lo:.1f}m  ..  {hi:.1f}m  (Gesamt: {total_range:.1f}m)")
print(f"      Meeresspiegel: {sea_level_norm*100:.2f}% = uint16 {sl16}")
print(f"      Land-Pixel: {(data_u16 > sl16).sum():,}   Wasser-Pixel: {(data_u16 < sl16).sum():,}")

data_u16.tofile(OUTPUT_RAW)
np.save(OUTPUT_NORM, data_norm)

# metadata.json mit korrekten dynamisch berechneten Werten überschreiben
meta = {
    "worldName": "Aethelgard",
    "totalSize": OUTPUT_SIZE,
    "tileSize": 512,
    "chunksX": 52,
    "chunksY": 52,
    "overlap": True,
    "heightScale": round(total_range, 2),
    "seaLevel": round(sea_level_norm, 6)
}
with open(OUTPUT_META, 'w') as f:
    json.dump(meta, f, indent=2)

print(f"\n[6/6] Gespeichert:")
print(f"  RAW : {OUTPUT_RAW}  ({os.path.getsize(OUTPUT_RAW)/1024/1024:.0f} MB)")
print(f"  NORM: {OUTPUT_NORM}  ({os.path.getsize(OUTPUT_NORM)/1024/1024:.0f} MB)")
print(f"  META: {OUTPUT_META}")
print(f"\nWorldManager.js wird beim Init automatisch heightScale={total_range:.2f} + seaLevel={sea_level_norm:.4f} aus metadata.json laden.")
print(f"\nWeiter mit: node tools/tiling.js")
