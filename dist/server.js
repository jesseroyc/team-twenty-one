!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=25)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-router-dom")},function(e,t){e.exports=require("defaults")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("winston")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("mongodb")},function(e,t){e.exports=require("graceful-fs")},function(e,t){e.exports=require("serialize-javascript")},function(e,t){e.exports=require("react-router-config")},function(e,t,n){t.console=n(15),t.file=n(16),t.mail=n(18),t.papertrail=n(21)},function(e,t,n){var r=n(5),o=n(2);e.exports=function(e){return e=o(e,{level:"info",colorize:!0,prettyPrint:!0,timestamp:!1,handleExceptions:!0}),new r.transports.Console(e)}},function(e,t,n){var r=n(2),o=n(17),i=n(3),s=n(5);e.exports=function(e){e=r(e,{level:"info",name:a()+".log",directory:"logs",maxSize:10485760,maxFiles:10,colorize:!1,timestamp:!0,json:!1});var t=i.join(process.cwd(),e.directory);c(t);var n=i.join(t,e.name);return e.filename=n,new s.transports.File(e)};var a=function(){var e=i.dirname(process.argv[1]).split(i.sep);return e[e.length-1]},c=function(e){o.existsSync(e)||o.mkdirSync(e)}},function(e,t){e.exports=require("fs")},function(e,t,n){var r=n(2),o=n(19),i=n(20);e.exports=function(e){(e=r(e,{timestamp:!0,prettyPrint:!0})).subject&&(e.subject="["+o.hostname()+"] - "+e.subject);return new i.Mail(e)}},function(e,t){e.exports=require("os")},function(e,t){e.exports=require("winston-mail")},function(e,t,n){var r=n(2);e.exports=function(e){return e=r(e,{level:"info",colorize:!0,prettyPrint:!0,timestamp:!1}),new(0,n(22).Papertrail)(e)}},function(e,t){e.exports=require("winston-papertrail")},function(e,t){e.exports=require("react-dom")},function(e,t){e.exports=require("isomorphic-fetch")},function(e,t,n){"use strict";n.r(t);var r=n(3),o=n.n(r),i=n(4),s=n.n(i),a=n(7),c=n.n(a),l=n(8),u=n.n(l),d=n(2),f=n(14),p=n(5);var m=function(e){if(!e)throw new Error("Winston logger must be initialized with options.");t=d(t,{silly:"magenta",verbose:"blue",debug:"cyan",info:"green",warn:"yellow",error:"red",critical:"red",fatal:"red"}),p.addColors(t),h(p);var t;var n=[];Object.keys(e).forEach(function(t){var r=e[t];if(r){if("object"!=typeof r&&(r={}),!f[t])throw new Error("Failed to find transport "+t);var o=f[t],i=o(r);i&&n.push(i)}});var r=new p.Logger({transports:n});return h(r),r}({console:!0});function h(e,t){t=d(t,{silly:0,verbose:1,debug:2,info:3,warn:4,error:5,critical:6,fatal:7}),e.setLevels(t)}p.stream({start:-1}).on("log",function(e){console.log(e)});var v=n(9),g=n.n(v),x=n(10);const b=n.n(x).a.MongoClient;class w{constructor(e,t,n,r){this.HOST=e,this.PORT=t,this.USER=n,this.PASS=r,this.recordId=w.incrementId(),this.record={}}static incrementId(){return this.latestId?this.latestId++:this.latestId=1}setRecord(e,t,n){this.record={_id:this.recordId,tim:Math.floor(Date.now()/1e3),tmp:e,moi:t,lum:n}}insertReading(e,t){let n=this.HOST,r=this.PORT,o=this.USER,i=this.PASS,s=this.record;const a=`mongodb://${o}:${i}@${n}:${r}`;m.info(a),b.connect(a,{useNewUrlParser:!0},function(o,i){o?(m.info(`Failed server connection to ${n} on port ${r}`),console.error(o),i.close()):m.info(`Successful server connection to ${n} on port ${r}`),i.db(e).collection(t).insertOne(s,function(n,r){n?(m.info(`Failed 'insert' client request for ${t} in ${e}`),console.error(n),i.close()):(m.info(`Successful 'insert' client request for ${t} in ${e}`),m.info("Inserted Record:\n  {\n    _id: "+r.ops[0]._id+"\n    tim: "+r.ops[0].tim+"\n    tmp: "+r.ops[0].tmp+"\n    moi: "+r.ops[0].moi+"\n    lum: "+r.ops[0].lum+"\n  }"))})})}getReadings(e,t){let n=this.HOST,r=this.PORT;const o=`mongodb://${this.USER}:${this.PASS}@${n}:${r}`;b.connect(o,{useNewUrlParser:!0},function(o,i){o?(m.info(`Failed server connection to ${n} on port ${r}`),console.error(o),i.close()):m.info(`Successful server connection to ${n} on port ${r}`),i.db(e).collection(t).find({}).toArray(function(n,r){if(n)m.info(`Failed 'find' client request for ${t} in ${e}`),console.error(n),i.close();else{let n=r.map(e=>parseFloat(e.tmp)).filter(e=>!Number.isNaN(e)),o=r.map(e=>parseFloat(e.moi)).filter(e=>!Number.isNaN(e)),i=r.map(e=>parseFloat(e.lum)).filter(e=>!Number.isNaN(e));m.info(`Successful 'find' client request for ${t} in ${e}`+`\nTemperature Readings:\n [${n}]`+`\nMoisture Readings:\n [${o}]`+`\nBrightness Readings:\n [${i}]`)}})})}}var $=n(11),_=n.n($),y=n(12),S=n.n(y),E=n(0),q=n.n(E),P=(n(23),n(1)),j=n(6),O=n.n(j),R=n(13),T=(n(24),e=>fetch(`https://jsonplaceholder.typicode.com/${e}`).then(e=>e.json()).then(e=>e.filter((e,t)=>t<10)));var A=[{path:"/",exact:!0,component:e=>q.a.createElement("h1",null,"Hello ",e.name,"!")},{path:"/todos",component:class extends q.a.Component{constructor(e){super(e),e.staticContext&&e.staticContext.data?this.state={data:e.staticContext.data}:this.state={data:[]}}componentDidMount(){setTimeout(()=>{window.__ROUTE_DATA__?(this.setState({data:window.__ROUTE_DATA__}),delete window.__ROUTE_DATA__):T("todos").then(e=>{this.setState({data:e})})},0)}render(){const{data:e}=this.state;return q.a.createElement("ul",null,e.map(e=>q.a.createElement("li",{key:e.id},e.title)))}},loadData:()=>T("todos")},{component:({staticContext:e={}})=>(e.status=404,q.a.createElement("h1",null,"Oops 404, nothing here!"))}],N=e=>q.a.createElement("div",null,q.a.createElement(P.NavLink,{to:"/"},"Home"),q.a.createElement(P.NavLink,{to:"/todos"},"Todos"),q.a.createElement(P.Switch,null,Object(R.renderRoutes)(A)));var F=function(e,t){const n=A.find(t=>Object(P.matchPath)(e.url,t))||{};(n.loadData?n.loadData():Promise.resolve(null)).then(n=>{const r={data:n},i=o.a.resolve(__dirname,"./public/index.html");_.a.readFile(i,"utf8",(o,i)=>{if(o)return console.error("Error:",o),t.status(500).end();if(404===r.status){console.log("err"),t.status(404);const e=O.a.renderToString(q.a.createElement("div",{id:"root"},q.a.createElement("p",null,"404")));return console.log("err"),t.send(i.replace('<div id="root"></div>',e))}const s=O.a.renderToString(q.a.createElement("div",{id:"root"},q.a.createElement(P.StaticRouter,{location:e.url,context:r},q.a.createElement(N,null))));return console.log("\n"+s+"\n"),t.send(i.replace('<div id="root"></div>',s).replace("</body>",`<script>window.__ROUTE_DATA__=${S()(n)}<\/script></body>`))})})};const I=s()();I.use(g()("dev")),I.use(u()()),I.use(c()()),I.use(s.a.json()),I.use(s.a.urlencoded({extended:!1})),I.use(s.a.static(o.a.join(__dirname,"public"))),I.get("/record/:tmp/:moi/:lum",function(e,t,n){let r=new w("0.0.0.0","27017","admin","4dmInP4ssw0rd");r.setRecord(e.params.tmp,e.params.moi,e.params.lum),r.insertReading("mydatabase","records"),n()}),I.get("/record",function(e,t,n){new w("0.0.0.0","27017","admin","4dmInP4ssw0rd").getReadings("mydatabase","records"),n()}),I.get("*",function(e,t){F(e,t)}),I.listen(8080,function(e,t,n){e&&(n.locals.message=e.message,n.locals.error="development"===t.app.get("env")?e:{},m.error(`${e.status||500} - ${e.message} - ${t.originalUrl} - ${t.method} - ${t.ip}`),n.status(e.status||500),n.render("error")),m.info("APP is now running on port 8080")});t.default=I}]);