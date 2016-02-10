module.exports = function(ctx) {

//console.log(ctx);

var rootdir=ctx.opts.projectRoot;

var fs = ctx.requireCordovaModule('fs'),
    path = ctx.requireCordovaModule('path');

function rpl(filename, regex, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
    var result = data.replace(new RegExp(regex, "g"),"$1"+replace_with+"$3");
    fs.writeFileSync(filename, result, 'utf8');
}


if (rootdir) {

    var ourconfigfile = path.join(rootdir, "../config.js"); 
    /*
     //Config.gs example 
     module.exports = function(config) {
     config.fb_appID="123456789012345"
     } 
     */        
    var Cfg = require(ourconfigfile);
    var config={  fb_appID: null, };
    Cfg(config);
 
    ctx.opts.platforms.forEach(function(val){ 
    var val = "platforms/"+val+"/"+val+".json";
 
    var filename = path.join(rootdir, val);
        if (fs.existsSync(filename)) {
              rpl(filename,'("APP_ID":\\s")(.*)(".*)',config.fb_appID);
     //       console.log("to file",filename);
        } else {
            console.log("AfterPrepareHook, file not exist: "+filename);
        }
    });
}


}
