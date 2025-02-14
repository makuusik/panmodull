const i=document.querySelectorAll(".btn"),l=document.querySelector(".indicator");document.querySelector(".button-container");const u=document.querySelectorAll(".options-grid"),m=localStorage.getItem("activeTabIndex")||0,g=i[m];i[m].classList.add("active");l.style.width=`${g.offsetWidth}px`;l.style.transform=`translateX(${g.parentElement.offsetLeft}px)`;i.forEach((e,n)=>{var s;e.classList.remove("active"),(s=u[n])==null||s.classList.remove("active")});i[m].classList.add("active");var D;(D=u[m])==null||D.classList.add("active");l.style.width=`${g.offsetWidth}px`;l.style.transform=`translateX(${g.offsetLeft}px)`;i.forEach((e,n)=>{e.addEventListener("click",function(){i.forEach(o=>o.classList.remove("active")),e.classList.add("active");const s=e.offsetWidth,p=e.parentElement.offsetLeft;l.style.transform=`translateX(${p}px)`,l.style.width=`${s}px`,u.forEach(o=>{o.classList.remove("active")}),u[n].classList.add("active"),localStorage.setItem("activeTabIndex",n)})});function S(e,n){document.querySelectorAll(".options-grid").forEach((s,p)=>{const[o,v]=e[p];let L=v-o+1;o<=14&&v>=14&&L--;const d=s.querySelectorAll("button"),O=d.length>0?d[d.length-1]:null,$=d.length,M=L+$;let w=M%3;const c=document.createDocumentFragment();let f=[],A=$;for(let t=o;t<=v;t++){if(t===14)continue;let a="";const h=window.location.href.includes("_en");t>=17&&t<=38?a=h?`MODULAR HOUSE MH-${t}`:`DOM MODUŁOWY MH-${t}`:t>=40&&t<=43?a=h?`MODULAR OFFICE MH-${t}`:`BIURO MODUŁOWE MH-${t}`:t>=44&&t<=46?a=h?`MODULAR SAUNA MH-${t}`:`SAUNA MODUŁOWA MH-${t}`:t>=7&&t<=16&&(a=h?`MODULAR COTTAGE MH-${t}`:`DOMEK MODUŁOWY MH-${t}`);let y="Brak opisu";if(n&&Array.isArray(n)){const E=n.flat().find(x=>x.index===t);E&&E["short-info"]&&(y=E["short-info"])}const r=document.createElement("button");r.style.animationDelay=`${A*.2}s`,r.onclick=function(){U(t)},r.innerHTML=`
          <div class="image-wrapper">
            <img
              class="img-default"
              src="img/modular/${t}.jpg"
              alt="House ${t}"
              width="350"
              height="177"
            />
            <img
              class="img-hover"
              src="img/modular_alt/${t}_alt.jpg"
              alt="House ${t}"
              width="350"
              height="177"
            />
          </div>
          <h2>${a}</h2>
          <p>${y}</p>
        `,A++,w>0&&$+c.childNodes.length+f.length>=M-w?f.push(r):c.appendChild(r)}if(f.length>0){const t=document.createElement("div");t.classList.add("row-last"),f.forEach(a=>t.appendChild(a)),c.appendChild(t)}O?O.after(c):s.prepend(c)})}const I=[[17,38],[40,43],[44,46],[7,16]],H=window.location.href.includes("_en"),W=H?"updated_data_en.json":"updated_data.json";fetch(W).then(e=>e.json()).then(e=>{S(I,e)}).catch(e=>console.error("Помилка завантаження JSON:",e));function U(e){const n=H?`content_en.html?page=${e}`:`content.html?page=${e}`;window.location.href=n}window.openPage=U;
//# sourceMappingURL=modular-BkT6xGEF.js.map
