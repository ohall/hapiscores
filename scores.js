/**
 * Created by Oakley Hall on 10/9/14.
 */
var WAPOSCORESURL = 'http://apps.washingtonpost.com/sports/api/nfl/v2/games/?format=json&game_code=';
var SECOND = 1000;
var gameCodes = ['20141005017','20141005025','20141005024','20141005007','20141005011','20141005030','20141005019','20141005021','20141005029','20141005018','20141005008','20141005010','20141005006'];


var Hapi = require('hapi');
var Wreck = require('wreck');
var _ = require('underscore');

var server = Hapi.createServer( 'localhost', Number(process.argv[2] || 8080), { cors: true } );


/**
 * SERVER METHODS
 */
var getScores = function (gameCode, cb) {
    Wreck.get( WAPOSCORESURL + encodeURIComponent( gameCode ), function (err, res, payload) {
        console.log( 'Requested: ' + gameCode );
        var teams = JSON.parse(payload).objects[0];
        cb(teams);
    });
};

server.method('getScores', getScores, {
    cache: {
        expiresIn: 600 * SECOND
    }
});

/**
 * This API is slow, so start caching these requests immediately
 */
setInterval(function () {
    _.each(gameCodes, function (code) {
        server.methods.getScores(code, function () {
            console.log( 'Requested: ' + code );
        })
    })
},500);

/**
 * ROUTES
 */
server.route({
    method: 'GET',
    path: '/{gameCode}',
    handler: function (request, reply) {
        server.methods.getScores(request.params.gameCode, reply);
    }
});

server.start();