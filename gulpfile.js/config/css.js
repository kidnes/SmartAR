/**
 * @file css输出任务配置文件
 *
 * @author liubin29(liubin29@baidu.com)
 * 2015年10月27日
 */

var config = require('./');
// var easyui = require('easyui/themes/default/easyui.css');

// console.log(easyui);
module.exports = {
    src: config.root + '/asset/*.styl',
    dest: config.publicDirectory + '/css/'
};
