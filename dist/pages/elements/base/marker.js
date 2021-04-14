!function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports.self=t():e.self=t()}(this,(function(){return(this.webpackJsonpself=this.webpackJsonpself||[]).push([[50],{"0ODw":function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/elements/base/marker",function(){return r("BA92")}])},BA92:function(e,t,r){"use strict";r.r(t);var n=r("1OyB"),a=r("vuIU"),i=r("Ji7U"),l=r("md7G"),c=r("foSv"),o=r("q1tI"),u=r.n(o),s=r("jwaz"),p=r("IP2g"),y=r("0ci1"),f=r("ANjH"),d=r("/MKj"),b=r("wHSu"),v=r("tCCL"),m=r("qGWM"),h=r("8Kt/"),g=r.n(h),O=u.a.createElement;function I(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(c.a)(e);if(t){var a=Object(c.a)(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return Object(l.a)(this,r)}}var j=function(e){Object(i.a)(r,e);var t=I(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"componentDidMount",value:function(){this.props.pageChangeHeaderTitle("Marker"),this.props.breadcrumbChange([{text:"Dashboard",link:"/"},{text:"Elements"},{text:"Base"},{text:"Marker",link:"/elements/base/marker"}])}},{key:"render",value:function(){return O(u.a.Fragment,null,O(g.a,null,O("title",null,"Marker | Panely")),O(s.t,{fluid:!0},O(s.Q,null,O(s.r,{xs:"12"},O(s.N,null,O(s.N.Header,{bordered:!0},O(s.N.Title,null,"Basic")),O(s.N.Body,null,O("p",null,O("strong",null,"Marker")," is component that you can use for marking something with shape and color, you can combine it with many components. Marker by default has 3 different shapes, like the example below. Change marker color by applying"," ",O("code",null,"variant")," property"),O(s.Q,null,O(s.r,{md:"4"},O(s.N,{className:"mb-md-0"},O(s.N.Header,{bordered:!0},O(s.N.Title,null,"Dot")),O(s.N.Body,null,O("p",null,"Apply ",O("code",null,'type="dot"')," property for this shape"),O(s.v,null,O(s.I,{type:"dot",variant:"primary"})," ",O(s.I,{type:"dot",variant:"secondary"})," ",O(s.I,{type:"dot",variant:"info"})," ",O(s.I,{type:"dot",variant:"success"})," ",O(s.I,{type:"dot",variant:"warning"})," ",O(s.I,{type:"dot",variant:"danger"})," ",O(s.I,{type:"dot",variant:"dark"})," ",O(s.I,{type:"dot",variant:"light"}))))),O(s.r,{md:"4"},O(s.N,{className:"mb-md-0"},O(s.N.Header,{bordered:!0},O(s.N.Title,null,"Circle")),O(s.N.Body,null,O("p",null,"Apply ",O("code",null,'type="circle"')," property for this shape"),O(s.v,null,O(s.I,{type:"circle",variant:"primary"})," ",O(s.I,{type:"circle",variant:"secondary"})," ",O(s.I,{type:"circle",variant:"info"})," ",O(s.I,{type:"circle",variant:"success"})," ",O(s.I,{type:"circle",variant:"warning"})," ",O(s.I,{type:"circle",variant:"danger"})," ",O(s.I,{type:"circle",variant:"dark"})," ",O(s.I,{type:"circle",variant:"light"}))))),O(s.r,{md:"4"},O(s.N,{className:"mb-0"},O(s.N.Header,{bordered:!0},O(s.N.Title,null,"Pill")),O(s.N.Body,null,O("p",null,"Apply ",O("code",null,'type="pill"')," property for this shape"),O(s.v,null,O(s.I,{type:"pill",variant:"primary"})," ",O(s.I,{type:"pill",variant:"secondary"})," ",O(s.I,{type:"pill",variant:"info"})," ",O(s.I,{type:"pill",variant:"success"})," ",O(s.I,{type:"pill",variant:"warning"})," ",O(s.I,{type:"pill",variant:"danger"})," ",O(s.I,{type:"pill",variant:"dark"})," ",O(s.I,{type:"pill",variant:"light"})))))))))),O(s.Q,null,O(s.r,{md:"6"},O(s.N,{className:"mb-md-0"},O(s.N.Header,{bordered:!0},O(s.N.Title,null,"Sizing")),O(s.N.Body,null,O("p",null,"Change marker size to smaller or larger by setting ",O("code",null,"size")," property with ",O("code",null,"sm|lg")),O(s.v,null,O(s.I,{type:"dot",variant:"primary",size:"sm"})," ",O(s.I,{type:"dot",variant:"success"})," ",O(s.I,{type:"dot",variant:"danger",size:"lg"})," ",O(s.I,{type:"circle",variant:"primary",size:"sm"})," ",O(s.I,{type:"circle",variant:"success"})," ",O(s.I,{type:"circle",variant:"danger",size:"lg"})," ",O(s.I,{type:"pill",variant:"primary",size:"sm"})," ",O(s.I,{type:"pill",variant:"success"})," ",O(s.I,{type:"pill",variant:"danger",size:"lg"}))))),O(s.r,{md:"6"},O(s.N,{className:"mb-md-0"},O(s.N.Header,{bordered:!0},O(s.N.Title,null,"Usage")),O(s.N.Body,null,O("p",null,"You can use marker element together with several elements."),O(s.h,{variant:"primary"},"Button",O(s.h.Marker,null,O(s.I,{type:"dot",variant:"success"})))," ",O(s.h,{icon:!0,variant:"primary"},O(p.a,{icon:b.Cb}),O(s.h.Marker,null,O(s.I,{type:"dot",variant:"success"})))))))))}}]),r}(u.a.Component);t.default=Object(d.b)(null,(function(e){return Object(f.bindActionCreators)({pageChangeHeaderTitle:y.e,breadcrumbChange:y.c},e)}))(Object(m.a)(Object(v.a)(j)))},qGWM:function(e,t,r){"use strict";var n=r("o0o1"),a=r.n(n),i=r("rePB"),l=r("HaE+"),c=r("1OyB"),o=r("vuIU"),u=r("Ji7U"),s=r("md7G"),p=r("foSv"),y=r("q1tI"),f=r.n(y),d=r("ANjH"),b=r("0ci1"),v=r("/MKj"),m=r("qP+2"),h=r("nOHt"),g=r.n(h),O=r("s6m4"),I=f.a.createElement;function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function N(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){Object(i.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function k(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(p.a)(e);if(t){var a=Object(p.a)(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return Object(s.a)(this,r)}}t.a=function(e){var t=function(t){Object(u.a)(n,t);var r=k(n);function n(){return Object(c.a)(this,n),r.apply(this,arguments)}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.props.firebaseChange(this.props.firebase)}},{key:"render",value:function(){return I(e,this.props)}}],[{key:"getInitialProps",value:function(){var t=Object(l.a)(a.a.mark((function t(r){var n,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n={},!e.getInitialProps){t.next=5;break}return t.next=4,e.getInitialProps(r);case 4:n=t.sent;case 5:return t.next=7,Object(m.a)(r);case 7:if(i=t.sent){t.next=11;break}return r.res?(r.res.writeHead(302,{Location:O.a.loginPagePath}),r.res.end()):g.a.push(O.a.loginPagePath),t.abrupt("return",N(N({},n),{},{firebase:null}));case 11:return t.abrupt("return",N(N({},n),{},{firebase:i}));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),n}(f.a.Component);return Object(v.b)(null,(function(e){return Object(d.bindActionCreators)({firebaseChange:b.d},e)}))(t)}}},[["0ODw",0,1,3,2,4,5,6,7]]])}));