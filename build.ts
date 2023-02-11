import { walk } from "https://deno.land/std/fs/mod.ts";
import oneBuild from "./builder/one-build.ts";

(async()=>{
  for await (const file of walk("./src")){
    oneBuild(file);
  }
})()