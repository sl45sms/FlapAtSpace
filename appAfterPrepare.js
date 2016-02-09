module.exports = function(ctx) {

console.log(ctx);

var rootdir=ctx.opts.projectRoot;


function rpl(filename, regex, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
    var result = data.replace(new RegExp(regex, "g"),"$1"+replace_with+"$3");
    fs.writeFileSync(filename, result, 'utf8');
}


if (rootdir) {
	console.log("rootdir=",rootdir);

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
 
    console.log("set id",config.fb_appID);
 
    var files = [
        // android
        "platforms/android/android.json",
        //browser
        "platforms/browser/browser.json",
        //plugin
        "plugins/fetch.json",
    ];
    files.forEach(function(val, index, array) {
        var filename = path.join(rootdir, val);
        if (fs.existsSync(filename)) {
              rpl(filename,'("APP_ID":\\s")(.*)(".*)',config.fb_appID);
            console.log("to file",filename);
        } else {
            console.log("not exist: "+filename);
        }
    });
}


}
