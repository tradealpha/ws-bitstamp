(this["webpackJsonpws-bitstamp"]=this["webpackJsonpws-bitstamp"]||[]).push([[0],{175:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(55),l=a.n(o),i=(a(64),a(29)),c=a(30),u=a(56),d={maintainAspectRatio:!1,tooltips:{enabled:!0},scales:{xAxes:[{ticks:{autoSkip:!0,maxTicksLimit:10}}]}},s=function(e){var t=e.data,a=e.data2,r=e.labels,o=e.chartLabel,l=function(e,t,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return{labels:r,datasets:[{label:e,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:t},{label:e+"ema",lineTension:.1,borderColor:"rgba(75,150,152,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:a}]}}(void 0===o?"":o,t,a,r);return n.a.createElement(u.a,{data:l,options:d})},b=a(58),m=a.n(b),f=["#838B8B","#7A8B8B","#C1CDCD","#668B8B","#B4CDCD","#2F4F4F","#2F4F4F","#5F9F9F","#C0D9D9","#528B8B","#E0EEEE","#96CDCD","#388E8E","#79CDCD","#D1EEEE","#8FD8D8","#66CCCC","#ADEAEA"],p=["btcusd","xrpusd","ltcusd","ethusd","bchusd"].map((function(e){return"live_trades_"+e})),v={value:0,growth:0,colorIdx:0,values:[]},h=new Array(1).fill(0).map((function(e){return new Array(p.length).fill(v)})),g=function(e){var t=e.text,a=e.isPrimary,r="badge badge-pill badge-"+(void 0!==a&&a?"primary":"secondary");return n.a.createElement("span",{onClick:function(){return e.onClick(t)},className:r},t)},E=function(e){var t=e.channelSelected,a=void 0===t?"live_trades_btcusd":t;return n.a.createElement(n.a.Fragment,null,p.map((function(t,r){return n.a.createElement(g,{key:r,onClick:function(t){return e.onClick(t)},text:t,isPrimary:a===t})})))},C=function(e){return n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,p.map((function(e){return n.a.createElement("th",{key:e},e)})))),n.a.createElement("tbody",null,e.data.map((function(e,t){return n.a.createElement("tr",{key:t},e.map((function(e,t){return n.a.createElement("td",{key:t,style:{backgroundColor:f[e.colorIdx],transition:"background-color .4s"}},e.value," (",m.a.number.formatNumber(e.growth),")")})))}))))},k=function(e){return{a:[1],b:new Array(e).fill(1).map((function(t){return t/e}))}},B=function(e,t){var a=e.b,r=e.a,n=r.length,o=a.length,l=t.length,i=new Array(l).fill(0),c=0;for(c=0;c<l;c++){i[c]=0;var u=0;for(u=0;u<o;u++)c-u+1>0&&c-u+1<=l&&(i[c]=a[u]*t[c-u]+i[c]);for(u=1;u<n;u++)c-u+1>0&&(i[c]=-r[u]*i[c-u]+i[c])}return i},y=new WebSocket("wss://ws.bitstamp.net");y.onopen=function(){p.forEach((function(e){y.send(JSON.stringify({event:"bts:subscribe",data:{channel:e}}))}))};var w=function(e,t,a){var r=function(e,t){var a=e.length;if(a<t){var r=e[0];return new Array(t-a).fill(r)}return e}(e,a),n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,a=k(t),r=a.a,n=a.b;return B({b:n,a:r},e)}(r,t),o=r.slice(t),l=n.slice(t);return console.log({data:o,ma:l}),{data:o,ma:l}},D=function(){var e=Object(r.useState)(h),t=Object(c.a)(e,2),a=t[0],o=t[1],l=Object(r.useState)("live_trades_btcusd"),u=Object(c.a)(l,2),d=u[0],b=u[1];y.onmessage=function(e){var t=JSON.parse(e.data);if(t.data&&t.data.price){var r=p.indexOf(t.channel),n=a[0][r],l=t.data.price,c=100*(l-n.value)/n.value,u=Math.sign(c)+1,d=[].concat(Object(i.a)(a[0][r].values),[l]);a[0][r]={value:l,growth:c,colorIdx:u,values:d},o(Object(i.a)(a))}};var m=p.indexOf(d),f=w(a[0][m].values,10,15),v=f.data,g=f.ma;return n.a.createElement(n.a.Fragment,null,n.a.createElement("h3",null,"Table"),n.a.createElement(C,{data:a}),n.a.createElement("h3",null,"Chart"),n.a.createElement(E,{onClick:function(e){return b(e)},channelSelected:d}),n.a.createElement(s,{chartLabel:d,data:v,data2:g,labels:v.map((function(e,t){return""+t}))}))},S=function(){return n.a.createElement("div",{className:"container"},n.a.createElement(D,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},59:function(e,t,a){e.exports=a(175)},64:function(e,t,a){}},[[59,1,2]]]);
//# sourceMappingURL=main.ba639792.chunk.js.map