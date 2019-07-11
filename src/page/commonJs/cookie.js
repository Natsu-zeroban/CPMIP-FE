//设置cookie,也可以用来进行删除cookie，即将过期时间设置为过去的时间，最后一个参数可以传负数来实现
function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
// setCookie('cjs','ssss',30); //设置 name为cjs，value为cjs的一个cookie，并且时间为30天。
// setCookie('cjs','cjs',-1); //让该cookie过期,然后在document.cookie中就没有cjs=cjs这个cookie了。但是其他key=value还存在

//获取某个key的cookie
function getCookie(key){
    var arr1 = document.cookie.split(';');
    for(var i=0;i<arr1.length;i++){
        var arr2 = arr1[i].split('=');
        if(key.trim() === arr2[0].trim()){
            return (arr2[1]);
        }
    }
    return "";
}
// console.log(getCookie('cjs')); //因为上面已经将cjs这个cookie干掉了，所以这里得到为 ""

// $.ajaxSetup({
//     xhrFiled:{
//         'withCredentials':true
//     },
//     success:function (data) {
//         console.log('bxsl');
//     }
// });
