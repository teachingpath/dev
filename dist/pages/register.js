!function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports.self=t():e.self=t()}(this,(function(){return(this.webpackJsonpself=this.webpackJsonpself||[]).push([[79],{ODXe:function(e,t,r){"use strict";function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],a=!0,n=!1,o=void 0;try{for(var s,i=e[Symbol.iterator]();!(a=(s=i.next()).done)&&(r.push(s.value),!t||r.length!==t);a=!0);}catch(l){n=!0,o=l}finally{try{a||null==i.return||i.return()}finally{if(n)throw o}}return r}}(e,t)||function(e,t){if(e){if("string"===typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.d(t,"a",(function(){return n}))},YFqc:function(e,t,r){e.exports=r("cTJO")},ap3T:function(e,t,r){"use strict";r.r(t);var a=r("o0o1"),n=r.n(a),o=r("HaE+"),s=r("ODXe"),i=r("q1tI"),l=r.n(i),c=r("jwaz"),u=r("IP2g"),f=r("NKCw"),d=r("N1Wf"),p=r("NWhz"),m=r("wHSu"),h=r("UGp+"),y=r("qP+2"),g=r("tCCL"),b=r("2BYM"),v=r.n(b),w=r("nOHt"),N=r.n(w),P=r("sXnO"),x=r("YFqc"),A=r.n(x),O=r("8Kt/"),j=r.n(O),E=r("s6m4"),R=l.a.createElement,k=v()(P.a).mixin({customClass:{confirmButton:"btn btn-label-success btn-wide mx-1",cancelButton:"btn btn-label-danger btn-wide mx-1"},buttonsStyling:!1});function z(){return R(l.a.Fragment,null,R(j.a,null,R("title",null,"Register | Teaching Path")),R(c.t,{fluid:!0},R(c.Q,{noGutters:!0,className:"align-items-center justify-content-center h-100"},R(c.r,{sm:"8",md:"6",lg:"4"},R(c.N,null,R(c.N.Body,null,R("div",{className:"text-center mt-2 mb-4"},R(c.bb,{display:!0,circle:!0,variant:"label-primary",className:"mb-4"},R(u.a,{icon:m.Ob}))),R(S,null)))))))}function S(){var e=l.a.useState(!1),t=Object(s.a)(e,2),r=t[0],a=t[1],i=h.d().shape({firstName:h.f().min(5,"Please enter at least 5 characters").required("Please enter your lastname"),lastName:h.f().min(5,"Please enter at least 5 characters").required("Please enter your lastname"),email:h.f().email("Your email is not valid").required("Please enter your email"),password:h.f().min(6,"Please enter at least 6 characters").required("Please provide your password"),passwordRepeat:h.f().min(6,"Please enter at least 6 characters").oneOf([h.e("password")],"Your password not match").required("Please repeat your password"),agreement:h.b().oneOf([!0],"You must accept the agreement")}),u=Object(f.e)({resolver:Object(p.a)(i),defaultValues:{firstName:"",lastName:"",email:"",password:"",passwordRepeat:"",agreement:!1}}),m=u.control,y=u.handleSubmit,g=u.errors,b=function(){var e=Object(o.a)(n.a.mark((function e(t){var r,o,s,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.firstName,o=t.lastName,s=t.email,i=t.password,a(!0),e.next=4,d.a.auth().createUserWithEmailAndPassword(s,i).then((function(){return d.a.auth().signInWithEmailAndPassword(s,i).then((function(){var e=d.a.auth().currentUser;return e.updateProfile({displayName:"".concat(r," ").concat(o)}).then((function(){var t=d.a.auth.EmailAuthProvider.credential(e.email,i);return e.reauthenticateWithCredential(t).then((function(){N.a.push(N.a.query.redirect||E.a.dashboardPagePath)})).catch((function(e){k.fire({text:e.message,icon:"error"})}))})).catch((function(e){k.fire({text:e.message,icon:"error"})}))})).catch((function(e){k.fire({text:e.message,icon:"error"})}))})).catch((function(e){k.fire({text:e.message,icon:"error"})}));case 4:a(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return R(c.A,{onSubmit:y(b)},R(c.Q,null,R(c.r,{xs:"6"},R(c.A.Group,null,R(c.y,{size:"lg"},R(f.a,{as:c.D,size:"lg",type:"text",id:"first-name",name:"firstName",control:m,invalid:Boolean(g.firstName),placeholder:"Insert your firstname"}),R(c.F,{for:"first-name"},"First name"),g.firstName&&R(c.A.Feedback,{children:g.firstName.message})))),R(c.r,{xs:"6"},R(c.A.Group,null,R(c.y,{size:"lg"},R(f.a,{as:c.D,size:"lg",type:"text",id:"last-name",name:"lastName",control:m,invalid:Boolean(g.lastName),placeholder:"Insert your lastname"}),R(c.F,{for:"last-name"},"last name"),g.lastName&&R(c.A.Feedback,{children:g.lastName.message}))))),R(c.A.Group,null,R(c.y,{size:"lg"},R(f.a,{as:c.D,type:"email",id:"email",name:"email",size:"lg",control:m,invalid:Boolean(g.email),placeholder:"Please insert your email"}),R(c.F,{for:"email"},"Email"),g.email&&R(c.A.Feedback,{children:g.email.message}))),R(c.A.Group,null,R(c.y,{size:"lg"},R(f.a,{as:c.D,size:"lg",type:"password",id:"password",name:"password",control:m,invalid:Boolean(g.password),placeholder:"Please provide your password"}),R(c.F,{for:"password"},"Password"),g.password&&R(c.A.Feedback,{children:g.password.message}))),R(c.A.Group,null,R(c.y,{size:"lg"},R(f.a,{as:c.D,size:"lg",type:"password",id:"passwordRepeat",name:"passwordRepeat",control:m,invalid:Boolean(g.passwordRepeat),placeholder:"Repeat your password"}),R(c.F,{for:"passwordRepeat"},"Confirm password"),g.passwordRepeat&&R(c.A.Feedback,{children:g.passwordRepeat.message}))),R("div",{className:"d-flex align-items-center justify-content-between mb-3"},R(c.A.Group,{className:"mb-0"},R(f.a,{control:m,name:"agreement",render:function(e){var t=e.onChange,r=e.onBlur,a=e.value,n=(e.name,e.ref);return R(c.u,{type:"checkbox",size:"lg",id:"agreement",label:"Accept agreement",invalid:Boolean(g.agreement),onBlur:r,onChange:function(e){return t(e.target.checked)},checked:a,innerRef:n})}}))),R("div",{className:"d-flex align-items-center justify-content-between"},R("span",null,"Already have an account ? ",R(A.a,{href:"/login"},"Sign In")),R(c.h,{type:"submit",variant:"label-primary",size:"lg",width:"widest",disabled:r},r?R(c.T,{className:"mr-2"}):null," Register")))}z.getInitialProps=function(){var e=Object(o.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(y.a)(t);case 2:return e.sent&&(t.res?(t.res.writeHead(302,{Location:t.query.redirect||E.a.dashboardPagePath}),t.res.end()):N.a.push(N.a.query.redirect||E.a.dashboardPagePath)),e.abrupt("return",{firebase:null});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.default=Object(g.a)(z,"blank")},cTJO:function(e,t,r){"use strict";var a=r("J4zp"),n=r("284h");t.__esModule=!0,t.default=void 0;var o,s=n(r("q1tI")),i=r("elyg"),l=r("nOHt"),c=new Map,u=window.IntersectionObserver,f={};var d=function(e,t){var r=o||(u?o=new u((function(e){e.forEach((function(e){if(c.has(e.target)){var t=c.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(o.unobserve(e.target),c.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0);return r?(r.observe(e),c.set(e,t),function(){try{r.unobserve(e)}catch(t){console.error(t)}c.delete(e)}):function(){}};function p(e,t,r,a){(0,i.isLocalURL)(t)&&(e.prefetch(t,r,a).catch((function(e){0})),f[t+"%"+r]=!0)}var m=function(e){var t=!1!==e.prefetch,r=s.default.useState(),n=a(r,2),o=n[0],c=n[1],m=(0,l.useRouter)(),h=m&&m.pathname||"/",y=s.default.useMemo((function(){var t=(0,i.resolveHref)(h,e.href);return{href:t,as:e.as?(0,i.resolveHref)(h,e.as):t}}),[h,e.href,e.as]),g=y.href,b=y.as;s.default.useEffect((function(){if(t&&u&&o&&o.tagName&&(0,i.isLocalURL)(g)&&!f[g+"%"+b])return d(o,(function(){p(m,g,b)}))}),[t,o,g,b,m]);var v=e.children,w=e.replace,N=e.shallow,P=e.scroll;"string"===typeof v&&(v=s.default.createElement("a",null,v));var x=s.Children.only(v),A={ref:function(e){e&&c(e),x&&"object"===typeof x&&x.ref&&("function"===typeof x.ref?x.ref(e):"object"===typeof x.ref&&(x.ref.current=e))},onClick:function(e){x.props&&"function"===typeof x.props.onClick&&x.props.onClick(e),e.defaultPrevented||function(e,t,r,a,n,o,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,i.isLocalURL)(r))&&(e.preventDefault(),null==s&&(s=a.indexOf("#")<0),t[n?"replace":"push"](r,a,{shallow:o}).then((function(e){e&&s&&(window.scrollTo(0,0),document.body.focus())})))}(e,m,g,b,w,N,P)}};return t&&(A.onMouseEnter=function(e){(0,i.isLocalURL)(g)&&(x.props&&"function"===typeof x.props.onMouseEnter&&x.props.onMouseEnter(e),p(m,g,b,{priority:!0}))}),(e.passHref||"a"===x.type&&!("href"in x.props))&&(A.href=(0,i.addBasePath)(b)),s.default.cloneElement(x,A)};t.default=m},gSeQ:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/register",function(){return r("ap3T")}])}},[["gSeQ",0,1,3,9,11,2,4,5,6,8,10,12]]])}));