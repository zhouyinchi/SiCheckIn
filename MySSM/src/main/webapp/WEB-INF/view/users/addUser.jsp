<%--
  Created by IntelliJ IDEA.
  User: Weit
  Date: 2017/11/7
  Time: 12:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>增加用户</title>
    <!--引入基本的css文件-->
    <link rel="stylesheet" type="text/css" href="/MySSM/static/css/lib.css" />

    <!--引入requirejs文件和main.js主要文件-->
    <script type="text/javascript" data-main="/MySSM/static/scripts/main" src="/MySSM/static/scripts/require.js"></script>

    <script>
        //引入list模块js文件，并调用初始化方法initialize()
        var app = new Object();
        require(["/MySSM/static/scripts/modules/users/user.js"], function (App) {
            app=App;
            app.pageInit();
        });
    </script>
</head>
<body>
<input type="hidden" id="userid"/>
      <table>
          <tr>
              <td>
                  姓名：
              </td>
              <td>
                  <input type="text" id="username"/>
              </td>
          </tr>
          <tr>
              <td>
                  性别：
              </td>
              <td>
                  <input type="radio" id="man" name="sex" value="1"/>男
                  &nbsp;
                  <input type="radio" id="woman" name="sex" value="0"/>女
              </td>
          </tr>
          <tr>
              <td>
                  生日：
              </td>
              <td>
                  <input type="text" id="birthday" class="easyui-datebox" />
              </td>
          </tr>
          <tr>
              <td>
                  地址：
              </td>
              <td>
                  <input type="text" id="address"/>
              </td>
          </tr>
          <tr>
              <td>
                  备注说明：
              </td>
              <td>
                  <input type="text" id="note"/>
              </td>
          </tr>
          <tr>
              <td colspan="2">
                  <input type="button" id="save" value="保 存" onclick="app.saveUser();"/>
              </td>
          </tr>

      </table>
</body>
</html>
