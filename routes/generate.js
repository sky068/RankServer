let mysql = require("mysql");

let dbConfig = {
    host: "127.0.0.1",
    user: "root",
    password: "803923",
    database: "rollingball",
    connectionLimit: 50,
    queueLimit: 0,
    waitForConnection: true
  };

  // mark: 插入模拟数据
//   let info = [{"name":"せいしゅん","score":"70221","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_42.png"}];
let info = [
    {"name":"せいしゅん","score":"70221","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_42.png"},
    {"name":"野比大雄","score":"77730","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_55.png"},
    {"name":"SHIZUKA","score":"75826","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_52.png"},
    {"name":"Asai Rina","score":"71545","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_66.png"},
    {"name":"傳奇之子","score":"68965","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_54.png"},
    {"name":"Beetle King","score":"66520","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_13.png"},
    {"name":"周永健","score":"65728","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_49.png"},
    {"name":"1b75g4x8","score":"63892","icon":""},
    {"name":"Capital F","score":"62051","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_9.png"},
    {"name":"福沢美穂","score":"61522","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_65.png"},
    {"name":"武永慶","score":"60513","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_57.png"},
    {"name":"rodriguez","score":"59872","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_38.png"},
    {"name":"張樂樂","score":"59006","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_51.png"},
    {"name":"7b674508","score":"58274","icon":""},
    {"name":"Queen Bee","score":"56042","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_46.png"},
    {"name":"Jonathan","score":"55908","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_5.png"},
    {"name":"季麗娜","score":"54943","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_47.png"},
    {"name":"木のひまわり","score":"53594","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_22.png"},
    {"name":"仁崇義","score":"52699","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_7.png"},
    {"name":"且聽風吟","score":"52601","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_58.png"},
    {"name":"ニコチン","score":"51906","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_32.png"},
    {"name":"花咲き乱れ","score":"50722","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_15.png"},
    {"name":"Saktama","score":"48112","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_21.png"},
    {"name":"akiyama","score":"47755","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_16.png"},
    {"name":"さやか","score":"47301","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_60.png"},
    {"name":"喵大王","score":"46978","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_70.png"},
    {"name":"G4wh41J1","score":"46742","icon":""},
    {"name":"愛の恋人","score":"46377","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_20.png"},
    {"name":"AbbeyCook","score":"46242","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_27.png"},
    {"name":"マスク","score":"45529","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_3.png"},
    {"name":"o09Cb6fD","score":"45106","icon":""},
    {"name":"94I7s000","score":"42939","icon":""},
    {"name":"Hasegawa","score":"42660","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_11.png"},
    {"name":"驚奇隊長","score":"42413","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_53.png"},
    {"name":"Chafferer","score":"41969","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_37.png"},
    {"name":"m2UT3h55","score":"41140","icon":""},
    {"name":"Hernandez","score":"40859","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_31.png"},
    {"name":"García","score":"40640","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_45.png"},
    {"name":"ZU46g064","score":"40123","icon":""},
    {"name":"x0TMv06b","score":"39455","icon":""},
    {"name":"Narrator","score":"39106","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_4.png"},
    {"name":"Alley Cat","score":"38154","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_43.png"},
    {"name":"K695O5lp","score":"38084","icon":""},
    {"name":"MK駕駛員","score":"37155","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_71.png"},
    {"name":"93ge65zc","score":"36928","icon":""},
    {"name":"W3tnhgwd","score":"36744","icon":""},
    {"name":"Yvanne","score":"35914","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_28.png"},
    {"name":"F69p12qj","score":"35592","icon":""},
    {"name":"gs9iY776","score":"34810","icon":""},
    {"name":"a0HMck3w","score":"32877","icon":""},
    {"name":"無所謂","score":"32038","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_44.png"},
    {"name":"Eternally","score":"30865","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_19.png"},
    {"name":"D5835ioy","score":"30385","icon":""},
    {"name":"Backstreet","score":"29567","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_18.png"},
    {"name":"Claudio","score":"28517","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_30.png"},
    {"name":"0Xd97v6B","score":"27838","icon":""},
    {"name":"Caitlyn","score":"27697","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_34.png"},
    {"name":"あおば くみ","score":"27540","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_63.png"},
    {"name":"6lbbamy8","score":"26098","icon":""},
    {"name":"4Ph10fyd","score":"24596","icon":""},
    {"name":"OldHunter","score":"23971","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_8.png"},
    {"name":"Barbwire","score":"23575","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_36.png"},
    {"name":"Kuma","score":"23103","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_6.png"},
    {"name":"ye62qgw2","score":"22444","icon":""},
    {"name":"nj23sn7y","score":"19849","icon":""},
    {"name":"偶来哇钢蛋","score":"18801","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_72.png"},
    {"name":"天宮 かのん","score":"18158","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_62.png"},
    {"name":"咫尺天涯","score":"17746","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_33.png"},
    {"name":"傳奇大劍客","score":"17526","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_69.png"},
    {"name":"ALONG","score":"16947","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_10.png"},
    {"name":"Bleeker","score":"16343","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_39.png"},
    {"name":"馬丁尼艾丁","score":"16244","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_68.png"},
    {"name":"Innocence","score":"15756","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_25.png"},
    {"name":"muñoz","score":"15158","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_41.png"},
    {"name":"74txd3k1","score":"14955","icon":""},
    {"name":"74r1bq15","score":"14202","icon":""},
    {"name":"白いバラの夜","score":"14072","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_17.png"},
    {"name":"はつこい","score":"12887","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_14.png"},
    {"name":"對酒談人生","score":"11811","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_1.png"},
    {"name":"k23t87yw","score":"11678","icon":""},
    {"name":"Aoki Yuko","score":"11309","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_64.png"},
    {"name":"AnnChristian","score":"10806","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_23.png"},
    {"name":"Scratch","score":"10606","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_29.png"},
    {"name":"Impulse","score":"10495","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_56.png"},
    {"name":"8vgh7dj8","score":"10321","icon":""},
    {"name":"Dietmar","score":"10053","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_2.png"},
    {"name":"CalMiller","score":"9943","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_40.png"},
    {"name":"封帥","score":"8965","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_48.png"},
    {"name":"64lxu07n","score":"8894","icon":""},
    {"name":"9n14md98","score":"8617","icon":""},
    {"name":"u0ocg2UY","score":"8405","icon":""},
    {"name":"ロマンチック","score":"8068","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_24.png"},
    {"name":"Aoki Mio","score":"7623","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_50.png"},
    {"name":"人在江湖飄","score":"7078","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_67.png"},
    {"name":"SAORI","score":"6375","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_61.png"},
    {"name":"风のように","score":"6094","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_26.png"},
    {"name":"水月の镜の花","score":"5636","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_12.png"},
    {"name":"鏡花水月","score":"5626","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_59.png"},
    {"name":"錯誤選擇","score":"4992","icon":"http://52.44.165.172:3000/images/fb_head_imgs/headimg_35.png"},
    {"name":"z2pug7c7","score":"4945","icon":""}
];  
let database = mysql.createPool(dbConfig);
  database.getConnection((err, dbConn) => {
  if (err) {
    console.error(err.stack);
    throw err;
  } else {
    let queryStr = "INSERT INTO `rank` (`score`,`fbname`, `fbicon`) VALUES "
    for (let item of info){
        let name = item.name;
        let score = item.score;
        let icon = item.icon;

        queryStr = queryStr + "("
        + score
        + ",'" + name + "'"
        + ",'" + icon + "'"
        + "),"
    }
    // 将最后一个字符','换成';'
    queryStr = queryStr.split('');
    queryStr.splice(queryStr.length-1,1,";");
    queryStr = queryStr.join('');
    dbConn.query(
        queryStr,
    (err) => {
        dbConn.release();
        if (err) {
        console.log(err.message);
        throw err;
        }
    }
    );
  }
});


