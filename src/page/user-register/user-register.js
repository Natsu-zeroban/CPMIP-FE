function s1next() {
    var a1 = $("input[name='role']:checked").val();
    if(a1==='住建部门'||a1==='质量监督管理部门'){
        // $("#government_dept").val()==a;
        registers1form.action="register1-s2.html";
    }
    else if(a1==='建设单位'||a1==='施工单位'){
        // $("#government_dept").val() ==a;
        // $("#government_dept").placeholder==a;
        alert("选中的用户角色类型是：" + a1);
        if(a1==='建设单位'){
            window.location.href="register2-s2.html?valus="+0;
        }
        if(a1==='施工单位'){
            window.location.href="register2-s2.html?valus="+1;
        }
    }
    else{
        alert("请选择用户角色！");
        return false;
    }
    // return false;
}