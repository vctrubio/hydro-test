import{j as i}from"./jsx-runtime-D2HyDbKh.js";import{w as a,l as o}from"./index-BNV72GOw.js";import{u as l}from"./variants-DbjS_mJ6.js";import{u as c,L as d}from"./components--oc4anGP.js";import{I as m}from"./Image-Boj0h0y-.js";import{M as x}from"./Money-C53rLjzO.js";const L=({data:e})=>[{title:`Hydrogen | ${(e==null?void 0:e.collection.title)??""} Collection`}];function w(){const{collection:e}=c();return i.jsxs("div",{className:"collection",children:[i.jsx("h1",{children:e.title}),i.jsx("p",{className:"collection-description",children:e.description}),i.jsx(a,{connection:e.products,children:({nodes:n,isLoading:t,PreviousLink:s,NextLink:r})=>i.jsxs(i.Fragment,{children:[i.jsx(s,{children:t?"Loading...":i.jsx("span",{children:"↑ Load previous"})}),i.jsx(j,{products:n}),i.jsx("br",{}),i.jsx(r,{children:t?"Loading...":i.jsx("span",{children:"Load more ↓"})})]})}),i.jsx(o.CollectionView,{data:{collection:{id:e.id,handle:e.handle}}})]})}function j({products:e}){return i.jsx("div",{className:"products-grid",children:e.map((n,t)=>i.jsx(h,{product:n,loading:t<8?"eager":void 0},n.id))})}function h({product:e,loading:n}){const t=e.variants.nodes[0],s=l(e.handle,t.selectedOptions);return i.jsxs(d,{className:"product-item",prefetch:"intent",to:s,children:[e.featuredImage&&i.jsx(m,{alt:e.featuredImage.altText||e.title,aspectRatio:"1/1",data:e.featuredImage,loading:n,sizes:"(min-width: 45em) 400px, 100vw"}),i.jsx("h4",{children:e.title}),i.jsx("small",{children:i.jsx(x,{data:e.priceRange.minVariantPrice})})]},e.id)}export{w as default,L as meta};
