#!/usr/bin/env python3
"""Mux the editable render with scratch English VO and the original music bed."""
import subprocess, os
FFMPEG='/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v9.0.2'
VO='promo/audio/vo-temp'

def mux(video,out,dur,cut=False):
    if cut:
        clips=[VO+'/en-cutdown.mp3']
        args=[FFMPEG,'-y','-loglevel','error','-i',video,'-i',clips[0],'-i','promo/audio/music-bed.wav']
        fc='[1:a]atempo=1.03,volume=0.92,aformat=channel_layouts=stereo[v];[2:a]volume=0.19,aformat=channel_layouts=stereo[m];[v][m]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.95,aformat=channel_layouts=stereo[a]'
    else:
        files=[VO+f'/en-{i:02d}.mp3' for i in [1,2,3,4,5,6]]
        args=[FFMPEG,'-y','-loglevel','error','-i',video]
        for x in files: args+=['-i',x]
        args+=['-i','promo/audio/music-bed.wav']
        starts=[0.20,6.00,12.30,23.25,32.20,51.50]
        chain=[]
        for i,t in enumerate(starts):
            ms=int(t*1000); chain.append(f'[{i+1}:a]adelay={ms}|{ms},volume=0.96,aformat=channel_layouts=stereo[v{i}]')
        music_i=7
        chain.append(f'[{music_i}:a]volume=0.18,aformat=channel_layouts=stereo[m]')
        chain.append('[v0][v1][v2][v3][v4][v5][m]amix=inputs=7:duration=longest:normalize=0,alimiter=limit=0.95,aformat=channel_layouts=stereo[a]')
        fc=';'.join(chain)
    args += ['-filter_complex',fc,'-map','0:v:0','-map','[a]','-t',str(dur),'-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart',out]
    subprocess.run(args,check=True)
    print('muxed',out,flush=True)

mux('promo/out/somalireading-16x9-video.mp4','promo/out/somalireading-16x9.mp4',60)
mux('promo/out/somalireading-9x16-video.mp4','promo/out/somalireading-9x16.mp4',60)
mux('promo/out/somalireading-15s-video.mp4','promo/out/somalireading-15s.mp4',15,True)
# A standalone, complete temporary English scratch narration aligned to the 60-second master.
args=[FFMPEG,'-y','-loglevel','error']
files=[VO+f'/en-{i:02d}.mp3' for i in [1,2,3,4,5,6]]
starts=[0.20,6.00,12.30,23.25,32.20,51.50]
filters=[]
for i,f in enumerate(files): args += ['-i',f];ms=int(starts[i]*1000);filters.append(f'[{i}:a]adelay={ms}|{ms},aformat=channel_layouts=stereo[v{i}]')
filters.append('[v0][v1][v2][v3][v4][v5]amix=inputs=6:duration=longest:normalize=0,aformat=channel_layouts=stereo[a]')
args += ['-filter_complex',';'.join(filters),'-map','[a]','-t','60','-c:a','libmp3lame','-b:a','160k','promo/audio/temporary-english-voiceover.mp3']
subprocess.run(args,check=True)
print('standalone voiceover ready')
