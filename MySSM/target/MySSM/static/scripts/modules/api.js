/**
 * Created by 4color on 2017/3/24.
 * 用于调用Rest服务的各类api
 */

define(["config"],function (config) {

    /*
      用于调用Rest服务的ajax
      封装了认证。
     */
    var restWorkflowAjax=function (url,data,success,type,error) {
        $.ajax({
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Basic " + config.token);
            },
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(data),
            url: url,
            success: success,
            type:type,
            error: error
        });
    };

    /*
    * 调用框架本身的服务
    * config.paltformurl:/GisqPlatformExplorer/a"
    */
    var restPlatformAjax=function (objAjax) {
        $.ajax({
            contentType:"application/json; charset=utf-8",
            dataType: "json",
            url: config.paltformurl+objAjax.url,
            success: objAjax.success,
            error: objAjax.error
        });
    };

    /*
     * 调用框架本身的Rest服务
     * config.paltformrest:/GisqPlatformExplorer/platform-rest/"
     */
    var restPlatformAjaxself=function (objAjax) {
        $.ajax({
            contentType:"application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(objAjax.data),
            processData: false,
            type:"POST",
            url: config.paltformrest+objAjax.url,
            success: objAjax.success,
            error: objAjax.error
        });
    };



    return {
        restPlatformAjax:restPlatformAjax,
        restWorkflowAjax:restWorkflowAjax,
        restPlatformAjaxself:restPlatformAjaxself
    }
});