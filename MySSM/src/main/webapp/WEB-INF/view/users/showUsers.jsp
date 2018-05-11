<%--
  Created by IntelliJ IDEA.
  User: Weit
  Date: 2017/11/7
  Time: 8:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>User</title>
    <!--引入基本的css文件-->
    <link rel="stylesheet" type="text/css" href="/MySSM/static/css/lib.css" />

    <!--引入requirejs文件和main.js主要文件-->
    <script type="text/javascript" data-main="/MySSM/static/scripts/main" src="/MySSM/static/scripts/require.js"></script>

    <script>
        //引入list模块js文件，并调用初始化方法initialize()
        var app = new Object();
        require(["/MySSM/static/scripts/modules/users/user.js"], function (App) {
            app=App;
            App.init();
        });
        var toolbar = [{
            text:'数据查询',
            iconCls:'icon-search',
            handler:function(){app.showcondition();}
        }];
    </script>
</head>
<body style="margin:0px;padding: 0px;overflow: hidden;margin-top:5px;">

<div id="layout" class="easyui-layout" data-options="fit:true">
    <input type="button" id="add" value="新增" onclick="app.openAdd('')"/>
    <input type="button" id="edit" value="编辑" onclick="app.edit()"/>
    <input type="button" id="del" value="删除" onclick="app.del()"/>
   <div margin-top: 5px;>
       <table id="dg_user" width="100%" style="" class="easyui-datagrid"
              data-options="rownumbers:true,singleSelect:true,autoRowHeight:false,pagination:false,resizeHandle:'right',pageSize:13,pageList:[13]" style="width: 100%; height: 400px">
           <thead data-options="frozen:true">
           <tr>
               <th data-options="field:'userid',width:100,align:'center'">用户编号</th>
               <th data-options="field:'username',width:150,align:'center'">用户姓名</th>
               <th data-options="field:'address',width:200,align:'left'">用户地址</th>
               <th data-options="field:'sex',width:90,align:'center',formatter:app.sexFormat">用户性别</th>
               <th data-options="field:'birthday',width:100,align:'center'">用户生日</th>
               <th data-options="field:'note',width:300,align:'center'">备注说明</th>

           </tr>
           </thead>
           <tbody>

           </tbody>
       </table>
   </div>

</div>

</body>
</html>
