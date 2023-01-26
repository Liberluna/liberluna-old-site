'use strict';
(async ()=>{
    document.getElementById('scroll-to').addEventListener("click",e=>{
        window.scroll({
            top:document.getElementById("title-zone").offsetHeight,
            behavior: 'smooth'
        });
    });
})();