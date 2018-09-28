let express = require('express');
let router = express.Router();
let uuid = require('node-uuid');

function generateUserName() {
  let nameLen = 8;
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let fbname = "";
  for (var i = 0; i < nameLen; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    fbname += arr[pos];
  }
  return fbname;
}

function __generateSID (user, req, res, next){
  let fbname = generateUserName();
  let fbid = req.body.fbid;   // 如果存在则是绑定fb同时获取sid，不存在则是登陆获取sid
  let uid = req.body.uid;
  let sid = uuid.v1();

  console.log("uid: " + uid);

   // 如果之前已经存在该uid的数据，则给他清空数据
   user.deleteOne({uid: uid}, (err)=>{
      if (err){
        console.error(err)
        res.statusCode = 500;
        res.send(err.message);
        return;
      }

      let newUser = null;
      if (fbid){
         newUser = new user({
            fbid: fbid,
            fbname: fbname,
            uid: uid,
            sid: sid
         });
      } else{
         newUser = new user({
           fbname: fbname,
           uid: uid,
           sid: sid
         });
      }
    
      newUser.save((err, doc)=>{
        if (err) {
          res.statusCode = 500;
          res.send(err.message);
        } else {
          res.send(JSON.stringify({ sid: sid, fbname: fbname }));
        }
      });
   });
}

function login(db, req, res, next) {
  __generateSID(db, req, res, next);
}

function bindFb(user, req, res, next) {
  console.log("bindFb :" + JSON.stringify(req.body));
  let sid = req.body.sid;
  let fbid = req.body.fbid;
  let uid = req.body.uid;

  if (sid) {
    user.updateOne({sid:sid},{$set:{fbid:fbid}}, (err, doc)=>{
        if (err){
          res.statusCode = 500;
          res.send(err.message);
        } else{
          user.find({sid:sid},(err, doc)=>{
            if (err){
              res.statusCode = 500;
              res.send(err.message);
            } else{
              res.statusCode = 200;
              let obj = { sid: sid, fbname: doc.fbname };
              res.send(JSON.stringify(obj));
            }
          });
        }
    });
  } else {
    __generateSID(user, req, res, next);
  }
}

function updateIcon(user, req, res, next) {
  let fbid = req.body.fbid;
  let fbicon = req.body.fbicon;
  if (fbid <= 0 || !fbicon) {
    res.statusCode = 500;
    res.send("invalid fbid.");
    return;
  }

  user.updateOne({fbid:fbid},{$set:{fbicon: fbicon}},(err, doc)=>{
    if (err) {
      res.statusCode = 500;
      res.send(err.message);
    } else {
      res.statusCode = 200;
      res.send("update fbicon ok.");
    }
  });
}

function updateName(user, req, res, next) {
  let fbid = req.body.fbid;
  let fbname = req.body.fbname;
  if (fbid <= 0 || !fbname) {
    res.statusCode = 500;
    res.send("invalid fbid.");
    return;
  }

  user.updateOne({fbid:fbid},{$set:{fbname: fbname}},(err, doc)=>{
    if (err) {
      res.statusCode = 500;
      res.send(err.message);
    } else {
      res.statusCode = 200;
      res.send("update fbname ok.");
    }
  });
}

function uploadScore(user, req, res, next) {
  let sid = req.body.sid;
  let score = req.body.score;
  if (!sid) {
    // 尚未获得sid
    res.statusCode = 500;
    res.send("invalid sid.");
    return;
  }

  user.updateOne({sid:sid},{$set:{score: score}},(err, doc)=>{
    if (err) {
      res.statusCode = 500;
      res.send(err.message);
    } else {
      res.statusCode = 200;
      res.send("upload score ok.");
    }
  });
}

function getRankList(user, req, res, next) {
  let sid = req.body.sid;

  let query = user.find({score:{$gt:0}}).sort({score:-1}).limit(100);
  query.exec((err, docs)=>{
    if (err) {
      res.statusCode = 500;
      res.send(err.message);
    } else {
      res.statusCode = 200;
      res.send(docs);
    }
  });
}

function getFriendsRankList(user, req, res, next) {
  let fbid = req.body.fbid;
  let friends = req.body.friends;
  // 把自己添加进去
  friends.push(fbid);
  if (!friends || friends.length <= 0) {
    res.statusCode = 500;
    res.send("not have any friend.");
    return;
  }

  let query = user.find({score:{$gt:0}, fbid:{$in:friends}}).sort({score:-1}).limit(100);
  query.exec((err, docs)=>{
    if (err) {
      res.statusCode = 500;
      res.send(err.message);
    } else {
      res.statusCode = 200;
      res.send(docs);
    }
  });
}

module.exports = {
  login: login,
  bindFb: bindFb,
  updateIcon: updateIcon,
  updateName: updateName,
  uploadScore: uploadScore,
  getRankList: getRankList,
  getFriendsRankList: getFriendsRankList,
};
