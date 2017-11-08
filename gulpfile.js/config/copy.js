/**
 * @file 拷贝文件任务配置
 *
 * @author liubin29(liubin29@baidu.com)
 * 2015年10月27日
 */

var config = require('./');

module.exports = {
    root: config.sourceDirectory,
    easyuiSrc: config.devModulesPath + '/easyui/**/*',
    easyuiDest: config.publicDirectory + '/easyui/',
    assetSrc: [config.root + '/assets/**/*', '!**/*.styl'],
    assetDest: config.publicDirectory + '/assets/',
    ueditorSrc: config.devModulesPath + '/ueditor-utf8-jsp/**/*',
    ueditorDest: config.publicDirectory + '/ueditor-utf8-jsp/',
    ueditorConfigSrc: config.sourceDirectory + '/common/ueditor/ueditor.config.json',
    ueditorConfigDest: config.publicDirectory + '/ueditor-utf8-jsp/jsp/',
    swfSrc: config.sourceDirectory + '/common/bce/cyberplayer.flash.swf',
    swfDest: config.publicDirectory + '/',
};
