!function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports.self=t():e.self=t()}(this,(function(){return(this.webpackJsonpself=this.webpackJsonpself||[]).push([[78],{"6i8w":function(e,t,n){"use strict";n.r(t);var a=n("JX7q"),i=n("rePB"),s=n("1OyB"),r=n("vuIU"),o=n("Ji7U"),l=n("md7G"),c=n("foSv"),u=n("q1tI"),p=n.n(u),m=n("jwaz"),d=n("IP2g"),h=n("0ci1"),b=n("ANjH"),y=n("/MKj"),g=n("wHSu"),f=n("tCCL"),v=n("qGWM"),I=n("8Kt/"),k=n.n(I),w=p.a.createElement;function O(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=Object(c.a)(e);if(t){var i=Object(c.a)(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return Object(l.a)(this,n)}}var j=function(e){Object(o.a)(n,e);var t=O(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.props.pageChangeHeaderTitle("Portlet Tab"),this.props.breadcrumbChange([{text:"Dashboard",link:"/"},{text:"Portlet"},{text:"Tab",link:"/portlet/tab"}])}},{key:"render",value:function(){return w(p.a.Fragment,null,w(k.a,null,w("title",null,"Portlet Tab | Panely")),w(m.t,{fluid:!0},w(m.Q,null,w(m.r,{md:"4"},w(L,null)),w(m.r,{md:"4"},w(P,null)),w(m.r,{md:"4"},w(N,null))),w(m.Q,null,w(m.r,{md:"6"},w(T,null),w(C,null)),w(m.r,{md:"6"},w(x,null),w(A,null)))))}}]),n}(p.a.Component),L=function(e){Object(o.a)(n,e);var t=O(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),Object(i.a)(Object(a.a)(e),"state",{activeTab:1}),Object(i.a)(Object(a.a)(e),"toggle",(function(t){e.state.activeTab!==t&&e.setState({activeTab:t})})),e}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=this.state.activeTab;return w(m.N,null,w(m.N.Header,{bordered:!0},w(m.N.Title,null,"Line"),w(m.N.Addon,null,w(m.K,{lines:!0,portlet:!0},w(m.K.Item,{active:1===t,onClick:function(){return e.toggle(1)}},"Home"),w(m.K.Item,{active:2===t,onClick:function(){return e.toggle(2)}},"Profile"),w(m.K.Item,{active:3===t,onClick:function(){return e.toggle(3)}},"Contact")))),w(m.N.Body,null,w(m.U,{activeTab:t},w(m.U.Pane,{tabId:1},w("p",{className:"mb-0"},"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")),w(m.U.Pane,{tabId:2},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged")),w(m.U.Pane,{tabId:3},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containLorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")))))}}]),n}(p.a.Component),P=function(e){Object(o.a)(n,e);var t=O(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),Object(i.a)(Object(a.a)(e),"state",{activeTab:1}),Object(i.a)(Object(a.a)(e),"toggle",(function(t){e.state.activeTab!==t&&e.setState({activeTab:t})})),e}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=this.state.activeTab;return w(m.N,null,w(m.N.Header,{bordered:!0},w(m.N.Title,null,"Pill"),w(m.N.Addon,null,w(m.K,{pills:!0,portlet:!0},w(m.K.Item,{active:1===t,onClick:function(){return e.toggle(1)}},"Home"),w(m.K.Item,{active:2===t,onClick:function(){return e.toggle(2)}},"Profile"),w(m.K.Item,{active:3===t,onClick:function(){return e.toggle(3)}},"Contact")))),w(m.N.Body,null,w(m.U,{activeTab:t},w(m.U.Pane,{tabId:1},w("p",{className:"mb-0"},"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")),w(m.U.Pane,{tabId:2},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged")),w(m.U.Pane,{tabId:3},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containLorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")))))}}]),n}(p.a.Component),N=function(e){Object(o.a)(n,e);var t=O(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),Object(i.a)(Object(a.a)(e),"state",{activeTab:1}),Object(i.a)(Object(a.a)(e),"toggle",(function(t){e.state.activeTab!==t&&e.setState({activeTab:t})})),e}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=this.state.activeTab;return w(m.N,null,w(m.N.Header,{bordered:!0},w(m.N.Title,null,"Tab"),w(m.N.Addon,null,w(m.K,{tabs:!0,portlet:!0},w(m.K.Item,{active:1===t,onClick:function(){return e.toggle(1)}},"Home"),w(m.K.Item,{active:2===t,onClick:function(){return e.toggle(2)}},"Profile"),w(m.K.Item,{active:3===t,onClick:function(){return e.toggle(3)}},"Contact")))),w(m.N.Body,null,w(m.U,{activeTab:t},w(m.U.Pane,{tabId:1},w("p",{className:"mb-0"},"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")),w(m.U.Pane,{tabId:2},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged")),w(m.U.Pane,{tabId:3},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containLorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")))))}}]),n}(p.a.Component),T=function(e){Object(o.a)(n,e);var t=O(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),Object(i.a)(Object(a.a)(e),"state",{activeTab:1}),Object(i.a)(Object(a.a)(e),"toggle",(function(t){e.state.activeTab!==t&&e.setState({activeTab:t})})),e}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=this.state.activeTab;return w(m.N,null,w(m.N.Header,{bordered:!0},w(m.N.Icon,null,w(d.a,{icon:g.pb})),w(m.N.Title,null,"Icon"),w(m.N.Addon,null,w(m.K,{lines:!0,portlet:!0},w(m.K.Item,{active:1===t,onClick:function(){return e.toggle(1)}},"Home"),w(m.K.Item,{active:2===t,onClick:function(){return e.toggle(2)}},"Profile"),w(m.K.Item,{active:3===t,onClick:function(){return e.toggle(3)}},"Contact")))),w(m.N.Body,null,w(m.U,{activeTab:t},w(m.U.Pane,{tabId:1},w("p",{className:"mb-0"},"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")),w(m.U.Pane,{tabId:2},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged")),w(m.U.Pane,{tabId:3},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containLorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")))))}}]),n}(p.a.Component),C=function(e){Object(o.a)(n,e);var t=O(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),Object(i.a)(Object(a.a)(e),"state",{activeTab:1}),Object(i.a)(Object(a.a)(e),"toggle",(function(t){e.state.activeTab!==t&&e.setState({activeTab:t})})),e}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=this.state.activeTab;return w(m.N,null,w(m.N.Header,{bordered:!0},w(m.N.Title,null,"Dropdown"),w(m.N.Addon,null,w(m.K,{pills:!0,portlet:!0},w(m.K.Item,{active:1===t,onClick:function(){return e.toggle(1)}},"Home"),w(m.K.Item,{active:2===t,onClick:function(){return e.toggle(2)}},"Profile"),w(m.w.Uncontrolled,{nav:!0},w(m.w.Toggle,{nav:!0,caret:!0},"Dropdown"),w(m.w.Menu,null,w(m.w.Item,null,"Action"),w(m.w.Item,null,"Another Action"),w(m.w.Item,null,"Something else here"),w(m.w.Divider,null),w(m.w.Item,null,"Separated link"))),w(m.K.Item,{active:3===t,onClick:function(){return e.toggle(3)}},"Contact")))),w(m.N.Body,null,w(m.U,{activeTab:t},w(m.U.Pane,{tabId:1},w("p",{className:"mb-0"},"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")),w(m.U.Pane,{tabId:2},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged")),w(m.U.Pane,{tabId:3},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containLorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")))),w(m.N.Footer,{bordered:!0,align:"right"},w(m.h,{variant:"primary"},"Submit")," ",w(m.h,{variant:"outline-secondary"},"Cancel")))}}]),n}(p.a.Component),x=function(e){Object(o.a)(n,e);var t=O(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),Object(i.a)(Object(a.a)(e),"state",{activeTab:1}),Object(i.a)(Object(a.a)(e),"toggle",(function(t){e.state.activeTab!==t&&e.setState({activeTab:t})})),e}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=this.state.activeTab;return w(m.N,null,w(m.N.Header,{bordered:!0},w(m.N.Icon,null,w(d.a,{icon:g.kb})),w(m.N.Title,null,"Footer"),w(m.N.Addon,null,w(m.K,{pills:!0,portlet:!0},w(m.K.Item,{active:1===t,onClick:function(){return e.toggle(1)}},"Home"),w(m.K.Item,{active:2===t,onClick:function(){return e.toggle(2)}},"Profile"),w(m.K.Item,{active:3===t,onClick:function(){return e.toggle(3)}},"Contact")))),w(m.N.Body,null,w(m.U,{activeTab:t},w(m.U.Pane,{tabId:1},w("p",{className:"mb-0"},"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")),w(m.U.Pane,{tabId:2},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged")),w(m.U.Pane,{tabId:3},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containLorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")))),w(m.N.Footer,{bordered:!0,align:"right"},w(m.h,{variant:"primary"},"Submit")," ",w(m.h,{variant:"outline-secondary"},"Cancel")))}}]),n}(p.a.Component),A=function(e){Object(o.a)(n,e);var t=O(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),Object(i.a)(Object(a.a)(e),"state",{activeTab:1}),Object(i.a)(Object(a.a)(e),"toggle",(function(t){e.state.activeTab!==t&&e.setState({activeTab:t})})),e}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=this.state.activeTab;return w(m.N,null,w(m.N.Header,{bordered:!0},w(m.N.Addon,null,w(m.K,{lines:!0,portlet:!0},w(m.K.Item,{active:1===t,onClick:function(){return e.toggle(1)}},"Home"),w(m.K.Item,{active:2===t,onClick:function(){return e.toggle(2)}},"Profile"),w(m.K.Item,{active:3===t,onClick:function(){return e.toggle(3)}},"Contact")))),w(m.N.Body,null,w(m.U,{activeTab:t},w(m.U.Pane,{tabId:1},w("p",{className:"mb-0"},"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")),w(m.U.Pane,{tabId:2},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged")),w(m.U.Pane,{tabId:3},w("p",{className:"mb-0"},"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containLorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")))))}}]),n}(p.a.Component);t.default=Object(y.b)(null,(function(e){return Object(b.bindActionCreators)({pageChangeHeaderTitle:h.e,breadcrumbChange:h.c},e)}))(Object(v.a)(Object(f.a)(j)))},"6mFH":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/portlet/tab",function(){return n("6i8w")}])},qGWM:function(e,t,n){"use strict";var a=n("o0o1"),i=n.n(a),s=n("rePB"),r=n("HaE+"),o=n("1OyB"),l=n("vuIU"),c=n("Ji7U"),u=n("md7G"),p=n("foSv"),m=n("q1tI"),d=n.n(m),h=n("ANjH"),b=n("0ci1"),y=n("/MKj"),g=n("qP+2"),f=n("nOHt"),v=n.n(f),I=n("s6m4"),k=d.a.createElement;function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function j(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=Object(p.a)(e);if(t){var i=Object(p.a)(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return Object(u.a)(this,n)}}t.a=function(e){var t=function(t){Object(c.a)(a,t);var n=j(a);function a(){return Object(o.a)(this,a),n.apply(this,arguments)}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.props.firebaseChange(this.props.firebase)}},{key:"render",value:function(){return k(e,this.props)}}],[{key:"getInitialProps",value:function(){var t=Object(r.a)(i.a.mark((function t(n){var a,s;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a={},!e.getInitialProps){t.next=5;break}return t.next=4,e.getInitialProps(n);case 4:a=t.sent;case 5:return t.next=7,Object(g.a)(n);case 7:if(s=t.sent){t.next=11;break}return n.res?(n.res.writeHead(302,{Location:I.a.loginPagePath}),n.res.end()):v.a.push(I.a.loginPagePath),t.abrupt("return",O(O({},a),{},{firebase:null}));case 11:return t.abrupt("return",O(O({},a),{},{firebase:s}));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),a}(d.a.Component);return Object(y.b)(null,(function(e){return Object(h.bindActionCreators)({firebaseChange:b.d},e)}))(t)}}},[["6mFH",0,1,3,2,4,5,6,7]]])}));