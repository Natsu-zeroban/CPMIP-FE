layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;


    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');
    form.render();
    //提交form
    form.on('submit(safetyARSubmit)', function (data) {
        var field = data.field;
        $.ajax({
            url:'http://www.cpmip.cn/aqsg/add.do'
            ,method:"post"
            ,data:{
                construname: $.trim($('#safetyAR_construname').val()),
                construction: $.trim($('#safetyAR_construction').val()),
                build: $.trim($('#safetyAR_build').val()),
                happenTime: $('#safetyAR_happenTime').val(),
                reportTime:$('#safetyAR_reportTime').val(),
                reason: $.trim($('#safetyAR_reason').val()),
                action: $.trim($('#safetyAR_action').val()),
                position: $.trim($('#safetyAR_position').val())
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
