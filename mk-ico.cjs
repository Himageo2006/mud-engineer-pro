const sharp=require('sharp'),fs=require('fs');
const SIZES=[16,32,48,64,128,256];
(async()=>{
  const imgs=[];
  for(const s of SIZES){ const buf=await sharp('assets/icon.png').resize(s,s).png().toBuffer(); imgs.push({s,buf}); }
  const N=imgs.length;
  const dir=Buffer.alloc(6+16*N);
  dir.writeUInt16LE(0,0); dir.writeUInt16LE(1,2); dir.writeUInt16LE(N,4);
  let offset=6+16*N; const blobs=[];
  imgs.forEach((im,i)=>{
    const e=6+i*16;
    dir.writeUInt8(im.s>=256?0:im.s,e);      // width
    dir.writeUInt8(im.s>=256?0:im.s,e+1);    // height
    dir.writeUInt8(0,e+2); dir.writeUInt8(0,e+3);
    dir.writeUInt16LE(1,e+4);                // planes
    dir.writeUInt16LE(32,e+6);               // bpp
    dir.writeUInt32LE(im.buf.length,e+8);    // size
    dir.writeUInt32LE(offset,e+12);          // offset
    offset+=im.buf.length; blobs.push(im.buf);
  });
  fs.writeFileSync('build/icon.ico',Buffer.concat([dir,...blobs]));
  console.log('build/icon.ico written',SIZES.join('/'),'=>',(offset/1024).toFixed(1)+'KB');
})();
