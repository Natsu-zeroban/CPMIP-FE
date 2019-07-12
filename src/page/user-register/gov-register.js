
//gov-register
layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });

    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');
    //自定义验证规则：密码和姓名规范验证
    form.verify({
        password: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格！'
        ],
        name:[
            /^[\u4E00-\u9FA5]{2,4}$/
            ,'姓名格式不规范！'
        ]
        });
    form.render();
    //提交form
    form.on('submit(governReg)', function(data) {
        var field = data.field;

        //确认密码
        if(field.government_password!== field.government_repass){
            return layer.msg('两次密码输入不一致');
        }

        //是否同意用户协议
        if(!field.govRegAgreement){
            return layer.msg('你必须同意用户协议才能注册');
        }

        $.post("http://www.cpmip.cn/gov_user/register.do", {
            jobId:$.trim($('#government_jobId').val()),
                name: $.trim($('#government_name').val()),
                phone: $.trim($('#government_phone').val()),
                dept:location.search.match(new RegExp("[\?\&]myRole=([^\&]+)", "i"))[1],
                post: $.trim($('#government_post').val()),
                password: $.trim($('#government_password').val())
        },
        function (data, status) {
            if (data.status) {
                alert(data.msg)
            }
            else {
                alert(data.msg);
                $('#loginSmall').text("注册成功");
                // window.location.href = "login.html";
            }
        })
    })
});
