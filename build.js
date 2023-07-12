const async = require('async');
const PropertiesReader = require('properties-reader');
const fs = require('fs');

var args = process.argv.slice(2);
var prop=null;

if(args[0]){
    try {
        prop = PropertiesReader(args[0]);
        console.log('* Fetching from config file => '+args[0] )
    }
    catch(e){
        prop = PropertiesReader('boodskapui.properties');
        console.log('* Fetching from default config file => boodskapui.properties')
    }
}else{

    try {
        prop = PropertiesReader(process.env.HOME + '/config/nocode.properties');
        console.log('* Fetching from config file => '+process.env.HOME + '/config/config/nocode.properties')
    }
    catch(e){
        prop = PropertiesReader('nocode.properties');
        console.log('* Fetching from default config file => nocode.properties')
    }
}


//Get the property value
getProperty = (pty) => {
    return prop.get(pty);
}


console.log("***************************************" +
    "\nBoodskap Nocode Application\n" +
    "***************************************")
async.series({
    'serverConfig': function (scbk) {

        /****************************
         1] Configuring Server Properties
         ****************************/
        let server_config = {
            version : getProperty('server.version'),
            server: {
                port: Number(getProperty('server.port')),
                host: getProperty('server.host'),
                basepath: getProperty('server.basepath'),
            },
            settings: {
                platform_api_path: getProperty('settings.platform_api_path'),
                billing_api: getProperty('settings.billing_api'),
            }
        };

        let txt = 'module.exports = ' + JSON.stringify(server_config);
        fs.writeFile('conf.js', txt, (err) => {
            if (err) {
                console.error('Error in configuring server properties')
                scbk(null, null);
            } else {
                console.error('1] Setting server properties success')
                scbk(null, null);
            }
        });
    }
}, function (err, result) {
    console.log(new Date() + ' | Boodskap UI Build Success');
    console.log('Now execute > npm start');
})



