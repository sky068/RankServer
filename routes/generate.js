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
  let info = [];
  let database = mysql.createPool(dbConfig);
  database.getConnection((err, dbConn) => {
  if (err) {
    console.error(err.stack);
    throw err;
  } else {
    for (let item of info){
        let name = info.name;
        let score = info.score;
        let icon = info.icon;

        let queryStr = "INSERT INTO `rank` (`score`,`fbname`, `fbicon`) VALUES ("
        + score
        + ",'" + name + "'"
        + ",'" + icon + "'"
        + ");"
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
  }
});


