const http = require('http');
const mime = require('mime-types')
const fs = require('fs');
const build= require('./build.js');
const server = http.createServer(async(req,res)=>{
  const url=req.url;
  let path="./dist"+url;
  let filedata;
  let filepath;
  try{
    filedata=fs.readFileSync(path);
    filepath=path;
  }catch(e){
    try{
      let onepath=""+path;
      if(path.at(-1)==="/"){
        onepath+="index.html"
      }else{
        onepath+="/index.html"
      }
      filedata=fs.readFileSync(onepath);
      filepath=onepath;
    }catch(e){
      res.writeHead(404,{'Content-Type':'text/html'});
      res.end(fs.readFileSync("./dist/404.html"),'utf-8');
      return;
    }
  }
  const basefilepath=filepath.replace("./dist/","");
  
  await build([basefilepath,
               basefilepath.replaceAll(".html",".ejs"),
               basefilepath.replaceAll(".css",".scss")
              ])
  res.writeHead(200,{'Content-Type':mime.lookup(filepath)});
  res.end(filedata);
});
server.listen(5000);