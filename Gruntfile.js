// Basic Grunt configuration
module.exports = function(grunt) {
    'use strict';
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            source: 'assets',
            dist: 'www/assets'
        },
        clean: {
            build: ['.tmp', '<%=config.dist%>'],
        },
        compass: {                  // Task
            dist: {                   // Target
                options: {              // Target options
                    sassDir: '<%=config.source%>/sass',
                    cssDir: '<%=config.dist%>/css',
                }
            }
        },
        uglify: {
            options: {
                banner: ''
            },
            target_1: {
                files: {
                    '<%=config.dist%>/js/main.min.js': ['<%=config.source%>/js/*.js', '.tmp/js/app.js']
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%=config.dist%>/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%=config.dist%>/css/',
                ext: '.min.css'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%=config.source%>/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%=config.dist%>/images/'
                }]
            }
        },
        coffee: {
            compileJoined: {
                options: {
                    join: true
                },
                files: {
                    '.tmp/js/app.js': ['<%=config.source%>/coffee/*.coffee'] // concat then compile into single file
                }
            },
        },
        bower: {
            install: {
                options: {
                    targetDir: '<%=config.dist%>',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {
                        production: true
                    }
                }
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        },
        watch: {
            compass: {
                files: ['<%=config.source%>/sass/**/*.scss'],
                tasks: ['compass', 'cssmin'],
            },
            uglify: {
                files: ['<%=config.source%>/js/*.js'],
                tasks: ['uglify']
            },
            coffee: {
                files: ['<%=config.source%>/coffee/*.coffee'],
                tasks: ['coffee', 'uglify']
            },
            imagemin:{
                files: ['<%=config.source%>/images/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            // livereload: {
            //     options: {
            //         livereload: true
            //     },
            //     files: [
            //         'app/views/*.php', 'css/*.css'
            //     ]
            // },
         
        }
 
    });
 
    // 3. Where we tell Grunt we plan to use this plug-in.
    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bower-task');
 
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);
    // grunt.registerTask('build', ['sass', 'uglify', 'imagemin']);
    grunt.registerTask('build', ['clean', 'compass', 'cssmin', 'coffee', 'bower', 'uglify', 'imagemin']);
 
};