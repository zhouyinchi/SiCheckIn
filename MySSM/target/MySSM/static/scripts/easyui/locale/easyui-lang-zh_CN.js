if ($.fn.pagination) {
    $.fn.pagination.defaults.beforePageText = '第';
    $.fn.pagination.defaults.afterPageText = '共{pages}页';
    $.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
}
if ($.fn.datagrid) {
    $.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
}
if ($.fn.treegrid && $.fn.datagrid) {
    $.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager) {
    $.messager.defaults.ok = '确定';
    $.messager.defaults.cancel = '取消';
}
$.map(['validatebox', 'textbox', 'filebox', 'searchbox',
    'combo', 'combobox', 'combogrid', 'combotree',
    'datebox', 'datetimebox', 'numberbox',
    'spinner', 'numberspinner', 'timespinner', 'datetimespinner'], function (plugin) {
    if ($.fn[plugin]) {
        $.fn[plugin].defaults.missingMessage = '该输入项为必输项';
    }
});
if ($.fn.validatebox) {
    $.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
    $.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
    $.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
    $.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
}
if ($.fn.calendar) {
    $.fn.calendar.defaults.weeks = ['日', '一', '二', '三', '四', '五', '六'];
    $.fn.calendar.defaults.months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
}
if ($.fn.datebox) {
    $.fn.datebox.defaults.currentText = '今天';
    $.fn.datebox.defaults.closeText = '关闭';
    $.fn.datebox.defaults.okText = '确定';
    $.fn.datebox.defaults.formatter = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    };
    $.fn.datebox.defaults.parser = function (s) {
        if (!s) return new Date();
        var ss = s.split('-');
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return new Date();
        }
    };
}
if ($.fn.datetimebox && $.fn.datebox) {
    $.extend($.fn.datetimebox.defaults, {
        currentText: $.fn.datebox.defaults.currentText,
        closeText: $.fn.datebox.defaults.closeText,
        okText: $.fn.datebox.defaults.okText
    });
}
if ($.fn.datetimespinner) {
    $.fn.datetimespinner.defaults.selections = [[0, 4], [5, 7], [8, 10], [11, 13], [14, 16], [17, 19]]
}

/**
 * 重写Datagrid中combotree单选
 */
$.extend($.fn.datagrid.defaults.editors, {
    combotree_single: {
        init: function (container, options) {
            var box = $('<input />').appendTo(container);
            box.combotree(options);
            return box;
        },
        getValue: function (target) {
            var t = $(target).combotree('tree', target);
            var n = t.tree('getSelected');
            return n;
        },
        setValue: function (target, value) {
            if (value) {
                //$(target).combotree('setValue', value.id);
                $(target).combotree('setValue', value.enumName);
            }
        },
        resize: function (target, width) {
            var box = $(target);
            box.combotree('resize', width);
        },
        destroy: function (target) {
            $(target).combotree('destroy');
        }
    },
    //图形按钮重写
    imgButton: {
        init: function (container, options) {
            var div = $('<div />');
            div.css('text-align', 'center');
            var img = $('<img />');
            img.attr('src', options['imgUrl']);
            var button = $("<a href='javascript:void(0)'></a>");
            button.bind('click', options['handler']);
            button.append(img);
            div.append(button);
            div.appendTo(container);
            return div;
        },
        destroy: function (target) {
            $(target).remove();
        },
        getValue: function (target) {
            //return $(target).text();
        },
        setValue: function (target, value) {
            //$(target).text(value);
        },
        resize: function (target, width) {
            var span = $(target);
            if ($.boxModel == true) {
                span.width(width - (span.outerWidth() - span.width()) - 10);
            } else {
                span.width(width - 10);
            }
        }
    },
    label: {
        init: function (container, options) {
            var div = $('<div />');
            div.css('text-align', 'center');
            // var label=$('<label />');
            // label.text("X");
            // div.append(label);
            div.appendTo(container);
            return div;
        },
        destroy: function (target) {
            $(target).remove();
        },
        getValue: function (target) {
            return $(target).text();
        },
        setValue: function (target, value) {
            $(target).text(value);
        },
        resize: function (target, width) {
            //$(target)._outerWidth(width);
            var span = $(target);
            if ($.boxModel == true) {
                span.width(width - (span.outerWidth() - span.width()) - 10);
            } else {
                span.width(width - 10);
            }
        }
    }
});

/**
 * 重新Datagrid的新增、删除等按钮的显示与隐藏事件
 */
$.extend($.fn.datagrid.methods, {
    showToolbarItem: function (jq, param) {
        return jq.each(function () {
            var dpanel = $(this).datagrid('getPanel');
            var toolbar = dpanel.children("div.datagrid-toolbar");
            var cbtn = null;
            if (typeof param == "number") {
                cbtn = toolbar.find("td").eq(param).find('span.l-btn-text');
            } else if (typeof param == "string") {
                cbtn = toolbar.find("span.l-btn-text:contains('" + param + "')");
            }
            if (cbtn && cbtn.length > 0) {
                cbtn.closest('td').show();
                cbtn = null;
            }
        });
    },
    hideToolbarItem: function (jq, param) {
        return jq.each(function () {
            var dpanel = $(this).datagrid('getPanel');
            var toolbar = dpanel.children("div.datagrid-toolbar");
            var cbtn = null;
            if (typeof param == "number") {
                cbtn = toolbar.find("td").eq(param).find('span.l-btn-text');
            } else if (typeof param == "string") {
                cbtn = toolbar.find("span.l-btn-text:contains('" + param + "')");
            }
            if (cbtn && cbtn.length > 0) {
                cbtn.closest('td').hide();
                cbtn = null;
            }
        });
    }
});

/**
 *  datagrid 获取正在编辑状态的行，使用如下：
 *  $('#id').datagrid('getEditingRowIndexs'); //获取当前datagrid中在编辑状态的行编号列表
 */
$.extend($.fn.datagrid.methods, {
    getEditingRowIndexs: function(jq) {
        var rows = $.data(jq[0], "datagrid").panel.find('.datagrid-row-editing');
        var indexs = [];
        rows.each(function(i, row) {
            var index = row.sectionRowIndex;
            if (indexs.indexOf(index) == -1) {
                indexs.push(index);
            }
        });
        return indexs;
    }
});

