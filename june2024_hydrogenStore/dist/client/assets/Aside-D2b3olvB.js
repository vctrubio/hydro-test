import{r as n,j as e}from"./jsx-runtime-D2HyDbKh.js";function c({children:s,heading:o,type:r}){const{type:t,close:i}=l(),a=r===t;return e.jsxs("div",{"aria-modal":!0,className:`overlay ${a?"expanded":""}`,role:"dialog",children:[e.jsx("button",{className:"close-outside",onClick:i}),e.jsxs("aside",{children:[e.jsxs("header",{children:[e.jsx("h3",{children:o}),e.jsx("button",{className:"close reset",onClick:i,children:"×"})]}),e.jsx("main",{children:s})]})]})}const d=n.createContext(null);c.Provider=function({children:o}){const[r,t]=n.useState("closed");return e.jsx(d.Provider,{value:{type:r,open:t,close:()=>t("closed")},children:o})};function l(){const s=n.useContext(d);if(!s)throw new Error("useAside must be used within an AsideProvider");return s}export{c as A,l as u};