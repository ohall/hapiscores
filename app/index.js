/**
 * Created by Oakley Hall on 10/10/14.
 */
(function () {
    'use strict';

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Templates:{},
        ServerURL:'http://localhost:8080/'
    };

    /**
     * Models
     */
    App.Models.gameModel = {};



    /**
     * Templates
     */
    App.Templates.teamTemplate = '<div style="text-align: center">' +
        '<div style="width: 50%;float: left;background-color: #{{home_team.primary_color}};text-align: center;color: #{{home_team.secondary_color}}">' +
            '<h1>{{home_team.city}} {{home_team.name}}</h1>' +
            '<h3>{{home_team.conference}} {{home_team.division}}</h3>' +
            '<img src="{{home_team.logo_120x120}}">' +
            '<h3>Score: {{home_total_score}}</h3>' +
            '<h3>Record: {{home_team.record}}</h3>' +
        '</div>' +
        '<div style="width: 50%;float: right;background-color: #{{away_team.primary_color}};text-align: center;color: #{{away_team.secondary_color}}">' +
            '<h1>{{away_team.city}} {{away_team.name}}</h1>' +
            '<h3>{{away_team.conference}} {{away_team.division}}</h3>' +
            '<img src="{{away_team.logo_120x120}}">' +
            '<h3>Score: {{away_total_score}}</h3>' +
            '<h3>Record: {{away_team.record}}</h3>' +
        '</div>' +
        '<h2>Location: {{game_location}}</h2>' +
        '</div>';

    /**
     * Handlebars Helpers
     */
    Handlebars.registerHelper('list', function(items) {
        var out = '<option>Choose Game</option>';
        for(var i=0, l=items.length; i<l; i++) {
            out = out + '<option value="' + items[i] + '>' + items[i] + '</option>';
        }
        return out;
    });


    /**
     * Views
     */
    App.Views.chooseView = new Thorax.View({
        model:new Thorax.Model(),
        gameCodes: ['20141005017','20141005025','20141005024','20141005007','20141005011','20141005030','20141005019','20141005021','20141005029','20141005018','20141005008','20141005010','20141005006'],
        template: Handlebars.compile('<select> {{#list gameCodes}}{{/list}} </select>'),
        events:{
            'change' : 'chooseTeam'
        },
        chooseTeam: function (evt) {
            var gameID = evt.target[evt.target.selectedIndex].text;
            this.model.url =  App.ServerURL + gameID;
            var self = this;
            this.model.fetch({
                reset: true,
                success: function (collection, response, options) {
                    self.viewModel(response);
                }
            });

        },
        viewModel:function(response){
            App.Views.teamsView.appendTo('body');
            App.Views.teamsView.model = new Thorax.Model(response);
            App.Views.teamsView.render();
        }
    });



    App.Views.teamsView = new Thorax.View({
        template: Handlebars.compile( App.Templates.teamTemplate )
    });

    App.Views.chooseView.appendTo('body');

})();
