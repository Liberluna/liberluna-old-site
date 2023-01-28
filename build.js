const ejs = require('ejs');
const fs = require('fs');

const files=JSON.parse(fs.readFileSync('map.json',"utf8")).files;
(async()=>{
    for(const file of files){
        //console.log(file)
        const dir=file.split("/").slice(0,-1).join("/");
        if(!fs.existsSync(`dist/${dir}`)){
            fs.mkdirSync(`dist/${dir}`,{ recursive:true})
        }
        if(file.slice(-4)!==".ejs"){
          fs.copyFile(`src/${file}`,`dist/${file}`,()=>{});
          continue;
        }
        ejs.renderFile(`src/${file}`, {}, {
            views:"./src",
            strict:true
        }, (err, str)=>{
            fs.writeFile(`dist/${file.replaceAll('.ejs','.html')}`,str,(err)=>{
                //console.error(err);
            });
        });
    }
})();
