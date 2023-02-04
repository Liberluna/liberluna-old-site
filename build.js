const ejs = require('ejs');
const fs = require('fs');
const {JSDOM} = require('jsdom');
const mime = require('mime-types');
const sass = require('node-sass');

const build = async(paths) => {
  let files = JSON.parse(fs.readFileSync('map.json', "utf8")).files;
  if (paths) {
    files = paths;
  }
  for (const file of files) {
    const dir = file.split("/").slice(0, -1).join("/");
    if (!fs.existsSync(`dist/${dir}`)) {
      fs.mkdirSync(`dist/${dir}`, {
        recursive: true
      })
    }
    if(file.slice(-5) === ".scss"){
      sass.render({
        file:`src/${file}`
      },(err,result)=>{
        if(!err)
          fs.writeFile(`dist/${file.replace(".scss",".css")}`,result.css,()=>{})
      })
      continue;
    }
    if (file.slice(-4) !== ".ejs") {
      fs.copyFile(`src/${file}`, `dist/${file}`, () => {});
      continue;
    }
    ejs.renderFile(`./src/${file}`, {}, {
      views: "./src",
      strict: true
    }, (err, str) => {
      if (err) return;
      const dom = new JSDOM(str);
      dom.window.document.querySelectorAll('img').forEach(elem => {
        const imgpath = `./src/${elem.src}`;
        const b64txt = fs.readFileSync(imgpath, {
          encoding: "base64"
        });
        const b64url = `data:${mime.lookup(imgpath)};base64,${b64txt}`;
        elem.src = b64url;
      });
      str = dom.window.document.documentElement.outerHTML;
      fs.writeFile(`dist/${file.replaceAll('.ejs','.html')}`, str, (err) => {
        //if(err) console.error(err);
      });
    });
  }
}
if (require.main === module) {
  console.log("Building..");
  build();
}
module.exports = build;