//config的设置是全局的
require("layui");
layui.extend({ //设定模块别名
    mymod: 'mymod' //如果 mymod.js 是在根目录，也可以不用设定别名
    ,mod1: 'admin/mod1' //相对于上述 base 目录的子目录
});

//你也可以忽略 base 设定的根目录，直接在 extend 指定路径（主要：该功能为 layui 2.2.0 新增）
layui.extend({
    mod2: '{/}http://cdn.xxx.com/lib/mod2' // {/}的意思即代表采用自有路径，即不跟随 base 路径
})

//使用拓展模块
layui.use(['mymod', 'mod1'], function(){
    var mymod = layui.mymod
        ,mod1 = layui.mod1
        ,mod2 = layui.mod2;

    mymod.hello('World!'); //弹出 Hello World!
});
