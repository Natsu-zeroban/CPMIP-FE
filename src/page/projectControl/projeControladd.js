
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
        Name:[
            /^[\u4E00-\u9FA5]{2,20}$/
            ,'名称格式不规范！应该为2-20字中文格式'
        ],
        money: [
            /^[\S]{1,12}$/
            ,'工程规模不能为空'
        ],
        position: [
            /^[\u4E00-\u9FA5]{1,10}$/
            ,'地址格式不规范！'
        ],
        area: [
            /^[\S]{1,12}$/
            ,'建筑面积不能为空'
        ]
        ,pname:[
            /^[\u4E00-\u9FA5]{1,10}$/
            ,'姓名格式不规范！'
        ],
        table: [
            /^[\S]{1,500}$/
            ,'必填项不能为空'
        ]
    });
    form.render();
    //提交form
    // form.on('submit(govReg)', function(data) {
    //     var field = data.field;
    // $.post("http://www.cpmip.cn/report/add.do", {
    //         construname: $.trim($('#reportConstruName').val()),
    //         position: $.trim($('#reportPosition').val()),
    //         money: $.trim($('#reportMoney').val()),
    //         area: $.trim($('#reportArea').val()),
    //         report_time: $.trim($('#reportTime').val()),
    //         buildname: $.trim($('#reportBuildname').val()),
    //         builder: $.trim($('#reportBuilder').val()),
    //         builder_phone: $.trim($('#reportBuilderphone').val()),
    //         construction: $.trim($('#reportConstruction').val()),
    //         constructioner: $.trim($('#reportConstructioner').val()),
    //         constructioner_phone: $.trim($('#reportConstructionerphone').val()),
    //         qsader: $.trim($('#reportQsader').val()),
    //         qsadname: $.trim($('#reportQsadname').val()),
    //         qsader_phone: $.trim($('#reportQsaderphone').val()),
    //         standard1: $.trim($('#reportStandard1').val()),
    //         standard2: $.trim($('#reportStandard2').val()),
    //         standard3: $.trim($('#reportStandard3').val())
    //
    //     },
    //     function (data, status) {
    //         if (data.status) {
    //             alert(data.msg)
    //         }
    //         else {
    //             alert(data.msg);
    //             $('#loginSmall').text("提交成功");
    //             // window.location.href = "login.html";
    //         }
    //     })
    // $.ajax({
    //     url:'http://www.cpmip.cn/report/add.do'
    //     ,method:"post"
    //     ,data:{
    //         construname: $.trim($('#reportConstruName').val()),
    //         position: $.trim($('#reportPosition').val()),
    //         money: $.trim($('#reportMoney').val()),
    //         area: $.trim($('#reportArea').val()),
    //         reportTime: '2017-03-01 08:14:10',
    //         buildname: $.trim($('#reportBuildname').val()),
    //         builder: $.trim($('#reportBuilder').val()),
    //         builderPhone: $.trim($('#reportBuilderphone').val()),
    //         construction: $.trim($('#reportConstruction').val()),
    //         constructioner: $.trim($('#reportConstructioner').val()),
    //         constructionerPhone: $.trim($('#reportConstructionerphone').val()),
    //         qsader: $.trim($('#reportQsader').val()),
    //         qsadname: $.trim($('#reportQsadname').val()),
    //         qsaderPhone: $.trim($('#reportQsaderphone').val()),
    //         standard1: $.trim($('#reportStandard1').val()),
    //         standard2: $.trim($('#reportStandard2').val()),
    //         standard3: $.trim($('#reportStandard3').val())
    //     }
    //     ,xhrFields:{
    //         withCredentials:true
    //     }
    //     ,success:function(data){
    //         console.log(data)
    //     }
    // });



    // })
});
