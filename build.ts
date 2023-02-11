import { walk } from "https://deno.land/std/fs/mod.ts";
import oneBuild from "./builder/one-build.ts";

(async()=>{
  console.log('Building...');
  const startTime=performance.now();
  
  const builds=[];
  for await(const file of await walk("./src")){
    builds.push(oneBuild(file));
  }
  await Promise.all(builds)

  const endTime=performance.now();
  const delta=endTime-startTime
  console.log(`Builded.\nTime: ${Math.round(delta*1000000)/1000}μs (≈${Math.round(delta*100)/100000}s)`)
})()