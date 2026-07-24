"""Straighten the raw scans in foto_nonno/ and export web-ready JPEGs to assets/img/.

Each scan comes out of the scanner rotated; the plan below maps every file
(in sorted order) to its semantic name and the transpose that fixes it.
Run from the repo root: python scripts/prepare_photos.py
"""
from PIL import Image
import os, glob

src = 'foto_nonno'; dst = 'assets/img'; os.makedirs(dst, exist_ok=True)
files = sorted(glob.glob(src + '/*.png'))   # ordine: (2),(3),(4),(5),(6),(7),(8),(9), poi senza numero
T = Image.Transpose
plan = [
    ('giovinezza-esterno-1',  T.ROTATE_180),  # (2)
    ('giovinezza-esterno-2',  T.ROTATE_180),  # (3)
    ('giovinezza-ritratto-1', T.ROTATE_180),  # (4)
    ('giovinezza-ritratto-2', T.ROTATE_180),  # (5)
    ('fiera-milano',          T.ROTATE_180),  # (6)
    ('comunione-liberazione', T.ROTATE_90),   # (7)
    ('matrimonio',            T.ROTATE_90),   # (8)
    ('avvocato-scrivania',    T.ROTATE_270),  # (9)
    ('vita-pubblica',         T.ROTATE_90),   # senza numero
]
if len(files) != len(plan):
    raise SystemExit(f'expected {len(plan)} scans, found {len(files)}: {files}')
for f, (name, op) in zip(files, plan):
    im = Image.open(f).convert('RGB').transpose(op)
    im.thumbnail((1200, 1200))
    im.save(f'{dst}/{name}.jpg', quality=82, optimize=True)
    print(f'{name}.jpg {im.width}x{im.height}')
print('fatto')
