"use strict";(self.webpackChunknewclient=self.webpackChunknewclient||[]).push([[645],{6853:function(e,s,i){var l=i(73971),n=i(40642),a=i(78376),d=i(86193),o=i(59434),r=i(57689),c=i(97117),t=i(80184);s.Z=function(e){var s=e.children,i=(0,l.Ge)().active,u=((0,r.s0)(),(0,o.v9)(c.q0).currentChainId);return i&&d.gm.includes(u)?s:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.Z,{}),(0,t.jsx)(n.Z,{})]})}},40645:function(e,s,i){i.r(s),i.d(s,{default:function(){return M}});var l=i(1413),n=i(7788),a=i(72791),d=i.t(a,2),o=i(57689),r=i(11087),c=i(64554),t=i(2703),u=i(72426),v=i.n(u),h=i(59434),m=i(97117),x=i(42483),j=i(74165),p=i(15861),f=i(29439),N=i(69120),b=i(33073),g=i(40162);function w(e,s,i,l,n){var d=a.useState((function(){return n&&i?i(e).matches:l?l(e).matches:s})),o=(0,f.Z)(d,2),r=o[0],c=o[1];return(0,g.Z)((function(){var s=!0;if(i){var l=i(e),n=function(){s&&c(l.matches)};return n(),l.addListener(n),function(){s=!1,l.removeListener(n)}}}),[e,i]),r}var k=d.useSyncExternalStore;function y(e,s,i,l,n){var d=a.useCallback((function(){return s}),[s]),o=a.useMemo((function(){if(n&&i)return function(){return i(e).matches};if(null!==l){var s=l(e).matches;return function(){return s}}return d}),[d,e,l,n,i]),r=a.useMemo((function(){if(null===i)return[d,function(){return function(){}}];var s=i(e);return[function(){return s.matches},function(e){return s.addListener(e),function(){s.removeListener(e)}}]}),[d,i,e]),c=(0,f.Z)(r,2),t=c[0],u=c[1];return k(u,t,o)}var C=i(80184),T=function(){var e=function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=(0,N.Z)(),l="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,n=(0,b.Z)({name:"MuiUseMediaQuery",props:s,theme:i}),a=n.defaultMatches,d=void 0!==a&&a,o=n.matchMedia,r=void 0===o?l?window.matchMedia:null:o,c=n.ssrMatchMedia,t=void 0===c?null:c,u=n.noSsr,v=void 0!==u&&u,h="function"===typeof e?e(i):e;return h=h.replace(/^@media( ?)/m,""),(void 0!==k?y:w)(h,d,r,t,v)}("(max-width:760px)"),s=(0,h.v9)(m.q0),i=s.ido,n=s.userAccount,d=s.currentChainId,o=(0,a.useState)(!1),r=(0,f.Z)(o,2),c=r[0],u=r[1],v=(0,a.useState)({}),x=(0,f.Z)(v,2),g=x[0],T=x[1];return(0,a.useEffect)((function(){d&&null!==i&&void 0!==i&&i.tokenAddress&&n&&(0,p.Z)((0,j.Z)().mark((function e(){var s,n,a,o,r,c;return(0,j.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(!0),e.prev=1,e.next=4,(0,t.kE)({chainId:d,address:null===i||void 0===i?void 0:i.tokenAddress});case 4:s=e.sent,n=(0,f.Z)(s,4),a=n[0],o=n[1],r=n[2],c=n[3],T((function(e){return(0,l.Z)((0,l.Z)({},e),{},{name:a,symbol:o,decimal:r,totalSupply:(0,t.mb)(c)})})),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),console.log("err",e.t0);case 16:u(!1);case 17:case"end":return e.stop()}}),e,null,[[1,13]])})))()}),[i,d,n]),(0,C.jsx)(C.Fragment,{children:c?(0,C.jsx)("p",{children:"Loading..."}):(0,C.jsx)("div",{className:"project-media",children:(0,C.jsxs)("ul",{className:"project-listing",children:[(0,C.jsxs)("li",{children:["Token Name ",(0,C.jsx)("span",{children:null===g||void 0===g?void 0:g.name})]}),(0,C.jsxs)("li",{children:["Token Symbol ",(0,C.jsx)("span",{children:null===g||void 0===g?void 0:g.symbol})]}),(0,C.jsxs)("li",{children:["Decimals ",(0,C.jsx)("span",{children:null===g||void 0===g?void 0:g.decimal})]}),(0,C.jsxs)("li",{children:["Address"," ",(0,C.jsx)("span",{children:null===i||void 0===i?void 0:i.tokenAddress})]}),(0,C.jsxs)("li",{children:["Total Supply"," ",(0,C.jsxs)("span",{children:[null===g||void 0===g?void 0:g.totalSupply," "," ",null===g||void 0===g?void 0:g.symbol]})]}),(0,C.jsxs)("li",{children:[(0,C.jsx)("div",{className:"btn-area","data-bs-toggle":"modal","data-bs-target":"#exampleModal"}),(0,C.jsx)("span",{children:(0,C.jsx)("div",{style:{marginTop:e?"10px":"-60px"}})})]})]})})})},Z=i(80757),S=i(92639),U=function(e){var s=e.navigate;return(0,C.jsx)("div",{className:"project-content",children:(0,C.jsx)("div",{className:"project-media",children:(0,C.jsxs)("ul",{className:"project-listing",children:[(0,C.jsxs)("li",{children:["Edit WhiteList"," ",(0,C.jsx)("span",{children:(0,C.jsx)("span",{onClick:function(){return s("/ido-whitelist")},children:"Click hear"})})]}),(0,C.jsxs)("li",{children:["Update Ido"," ",(0,C.jsx)("span",{children:(0,C.jsx)("span",{onClick:function(){return s("/ido-update")},children:"Click hear"})})]}),(0,C.jsxs)("li",{children:["Withdraw Fund"," ",(0,C.jsx)("span",{children:(0,C.jsx)("span",{onClick:function(){return s("/ido-withdraw")},children:"Click hear"})})]}),(0,C.jsxs)("li",{children:["show WhiteListed user",(0,C.jsx)("span",{children:(0,C.jsx)("span",{onClick:function(){return s("/whitelisted-user")},children:"Click hear"})})]}),(0,C.jsxs)("li",{children:["Removed WhiteListed user",(0,C.jsx)("span",{children:(0,C.jsx)("span",{onClick:function(){return s("/removed-whitelisted-user")},children:"Click hear"})})]})]})})})},I=i(6853),M=function(){var e,s,i,d,u,j,p,f,N,b,g,w,k,y,M,A,L,E,P=(0,o.TH)(),B=(0,h.I0)(),_=(0,o.s0)(),W=(0,h.v9)(m.q0),R=W.poolInfo,H=W.loading,F=W.ido,D=W.userAccount,q=W.transaction,V=W.currentChainId,G=(0,a.useCallback)((function(){B((0,x.P4)({chainId:V,account:D,payload:F}))}),[B,V,D,F]),O=function(e){_("".concat(e||"/pool"),{state:(0,l.Z)({},F)})},Y=(0,a.useCallback)((function(){B((0,x.e9)({chainId:V,account:D,idoAddress:null===F||void 0===F?void 0:F.idoAddress,navigate:_}))}),[B]);(0,a.useEffect)((function(){B((0,m.vq)(!0))}),[]),(0,a.useEffect)((function(){P.state&&B((0,m.xx)((0,l.Z)({},P.state)))}),[B,P.state,V,D]),(0,a.useEffect)((function(){F.tokenAddress&&F.idoAddress&&V&&D&&G()}),[D,V,G,F]),(0,a.useEffect)((function(){console.log("transaction",q),(null!==q&&void 0!==q&&q.hash||null!==q&&void 0!==q&&q.type)&&["cancle_ido"].includes(null===q||void 0===q?void 0:q.type)&&"success"===(null===q||void 0===q?void 0:q.status)&&_("/")}),[q,null===q||void 0===q?void 0:q.status]);var z=(0,a.useMemo)((function(){return D?["cancle_ido"].includes(null===q||void 0===q?void 0:q.type)&&"pending"===(null===q||void 0===q?void 0:q.status)?{currentBtnText:"Pending Transaction...",disabled:!1}:H?{currentBtnText:"Loading... ",disabled:!0}:{currentBtnText:"Cancle Ido",disabled:!1}:{currentBtnText:"Connect Wallet",disabled:!1}}),[D,F,null===q||void 0===q?void 0:q.type,null===q||void 0===q?void 0:q.status,H]);return(0,C.jsx)(C.Fragment,{children:(0,C.jsx)(I.Z,{children:(0,C.jsxs)(Z.Z,{children:[H&&(0,C.jsx)(S.Z,{}),(0,C.jsx)(n.Z,{}),(0,C.jsxs)(c.Z,{children:[(0,C.jsx)("div",{className:"gamfi-breadcrumbs-section breadcrumbs-style2",children:(0,C.jsx)("div",{className:"container",children:(0,C.jsx)("div",{className:"row",children:(0,C.jsx)("div",{className:"col-lg-5",children:(0,C.jsx)("div",{className:"breadcrumbs-area sec-heading",children:(0,C.jsxs)("div",{className:"sub-inner",children:[(0,C.jsx)(r.rU,{className:"breadcrumbs-link",to:"/",children:"Home"}),(0,C.jsx)(r.rU,{className:"breadcrumbs-link",to:"/idos-list",children:"Idos"}),(0,C.jsx)("span",{className:"sub-title",children:"Idos"}),(0,C.jsx)("img",{className:"heading-left-image",src:"assets/images/icons/steps.png",alt:"Steps-Image"})]})})})})})}),(0,C.jsx)("div",{className:"project-details-conent gamfi-about-secion pb-80 md-pb-20",children:(0,C.jsxs)("div",{className:"container",children:[(0,C.jsxs)("div",{className:"game-price-item hover-shape-inner",children:[(0,C.jsxs)("div",{className:"game-price-inner",children:[(0,C.jsxs)("div",{className:"total-price",children:[(0,C.jsxs)("div",{className:"price-inner d-flex mb-45",children:[(0,C.jsx)("div",{className:"image-icon",children:(0,C.jsx)("img",{src:F.projectCover||"assets/images/project/ninga-image.png",alt:"icon-image",height:100,width:100})}),(0,C.jsxs)("div",{className:"price-details",children:[(0,C.jsx)("h3",{className:"mb-15",children:F.projectName}),(0,C.jsxs)("div",{className:"dsc",children:["1 TVL ="," ",(0,t.mb)(null===R||void 0===R||null===(e=R.pool)||void 0===e?void 0:e.TokenRate)," ",null===F||void 0===F||null===(s=F.symbol)||void 0===s?void 0:s.toUpperCase()]})]})]}),(0,C.jsxs)("div",{className:"all-raise mb-10",children:[" ","Total Raise"," ",(0,t.mb)(null===R||void 0===R?void 0:R.totalRaised)," ",null===F||void 0===F?void 0:F.symbol," ("," ",(0,t.Uh)((0,t.mb)(null===R||void 0===R||null===(i=R.pool)||void 0===i?void 0:i.HardCap,null===F||void 0===F?void 0:F.decimal),(0,t.mb)(null===R||void 0===R?void 0:R.totalRaised,null===F||void 0===F?void 0:F.decimal)),"% )"]})]}),(0,C.jsxs)("div",{className:"allocation-max text-center",children:[(0,C.jsx)("img",{src:(0,t.Vz)(F.blockchainPlateform),alt:"icon-image"}),(0,C.jsxs)("div",{className:"allocation",children:["Your Allocation:"," ",(0,t.mb)(null===R||void 0===R||null===(d=R.userInfo)||void 0===d?void 0:d.amountInvested,null===F||void 0===F?void 0:F.decimal)||"0"," ","TVL /"," ",(0,t.mb)(null===R||void 0===R||null===(u=R.pool)||void 0===u?void 0:u.MaxBuyPerUser,null===F||void 0===F?void 0:F.decimal)]})]}),(0,C.jsxs)("div",{className:"targeted-raise",style:{textAlign:"end"},children:[(0,C.jsxs)("div",{className:"all-raise mb-10",children:["OPEN_ido"===F.idoStatus&&"Sale End In","UPCOMING"===F.idoStatus&&"Sale Start In","PAST_ido"===F.idoStatus&&"Sale End"]}),(0,C.jsx)("div",{className:"price-counter mb-48",children:(0,C.jsx)("div",{className:"timer timer_1",children:"PAST_ido"!==F.idoStatus?(0,C.jsx)(C.Fragment,{}):(0,C.jsxs)("div",{children:[" ",v()(null===F||void 0===F?void 0:F.idoEndDate).fromNow()]})})}),(0,C.jsxs)("div",{className:"targeted-raise text-end",children:["Targeted Raise"," ",(0,t.mb)(null===R||void 0===R||null===(j=R.pool)||void 0===j?void 0:j.HardCap)," ",null===F||void 0===F||null===(p=F.symbol)||void 0===p?void 0:p.toUpperCase()]})]})]}),(0,C.jsx)("div",{className:"progress-inner",children:(0,C.jsx)("div",{className:"progress",children:(0,C.jsx)("div",{className:"progress-bar progress-bar-striped",role:"progressbar","aria-valuenow":4,"aria-valuemin":0,"aria-valuemax":100,style:{width:"".concat((0,t.Uh)((0,t.mb)(null===R||void 0===R||null===(f=R.pool)||void 0===f?void 0:f.HardCap,null===F||void 0===F?void 0:F.decimal),(0,t.mb)(null===R||void 0===R?void 0:R.totalRaised,null===F||void 0===F?void 0:F.decimal)),"%")}})})}),(0,C.jsxs)("div",{className:"banner-bottom-content mt-40",children:[(0,C.jsx)("div",{className:"btn-area","data-bs-toggle":"modal","data-bs-target":"#exampleModal",children:(0,C.jsxs)("span",{className:"readon white-shape-small",style:{cursor:"pointer"},onClick:function(){O("/pool")},children:[(0,C.jsxs)("span",{className:"btn-text",children:["Pool Info"," "]}),(0,C.jsx)("span",{className:"hover-shape1"}),(0,C.jsx)("span",{className:"hover-shape2"}),(0,C.jsx)("span",{className:"hover-shape3"})]})}),(0,C.jsx)("div",{className:"btn-area","data-bs-toggle":"modal","data-bs-target":"#exampleModal"}),(0,C.jsx)("div",{className:"social-area",children:(0,C.jsxs)("ul",{className:"social-icon-list",children:[F.telegramUrl&&(0,C.jsx)("li",{children:(0,C.jsx)("a",{href:F.telegramUrl,target:"_blank",rel:"noreferrer",children:(0,C.jsx)("i",{className:"icon-telegram"})})}),F.twitterUrl&&(0,C.jsx)("li",{children:(0,C.jsx)("a",{href:F.twitterUrl,children:(0,C.jsx)("i",{className:"icon-twitter"})})}),F.discordUrl&&(0,C.jsx)("li",{children:(0,C.jsx)("a",{href:F.discordUrl,children:(0,C.jsx)("i",{className:"icon-discord"})})}),F.other&&(0,C.jsx)("li",{children:(0,C.jsx)("a",{href:F.other,children:(0,C.jsx)("i",{className:"icon-medium"})})}),(0,C.jsx)("li",{children:(0,C.jsx)("a",{href:"#",children:(0,C.jsx)("i",{className:"icon-world"})})})]})})]}),(0,C.jsx)("span",{className:"border-shadow shadow-1"}),(0,C.jsx)("span",{className:"border-shadow shadow-2"}),(0,C.jsx)("span",{className:"border-shadow shadow-3"}),(0,C.jsx)("span",{className:"border-shadow shadow-4"}),(0,C.jsx)("span",{className:"hover-shape-bg hover_shape1"}),(0,C.jsx)("span",{className:"hover-shape-bg hover_shape2"}),(0,C.jsx)("span",{className:"hover-shape-bg hover_shape3"})]}),(0,C.jsxs)("div",{className:"row mt-30",children:[(0,C.jsx)("div",{className:"col-md-6",children:(0,C.jsxs)("div",{className:"project-item",children:[(0,C.jsx)("div",{className:"project-info",children:(0,C.jsxs)("h4",{className:"mb-30",children:[F.projectName,(0,C.jsx)("img",{src:"assets/images/project/project-heading-image.png",alt:"project"})]})}),(0,C.jsx)("div",{className:"project-content",children:(0,C.jsx)("div",{className:"project-media",children:(0,C.jsxs)("ul",{className:"project-listing",children:[(0,C.jsxs)("li",{children:["Token Distribution"," ",(0,C.jsxs)("span",{children:[v()(null===F||void 0===F?void 0:F.idoStartDate).fromNow()," ","To"," ",v()(null===F||void 0===F?void 0:F.idoEndDate).fromNow()]})]}),(0,C.jsxs)("li",{children:["Token Allocation"," ",(0,C.jsxs)("span",{children:[(0,t.mb)(null===R||void 0===R||null===(N=R.pool)||void 0===N?void 0:N.TokenAllocation,null===F||void 0===F?void 0:F.decimal)," ",null===F||void 0===F||null===(b=F.symbol)||void 0===b?void 0:b.toUpperCase()]})]}),(0,C.jsxs)("li",{children:["Ido is only For Whitelisted user"," ",(0,C.jsxs)("span",{children:[null!==R&&void 0!==R&&null!==(g=R.pool)&&void 0!==g&&g.UseWhiteList?"Yes":"No"," "]})]}),(0,C.jsxs)("li",{children:["Token Price"," ",(0,C.jsxs)("span",{children:["1"," ",null===F||void 0===F?void 0:F.pairCoin," ","="," ",(0,t.mb)(null===R||void 0===R||null===(w=R.pool)||void 0===w?void 0:w.TokenRate),null===F||void 0===F||null===(k=F.symbol)||void 0===k?void 0:k.toUpperCase()]})]}),(0,C.jsxs)("li",{children:["Softcap"," ",(0,C.jsx)("span",{children:(0,t.mb)(null===R||void 0===R||null===(y=R.pool)||void 0===y?void 0:y.SoftCap)})]}),(0,C.jsxs)("li",{children:["Hardcap"," ",(0,C.jsx)("span",{children:(0,t.mb)(null===R||void 0===R||null===(M=R.pool)||void 0===M?void 0:M.HardCap)})]}),(0,C.jsxs)("li",{children:["MinBuy"," ",(0,C.jsx)("span",{children:(0,t.mb)(null===R||void 0===R||null===(A=R.pool)||void 0===A?void 0:A.MinBuyPerUser)})]}),(0,C.jsxs)("li",{children:["MaxBuy"," ",(0,C.jsx)("span",{children:(0,t.mb)(null===R||void 0===R||null===(L=R.pool)||void 0===L?void 0:L.MaxBuyPerUser)})]}),(null===F||void 0===F?void 0:F.whiteList)&&(null===F||void 0===F?void 0:F.isWhiteListVisible)&&(0,C.jsxs)("li",{children:["Whitelisted user"," ",(0,C.jsx)("span",{children:(0,t.mb)(null===R||void 0===R||null===(E=R.pool)||void 0===E?void 0:E.MaxBuyPerUser)})]})]})})})]})}),(0,C.jsx)("div",{className:"col-md-6",children:(0,C.jsxs)("div",{className:"project-item",children:[(0,C.jsx)("div",{className:"project-info d-flex",children:(0,C.jsxs)("h4",{className:"mb-20",children:["Token Info"," ",(0,C.jsx)("img",{src:"assets/images/project/project-heading-image.png",alt:"project"})]})}),(0,C.jsx)("div",{className:"project-content",children:(0,C.jsx)(T,{ido:F})})]})})]}),(null===F||void 0===F?void 0:F.ownerAddress)===D&&(0,C.jsxs)("div",{className:"row mt-30",children:[(0,C.jsx)("div",{className:"col-md-6",children:(0,C.jsx)(U,{navigate:O})}),(0,C.jsx)("div",{className:"col-md-6 text-end",children:(0,C.jsxs)("button",{className:"readon white-shape-small",style:{cursor:"pointer"},onClick:Y,disabled:z.disabled,children:[(0,C.jsx)("span",{className:"btn-text",children:z.currentBtnText}),(0,C.jsx)("span",{className:"hover-shape1"}),(0,C.jsx)("span",{className:"hover-shape2"}),(0,C.jsx)("span",{className:"hover-shape3"})]})})]})]})})]})]})})})}},40162:function(e,s,i){var l=i(75721);s.Z=l.Z}}]);
//# sourceMappingURL=645.7a9a5972.chunk.js.map