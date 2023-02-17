      (async()=>{
        const membersFetch=await fetch("https://raw.githubusercontent.com/liberluna/mainpage/master/src/members/members.json");
        const membersData=(await membersFetch.json()).members;
        for(const name of Object.keys(membersData)){
          const info=membersData[name];
          const memberElem=document.createElement("div");
          memberElem.style.width="30%";
          memberElem.style.minWidth="200px";
          memberElem.style.maxWidth="100%";
          //memberElem.style.height
          memberElem.innerHTML=`
            <div style="width:100%"><img alt="${name}-icon" src="${info.icon}" style="width:30%;"></div>
            <div style="font-size:1.2em;font-weight:bold;">${name}</div>
            <div>${info.role}</div>
            <div style="font-size:0.8em">${info.skills}</div>
            <div>${info.desc.ja}</div>
            <div id='SNSs'>
              <a href="https://github.com/${info.github}"><img src="../img/github-mark.svg" style="width:1.5em"></a>
              <a href="https://twitter.com/${info.twitter}"><img src="../img/twitter-icon.svg" style="width:1.5em"></a>
            </div>
          `;
          document.getElementById("members").appendChild(memberElem);
        }
      })();
