#!/usr/bin/env python3
"""Render the fully editable, deterministic SomaliReading promo frames to ffmpeg."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import subprocess, os, math, sys
FFMPEG='/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v9.0.2'

ROOT='promo'
ASSET=ROOT+'/assets/site'
W,H=1920,1080
FPS=20
CREAM='#fdf6ea'; BLUE='#2743c9'; NAVY='#17203f'; GOLD='#f2a93b'; GREEN='#2f8f5b'; WHITE='#ffffff'; MUTED='#626b7c'
FONT='promo/assets/fonts/DejaVuSans.ttf'; BOLD='promo/assets/fonts/DejaVuSans-Bold.ttf'

def font(size,bold=False): return ImageFont.truetype(BOLD if bold else FONT,size)
def load(name): return Image.open(f'{ASSET}/{name}.png').convert('RGB')
def rounded(im, size, radius=24, crop=True):
    sw,sh=im.size; w,h=size
    scale=max(w/sw,h/sh) if crop else min(w/sw,h/sh)
    im=im.resize((max(1,int(sw*scale)),max(1,int(sh*scale))),Image.Resampling.LANCZOS)
    if crop:
        x=(im.width-w)//2; y=(im.height-h)//2; im=im.crop((x,y,x+w,y+h))
    else:
        bg=Image.new('RGB',size,WHITE); bg.paste(im,((w-im.width)//2,(h-im.height)//2)); im=bg
    mask=Image.new('L',size,0); ImageDraw.Draw(mask).rounded_rectangle((0,0,w-1,h-1),radius,fill=255)
    out=Image.new('RGB',size,WHITE);out.paste(im,(0,0),mask);return out

def fit_text(draw,text,box,max_size,bold=True,min_size=22):
    x,y,w,h=box
    for sz in range(max_size,min_size-1,-2):
        f=font(sz,bold)
        bb=draw.multiline_textbbox((0,0),text,font=f,spacing=int(sz*.25),stroke_width=0)
        if bb[2]<=w and bb[3]-bb[1]<=h:return f
    return font(min_size,bold)

def wrap(draw,text,f,maxw):
    words=text.split(); lines=[]; line=''
    for word in words:
        test=(line+' '+word).strip()
        if draw.textbbox((0,0),test,font=f)[2]<=maxw: line=test
        else:
            if line:lines.append(line)
            line=word
    if line: lines.append(line)
    return '\n'.join(lines)

def dot_pattern(im, alpha=22, spacing=22, radius=2, color=(39,67,201)):
    overlay=Image.new('RGBA',im.size,(0,0,0,0)); d=ImageDraw.Draw(overlay)
    for y in range(12,im.height,spacing):
        for x in range(12,im.width,spacing): d.ellipse((x-radius,y-radius,x+radius,y+radius),fill=(*color,alpha))
    im.alpha_composite(overlay)

def rounded_card(canvas, src, rect, crop=True, radius=30, shadow=True):
    x,y,w,h=rect
    if shadow:
        sh=Image.new('RGBA',(w+50,h+50),(0,0,0,0)); ImageDraw.Draw(sh).rounded_rectangle((20,20,w+20,h+20),radius,fill=(23,32,63,60))
        sh=sh.filter(ImageFilter.GaussianBlur(15)); canvas.alpha_composite(sh,(x-20,y-10))
    card=rounded(src.convert('RGB'),(w,h),radius,crop).convert('RGBA')
    canvas.alpha_composite(card,(x,y))
    ImageDraw.Draw(canvas).rounded_rectangle((x,y,x+w,y+h),radius,outline=(255,255,255,220),width=3)

def pill(draw, xy, label, fill, fg=WHITE, size=26):
    x,y=xy; f=font(size,True); box=draw.textbbox((0,0),label,font=f); w=box[2]+42;h=box[3]-box[1]+24
    draw.rounded_rectangle((x,y,x+w,y+h),h//2,fill=fill)
    draw.text((x+21,y+10),label,font=f,fill=fg)
    return w,h

# True screenshots from the running app, trimmed to remove sidebar review/placeholder notices.
assets={
 'hero':load('home-hero-desktop'), 'hero_mobile':load('home-hero-mobile'),
 'plans':load('home-pricing'), 'books':load('books-shelf').crop((480,0,2560,1980)),
 'books_home':load('home-books-section'), 'reader':load('reader-page'),
 'phonics':load('phonics').crop((480,0,2560,1550)), 'trace':load('trace').crop((480,0,2560,1540)),
 'lesson':load('lesson-use').crop((480,0,2560,1540)), 'culture':load('culture').crop((480,0,2560,1900)),
 'logo':load('logo-lockup')
}

# Scene order and durations live in a human-editable JSON timeline.
import json
with open('promo/timeline.json', encoding='utf-8') as f:
    TIMELINE=json.load(f)
SCENES=[(s['duration'],s['scene']) for s in TIMELINE['master']]
TOTAL=sum(s[0] for s in SCENES)
CUT=[(s['duration'],s['scene']) for s in TIMELINE['cutdown']]

def scene_frame(kind, local, dur, vertical=False):
    w,h=(1080,1920) if vertical else (1920,1080)
    im=Image.new('RGBA',(w,h),CREAM); dot_pattern(im,alpha=18,spacing=24 if not vertical else 27,radius=2)
    d=ImageDraw.Draw(im)
    p=min(1,max(0,local/dur)); ease=1-(1-p)**3
    # thin cinematic top line and scene locator
    d.rectangle((0,0,w,12),fill=BLUE)
    if kind=='open':
        if vertical:
            # large editorial first-frame typography
            d.text((72,155),'AF-SOOMAALI',font=font(30,True),fill=BLUE)
            letters=['A','AF','AF-SOOMAALI']; text=letters[min(2,int(local/1.55))]
            f=font(150 if len(text)<3 else 76,True); d.text((68,300),text,font=f,fill=NAVY)
            d.text((72,515),'Afkaaga hooyo waa hantidaada.',font=font(35,True),fill=BLUE)
            rounded_card(im,assets['hero_mobile'],(55,720,970,1080),False,36)
            d=ImageDraw.Draw(im)
            d.text((70,1840),'BARO  ·  AKHRI  ·  HADAL',font=font(27,True),fill=NAVY)
        else:
            words=['A','AF','AF-SOOMAALI']; text=words[min(2,int(local/1.55))]
            d.text((100,100),'AFKAAGA HOOYO WAA HANTIDAADA',font=font(28,True),fill=BLUE)
            d.text((92,195),text,font=font(110 if len(text)<3 else 78,True),fill=NAVY)
            d.text((100,330),'Baro. Ku hadal. Kuna faan.',font=font(36,True),fill=BLUE)
            rounded_card(im,assets['hero'],(920,100,875,800),True,34)
            d=ImageDraw.Draw(im);pill(d,(102,560),'AKHRIS FARXAD LEH',BLUE,size=23)
            d.text((104,663),'Afkaaga hooyo waa hantidaada.',font=font(30),fill=NAVY)
    elif kind=='brand':
        if vertical:
            rounded_card(im,assets['logo'],(90,150,900,175),False,18,False)
            d.text((80,430),'SOMALIREADING',font=font(67,True),fill=NAVY)
            d.multiline_text((80,555),'Baro Af-Soomaali.\nAkhri. Hadal. Faham.',font=font(55,True),fill=BLUE,spacing=18)
            rounded_card(im,assets['hero'],(50,910,980,780),True,34)
            d=ImageDraw.Draw(im);d.text((80,1760),'AF-SOOMAALI · AKHRIS · DHAQAN',font=font(27,True),fill=NAVY)
        else:
            rounded_card(im,assets['logo'],(100,80,600,110),False,15,False)
            d.text((100,250),'SOMALIREADING',font=font(54,True),fill=NAVY)
            d.multiline_text((100,355),'Baro Af-Soomaali.\nAkhri. Hadal. Faham.',font=font(48,True),fill=BLUE,spacing=15)
            rounded_card(im,assets['hero'],(870,145,920,760),True,34)
    elif kind=='skills':
        labs=['DHAGAYSI','HADAL','AKHRIS','QORIS']; imgs=['phonics','lesson','reader','trace']
        if vertical:
            d.text((65,100),'AF-SOOMAALI',font=font(28,True),fill=BLUE)
            d.text((65,170),'Afar xirfadood.',font=font(52,True),fill=NAVY)
            for i,(lab,key) in enumerate(zip(labs,imgs)):
                y=310+i*370
                col=[BLUE,GREEN,GOLD,'#e2703a'][i]
                d.rounded_rectangle((65,y,1015,y+335),32,fill=(255,255,255,240),outline=col,width=4)
                rounded_card(im,assets[key],(82,y+18,390,285),True,20,False)
                d=ImageDraw.Draw(im);d.text((505,y+125),lab,font=font(39,True),fill=col)
            d=ImageDraw.Draw(im);d.text((65,1845),'DHAGAYSO · KU HADAL · AKHRI · QOR',font=font(22,True),fill=NAVY)
        else:
            d.text((95,90),'HAL MADAL. AFAR XIRFADOOD.',font=font(26,True),fill=BLUE)
            d.text((95,155),'Dhagayso. Hadal. Akhri. Qor.',font=font(54,True),fill=NAVY)
            for i,(lab,key) in enumerate(zip(labs,imgs)):
                x=75+i*460; col=[BLUE,GREEN,GOLD,'#e2703a'][i]
                d.rounded_rectangle((x,315,x+420,850),30,fill=WHITE,outline=col,width=4)
                rounded_card(im,assets[key],(x+15,330,390,410),True,22,False)
                d=ImageDraw.Draw(im); bb=d.textbbox((0,0),lab,font=font(35,True)); d.text((x+(420-(bb[2]-bb[0]))//2,778),lab,font=font(35,True),fill=col)
    elif kind=='books':
        if vertical:
            d.text((65,125),'AKHRIS FARXAD LEH',font=font(28,True),fill=BLUE)
            d.text((65,200),'10 sheekood oo xiiso leh',font=font(47,True),fill=NAVY)
            rounded_card(im,assets['books'],(55,360,970,1050),True,35)
            d=ImageDraw.Draw(im);pill(d,(65,1480),'10 SHEEKOOD',BLUE,size=27)
            d.multiline_text((65,1600),'Akhris farxad leh.\nBarasho xiiso leh.',font=font(43,True),fill=NAVY,spacing=16)
        else:
            d.text((100,100),'SHEEKOOYIN SAWIRRAN OO AF-SOOMAALI AH',font=font(26,True),fill=BLUE)
            d.text((100,170),'10 sheekood oo xiiso leh',font=font(54,True),fill=NAVY)
            rounded_card(im,assets['books'],(850,100,970,800),True,34)
            rounded_card(im,assets['reader'],(1280,455,430,350),True,25)
            d=ImageDraw.Draw(im);pill(d,(102,430),'AKHRIS FARXAD LEH',GOLD,fg=NAVY,size=25)
            d.text((102,525),'Akhris farxad leh. Barasho xiiso leh.',font=font(29),fill=NAVY)
    elif kind=='culture':
        if vertical:
            d.text((65,130),'AFKEENNA.',font=font(44,True),fill=BLUE)
            d.text((65,210),'DHAQANKEENNA.',font=font(44,True),fill=NAVY)
            d.text((65,290),'SUUGAANTEENNA.',font=font(44,True),fill=GREEN)
            rounded_card(im,assets['culture'],(50,420,980,970),True,36)
            d=ImageDraw.Draw(im);d.text((70,1450),'Baro Af-Soomaali,',font=font(38,True),fill=NAVY)
            d.text((70,1510),'dhaqan iyo suugaan.',font=font(38,True),fill=GREEN)
            d.text((70,1790),'ABWAAN HADRAAWI · 1943–2022',font=font(24,True),fill=BLUE)
        else:
            d.text((95,140),'AFKEENNA.',font=font(66,True),fill=BLUE)
            d.text((95,235),'DHAQANKEENNA.',font=font(66,True),fill=NAVY)
            d.text((95,330),'SUUGAANTEENNA.',font=font(66,True),fill=GREEN)
            d.text((100,480),'Baro afkeenna,',font=font(31),fill=NAVY)
            d.text((100,530),'ilaali dhaqankeenna.',font=font(31),fill=NAVY)
            rounded_card(im,assets['culture'],(890,100,900,805),True,34)
            d=ImageDraw.Draw(im);d.text((101,700),'ABWAAN HADRAAWI',font=font(23,True),fill=BLUE)
    elif kind=='price':
        # Price cards are original graphic treatment using only the actual published amounts.
        if vertical:
            d.text((65,115),'DOORO HELITAANKAAGA',font=font(26,True),fill=BLUE)
            d.text((65,185),'Qiime cad. Barasho Somali.',font=font(43,True),fill=NAVY)
            d.rounded_rectangle((55,340,1025,850),35,fill=WHITE,outline='#d9d9dd',width=3)
            d.text((100,405),'WEBSITE ACCESS',font=font(34,True),fill=NAVY)
            d.text((100,500),'$5.99',font=font(90,True),fill=NAVY)
            d.text((100,630),'Website Access',font=font(30),fill=MUTED)
            d.rounded_rectangle((55,920,1025,1515),35,fill=BLUE,outline=BLUE,width=4)
            d.text((100,990),'WEBSITE ACCESS + LESSONS',font=font(31,True),fill=WHITE)
            d.text((100,1090),'$25',font=font(112,True),fill=WHITE)
            d.text((100,1250),'Website Access + Lessons',font=font(31,True),fill=WHITE)
            d.rounded_rectangle((95,1370,985,1465),26,fill=GOLD)
            d.text((143,1390),'BARASHO AF-SOOMAALI',font=font(26,True),fill=NAVY)
        else:
            d.text((100,90),'DOORO HELITAANKAAGA',font=font(25,True),fill=BLUE)
            d.text((100,150),'Qiime cad. Barasho Somali.',font=font(46,True),fill=NAVY)
            # modest offer vs dominant $25 card, no invented billing cadence
            d.rounded_rectangle((100,270,840,850),36,fill=WHITE,outline='#d4d9e2',width=4)
            d.text((155,335),'WEBSITE ACCESS',font=font(30,True),fill=BLUE)
            d.text((150,420),'$5.99',font=font(104,True),fill=NAVY)
            d.text((155,560),'Website Access',font=font(34),fill=MUTED)
            d.rounded_rectangle((905,230,1815,865),40,fill=BLUE,outline=BLUE,width=4)
            d.text((975,315),'WEBSITE ACCESS + LESSONS',font=font(30,True),fill=WHITE)
            d.text((970,415),'$25',font=font(138,True),fill=WHITE)
            d.text((978,610),'Website Access + Lessons',font=font(34,True),fill=WHITE)
            d.rounded_rectangle((970,720,1750,815),28,fill=GOLD)
            d.text((1045,740),'BARO AF-SOOMAALI',font=font(29,True),fill=NAVY)
    elif kind=='cta':
        if vertical:
            rounded_card(im,assets['logo'],(90,175,900,170),False,20,False)
            d.text((65,520),'BARO',font=font(91,True),fill=NAVY)
            d.text((65,630),'AF-SOOMAALI',font=font(67,True),fill=BLUE)
            d.text((68,780),'Safarkaaga maanta bilow!',font=font(36,True),fill=NAVY)
            d.rounded_rectangle((65,930,1015,1070),28,fill=BLUE)
            d.text((92,970),'https://somalireading.vercel.app/',font=font(30,True),fill=WHITE)
            rounded_card(im,assets['hero'],(60,1190,960,500),True,34)
            d=ImageDraw.Draw(im)
        else:
            rounded_card(im,assets['logo'],(100,90,620,110),False,15,False)
            d.text((100,295),'BARO AF-SOOMAALI',font=font(74,True),fill=NAVY)
            d.text((105,420),'Safarkaaga maanta bilow!',font=font(39,True),fill=BLUE)
            d.rounded_rectangle((100,545,1090,660),26,fill=BLUE)
            d.text((145,578),'https://somalireading.vercel.app/',font=font(34,True),fill=WHITE)
            rounded_card(im,assets['hero'],(1160,125,670,700),True,34)
            d=ImageDraw.Draw(im);d.text((100,820),'AKHRI  ·  HADAL  ·  FAHAM',font=font(27,True),fill=NAVY)
    # soft micro-motion: a small corner accent grows across each scene
    d=ImageDraw.Draw(im)
    x=int((w-34)*min(1,local/max(.3,dur)))
    d.ellipse((x,24,x+9,33),fill=GOLD)
    return im.convert('RGB')

def render(seq, path, vertical=False):
    w,h=(1080,1920) if vertical else (1920,1080)
    total=sum(x[0] for x in seq); nframes=round(total*FPS)
    ff=[FFMPEG,'-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','ultrafast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',path]
    proc=subprocess.Popen(ff,stdin=subprocess.PIPE)
    durations=[x[0] for x in seq]; starts=np.cumsum([0]+durations[:-1]).tolist()
    for fi in range(nframes):
        t=fi/FPS; si=max(i for i,s in enumerate(starts) if s<=t)
        dur,kind=seq[si]; local=t-starts[si]
        frame=scene_frame(kind,local,dur,vertical)
        # 0.22 s cream-to-cream scene crossfade, avoiding abrupt cuts
        if si>0 and local<.22:
            prevdur,prevkind=seq[si-1]
            prev=scene_frame(prevkind,prevdur-.01,prevdur,vertical)
            frame=Image.blend(prev,frame,min(1,local/.22))
        proc.stdin.write(frame.tobytes())
    proc.stdin.close(); code=proc.wait()
    if code: raise RuntimeError('ffmpeg failed: '+path)
    print('rendered',path,total,'s',nframes,'frames',flush=True)

if __name__=='__main__':
    os.makedirs(ROOT+'/out',exist_ok=True)
    render(SCENES,ROOT+'/out/somalireading-16x9-video.mp4',False)
    render(SCENES,ROOT+'/out/somalireading-9x16-video.mp4',True)
    render(CUT,ROOT+'/out/somalireading-15s-video.mp4',True)
