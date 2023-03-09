'use strict';
(async ()=>{
    document.getElementById('scroll-to').addEventListener("click",e=>{
        window.scroll({
            top:document.getElementById("title-zone").offsetHeight,
            behavior: 'smooth'
        });
    });
})();
setInterval(()=>{
    if(window.scrollY>0){
        if(document.getElementById("header").hidden){
            document.getElementById("header").hidden=false;
        }

    }else if(!document.getElementById("header").hidden){
        document.getElementById("header").hidden=true;
    }
},100)/*
document.querySelectorAll("#about").forEach(elem=>{
    window.orderChars(elem);
});
*/
