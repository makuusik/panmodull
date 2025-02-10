import"./assets/header_script-B6MJcyG1.js";/* empty css                      */const i=document.querySelectorAll(".btn"),l=document.querySelector(".indicator");document.querySelector(".button-container");const h=document.querySelectorAll(".options-grid"),m=localStorage.getItem("activeTabIndex")||0,u=i[m];i[m].classList.add("active");l.style.width=`${u.offsetWidth}px`;l.style.transform=`translateX(${u.parentElement.offsetLeft}px)`;i.forEach((e,s)=>{var o;e.classList.remove("active"),(o=h[s])==null||o.classList.remove("active")});i[m].classList.add("active");var x;(x=h[m])==null||x.classList.add("active");l.style.width=`${u.offsetWidth}px`;l.style.transform=`translateX(${u.offsetLeft}px)`;i.forEach((e,s)=>{e.addEventListener("click",function(){i.forEach(a=>a.classList.remove("active")),e.classList.add("active");const o=e.offsetWidth,p=e.parentElement.offsetLeft;l.style.transform=`translateX(${p}px)`,l.style.width=`${o}px`,h.forEach(a=>{a.classList.remove("active")}),h[s].classList.add("active"),localStorage.setItem("activeTabIndex",s)})});function A(e,s){document.querySelectorAll(".options-grid").forEach((o,p)=>{const[a,g]=e[p];let $=g-a+1;a<=14&&g>=14&&$--;const r=o.querySelectorAll("button"),L=r.length>0?r[r.length-1]:null,E=r.length,y=$+E;let O=y%3;const c=document.createDocumentFragment();let d=[];for(let t=a;t<=g;t++){if(t===14)continue;let n="";t>=17&&t<=38?n=`DOM MODUŁOWY MH-${t}`:t>=40&&t<=43?n=`BIURO MODUŁOWE MH-${t}`:t>=44&&t<=46?n=`SAUNA MODUŁOWA MH-${t}`:t>=7&&t<=16&&(n=`DOMEK MODUŁOWY MH-${t}`);let w="Brak opisu";if(s&&Array.isArray(s)){const v=s.flat().find(M=>M.index===t);v&&v["short-info"]&&(w=v["short-info"])}const f=document.createElement("button");f.onclick=function(){S(t)},f.innerHTML=`
          <div class="image-wrapper">
            <img
              class="img-default"
              src="../img/media/modular/${t}.jpg"
              alt="House ${t}"
              width="350"
              height="177"
            />
            <img
              class="img-hover"
              src="../img/media/modular_alt/${t}_alt.jpg"
              alt="House ${t}"
              width="350"
              height="177"
            />
          </div>
          <h2>${n}</h2>
          <p>${w}</p>
        `,O>0&&E+c.childNodes.length+d.length>=y-O?d.push(f):c.appendChild(f)}if(d.length>0){const t=document.createElement("div");t.classList.add("row-last"),d.forEach(n=>t.appendChild(n)),c.appendChild(t)}L?L.after(c):o.prepend(c)})}const D=[[17,38],[40,43],[44,46],[7,16]];fetch("updated_data.json").then(e=>e.json()).then(e=>{A(D,e)}).catch(e=>console.error("Помилка завантаження JSON:",e));function S(e){window.location.href=`/content.html?page=${e}`}
//# sourceMappingURL=modular.js.map
