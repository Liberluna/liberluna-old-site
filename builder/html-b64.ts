import {encode,decode} from "https://deno.land/std@0.97.0/encoding/base64.ts";
import {DOMParser,Element,HTMLDocument} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { mime, mimelite } from "https://deno.land/x/mimetypes@v1.0.0/mod.ts";

export default function(code: string,file):string{
  const doc: HTMLDocument=new DOMParser().parseFromString(code,'text/html');
  
  const cwd=Deno.cwd();
  const cwdURL=new URL('file://'+cwd);
  doc.querySelectorAll('img').forEach(elem=>{
    console.log(elem.getAttribute('src'))
    if(elem.getAttribute("src")){
      const base=new URL("./"+file.dir,cwdURL).href;
      const path=new URL(elem.getAttribute("src"),base);
      console.log(path)
      const b64=encode(Deno.readFileSync(path));
      const dataurl=`data:${mime.getType(path)};base64,${b64}`;
      elem.setAttribute("src",dataurl);
    }
  });
  return doc.outerHTML;
}