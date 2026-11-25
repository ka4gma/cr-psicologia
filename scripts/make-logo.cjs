const sharp=require('C:/Projetos/fisio-jessica-redesign/node_modules/sharp');
(async()=>{
const src='assets/orig/b44080_7a7222df26f74bc09fce71cebb17f960_mv2.png';
const {data,info}=await sharp(src).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const W=info.width,H=info.height;
const bg=[147];console.log('bg',bg,W,H);
const bgL=Math.min(...bg);
const a=new Uint8Array(W*H);
for(let i=0;i<W*H;i++){const m=Math.min(data[i*4],data[i*4+1],data[i*4+2]);a[i]=data[i*4+3]===0?0:Math.max(0,Math.min(255,Math.round((m-147)/(255-147)*255)))}
// row occupancy
const rows=[];for(let y=0;y<H;y++){let s=0;for(let x=0;x<W;x++)if(a[y*W+x]>40)s++;rows.push(s)}
const blocks=[];let st=-1;for(let y=0;y<H;y++){if(rows[y]>0&&st<0)st=y;if((rows[y]===0||y===H-1)&&st>=0){blocks.push([st,y]);st=-1}}
console.log('blocks',blocks);
const mk=(rgb)=>{const b=Buffer.alloc(W*H*4);for(let i=0;i<W*H;i++){b[i*4]=rgb[0];b[i*4+1]=rgb[1];b[i*4+2]=rgb[2];b[i*4+3]=a[i]}return sharp(b,{raw:{width:W,height:H,channels:4}})};
const cropBox=(y0,y1)=>{let x0=W,x1=0;for(let y=y0;y<=y1;y++)for(let x=0;x<W;x++)if(a[y*W+x]>40){x0=Math.min(x0,x);x1=Math.max(x1,x)}return {left:Math.max(0,x0-6),top:Math.max(0,y0-6),width:Math.min(W,x1+6)-Math.max(0,x0-6),height:y1-y0+12}};
// full logo bounds
const full=cropBox(blocks[0][0],blocks[blocks.length-1][1]);
// butterfly = first big block (merge blocks until a gap > 20px)
let end=blocks[0][1];let i=1;while(i<blocks.length&&blocks[i][0]-end<20){end=blocks[i][1];i++}
const mark=cropBox(blocks[0][0],end);
console.log({full,mark});
for(const [name,rgb] of [['white',[255,255,255]],['green',[53,74,61]]]){
 await mk(rgb).extract(full).png().toFile(`assets/logo-full-${name}.png`);
 await mk(rgb).extract(mark).png().toFile(`assets/logo-mark-${name}.png`);
}
})();
