import { walk } from "https://deno.land/std/fs/walk.ts";
import oneBuild from "./builder/one-build.ts";

(async()=>{
  for(const file of walk("./src")){
    oneBuild(file);
  }
})()