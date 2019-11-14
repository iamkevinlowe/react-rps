(this["webpackJsonpreact-rps"]=this["webpackJsonpreact-rps"]||[]).push([[0],{28:function(e,t,a){e.exports=a(47)},33:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(24),o=a.n(c),s=(a(33),a(2)),i=a(5),l=a(10),u=a(15);var m=function(e){var t=e.title,a=e.games;return a.length?r.a.createElement(r.a.Fragment,null,r.a.createElement("hr",null),r.a.createElement("h5",{className:"card-title"},t),r.a.createElement("div",{className:"btn-group-vertical d-block"},a.map((function(e){return r.a.createElement(i.b,{className:"btn btn-primary",to:"/game/".concat(e),key:e},e)})))):null},d=a(7),f=a.n(d),p=a(12),h=a(3);a(39);h.initializeApp({apiKey:"AIzaSyCpU5AfFhgbrjaTR8sKyB_O6h9VYGCNmDk",authDomain:"rock-paper-scissors-b198e.firebaseapp.com",databaseURL:"https://rock-paper-scissors-b198e.firebaseio.com",projectId:"rock-paper-scissors-b198e",storageBucket:"rock-paper-scissors-b198e.appspot.com",messagingSenderId:"530589049037",appId:"1:530589049037:web:f677fbd6b66d8483654984"});var v=h.firestore(),b=function(){return"Game_".concat(Math.round(1e3*Math.random()))},E=function e(t){return v.collection("games").where("name","==",t).get().then((function(a){return a.empty?g(t).then(e):a.docs[0].ref}))},g=function(){var e=Object(p.a)(f.a.mark((function e(){var t,a,n,r=arguments;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:null,a=r.length>1&&void 0!==r[1]?r[1]:null,t=t||b(),n=v.collection("games"),e.abrupt("return",n.where("name","==",t).get().then((function(e){if(!e.empty)return g(null,a);var r={name:t};return a&&(r.userIds=h.firestore.FieldValue.arrayUnion(a)),n.add(r).then((function(){return t}))})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(e,t){e.get().then((function(a){var n=a.data().userIds;if(2===(void 0===n?[]:n).length)throw new Error("Cannot add user to game");var r={userIds:h.firestore.FieldValue.arrayUnion(t)};e.update(r).catch((function(e){return console.log("Error encountered: ".concat(e))}))}))},N=function(){var e=Object(p.a)(f.a.mark((function e(t,a,n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.get().then((function(e){var r=e.data().weapons;if(2===(void 0===r?[]:r).length)throw new Error("Cannot add weapon to game");var c=h.firestore.FieldValue.arrayUnion({userId:a,weapon:n});return t.update("weapons",c)})));case 1:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),O=function(){var e=Object(p.a)(f.a.mark((function e(t,a){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.get().then((function(e){var n=e.data(),r=n.weapons,c=void 0===r?[]:r,o=n.userIds;if((void 0===o?[]:o).includes(a)){var s=(c.find((function(e){return e.userId===a}))||{}).weapon;return void 0===s?null:s}return w(t,a),null})));case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),y=function(e){var t={tie:!1,userId:null,weapon:null};if(e.length<2||e.some((function(e){return null===e.weapon})))return t;var a=Object(s.a)(e,2),n=a[0],r=a[1];return"Rock"===n.weapon&&"Scissors"===r.weapon||"Paper"===n.weapon&&"Rock"===r.weapon||"Scissors"===n.weapon&&"Paper"===r.weapon?Object.assign(t,n):n.weapon===r.weapon?(t.tie=!0,t.weapon=n.weapon):Object.assign(t,r),t},j=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a={weapons:h.firestore.FieldValue.delete()};t&&(a.ties=h.firestore.FieldValue.increment(1)),e.update(a).catch((function(e){return console.log("Error encountered: ".concat(e))}))},I=function(e){return v.collection("games").where("userIds","array-contains",e).get().then((function(e){return e.docs}))};var S=function(e){var t=e.userId,a=Object(n.useState)([]),c=Object(s.a)(a,2),o=c[0],i=c[1],l=Object(n.useState)([]),d=Object(s.a)(l,2),f=d[0],p=d[1],h=Object(n.useState)([]),v=Object(s.a)(h,2),b=v[0],E=v[1],g=Object(n.useState)({wins:0,ties:0,losses:0}),w=Object(s.a)(g,2),N=w[0],O=w[1];Object(n.useEffect)((function(){t&&I(t).then(j)}),[t]);var j=function(e){var a=Object(u.a)(o),n=Object(u.a)(f),r=Object(u.a)(b),c=Object.assign({},N);e.forEach((function(e){var o=e.data(),s=o.name,i=o.ties,l=void 0===i?0:i,u=o.userIds,m=void 0===u?[]:u,d=o.weapons,f=void 0===d?[]:d;if(m.length<2)a.push(s);else{var p=a.indexOf(s);p>=0&&a.splice(p,1);var h=y(f);if(null===h.userId&&!1===h.tie){(f.find((function(e){return e.userId===t}))||{}).weapon?n.push(s):r.push(s)}else{var v=n.indexOf(s),b=r.indexOf(s);v>=0?n.splice(v,1):b>=0&&r.splice(b,1),h.userId===t?c.wins++:h.tie||null===h.userId||c.losses++}c.ties=l}})),i(a),p(n),E(r),O(c)};return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8 offset-sm-2"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},"Dashboard"),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Your Stats"),r.a.createElement("p",{className:"card-text"},r.a.createElement("span",{className:"strong"},"Wins:")," ",N.wins),r.a.createElement("p",{className:"card-text"},r.a.createElement("span",{className:"strong"},"Ties:")," ",N.ties),r.a.createElement("p",{className:"card-text"},r.a.createElement("span",{className:"strong"},"Losses:")," ",N.losses),r.a.createElement(m,{title:"Waiting for an opponent...",games:o}),r.a.createElement(m,{title:"Waiting for opponent's move...",games:f}),r.a.createElement(m,{title:"Waiting for your move...",games:b})))))},k=function(e,t){if(!(e instanceof Object&&t instanceof Object))return!1;var a=Object.keys(e);if(a.length!==Object.keys(t).length)return!1;for(var n=0;n<a.length;n++){var r=a[n];if(e[r]!==t[r])return!1}return!0},x=function e(t,a){if(!(t instanceof Array&&a instanceof Array)||t.length!==a.length)return!1;for(var n=t.slice(0).sort(),r=a.slice(0).sort(),c=0;c<n.length;c++){var o=n[c],s=r[c];if(!(o instanceof Object&&k(o,s)||o instanceof Array&&e(o,s)||o===s))return!1}return!0};var F=function(e){var t=e.gameDocument,a=e.players,c=e.userId,o=Object(n.useState)(null),l=Object(s.a)(o,2),u=l[0],m=l[1],d=Object(n.useState)({}),f=Object(s.a)(d,2),p=f[0],h=f[1];Object(n.useEffect)((function(){O(t,c).then((function(e){return m(e)}))}),[t,c]),Object(n.useEffect)((function(){var e=y(a);k(e,p)||h(e)}),[a]);var v=function(){return a.map((function(e){return e.name})).join(" vs. ")},b=function(e){var t="";switch(e){case"Rock":t="fas fa-hand-rock";break;case"Paper":t="fas fa-hand-paper";break;case"Scissors":t="fas fa-hand-scissors";break;default:return null}return r.a.createElement("i",{className:t})},E=function(e){var a=e.currentTarget.dataset.name;N(t,c,a).then((function(){return m(a)}))};return p.tie?(setTimeout((function(){j(t,!0),m(null),h({})}),3e3),r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"card-title"},v()),r.a.createElement("p",{className:"card-text"},"It was a tie! Both selected ",r.a.createElement("span",{className:"text-primary"},b(p.weapon)),". Starting a new match..."))):p.userId?r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"card-title"},p.userId===c?["Congrats, you beat ".concat(a.find((function(e){return e.userId!==p.userId})).name," with "),r.a.createElement("span",{className:"text-primary",key:u},b(u)),"!"]:["Sorry, ".concat(p.name," won with "),r.a.createElement("span",{className:"text-primary",key:u},b(p.weapon)),"."]),r.a.createElement(i.b,{to:"/home",className:"btn btn-primary btn-block"},"Play again?")):r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"card-title"},v()),u?r.a.createElement("p",{className:"card-text"},"You chose ",r.a.createElement("span",{className:"text-primary"},b(u)),"!",r.a.createElement("br",null),"Waiting for your opponent..."):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"card-text"},"Choose your weapon!"),r.a.createElement("div",{className:"btn-group d-flex"},["Rock","Paper","Scissors"].map((function(e){return r.a.createElement("button",{type:"button",className:"btn btn-outline-primary",style:{flexGrow:1},"data-name":e,onClick:E,key:e},b(e))})))))},C=(a(43),function(){var e=Object(p.a)(f.a.mark((function e(t){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=v.collection("users"),e.abrupt("return",a.where("email","==",t.email).get().then((function(e){if(e.empty)return a.add(t).then((function(e){return t.id=e.id,t}));var n=e.docs[0].ref;return n.update(t).then((function(){return t.id=n.id,t}))})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),P=function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",v.collection("users").doc(t).get().then((function(e){return e.data()})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){h.auth().setPersistence(h.auth.Auth.Persistence.LOCAL).then((function(){var e=new h.auth.GoogleAuthProvider;return h.auth().signInWithRedirect(e)}))},A=function(e){h.auth().setPersistence(h.auth.Auth.Persistence.LOCAL).then((function(){var t={url:"production"===Object({NODE_ENV:"production",PUBLIC_URL:"/react-rps"}).ENVIRONMENT?"https://iamkevinlowe.github.io/react-rps":"http://localhost:3000",handleCodeInApp:!0};h.auth().sendSignInLinkToEmail(e.email,t).then((function(){return window.localStorage.setItem("userForSignInEmail",JSON.stringify(e))}))}))},D=function(){if(h.auth().isSignInWithEmailLink(window.location.href)){try{var e=JSON.parse(window.localStorage.getItem("userForSignInEmail")),t=e.email,a=e.name;if(!t||!a)throw new Error("Email and Name not found in local storage");h.auth().signInWithEmailLink(t,window.location.href).then((function(e){var n=e.user;window.localStorage.removeItem("userForSignInEmail"),n&&C({email:n.email||t,name:a||n.displayName,uid:n.uid})}))}catch(n){console.log(n),window.localStorage.removeItem("userForSignInEmail")}return Promise.resolve(!0)}return Promise.resolve(!1)},W=function(e){return h.auth().onAuthStateChanged((function(t){t?v.collection("users").where("uid","==",t.uid).get().then((function(e){var a={email:t.email,name:t.displayName,uid:t.uid};return e.empty?C(a):(a.id=e.docs[0].ref.id,a)})).then(e):e()}))},R=function(){return h.auth().signOut()};var U=function(e){var t=e.userId,a=Object(l.h)().gameName,c=Object(n.useState)(null),o=Object(s.a)(c,2),i=o[0],u=o[1],m=Object(n.useState)([]),d=Object(s.a)(m,2),f=d[0],p=d[1],h=Object(n.useState)(null),v=Object(s.a)(h,2),b=v[0],g=v[1];return Object(n.useEffect)((function(){var e=null;return E(a).then((function(n){u(n),e=n.onSnapshot((function(e){var r=e.data(),c=r.name,o=r.userIds,s=void 0===o?[]:o,i=r.weapons,l=void 0===i?[]:i;if(c===a)if(s.includes(t)){var u=s.map((function(e){return P(e).then((function(t){var a=(l.find((function(t){return t.userId===e}))||{}).weapon,n=void 0===a?null:a;return t.userId=e,t.weapon=n,t}))}));Promise.all(u).then((function(e){x(e,f)||p(e)}))}else s.length>=2?g("/home"):w(n,t);else g("/game/".concat(c))}))})),function(){return e&&e()}}),[a,t]),b?r.a.createElement(l.a,{to:b}):r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8 offset-sm-2"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},a),r.a.createElement("div",{className:"card-body"},f.length<2?r.a.createElement("h5",{className:"card-title"},"Waiting for player..."):r.a.createElement(F,{gameDocument:i,players:f,userId:t})))))};var T=function(e){var t=e.userId,a=Object(n.useState)(null),c=Object(s.a)(a,2),o=c[0],i=c[1];return o?r.a.createElement(l.a,{to:"/game/".concat(o)}):r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"card-text"},"Decide if you want to start a new game, or join an existing one"),r.a.createElement("button",{className:"btn btn-primary btn-block mb-3",onClick:function(){return g(null,t).then(i)}},"Start a new game"),r.a.createElement("hr",null),r.a.createElement("form",{className:"form-inline",onSubmit:function(e){e.preventDefault();var t=e.target.elements.name.value.trim();i(t)}},r.a.createElement("div",{className:"input-group w-100"},r.a.createElement("input",{type:"text",className:"form-control",name:"name",placeholder:"Game Name"}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Join a game"))))))};var V=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(!1),i=Object(s.a)(o,2),l=i[0],u=i[1];return Object(n.useEffect)((function(){window.localStorage.hasOwnProperty("userForSignInEmail")&&c(!0)}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("hr",null),a?r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"card-text"},l?"Verification email sent...":"Waiting for email verification..."),r.a.createElement("button",{className:"btn btn-link",onClick:function(e){var t=null;try{t=JSON.parse(window.localStorage.getItem("userForSignInEmail"))}catch(a){console.log("User corrupted in local storage"),window.localStorage.removeItem("userForSignInEmail")}t?(A(t),u(!0),setTimeout((function(){u(!1)}),3e3)):c(!1)}},"Click here to resend verification email")):r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=e.target.elements.name.value.trim(),a=e.target.elements.email.value.trim().toLowerCase();t&&a&&(A({name:t,email:a}),c(!0))}},r.a.createElement("div",{className:"form-row form-group"},r.a.createElement("div",{className:"col"},r.a.createElement("input",{type:"text",className:"form-control",name:"name",placeholder:"Your Name"})),r.a.createElement("div",{className:"col"},r.a.createElement("input",{type:"email",className:"form-control",name:"email",placeholder:"Your Email"}))),r.a.createElement("button",{type:"submit",className:"btn btn-outline-primary btn-block"},r.a.createElement("span",{className:"float-left"},r.a.createElement("i",{className:"far fa-envelope"})),"Sign in with Email")))};var B=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("hr",null),r.a.createElement("button",{className:"btn btn-outline-secondary btn-block",onClick:function(e){L()}},r.a.createElement("span",{className:"float-left"},r.a.createElement("i",{className:"fab fa-google"})),"Sign in with Google"))};var G=function(){return r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"New phone, who dis?"),r.a.createElement("p",{className:"card-text"},"Before we begin, I need to know who you are"),r.a.createElement(V,null),r.a.createElement(B,null)))};var J=function(e){var t=e.userId,a=new URLSearchParams(Object(l.g)().search).get("redirectTo");return t&&a?r.a.createElement(l.a,{to:a}):r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8 offset-sm-2"},t?r.a.createElement(T,{userId:t}):r.a.createElement(G,null)))};var Y=function(e){var t=e.userId,a=Object(l.i)({path:"/dashboard",strict:!0}),n=Object(l.i)({path:"/home",strict:!0});return r.a.createElement("ul",{className:"nav nav-pills mt-3 mb-5"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(i.b,{className:"nav-link".concat(n?" active":""),to:"/home"},"Home")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(i.b,{className:function(){var e=["nav-link"];return a&&e.push("active"),t||e.push("disabled"),e.join(" ")}(),onClick:function(e){t||e.preventDefault()},to:"/dashboard"},"Dashboard")),t?r.a.createElement("li",{className:"nav-item ml-auto"},r.a.createElement("button",{className:"btn btn-link nav-link",onClick:function(e){e.preventDefault(),R()}},"Sign Out")):null)},_=a(27);var M=function(e){var t=e.children,a=e.userId,n=Object(_.a)(e,["children","userId"]);return r.a.createElement(l.b,Object.assign({},n,{render:function(e){var n=e.location;return a?t:r.a.createElement(l.a,{to:"/home?redirectTo=".concat(n.pathname)})}}))};a(45),a(46);var z=function(){var e=Object(n.useState)(!0),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)({}),u=Object(s.a)(o,2),m=u[0],d=u[1];return Object(n.useEffect)((function(){return W((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};a&&c(!1),d(e),e.id||D().then((function(e){if(e){var t=new URLSearchParams(window.location.search).get("continueUrl");window.history.replaceState({},document.title,t)}}))}))}),[]),a?r.a.createElement("div",{className:"vh-100 d-flex justify-content-center align-items-center"},r.a.createElement("h5",{className:"align-self-center"},"Loading...")):r.a.createElement(i.a,null,r.a.createElement(Y,{userId:m.id}),r.a.createElement(l.d,null,r.a.createElement(l.a,{exact:!0,from:"/",to:"/home"}),r.a.createElement(M,{path:"/game/:gameName",userId:m.id},r.a.createElement(U,{userId:m.id})),r.a.createElement(M,{path:"/dashboard",userId:m.id},r.a.createElement(S,{userId:m.id})),r.a.createElement(l.b,{path:"/home"},r.a.createElement(J,{userId:m.id}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[28,1,2]]]);
//# sourceMappingURL=main.068f5e58.chunk.js.map