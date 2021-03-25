// version v0.0.1
// create by ruicky
// detail url: https://github.com/ruicky/jd_sign_bot
/*
2020.3.5增加内置互助码填写
2020.3.7修复github 日志log显示不了多账号,增加惊喜农场不需要运行的账号跳过功能


*/
const $ = new Env();
let message = '', subTitle = '', option = {};
let SyncUrl ='';
const exec = require("child_process").execSync;
const fs = require("fs");
const download = require("download");


const JD_COOKIE = process.env.JD_COOKIE; //格式格式格式三遍

const Efork = process.env.EFORK; //
const SCKEY = process.env.SCKEY; //SEVER-酱油
const BARK_PUSH = process.env.BARK_PUSH; //
const PUSH_KEY = process.env.PUSH_KEY; //
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN; //TG通知比较好用
const TG_USER_ID = process.env.TG_USER_ID; //
const HELPURL = process.env.HELPURL;//朱丽娜
//个别参数 懂的自己加
const JOY_FEED_COUNT = process.env.JOY_FEED_COUNT; //宠汪汪🐕喂食
const JXNCTOKENS = process.env.JXNCTOKENS; //京戏农场种子






let jxnc_nodo=[2,3];//惊喜农场固定跳过号码,格式jxnc_nodo=[0,1],意思是跳过第1个,第2个号码不执行.


let NCShareCodes=[""];//京东农厂
let JCShareCodes=[""];//惊喜工厂
let DCShareCodes=[""];//东东农场
let MCShareCodes=[""];//萌宠
let MHShareCodes=[""];//京东盲盒
let ZDShareCodes=[""];//种豆
let ASShareCodes=[""];//签到领现金

NCShareCodes=["f2197d1432e3411d829bd670817e01b7","b5f3ef0e26ca45168580aefc083041a0","086685c5f6d64d8b8f751b6f4e9dc24d","633a171106bf42e7b0acbe61537e808f","72abfb7ee84e4123ac3028cd08c0a12d","1de91324eece461488a7ac33b8718aee","0801afa8ac904cc6b8e390d5f04f2fc5","a2c0714f2b344f2698cbaf956cca65ad","81abadbb2f9e4df2ab1d05739afd6698","f4a6a17069d94080a404798fa1ef3c12","ee9a2d8a819a41ae984dde81d9bcdd43","d1cd415390694b87bd21d53a85e83869"];
JCShareCodes=["pHRNrDai-a5hXtlfqXac8A==","Zwrvqz6IsIc2PRiZopHT7g==","wYdCevJRuZNDNu2vXv2bFA==","nArNNS8ewC_4WdCswV5_zw==","VQpzW3dh8pAnU2X7APJpEg==","tnfgzU622uCDPzg5dfXg0A==","r3uAhp6FO81UAeGNnm937Q==","IjzF81WX1j60gxIXhMZHSQ==","aRRVeU1ZB-Joi4gd2QmhWg=="];
DCShareCodes=["T0225KkcRBxN8FzQdRzzlvUIcgCjVWnYaS5kRrbA","T016anTdlaqWLfZ--LhdCjVWnYaS5kRrbA","T0225KkcRBxNpgeBIxz9waYDcACjVWnYaS5kRrbA","T0225KkcRU1L8VKEJ0-mk_VcJgCjVWnYaS5kRrbA","T0225KkcRhoeoVGBIEihkPFYfQCjVWnYaS5kRrbA","T0225KkcRh4f91HWdkylxfUCcACjVWnYaS5kRrbA","T019-aknJmBaoQu-Xluoy5MCjVWnYaS5kRrbA","T0225KkcRxcYo1DQcR7wkvQOdQCjVWnYaS5kRrbA","T0225KkcRRZM8FLUJE79kf9edgCjVWnYaS5kRrbA","T0225KkcRx0Q81HSc0ilxaVedQCjVWnYaS5kRrbA","T0225KkcRhsfpALQKROllqVZfACjVWnYaS5kRrbA"];
MCShareCodes=["MTAxODc2NTEzMzAwMDAwMDAxODM5ODg0Nw==","MTAxODc2NTEzNDAwMDAwMDAzMjM1MTE1Nw==","MTAxODc2NTEzOTAwMDAwMDAzMjM3MTk3Nw==","MTAxODcxOTI2NTAwMDAwMDAzMjUyNTI4MQ==","MTAxODc2NTEzMjAwMDAwMDAzMjUyODA2MQ==","MTAxODc2NTEzNDAwMDAwMDAzMjcwOTM1MQ==","MTAxODc2NTEzNDAwMDAwMDAzMjUyOTA2Mw==","MTAxODc2NTEzMzAwMDAwMDAzMjUyODUzNQ==","MTAxODc2NTEzMTAwMDAwMDAzMjUyODg3OQ==","MTE1NDQ5OTIwMDAwMDAwMzg5Mzk3OTk=","MTAxODcxOTI2NTAwMDAwMDAzMjUyOTI4Nw==","MTAxODc2NTEzMzAwMDAwMDAzMjUyODI3Mw=="];
ZDShareCodes=["e7lhibzb3zek2u6kdq7zrgp6ivisdp5axg4gbka","4larfd6ua4eczfrqw3shs5jvfu3imwdcde6rn4y","xu4ehkymhcid3xttz4mcoulura5ac3f4ijdgqji","e7lhibzb3zek2evy6ub3wsf7jqzl66q5f54xlgq","mlrdw3aw26j3xnbftfmu3ivj6kcrhtmm7p6ezjq","olmijoxgmjutzouvc3bcaqwvjy526j34qnrco3a","olmijoxgmjutyzdyxup3lnfzjy4d5il6hxx4vuq","cmrosoueoysgadlzm4fe2shtviwrmciqd6vtioy","4npkonnsy7xi3ktvwfan7tk4rbimpbpp3bfhoii","mlrdw3aw26j3w7x7t3qjtz6q4epjsqxcxplyy6a","4npkonnsy7xi22qn6ed5xduytniffpjfxqvupyq","olmijoxgmjuty57odhh3f2bl77zzyvfcks42luq"];
ASShareCodes=["eU9YaO7mY_QhpGjSyXER0A","eU9YKJP6NKdSpxipmixh","95KZuVg9vl6PKcx8","eU9YaO7mNa9w8mjcniIa0g","eU9Yab_gYvp19juHzHFFhA","eU9Yaui1Mvlw8TyAz3VB3w","ZE9jCpLxMqNPjy-JlBc","eU9Ya-WzMPghoGrRzXAX1w","eU9YaeTnY_ol9TrczntH1A","eU9Yauy0ZPknpziEmnEb0g","eU9Ya--7YPkjojyEmiFH1w","eU9Yaum0N6oh-GeEySFA3g"];

//格式["AA","BB","CC"]

//当前互助码活动(动态更新中):['NC@京东农场', 'AS@签到领现金', 'MC@萌宠', 'JC@惊喜工厂', 'DC@京东工厂', 'ZD@种豆', 'MH@盲盒']

let CookieJDs = [];
let shareCodes=[];

async function downFile() {
   
    await download(SyncUrl, "./",{filename:'temp.js'});
}

async function changeFiele(content, cookie) {

     let newContent = content.replace("require('./jdCookie.js')", JSON.stringify({ CookieJD: cookie }));
     
     newContent = newContent.replace(`require("./jdCookie.js")`, JSON.stringify({ CookieJD: cookie }));
     
     newContent = newContent.replace(`require('./jdCookie.js')`, JSON.stringify({ CookieJD: cookie }));
          
     newContent = newContent.replace(Efork,'Efork');
    
    newContent = newContent.replace(/require\('.\/(\w+)ShareCodes.js\'\)/g, JSON.stringify(shareCodes)); 
 
    newContent =newContent.replace(/var Key = ''/, `var Key = '${cookie}'`);
       if (!HELPURL)  
      console.log(`木有互助码数据，请在secret中加入朱丽娜网址`);
      else
     newContent =newContent.replace(`https://raw.githubusercontent.com/jd1994527314/iosrule/cs/JD_TG`, `${HELPURL}` );
     
     newContent=AddFirstCode(newContent);
     
      await fs.writeFileSync( './temp.js', newContent, 'utf8')
    
}

async function executeOneByOne() {
    const content = await fs.readFileSync("./temp.js", "utf8");
    for (var i = 0; i < CookieJDs.length; i++) {
        console.log(`正在执行第${i + 1}个任务`);
  if (process.env.SYNCURL.indexOf('j0xn0c.js')>0)
{
  if (jxnc_nodo.indexOf(i)>=0)
      {
  console.log(`惊喜农场默认设置,跳过第${i + 1}个账号`);
      continue;}
      
      
 }      
        
        
        changeFiele(content, CookieJDs[i]);
        $.UserName = decodeURIComponent(CookieJDs[i].match(/pt_pin=(.+?);/) && CookieJDs[i].match(/pt_pin=(.+?);/)[1])
        $.index = i + 1;
        $.nickName = '';
        message = ''
       console.log(`\n******开始【冬瓜号${$.index}】${$.nickName.slice(-4) || $.UserName.slice(-4)}*********\n`);
       await exec("node temp.js >> result"+(i+1)+".txt");
     
       const path = "./result"+(i+1)+".txt";
       let rcontent = "";
       if (fs.existsSync(path)) {
          rcontent = fs.readFileSync(path, "utf8");
       }
 
         if (SyncUrl.indexOf('JD_DailyBonus')>0) {
            const notify = $.isNode() ?require('./sendNotify') : '';
             message=rcontent.substring(rcontent.indexOf('【签到概览】'),rcontent.indexOf('签到用时'))
             console.log(message);

          if ($.isNode()) {
              subTitle = `【账号${$.index}】${$.UserName}`;
              await notify.sendNotify(`签到通知`, `${subTitle}\n${message}`);
          
           }
          console.log('发送结果完毕');
          
          
  } else if (SyncUrl.indexOf('jd_get_share_code')>0) 
  {
     console.log(hideme(rcontent,0));
     //console.log(rcontent,0);
       } 
 else    

  {
         
       console.log(hideme(rcontent,1));
     //console.log(rcontent,1);

     }
       
    }
}

async function start() {
    if (!JD_COOKIE) {
        
        return;
    }
   if (!process.env.SYNCURL) {
     
        return;
    }

    if (process.env.SYNCURL.indexOf('http')<0)
    {if (!process.env.GITHUB)   return;
    
    SyncUrl = process.env.GITHUB+process.env.SYNCURL;


 }
else
 SyncUrl = process.env.SYNCURL; 


    
    if (!Efork) {
     
        return;
    }
  
 //console.log('SyncUrl'+SyncUrl)
   
 
  
     
    CookieJDs = JD_COOKIE.split("&");
    console.log(`当前共${CookieJDs.length}个账号需要执行任务`);
    
    await downFile();
  
    await executeOneByOne();
  
     

   
    console.log("全部执行完毕");

 
}

start();


function hideme(st,FLAG)
{let fn1=""
var zg =  /^[0-9a-zA-Z]*$/;

for(let i=0;i<st.length;i++)
{
  if (FLAG==1){
   
   if (zg.test(st[i])&&zg.test(st[i+1])&&zg.test(st[i+2])&&zg.test(st[i+3]))
  {
   fn1=st.substr(st.indexOf(st[i]+st[i+1]+st[i+2]+st[i+3]+st[i+4]),5);
st=st.replace(fn1,"*****");
  }
  }

if (st[i]==("账"))
{fn1=st.substr(i+2,7);
st=st.replace(fn1,"************");}

if (st[i]==("京"))
{fn1=st.substr(i,1);
st=st.replace(fn1,"*");}


  
  
}

return st

}

function AddFirstCode(newContent){
let ShareCode=[]
if (process.env.SYNCURL.indexOf('CASH.js')>=0)
ShareCode=ASShareCodes;

else if (process.env.SYNCURL.indexOf('DJDC.js')>=0)
ShareCode=DCShareCodes;

else if  (process.env.SYNCURL.indexOf('DJMC.js')>=0)
ShareCode=MCShareCodes;

else if  (process.env.SYNCURL.indexOf('DJMH.js')>=0)
ShareCode=MHShareCodes;


else if  (process.env.SYNCURL.indexOf('DJNC.js')>=0)
ShareCode=NCShareCodes;

else if  (process.env.SYNCURL.indexOf('DJZD.js')>=0)
ShareCode=ZDShareCodes;

else if  (process.env.SYNCURL.indexOf('XJJC.js')>=0)
ShareCode=JCShareCodes;




console.log("开始获取内置朱丽娜");
console.log(ShareCode)
newContent =newContent.replace(`$.newShareCodes = []`,`$.newShareCodes=`+JSON.stringify(ShareCode));

return newContent
}




function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
