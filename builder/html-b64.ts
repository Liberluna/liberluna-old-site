import {encode,decode} from "https://deno.land/std@0.97.0/encoding/base64.ts";
import {DOMParser,Element,HTMLDocument} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { mime, mimelite } from "https://deno.land/x/mimetypes@v1.0.0/mod.ts";

export default function(code: string,file):string{
  const doc: HTMLDocument=new DOMParser().parseFromString(code,'text/html');
  
  const cwd=Deno.cwd();
  doc.querySelectorAll('img').forEach(elem=>{
    console.log(elem.getAttribute('src'))
    if(elem.getAttribute("src")){
      const path=file.dir+'/'+elem.getAttribute('src')
      console.log(path)
      const b64=encode(Deno.readFileSync(path));
      const dataurl=`data:${mime.getType(path)};base64,${b64}`;
      elem.setAttribute("src",dataurl);
    }
  });
  const result=doc.documentElement.outerHTML;
  return result;
}