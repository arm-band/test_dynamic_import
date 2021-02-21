/**
 * gulp task
 *
 * @author    アルム＝バンド
 * @copyright Copyright (c) アルム＝バンド
 */
/* require
*************************************** */
const { series, parallel } = require('gulp');
const browsersync          = require('./gulp/tasks/browsersync');
const ejs                  = require('./gulp/tasks/ejs');
const js                   = require('./gulp/tasks/js');
const sass                 = require('./gulp/tasks/sass');
// dynamic import test
const taskFlag = false;
let testTask;
if (taskFlag) {
    testTask = require('./gulp/tasks/test');
    //test
    exports.test = testTask;
}

//Scss
exports.sass = sass;
//ejs
exports.ejs = ejs;
//js
exports.js = js;

//ビルド
const taskBuild = taskFlag ? parallel(sass, ejs, js, testTask) : parallel(sass, ejs, js);

//ビルドなし
const taskServer = browsersync;
exports.server = taskServer;

//gulpのデフォルトタスクで諸々を動かす
exports.default = series(taskBuild, taskServer);
