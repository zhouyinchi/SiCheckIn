/**
 * Created by 张明源 on 2017/5/19.
 */

define([], function () {
    /**
     * 生成guid
     * @returns {string}
     * @constructor
     */
    var guid = function () {

        var len = 20;
        var radix = 26;
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

    /**
     * 获取url中参数值
     * @param name  参数名
     * @returns {null}
     */
    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
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
            a['pId'] = a['id'];
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
     * 根据时间格式初始化当前时间
     * @param formatter   时间及日期格式自定义： yyyy-MM-dd HH:mm:ss、MM-dd-yyyy、dd/MM/yyyy等等
     * @param isStandard 是否标准化：标准化时间格式显示为文本
     * @returns {string}
     */
    var getCurrentDate = function (formatter, isStandard) {
        var date = new Date();
        var years = date.getFullYear();
        var months = date.getMonth() + 1;
        var dates = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (isStandard) {
            months = months < 10 ? ('0' + months) : months;
            dates = dates < 10 ? ('0' + dates) : dates;
            hours = hours < 10 ? ('0' + hours) : hours;
            minutes = minutes < 10 ? ('0' + minutes) : minutes;
            seconds = seconds < 10 ? ('0' + seconds) : seconds;
        }

        function dateReplace(k, v, f) {
            var idx = f.indexOf(k);
            if (idx >= 0) {
                f = f.replace(k, v);
            }
            return f;
        }

        formatter = dateReplace('yyyy', years, formatter);
        formatter = dateReplace('MM', months, formatter);
        formatter = dateReplace('dd', dates, formatter);
        formatter = dateReplace('HH', hours, formatter);
        formatter = dateReplace('mm', minutes, formatter);
        formatter = dateReplace('ss', seconds, formatter);

        return formatter;
    }

    /**
     * 编码转换方法
     * @returns {{base64encode: base64encode, base64decode: base64decode}}
     */
    var codeConvert = function () {
        /**
         * base64编码
         * @param {Object} str
         */
        var base64encode = function (str) {
            var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        }

        /**
         * base64解码
         * @param {Object} str
         */
        var base64decode = function (str) {
            var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                /* c1 */
                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                }
                while (i < len && c1 == -1);
                if (c1 == -1)
                    break;
                /* c2 */
                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                }
                while (i < len && c2 == -1);
                if (c2 == -1)
                    break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                /* c3 */
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = base64DecodeChars[c3];
                }
                while (i < len && c3 == -1);
                if (c3 == -1)
                    break;
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                /* c4 */
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = base64DecodeChars[c4];
                }
                while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        }

        return{
            base64encode:base64encode,
            base64decode:base64decode
        }
    }

    return {
        guid:guid,
        getUrlParam: getUrlParam,
        transferHash: transferHash,
        dataEnumConvert: dataEnumConvert,
        buildEnumTree: buildEnumTree,
        getCurrentDate: getCurrentDate,
        codeConvert: codeConvert
    }
})