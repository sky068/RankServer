/**
 * Created by skyxu on 2018/9/28.
 */

"use strict";
let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    sid: String,
    fbid: {type: String, default: "0"},
    fbicon: String,
    fbname: String,
    score: {type:Number, default: 0},
    uid: String,
});

module.exports = UserSchema;
