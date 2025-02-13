import"./assets/header_script-CsLR9MqL.js";const i=document.querySelectorAll(".btn"),l=document.querySelector(".indicator");document.querySelector(".button-container");const h=document.querySelectorAll(".options-grid"),u=localStorage.getItem("activeTabIndex")||0,m=i[u];i[u].classList.add("active");l.style.width=`${m.offsetWidth}px`;l.style.transform=`translateX(${m.parentElement.offsetLeft}px)`;i.forEach((e,o)=>{var s;e.classList.remove("active"),(s=h[o])==null||s.classList.remove("active")});i[u].classList.add("active");var x;(x=h[u])==null||x.classList.add("active");l.style.width=`${m.offsetWidth}px`;l.style.transform=`translateX(${m.offsetLeft}px)`;i.forEach((e,o)=>{e.addEventListener("click",function(){i.forEach(n=>n.classList.remove("active")),e.classList.add("active");const s=e.offsetWidth,g=e.parentElement.offsetLeft;l.style.transform=`translateX(${g}px)`,l.style.width=`${s}px`,h.forEach(n=>{n.classList.remove("active")}),h[o].classList.add("active"),localStorage.setItem("activeTabIndex",o)})});function A(e,o){document.querySelectorAll(".options-grid").forEach((s,g)=>{const[n,p]=e[g];let $=p-n+1;n<=14&&p>=14&&$--;const r=s.querySelectorAll("button"),L=r.length>0?r[r.length-1]:null,w=r.length,E=$+w;let y=E%3;const c=document.createDocumentFragment();let d=[];for(let t=n;t<=p;t++){if(t===14)continue;let a="";t>=17&&t<=38?a=`DOM MODUŁOWY MH-${t}`:t>=40&&t<=43?a=`BIURO MODUŁOWE MH-${t}`:t>=44&&t<=46?a=`SAUNA MODUŁOWA MH-${t}`:t>=7&&t<=16&&(a=`DOMEK MODUŁOWY MH-${t}`);let O="Brak opisu";if(o&&Array.isArray(o)){const v=o.flat().find(M=>M.index===t);v&&v["short-info"]&&(O=v["short-info"])}const f=document.createElement("button");f.onclick=function(){S(t)},f.innerHTML=`
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
          <p>${O}</p>
        `,y>0&&w+c.childNodes.length+d.length>=E-y?d.push(f):c.appendChild(f)}if(d.length>0){const t=document.createElement("div");t.classList.add("row-last"),d.forEach(a=>t.appendChild(a)),c.appendChild(t)}L?L.after(c):s.prepend(c)})}const D=[[17,38],[40,43],[44,46],[7,16]];fetch("updated_data.json").then(e=>e.json()).then(e=>{A(D,e)}).catch(e=>console.error("Помилка завантаження JSON:",e));function S(e){window.location.href=`content.html?page=${e}`}window.openPage=function(e){window.location.href=`content.html?page=${e}`};
//# sourceMappingURL=modular.js.map
