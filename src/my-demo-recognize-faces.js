/**
 * 识别人脸
 */

var AipFaceClient = require("../src/index").face;
var fs = require('fs');
var myAppSettings = require('./myAppSettings.conf');

// 注册baidu-ai-client;
var client = new AipFaceClient(myAppSettings.APP_ID, myAppSettings.API_KEY, myAppSettings.SECRET_KEY);

var image = fs.readFileSync('images/对比图片库/sb6.jpeg');
var base64Img = new Buffer(image).toString('base64');
var groupIds = ['demo_face_group'];

client.identifyUser(groupIds, base64Img, {usertopnum: 5}).then(function(result) {
    console.log(JSON.stringify(result));
});