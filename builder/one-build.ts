import { sha256 } from "https://denopkg.com/chiefbiiko/sha256@v1.0.0/mod.ts";
export default async function(file){
    const ext=file.path.split(".").at(-1);
    if(![
        'scss',
        'ejs'
    ].includes(ext)){
        return;
    }
    const text=await Deno.readTextFile(file.path);
    let deps=[];
    deps.push.apply(text.match(/<!--deps\.[\s\S]+-->/g)); // HTML deps
    deps.push.apply(text.match(/\/\*deps\.[\S\s]+\*\//g)); //JS/TS/CSS deps

}