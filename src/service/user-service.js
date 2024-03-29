// define(function(require, exports, module) {
//     //  怎么做到的？
//     var _cpmip = require('../util/cpmip.js');
// });

var _user = {
    // 用户登录
    userLogin : function(userInfo, resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/login.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //政府登录？
    govLogin : function(userInfo, resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/gov_user/login.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },

    // 检查用户名
    checkUsername : function(username, resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/check_valid.do'),
            data : {
                str : username,
                type : 'username'
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 用户注册
    register : function(userInfo, resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/register.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 获取用户密码提示问题
    getQuestion : function(username, resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/forget_get_question.do'),
            data : {
                username : username
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function(userInfo, resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/forget_check_answer.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 重置密码
    resetPassword : function(userInfo, resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/forget_reset_password.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 获取用户信息
    getUserInfo : function(resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/update_information.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 登陆状态下更新密码
    updatePassword : function(userInfo, resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/reset_password.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _cpmip.request({
            url : _cpmip.getServerUrl('/com_user/logout.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    test : function () {
        console.log("aaa");
    }
};
// module.exports = _user;
