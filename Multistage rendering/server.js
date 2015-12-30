var http = require('http');
var port = process.env.port || 1337;
var fs = require('fs');
var viewEngine = require('./controlers/ViewControler.js');
var routingEngine = require('./controlers/RoutingController.js');

function servePage(page, res) {
    console.dir(page.statusCode);
    res.writeHead(page.statusCode, { 'Content-Type': page.contentType });
    res.write(page.HTML);
    res.end();
};

http.createServer(function (req, res) {
    var path = routingEngine.getSourceLocation(req.url);
    var page = {};
    var data = routingEngine.getData(req.url);
    
    console.log("Path requested: " + path);
    if (data !== null) {
        console.log("Data provided: ");
        console.log(function () { for (param in data) console.log(param + ": " + data[param]) }())
    } else {
    console.log("No data provided.")};

    if (path != null && req.method.toUpperCase() === "GET") {
        console.log("Got a valid path.");
        fs.access(path, fs.R_OK | fs.W_OK, function (err) {
            if (err) {
                console.log("Unable to open template.");
                page = viewEngine.get404();
            } else {
                console.log("Rendering template.");
                page = viewEngine.getView(path, data);
            };
            servePage(page, res);
        });

    } else {
        if (path === null) {
        console.log("Path was empty. No view returned.");
        page = viewEngine.get404();
        servePage(page, res);
        };

    }; 

}).listen(port);