import {encode,decode} from "https://deno.land/std@0.97.0/encoding/base64.ts";
import {DOMParser,Element,HTMLDocument} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { mime, mimelite } from "https://deno.land/x/mimetypes@v1.0.0/mod.ts";

export default function(code: string,file):string{
  const doc: HTMLDocument=new DOMParser().parseFromString(code);

  doc.querySelectorAll('img').forEach(elem=>{
    if(elem.src){
      const base=new URL(file.dir).href;
      const path=new URL(elem.src,base);
      const b64=encode(Deno.readFileSync(path));
      const dataurl=`data:${mime.getType(file.path)};base64,${b64}`;
      elem.src=dataurl;
    }
  });
  return doc.outerHTML;
}