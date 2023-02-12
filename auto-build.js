const build=require("./build.js");

let index=0;
async function one(){
    index++;
    console.log("Building...: %d",index);
    await build();
    setTimeout(() => {
        one();
    }, 500);
}
one()