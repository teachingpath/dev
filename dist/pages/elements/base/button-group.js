!function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports.self=t():e.self=t()}(this,(function(){return(this.webpackJsonpself=this.webpackJsonpself||[]).push([[45],{XgNo:function(e,t,n){"use strict";n.r(t);var l=n("JX7q"),r=n("rePB"),o=n("1OyB"),u=n("vuIU"),a=n("Ji7U"),i=n("md7G"),c=n("foSv"),s=n("q1tI"),h=n.n(s),p=n("jwaz"),d=n("0ci1"),f=n("ANjH"),b=n("/MKj"),m=n("tCCL"),w=n("qGWM"),g=n("8Kt/"),y=n.n(g),v=h.a.createElement;function j(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,l=Object(c.a)(e);if(t){var r=Object(c.a)(this).constructor;n=Reflect.construct(l,arguments,r)}else n=l.apply(this,arguments);return Object(i.a)(this,n)}}var O=function(e){Object(a.a)(n,e);var t=j(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.props.pageChangeHeaderTitle("Button Group"),this.props.breadcrumbChange([{text:"Dashboard",link:"/"},{text:"Elements"},{text:"Base"},{text:"Button Group",link:"/elements/base/button-group"}])}},{key:"render",value:function(){return v(h.a.Fragment,null,v(y.a,null,v("title",null,"Button Group | Panely")),v(p.t,{fluid:!0},v(p.Q,null,v(p.r,{md:"6"},v(p.N,null,v(p.N.Header,{bordered:!0},v(p.N.Title,null,"Basic")),v(p.N.Body,null,v("p",null,"Wrap a series of ",v("code",null,"Button")," elements in ",v("code",null,"ButtonGroup")," ","element."),v(p.i,null,v(p.h,null,"Left"),v(p.h,null,"Middle"),v(p.h,null,"Right")))),v(p.N,null,v(p.N.Header,{bordered:!0},v(p.N.Title,null,"Sizing")),v(p.N.Body,null,v("p",null,"Instead of applying button sizing properties to every button in a group, just set ",v("code",null,"variant")," with ",v("code",null,"sm|lg")," to each"," ",v("code",null,"ButtonGroup"),", including each one when nesting multiple groups."),v(p.i,{size:"lg",className:"mb-2"},v(p.h,null,"Left"),v(p.h,null,"Middle"),v(p.h,null,"Right")),v("br",null),v(p.i,{className:"mb-2"},v(p.h,null,"Left"),v(p.h,null,"Middle"),v(p.h,null,"Right")),v("br",null),v(p.i,{size:"sm"},v(p.h,null,"Left"),v(p.h,null,"Middle"),v(p.h,null,"Right")))),v(p.N,null,v(p.N.Header,{bordered:!0},v(p.N.Title,null,"Split button")),v(p.N.Body,null,v("p",null,"Create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of ",v("code",null,"split")," property for proper spacing around the dropdown caret."),v(p.w.Uncontrolled,{group:!0,className:"mr-2 mb-2"},v(p.h,null,"Dropdown"),v(p.w.Toggle,{split:!0}),v(p.w.Menu,null,v(p.w.Item,{href:"#"},"Action"),v(p.w.Item,{href:"#"},"Another action"),v(p.w.Item,{href:"#"},"Something else here"),v(p.w.Divider,null),v(p.w.Item,{href:"#"},"Separated lin"))),v(p.w.Uncontrolled,{group:!0,direction:"up",className:"mr-2 mb-2"},v(p.h,null,"Dropdown"),v(p.w.Toggle,{split:!0}),v(p.w.Menu,null,v(p.w.Item,{href:"#"},"Action"),v(p.w.Item,{href:"#"},"Another action"),v(p.w.Item,{href:"#"},"Something else here"),v(p.w.Divider,null),v(p.w.Item,{href:"#"},"Separated lin"))),v(p.w.Uncontrolled,{group:!0,direction:"right",className:"mr-2 mb-2"},v(p.h,null,"Dropright"),v(p.w.Toggle,{split:!0}),v(p.w.Menu,null,v(p.w.Item,{href:"#"},"Action"),v(p.w.Item,{href:"#"},"Another action"),v(p.w.Item,{href:"#"},"Something else here"),v(p.w.Divider,null),v(p.w.Item,{href:"#"},"Separated lin"))),v(p.i,{className:"mb-2"},v(p.w.Uncontrolled,{group:!0,direction:"left"},v(p.w.Toggle,{split:!0}),v(p.w.Menu,null,v(p.w.Item,{href:"#"},"Action"),v(p.w.Item,{href:"#"},"Another action"),v(p.w.Item,{href:"#"},"Something else here"),v(p.w.Divider,null),v(p.w.Item,{href:"#"},"Separated lin"))),v(p.h,null,"Dropleft")))),v(p.N,null,v(p.N.Header,{bordered:!0},v(p.N.Title,null,"Vertical")),v(p.N.Body,null,v("p",null,"Make a set of buttons appear vertically stacked rather than horizontally"),v(p.i,{vertical:!0,className:"mr-2"},v(p.h,null,"Button"),v(p.h,null,"Button"),v(p.h,null,"Button"),v(p.h,null,"Button"),v(p.h,null,"Button"),v(p.h,null,"Button")),v(p.i,{vertical:!0},v(p.h,null,"Button"),v(p.h,null,"Button"),v(p.w.Uncontrolled,{group:!0},v(p.w.Toggle,null,"Dropdown"),v(p.w.Menu,null,v(p.w.Item,{href:"#"},"Link"),v(p.w.Item,{href:"#"},"Link"))),v(p.h,null,"Button"),v(p.h,null,"Button"),v(p.h,null,"Button"))))),v(p.r,{md:"6"},v(p.N,null,v(p.N.Header,{bordered:!0},v(p.N.Title,null,"Toolbar")),v(p.N.Body,null,v("p",null,"Combine sets of button groups into button toolbars for more complex components. Use utility classes as needed to space out groups, buttons, and more."),v(p.j,{className:"mb-2"},v(p.i,{className:"mr-2"},v(p.h,null,"1"),v(p.h,null,"2"),v(p.h,null,"3"),v(p.h,null,"4")),v(p.i,{className:"mr-2"},v(p.h,null,"5"),v(p.h,null,"6"),v(p.h,null,"7")),v(p.i,null,v(p.h,null,"8"))),v(p.j,null,v(p.i,{className:"mr-2 mb-2 mb-sm-0"},v(p.h,null,"1"),v(p.h,null,"2"),v(p.h,null,"3"),v(p.h,null,"4")),v(p.E,null,v(p.E.Addon,{addonType:"prepend"},v(p.E.Text,null,"@")),v(p.D,{type:"text",placeholder:"Input group example"}))))),v(p.N,null,v(p.N.Header,{bordered:!0},v(p.N.Title,null,"Nesting")),v(p.N.Body,null,v("p",null,"Add ",v("code",null,"group")," property to the dropdown element when you want dropdown menus mixed with a series of buttons."),v(p.i,null,v(p.h,null,"1"),v(p.h,null,"2"),v(p.w.Uncontrolled,{group:!0},v(p.w.Toggle,{caret:!0},"Dropdown"),v(p.w.Menu,null,v(p.w.Item,{href:"3"},"Link"),v(p.w.Item,{href:"3"},"Link")))))),v(p.N,null,v(p.N.Header,{bordered:!0},v(p.N.Title,null,"Radio and Checkbox")),v(p.N.Body,null,v("p",null,"Do more with buttons. Control button states or create groups of butons for more components like toolbars."),v(p.N,null,v(p.N.Header,{bordered:!0},v(p.N.Title,null,"Radio")),v(p.N.Body,null,v(N,null))),v(p.N,{className:"mb-0"},v(p.N.Header,{bordered:!0},v(p.N.Title,null,"Checkbox")),v(p.N.Body,null,v(k,null)))))))))}}]),n}(h.a.Component),N=function(e){Object(a.a)(n,e);var t=j(n);function n(){var e;Object(o.a)(this,n);for(var u=arguments.length,a=new Array(u),i=0;i<u;i++)a[i]=arguments[i];return e=t.call.apply(t,[this].concat(a)),Object(r.a)(Object(l.a)(e),"state",{activeButton:1}),Object(r.a)(Object(l.a)(e),"handleClick",(function(t){e.setState({activeButton:t})})),e}return Object(u.a)(n,[{key:"render",value:function(){var e=this,t=this.state.activeButton;return v(p.i,null,v(p.h,{active:1===t,onClick:function(t){return e.handleClick(1)},variant:"flat-primary"},"Radio"),v(p.h,{active:2===t,onClick:function(t){return e.handleClick(2)},variant:"flat-primary"},"Radio"),v(p.h,{active:3===t,onClick:function(t){return e.handleClick(3)},variant:"flat-primary"},"Radio"))}}]),n}(h.a.Component),k=function(e){Object(a.a)(n,e);var t=j(n);function n(){var e;Object(o.a)(this,n);for(var u=arguments.length,a=new Array(u),i=0;i<u;i++)a[i]=arguments[i];return e=t.call.apply(t,[this].concat(a)),Object(r.a)(Object(l.a)(e),"state",{1:!0,2:!1,3:!1}),Object(r.a)(Object(l.a)(e),"handleClick",(function(t){e.setState(Object(r.a)({},t,!e.state[t]))})),e}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return v(p.i,null,v(p.h,{active:this.state[1],onClick:function(t){return e.handleClick(1)},variant:"flat-primary"},"Checkbox"),v(p.h,{active:this.state[2],onClick:function(t){return e.handleClick(2)},variant:"flat-primary"},"Checkbox"),v(p.h,{active:this.state[3],onClick:function(t){return e.handleClick(3)},variant:"flat-primary"},"Checkbox"))}}]),n}(h.a.Component);t.default=Object(b.b)(null,(function(e){return Object(f.bindActionCreators)({pageChangeHeaderTitle:d.e,breadcrumbChange:d.c},e)}))(Object(w.a)(Object(m.a)(O)))},ed2j:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/elements/base/button-group",function(){return n("XgNo")}])},qGWM:function(e,t,n){"use strict";var l=n("o0o1"),r=n.n(l),o=n("rePB"),u=n("HaE+"),a=n("1OyB"),i=n("vuIU"),c=n("Ji7U"),s=n("md7G"),h=n("foSv"),p=n("q1tI"),d=n.n(p),f=n("ANjH"),b=n("0ci1"),m=n("/MKj"),w=n("qP+2"),g=n("nOHt"),y=n.n(g),v=n("s6m4"),j=d.a.createElement;function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function k(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,l=Object(h.a)(e);if(t){var r=Object(h.a)(this).constructor;n=Reflect.construct(l,arguments,r)}else n=l.apply(this,arguments);return Object(s.a)(this,n)}}t.a=function(e){var t=function(t){Object(c.a)(l,t);var n=k(l);function l(){return Object(a.a)(this,l),n.apply(this,arguments)}return Object(i.a)(l,[{key:"componentDidMount",value:function(){this.props.firebaseChange(this.props.firebase)}},{key:"render",value:function(){return j(e,this.props)}}],[{key:"getInitialProps",value:function(){var t=Object(u.a)(r.a.mark((function t(n){var l,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(l={},!e.getInitialProps){t.next=5;break}return t.next=4,e.getInitialProps(n);case 4:l=t.sent;case 5:return t.next=7,Object(w.a)(n);case 7:if(o=t.sent){t.next=11;break}return n.res?(n.res.writeHead(302,{Location:v.a.loginPagePath}),n.res.end()):y.a.push(v.a.loginPagePath),t.abrupt("return",N(N({},l),{},{firebase:null}));case 11:return t.abrupt("return",N(N({},l),{},{firebase:o}));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),l}(d.a.Component);return Object(m.b)(null,(function(e){return Object(f.bindActionCreators)({firebaseChange:b.d},e)}))(t)}}},[["ed2j",0,1,3,2,4,5,6,7]]])}));