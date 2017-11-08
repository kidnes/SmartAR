/**
 * @file 错误处理模块
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var notify = require('gulp-notify');

module.exports = function (errorObject, callback) {
    notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
    // Keep gulp from hanging on this task
    if (typeof this.emit === 'function') {
        this.emit('end');
    }
};
