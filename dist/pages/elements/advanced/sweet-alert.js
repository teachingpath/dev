!function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports.self=t():e.self=t()}(this,(function(){return(this.webpackJsonpself=this.webpackJsonpself||[]).push([[39],{G00F:function(e,t,n){"use strict";n.r(t);var r=n("JX7q"),a=n("rePB"),o=n("1OyB"),i=n("vuIU"),c=n("Ji7U"),l=n("md7G"),u=n("foSv"),s=n("q1tI"),f=n.n(s),h=n("jwaz"),m=n("IP2g"),p=n("0ci1"),b=n("ANjH"),d=n("/MKj"),g=n("wHSu"),O=n("2BYM"),v=n.n(O),j=n("tCCL"),C=n("qGWM"),y=n("8Kt/"),w=n.n(y),k=n("sXnO"),x=f.a.createElement;function A(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(u.a)(e);if(t){var a=Object(u.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var B=v()(k.a),P=B.mixin({customClass:{confirmButton:"btn btn-label-success btn-wide mx-1",cancelButton:"btn btn-label-danger btn-wide mx-1"},buttonsStyling:!1}),T=B.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,onOpen:function(e){e.addEventListener("mouseenter",B.stopTimer),e.addEventListener("mouseleave",B.resumeTimer)}}),N=function(e){Object(c.a)(n,e);var t=A(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.props.pageChangeHeaderTitle("Sweet Alert"),this.props.breadcrumbChange([{text:"Dashboard",link:"/"},{text:"Elements"},{text:"Advanced"},{text:"Sweet Alert",link:"/elements/advanced/sweet-alert"}])}},{key:"render",value:function(){return x(f.a.Fragment,null,x(w.a,null,x("title",null,"Sweet Alert | Panely")),x(h.t,{fluid:!0},x(h.Q,null,x(h.r,{xs:"12"},x(h.N,null,x(h.N.Header,{bordered:!0},x(h.N.Title,null,"Sweet Alert")),x(h.N.Body,null,x("p",null,x("strong",null,"Sweet alert")," is a beautiful, responsive, customizable, accessible replacement for javascripts's popup boxes with zero dependencies. Check"," ",x("a",{href:"http://sweetalert2.github.io",target:"_blank"},"Sweet Alert's page")," ","for more info."),x("hr",null),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"Basic example"),x(h.r,{sm:"8",lg:"9"},x(G,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"Title with a text under"),x(h.r,{sm:"8",lg:"9"},x(F,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"More complex modal"),x(h.r,{sm:"8",lg:"9"},x(S,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"Custom HTML description"),x(h.r,{sm:"8",lg:"9"},x(L,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"Dialog position"),x(h.r,{sm:"8",lg:"9"},x(I,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"Confirm dialog"),x(h.r,{sm:"8",lg:"9"},x(H,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"Custom image"),x(h.r,{sm:"8",lg:"9"},x(M,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"Auto close timer"),x(h.r,{sm:"8",lg:"9"},x(R,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"AJAX request"),x(h.r,{sm:"8",lg:"9"},x(q,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"Chaining modals"),x(h.r,{sm:"8",lg:"9"},x(E,null))),x(h.A.Group,{row:!0},x(h.F,{sm:"4",lg:"3",className:"text-muted text-sm-right"},"Toast"),x(h.r,{sm:"8",lg:"9"},x(D,null)))))))))}}]),n}(f.a.Component),G=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){P.fire("Any fool can use a computer")})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),F=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){P.fire("The Internet?","That thing is still around?","question")})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),S=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){P.fire({icon:"error",title:"Oops...",text:"Something went wrong!",footer:x("a",{href:"#"},"Why do I have this issue?")})})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),L=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){P.fire({title:x("strong",null,"HTML ",x("u",null,"example")),icon:"info",html:x(f.a.Fragment,null,"You can use ",x("b",null,"bold text"),", ",x("a",{href:"https://sweetalert2.github.io/"},"links")," and other HTML tag"),showCloseButton:!0,showCancelButton:!0,focusConfirm:!1,confirmButtonText:x(f.a.Fragment,null,x(m.a,{icon:g.Gb})," Great!"),confirmButtonAriaLabel:"Thumbs up, great!",cancelButtonText:x(m.a,{icon:g.Fb}),cancelButtonAriaLabel:"Thumbs down"})})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),I=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){P.fire({position:"top-end",icon:"success",title:"Your work has been saved",showConfirmButton:!1,timer:1500})})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),H=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){P.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(e){e.value&&P.fire("Deleted!","Your file has been deleted.","success")}))})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),M=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){P.fire({title:"Sweet!",text:"Modal with a custom image.",imageUrl:"https://unsplash.it/400/200",imageWidth:400,imageHeight:200,imageAlt:"Custom image"})})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),R=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){var e;P.fire({title:"Auto close alert!",html:x(f.a.Fragment,null,'"I will close in ',x("b",null),' milliseconds."'),timer:2e3,timerProgressBar:!0,onBeforeOpen:function(){P.showLoading(),e=setInterval((function(){var e=P.getContent();if(e){var t=e.querySelector("b");t&&(t.textContent=P.getTimerLeft())}}),100)},onClose:function(){clearInterval(e)}}).then((function(e){e.dismiss===P.DismissReason.timer&&console.log("I was closed by the timer")}))})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),q=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){P.fire({title:"Submit your Github username",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Look up",showLoaderOnConfirm:!0,preConfirm:function(e){return fetch("https://api.github.com/users/".concat(e)).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()})).catch((function(e){P.showValidationMessage("Request failed: ".concat(e))}))},allowOutsideClick:function(){return!P.isLoading()}}).then((function(e){e.value&&P.fire({title:"".concat(e.value.login,"'s avatar"),imageUrl:e.value.avatar_url})}))})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),E=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){P.mixin({input:"text",confirmButtonText:"Next &rarr;",showCancelButton:!0,progressSteps:["1","2","3"]}).queue([{title:"Question 1",text:"Chaining swal2 modals is easy"},"Question 2","Question 3"]).then((function(e){if(e.value){var t=JSON.stringify(e.value);P.fire({title:"All done!",html:x(f.a.Fragment,null,"Your answers: ",x("pre",null,x("code",null,t))),confirmButtonText:"Lovely!"})}}))})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component),D=function(e){Object(c.a)(n,e);var t=A(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];return e=t.call.apply(t,[this].concat(c)),Object(a.a)(Object(r.a)(e),"handleClick",(function(){T.fire({icon:"success",title:"Signed in successfully"})})),e}return Object(i.a)(n,[{key:"render",value:function(){return x(h.h,{onClick:this.handleClick},"Click me")}}]),n}(f.a.Component);t.default=Object(d.b)(null,(function(e){return Object(b.bindActionCreators)({pageChangeHeaderTitle:p.e,breadcrumbChange:p.c},e)}))(Object(C.a)(Object(j.a)(N)))},OZ4L:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/elements/advanced/sweet-alert",function(){return n("G00F")}])},qGWM:function(e,t,n){"use strict";var r=n("o0o1"),a=n.n(r),o=n("rePB"),i=n("HaE+"),c=n("1OyB"),l=n("vuIU"),u=n("Ji7U"),s=n("md7G"),f=n("foSv"),h=n("q1tI"),m=n.n(h),p=n("ANjH"),b=n("0ci1"),d=n("/MKj"),g=n("qP+2"),O=n("nOHt"),v=n.n(O),j=n("s6m4"),C=m.a.createElement;function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function k(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var a=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(s.a)(this,n)}}t.a=function(e){var t=function(t){Object(u.a)(r,t);var n=k(r);function r(){return Object(c.a)(this,r),n.apply(this,arguments)}return Object(l.a)(r,[{key:"componentDidMount",value:function(){this.props.firebaseChange(this.props.firebase)}},{key:"render",value:function(){return C(e,this.props)}}],[{key:"getInitialProps",value:function(){var t=Object(i.a)(a.a.mark((function t(n){var r,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r={},!e.getInitialProps){t.next=5;break}return t.next=4,e.getInitialProps(n);case 4:r=t.sent;case 5:return t.next=7,Object(g.a)(n);case 7:if(o=t.sent){t.next=11;break}return n.res?(n.res.writeHead(302,{Location:j.a.loginPagePath}),n.res.end()):v.a.push(j.a.loginPagePath),t.abrupt("return",w(w({},r),{},{firebase:null}));case 11:return t.abrupt("return",w(w({},r),{},{firebase:o}));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),r}(m.a.Component);return Object(d.b)(null,(function(e){return Object(p.bindActionCreators)({firebaseChange:b.d},e)}))(t)}}},[["OZ4L",0,1,3,2,4,5,6,7,12]]])}));