
module.exports = function(app, db){
    let work = require("./work");
    app.post("/login", work.login.bind(null, db));
    app.post("/bind_fb", work.bindFb.bind(null, db));
    app.post("/update_icon", work.updateIcon.bind(null, db));
    app.post("/update_name", work.updateName.bind(null, db));
    app.post("/upload_score", work.uploadScore.bind(null, db));
    app.post("/get_rank", work.getRankList.bind(null, db));
    app.post("/get_rank_friends", work.getFriendsRankList.bind(null, db));
};
