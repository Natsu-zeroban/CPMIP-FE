function s2last() {
    window.location.href = "register.html";
}
// 测试传值
// function test(){
//     var test=$('#companyEcotype').val();
//     alert(test);
// }
layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;
    //自定义验证规则
    form.verify({
        companyName: function(value){
            if(value.length < 3){
                return '企业名称至少为3个字符';
            }
        }
        ,companyEcotype:function (value) {
            if($('#companyEcotype').val()==="0"){
                return '请选择经济类型！'
            }
        }
        ,password: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
        ,passwordConfirm:function(value) {
            if ($('#companyPassword').val() != $('#passwordConfirm').val()) {
                return '两次输入密码不一致 请重新输入密码';
            }
        }
        ,address:function (value) {
            if (value.length<2){
                return'地址信息长度至少为2'
            }
        }
        ,orgcode:function (value) {
            if (value.length!=17){
                return'请输入正确的17位统一社会信用代码'
            }
        }
        ,personalName:function (value) {
            if (value.length<1){
                return'姓名不能为空'
            }
        }
        ,answer:function (value) {
            var q = $('#companyQuestion').val();
            var a = $('#companyAnswer').val();
            if(q.length>0&&a==""){
                return'密保答案不能为空'
            }
        }
    });

    //监听提交
    form.on('submit(demo1)', function(data){
        var result;
        var url=window.location.search; //获取url中"?"符后的字串
        if(url.indexOf("?")!=-1){
            result = url.substr(url.indexOf("=")+1)
        }
        $.post("http://www.cpmip.cn/com_user/register.do",
            {
                company:result,
                ecotype:$('#companyEcotype').val(),
                name:$.trim($('#companyName').val()),
                password:$.trim($('#companyPassword').val()),
                province:$.trim($('#companyProvince').val()),
                city:$.trim($('#companyCity').val()),
                district:$.trim($('#companyDistrict').val()),
                street:$.trim($('#companyStreet').val()),
                detailed:$.trim($('#companyDetailed').val()),
                orgcode:$.trim($('#companyOrgcode').val()),
                legaler:$.trim($('#companyLegaler').val()),
                legalerPhone:$.trim($('#legalerPhone').val()),
                contracter:$.trim($('#companyContracter').val()),
                contracterPhone:$.trim($('#contracterPhone').val()),
                question:$.trim($('#companyQuestion').val()),
                answer:$.trim($('#companyAnswer').val()),

            },
            function(data,status){
            if(data.status){
                alert("注册失败！\n"+"失败原因："+data.msg)
                }
            else{
                alert(data.msg)
                window.location.href = "login.html";
            }
            });
    });
});