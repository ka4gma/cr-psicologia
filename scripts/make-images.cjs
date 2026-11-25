const sharp=require('C:/Projetos/fisio-jessica-redesign/node_modules/sharp');
const P='assets/orig/b44080_';
const jobs=[
 ['carolina-retrato',P+'0d4c9a6e29c54e77b58f7150837dc88a.jpg',null,{jpeg:92}],
 ['consultorio-poltronas',P+'3ebf5190ee3948fe8118b2734f006296_mv2.jpeg',720],
 ['consultorio-sala-reuniao',P+'cc4f1603896f429cad410304f35951b4_mv2.jpeg',720],
 ['consultorio-apoio',P+'d357079ae57b474aa80855e2e92c4ff8_mv2.jpeg',720],
 ['entorno-calcada',P+'8e5267a0c7f948cb8a5ab6409ae25bb9_mv2.jpeg',720,{trim:true}],
 ['entorno-fachada',P+'c55ac98ce1b4474b97b56fdc206bb506_mv2.jpeg',720,{trim:true}],
 ['midia-opovo',P+'f0fb37b699b74962a3b5e8c96156a492_mv2.png',800],
 ['midia-diario',P+'09794bfd1bbf4f26ab005de9e469eed3_mv2.png',900],
];
(async()=>{for(const [n,f,w,o] of jobs){
 let s=sharp(f);
 if(o&&o.trim){let t=await s.trim({background:'#000000',threshold:25}).toBuffer();const tm=await sharp(t).metadata();t=await sharp(t).extract({left:0,top:0,width:tm.width,height:Math.floor(tm.height*(n==='entorno-calcada'?0.9:1))}).toBuffer();s=sharp(t)}
 const m0=await s.metadata();
 if(w&&m0.width>w)s=s.resize({width:w});
 const out=o&&o.jpeg?`assets/web/${n}.jpg`:`assets/web/${n}.webp`;
 await (o&&o.jpeg?s.jpeg({quality:o.jpeg,mozjpeg:true}):s.webp({quality:80})).toFile(out);
 const m=await sharp(out).metadata();console.log(n,m.width+'x'+m.height,(require('fs').statSync(out).size/1024).toFixed(0)+'KB');
}})();
