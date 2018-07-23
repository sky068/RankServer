let express = require('express');
let router = express.Router();

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

function login(db, req, res, next) {
  let fbname = generateUserName();
  db.getConnection((err, dbConn) => {
    if (err) {
      next(err);
    } else {
      dbConn.query(
        "INSERT INTO `rank` (`fbname`) VALUES ('" + fbname + "');"
        , (err) => {
          if (err) {
            console.log(err)
            res.statusCode = 500;
            res.send(err.message);
            dbConn.release();
          } else {
            res.statusCode = 200;
            dbConn.query("select max(`sid`) as sid from `rank`;", (err, data) => {
              dbConn.release();
              if (err) {
                res.statusCode = 500;
                res.send(err.message);
              } else {
                res.send(JSON.stringify({ sid: data[0].sid, fbname: fbname }));
              }
            });
          }
        });
    }
  });
}

function bindFb(db, req, res, next) {
  console.log("bindFb :" + JSON.stringify(req.body));
  let sid = req.body.sid;
  let fbid = req.body.fbid;

  if (sid > 0) {
    db.getConnection((err, dbConn) => {
      if (err) {
        next(err);;
      } else {
        dbConn.query("UPDATE `rank` SET "
          + "`fbid`=" + fbid
          + " where `sid`=" + sid
          + ";"
          , (err, data) => {
            if (err) {
              res.statusCode = 500;
              res.send(err.message);
              dbConn.release();
            } else {
              // 把id和name同时返回
              dbConn.query("SELECT `sid`,`fbname` from `rank` WHERE `sid`=" + sid, (err, data) => {
                dbConn.release();
                if (err) {
                  res.statusCode = 500;
                  res.send(err.message);
                } else {
                  res.statusCode = 200;
                  let obj = { sid: sid, fbname: data[0].fbname };
                  res.send(JSON.stringify(obj));
                }
              });
            }
          });
      }
    });
  } else {
    // 尚未分配uid，分配uid
    let fbname = generateUserName();
    db.getConnection((err, dbConn) => {
      if (err) {
        next(err);;
      } else {
        dbConn.query(
          "INSERT INTO `rank` (`fbid`,`fbname`) VALUES ("
          + fbid
          + ",'" + fbname + "'"
          + ");"
          , (err) => {
            if (err) {
              console.log(err)
              res.statusCode = 500;
              res.send(err.message);
              dbConn.release();
            } else {
              res.statusCode = 200;
              dbConn.query("select max(`sid`) as sid from `rank`;", (err, data) => {
                dbConn.release();
                if (err) {
                  res.statusCode = 500;
                  res.send(err.message);
                } else {
                  res.send(JSON.stringify({ sid: data[0].sid, fbname: fbname }));
                }
              });
            }
          });
      }
    });
  }
}

function updateIcon(db, req, res, next) {
  let fbid = req.body.fbid;
  let fbicon = req.body.fbicon;
  if (fbid < 0 || !fbicon) {
    res.statusCode = 500;
    res.send("invalid fbid.");
    return;
  }

  db.getConnection((err, dbConn) => {
    if (err) {
      next(err);;
    } else {
      dbConn.query("UPDATE `rank` SET `fbicon`='" + fbicon
        + "' where `fbid`=" + fbid
        + ";"
        , (err) => {
          dbConn.release();
          if (err) {
            res.statusCode = 500;
            res.send(err.message);
          } else {
            res.statusCode = 200;
            res.send("update fbicon ok.");
          }
        });
    }
  });
}

function updateName(db, req, res, next) {
  let fbid = req.body.fbid;
  let fbname = req.body.fbname;
  if (fbid < 0 || !fbname) {
    res.statusCode = 500;
    res.send("invalid fbid.");
    return;
  }

  db.getConnection((err, dbConn) => {
    if (err) {
      next(err);;
    } else {
      dbConn.query("UPDATE `rank` SET `fbname`='" + fbname
      + "' where `fbid`=" + fbid
      + ";"
      , (err) => {
        dbConn.release();
        if (err) {
          res.statusCode = 500;
          res.send(err.message);
        } else {
          res.statusCode = 200;
          res.send("update fbname ok.");
        }
      });
    }
  });
}

function uploadScore(db, req, res, next) {
  let sid = req.body.sid;
  let score = req.body.score;
  if (sid < 0) {
    // 尚未获得sid
    res.statusCode = 500;
    res.send("invalid sid.");
    return;
  }

  db.getConnection((err, dbConn) => {
    if (err) {
      next(err);;
    } else {
      dbConn.query("UPDATE `rank` SET `score`='" + score
      + "' where `sid`=" + sid
      + ";"
      , (err) => {
        dbConn.release();
        if (err) {
          res.statusCode = 500;
          res.send(err.message);
        } else {
          res.statusCode = 200;
          res.send("upload score ok.");
        }
      });
    }
  });
}

function getRankList(db, req, res, next) {
  let sid = req.body.sid;

  db.getConnection((err, dbConn) => {
    if (err) {
      next(err);;
    } else {
      dbConn.query("SELECT * FROM `rank` WHERE `score` > 0 ORDER BY `score` DESC LIMIT 100", (err, data) => {
        dbConn.release();
        if (err) {
          res.statusCode = 500;
          res.send(err.message);
        } else {
          res.statusCode = 200;
          res.send(data);
        }
      });
    }
  });
}

function getFriendsRankList(db, req, res, next) {
  let fbid = req.body.fbid;
  let friends = req.body.friends;
  // 把自己添加进去
  friends.push(fbid);
  if (!friends || friends.length <= 0) {
    res.statusCode = 500;
    res.send("not have any friend.");
    return;
  }

  db.getConnection((err, dbConn) => {
    if (err) {
      next(err);;
    } else {
      dbConn.query("SELECT * FROM `rank` WHERE `score` > 0 AND `fbid` IN (" + friends + ") ORDER BY `score` DESC LIMIT 100;", (err, data) => {
        dbConn.release();
        if (err) {
          res.statusCode = 500;
          res.send(err.message);
        } else {
          res.statusCode = 200;
          res.send(data);
        }
      });
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
