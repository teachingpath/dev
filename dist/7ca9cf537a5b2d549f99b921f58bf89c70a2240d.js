(this.webpackJsonpself=this.webpackJsonpself||[]).push([[18],{"2qu3":function(e,n,t){"use strict";var r=t("lSNA"),o=t("lwsE"),i=t("W8MJ");function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){var t;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"===typeof e)return c(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return c(e,n)}(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,l=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return a=e.done,e},e:function(e){l=!0,i=e},f:function(){try{a||null==t.return||t.return()}finally{if(l)throw i}}}}function c(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}n.__esModule=!0,n.default=void 0;var s,d=(s=t("q1tI"))&&s.__esModule?s:{default:s},f=t("8L3h"),m=t("jwwS");var p=[],y=[],h=!1;function b(e){var n=e(),t={loading:!0,loaded:null,error:null};return t.promise=n.then((function(e){return t.loading=!1,t.loaded=e,e})).catch((function(e){throw t.loading=!1,t.error=e,e})),t}function v(e){var n={loading:!1,loaded:{},error:null},t=[];try{Object.keys(e).forEach((function(r){var o=b(e[r]);o.loading?n.loading=!0:(n.loaded[r]=o.loaded,n.error=o.error),t.push(o.promise),o.promise.then((function(e){n.loaded[r]=e})).catch((function(e){n.error=e}))}))}catch(r){n.error=r}return n.promise=Promise.all(t).then((function(e){return n.loading=!1,e})).catch((function(e){throw n.loading=!1,e})),n}function g(e,n){return d.default.createElement(function(e){return e&&e.__esModule?e.default:e}(e),n)}function _(e,n){var t=Object.assign({loader:null,loading:null,delay:200,timeout:null,render:g,webpack:null,modules:null},n),r=null;function o(){if(!r){var n=new O(e,t);r={getCurrentValue:n.getCurrentValue.bind(n),subscribe:n.subscribe.bind(n),retry:n.retry.bind(n),promise:n.promise.bind(n)}}return r.promise()}if(!h&&"function"===typeof t.webpack){var i=t.webpack();y.push((function(e){var n,t=u(i);try{for(t.s();!(n=t.n()).done;){var r=n.value;if(-1!==e.indexOf(r))return o()}}catch(a){t.e(a)}finally{t.f()}}))}var a=function(e,n){o();var i=d.default.useContext(m.LoadableContext),a=(0,f.useSubscription)(r);return d.default.useImperativeHandle(n,(function(){return{retry:r.retry}}),[]),i&&Array.isArray(t.modules)&&t.modules.forEach((function(e){i(e)})),d.default.useMemo((function(){return a.loading||a.error?d.default.createElement(t.loading,{isLoading:a.loading,pastDelay:a.pastDelay,timedOut:a.timedOut,error:a.error,retry:r.retry}):a.loaded?t.render(a.loaded,e):null}),[e,a])};return a.preload=function(){return o()},a.displayName="LoadableComponent",d.default.forwardRef(a)}var O=function(){function e(n,t){o(this,e),this._loadFn=n,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}return i(e,[{key:"promise",value:function(){return this._res.promise}},{key:"retry",value:function(){var e=this;this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};var n=this._res,t=this._opts;n.loading&&("number"===typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout((function(){e._update({pastDelay:!0})}),t.delay)),"number"===typeof t.timeout&&(this._timeout=setTimeout((function(){e._update({timedOut:!0})}),t.timeout))),this._res.promise.then((function(){e._update({}),e._clearTimeouts()})).catch((function(n){e._update({}),e._clearTimeouts()})),this._update({})}},{key:"_update",value:function(e){this._state=l(l({},this._state),{},{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach((function(e){return e()}))}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"getCurrentValue",value:function(){return this._state}},{key:"subscribe",value:function(e){var n=this;return this._callbacks.add(e),function(){n._callbacks.delete(e)}}}]),e}();function w(e){return _(b,e)}function k(e,n){for(var t=[];e.length;){var r=e.pop();t.push(r(n))}return Promise.all(t).then((function(){if(e.length)return k(e,n)}))}w.Map=function(e){if("function"!==typeof e.render)throw new Error("LoadableMap requires a `render(loaded, props)` function");return _(v,e)},w.preloadAll=function(){return new Promise((function(e,n){k(p).then(e,n)}))},w.preloadReady=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise((function(n){var t=function(){return h=!0,n()};k(y,e).then(t,t)}))},window.__NEXT_PRELOADREADY=w.preloadReady;var A=w;n.default=A},"56Fq":function(e,n,t){"use strict";var r=t("a6RD"),o=t.n(r),i=(o()((function(){return Promise.all([t.e(20),t.e(21)]).then(t.t.bind(null,"kzlf",7))}),{ssr:!1,loadableGenerated:{webpack:function(){return["kzlf"]},modules:["quill"]}}),o()((function(){return Promise.all([t.e(20),t.e(21),t.e(96)]).then(t.bind(null,"AJZY"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["AJZY"]},modules:["./mixin"]}}),o()((function(){return Promise.all([t.e(20),t.e(21),t.e(23),t.e(94)]).then(t.bind(null,"JUnw"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["JUnw"]},modules:["./component"]}}));n.a=i},a6RD:function(e,n,t){"use strict";var r=t("lSNA");function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}n.__esModule=!0,n.noSSR=u,n.default=function(e,n){var t=a.default,r={loading:function(e){e.error,e.isLoading;return e.pastDelay,null}};e instanceof Promise?r.loader=function(){return e}:"function"===typeof e?r.loader=e:"object"===typeof e&&(r=i(i({},r),e));if(r=i(i({},r),n),"object"===typeof e&&!(e instanceof Promise)&&(e.render&&(r.render=function(n,t){return e.render(t,n)}),e.modules)){t=a.default.Map;var o={},l=e.modules();Object.keys(l).forEach((function(e){var n=l[e];"function"!==typeof n.then?o[e]=n:o[e]=function(){return n.then((function(e){return e.default||e}))}})),r.loader=o}r.loadableGenerated&&delete(r=i(i({},r),r.loadableGenerated)).loadableGenerated;if("boolean"===typeof r.ssr){if(!r.ssr)return delete r.ssr,u(t,r);delete r.ssr}return t(r)};l(t("q1tI"));var a=l(t("2qu3"));function l(e){return e&&e.__esModule?e:{default:e}}function u(e,n){return delete n.webpack,delete n.modules,e(n)}},jwwS:function(e,n,t){"use strict";var r;n.__esModule=!0,n.LoadableContext=void 0;var o=((r=t("q1tI"))&&r.__esModule?r:{default:r}).default.createContext(null);n.LoadableContext=o},rrmv:function(e,n,t){"use strict";t.r(n);var r=t("q1tI"),o=t.n(r),i=t("jwaz"),a=t("NKCw"),l=t("UGp+"),u=t("NWhz"),c=t("IP2g"),s=t("wHSu"),d=t("56Fq"),f=t("nOHt"),m=t.n(f),p=o.a.createElement,y={toolbar:[["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],[{direction:"rtl"},{align:[]}],["link","image","video"],["clean"]]},h={toolbar:[[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}]]};function b(e){var n=e.data,t=e.onChange,l=Object(r.useState)(n),u=l[0],f=l[1],m=Object(a.e)({defaultValues:{options:[]}}).control,h=Object(a.d)({control:m,name:"options"}),b=h.fields,v=h.append,g=h.remove,_=function(e,n){u[e]=n,f(u),t(u)};return p(o.a.Fragment,null,p(i.N,null,p(i.N.Header,{bordered:!0},p(i.N.Title,null,"Step-by-step")),p(i.N.Body,null,p(i.A,null,b.map((function(e,n){return p(i.Q,{key:e.id,className:"pt-4"},p(i.r,{xs:"11"},p(i.A.Group,null,p(i.y,null,p(a.a,{id:"options_".concat(n,"_.name"),name:"options[".concat(n,"].name"),control:m,render:function(e){var t=e.onChange,r=e.onBlur,o=e.value,i=(e.name,e.ref);return p(d.a,{innerRef:i,theme:"snow",value:o||"",id:"options_".concat(n,"_.name"),name:"options[".concat(n,"].name"),modules:y,onChange:t,onBlur:r,onKeyUp:function(e){_(n,o)},style:{minHeight:"20rem"}})}}),p(i.F,{for:"options_".concat(n,"_.name")},"Step#",n+1)))),p(i.r,{xs:"1"},p(i.h,{type:"button",onClick:function(){g(n),delete u[n],f(u)}},p(c.a,{icon:s.Jb}))))})),p("p",{className:"text-right"},p(i.h,{variant:"primary",type:"button",onClick:function(){v({})}},"Add Step ",p(c.a,{icon:s.ub})))))))}function v(e){var n=e.data,t=e.onChange,l=Object(r.useState)(n),u=l[0],d=l[1],f=Object(a.e)({defaultValues:{options:[]}}).control,m=Object(a.d)({control:f,name:"options"}),y=m.fields,h=m.append,b=m.remove,v=function(e,n){u[e]=n,d(u),t(u)};return p(o.a.Fragment,null,p(i.N,null,p(i.N.Header,{bordered:!0},p(i.N.Title,null,"Questions")),p(i.N.Body,null,p(i.A,null,y.map((function(e,n){return p(i.Q,{key:e.id,className:"pt-4"},p(i.r,{xs:"11"},p(i.A.Group,null,p(i.y,null,p(a.a,{id:"options_".concat(n,"_.name"),name:"options[".concat(n,"].name"),control:f,render:function(e){var t=e.onChange,r=e.onBlur,o=e.value,a=(e.name,e.ref);return p(i.D,{innerRef:a,type:"textarea",value:o||"",id:"options_".concat(n,"_.name"),name:"options[".concat(n,"].name"),onChange:t,onBlur:r,onKeyUp:function(e){v(n,o)}})}}),p(i.F,{for:"options_".concat(n,"_.name")},"Question#",n+1)))),p(i.r,{xs:"1"},p(i.h,{type:"button",onClick:function(){b(n),delete u[n],d(u)}},p(c.a,{icon:s.Jb}))))})),p("p",{className:"text-right"},p(i.h,{variant:"primary",type:"button",onClick:function(){h({})}},"Add Question ",p(c.a,{icon:s.ub})))))))}n.default=function(e){var n=e.onSave,t=e.data,r=l.d().shape({name:l.f().min(5,"Please enter at least 5 characters").required("Please enter your name"),description:l.f().min(5,"Please enter at least 5 characters").required("Please enter your description"),type:l.f().required("Please enter your type"),timeLimit:l.c().min(1,"Please enter at least 1 hour").required("Please enter your time limit")}),c=Object(a.e)({resolver:Object(u.a)(r),defaultValues:{name:(null===t||void 0===t?void 0:t.name)||"",description:(null===t||void 0===t?void 0:t.description)||"",type:(null===t||void 0===t?void 0:t.type)||"",timeLimit:(null===t||void 0===t?void 0:t.timeLimit)||1,content:(null===t||void 0===t?void 0:t.content)||"",guidelines:(null===t||void 0===t?void 0:t.guidelines)||"",criteria:(null===t||void 0===t?void 0:t.criteria)||"",training:(null===t||void 0===t?void 0:t.training)||{},questions:(null===t||void 0===t?void 0:t.questions)||{}}}),s=c.control,f=c.errors,g=c.handleSubmit,_=c.watch,O=c.reset,w=_(["type"]);return p(i.A,{onSubmit:g((function(e){n(e).then((function(){O()}))}))},p(i.A.Group,null,p(i.y,null,p(a.a,{as:i.D,type:"text",id:"name",name:"name",control:s,invalid:Boolean(f.name),placeholder:"Insert your name"}),p(i.F,{for:"name"},"Name"),f.name&&p(i.A.Feedback,{children:f.name.message}))),p(i.A.Group,null,p(i.y,null,p(a.a,{as:i.D,type:"textarea",id:"description",name:"description",control:s,invalid:Boolean(f.description),placeholder:"Insert your description"}),p(i.F,{for:"description"},"Description"),f.description&&p(i.A.Feedback,{children:f.description.message}))),p(i.A.Group,null,p(i.y,null,p(a.a,{as:i.D,type:"number",id:"timeLimit",name:"timeLimit",control:s,invalid:Boolean(f.timeLimit),placeholder:"Insert your time limit"}),p(i.F,{for:"timeLimit"},"Time limit"),f.timeLimit&&p(i.A.Feedback,{children:f.timeLimit.message}))),p(i.A.Group,null,p(a.a,{as:i.u,type:"select",name:"type",id:"type",control:s,invalid:Boolean(f.type)},p("option",{value:"default"},"Select your type"),p("option",{value:"learning"},"Learning"),p("option",{value:"hacking"},"Hacking"),p("option",{value:"q_and_A"},"Q and A"),p("option",{value:"training"},"Training")),f.type&&p(i.A.Feedback,{children:f.type.message})),{learning:p(o.a.Fragment,null,p(i.A.Group,null,p(i.y,null,p(a.a,{name:"content",control:s,render:function(e){var n=e.onChange,t=e.onBlur,r=e.value,o=(e.name,e.ref);return p(d.a,{innerRef:o,onBlur:t,theme:"snow",value:r,name:"content",modules:y,onChange:n,style:{minHeight:"50rem"}})}}),p(i.F,{for:"content"},"Content"),f.content&&p(i.A.Feedback,{children:f.content.message})))),hacking:p(o.a.Fragment,null,p(i.A.Group,null,p(i.y,null,p(a.a,{name:"guidelines",control:s,render:function(e){var n=e.onChange,t=e.onBlur,r=e.value,o=(e.name,e.ref);return p(d.a,{innerRef:o,onBlur:t,theme:"snow",value:r,id:"guidelines",name:"guidelines",modules:h,onChange:n,style:{minHeight:"15rem"}})}}),p(i.F,{for:"guidelines"},"Guidelines"),f.guidelines&&p(i.A.Feedback,{children:f.guidelines.message}))),p(i.A.Group,null,p(i.y,null,p(a.a,{name:"criteria",control:s,render:function(e){var n=e.onChange,t=e.onBlur,r=e.value,o=(e.name,e.ref);return p(d.a,{innerRef:o,onBlur:t,theme:"snow",value:r,id:"criteria",name:"criteria",modules:h,onChange:n,style:{minHeight:"15rem"}})}}),p(i.F,{for:"criteria"},"Criteria"),f.criteria&&p(i.A.Feedback,{children:f.criteria.message})))),q_and_A:p(i.A.Group,null,p(i.y,null,p(a.a,{name:"questions",control:s,render:function(e){var n=e.onChange,t=e.onBlur,r=e.value,o=(e.name,e.ref);return p(v,{data:r||{},innerRef:o,onBlur:t,id:"questions",name:"questions",onChange:n})}}),f.questions&&p(i.A.Feedback,{children:f.questions.message}))),training:p(i.A.Group,null,p(i.y,null,p(a.a,{name:"training",control:s,render:function(e){var n=e.onChange,t=e.onBlur,r=e.value,o=(e.name,e.ref);return p(b,{data:r||{},innerRef:o,onBlur:t,id:"training",name:"training",onChange:n})}}),f.training&&p(i.A.Feedback,{children:f.training.message})))}[w.type],p(i.h,{type:"submit",variant:"primary",className:"ml-2"},null===t||void 0===t?"Create":"Update"),p(i.h,{type:"button",className:"ml-2",onClick:function(){m.a.back()}},"Cancel"," "))}}}]);