alert("function a");
function a(){
    var callBack="Hello World";
    //调用b.js文件的b()方法
    b(callBack);
}

//window.onload事件是指文档结构包括js加载完毕,才会触发执行函数方法
window.onload=function(){
    alert("Window Onload");
    a();
}