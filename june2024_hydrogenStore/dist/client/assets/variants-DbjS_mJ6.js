import{r as u}from"./jsx-runtime-D2HyDbKh.js";import{d as i}from"./components--oc4anGP.js";function f(r,a){const{pathname:t}=i();return u.useMemo(()=>m({handle:r,pathname:t,searchParams:new URLSearchParams,selectedOptions:a}),[r,a,t])}function m({handle:r,pathname:a,searchParams:t,selectedOptions:e}){const n=/(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(a),c=n&&n.length>0?`${n[0]}products/${r}`:`/products/${r}`;e.forEach(o=>{t.set(o.name,o.value)});const s=t.toString();return c+(s?"?"+t.toString():"")}export{f as u};
