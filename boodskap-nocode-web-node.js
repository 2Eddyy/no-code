const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
// const conf = require("./conf");
const root = path.join(__dirname, 'dist', 'boodskap-nocode');

 /*****************************
  * Require Configuration
  ****************************/
 let conf = {};

 try {
     console.log(new Date() + ' | Boodskap Nocode : Cloud Configuration Loaded From Config');
     conf = require(process.env.HOME + '/config/boodskap-nocode-web-config');
 } catch (e) {
     console.log(new Date() + ' | Boodskap Nocode : Local Configuration Loaded');
     conf = require('./conf');
 }

app.get('/config', function(req, res) {
  res.locals.version = { version: conf.version };// Set the data in res.locals
  let configObj = {
    version : conf.version,
    platform_api_path : conf.settings.platform_api_path,
    billing_api : conf.settings.billing_api,
  };
  res.json({ status: true, config: configObj });
});


app.get('*' ,function(req, res) {
  fs.stat(root + req.path, function(err){
    if(err){
        res.sendFile("index.html", { root });
    }else{
        res.sendFile(req.path, { root });
    }
  })
});

app.listen(conf.server.port, function() {
    console.log("===================== Boodskap Nocode ============================");
    console.log("Web Node is running on port " + conf.server.port);
    console.log("===================== Boodskap Nocode ============================");
});
