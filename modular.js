import"./assets/header_script-60Qrdn5v.js";const i=document.querySelectorAll(".btn"),l=document.querySelector(".indicator");document.querySelector(".button-container");const h=document.querySelectorAll(".options-grid"),m=localStorage.getItem("activeTabIndex")||0,u=i[m];i[m].classList.add("active");l.style.width=`${u.offsetWidth}px`;l.style.transform=`translateX(${u.parentElement.offsetLeft}px)`;i.forEach((e,o)=>{var n;e.classList.remove("active"),(n=h[o])==null||n.classList.remove("active")});i[m].classList.add("active");var D;(D=h[m])==null||D.classList.add("active");l.style.width=`${u.offsetWidth}px`;l.style.transform=`translateX(${u.offsetLeft}px)`;i.forEach((e,o)=>{e.addEventListener("click",function(){i.forEach(s=>s.classList.remove("active")),e.classList.add("active");const n=e.offsetWidth,g=e.parentElement.offsetLeft;l.style.transform=`translateX(${g}px)`,l.style.width=`${n}px`,h.forEach(s=>{s.classList.remove("active")}),h[o].classList.add("active"),localStorage.setItem("activeTabIndex",o)})});function A(e,o){document.querySelectorAll(".options-grid").forEach((n,g)=>{const[s,p]=e[g];let y=p-s+1;s<=14&&p>=14&&y--;const d=n.querySelectorAll("button"),L=d.length>0?d[d.length-1]:null,v=d.length,w=y+v;let E=w%3;const c=document.createDocumentFragment();let f=[],O=v;for(let t=s;t<=p;t++){if(t===14)continue;let a="";t>=17&&t<=38?a=`DOM MODUŁOWY MH-${t}`:t>=40&&t<=43?a=`BIURO MODUŁOWE MH-${t}`:t>=44&&t<=46?a=`SAUNA MODUŁOWA MH-${t}`:t>=7&&t<=16&&(a=`DOMEK MODUŁOWY MH-${t}`);let x="Brak opisu";if(o&&Array.isArray(o)){const $=o.flat().find(M=>M.index===t);$&&$["short-info"]&&(x=$["short-info"])}const r=document.createElement("button");r.style.animationDelay=`${O*.2}s`,r.onclick=function(){I(t)},r.innerHTML=`
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
          <p>${x}</p>
        `,O++,E>0&&v+c.childNodes.length+f.length>=w-E?f.push(r):c.appendChild(r)}if(f.length>0){const t=document.createElement("div");t.classList.add("row-last"),f.forEach(a=>t.appendChild(a)),c.appendChild(t)}L?L.after(c):n.prepend(c)})}const S=[[17,38],[40,43],[44,46],[7,16]];fetch("updated_data.json").then(e=>e.json()).then(e=>{A(S,e)}).catch(e=>console.error("Помилка завантаження JSON:",e));function I(e){window.location.href=`content.html?page=${e}`}window.openPage=function(e){window.location.href=`content.html?page=${e}`};
//# sourceMappingURL=modular.js.map
