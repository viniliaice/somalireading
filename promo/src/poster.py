from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, sys
sys.path.insert(0,'promo/src')
from render import scene_frame, SCENES
os.makedirs('promo/out',exist_ok=True)
BOLD='promo/assets/fonts/DejaVuSans-Bold.ttf'
# Preserve exact CTA screen composition; add thumbnail hierarchy to an export still.
im=scene_frame('cta',5,9,False).convert('RGBA')
# Use a clean frame from the CTA composition as the wide thumbnail.
im.convert('RGB').save('promo/out/thumbnail-16x9.jpg',quality=94,subsampling=0)
vert=scene_frame('cta',2,3,True).convert('RGB')
vert.save('promo/out/poster-9x16.jpg',quality=94,subsampling=0)
print('poster exports ready')
