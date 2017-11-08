/**
 * @file 全局通用任务配置
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var path = require('path');

var config = {};

var base = path.join(__dirname, '../../');

config.basePath = '';
config.distPath = 'dist';

config.publicDirectory = base + config.distPath + '/' + config.basePath;
config.sourceDirectory = base + 'src';
config.root = base + 'src';
config.base = base;
config.devModulesPath = base + 'node_modules';

module.exports = config;
