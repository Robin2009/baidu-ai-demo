/**
 * 注册人脸
 */

var AipFaceClient = require("../src/index").face;
var fs = require('fs');
var myAppSettings = require('./myAppSettings.conf');

// 注册baidu-ai-client;
var client = new AipFaceClient(myAppSettings.APP_ID, myAppSettings.API_KEY, myAppSettings.SECRET_KEY);

// 图片转字符串
var readImageToString = function(imagePath){
    return new Buffer(fs.readFileSync(imagePath)).toString('base64');
};

// 循环添加用户图片到人脸库
var registerFace = function(uid,userInfo,groupIds,imagePaths){
    var cindex = 0;

    function addNextImageToUser(){
        console.log('正在处理用户%s',userInfo);
        if(cindex<imagePaths.length){
            var imagePath = imagePaths[cindex++];
            var base64Img = readImageToString(imagePath);
            client.addUser(uid, userInfo, groupIds, base64Img).then(function(result) {
                if(result.error_code){
                    console.error('为用户 %s 添加头像图片 %s 失败! ERROR_CODE:%s --- ERROR.MSG: %s',uid,imagePath,result.error_code,result.error_msg);                  
                }else{
                    console.info('用户 %s 添加头像图片 %s 成功!', uid, imagePath);
                };
                // 注册下一张图片. 注意: 测试结果显示百度貌似是强行限制了免费用户的API并发调用数量,因此这里手动加上延迟.
                setTimeout(function() {
                addNextImageToUser();
                }, 5000);                
            });
        }
    };
    
    addNextImageToUser();
};

// demo-face-group
var groupIds = ['demo_face_group'];

registerFace('u1','陈冠希',groupIds,["images/陈冠希/陈冠希1.jpeg","images/陈冠希/陈冠希2.jpeg"]);
registerFace('u2','周杰伦',groupIds,["images/周杰伦/周杰伦1.jpeg","images/周杰伦/周杰伦2.jpeg","images/周杰伦/周杰伦3.jpeg"]);
