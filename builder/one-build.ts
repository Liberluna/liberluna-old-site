import sass from "https://deno.land/x/denosass/mod.ts";
import { sha256 } from "https://denopkg.com/chiefbiiko/sha256@v1.0.0/mod.ts";
import { exists } from "https://deno.land/std/fs/mod.ts";
import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";
export default async function(file){
  if(!file.isFile){
    return;
  }
  const ext=file.path.split(".").at(-1);
  const dist={
    path:file.path.replace("src","dist"),
  };
  dist.dir=dist.path.split("/").slice(0,-1).join("/");
  if(!await exists(dist.dir))
    await Deno.mkdir(dist.dir,{recursive:true});
  if(![
    'scss',
    'ejs'
  ].includes(ext)){
    await Deno.copyFile("./"+file.path,"./"+dist.path);
    return;
  }
  if(ext==="scss"){
    const compiler = sass(file.path);
    Deno.writeTextFile(dist.path,compiler.to_string());
  }
  if(ext==="ejs"){
    dejs.renderFile
  }
    /*const text=new String(await Deno.readTextFile(file.path));
    text.regMatch=function(regexp) {
      const result=this.match(regexp);
      return result ? result : [];
    };
    let deps=[];
  
    deps.push.apply(deps,text.regMatch(/(?<=<!--deps\.)[\s\S]+(?=-->)/g)); // HTML deps
    deps.push.apply(deps,text.regMatch(/(?<=\/\*deps\.)[\S\s]+(?=\*\/)/g)); //JS/TS/CSS deps
    deps.new=[];
    deps.forEach(e=>{
      deps.new.push(JSON.parse(e));
    })
    deps=deps.new;
    console.log(deps)*/
  
}