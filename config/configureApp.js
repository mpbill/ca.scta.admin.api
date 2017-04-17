/**
 * Created by mpbil on 4/8/2017.
 */
let cors = require('cors');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let path = require('path');
let express = require('express');
let corsConfig = {
    origin:"http://localhost:3001",
    credentials:true
};
let parseTokenOffRequest=require('../auth/login').parseTokenOffRequest;
let configureApp=function (app,rootDirName) {
    app.use(cors(corsConfig));
    app.options('*',cors(corsConfig));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(require('node-sass-middleware')({
        src: path.join(rootDirName, 'public'),
        dest: path.join(rootDirName, 'public'),
        debug:true,
        sourceMap: true,
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(parseTokenOffRequest);
};

module.exports=configureApp;
