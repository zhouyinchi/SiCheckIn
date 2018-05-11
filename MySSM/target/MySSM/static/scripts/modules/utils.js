/**
 * Created by Weit on 2017/5/4.
 */
define(function () {
    var  getQueryString=function(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    var getIpPort=function () {
        var ipport=window.location.host;
        return ipport;
    }
    var OpenTab= function(title, id, url) {

        url = url.replace("../../", "");
        if (url.indexOf("http") == -1) {

        }


        try {
            var pname = window.parent.location.hostname;

            if (window.parent && window.parent != window) {
                window.parent.app.OpenTab(title, id, url);
            } else {
                window.open(url);
            }
        } catch (e)
        {
            window.open(url);
        }

    }
    return {
        getQueryString:getQueryString,
        getIpPort:getIpPort,
        OpenTab:OpenTab
    }
})