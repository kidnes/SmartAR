/**
 * @file 拷贝单页面html文件任务配置
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var config = require('./');

module.exports = {
    watch: config.sourceDirectory + '/**/*.html',
    src: [config.sourceDirectory + '/**/*.html', '!**/{layouts,shared}/**'],
    dest: config.publicDirectory
};
