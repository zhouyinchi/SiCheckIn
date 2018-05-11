/**
 * Created by 张明源 on 2017/5/19.
 */
define(['/gyjg/static/scripts/lib/gisqLayer.js', 'zhCN'], function (glayer) {

    /**
     * 加载数据
     * @param target    easyui对象
     * @param url       请求地址
     * @param type      easyui下拉类型
     */
    var fillDropList = function (target, url, type) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (result) {
                var data;
                if (result && result['length']) {
                    data = result;
                } else if (result.data && result.data['length']) {
                    data = result.data;
                }
                if (!data)return;
                switch (type) {
                    case 'combobox':
                        target.combobox('loadData', data);
                        break;
                    case 'combotree':
                        target.combotree('loadData', data);
                        break;
                    case 'combogrid':
                        target.combogrid('grid').datagrid('loadData', data);
                        break;
                    default:
                        target.combobox('loadData', data);
                        break;
                }

            }
        });
    }

    /**
     * 绑定树形枚举及枚举
     * @param field 字段名
     * @param callback  回调事件
     */
    var bindEnumTree = function (field, callback) {
        $.ajax({
            url: '../rest/enumData/getDataMulti/' + field,
            dataType: 'json',
            success: function (result) {
                var data = result[0];
                callback(data);
            }
        });
    }

    /**
     * 绑定树形枚举及枚举
     * @param field 字段名
     */
    var bindEnumTreePromise = function (field) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '../rest/enumData/getDataMulti/' + field,
                dataType: 'json',
                success: function (result) {
                    var data = result[0];
                    resolve(data);
                },
                error: function (e) {
                    reject(e.statusText + e.responseText);
                }
            });
        })
    }

    /**
     * 绑定下拉枚举
     * @param field 字段名
     * @param value 指定枚举值
     * @param callback  回调事件
     */
    var bindEnumCombo = function (field, value, callback) {
        $.ajax({
            url: '../rest/enumData/getData/' + field + '/' + value,
            dataType: 'json',
            success: function (result) {
                callback(result);
            }
        });
    }

    /**
     * 绑定下拉枚举
     * @param field 字段名
     * @param value 指定枚举值
     * @param callback  回调事件
     */
    var bindEnumComboPromise = function (field, value) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '../rest/enumData/getData/' + field + '/' + value,
                dataType: 'json',
                success: function (result) {
                    resolve(result);
                },
                error: function (e) {
                    reject(e.statusText + e.responseText);
                }
            });
        });
    }


    /**
     * 加载数据
     * @param api   请求地址
     * @param formTag   数据加载对象
     * @param errorEvent    错误回调事件
     */
    var loadData = function (api, formTag, errorEvent, callEvent) {
        $.ajax({
            url: api,
            success: function (result) {
                if (!result)return;
                if (result.data) {
                    if (callEvent) {
                        callEvent(result.data);
                    } else {
                        formTag.form('load', result.data);
                    }
                    glayer.loadingHide();
                } else {
                    //弹出错误消息
                    glayer.errorTips(result.message);
                    if (errorEvent) {
                        errorEvent;
                    }
                }
            }, error: function (result) {
                glayer.errorTips(result);
                if (errorEvent) {
                    errorEvent;
                }
            }
        })
    }

    /**
     * post加载数据
     * @param api   请求地址
     * @param formName
     * @param errorEvent
     * @param callEvent
     * @param data
     */
    var loadDataPost = function (api, formTag, errorEvent, callEvent, data) {
        $.ajax({
            url: api,
            type: "POST",
            data: data,
            success: function (result) {
                if (!result)return;
                if (result.data) {
                    if (callEvent) {
                        callEvent(result.data);
                    } else {
                        formTag.form('load', result.data);
                    }
                    glayer.loadingHide();
                } else {
                    //弹出错误消息
                    glayer.errorTips(result.message);
                    if (errorEvent) {
                        errorEvent;
                    }
                }
            }, error: function (result) {
                glayer.errorTips(result);
                if (errorEvent) {
                    errorEvent;
                }
            }
        })
    }

    /**
     * 设置表单为只读状态
     * @param:
     * @return:
     * @author:mingo
     * @Date:2017/6/15
     */
    var setFormView = function () {

        $('.textbox').each(function(){
            var obj=$(this);
            obj.css('border',0);
            obj.find('.textbox-addon').remove();
            obj.children().eq(0).removeAttr('disabled');
            obj.children().eq(0).attr('readonly','readonly');
        });

        $('.combo-p').each(function () {
            $(this).css('visibility','hidden');
        })
    }

    return {
        fillDropList: fillDropList,
        bindEnumTree: bindEnumTree,
        bindEnumTreePromise: bindEnumTreePromise,
        bindEnumCombo: bindEnumCombo,
        bindEnumComboPromise: bindEnumComboPromise,
        loadData: loadData,
        loadDataPost: loadDataPost,
        setFormView:setFormView
    }
})