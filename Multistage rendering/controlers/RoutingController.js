var url = require('url');
var fs = require('fs');
var viewBase = './views/';
var viewsDir = fs.readdirSync(viewBase);

console.dir(viewsDir);

var viewPaths = function (viewsDir) {
    var list = [];
    for (var path in viewsDir) {
        list.push(viewsDir[path].split('.')[0]);
    };
    return list;
}(viewsDir);

exports.getSourceLocation = function (request) {
    var parsedURL = url.parse(request, true);
    var expectedPath = parsedURL.pathname.substring(1);
    
    console.log("View Paths: " + viewPaths);
    
    console.log("URL parsed from getSourceLocation: " + parsedURL.pathname);
    
    console.log("Path expected by request: " + expectedPath);

    if (parsedURL.pathname == '/') {return viewBase + 'index.md'};
    
    if (viewPaths.indexOf(expectedPath) > -1) {
        return viewBase + expectedPath + '.md';
    } else return null;
};

exports.getData = function (request) {
    var parsedURL = url.parse(request, true);

    if (parsedURL.query != {}) { return parsedURL.query } else { return null };
};