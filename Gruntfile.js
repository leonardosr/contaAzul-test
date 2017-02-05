module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        cfg: grunt.file.readJSON('config.json'),
        banner: grunt.file.read('LICENSE'),

        vendors_path: 'bower_components/',
        app_path: 'app',

        /***************************************
         * CLEAN
         */
        clean: {
            dist: ['dist'],
            theme: [
                '<%= app_path %>/assets/css',
                '<%= app_path %>/assets/js',
                '<%= app_path %>/assets/fonts',
                '<%= app_path %>/assets/images',
                '<%= app_path %>/assets/languages'
            ]
        },

        /***************************************
         * COPY
         */
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= vendors_path %>bootstrap/fonts/',
                        src: '*',
                        dest: '<%= app_path %>/assets/fonts/'
                    },
                    {
                        expand: true,
                        cwd: '<%= vendors_path %>font-awesome/fonts/',
                        src: '*',
                        dest: '<%= app_path %>/assets/fonts/'
                    },
                    {
                        expand: true,
                        cwd: '<%= cfg.assets_path %>/fonts/',
                        src: '*',
                        dest: '<%= app_path %>/assets/fonts/'
                    }
                ]
            },
            image: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= cfg.assets_path %>images/',
                        src: ['**/*.{png,jpg,gif,ico}'],
                        dest: '<%= app_path %>/assets/images/'
                    }
                ]
            }

        },

        /***************************************
         * LESS
         */
        less: {
            production: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    '<%= app_path %>/assets/css/app.css': 'assets/less/app.less',
                    '<%= app_path %>/assets/css/vendors.css': 'assets/less/vendors.less'
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= app_path %>/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= app_path %>/assets/css',
                    ext: '.min.css'
                }]
            }
        },

        /***************************************
         * JAVASCRIPT
         */
        uglify: {
            options: {
                mangle: false,
                banner: '<%= banner %>'
            },
            app: {
                options : {
                    compress: false,
                    beautify: true
                },
                files: {
                    '<%= app_path %>/assets/js/app.js': '<%= cfg.jsfiles %>'
                }
            },
            'app-min': {
                files: {
                    '<%= app_path %>/assets/js/app.min.js': '<%= cfg.jsfiles %>'
                }
            }
        },

        /***************************************
         * WATCH + LIVERELOAD
         */
        watch: {
            js: {
                options: {
                  livereload: true
                },
                files: '<%= cfg.jsfiles %>',
                tasks: ['compile']
            },
            css: {
                options: {
                  livereload: true
                },
                files: 'assets/less/**/*.less',
                tasks: ['less']
            }
        },

        /***************************************
         * NOTIFY
         */
        notify: {
            dist: {
                options: {
                    title: '<%= cfg.name %>',
                    message: 'Distribution completed!'
                }
            },
            build: {
                options: {
                    title: '<%= cfg.name %>',
                    message: 'Build completed!'
                }
            },
            updated: {
                options: {
                    title: '<%= cfg.name %>',
                    message: 'Assets updated! Reloading page...'
                }
            }
        }

    });

    grunt.event.on('watch', function (action, filepath, target) {

        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);

    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var _ = require('underscore');

    grunt.registerTask('compile', 'Compiling...', function () {

        var cfg = grunt.config.get('cfg'),
            tasks = ['less', 'uglify:app-min', 'cssmin'];

        if (cfg.debug === true) {

            tasks = ['less', 'uglify:app'];

        }

        grunt.task.run(tasks);

    });

    grunt.registerTask('assets', ['copy:fonts','copy:image']);

    grunt.registerTask(
        'build',
        'Compiles all scripts and copy assets to the app.',
        ['clean', 'compile', 'assets', 'notify:build']
    );

    // Default deloyment
    grunt.registerTask('default', ['build']);

};