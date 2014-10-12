/**
 * Created by Oakley Hall on 10/12/14.
 */
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-open');

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            scores: ['execute', 'serve', 'open']
        },
        execute: {
            target: {
                src: ['scores.js']
            }
        },
        serve: {
            path: '/Users/oakley/Documents/projects/hapiscores/app/',
            options: {
                port: 9000
            }
        },
        open : {
            dev: {
                path: 'http://localhost:9000/app/index.html'
            }
        }

    });

    // Default task(s).
    grunt.registerTask('default', ['concurrent:scores']);
};