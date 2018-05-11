/**
 * Created by 张明源 on 2017/5/19.
 */

define(['layer'], function (layer) {

    function gisqLayer() {
        this.layerIndex = -1;
    }

    /**
     * 获取当前层信息
     * @returns {layerIndex|*}
     */
    gisqLayer.prototype.getLayerIndex = function () {
        return this.layerIndex;
    }

    /**
     * 正在加载层显示
     */
    gisqLayer.prototype.loadingShow = function () {
        this.layerIndex = layer.load(1, {title: '加载中...', shade: 0.2});
    }

    /**
     * 隐藏层
     */
    gisqLayer.prototype.loadingHide = function () {
        if (!this.layerIndex) return;
        layer.close(this.layerIndex);
    };


    /**
     * 错误信息提示层
     * @param msg
     * @constructor
     */
    var errorTips = function (msg) {
        if (msg && msg.status) {
            try {
                if ($.parseJSON(msg.responseText))
                    msg = msg.responseText;
            } catch (e) {
                try {
                    msg = $(msg.responseText).text();
                } catch (e) {
                    msg = msg.status + msg.statusText;
                }
            }

        }
        var l = new gisqLayer();
        layer.msg(msg, {icon: 2, closeBtn: 1, shade: 0.2}, function () {
            l.loadingHide();
        });
    };

    /**
     * 显示消息
     * @param msg
     */
    var tips = function (msg) {
        var l = new gisqLayer();
        layer.msg(msg, {icon: 1, closeBtn: 1, shade: 0.2}, function () {
            l.loadingHide();
        });
    }

    return {
        gisqLayer: gisqLayer,
        errorTips: errorTips,
        tips: tips
    }
});
