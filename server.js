var express = require('express'),
    http    = require('http')

var port = 2369;
    var app = express();
    var server = http.createServer(app);

    app.use(express.static(__dirname + '/dist'));

    server.on('listening', function () {
        console.log('Listening on http://locahost:' + server.address().port);
    });

    server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            console.log('Address in use, retrying...');
            setTimeout(function () {
                server.listen(port);
            }, 1000);
        }
    });

    server.listen(port);