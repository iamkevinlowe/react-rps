(this["webpackJsonpreact-rps"]=this["webpackJsonpreact-rps"]||[]).push([[0],{26:function(e,t,a){e.exports=a(41)},31:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(23),o=a.n(c),s=(a(31),a(10)),l=a(7),u=a(3),i=a(4),m=a.n(i),p=a(8),f=a(11);a(33);f.initializeApp({apiKey:"AIzaSyCpU5AfFhgbrjaTR8sKyB_O6h9VYGCNmDk",authDomain:"rock-paper-scissors-b198e.firebaseapp.com",databaseURL:"https://rock-paper-scissors-b198e.firebaseio.com",projectId:"rock-paper-scissors-b198e",storageBucket:"rock-paper-scissors-b198e.appspot.com",messagingSenderId:"530589049037",appId:"1:530589049037:web:f677fbd6b66d8483654984"});var d=f.firestore(),b=function(){var e={};try{e=JSON.parse(localStorage.getItem("player"))||{}}catch(t){console.log("Deleting corrupted player in local storage."),localStorage.removeItem("player")}return e},h=function(e){return localStorage.setItem("player",JSON.stringify(e))},v=function(){var e=Object(p.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",d.collection("users").add(t).then((function(e){return t.id=e.id,t})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(p.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",d.collection("users").doc(t).get().then((function(e){return e.data()})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var g=function(e){var t=e.user,a=e.setUser;return"undefined"!==typeof t.name&&"undefined"!==typeof t.email?null:r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-4 offset-md-4"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"New phone, who dis?"),r.a.createElement("p",{className:"card-text"},"Before we begin, I need to know who you are"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=e.target.elements.name.value.trim(),n=e.target.elements.email.value.trim().toLowerCase();t&&n&&v({name:t,email:n}).then(a)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",className:"form-control",name:"name",placeholder:"Your Name"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"email",className:"form-control",name:"email",placeholder:"Your Email"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"},"Let's RPS!"))))))};var w=function(e){e.userId;var t=Object(n.useState)(null),a=Object(u.a)(t,2),c=a[0],o=a[1];return c?r.a.createElement(l.a,{to:"/game/".concat(c)}):r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-4 offset-sm-4"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"card-text"},"Decide if you want to start a new game, or join an existing one"),r.a.createElement("button",{className:"btn btn-primary btn-block mb-3",onClick:function(){var e="Game_".concat(Math.round(1e3*Math.random()));o(e)}},"Start a new game"),r.a.createElement("hr",null),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=e.target.elements.name.value.trim();o(t)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",className:"form-control",name:"name",placeholder:"Game Name"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"},"Join a game"))))))};var y=function(){var e=Object(n.useState)(b()),t=Object(u.a)(e,2),a=t[0],c=t[1];return r.a.createElement("div",{className:"Home"},r.a.createElement(g,{user:a,setUser:function(e){h(e),c(e)}}),a.id?r.a.createElement(w,{userId:a.id}):null)},N=function(e){return d.collection("games").doc(e)},k=function(e,t){var a=e instanceof f.firestore.DocumentReference?e:N(e),n={};n[t]={weapon:null},a.set(n,{merge:!0}).catch((function(e){return console.log("Error encountered: ".concat(e))}))},j=function(){var e=Object(p.a)(m.a.mark((function e(t,a,n){var r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r={})[a]={weapon:n},e.abrupt("return",t.update(r));case 3:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),O=function(){var e=Object(p.a)(m.a.mark((function e(t,a){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.get().then((function(e){return e.data()[a].weapon})));case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),I=function(){var e=Object(p.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.get().then((function(e){return e.exists?d.collection("users").where(f.firestore.FieldPath.documentId(),"in",Object.keys(e.data())).get().then((function(e){return e.docs.map((function(e){var t=e.data();return t.userId=e.id,t}))})):[]})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(e){var t=e.data(),a=Object.keys(t);if(a.length<2||a.some((function(e){return null===t[e].weapon})))return{tie:!1,userId:null,weapon:null};var n=a.map((function(e){return{tie:!1,userId:e,weapon:t[e].weapon}})),r=Object(u.a)(n,2),c=r[0],o=r[1];return"Rock"===c.weapon&&"Scissors"===o.weapon||"Paper"===c.weapon&&"Rock"===o.weapon||"Scissors"===c.weapon&&"Paper"===o.weapon?c:c.weapon===o.weapon?{tie:!0,userId:null,weapon:c.weapon}:o},x=function(e){return e.get().then((function(e){var t=Object.keys(e.data()).reduce((function(e,t){return e[t]={weapon:null},e}),{});e.ref.update(t).catch((function(e){return console.log("Error encountered: ".concat(e))}))}))},D=function(e,t){if(!(e instanceof Object&&t instanceof Object))return!1;var a=Object.keys(e);if(a.length!==Object.keys(t).length)return!1;for(var n=0;n<a.length;n++){var r=a[n];if(e[r]!==t[r])return!1}return!0},R=function e(t,a){if(!(t instanceof Array&&a instanceof Array)||t.length!==a.length)return!1;for(var n=t.slice(0).sort(),r=a.slice(0).sort(),c=0;c<n.length;c++){var o=n[c],s=r[c];if(!(o instanceof Object&&D(o,s)||o instanceof Array&&e(o,s)||o===s))return!1}return!0};var C=function(e){var t=e.gameDocument,a=e.players,c=e.userId,o=Object(n.useState)(null),l=Object(u.a)(o,2),i=l[0],m=l[1],p=Object(n.useState)(null),f=Object(u.a)(p,2),d=f[0],b=f[1];Object(n.useEffect)((function(){return O(t,c).then((function(e){return m(e)})),t.onSnapshot((function(e){var t=S(e);t.tie?b(t):t.userId&&E(t.userId).then((function(e){Object.assign(e,t),D(e,d)||b(e)}))}))}),[t,c]);var h=function(){return a.map((function(e){return e.name})).join(" vs. ")},v=function(e){var t="";switch(e){case"Rock":t="fas fa-hand-rock";break;case"Paper":t="fas fa-hand-paper";break;case"Scissors":t="fas fa-hand-scissors";break;default:return null}return r.a.createElement("i",{className:t})},g=function(e){var a=e.currentTarget.dataset.name;j(t,c,a).then((function(){return m(a)}))};return null!==d?d.tie?(setTimeout((function(){x(t),m(null),b(null)}),3e3),r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"card-title"},h()),r.a.createElement("p",{className:"card-text"},"It was a tie! Both selected ",r.a.createElement("span",{className:"text-primary"},v(d.weapon)),". Starting a new match..."))):r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"card-title"},d.userId===c?["Congrats, you beat ".concat(a.find((function(e){return e.userId!==d.userId})).name," with "),r.a.createElement("span",{className:"text-primary",key:i},v(i)),"!"]:["Sorry, ".concat(d.name," won with "),r.a.createElement("span",{className:"text-primary",key:i},v(d.weapon)),"."]),r.a.createElement(s.b,{to:"/",className:"btn btn-primary btn-block"},"Play again?")):r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"card-title"},h()),i?r.a.createElement("p",{className:"card-text"},"You chose ",r.a.createElement("span",{className:"text-primary"},v(i)),"!",r.a.createElement("br",null),"Waiting for your opponent..."):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"card-text"},"Choose your weapon!"),r.a.createElement("div",{className:"btn-group d-flex"},["Rock","Paper","Scissors"].map((function(e){return r.a.createElement("button",{type:"button",className:"btn btn-outline-primary",style:{flexGrow:1},"data-name":e,onClick:g,key:e},v(e))})))))};var P=function(){var e=Object(l.g)().gameId,t=b().id,a=N(e),c=Object(n.useState)([]),o=Object(u.a)(c,2),s=o[0],i=o[1],m=Object(n.useState)(null),p=Object(u.a)(m,2),f=p[0],d=p[1];return Object(n.useEffect)((function(){return a.onSnapshot((function(e){I(e.ref).then((function(a){if(!a.find((function(e){return e.userId===t})))return a.length<2&&t?k(e.ref,t):d("/");R(a,s)||i(a)}))}))}),[]),f?r.a.createElement(l.a,{to:f}):r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-4 offset-sm-4"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},e),r.a.createElement("div",{className:"card-body"},s.length<2?r.a.createElement("h5",{className:"card-title"},"Waiting for player..."):r.a.createElement(C,{gameDocument:a,players:s,userId:t})))))};var A=function(){return r.a.createElement(s.a,null,r.a.createElement(l.d,null,r.a.createElement(l.b,{path:"/game/:gameId"},r.a.createElement(P,null)),r.a.createElement(l.b,{path:"/"},r.a.createElement(y,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[26,1,2]]]);
//# sourceMappingURL=main.4bc74ad0.chunk.js.map