const sharp=require('C:/Projetos/fisio-jessica-redesign/node_modules/sharp');
const map={
 'terapia-aba-em-fortaleza':['56b8191a6043f3e3c6dae5b63c452a3c.jpg',720],
 '2017_06_27_adolescentes':['5fc1b18eff66062f03c50c4224a938ca.jpg',1000],
 '_tdah':['96cdf03aca694c098847b2a3effed31d.jpg',1200],
 '2017_04_01_autismo-abril-azul':['b44080_5d6a55dfc49e4db9ae719881fccf829c_mv2.png',900],
 '2017_04_08_autismo':['b44080_94b6cd3353894b259728ee2998ff5654_mv2.jpg',null],
 'ansiedade-infantil':['db440e70fa604bda90d756b1b66cc50b.jpg',1200]};
(async()=>{for(const [k,[f,w]] of Object.entries(map)){let s=sharp('assets/orig-blog/'+f);const m=await s.metadata();if(w&&m.width>w)s=s.resize({width:w});
 const out=`public/img/blog/${k.replace(/^_/,'')}.webp`;await s.webp({quality:78}).toFile(out);const o=await sharp(out).metadata();console.log(out,o.width+'x'+o.height)}})()
