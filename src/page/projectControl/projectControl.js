

layui.use('table', function(){
    var table = layui.table;

    table.render({
        elem: '#test'
        ,toolbar: '#toolbarProjCont'
        //url里面填json的地址,经测试是服务器根目录到json文件的绝对地址？
        //会默认自动传送page和limit参数
        ,url:'http://www.cpmip.cn/report/get_list.do'
        ,method:'post'

        //其他参数
        // ,where:{}
        // ,contentType: 'application/json'
        //修改传参名
        ,request: {
            pageName: 'pageNum' //页码的参数名称
            ,limitName: 'pageSize' //每页数据量的参数名
        }
        ,parseData: function (res) {
            return{
                "code": res.status
                ,"data": res.data.list
            }
        }
        ,width:1200
        // ,align:'center'
        ,style:'margin-right:auto;'
        ,cols: [[
            {type:'checkbox'}
            ,{field:'id', width:150, align:'center', title: 'ID', sort: true}
            ,{field:'construname', align:'center', title: '工程名称'}
            ,{field:'position', align:'center', title: '工程地点'}
            ,{field:'buildname', align:'center', title: '建设单位名称'}
            ,{field:'construction', align:'center', title: '施工方单位名称', minWidth: 100}
        ]]
        //开启分页
        ,page: true
    });

    //监听头部工具栏事件
    table.on('toolbar(test)', function(obj){
        var cbList = [];
        cbList = table.cache['test'];       //test表格中所有的数据对象
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event) {
            case 'add':
                //下面这里写功能函数
                // layer.msg('添加');
                tableSet(cbList);
                //不知道会不会自动重新加载
                break;
            case 'delete':
                if (checkStatus.data.length < 1) {
                    layer.alert("请选择一条数据操作");
                    return false;
                } else {

                    layer.confirm('是否确定删除？',function () {

                    for (var k = 0; k < checkStatus.data.length; k++) {
                        var _delId = checkStatus.data[k].id;        //选中的数据id
                        for (var i = 0; i < cbList.length; i++) {
                            var _id = cbList[i].id;         //判断当前循环id是否被选中
                            if (_id === _delId) {
                                cbList.splice(i, 1);//删除起始下标为i,长度为1的数据
                                //这就是删除接口，其他建议复制
                                $.ajax({
                                    url:'http://www.cpmip.cn/report/delete.do'
                                    ,method:"post"
                                    ,data:{id:_id}
                                    ,xhrFields:{
                                        withCredentials:true
                                    }
                                    ,success:function(data){
                                        console.log(data)
                                    }
                                });
                                //用户未登陆smjb
                                break;
                            }
                        }
                    }
                    layer.msg("删除成功", {time: 1200}, function () {
                        table.reload("test", {
                                data: cbList
                            })
                        });
                    })
                }
                break;
            case 'update':
                // layer.msg('emmm');
                if (checkStatus.data.length > 1) {
                    layer.alert("请仅选择一条数据修改");
                    return false;
                } else{
                    tableGet(checkStatus);

                }
                    break;
        }
    });

    //监听单击事件，待完成/不完成
    table.on('row(test)', function(obj){
        console.log(obj.tr);//得到当前行元素对象
        console.log(obj.data) //得到当前行数据
        //obj.del(); //删除当前行
        //obj.update(fields) //修改当前行数据
    });

});


//写出去是为了方便之后模块化，删除和修改也会做
function tableSet(cbList) {
    var $$ = layui.jquery;
    var table = layui.table;
    layer.open({
        type: 2, //类型，解析url
        closeBtn: 1, //关闭按钮是否显示 1显示0不显示
        title: '填写工程监督表', //页面标题
        shadeClose: true, //点击遮罩区域是否关闭页面
        id:'ab',
        shade: 0.8,  //遮罩透明度
        area: ['900px', '700px'],  //弹出层页面比例
        btn:['提交','返回'],    //按钮
        content:'projectControladd.html'
        //这里手写表单，表单好像没有既定模块，只能纯手撸了
        // ,content: '<div><table id="templateTable"></table></div>'
        ,success: function(layero){
            //加载成功显示点啥好？
            // var btn = layero.find('.layui-layer-btn');

        }
        ,yes:function () {
            $.ajax({
                url:'http://www.cpmip.cn/report/add.do'
                ,method:"post"
                ,data:{
                    construname:$($$('iframe')[0]).contents().find('#reportConstruName').val()
                    ,money:$($$('iframe')[0]).contents().find('#reportMoney').val()
                    ,position:$($$('iframe')[0]).contents().find('#reportPosition').val()
                    ,area:$($$('iframe')[0]).contents().find('#reportArea').val()
                    ,reportTime:'2019-06-27 11:09:15'                         //毒瘤数据
                    ,buildname:$($$('iframe')[0]).contents().find('#reportBuildname').val()
                    ,builder:$($$('iframe')[0]).contents().find('#reportBuilder').val()
                    ,builderPhone:$($$('iframe')[0]).contents().find('#reportBuilderphone').val()
                    ,construction:$($$('iframe')[0]).contents().find('#reportConstruction').val()
                    ,constructioner:$($$('iframe')[0]).contents().find('#reportConstructioner').val()
                    ,constructionerPhone:$($$('iframe')[0]).contents().find('#reportConstructionerphone').val()
                    ,qsadname:$($$('iframe')[0]).contents().find('#reportQsadname').val()
                    ,qsader:$($$('iframe')[0]).contents().find('#reportQsader').val()
                    ,qsaderPhone:$($$('iframe')[0]).contents().find('#reportQsaderphone').val()
                    ,standard1:$($$('iframe')[0]).contents().find('#reportStandard1').val()
                    ,standard2:$($$('iframe')[0]).contents().find('#reportStandard2').val()
                    ,standard3:$($$('iframe')[0]).contents().find('#reportStandard3').val()
                }
                ,xhrFields:{
                    withCredentials:true
                }
                ,success:function(data){

                    console.log(data);
                    layer.msg("添加成功", {time: 1200}, function () {
                        layer.close();
                        table.reload("test", {
                            data: cbList
                        })
                    });

                }
            });
        }
    });
}

//修改的函数，我的思路是先弄出一个弹出层表单，然后再在里面调用接口生成数据
//代码没和tableSet复用，但没想到别的好方法
function tableGet(checkStatus) {
    if (checkStatus.data.length !== 1) {
        layer.alert("请选择一条数据操作");
        return false;
    }else {
        var data;
        var _chaId = checkStatus.data[0].id;
        var $$ = layui.jquery;
        layer.open({
            type: 2, //类型，解析url
            closeBtn: 1, //关闭按钮是否显示 1显示0不显示
            title: '修改工程监督表', //页面标题
            shadeClose: true, //点击遮罩区域是否关闭页面
            shade: 0.8,  //遮罩透明度
            btn:['提交','返回'],    //按钮
            area: ['900px', '700px'],  //弹出层页面比例
            content:'projectControladd.html'
            ,success:function (aa) {
                //塞满数据，用ajax之类的？没找到方便的全部动态插入方法

                console.log($($$('iframe')[0]).contents().find('#reportConstruName').val());
                console.log(aa);
                $$.ajax({
                    url:'http://www.cpmip.cn/report/get_detail.do'
                    ,method:"post"
                    ,data:{reportId:_chaId}
                    ,success:function(result){
                        // console.log(result);
                        data = result;

                        $($$('iframe')[0]).contents().find('#reportConstruName').val(result.data.construname);
                        $($$('iframe')[0]).contents().find('#reportMoney').val(result.data.money);
                        $($$('iframe')[0]).contents().find('#reportPosition').val(result.data.position);
                        $($$('iframe')[0]).contents().find('#reportArea').val(result.data.area);
                        $($$('iframe')[0]).contents().find('#test11').val(result.data.reportTime);
                        $($$('iframe')[0]).contents().find('#reportBuildname').val(result.data.buildname);
                        $($$('iframe')[0]).contents().find('#reportBuilder').val(result.data.builder);
                        $($$('iframe')[0]).contents().find('#reportBuilderphone').val(result.data.builderPhone);
                        $($$('iframe')[0]).contents().find('#reportConstruction').val(result.data.construction);
                        $($$('iframe')[0]).contents().find('#reportConstructioner').val(result.data.constructioner);
                        $($$('iframe')[0]).contents().find('#reportConstructionerphone').val(result.data.constructionerPhone);
                        $($$('iframe')[0]).contents().find('#reportQsadname').val(result.data.qsadname);
                        $($$('iframe')[0]).contents().find('#reportQsader').val(result.data.qsader);
                        $($$('iframe')[0]).contents().find('#reportQsaderphone').val(result.data.qsaderPhone);
                        $($$('iframe')[0]).contents().find('#reportStandard1').val(result.data.standard1);
                        $($$('iframe')[0]).contents().find('#reportStandard2').val(result.data.standard2);
                        $($$('iframe')[0]).contents().find('#reportStandard3').val(result.data.standard3);


                    }
                });
            }

            ,yes: function () {
                //写提交修改的接口

                $$.ajax({
                    url:'http://www.cpmip.cn/report/change.do'
                    ,method:"post"
                    ,data:{
                        id:_chaId
                        ,construname:$($$('iframe')[0]).contents().find('#reportConstruName').val()
                        ,money:$($$('iframe')[0]).contents().find('#reportMoney').val()
                        ,position:$($$('iframe')[0]).contents().find('#reportPosition').val()
                        ,area:$($$('iframe')[0]).contents().find('#reportArea').val()
                        // ,reportTime:$($$('iframe')[0]).contents().find('#test11').val()                          //毒瘤数据别提了
                        ,buildname:$($$('iframe')[0]).contents().find('#reportBuildname').val()
                        ,builder:$($$('iframe')[0]).contents().find('#reportBuilder').val()
                        ,builderPhone:$($$('iframe')[0]).contents().find('#reportBuilderphone').val()
                        ,construction:$($$('iframe')[0]).contents().find('#reportConstruction').val()
                        ,constructioner:$($$('iframe')[0]).contents().find('#reportConstructioner').val()
                        ,constructionerPhone:$($$('iframe')[0]).contents().find('#reportConstructionerphone').val()
                        ,qsadname:$($$('iframe')[0]).contents().find('#reportQsadname').val()
                        ,qsader:$($$('iframe')[0]).contents().find('#reportQsader').val()
                        ,qsaderPhone:$($$('iframe')[0]).contents().find('#reportQsaderphone').val()
                        ,standard1:$($$('iframe')[0]).contents().find('#reportStandard1').val()
                        ,standard2:$($$('iframe')[0]).contents().find('#reportStandard2').val()
                        ,standard3:$($$('iframe')[0]).contents().find('#reportStandard3').val()
                    }
                    ,xhrFields:{
                        withCredentials:true
                    }
                    ,success:function(data){
                        console.log(data);
                        // console.log($('#reportConstruName').val());
                    }
                });
            }
        });
    }
}

