import {useEffect,useRef} from 'react';
import * as THREE from 'three';
import {byG} from './curriculum';
import {worldScenes} from './world';
const emojiPath=(s:string)=>`/emoji/${Array.from(s).filter(c=>c.codePointAt(0)!==0xfe0f).map(c=>c.codePointAt(0)!.toString(16)).join('-')}.svg`;
export default function StoryScene({sceneId='home',onDiscover}:{sceneId?:string;onDiscover:(grapheme:string)=>void}){
 const ref=useRef<HTMLDivElement>(null);const callback=useRef(onDiscover);callback.current=onDiscover;
 useEffect(()=>{
  const host=ref.current;if(!host)return;
  let renderer:THREE.WebGLRenderer;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(host.clientWidth,host.clientHeight);host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();const camera=new THREE.OrthographicCamera(-4,4,2.3,-2.3,.1,100);camera.position.set(0,0,10);scene.add(new THREE.HemisphereLight(0xffffff,0xe9c995,2.4));
  const current=worldScenes.find(x=>x.id===sceneId)||worldScenes[0];const targets:THREE.Object3D[]=[];const textures:THREE.Texture[]=[];
  current.objects.forEach((g,i)=>{
   let item:THREE.Object3D;
   if(g==='n'){
    const lamp=new THREE.Group();const gold=new THREE.MeshStandardMaterial({color:0xf5c45c,roughness:.5});const cream=new THREE.MeshStandardMaterial({color:0xffe7a1,emissive:0xf6bf4c,emissiveIntensity:.35});
    const bulb=new THREE.Mesh(new THREE.SphereGeometry(.7,24,16),cream);bulb.position.y=.25;lamp.add(bulb);
    const neck=new THREE.Mesh(new THREE.CylinderGeometry(.27,.3,.32,20),gold);neck.position.y=-.5;lamp.add(neck);
    const base=new THREE.Mesh(new THREE.CylinderGeometry(.29,.25,.23,20),new THREE.MeshStandardMaterial({color:0x8c795d}));base.position.y=-.75;lamp.add(base);item=lamp;
   }else{const texture=new THREE.TextureLoader().load(emojiPath(byG(g).emoji));texture.colorSpace=THREE.SRGBColorSpace;textures.push(texture);item=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true}));item.scale.set(1.2,1.2,1);}
   item.userData={grapheme:g,index:i};scene.add(item);targets.push(item);
  });
  const resize=()=>{if(!host.clientWidth||!host.clientHeight)return;const aspect=host.clientWidth/host.clientHeight;camera.left=-2.3*aspect;camera.right=2.3*aspect;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight);const width=Math.min(2.2,Math.max(.75,aspect*1.1));targets.forEach((item,i)=>{const positions=[[0,0],[-width,.9],[width,.9],[width,-.9]];item.position.set(positions[i][0],positions[i][1],0);item.userData.baseY=positions[i][1]})};resize();
  const ray=new THREE.Raycaster(),mouse=new THREE.Vector2();const click=(e:PointerEvent)=>{const r=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(mouse,camera);const hit=ray.intersectObjects(targets,true)[0];if(hit){let item:THREE.Object3D|null=hit.object;while(item&&!item.userData.grapheme)item=item.parent;if(item){item.userData.selectedAt=Date.now();callback.current(item.userData.grapheme as string)}}};renderer.domElement.addEventListener('pointerdown',click);
  let frame=0;const animate=()=>{frame=requestAnimationFrame(animate);if(document.hidden)return;const now=Date.now();targets.forEach((item,i)=>{item.position.y=item.userData.baseY+Math.sin(now/850+i)*.08;item.rotation.z=Math.sin(now/1000+i)*.05;const pop=now-(item.userData.selectedAt||0)<500?1.2:1;if(item instanceof THREE.Sprite)item.scale.set(1.2*pop,1.2*pop,1);else item.scale.setScalar(pop)});renderer.render(scene,camera)};animate();window.addEventListener('resize',resize);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);renderer.domElement.removeEventListener('pointerdown',click);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose())}else if(o instanceof THREE.Sprite)o.material.dispose()});textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove()};
 },[sceneId]);
 return <div className="scene" ref={ref} aria-hidden="true"/>;
}
