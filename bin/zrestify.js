#!/usr/bin/env node

"use strict";

var fs = require('fs');
var process = require('process');
var glob = require('glob');
var async = require('async');
var proj = require('../src/proj')
//var basecmd = require('../src/basecmd');
//var oss = require('../src/oss');
//var cdn = require('../src/cdn');
var argv = require('yargs')
    //.option('id', {
    //    alias : 'id',
    //    demand: false,
    //    describe: 'accessKeyId',
    //    type: 'string'
    //})
    //.option('key', {
    //    alias : 'key',
    //    demand: false,
    //    describe: 'secretAccessKey',
    //    type: 'string'
    //})
    //.option('bucket', {
    //    alias : 'bucket',
    //    demand: false,
    //    describe: 'bucket',
    //    type: 'string'
    //})
    //.option('osspath', {
    //    alias : 'osspath',
    //    demand: false,
    //    describe: 'oss path',
    //    type: 'string'
    //})
    //.option('endpoint', {
    //    alias : 'endpoint',
    //    demand: false,
    //    describe: 'endpoint',
    //    type: 'string'
    //})
    //.option('islocal', {
    //    alias : 'islocal',
    //    demand: false,
    //    describe: 'islocal',
    //    type: 'boolean'
    //})
    //.option('cdn', {
    //    alias : 'cdn',
    //    demand: false,
    //    describe: 'cdn url',
    //    type: 'string'
    //})
    .usage('Usage: zrestify proj-name')
    .example('zrestify proj-name', 'zrestify proj-name')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

let basearr = argv._;
if (basearr == undefined || basearr.length < 1) {
    console.log('Usage: zrestify proj-name');

    process.exit(1);
}

let params = {projname: basearr[0]};
proj.procProj(params);

//if (!basecmd.checkParams(argv, 'id', 'key', 'bucket', 'endpoint')) {
//    process.exit(1);
//}

//let islocal = false;
//if (argv.hasOwnProperty('islocal')) {
//    islocal = argv.islocal;
//}
//
//let osspath = '';
//if (argv.hasOwnProperty('osspath')) {
//    osspath = basecmd.procOSSPath(argv.osspath);
//}
//
//let cdnurl = '';
//if (argv.hasOwnProperty('cdn')) {
//    cdnurl = basecmd.procOSSPath(argv.cdn);
//}
//
//let id = argv.id;
//let key = argv.key;
//let bucket = argv.bucket;
//let endpoint = argv.endpoint;
//
//let ossobj = oss.newOSS(id, key, endpoint, islocal);
//let cdnobj = cdn.newCDN(id, key);
//
//let arr = [];
//for (let j = 0; j < basearr.length; ++j) {
//    let lstfile = glob.sync(basearr[j]);
//    for (var i = 0; i < lstfile.length; ++i) {
//        let srcfile = lstfile[i];
//        if (fs.existsSync(srcfile)) {
//            arr.push(srcfile);
//        }
//    }
//}

//async.eachSeries(arr, function (curfile, callback) {
//    oss.updFile(ossobj, bucket, curfile, osspath, function (err, data) {
//        if (err) {
//            console.log('updFile ' + curfile + ' err ' + JSON.stringify(err));
//        }
//        else {
//            console.log('updFile ' + curfile);
//        }
//
//        if (cdnurl.length > 0) {
//            let fullcdn = cdnurl + '/' + osspath + '/' + curfile;
//            cdn.refreshFile(cdnobj, cdnurl, osspath + '/' + curfile, function (err, res) {
//                if (err) {
//                    console.log('refurbish CDN ' + fullcdn + ' err ' + JSON.stringify(err));
//                }
//                else {
//                    console.log('refurbish CDN ' + fullcdn);
//                }
//
//                callback();
//            });
//        }
//        else {
//            callback();
//        }
//    });
//}, function (err) {
//
//});
