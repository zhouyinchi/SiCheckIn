/**
 * Created by Weit on 2017/11/7.
 */
define(["config","api","lib","layer","/MySSM/static/scripts/modules/utils.js"], function (config,api,lib,layer,util) {

    var init=function () {
        $(document).ready(function () {
            //alert(222);
            $.parser.parse();
            search();

        });
    }
    var pageInit=function () {
        $(document).ready(function () {
            //alert(222);
            $.parser.parse();
            var userId=util.getQueryString("userId");
            if(userId!=null&&userId){
                $.ajax({
                    url: '../data/User/getUser?userId='+userId,
                    type: 'GET',
                    async:false,
                    dataType: 'JSON',
                    success: function (data) {
                        $.each(data, function(i) {
                            //alert(i);
                            switch (i)
                            {
                                case "birthday":
                                    $("#"+i+"").datebox('setValue',data[i]);
                                    break;

                                case "sex":
                                    if(data[i]=="1"){
                                        $("#man").attr("checked", "checked");
                                    }
                                    else if(data[i]=="0"){
                                        $("#woman").attr("checked", "checked");
                                    }

                                default:
                                    $("#"+i+"").val(data[i]);
                                    break;
                            }
                        });
                    }, error: function (e) {
                    }
                });
            }
            else
            {
                var userid=getUUID();
                //alert(userid);
                $("#userid").val(userid);
            }
        }
        );
    }
    function getUUID() {
        var userId=util.getQueryString("userId");
        var uuid="";
        $.ajax({
            url: '/MySSM/data/User/getUUID',
            type: 'GET',
            async:false,
            dataType: 'text',
            success: function (result) {
                uuid=userId&&userId!=null ?userId:result;
            }, error: function (e) {
            }
        });
        return uuid;
    }
    var openAdd=function (userId) {
        layer.open({
            type: 2, title: '添加/编辑用户', area: ['350px', '400px'], fixed: false,//不固定
            scrollbar: false, resize: false, move: false,
            content: '/MySSM/view/adduser?userId='+userId, //这里content是一个普通的String
            cancel: function (index, layero) {
                //alert("关闭");
                search();
            }
        });
    }
    var edit=function () {
        var row = $('#dg_user').datagrid('getSelected');
        if (row){
           // alert(row.userid);
            app.openAdd(row.userid);

        }
        else{
            layer.msg("请先选中一条记录");
        }
    }
    var del=function () {
        var row = $('#dg_user').datagrid('getSelected');
        if (row){
            // alert(row.userid);
            $.ajax({
                url: '/MySSM/data/User/deleteUser?userId='+row.userid,
                type: 'GET',
                async:false,
                dataType: 'JSON',
                success: function (result) {
                    layer.msg(result.msg);

                }, error: function (e) {
                }
            });
        }
        else{
            layer.msg("请先选中一条记录");
        }
        search();
    }
    var saveUser=function () {
        var user={};
        user.userId=$("#userid").val();
        user.username=$("#username").val();
        user.sex=($("input:radio[name='sex']").filter(":checked")).val();
        user.birthday=$("#birthday").datebox('getValue');
        user.address=$("#address").val();
        user.note=$("#note").val();
        console.log(JSON.stringify(user));
        $.ajax({
            url: '/MySSM/data/User/saveUser',
            type: 'POST',
            dataType: 'json',data:JSON.stringify(user),
            contentType:'application/json',
            success: function (result) {
                layer.msg(result.msg);

            }, error: function (e) {
                lib.ErrorTips(e);
                lib.loadingHide();
            }
        });
    }
    var sexFormat=function (rowIndex, rowData) {
        //alert(rowData.sex);
        var value=rowData.sex;
        if(value){
            if(value=="1"){
                return "男";
            }
            else if(value=="0"){
                return "女";
            }
        }else if(value=="0"){
            return "女";
        }
    }
    function  search(pageNumber, pageSize) {
        //alert("开始批后监管页面的 初次加载");
        lib.loadingShow();
        var vpageNumber = 1;
        var vpageSize = 13

        if (pageSize) {
            vpageNumber = pageNumber;
        }

        if (pageSize) {
            vpageSize = pageSize;
        }

        //alert(tdyt);
        //var
        // condition={xzq:""+xzq+"",xmmc:""+xmmc+"",srr:""+srr+"",gyfs:""+gyfs+"",pzwh:""+pzwh+"",tdyt:""+tdyt+"",pageSize:""+vpageSize+"",pageNum:""+vpageNumber+""};

        $.ajax({
            url: '/MySSM/data/User/getAllUser',
            type: 'POST',
            dataType: 'json',
            contentType:'application/json',
            success: function (result) {
                //alert(result);
                var dg = $('#dg_user');
                dg.datagrid('loadData',{rows: result.rows,total:result.total});
                lib.loadingHide();
            }, error: function (e) {
                lib.ErrorTips(e);
                lib.loadingHide();
            }
        });
    }
    return {
        init:init,
        pageInit:pageInit,
        sexFormat:sexFormat,
        openAdd:openAdd,
        saveUser:saveUser,
        edit:edit,
        del:del
    }
});