var hbs = require('hbs');
var fs = require('fs');
var marked = require('marked');
var db = require('../models/DummyDB.js');
var View = {HTML : "", source: "", statusCode: 200, contentType: 'text/html' };

exports.getView = function (path, data) {
    View.statusCode = 200;
    View.HTML = "";
    View.source = fs.readFileSync(path).toString();
    console.log("Source: ", View.source);
    View.HTML += getViewStart();
    if (JSON.stringify(data).length > 2) {
        console.log("Launching substitution.");
        View.HTML += getSubstituted(View.source, data);
    } else {
        console.log("Launching markdown render.");
        View.HTML += getRendered(View.source);
    };
    View.HTML += getViewEnd();
    console.log(View.HTML);
    return View;
};

exports.get404 = function () {
    View.source = fs.readFileSync('./views/404.html');
    View.html += getViewStart();
    View.html += View.source;
    View.html += getViewEnd();
    View.statusCode = 404;
    return View;
};

function getViewStart() {
    return "<!DOCTYPE html><html><head><meta charset=\"utf-8\" /><title>My pages</title></head>";
};

function getRendered(source) {
        return marked(source);
    };
    
function getSubstituted(source, data) {
    if (data.id) {
    console.log("Id of post: ", data.id);
    var content = db.getBlogEntry(data.id);
    console.log("Rendering blog with data:");
        console.log(function () { for (param in content) console.log(param + ": " + content[param]) }());
    } else content = data;
    var template = hbs.compile(source, content);
    return getRendered(template(content));
};

function getViewEnd() {
    return "</body></html>";
};