import{r as f}from"./index.NEDEFKed.js";var p={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i=f,u=Symbol.for("react.element"),x=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,y=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m={key:!0,ref:!0,__self:!0,__source:!0};function a(t,e,d){var r,o={},s=null,_=null;d!==void 0&&(s=""+d),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(_=e.ref);for(r in e)l.call(e,r)&&!m.hasOwnProperty(r)&&(o[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)o[r]===void 0&&(o[r]=e[r]);return{$$typeof:u,type:t,key:s,ref:_,props:o,_owner:y.current}}n.Fragment=x;n.jsx=a;n.jsxs=a;p.exports=n;var c=p.exports;const E=()=>(f.useEffect(()=>{yaContextCb.push(()=>{window.Ya.Context.AdvManager.renderWidget({renderTo:"yandex_rtb_C-A-2592503-2",blockId:"C-A-2592503-2"})})},[]),c.jsx("div",{id:"yandex_rtb_C-A-2592503-2"}));export{E as default};
