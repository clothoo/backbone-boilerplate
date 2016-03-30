module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist'],

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },

            files: ['Gruntfile.js', 'test/*.js', 'app/js/*.js']
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                reporters: 'progress',
                runnerPort: 9998
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/js/*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'app/css/style.css': 'app/css/style.scss'
                }
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            target: {
                files: {
                    'dist/css/style.min.css': ['app/css/style.css']
                }
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }

    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'sass', 'cssmin']);

    grunt.registerTask('copy-libs', function() {
        grunt.file.mkdir('app/js/lib');
        grunt.file.copy('node_modules/requirejs/require.js', 'app/js/lib/require.js');
        grunt.file.copy('node_modules/backbone/backbone-min.js', 'app/js/lib/backbone.js');
        grunt.file.copy('node_modules/jquery/dist/jquery.min.js', 'app/js/lib/jquery.js');
        grunt.file.copy('node_modules/lodash/lodash.min.js', 'app/js/lib/lodash.js');
        grunt.file.copy('node_modules/requirejs-text/text.js', 'app/js/lib/text.js');
    });
};
