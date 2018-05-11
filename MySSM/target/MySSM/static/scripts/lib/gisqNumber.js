/**
 * 浮点运算扩展类
 * Created by mingo on 2017/6/14.
 */

define(function () {
    //加法
    var plus = function (num1, num2) {
        var _num1 = getTransferNum(num1), _num2 = getTransferNum(num2);
        var _maxlen = Math.max(_num1.len, _num2.len);
        var n1 = getChangeIntNumber(_num1, _maxlen), n2 = getChangeIntNumber(_num2, _maxlen);
        return (n1 + n2) / Math.pow(10, _maxlen);
    }

    //减法
    var sub = function (num1, num2) {
        var _num1 = getTransferNum(num1), _num2 = getTransferNum(num2);
        var _maxlen = Math.max(_num1.len, _num2.len);
        var n1 = getChangeIntNumber(_num1, _maxlen), n2 = getChangeIntNumber(_num2, _maxlen);
        return (n1 - n2) / Math.pow(10, _maxlen);
    }

    //乘法
    var multi = function (num1, num2) {
        var _num1 = getTransferNum(num1), _num2 = getTransferNum(num2);
        var _maxlen = _num1.len + _num2.len;
        var n1 = getChangeIntNumber(_num1, _maxlen), n2 = getChangeIntNumber(_num2, _maxlen);
        return (n1 * n2) / Math.pow(10, _maxlen);
    }

    //除法
    var div = function (num1, num2) {
        var _num1 = getTransferNum(num1), _num2 = getTransferNum(num2);
        var _maxlen = Math.abs(_num1.len - _num2.len);
        var n1 = getChangeIntNumber(_num1, _maxlen), n2 = getChangeIntNumber(_num2, _maxlen);
        var res = n1 / n2;
        if (_num1.len > _num2.len) {
            res /= Math.pow(10, _maxlen);
        } else {
            res *= Math.pow(10, _maxlen);
        }
        return res;
    }

    function getTransferNum(num) {
        var num_arr = num.toString().split('.');
        if (num_arr.length === 1)return {num: num, len: 0};
        var decimal_len = num_arr[1].length;
        var before_num = Math.pow(10, decimal_len) * parseInt(num_arr[0]);
        var _num = before_num + parseInt(num_arr[1]);
        return {num: _num, len: decimal_len};
    }

    function getChangeIntNumber(numObj, len) {
        //若为整数，则乘以最大精度的10次方
        if (numObj.len === 0) {
            return numObj.num * Math.pow(10, len);
        } else {
            //若当前数的精度小于最大精度，则补足精度差值的10次方
            if (numObj.len < len) {
                return numObj.num * Math.pow(10, (len - numObj.len));
            }else{
                return numObj.num;
            }
        }
    }

    return {
        plus: plus,
        sub: sub,
        multi: multi,
        div: div
    }
})
