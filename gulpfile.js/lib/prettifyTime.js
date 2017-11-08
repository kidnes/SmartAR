/**
 * @file 格式化日期模块
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

module.exports = function (milliseconds) {
    if (milliseconds > 999) {
        return (milliseconds / 1000).toFixed(2) + ' s';
    }

    return milliseconds + ' ms';
};
