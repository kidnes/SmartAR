/**
 * @file 项目迁移，拷贝旧文件任务配置
 *
 * @author liubin29(liubin29@baidu.com)
 * 2015年11月26日
 */

var config = require('./');

module.exports = {
    src: config.root + '/old/**/*',
    dest: config.publicDirectory
};
