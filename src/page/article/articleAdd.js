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
        title:[
            /^[\u4E00-\u9FA5]{2,20}$/
            ,'标题格式不规范！应该为2-20字中文格式'
        ],
        name:[
            /^[\u4E00-\u9FA5]{2,10}$/
            ,'姓名格式不规范！'
        ],
        table: [
            /^[\S]{20,800}$/
            ,'必填项不能为空'
        ]
    });
    form.render();
    //提交form
    form.on('submit(govReg)', function(data) {
        var field = data.field;
        $.ajax({
            url:'http://www.cpmip.cn/news/add.do'
            ,method:"post"
            ,data:{
                title: $.trim($('#newsTitle').val()),
                content: $.trim($('#newsContent').val()),
                operator: $.trim($('#newsOperator').val()),
                publishTime : $('#newsPublishTime').val(),
            }
            ,xhrFields:{
                withCredentials:true
            }

        });
        layer.msg("提交成功！", {time: 1200}, function () {
            window.location.href = "close.html";
        });


    })
});
