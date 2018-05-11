/**
 * Created by 4color on 2017/3/29.
 * 系统通用的js库
 */
define(["zhCN", "layer"], function () {

    /**
     *  页面加载等待页面
     *
     * @author zhuyf
     * @date 2016/6/13
     *
     */
    var layerIndex = function () {

    };
    var loadingShow = function () {
        this.layerIndex = layer.load(1, {title: '加载中...', shade: 0.2});
    };

    ///隐藏loading
    var loadingHide = function () {
        layer.close(this.layerIndex);
    };

    //错误的提示消息
    var ErrorTips = function (msg) {
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
        var that = this;
        layer.msg(msg, {icon: 2, closeBtn: 1, shade: 0.2}, function () {
            that.loadingHide();
        });
    };

    /**
     * JQuery初始化当前时间。
     * @param type 时间日期类型。date:yyyy-mm-dd,datetime:yyyy-mm-dd hh:mm:ss
     */
    var getNowFormatDate = function (type) {
        var date = new Date();
        var years = date.getFullYear();
        var months = date.getMonth() + 1;
        var dates = date.getDate();
        if (type == 'date') {
            return years + "-" + months + "-" + dates;
        } else {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            return years + "-" + months + "-" + dates + " " + hours + ":" + minutes + ":" + seconds;
        }
        // return currentdate;
    };
    //日期加上天数得到新的日期
    //dateTemp 需要参加计算的日期，days要添加的天数，返回新的日期，日期格式：YYYY-MM-DD
    var getNewDayByAddDays = function (dateTemp, days) {
        var dateTemp = dateTemp.split("-");
        var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
        var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
        var rDate = new Date(millSeconds);
        var year = rDate.getFullYear();
        var month = rDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var date = rDate.getDate();
        if (date < 10) date = "0" + date;
        return (year + "-" + month + "-" + date);
    };
    /*get URL参数值*/
    var  getQueryString=function(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    /*根据字段名称 枚举值 获取combotree数据*/
    var FillComboTreeList = function (id, fldLeName, enumVlaue, isContain) {
        $.ajax({
            url: '../rest/enumData/getComboTree?fldLetterName=' + fldLeName + '&enumValue=' + enumVlaue + '&isContain=' + isContain,
            success: function (result) {
                $("#" + id).combotree("loadData", result);
            }
        });
    }

    /*根据字段名称 获取combotree数据*/
    var FillComboTreeListByFldName = function (id, fldLeName) {
        $.ajax({
            url: '../rest/enumData/getComboTreeByFldName?fldLetterName=' + fldLeName,
            success: function (result) {
                $("#" + id).combotree("loadData", result);
            }
        });
    }

    /*根据字段名称获取Combobox数据*/
    var FillComboboxList = function (id, fldLeName) {
        $("#" + id).combobox({
            url: '../rest/enumData/getCombobox?fldLetterName=' + fldLeName,
            valueField: 'enumValue',
            textField: 'enumName'
        });
    }

    /*获取表单Json数据*/
    var GetFormData = function (rsNameTarget) {
        var obj = new Object();
        var ss = $("input[textboxname],select[textboxname]").not(".easyui-datagrid input");
        for (var i = 0; i < ss.length; i++) {
            var o = ss[i];
            var oName = $(o).attr("textboxname");
            var v;
            var rsName = $(o).attr("rsname");
            if (rsName == rsNameTarget) {
                var className = $(o).attr("class");
                if (className.indexOf("easyui-textbox") >= 0) {
                    v = $.trim($(o).textbox('getValue'));
                } else if (className.indexOf("easyui-numberbox") >= 0) {
                    v = $(o).textbox('getValue');
                }
                else if (className.indexOf("easyui-combotree") >= 0) {
                    v = $(o).textbox('getValue');
                } else if (className.indexOf("easyui-combobox") >= 0) {
                    v = $(o).combobox('getValue');
                } else if (className.indexOf("easyui-datebox") >= 0) {
                    v = $(o).datebox('getValue');
                }
                obj[oName] = v;
            }
        }
        return obj;
    }

    /*给表单数据附值*/
    var SetFormData = function (rsNameTarget, model) {
        if (model == null) return;
        var ss = $("input[textboxname],select[textboxname]").not(".easyui-datagrid input");
        for (var i = 0; i < ss.length; i++) {
            var o = ss[i];
            var oName = $(o).attr("textboxname");
            var v;
            var rsName = $(o).attr("rsname");
            if (rsName == rsNameTarget) {
                var className = $(o).attr("class");
                if (className.indexOf("easyui-textbox") >= 0) {
                    v = $(o).textbox('setValue', model[oName]);
                } else if (className.indexOf("easyui-numberbox") >= 0) {
                    v = $(o).textbox('setValue', model[oName]);
                } else if (className.indexOf("easyui-combotree") >= 0) {
                    v = $(o).combotree('setValue', model[oName]);
                } else if (className.indexOf("easyui-combobox") >= 0) {
                    v = $(o).combobox('setValue', model[oName]);
                } else if (className.indexOf("easyui-datebox") >= 0) {
                    v = $(o).datebox('setValue', model[oName]);
                }
            }
        }
    }

    /*Form表单文本框只读*/
    var setFormView = function () {

        var ss = $("input,select,textarea");
        for (var i = 0; i < ss.length; i++) {
            var o = ss[i];
            var className = $(o).attr("class");
            if (className) {
                if (className.indexOf("textbox-text") >= 0 || className.indexOf("easyui-textbox") >= 0) {
                   $(o).textbox({ disabled: true });
                } else if (className.indexOf("easyui-combotree") >= 0) {
                    $(o).combotree({disabled: true});
                } else if (className.indexOf("easyui-combobox") >= 0) {
                    $(o).combobox({disabled: true});
                } else if (className.indexOf("easyui-datebox") >= 0) {
                    $(o).datebox({ disabled: true });
                } else if (className.indexOf("easyui-numberbox") >= 0) {
                    $(o).numberbox({ disabled: true });
                }else if (className.indexOf("easyui-linkbutton") >= 0) {
                    $(o).attr("style", "display:none;")
                }
            }
        }
    }

    /*设置form表单可以编辑*/
    var setFormEdit = function(rsTableName,rsFieldname) {
        var ss = $("input,select,textarea");
        for (var i = 0; i < ss.length; i++) {
            var o = ss[i];
            var className = $(o).attr("class");

            var oName = $(o).attr("textboxname");
            if (oName) {
                oName = $(o).attr("textboxname").toLowerCase();
            }

            var rsName = $(o).attr("rsname");
            if (rsName) {
                rsName = $(o).attr("rsname").toLowerCase();
            }

            if (rsName && oName) {
                if (rsName == rsTableName && rsFieldname == oName) {
                    if (className) {
                        if (className.indexOf("textbox-text") >= 0 || className.indexOf("easyui-textbox") >= 0) {
                            $(o).textbox({disabled: false});
                        } else if (className.indexOf("easyui-combotree") >= 0) {
                            $(o).combotree({disabled: false});
                        } else if (className.indexOf("easyui-combobox") >= 0) {
                            $(o).combobox({disabled: false});
                        } else if (className.indexOf("easyui-datebox") >= 0) {
                            $(o).datebox({disabled: false});
                        } else if (className.indexOf("easyui-numberbox") >= 0) {
                            $(o).numberbox({disabled: false});
                        } else if (className.indexOf("easyui-linkbutton") >= 0) {
                            $(o).attr("style", "display:block;")
                        }
                    }
                }
            }
        }
    }

    /**
     * 数组转哈希
     * @param arr   原始数组
     * @param key   键名
     * @param value 值名
     * @returns {{}}
     */
    var transferHash = function (arr, key, value) {
        var hash = {};
        for (var i = 0, a; a = arr[i++];) {
            hash[a[key]] = a[value];
        }
        return hash;
    }

    /**
     * 查询列表枚举数据转换
     * @param dataSource    数据源
     * @param enumOptions   {data:枚举数据源,field:字段名}
     */
    var dataEnumConvert = function (dataSource, enumOptions) {
        if (!dataSource || !dataSource['length'])return;
        if (!enumOptions || !enumOptions['length'])return;
        var enumHash = {};
        for (var k = 0, x; x = enumOptions[k++];) {
            if (x && x['data'] && x['field']) {
                enumHash[x['field']] = this.transferHash(x['data'], 'enumValue', 'enumName');
            }
        }

        for (var i = 0, a; a = dataSource[i++];) {
            for (var item in enumHash) {
                var v = a[item];
                if (v) {
                    a[item] = enumHash[item][v];
                }
            }
        }
        return dataSource;
    }


    /**
     * 枚举原始数据源
     * @param dataSource
     * @param key   绑定值名称
     * @param value     绑定文本名称
     */
    var buildEnumTree = function (dataSource) {
        if (!dataSource || !dataSource['length'])return;

        var enumTree = [], child = {};
        //分拣一级父节点和按父节点分组子节点集合
        for (var i = 0, a; a = dataSource[i++];) {
            //防止关联键被覆盖
            a['pId']=a['id'];
            //结构重命名
            a['id'] = a['enumValue'];
            a['text'] = a['enumName'];
            if (!a['parentEnumValue']) {
                enumTree.push(a);
            } else {
                if (!child[a['parentEnumValue']]) {
                    child[a['parentEnumValue']] = [];
                }
                child[a['parentEnumValue']].push(a);
            }
        }

        rebuildTree(enumTree, child);

        /**
         * 递归创建深度树
         * @param pEnum 父数据源
         * @param cEnum 按父节点分组子集合
         */
        function rebuildTree(pEnum, cEnum) {
            for (var j = 0, b; b = pEnum[j++];) {
                if (cEnum[b['pId']]) {
                    b['children'] = cEnum[b['pId']];
                    rebuildTree(cEnum[b['pId']], cEnum);
                }
            }
        }

        return enumTree;
    }

    /**
     *  打开档案袋-编辑和查查
     * @param BIZINST_GUID 项目主键
     * @param fn 方案节点名
     * @constructor
     */
    var OpenDanDai = function (BIZINST_GUID,fn) {
        //BIZDEF_GUID 配置档案袋的 bizDefGuid
        //BIZINST_GUID 项目GUID
        //fn 方案节点名
        var ip = window.location.host; //host 带端口号地址 hostname 无端口号地址
        var urlnews = "http://" + ip + "/GisqPlatformExplorer/modules/bizmodel/filebag?fcn="+fn+"&BIZDEF_GUID=c6697ad6-3eba-11e7-8d4c-00505683b230&BIZINST_GUID=" + BIZINST_GUID ;
        window.open(urlnews);
    }

    /**
     * 打开档案袋 新增
     * @param fn 节点分类
     * @constructor
     */
    var OpenDanDaiNew = function(fn){
        var ip = window.location.host; //host 带端口号地址 hostname 无端口号地址
        var urlnews = "http://" + ip + "/GisqPlatformExplorer/modules/bizmodel/filebag?fcn="+fn+"&BIZDEF_GUID=c6697ad6-3eba-11e7-8d4c-00505683b230";
        window.open(urlnews);
    }

    /**
     * 生成GUID
     * @returns {string}
     * @constructor
     */
    var NewGUID = function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

    /**
     * url中新增参数
     * @param name
     * @param value
     */
     var addUrlPara =function(name, value) {

        var currentUrl = window.parent.location.href.split('#')[0];
        if (/\?/g.test(currentUrl)) {
            if (/name=[-\w]{4,25}/g.test(currentUrl)) {
                currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
            } else {
                currentUrl += "&" + name + "=" + value;
            }
        } else {
            currentUrl += "?" + name + "=" + value;
        }
        if (window.parent.location.href.split('#')[1]) {
            window.parent.location.href = currentUrl + '#' + window.location.href.split('#')[1];
        } else {
            window.parent.location.href = currentUrl;
        }
    }

    /**
     * 初始化土地用途明细
     * @param gridId
     * @param xmGuid
     * @param tdytDataEnum 土地用枚举值
     */
    var initTdytGrid = function(gridId,xmGuid,tdytDataEnum,action){
        var datagrid; //定义全局变量datagrid
        var editRow = undefined;//定义全局变量：当前编辑的行
        var tdytEntity = undefined;
        datagrid = $('#'+gridId).datagrid({
            collapsible: true,
            singleSelect: true,
            rownumbers: true,
            url: '../rest/tdmxData/tdytMx?xmGuid=' +xmGuid,
            idField:'ytGuid', //主键
            columns: [[
                { field: 'ytGuid', title: '主键', width: 100, hidden:true },
                { field: 'xmGuid', title: '外键', width: 100, hidden:true },
                { field: 'tdytEntity', title: '土地用途', width: 250 ,
                    editor:{
                        type:'combotree_single',
                        options:{
                            required:true,
                            data:tdytDataEnum
                        }
                    }, formatter:function(value,row,index) {

                    //编辑时 枚举值丢失 重新赋值
                    if (row.tdYt != "" && row.tdytEntity == null && tdytEntity != "undefined") {
                        row.tdytEntity = tdytEntity;
                    }
                    if (value) {
                        if (typeof(value.text) == "undefined") {
                            return value.enumName;
                        } else {
                            return value.text;
                        }
                    }
                    if (row.tdytEntity != undefined)
                        return row.tdytEntity.enumName;
                }
                },
                { field: 'ytMj', title: '用途面积（公顷）', width: 120 ,editor: { type: 'numberbox', options: { min: 0, precision: 4 } }},
                { field: 'crNx', title: '出让年限', width: 120 ,editor: { type: 'textbox'}},
                {
                    field: 'sfPgf', title: '是否棚改房', width: 100, align: 'center', formatter: function (value, row) {
                    if (row.sfPgf == "1")
                        return "是";
                    else{
                        return "否";
                    }
                },editor: {
                    type: 'combobox',
                    options: {
                        panelHeight: '50px',
                        valueField: 'value',
                        textField: 'text',
                        data: [{value: '1', text: '是'}, {value: '0', text: '否'}]
                        ,
                        onChange: function () {

                            //棚改面积文本框是否可编辑
                            var selectValue = $(this).combobox('getValue');
                            if (editRow  != undefined) {
                                var eq = datagrid.datagrid('getEditor', {index: editRow, field: 'pgMj'});
                                if (eq) {
                                    if (selectValue == "1") {
                                        $(eq.target).parent("td").find("span").find("input:eq(0)").removeAttr("disabled");
                                    } else {
                                        $(eq.target).parent("td").find("span").find("input:eq(0)").attr("disabled", "disabled");
                                        $(eq.target).textbox('setValue', '');
                                    }
                                }
                            }
                        }
                    }
                }
                },
                { field: 'pgMj', title: '棚改面积（公顷）', width: 120 ,editor: { type: 'numberbox', options: { min: 0, precision: 4 } }}
            ]],
            toolbar: [{
                text: '添加', iconCls: 'icon-add', handler: function () {
                    if (editRow != undefined) {
                        datagrid.datagrid('endEdit', editRow);
                    }
                    if (editRow == undefined) {
                        datagrid.datagrid('insertRow', {
                            index: 0,
                            row: {}
                        });
                        datagrid.datagrid('beginEdit', 0);
                        editRow = 0;
                    }
                }
            }, '-', {
                text: '保存', iconCls: 'icon-save', handler: function () {

                    datagrid.datagrid('endEdit', editRow);
                    //如果调用acceptChanges(),使用getChanges()则获取不到编辑和新增的数据。
                    //使用JSON序列化datarow对象，发送到后台。
                    var rows = datagrid.datagrid('getChanges');

                    if(rows.length==0){
                        layer.msg('没有待保存记录，请先新增或者修改！', {time: 3000, icon:6});
                        return false;
                    }

                    for(var i = 0;i < rows.length; i++) {
                        rows[i].tdYt = rows[i].tdytEntity.enumValue;
                        rows[i].tdytEntity = null;
                    }

                    if (window.parent.location.href.indexOf("BIZINST_GUID") < 0) {
                        layer.msg("请先保存项目基本信息", {time: 3000, icon: 6});
                        return false;
                    }

                    loadingShow();
                    var rowstr = JSON.stringify(rows);
                    $.ajax({
                        url: '../rest/tdmxData/AddTdmx?xmGuid='+ xmGuid,
                        type: 'POST',
                        data:rowstr,
                        dataType: 'json',
                        contentType:'application/json',
                        success: function (result) {
                            layer.msg(result.message, {time: 3000, icon:6});
                            datagrid.datagrid('reload');
                            loadingHide();
                        }, error: function (e) {
                           ErrorTips(e);loadingHide();
                        }
                    });
                }
            }
            // , '-', {
            //     text: '编辑', iconCls: 'icon-edit', handler: function () {
            //         var row = datagrid.datagrid('getSelected');
            //
            //         if (row !=null) {
            //             tdytEntity = row.tdytEntity;
            //             if (editRow != undefined) {
            //                 datagrid.datagrid('endEdit', editRow);
            //             }
            //
            //             if (editRow == undefined) {
            //                 var index = datagrid.datagrid('getRowIndex', row);
            //                 datagrid.datagrid('beginEdit', index);
            //                 editRow = index;
            //
            //                 //编辑是否 棚改面积文本框是否可编辑
            //                 var isPg =  datagrid.datagrid('getEditor', {index: editRow, field: 'sfPgf'});
            //                 var eq = datagrid.datagrid('getEditor', {index: editRow, field: 'pgMj'});
            //                 if (eq) {
            //                     if (isPg.oldHtml == "否") {
            //                         $(eq.target).parent("td").find("span").find("input:eq(0)").attr("disabled", "disabled");
            //                         $(eq.target).textbox('setValue', '');
            //                     } else {
            //                         $(eq.target).parent("td").find("span").find("input:eq(0)").removeAttr("disabled");
            //                     }
            //                 }
            //
            //                 datagrid.datagrid('unselectAll');
            //             }
            //         } else {
            //
            //         }
            //     }
            // }, '-', {
            //     text: '撤销编辑', iconCls: 'icon-redo', handler: function () {
            //         editRow = undefined;
            //         tdytEntity = undefined;
            //         datagrid.datagrid('rejectChanges');
            //         datagrid.datagrid('unselectAll');
            //     }
            // }

            , '-', {
                text: '删除', iconCls: 'icon-remove', handler: function () {
                    tdytEntity = undefined;
                    var row = datagrid.datagrid('getSelected');

                        if(row){
                            var index = datagrid.datagrid('getRowIndex', row);
                            datagrid.datagrid('deleteRow', index);
                           // datagrid.datagrid('reload');
                        }else {
                            if(editRow!=undefined){
                                //是否删除当前编辑行
                                datagrid.datagrid('deleteRow', editRow);
                               // datagrid.datagrid('reload');
                                editRow = undefined;
                            }else{
                                layer.msg("请选择待删除的行数据！", {time: 3000, icon: 5});
                            }
                        }

                        var mxytGuid = row.ytGuid;
                        if(mxytGuid){
                            $.ajax({
                                url: '../rest/tdmxData/DelTdmx?ytGuid='+mxytGuid,
                                success: function (result) {
                                    layer.msg(result.message, {time: 3000, icon:6});
                                    //datagrid.datagrid('reload');
                                   // loadingHide();
                                }
                            });
                        }

                    // //询问框
                    // layer.confirm('确定删除吗？', {
                    //     btn: ['是','否'] //按钮
                    // }, function(){
                    //     loadingShow();

                    // });
                }
            }],
            onAfterEdit: function (rowIndex, rowData, changes) {
                editRow = undefined;
            },
            onDblClickRow:function (rowIndex, rowData) {
                if(action!="view"){
                    tdytEntity = rowData.tdytEntity;
                    if (editRow != undefined) {
                        datagrid.datagrid('endEdit', editRow);
                        editRow = undefined;
                    }
                    if (editRow == undefined) {
                        datagrid.datagrid('beginEdit', rowIndex);
                        editRow = rowIndex;

                        //编辑是否 棚改面积文本框是否可编辑
                        var isPg =  datagrid.datagrid('getEditor', {index: editRow, field: 'sfPgf'});
                        var eq = datagrid.datagrid('getEditor', {index: editRow, field: 'pgMj'});
                        if (eq) {
                            if (isPg.oldHtml == "否") {
                                $(eq.target).parent("td").find("span").find("input:eq(0)").attr("disabled", "disabled");
                                $(eq.target).textbox('setValue', '');
                            } else {
                                $(eq.target).parent("td").find("span").find("input:eq(0)").removeAttr("disabled");
                            }
                        }
                    }
                }
            },
            onClickRow:function(rowIndex,rowData){
                if (editRow != undefined) {
                    datagrid.datagrid('endEdit', editRow);
                    editRow = undefined;
                }
            }
        });
    }

    /*
     导出省厅的xml数据 zhuyf 2017-6-16
     moduleid:模块id
     keyguid:数据主键
     */
    var exportXmlData=function (moduleid,keyguid) {

        var data= {
            "params": {
                "keyGuid": keyguid
            },
            "id": moduleid
        };
        this.loadingShow();
        var thant=this;
        $.ajax({
            type: "POST",
            url: "/gyjg/rest/dataimport/import",
            contentType: "application/json;charset=UTF-8",//必须有
            data:JSON.stringify(data),
            dataType: "json", //表示返回值类型，不必须
            success: function (result) {
                if(result.isSuccess){
                    window.open("/gyjg/rest/dataimport/download/"+result.data);
                }else{
                    thant.ErrorTips(result.message);
                }
            },
            error: function (xhr, status, error) {
                thant.ErrorTips(xhr);
            },complete:function () {
                thant.loadingHide();
            }
        });

    }

    return {
        loadingShow: loadingShow,
        layerIndex: layerIndex,
        loadingHide: loadingHide,
        ErrorTips: ErrorTips,
        FillComboTreeList: FillComboTreeList,
        FillComboTreeListByFldName: FillComboTreeListByFldName,
        FillComboboxList: FillComboboxList,
        GetFormData: GetFormData,
        SetFormData: SetFormData,
        setFormView: setFormView,
        setFormEdit:setFormEdit,
        transferHash: transferHash,
        dataEnumConvert: dataEnumConvert,
        buildEnumTree: buildEnumTree,
        OpenDanDai: OpenDanDai,
        getQueryString: getQueryString,
        getNewDayByAddDays: getNewDayByAddDays,
        getNowFormatDate: getNowFormatDate,
        NewGUID: NewGUID,
        OpenDanDaiNew: OpenDanDaiNew,
        addUrlPara: addUrlPara,
        initTdytGrid:initTdytGrid,
        exportXmlData:exportXmlData
    }
});
