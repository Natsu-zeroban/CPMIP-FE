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

        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event) {
            case 'add':
                //下面这里写功能函数
                // layer.msg('添加');
                tableSet();
                //不知道会不会自动重新加载
                break;
            case 'delete':

                if (checkStatus.data.length < 1) {
                    layer.alert("请选择一条数据操作");
                    return false;
                } else {
                    var cbList = [];
                    layer.confirm('是否确定删除？',function () {
                    cbList = table.cache['test'];       //test表格中所有的数据对象
                    for (var k = 0; k < checkStatus.data.length; k++) {
                        var _delId = checkStatus.data[k].id;        //选中的数据id
                        for (var i = 0; i < cbList.length; i++) {
                            var _id = cbList[i].id;         //判断当前循环id是否被选中
                            if (_id === _delId) {
                                cbList.splice(i, 1);//删除起始下标为i,长度为1的数据
                                // $.post("http://www.cpmip.cn/com_user/login.do",
                                //     {
                                //         username:"红丝绒建筑工程有限公司",
                                //         password:"123456"
                                //     },
                                //     function(data,status){
                                //         alert("数据: \n" + data.msg + "\n状态: " + data.status);
                                //     });

                                //这里可以调用删除接口了
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
                    tableGet();

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
function tableSet() {
    layer.open({
        type: 1//Layer提供了5种层类型。可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）,
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: '300px;'     //area: ['390px', '330px'],   //宽高
        ,shade: 0.8         //遮罩透明度
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['提交', '返回']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        //示例
        // ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">' +
        //     '你知道吗？亲！<br>layer ≠ layui<br><br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br><br>' +
        //     'layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'

        //这里手写表单，表单好像没有既定模块，只能纯手撸了
        ,content: '<div><table id="templateTable"></table></div>'
        ,success: function(layero){
            //加载成功显示点啥好？
            var btn = layero.find('.layui-layer-btn');
            // btn.find('.layui-layer-btn0').click(function () {
            //
            //
            // });

        }
        //这个是指第一个按钮按下去成功的事件
        ,yes: function () {
            //传表单数据过去
            $.post("http://www.cpmip.cn/com_user/login.do",
                {
                    username:"红丝绒建筑工程有限公司",
                    password:"123456"
                },
                function(data,status){
                    alert("数据: \n" + data.msg + "\n状态: " + data.status);
                });
        }

    });
}

//修改的函数，我的思路是先弄出一个弹出层表单，然后再在里面调用接口生成数据
//代码没和tableSet复用，但没想到别的好方法
function tableGet() {
    layer.open({
        type: 1//Layer提供了5种层类型。可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）,
        , title: false //不显示标题栏
        , closeBtn: false
        , area: '300px;'     //area: ['390px', '330px'],   //宽高
        , shade: 0.8         //遮罩透明度
        , id: 'tableGet' //设定一个id，防止重复弹出
        , btn: ['提交', '返回']
        , btnAlign: 'c'
        , moveType: 1 //拖拽模式，0或者1
        ,content:''
        ,success:function () {
            //塞满数据，用ajax之类的？没找到方便的全部动态插入方法
        }
        ,yes: function () {
            //写提交修改的接口
        }
    });
}

