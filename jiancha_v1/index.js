// 云函数入口文件
//const cloud = require('wx-server-sdk')

//cloud.init()

const request = require('request'); 
const notid = "此用户名不存在";

//下面这些需要更改
const playerAID = encodeURI("iiiiiiii");
const playerBID = encodeURI("ddddddddd");
const miaoma = "miaomiaomiao";    //你的喵码
const mubanid = "qqqqqqq";   //你的模板id
//上面这些需要更改
function nowtime(){
  let day1 = new Date();

  let shijian =encodeURI(day1.getFullYear()+"-"+(day1.getMonth()+1)+"-"+day1.getDate()+" "+day1.getHours()+":"+day1.getMinutes()+":"+day1.getSeconds());
  return shijian;
}

// 云函数入口函数
exports.main = async (event, context) => {
  
  cha(playerAID,nowtime());
  cha(playerBID,nowtime());
  

}
function cha(playerid,s){
  var url='https://www.op.gg/summoner/userName='+playerid;
  request({
   url: url,
   method: "GET",
   json: true,
   headers: {
       "content-type": "application/json",
       "accept-language":"zh-CN",
   }
}, function(err, res, body) {

    console.log(url);
     if (body.search(notid) != -1){ //
       console.log("选手改名");
       var miaourl = "http://miaotixing.com/trigger?id="+miaoma+"&templ="+mubanid+",,0,"+s;
       request(miaourl);
       }
}); 
}
