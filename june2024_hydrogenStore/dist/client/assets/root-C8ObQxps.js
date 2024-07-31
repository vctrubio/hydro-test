import{r as d,j as e}from"./jsx-runtime-D2HyDbKh.js";import{a as w}from"./index-BNV72GOw.js";import{l as S}from"./favicon-Vs-FBHyB.js";import{A as h}from"./Aside-D2b3olvB.js";import{h as N,d as M,J as k,K as b,_ as C,A as j,N as l,O as T,e as A,M as L,P as I,S as P,k as D,i as E}from"./components--oc4anGP.js";import{C as H}from"./Cart-D5fnLuK-.js";import{P as O,b as U}from"./Search-BV3oFmcs.js";import"./variants-DbjS_mJ6.js";import"./Image-Boj0h0y-.js";import"./Money-C53rLjzO.js";/**
 * @remix-run/react v2.9.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let x="positions";function R({getKey:r,...s}){let{isSpaMode:n}=N(),o=M(),i=k();b({getKey:r,storageKey:x});let t=d.useMemo(()=>{if(!r)return null;let c=r(o,i);return c!==o.key?c:null},[]);if(n)return null;let a=((c,v)=>{if(!window.history.state||!window.history.state.key){let u=Math.random().toString(32).slice(2);window.history.replaceState({key:u},"")}try{let m=JSON.parse(sessionStorage.getItem(c)||"{}")[v||window.history.state.key];typeof m=="number"&&window.scrollTo(0,m)}catch(u){console.error(u),sessionStorage.removeItem(c)}}).toString();return d.createElement("script",C({},s,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${a})(${JSON.stringify(x)}, ${JSON.stringify(t)})`}}))}const J="https://cdn.shopify.com/oxygen-v2/33621/23113/47952/664951/assets/reset-1BLJ4C6V.css",_="https://cdn.shopify.com/oxygen-v2/33621/23113/47952/664951/assets/app-ClycDX5Q.css",$=()=>e.jsxs("div",{className:"links-to",children:[e.jsx(l,{to:"/",children:"Acerca"}),e.jsx(l,{to:"/calculadora",children:"Calculadora"}),e.jsx(l,{to:"/productos",children:"Productos"}),e.jsx(l,{to:"/contacto",children:"Contacto"})]}),F=()=>e.jsxs("flex",{className:"footer",children:[e.jsx("div",{className:"footer-box",children:e.jsx($,{})}),e.jsxs("div",{className:"footer-null",children:[e.jsx("h1",{children:"Warme"}),e.jsx("div",{children:"Términos y condiciones"}),e.jsx("div",{children:"Privicidad"})]})]});function W({footer:r,header:s,publicStoreDomain:n}){return e.jsx(d.Suspense,{children:e.jsx(j,{resolve:r,children:e.jsx(F,{})})})}const B="https://cdn.shopify.com/oxygen-v2/33621/23113/47952/664951/assets/warme_logo-YyJwAbTc.png",Y=(r,s)=>{const[n,o]=d.useState(!1),i=()=>o(!n);return e.jsxs("div",{className:"header-burger",children:[e.jsx("button",{className:"header-menu-btn",onClick:i,children:"Menu"}),n&&e.jsx("div",{className:"header-dropdown-content",children:y.items.map(t=>{if(!t.url)return null;const a=t.url.includes("myshopify.com")||t.url.includes(s)||t.url.includes(r)?new URL(t.url).pathname:t.url;return e.jsx(l,{className:"header-menu-dropdown-item",end:!0,onClick:()=>{o(!1),closeAside()},prefetch:"intent",style:p,to:a,children:t.title},t.id)})})]})};function q({header:r,isLoggedIn:s,cart:n,publicStoreDomain:o}){const{shop:i,menu:t}=r;return e.jsxs("header",{className:"header",children:[e.jsx(l,{prefetch:"intent",to:"/",style:p,end:!0,children:e.jsx("img",{src:B,alt:"Warme",style:{width:100}})}),e.jsx(Y,{menu:t,primaryDomainUrl:r.shop.primaryDomain.url,publicStoreDomain:o}),e.jsx(f,{menu:t,viewport:"desktop",primaryDomainUrl:r.shop.primaryDomain.url,publicStoreDomain:o}),e.jsx("div",{className:"header-hide"})]})}function f({menu:r,primaryDomainUrl:s,viewport:n,publicStoreDomain:o}){function i(t){n==="mobile"&&(t.preventDefault(),window.location.href=t.currentTarget.href)}return e.jsx("div",{className:"header-menu-",role:"navigation",children:y.items.map(t=>{if(!t.url)return null;const a=t.url.includes("myshopify.com")||t.url.includes(o)||t.url.includes(s)?new URL(t.url).pathname:t.url;return e.jsx(l,{className:"header-menu-item",end:!0,onClick:i,prefetch:"intent",style:p,to:a,children:t.title},t.id)})})}const y={id:"gid://shopify/Menu/199655587897",items:[{id:"gid://shopify/MenuItem/461609500729",resourceId:null,tags:[],title:"Acerca",type:"HTTP",url:"/",items:[]},{id:"gid://shopify/MenuItem/461609533497",resourceId:null,tags:[],title:"Calculadora",type:"HTTP",url:"/calculadora",items:[]},{id:"gid://shopify/MenuItem/461609566265",resourceId:null,tags:[],title:"Productos",type:"HTTP",url:"/productos",items:[]},{id:"gid://shopify/MenuItem/461609599033",resourceId:null,tags:[],title:"Contacto",type:"HTTP",url:"/contacto",items:[]}]};function p({isActive:r,isPending:s}){return{fontWeight:r?"bold":void 0,color:s?"grey":"black"}}const G=()=>e.jsx("div",{className:"top-nav-bar",children:e.jsx("div",{children:"libre de emision"})});function K({cart:r,children:s=null,footer:n,header:o,isLoggedIn:i,publicStoreDomain:t}){return e.jsxs(h.Provider,{children:[e.jsx(Q,{cart:r}),e.jsx(V,{}),e.jsx(X,{header:o,publicStoreDomain:t}),e.jsx(G,{}),o&&e.jsx(q,{header:o,cart:r,isLoggedIn:i,publicStoreDomain:t}),e.jsx("main",{children:s}),e.jsx(W,{footer:n,header:o,publicStoreDomain:t})]})}function Q({cart:r}){return e.jsx(h,{type:"cart",heading:"CART",children:e.jsx(d.Suspense,{fallback:e.jsx("p",{children:"Loading cart ..."}),children:e.jsx(j,{resolve:r,children:s=>e.jsx(H,{cart:s,layout:"aside"})})})})}function V(){return e.jsx(h,{type:"search",heading:"SEARCH",children:e.jsxs("div",{className:"predictive-search",children:[e.jsx("br",{}),e.jsx(O,{children:({fetchResults:r,inputRef:s})=>e.jsxs("div",{children:[e.jsx("input",{name:"q",onChange:r,onFocus:r,placeholder:"Search",ref:s,type:"search"})," ",e.jsx("button",{onClick:()=>{var n;window.location.href=(n=s==null?void 0:s.current)!=null&&n.value?`/search?q=${s.current.value}`:"/search"},children:"Search"})]})}),e.jsx(U,{})]})})}function X({header:r,publicStoreDomain:s}){var n;return r.menu&&((n=r.shop.primaryDomain)==null?void 0:n.url)&&e.jsx(h,{type:"mobile",heading:"MENU",children:e.jsx(f,{menu:r.menu,viewport:"mobile",primaryDomainUrl:r.shop.primaryDomain.url,publicStoreDomain:s})})}const ae=({formMethod:r,currentUrl:s,nextUrl:n})=>!!(r&&r!=="GET"||s.toString()===n.toString());function ce(){return[{rel:"stylesheet",href:J},{rel:"stylesheet",href:_},{rel:"preconnect",href:"https://cdn.shopify.com"},{rel:"preconnect",href:"https://shop.app"},{rel:"icon",type:"image/svg+xml",href:S}]}function g({children:r}){const s=w(),n=A("root");return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width,initial-scale=1"}),e.jsx(L,{}),e.jsx(I,{})]}),e.jsxs("body",{children:[e.jsx(K,{...n,children:r}),e.jsx(R,{nonce:s}),e.jsx(P,{nonce:s})]})]})}function de(){return e.jsx(g,{children:e.jsx(T,{})})}function ue(){var o;const r=D();let s="Unknown error",n=500;return E(r)?(s=((o=r==null?void 0:r.data)==null?void 0:o.message)??r.data,n=r.status):r instanceof Error&&(s=r.message),e.jsx(g,{children:e.jsxs("div",{className:"route-error",children:[e.jsx("h1",{children:"Oops"}),e.jsx("h2",{children:n}),s&&e.jsx("fieldset",{children:e.jsx("pre",{children:s})})]})})}export{ue as ErrorBoundary,de as default,ce as links,ae as shouldRevalidate};