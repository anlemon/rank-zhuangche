// 云函数入口文件
//const cloud = require('wx-server-sdk')

//cloud.init()

var request = require('request'); 
var notgame = "并未进行游戏";
const notid = "此用户名不存在";
//下面这些需要更改
const playerAID = encodeURI("iiiiiiiii");
const playerBID = encodeURI("ddddddddddd");
const miaoma = "miaomiaomiao";   //你的喵码
const mubanid = "qqqqqqq";     //你的模板id
//上面这些需要更改

// 云函数入口函数
exports.main = async (event, context) => {
  //确定A选手的id
  var exurl='https://www.op.gg/summoner/userName='+playerAID;
  request({
    url: exurl,
    method: "GET",
    json: true,
    headers: {
        "content-type": "application/json",
        "accept-language":"zh-CN",
    }
 }, function(err, res, body) {
 
      if (body.search(notid) == -1){  //如果可以查询到A选手的id，则继续查看是否正在进行游戏
  var url='https://www.op.gg/summoner/spectator/userName='+playerAID+'&';

   request({
    url: url,
    method: "GET",
    json: true,
    headers: {
        "content-type": "application/json",
        "accept-language":"zh-CN",
    }
}, function(err, res, body) {
    
      if (body.search(notgame) != -1){console.log("未在进行游戏");} 
      else{  
        //如果正在进行游戏，查询B选手是否在这场对局中
        var players = body.match(/(?<=userName=).*?(?=")/g);
        if (players.indexOf(playerBID)>-1){
        var starttime = body.match(/(?<=datetime=').*?(?=')/g)[1];       
        var nowtime = (Date.parse(new Date()))/1000;
        //
        var d = new Date(starttime * 1000);    //根据时间戳生成的时间对象
          var date = (d.getFullYear()) + "-" + 
           (d.getMonth() + 1) + "-" +
           (d.getDate()) + " " + 
           (d.getHours()) + ":" + 
           (d.getMinutes()) + ":" + 
           (d.getSeconds());
           console.log(date);
        //
        if ((nowtime-starttime)<10*60){ //这里的10*60可以根据需要更改
          console.log("撞车啦"); 
          var miaourl = "http://miaotixing.com/trigger?id="+miaoma+"&templ="+mubanid+",,1,"+date; //喵提醒可以根据需要更改
          request(miaourl);
        }

      }}
}); 
      
}
 });
}

