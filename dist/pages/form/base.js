!function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports.self=t():e.self=t()}(this,(function(){return(this.webpackJsonpself=this.webpackJsonpself||[]).push([[61],{n1iA:function(e,t,n){"use strict";n.r(t);var l=n("1OyB"),o=n("vuIU"),a=n("Ji7U"),r=n("md7G"),i=n("foSv"),u=n("q1tI"),c=n.n(u),s=n("jwaz"),p=n("0ci1"),d=n("ANjH"),f=n("/MKj"),b=n("tCCL"),h=n("qGWM"),m=n("8Kt/"),y=n.n(m),k=c.a.createElement;function x(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,l=Object(i.a)(e);if(t){var o=Object(i.a)(this).constructor;n=Reflect.construct(l,arguments,o)}else n=l.apply(this,arguments);return Object(r.a)(this,n)}}var N=function(e){Object(a.a)(n,e);var t=x(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.props.pageChangeHeaderTitle("Base Form"),this.props.breadcrumbChange([{text:"Dashboard",link:"/"},{text:"Form"},{text:"Base",link:"/form/base"}])}},{key:"render",value:function(){return k(c.a.Fragment,null,k(y.a,null,k("title",null,"Base Form | Panely")),k(s.t,{fluid:!0},k(s.Q,null,k(s.r,{md:"6"},k(s.N,null,k(s.N.Header,{bordered:!0},k(s.N.Title,null,"Base")),k(s.N.Body,null,k("p",null,"Use ",k("code",null,"Input")," component to make the most forms. Included are styles for general appearance, focus state, sizing, and more."),k("hr",null),k(s.A.Group,null,k(s.F,{for:"emailBase"},"Email address"),k(s.D,{type:"email",id:"emailBase",placeholder:"name@example.com"})),k(s.A.Group,null,k(s.F,{for:"selectBase"},"Example select"),k(s.D,{type:"select",id:"selectBase"},k("option",null,"1"),k("option",null,"2"),k("option",null,"3"),k("option",null,"4"),k("option",null,"5"))),k(s.A.Group,null,k(s.F,{for:"multipleSelectBase"},"Example multiple select"),k(s.D,{type:"select",id:"multipleSelectBase",multiple:!0},k("option",null,"1"),k("option",null,"2"),k("option",null,"3"),k("option",null,"4"),k("option",null,"5"))),k(s.A.Group,null,k(s.F,{for:"textareaBase"},"Example textarea"),k(s.D,{type:"textarea",id:"textareaBase",rows:"3"})),k(s.A.Group,null,k(s.F,{for:"fileBase"},"Example file input"),k(s.D,{type:"file",id:"fileBase"})),k(s.A.Group,{className:"mb-0"},k(s.F,{for:"rangeBase"},"Example range input"),k(s.D,{type:"range",id:"rangeBase"})))),k(s.N,null,k(s.N.Header,{bordered:!0},k(s.N.Title,null,"Readonly")),k(s.N.Body,null,k("p",null,"Add the ",k("code",null,"readOnly")," boolean property on an input to prevent modification of the input\u2019s value. Read-only inputs appear darker (just like disabled inputs), but retain the standard cursor."),k("hr",null),k(s.A.Group,{className:"mb-0"},k(s.D,{type:"text",placeholder:"Readonly input here...",readOnly:!0})))),k(s.N,null,k(s.N.Header,{bordered:!0},k(s.N.Title,null,"Readonly plain text")),k(s.N.Body,null,k("p",null,"If you want to have ",k("code",null,"<Input readOnly>")," elements in your form styled as plain text, add the ",k("code",null,"plainText")," property to remove the default form field styling and preserve the correct margin and padding."),k("hr",null),k(s.A.Group,{className:"mb-0"},k(s.D,{type:"text",defaultValue:"email@example.com",readOnly:!0,plainText:!0})))),k(s.N,null,k(s.N.Header,{bordered:!0},k(s.N.Title,null,"Disabled state")),k(s.N.Body,null,k("p",null,"Add the ",k("code",null,"disabled")," boolean property on an input to prevent user interactions and make it appear darker."),k("hr",null),k(s.A.Group,{className:"mb-0"},k(s.F,{for:"disabledTextInput"},"Disabled input"),k(s.D,{type:"text",id:"disabledTextInput",placeholder:"Disabled input",disabled:!0}))))),k(s.r,{md:"6"},k(s.N,null,k(s.N.Header,{bordered:!0},k(s.N.Title,null,"Sizing")),k(s.N.Body,null,k("p",null,"Set heights using ",k("code",null,"size")," property with ",k("code",null,"sm|lg")," values."),k("hr",null),k(s.A.Group,null,k(s.D,{type:"text",size:"lg",placeholder:"Large input"})),k(s.A.Group,null,k(s.D,{type:"text",placeholder:"Default input"})),k(s.A.Group,null,k(s.D,{type:"text",size:"sm",placeholder:"Small input"})),k(s.A.Group,null,k(s.D,{type:"select",size:"lg"},k("option",null,"Large select"))),k(s.A.Group,null,k(s.D,{type:"select"},k("option",null,"Default select"))),k(s.A.Group,{className:"mb-0"},k(s.D,{type:"select",size:"sm"},k("option",null,"Small select"))))),k(s.N,null,k(s.N.Header,null,k(s.N.Title,null,"Checkbox and Radio")),k(s.N.Body,null,k(s.N,null,k(s.N.Header,{bordered:!0},k(s.N.Title,null,"Default")),k(s.N.Body,null,k("p",null,"By default, any number of checkboxes and radios that are immediate sibling will be vertically stacked and appropriately spaced with ",k("code",null,"<Form.Group check>"),"."),k("hr",null),k(s.A.Group,{check:!0},k(s.D,{type:"checkbox",defaultValue:"check1",id:"checkboxBase1"}),k(s.F,{check:!0,for:"checkboxBase1"},"Default checkbox")),k(s.A.Group,{check:!0},k(s.D,{type:"checkbox",defaultValue:"check2",id:"checkboxBase2",disabled:!0}),k(s.F,{check:!0,for:"checkboxBase2"},"Disabled checkbox")),k(s.A.Group,{check:!0},k(s.D,{type:"radio",defaultValue:"option1",id:"radioBase1"}),k(s.F,{check:!0,for:"radioBase1"},"Default radio")),k(s.A.Group,{check:!0},k(s.D,{type:"radio",defaultValue:"option2",id:"radioBase2"}),k(s.F,{check:!0,for:"radioBase2"},"Second default radio")),k(s.A.Group,{check:!0,className:"mb-0"},k(s.D,{type:"radio",defaultValue:"option3",id:"radioBase3"}),k(s.F,{check:!0,for:"radioBase3"},"Disabled radio")))),k(s.N,null,k(s.N.Header,{bordered:!0},k(s.N.Title,null,"Without labels")),k(s.N.Body,null,k("p",null,"Add ",k("code",null,".position-static")," to inputs within ",k("code",null,"<Form.Group check>")," that don\u2019t have any label text. Remember to still provide some form of label for assistive technologies."),k("hr",null),k(s.A.Group,{check:!0},k(s.D,{type:"checkbox",className:"position-static",defaultValue:"check1",id:"checkboxBlank"})),k(s.A.Group,{check:!0},k(s.D,{type:"radio",className:"position-static",name:"blankRadio",defaultValue:"option1",id:"RadioBlank1"})),k(s.A.Group,{check:!0,className:"mb-0"},k(s.D,{type:"radio",className:"position-static",name:"blankRadio",defaultValue:"option2",id:"RadioBlank2"})))),k(s.N,{className:"mb-0"},k(s.N.Header,{bordered:!0},k(s.N.Title,null,"Inline")),k(s.N.Body,null,k("p",null,"Group checkboxes or radios on the same horizontal row by adding ",k("code",null,"inline")," property to any ",k("code",null,"<Form.Group check>"),"."),k("hr",null),k(s.A.Group,{check:!0,inline:!0},k(s.D,{type:"checkbox",defaultValue:"option1",id:"checkboxInline1"}),k(s.F,{check:!0,for:"checkboxInline1"},"1")),k(s.A.Group,{check:!0,inline:!0},k(s.D,{type:"checkbox",defaultValue:"option2",id:"checkboxInline2"}),k(s.F,{check:!0,for:"checkboxInline2"},"2")),k(s.A.Group,{check:!0,inline:!0,className:"mb-0"},k(s.D,{type:"checkbox",defaultValue:"option3",id:"checkboxInline3",disabled:!0}),k(s.F,{check:!0,for:"checkboxInline3"},"3 (disabled)"))))))))))}}]),n}(c.a.Component);t.default=Object(f.b)(null,(function(e){return Object(d.bindActionCreators)({pageChangeHeaderTitle:p.e,breadcrumbChange:p.c},e)}))(Object(h.a)(Object(b.a)(N)))},qGWM:function(e,t,n){"use strict";var l=n("o0o1"),o=n.n(l),a=n("rePB"),r=n("HaE+"),i=n("1OyB"),u=n("vuIU"),c=n("Ji7U"),s=n("md7G"),p=n("foSv"),d=n("q1tI"),f=n.n(d),b=n("ANjH"),h=n("0ci1"),m=n("/MKj"),y=n("qP+2"),k=n("nOHt"),x=n.n(k),N=n("s6m4"),O=f.a.createElement;function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function D(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,l=Object(p.a)(e);if(t){var o=Object(p.a)(this).constructor;n=Reflect.construct(l,arguments,o)}else n=l.apply(this,arguments);return Object(s.a)(this,n)}}t.a=function(e){var t=function(t){Object(c.a)(l,t);var n=D(l);function l(){return Object(i.a)(this,l),n.apply(this,arguments)}return Object(u.a)(l,[{key:"componentDidMount",value:function(){this.props.firebaseChange(this.props.firebase)}},{key:"render",value:function(){return O(e,this.props)}}],[{key:"getInitialProps",value:function(){var t=Object(r.a)(o.a.mark((function t(n){var l,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(l={},!e.getInitialProps){t.next=5;break}return t.next=4,e.getInitialProps(n);case 4:l=t.sent;case 5:return t.next=7,Object(y.a)(n);case 7:if(a=t.sent){t.next=11;break}return n.res?(n.res.writeHead(302,{Location:N.a.loginPagePath}),n.res.end()):x.a.push(N.a.loginPagePath),t.abrupt("return",g(g({},l),{},{firebase:null}));case 11:return t.abrupt("return",g(g({},l),{},{firebase:a}));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),l}(f.a.Component);return Object(m.b)(null,(function(e){return Object(b.bindActionCreators)({firebaseChange:h.d},e)}))(t)}},"t8+x":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/form/base",function(){return n("n1iA")}])}},[["t8+x",0,1,3,2,4,5,6,7]]])}));