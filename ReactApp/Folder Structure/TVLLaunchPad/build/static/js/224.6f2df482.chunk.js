"use strict";(self.webpackChunknewclient=self.webpackChunknewclient||[]).push([[224],{6853:function(e,t,s){var n=s(73971),o=s(40642),r=s(78376),i=s(86193),l=s(59434),a=s(57689),c=s(97117),h=s(80184);t.Z=function(e){var t=e.children,s=(0,n.Ge)().active,d=((0,a.s0)(),(0,l.v9)(c.q0).currentChainId);return s&&i.gm.includes(d)?t:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(r.Z,{}),(0,h.jsx)(o.Z,{})]})}},23224:function(e,t,s){s.r(t),s.d(t,{default:function(){return _}});var n=s(29439),o=s(92639),r=s(72791),i=function(e,t){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var s in t)t.hasOwnProperty(s)&&(e[s]=t[s])},i(e,t)};var l=function(){return l=Object.assign||function(e){for(var t,s=1,n=arguments.length;s<n;s++)for(var o in t=arguments[s])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},l.apply(this,arguments)};var a={Pixel:"Pixel",Percent:"Percent"},c={unit:a.Percent,value:.8};function h(e){return"number"===typeof e?{unit:a.Percent,value:100*e}:"string"===typeof e?e.match(/^(\d*(\.\d+)?)px$/)?{unit:a.Pixel,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:a.Percent,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),c):(console.warn("scrollThreshold should be string or number"),c)}var d=function(e){function t(t){var s=e.call(this,t)||this;return s.lastScrollTop=0,s.actionTriggered=!1,s.startY=0,s.currentY=0,s.dragging=!1,s.maxPullDownDistance=0,s.getScrollableTarget=function(){return s.props.scrollableTarget instanceof HTMLElement?s.props.scrollableTarget:"string"===typeof s.props.scrollableTarget?document.getElementById(s.props.scrollableTarget):(null===s.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},s.onStart=function(e){s.lastScrollTop||(s.dragging=!0,e instanceof MouseEvent?s.startY=e.pageY:e instanceof TouchEvent&&(s.startY=e.touches[0].pageY),s.currentY=s.startY,s._infScroll&&(s._infScroll.style.willChange="transform",s._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},s.onMove=function(e){s.dragging&&(e instanceof MouseEvent?s.currentY=e.pageY:e instanceof TouchEvent&&(s.currentY=e.touches[0].pageY),s.currentY<s.startY||(s.currentY-s.startY>=Number(s.props.pullDownToRefreshThreshold)&&s.setState({pullToRefreshThresholdBreached:!0}),s.currentY-s.startY>1.5*s.maxPullDownDistance||s._infScroll&&(s._infScroll.style.overflow="visible",s._infScroll.style.transform="translate3d(0px, "+(s.currentY-s.startY)+"px, 0px)")))},s.onEnd=function(){s.startY=0,s.currentY=0,s.dragging=!1,s.state.pullToRefreshThresholdBreached&&(s.props.refreshFunction&&s.props.refreshFunction(),s.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame((function(){s._infScroll&&(s._infScroll.style.overflow="auto",s._infScroll.style.transform="none",s._infScroll.style.willChange="unset")}))},s.onScrollListener=function(e){"function"===typeof s.props.onScroll&&setTimeout((function(){return s.props.onScroll&&s.props.onScroll(e)}),0);var t=s.props.height||s._scrollableNode?e.target:document.documentElement.scrollTop?document.documentElement:document.body;s.actionTriggered||((s.props.inverse?s.isElementAtTop(t,s.props.scrollThreshold):s.isElementAtBottom(t,s.props.scrollThreshold))&&s.props.hasMore&&(s.actionTriggered=!0,s.setState({showLoader:!0}),s.props.next&&s.props.next()),s.lastScrollTop=t.scrollTop)},s.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:t.dataLength},s.throttledOnScrollListener=function(e,t,s,n){var o,r=!1,i=0;function l(){o&&clearTimeout(o)}function a(){var a=this,c=Date.now()-i,h=arguments;function d(){i=Date.now(),s.apply(a,h)}r||(n&&!o&&d(),l(),void 0===n&&c>e?d():!0!==t&&(o=setTimeout(n?function(){o=void 0}:d,void 0===n?e-c:e)))}return"boolean"!==typeof t&&(n=s,s=t,t=void 0),a.cancel=function(){l(),r=!0},a}(150,s.onScrollListener).bind(s),s.onStart=s.onStart.bind(s),s.onMove=s.onMove.bind(s),s.onEnd=s.onEnd.bind(s),s}return function(e,t){function s(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(s.prototype=t.prototype,new s)}(t,e),t.prototype.componentDidMount=function(){if("undefined"===typeof this.props.dataLength)throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"===typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!==typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},t.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},t.prototype.componentDidUpdate=function(e){this.props.dataLength!==e.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},t.getDerivedStateFromProps=function(e,t){return e.dataLength!==t.prevDataLength?l(l({},t),{prevDataLength:e.dataLength}):null},t.prototype.isElementAtTop=function(e,t){void 0===t&&(t=.8);var s=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,n=h(t);return n.unit===a.Pixel?e.scrollTop<=n.value+s-e.scrollHeight+1:e.scrollTop<=n.value/100+s-e.scrollHeight+1},t.prototype.isElementAtBottom=function(e,t){void 0===t&&(t=.8);var s=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,n=h(t);return n.unit===a.Pixel?e.scrollTop+s>=e.scrollHeight-n.value:e.scrollTop+s>=n.value/100*e.scrollHeight},t.prototype.render=function(){var e=this,t=l({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),s=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),n=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return r.createElement("div",{style:n,className:"infinite-scroll-component__outerdiv"},r.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(t){return e._infScroll=t},style:t},this.props.pullDownToRefresh&&r.createElement("div",{style:{position:"relative"},ref:function(t){return e._pullDown=t}},r.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!s&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},t}(r.Component),p=d,u=s(59434),m=s(42483),f=s(97117),v=s(1413),g=s(72426),x=s.n(g),j=s(57689),b=s(2703),w=s(80184),N=function(e){var t=e.ido,s=e.status,n=(0,j.s0)();return(0,w.jsxs)("div",{className:"col-lg-4 col-md-6",onClick:function(){n("/ido-details",{state:(0,v.Z)((0,v.Z)({},t),{},{status:s})})},children:[(0,w.jsxs)("div",{className:"project-shape-item hover-shape-border",children:[(0,w.jsxs)("div",{className:"project-item ",children:[(0,w.jsxs)("div",{className:"project-info",children:[(0,w.jsx)("a",{children:(0,w.jsx)("img",{src:t.projectCover||"assets/images/project/explore.png",alt:"Explore-Image",height:200,width:310,style:{height:"200px"}})}),(0,w.jsxs)("div",{className:"project-auother",children:[(0,w.jsx)("h4",{className:"mb-10",children:(0,w.jsx)("a",{children:t.projectName})}),(0,w.jsxs)("div",{className:"dsc",children:["price (",null===t||void 0===t?void 0:t.pairCoin,") ="," ",(0,b.mb)(null===t||void 0===t?void 0:t.tokenRate)," ",null===t||void 0===t?void 0:t.symbol]})]})]}),(0,w.jsxs)("div",{className:"project-content",children:[(0,w.jsxs)("div",{className:"project-header d-flex justify-content-between",children:[(0,w.jsx)("div",{className:"heading-title",children:(0,w.jsx)("h4",{children:x()(null===t||void 0===t?void 0:t.idoStartDate).fromNow()})}),(0,w.jsx)("div",{className:"project-icon",children:(0,w.jsx)("img",{src:(0,b.Vz)(null===t||void 0===t?void 0:t.blockchainPlateform),alt:"Project-Image"})})]}),(0,w.jsx)("div",{className:"project-media",children:(0,w.jsxs)("ul",{className:"project-listing",children:[(0,w.jsxs)("li",{children:["Token allocation"," ",(0,w.jsxs)("span",{children:[(0,b.mb)(null===t||void 0===t?void 0:t.tokenAllocation)," ",null===t||void 0===t?void 0:t.symbol]})]}),(0,w.jsxs)("li",{children:["Targeted raise"," ",(0,w.jsxs)("span",{children:[(0,b.mb)(null===t||void 0===t?void 0:t.hardCap)," ",null===t||void 0===t?void 0:t.symbol]})]})]})})]}),(0,w.jsx)("span",{className:"border-shadow shadow-1"}),(0,w.jsx)("span",{className:"border-shadow shadow-2"}),(0,w.jsx)("span",{className:"border-shadow shadow-3"}),(0,w.jsx)("span",{className:"border-shadow shadow-4"})]}),(0,w.jsx)("div",{className:"icon-listing",children:(0,w.jsxs)("ul",{className:"social-icon-list",children:[t.telegramUrl&&(0,w.jsx)("li",{children:(0,w.jsx)("a",{href:t.telegramUrl,target:"_blank",rel:"noreferrer",children:(0,w.jsx)("i",{className:"icon-telegram"})})}),t.twitterUrl&&(0,w.jsx)("li",{children:(0,w.jsx)("a",{href:t.twitterUrl,children:(0,w.jsx)("i",{className:"icon-twitter"})})}),t.discordUrl&&(0,w.jsx)("li",{children:(0,w.jsx)("a",{href:t.discordUrl,children:(0,w.jsx)("i",{className:"icon-discord"})})}),t.other&&(0,w.jsx)("li",{children:(0,w.jsx)("a",{href:t.other,children:(0,w.jsx)("i",{className:"icon-medium"})})}),(0,w.jsx)("li",{children:(0,w.jsx)("a",{href:"#",children:(0,w.jsx)("i",{className:"icon-world"})})})]})})]}),(0,w.jsx)("span",{className:"border-shadow shadow-1"}),(0,w.jsx)("span",{className:"border-shadow shadow-2"}),(0,w.jsx)("span",{className:"border-shadow shadow-3"}),(0,w.jsx)("span",{className:"border-shadow shadow-4"})]})},y=s(64554),T=s(86193),E=s(80757),S=s(7788),L=s(11087),D=s(6853),_=function(){var e=(0,u.I0)(),t=(0,r.useState)(""),s=(0,n.Z)(t,2),i=s[0],l=s[1],a=(0,u.v9)(f.q0),c=a.loading,h=a.data,d=a.hasMore,v=a.currentChainId,g=a.idoStatus,x=(0,r.useState)(),j=(0,n.Z)(x,2),b=j[0],_=j[1],P=(0,r.useCallback)((function(){var t={status:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"OPEN_IDO",reset:arguments.length>0&&void 0!==arguments[0]&&arguments[0]};i&&(t.search=i),b&&(t.chain=b),e((0,m.SY)(t))}),[e,i,b]),C=function(e){e.preventDefault(),v&&P(!0,g)};return(0,r.useEffect)((function(){if(v){var e=T.Lb.find((function(e){return e.chainId===v}));e&&_(e.name,g)}}),[v]),(0,r.useEffect)((function(){b&&P(!0)}),[b]),console.log("fsfsf",d),(0,w.jsxs)(w.Fragment,{children:[c&&(0,w.jsx)(o.Z,{}),(0,w.jsx)(D.Z,{children:(0,w.jsxs)(E.Z,{children:[(0,w.jsx)(S.Z,{}),(0,w.jsxs)(y.Z,{children:[(0,w.jsx)("div",{className:"gamfi-breadcrumbs-section",children:(0,w.jsx)("div",{className:"container",children:(0,w.jsxs)("div",{className:"row",children:[(0,w.jsx)("div",{className:"col-lg-5",children:(0,w.jsxs)("div",{className:"breadcrumbs-area sec-heading",children:[(0,w.jsxs)("div",{style:{position:"relative"},className:"sub-inner mb-15",children:[(0,w.jsx)(L.rU,{className:"breadcrumbs-link",to:"/",children:"Home"}),(0,w.jsx)("span",{className:"sub-title",children:"Projects"}),(0,w.jsx)("img",{className:"heading-left-image",src:"assets/images/icons/steps.png",alt:"Steps-Image"})]}),(0,w.jsx)("h2",{className:"title mb-0",children:"Explore Igos"})]})}),(0,w.jsxs)("div",{className:"col-lg-7 breadcrumbs-form md-mt-40",children:[(0,w.jsxs)("form",{onSubmit:C,children:[(0,w.jsx)("input",{type:"text",id:"Search",name:"search",placeholder:"Search by name, token, address",value:i,onInput:function(e){return l(e.target.value)}}),(0,w.jsxs)("span",{className:"submit",children:[(0,w.jsx)("i",{className:"icon-search",onClick:C}),(0,w.jsx)("input",{type:"submit"})]})]}),(0,w.jsx)("div",{className:"btn-area",children:(0,w.jsx)(L.rU,{to:"/calendar",children:(0,w.jsxs)("a",{className:"readon black-shape",children:[(0,w.jsx)("i",{className:"icon-calendar"}),(0,w.jsx)("span",{className:"btn-text",children:"Calendar"}),(0,w.jsx)("span",{className:"hover-shape1"}),(0,w.jsx)("span",{className:"hover-shape2"}),(0,w.jsx)("span",{className:"hover-shape3"})]})})})]})]})})}),(0,w.jsx)("div",{className:"gamfi-explore-content gamfi-previous-section pt-70 md-pt-80 pb-110 md-pb-50",children:(0,w.jsxs)("div",{className:"container",children:[(0,w.jsx)("div",{className:"project-menu-area d-flex align-items-center justify-content-between",children:(0,w.jsx)("div",{className:"project-left-menu",children:(0,w.jsxs)("ul",{className:"nav",id:"myTab",role:"tablist",children:[(0,w.jsx)("li",{className:"nav-item",role:"presentation",children:(0,w.jsx)("button",{className:"tab-link active",id:"home-tab","data-bs-toggle":"tab","data-bs-target":"#open-igo",type:"button",role:"tab","aria-controls":"open-igo","aria-selected":"true",onClick:function(){return P(!0,"OPEN_IDO")},children:"OPEN IGO"})}),(0,w.jsx)("li",{className:"nav-item",role:"presentation",children:(0,w.jsx)("button",{className:"tab-link",id:"profile-tab","data-bs-toggle":"tab","data-bs-target":"#upcoming",type:"button",role:"tab","aria-controls":"upcoming","aria-selected":"false",onClick:function(){return P(!0,"UPCOMING")},children:"Upcoming"})}),(0,w.jsx)("li",{className:"nav-item",role:"presentation",children:(0,w.jsx)("button",{className:"tab-link",id:"contact-tab","data-bs-toggle":"tab","data-bs-target":"#past-igo",type:"button",role:"tab","aria-controls":"past-igo","aria-selected":"false",onClick:function(){return P(!0,"PAST_IDO")},children:"Past IGO"})})]})})}),(0,w.jsx)(p,{next:function(){return P(!1,g)},dataLength:h.length,hasMore:!!v&&(!!h.length&&d),loader:(0,w.jsx)("h4",{style:{textAlign:"center"},children:"Loading..."}),children:(0,w.jsx)("div",{className:"tab-content",id:"myTabContent",children:(0,w.jsx)("div",{className:"tab-pane fade show active",id:"open-igo",role:"tabpanel","aria-labelledby":"home-tab",children:(0,w.jsx)("div",{className:"row align-items-center",children:null===h||void 0===h?void 0:h.map((function(e,t){return(0,w.jsx)(N,{status:g,ido:e},t)}))})})})})]})})]})]})})]})}}}]);
//# sourceMappingURL=224.6f2df482.chunk.js.map