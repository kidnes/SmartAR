/**
 * @file 全局工具方法
 *
 * @author liubin29(liubin29@baidu.com)
 * 2016年4月17日
 */


/**
 * 格式化时间
 *
 * @param {Object} date 日期对象
 * @param {string} fmt 格式
 * @return {string} value
 */
exports.formatDate = function (date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};


/**
 * 解析URL参数
 *
 * @param {string} url 地址
 * @return {Object} URL参数对象
 */
exports.parseParam = function (url) {
    url = url.split('?')[1];
    if (!url) {
        return {};
    }
    var params = url.split('#')[0].split('&');
    var query = {};
    for (var i = 0; i < params.length; i++) {
        var item = params[i].split('=');
        if (item.length === 2) {
            query[item[0]] = decodeURIComponent(item[1]);
        }
    }
    return query;
};
