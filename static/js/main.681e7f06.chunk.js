(this["webpackJsonpreact-rps"]=this["webpackJsonpreact-rps"]||[]).push([[0],{26:function(e,t,a){e.exports=a(42)},31:function(e,t,a){},37:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(23),o=a.n(c),s=(a(31),a(10)),l=a(7),u=a(4),i=a(2),m=a.n(i),p=a(8),f=a(12);a(33);f.initializeApp({apiKey:"AIzaSyCpU5AfFhgbrjaTR8sKyB_O6h9VYGCNmDk",authDomain:"rock-paper-scissors-b198e.firebaseapp.com",databaseURL:"https://rock-paper-scissors-b198e.firebaseio.com",projectId:"rock-paper-scissors-b198e",storageBucket:"rock-paper-scissors-b198e.appspot.com",messagingSenderId:"530589049037",appId:"1:530589049037:web:f677fbd6b66d8483654984"});var d=f.firestore(),b=function(){var e={};try{e=JSON.parse(localStorage.getItem("player"))||{}}catch(t){console.log("Deleting corrupted player in local storage."),localStorage.removeItem("player")}return e},h=function(e){localStorage.setItem("player",JSON.stringify(e))},v=function(){var e=Object(p.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",d.collection("users").add(t).then((function(e){return e.id})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(p.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",d.collection("users").doc(t).get().then((function(e){return e.data()})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();a(37);var E=function(e){var t=e.user,a=e.setUser;return"undefined"!==typeof t.name&&"undefined"!==typeof t.email?null:r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-4 offset-md-4"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"New phone, who dis?"),r.a.createElement("p",{className:"card-text"},"Before we begin, I need to know who you are"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=e.target.elements.name.value.trim(),n=e.target.elements.email.value.trim().toLowerCase();if(t&&n){var r={name:t,email:n};v(r).then((function(e){r.id=e,a(r)}))}}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",className:"form-control",name:"name",placeholder:"Your Name"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"email",className:"form-control",name:"email",placeholder:"Your Email"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"},"Let's RPS!"))))))},g=function(e){return d.collection("games").doc(e)},y=function(){var e=Object(p.a)(m.a.mark((function e(t,a){var n,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="DocumentReference"===t.constructor.name?t:g(t),(r={})[a]={weapon:null},e.abrupt("return",n.set(r,{merge:!0}));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),N=function(){var e=Object(p.a)(m.a.mark((function e(t,a,n){var r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r={})[a]={weapon:n},e.abrupt("return",t.update(r));case 3:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),k=function(){var e=Object(p.a)(m.a.mark((function e(t,a){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.get().then((function(e){return e.data()[a].weapon})));case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),j=function(){var e=Object(p.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.get().then((function(e){var t=Object.keys(e.data());return d.collection("users").where(f.firestore.FieldPath.documentId(),"in",t).get().then((function(e){return e.docs.map((function(e,a){var n=e.data();return n.id=t[a],n}))}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(e){var t=Object.keys(e);if(t.length<2||t.some((function(t){return null===e[t].weapon})))return null;var a=t.map((function(t){return{userId:t,weapon:e[t].weapon}})),n=Object(u.a)(a,2),r=n[0],c=n[1];return"Rock"===r.weapon&&"Scissors"===c.weapon||"Paper"===r.weapon&&"Rock"===c.weapon||"Scissors"===r.weapon&&"Paper"===c.weapon?r:r.weapon===c.weapon?0:c},S=function(e){e.get().then((function(t){var a=Object.keys(t.data()).reduce((function(e,t){return e[t]={weapon:null},e}),{});e.set(a)})).catch((function(e){console.log("Error encountered: ".concat(e))}))};var I=function(e){var t=e.userId,a=Object(n.useState)(null),c=Object(u.a)(a,2),o=c[0],s=c[1];return o?r.a.createElement(l.a,{to:"/game/".concat(o)}):r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-4 offset-sm-4"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"card-text"},"Decide if you want to start a new game, or join an existing one"),r.a.createElement("button",{className:"btn btn-primary btn-block mb-3",onClick:function(e){var a="Game_".concat(Math.round(1e3*Math.random()));y(a,t).then((function(){return s(a)}))}},"Start a new game"),r.a.createElement("hr",null),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=e.target.elements.name.value.trim();y(a,t).then((function(){return s(a)}))}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",className:"form-control",name:"name",placeholder:"Game Name"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"},"Join a game"))))))};var x=function(){var e=Object(n.useState)(b()),t=Object(u.a)(e,2),a=t[0],c=t[1];return r.a.createElement("div",{className:"Home"},r.a.createElement(E,{user:a,setUser:function(e){h(e),c(e)}}),a.id?r.a.createElement(I,{userId:a.id}):null)},D=function(e,t){if(!(e instanceof Object&&t instanceof Object))return!1;var a=Object.keys(e);if(a.length!==Object.keys(t).length)return!1;for(var n=0;n<a.length;n++){var r=a[n];if(e[r]!==t[r])return!1}return!0},F=function e(t,a){if(!(t instanceof Array&&a instanceof Array)||t.length!==a.length)return!1;for(var n=t.slice(0).sort(),r=a.slice(0).sort(),c=0;c<n.length;c++){var o=n[c],s=r[c];if(!(o instanceof Object&&D(o,s)||o instanceof Array&&e(o,s)||o===s))return!1}return!0};var R=function(e){var t=e.gameDocument,a=e.userId,c=Object(n.useState)([]),o=Object(u.a)(c,2),l=o[0],i=o[1],m=Object(n.useState)(null),p=Object(u.a)(m,2),f=p[0],d=p[1],b=Object(n.useState)(null),h=Object(u.a)(b,2),v=h[0],E=h[1];return j(t).then((function(e){F(e,l)||i(e)})),k(t,a).then((function(e){return d(e)})),t.onSnapshot((function(e){var t=O(e.data());if(0===t)E(t);else if(t){var a=t.userId,n=t.weapon;a&&n&&w(a).then((function(e){e.id=a,e.weapon=n,D(e,v)||E(e)}))}})),null!==v?r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"card-title"},function(){if(0===v)return setTimeout((function(){S(t),E(null)}),3e3),"It was a tie! Both selected ".concat(f,". Starting a new match...");if(v){if(v.id===a){var e=l.find((function(e){return e.id!==v.id}));return"Congrats, you beat ".concat(e.name," with ").concat(f,"!")}return"Sorry, ".concat(v.name," won with ").concat(v.weapon,".")}}()),v?r.a.createElement(s.b,{to:"/",className:"btn btn-primary btn-block"},"Play again?"):null):r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"card-title"},l.map((function(e){return e.name})).join(" vs ")),f?r.a.createElement("p",{className:"card-text"},"You chose ",f,"! Waiting for your opponent..."):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"card-text"},"Choose your weapon!"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=e.target.elements.weapon.value;N(t,a,n).then((function(){return d(n)}))}},r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:"form-check"},r.a.createElement("input",{id:"weapon_rock",className:"form-check-input",type:"radio",name:"weapon",value:"Rock"}),r.a.createElement("label",{htmlFor:"weapon_rock",className:"form-check-label"},"Rock")),r.a.createElement("div",{className:"form-check"},r.a.createElement("input",{id:"weapon_paper",className:"form-check-input",type:"radio",name:"weapon",value:"Paper"}),r.a.createElement("label",{htmlFor:"weapon_paper",className:"form-check-label"},"Paper")),r.a.createElement("div",{className:"form-check"},r.a.createElement("input",{id:"weapon_scissors",className:"form-check-input",type:"radio",name:"weapon",value:"Scissors"}),r.a.createElement("label",{htmlFor:"weapon_scissors",className:"form-check-label"},"Scissors"))),r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"},"Shoot!"))))};var _=function(){var e=Object(l.g)().gameId,t=b().id,a=Object(n.useState)(0),c=Object(u.a)(a,2),o=c[0],s=c[1];if(!e||!t)return r.a.createElement(l.a,{to:"/"});var i=g(e);return i.onSnapshot((function(e){var a=Object.keys(e.data());a.includes(t)?s(a.length):y(i,t)}),(function(e){console.log("Encountered error: ".concat(e))})),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-4 offset-sm-4"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},e),r.a.createElement("div",{className:"card-body"},o<2?r.a.createElement("h5",{className:"card-title"},"Waiting for player..."):r.a.createElement(R,{gameDocument:i,userId:t})))))};var P=function(){return r.a.createElement(s.a,null,r.a.createElement(l.d,null,r.a.createElement(l.b,{path:"/game/:gameId"},r.a.createElement(_,null)),r.a.createElement(l.b,{path:"/"},r.a.createElement(x,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[26,1,2]]]);
//# sourceMappingURL=main.681e7f06.chunk.js.map