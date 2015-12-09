"use strict";

var path = require('path');
var zhandlebars = require('zhandlebars');

function procParams(params) {
    params.projname_lc = params.projname.toLowerCase();
    params.port = 3700;

    return params;
}

function procProj(params) {
    params = procParams(params);

    zhandlebars.procProj(params, path.join(__dirname, '../template', 'main.json'), path.join(__dirname, '../template'));
}

exports.procProj = procProj;