const ejs = require('ejs');
const fs = require('fs');

const files=JSON.parse(fs.readFileSync('map.json',"utf8")).files;
for(const file of files){
    console.log(file)
    if(file.slice(-4)!==".ejs"){
      console.log("not ejs")
      fs.copyFile(`src/${file}`,`dist/${file}`,()=>{});
      continue;
    }
    ejs.renderFile(`src/${file}`, {}, {
        views:"./src",
        strict:true
    }, (err, str)=>{
        fs.writeFile(`dist/${file}`,str,(err)=>{
            console.error(err);
        });
    });
}
