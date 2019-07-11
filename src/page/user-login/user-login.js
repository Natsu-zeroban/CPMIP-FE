//
// define(function(require, exports, module) {
//     //  怎么做到的？
//
//     _user.test();
//
//     _cpmip.testt();
// // });
// var http = require(http);
// var _user = require('../../service/user-service');
// var _cpmip = require('../../util/cpmip.js');
// _user.test();
// _cpmip.testt();

// require(["module3","module1","module2"], function() {
//
//     var m1 = require("module1");
//     alert(m1.name);
// });
// require('uers-login.css');
// require('page/common/nav-simple/index.js');

// _cpmip.aa();
// layui.use(['service', 'cpmip'], function(){
//     var service = layui.service
//         ,cpmip = layui.cpmip
//     // ,mod2 = layui.mod2;
//
//     // mymod.hello('World!'); //弹出 Hello World!
// });

/**/
// var _user = {
//     // 用户登录
//     login : function(userInfo, resolve, reject){
//         _cpmip.request({
//             url : _cpmip.getServerUrl('/com_user/login.do'),
//             data : userInfo,
//             method : 'POST',
//             success : resolve,
//             error : reject
//         });
//     }
// };

/**/
// var conf = {
//     serverHost: ''
// };
// var _cpmip = {
//     // 网络请求
//     request: function (param) {
//         var _this = this;
//         $.ajax({
//             type: param.method ,
//             url: param.url || '',
//             dataType: param.type || 'json',
//             // dataType:"jsonp",
//             data: param.data || '',
//             success: function (res) {
//                 // 请求成功
//                 if (0 === res.status) {
//                     // 先判断是不是函数，是的话就调用
//                     typeof param.success === 'function' && param.success(res.data, res.msg);
//                 }
//                 // 没有登陆状态，需要强制登陆
//                 // else if (10 === res.status) {
//                 //     _this.doLogin();
//                 // }
//                 // 请求数据错误
//                 else if (1 === res.status) {
//                     typeof param.error === 'function' && param.error(res.msg);
//                 }
//             },
//             error: function (err) {
//                 typeof param.error === 'function' && param.error(err.statusText);
//             }
//         })
//     },
//     // 获取服务器地址  上限以后再改
//     // getServerUrl: function (path) {
//     //     return conf.serverHost + path;
//     // },
//     /*测试*/
//     getServerUrl: function (path) {
//         return "http://www.cpmip.cn" + path;
//     },
//     // 获取url参数
//     getUrlParam: function (name) {
//         var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
//         //search(1)的作用是去掉"?"
//         var result = window.location.search.substr(1).match(reg);
//         return result ? decodeURIComponent(result[2]) : null;
//     },
//     // 渲染html模版,用了hogan
//     // renderHtml : function(htmlTemplate, data){
//     //     var template = Hogan.compile(htmlTemplate),
//     //         result = template.render(data);
//     //     return result;
//     // },
//     // 成功提示
//     successTips : function(msg){
//         alert(msg || '操作成功!');
//     },
//     // 错误提示
//     errorTips : function(msg){
//         alert(msg || '哪里不对了～');
//     },
//     // 字段的验证，支持非空、手机、邮箱的判断
//     validate : function(value, type){
//         var value = $.trim(value);
//         // 非空验证
//         if('require' === type){
//             return !!value;
//         }
//         // 手机号验证
//         if('phone' === type){
//             return /^1\d{10}$/.test(value);
//         }
//         // 邮箱格式验证
//         if('email' === type){
//             return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
//         }
//     },
//     // 统一登陆处理
//     // doLogin: function () {
//     //     window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
//     // },
//     goHome : function(){
//         window.location.href = './index.html';
//     }
// };
//
// module.exports = _cpmip;


// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').show().find('.err-msg').text('');
    }
}

// page逻辑部分
var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function () {
        var _this = this;
        // 登陆按钮的点击
        $('#submit').click(function(e){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // keyCode === 13表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    // 分了两种角色情况，所以有两个数组json，使用val作为判断select框的选择结果
    submit : function(){
        var formData = {
                username  : $.trim($('#username').val()),
                password  : $.trim($('#password').val())
            };
        var formGovData = {
                jobId  : $.trim($('#username').val()),
                password  : $.trim($('#password').val())
            };
        var val = $("#roleSelect").val();
            // 表单验证结果
        var validateResult;
        if (val == 0 || val == 1){
            validateResult = this.formValidate(formData,val);
        }
        else if(val == 2 || val == 3){
            validateResult = this.formValidate(formGovData,val);

        }

        // 验证成功
        if(validateResult.status) {
            // console.log("aaa");
            //
            // console.log(val);
            if (val == 0 || val == 1) {
                _user.userLogin(formData, function (res) {
                    setCookie('username',formData.username,30);
                    setCookie('password',formData.password,30);
                    window.location.href = _cpmip.getUrlParam('redirect') || './index.html';

                }, function (errMsg) {
                    formError.show(errMsg);
                })
            }
            else if(val == 2 || val == 3){
                _user.govLogin(formGovData, function (res) {
                    setCookie('jobId',formData.jobId,30);
                    setCookie('password',formData.password,30);
                    window.location.href = _cpmip.getUrlParam('redirect') || './index.html';
                }, function (errMsg) {
                    formError.show(errMsg);
                })
            }
        }
        // 失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }
    },
    // 表单字段的验证
    // 直接添加新参数val传递，也是为了判断
    formValidate : function(formData,val){
        var result = {
            status : false,
            msg : ''
        };
        if(val == 0 || val == 1) {
            if (!_cpmip.validate(formData.username, 'require')) {
                result.msg = '用户名不能为空';
                return result;
            }
        }
        else if(val == 2 || val == 3){
            if (!_cpmip.validate(formData.jobId, 'require')) {
                result.msg = '工作ID不能为空';
                return result;
            }
        }
        if(!_cpmip.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 验证通过，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});


