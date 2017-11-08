/**
 * @file 字符串重复模块
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

module.exports = function (pattern, number) {
    var string = '';
    while (number > 0) {
        number--;
        string += pattern;
    }
    return string;
};
