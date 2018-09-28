/**
 * Created by skyxu on 2018/9/28.
 */

let mongoose = require('mongoose');
let UserSchema = require('./UserSchema');

let User = mongoose.model("User", UserSchema);

module.exports = User;