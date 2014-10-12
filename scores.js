/**
 * Created by Oakley Hall on 10/9/14.
 */


var Hapi = require('hapi');
var Wreck = require('wreck');

var options = { cors: true };

var server = Hapi.createServer( 'localhost', Number(process.argv[2] || 8080), options );

server.route({
    method: 'GET',
    path: '/{gameCode}',
    handler: function (request, reply) {
        Wreck.get('http://apps.washingtonpost.com/sports/api/nfl/v2/games/?format=json&game_code='+encodeURIComponent(request.params.gameCode), function (err, res, payload) {
            var teams = JSON.parse(payload).objects[0];
            reply(teams);
        });
    }
});

server.start();