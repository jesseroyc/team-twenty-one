!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=26)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-router-dom")},function(e,t){e.exports=require("defaults")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("winston")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("mongodb")},function(e,t){e.exports=require("graceful-fs")},function(e,t){e.exports=require("serialize-javascript")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("react-router-config")},function(e,t){e.exports=require("dotenv")},function(e,t,n){t.console=n(16),t.file=n(17),t.mail=n(19),t.papertrail=n(22)},function(e,t,n){var r=n(5),o=n(2);e.exports=function(e){return e=o(e,{level:"info",colorize:!0,prettyPrint:!0,timestamp:!1,handleExceptions:!0}),new r.transports.Console(e)}},function(e,t,n){var r=n(2),o=n(18),i=n(3),s=n(5);e.exports=function(e){e=r(e,{level:"info",name:a()+".log",directory:"logs",maxSize:10485760,maxFiles:10,colorize:!1,timestamp:!0,json:!1});var t=i.join(process.cwd(),e.directory);c(t);var n=i.join(t,e.name);return e.filename=n,new s.transports.File(e)};var a=function(){var e=i.dirname(process.argv[1]).split(i.sep);return e[e.length-1]},c=function(e){o.existsSync(e)||o.mkdirSync(e)}},function(e,t){e.exports=require("fs")},function(e,t,n){var r=n(2),o=n(20),i=n(21);e.exports=function(e){(e=r(e,{timestamp:!0,prettyPrint:!0})).subject&&(e.subject="["+o.hostname()+"] - "+e.subject);return new i.Mail(e)}},function(e,t){e.exports=require("os")},function(e,t){e.exports=require("winston-mail")},function(e,t,n){var r=n(2);e.exports=function(e){return e=r(e,{level:"info",colorize:!0,prettyPrint:!0,timestamp:!1}),new(0,n(23).Papertrail)(e)}},function(e,t){e.exports=require("winston-papertrail")},function(e,t){e.exports=require("react-dom")},function(e,t){e.exports=require("isomorphic-fetch")},function(e,t,n){"use strict";n.r(t);var r=n(3),o=n.n(r),i=n(4),s=n.n(i),a=n(6),c=n.n(a),u=n(7),l=n.n(u),d=n(2),p=n(15),f=n(5);var m=function(e){if(!e)throw new Error("Winston logger must be initialized with options.");t=d(t,{silly:"magenta",verbose:"blue",debug:"cyan",info:"green",warn:"yellow",error:"red",critical:"red",fatal:"red"}),f.addColors(t),h(f);var t;var n=[];Object.keys(e).forEach(function(t){var r=e[t];if(r){if("object"!=typeof r&&(r={}),!p[t])throw new Error("Failed to find transport "+t);var o=p[t],i=o(r);i&&n.push(i)}});var r=new f.Logger({transports:n});return h(r),r}({console:!0});function h(e,t){t=d(t,{silly:0,verbose:1,debug:2,info:3,warn:4,error:5,critical:6,fatal:7}),e.setLevels(t)}f.stream({start:-1}).on("log",function(e){console.log(e)});var v=n(8),g=n.n(v),x=n(9);const b=n.n(x).a.MongoClient;class ${constructor(e,t,n,r){this.HOST=e,this.PORT=t,this.USER=n,this.PASS=r,this.recordId=$.incrementId(),this.record={}}static incrementId(){return this.latestId?this.latestId++:this.latestId=1}setRecord(e,t,n,r){this.record={_id:this.recordId,tim:Math.floor(Date.now()/1e3),tmp:e,moi:t,hum:n,pre:r}}insertReading(e,t){let n=this.HOST,r=this.PORT,o=this.USER,i=this.PASS,s=this.record;const a=`mongodb://${o}:${i}@${n}:${r}`;return m.info(a),new Promise(function(o,i){return setTimeout(function(){b.connect(a,{useNewUrlParser:!0},function(a,c){a?(m.info(`Failed server connection to ${n} on port ${r}`),console.error(a),c.close(),o(`Failed server connection to ${n} on port ${r}`)):m.info(`Successful server connection to ${n} on port ${r}`),c.db(e).collection(t).insertOne(s,function(n,r){n?(m.info(`Failed 'insert' client request for ${t} in ${e}`),console.error(n),c.close(),i(`Failed 'insert' client request for ${t} in ${e}`)):(m.info(`Successful 'insert' client request for ${t} in ${e}`),o(`Successful 'insert' client request for ${t} in ${e}`))})})},3e3)})}getReadings(e,t){let n=this.HOST,r=this.PORT;const o=`mongodb://${this.USER}:${this.PASS}@${n}:${r}`;return new Promise(function(i,s){return setTimeout(function(){b.connect(o,{useNewUrlParser:!0},function(o,a){o?(m.info(`Failed server connection to ${n} on port ${r}`),console.error(o),a.close(),s(`Failed server connection to ${n} on port ${r}`)):m.info(`Successful server connection to ${n} on port ${r}`),a.db(e).collection(t).find({}).toArray(function(n,r){if(n)m.info(`Failed 'find' client request for ${t} in ${e}`),console.error(n),a.close(),s(`Failed 'insert' client request for ${t} in ${e}`);else{let e={tmp:r.map(e=>parseFloat(e.tmp)).filter(e=>!Number.isNaN(e)),moi:r.map(e=>parseFloat(e.moi)).filter(e=>!Number.isNaN(e)),hum:r.map(e=>parseFloat(e.hum)).filter(e=>!Number.isNaN(e)),pre:r.map(e=>parseFloat(e.pre)).filter(e=>!Number.isNaN(e))};m.info(e),i(e)}})})},3e3)})}}var w=n(10),y=n.n(w),S=n(11),_=n.n(S),q=n(0),P=n.n(q),E=(n(24),n(12)),R=n.n(E),O=n(1),T=n(13),j=(n(25),e=>fetch(`https://jsonplaceholder.typicode.com/${e}`).then(e=>e.json()).then(e=>e.filter((e,t)=>t<10)));var F=[{path:"/",exact:!0,component:e=>P.a.createElement("h1",null,"Hello ",e.name,"!")},{path:"/todos",component:class extends P.a.Component{constructor(e){super(e),e.staticContext&&e.staticContext.data?this.state={data:e.staticContext.data}:this.state={data:[]}}componentDidMount(){setTimeout(()=>{window.__ROUTE_DATA__?(this.setState({data:window.__ROUTE_DATA__}),delete window.__ROUTE_DATA__):j("todos").then(e=>{this.setState({data:e})})},0)}render(){const{data:e}=this.state;return P.a.createElement("p",null)}},loadData:()=>j("todos")},{component:({staticContext:e={}})=>(e.status=404,P.a.createElement("h1",null,"Oops 404, nothing here!"))}],N=e=>P.a.createElement("div",null,P.a.createElement(O.NavLink,{to:"/"},"Home"),P.a.createElement(O.NavLink,{to:"/todos"},"Todos"),P.a.createElement(O.Switch,null,Object(T.renderRoutes)(F)));var D=function(e,t,n){const r=F.find(t=>Object(O.matchPath)(e.url,t))||{};(r.loadData?r.loadData():Promise.resolve(null)).then(r=>{const i={data:r},s=o.a.resolve(__dirname,"./public/index.html");y.a.readFile(s,"utf8",(o,s)=>{o&&console.error(o);const a=R.a.renderToString(P.a.createElement("div",{id:"root"},P.a.createElement(O.StaticRouter,{location:e.url,context:i},P.a.createElement(N,null))));return console.log(n),t.send(s.replace('<div id="data"></div>',`\n        <h2>Temperature Data</h2>\n        <p>${n.tmp.toString()}</p>\n        <p> </p>\n        <h2>Moisture Data</h2>\n        <p>${n.moi.toString()}</p>\n        <p> </p>\n        <h2>Pressure Data</h2>\n        <p>${n.pre.toString()}</p>\n        <p> </p>\n        <h2>Humidity Data</h2>\n        <p>${n.hum.toString()}</p>\n        <p> </p>\n        <canvas id="myChart" width="400" height="400"></canvas>\n        <script>\n          var ctx = $('#myChart');\n          var myChart = new Chart(ctx, {\n              type: 'line',\n              data: ${n.tmp},\n              options: options\n          });\n        <\/script>`).replace('<div id="root"></div>',a).replace("</body>",`<script>window.__ROUTE_DATA__=${_()(r)}<\/script></body>`))})})};n(14).config();const A=s()();A.use(g()("dev")),A.use(l()()),A.use(c()()),A.use(s.a.json()),A.use(s.a.urlencoded({extended:!1})),A.use(s.a.static(o.a.join(__dirname,"public"))),A.get("/record/:tmp/:moi/:hum/:pre",function(e,t,n){let r=new $("mongodb","27017","admin","4dmInP4ssw0rd");r.setRecord(e.params.tmp,e.params.moi,e.params.hum,e.params.pre),r.insertReading("mydatabase","records").then(function(e){t.send(e)}).catch(function(e){t.send(e)})}),A.get("/record",function(e,t,n){new $("mongodb","27017","admin","4dmInP4ssw0rd").getReadings("mydatabase","records").then(function(e){t.send(e)}).catch(function(e){t.send(e)}),n()}),A.get("*",function(e,t){new $("mongodb","27017","admin","4dmInP4ssw0rd").getReadings("mydatabase","records").then(function(n){D(e,t,n)}).catch(function(n){D(e,t,n)})}),A.listen(process.env.SERVER_PORT,function(e,t,n){e&&(n.locals.message=e.message,n.locals.error="development"===t.app.get("env")?e:{},m.error(`${e.status||500} - ${e.message} - ${t.originalUrl} - ${t.method} - ${t.ip}`),n.status(e.status||500),n.render("error")),m.info("Listening on",process.env.SERVER_PORT)});t.default=A}]);