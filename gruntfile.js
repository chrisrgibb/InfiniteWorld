module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
         jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                eqnull: true
            }
         },
         requirejs: {
             compile: {
                 options: {
                    baseUrl: "./src",
                    mainConfigFile: 'build.js',
                    out: 'main-built.js',
                    name: 'app',
                    paths: {
                        hbs : '../node_modules/require-handlebars-plugin/hbs'
                    }
                    
                    // out: "main-built.js"
                 }
             }
         }
        
    });

    grunt.registerTask('default', ['jshint']);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};