function s1next() {
    var userType = $("input[name='role']:checked").val();
    if(userType==='住建部门'||userType==='质量监督管理部门'){

        if(userType==='住建部门'){
            alert("选中的用户角色类型是：" + userType);
            registers1form.action="gov-register.html?myRole="+3;

        }
        else if(userType==='质量监督管理部门'){
            alert("选中的用户角色类型是：" + userType);
            registers1form.action="gov-register.html?myRole="+2;

        }
    }
    else if(userType==='建设单位'||userType==='施工单位'){
        alert("选中的用户角色类型是：" + userType);
        if(userType==='建设单位'){
            registers1form.action="com-register.html?myRole="+0;
        }
        if(userType==='施工单位'){
            registers1form.action="com-register.html?myRole="+1;
        }
    }
    else{
        alert("请选择用户角色！");
        return false;
    }
    // return false;
}
