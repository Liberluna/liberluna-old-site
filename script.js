'use strict';
(async ()=>{
    document.getElementById('scroll-to').addEventListener("click",e=>{
        scrollTo(0, window.innerHeight);
    });
})();