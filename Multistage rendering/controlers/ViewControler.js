var hbs = require('hbs');
var fs = require('fs');
var marked = require('marked');
var sass = require('node-sass');
var db = require('../models/DummyDB.js');

var stylesFolder = "styles/";
var View = {HTML : "", source: "", statusCode: 200, contentType: 'text/html' };

exports.getView = function (path, data) {
    View.statusCode = 200;
    View.HTML = "";
    View.source = fs.readFileSync(path).toString();
    console.log("Source: ", View.source);
    View.HTML += getViewStart(path);
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

function getViewStart(path) {
    return "<!DOCTYPE html><html><head><meta charset=\"utf-8\" />" + getStyles(path) + "<title>My pages</title></head>";
};

function getRendered(source) {
        return marked(source);
    };
    
function getSubstituted(source, data) {
    var content;
    if (data.id) {
        content = db.getBlogEntry(data.id);
    } else {
        content = data;
    };
    var template = hbs.compile(source, content);
    return getRendered(template(content));
};

function stylesPathGenerator(match)
{
    return stylesFolder + match.substr(0, match.length-3) + ".sass";
};

function getStyles(path) {
    var styleSheet = "";
    styleSheet += "<style>";
    
    stylePath = path.replace(/(\w+\.md)/, stylesPathGenerator);
    console.log("Style to be parsed: " + stylePath);
    var styleRules = sass.renderSync({ file: stylePath });
    console.log('Resulting stylesheet: ' + styleRules.css.toString());
    styleSheet += styleRules.css.toString();
    styleSheet += "</style>";

    return styleSheet;
};

function getViewEnd() {
    return "</body></html>";
};