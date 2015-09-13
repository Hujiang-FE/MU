/**
 * 自动化脚本定�
 * roeis
 */
var matchdep = require('matchdep');

module.exports = function (grunt) {

    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var pkg = grunt.file.readJSON('package.json');
    var cfg = {
        src: '',
        des: 'src/',
        ip: '192.168.0.107',
        liveport: 30010,
        port:3024
    };
    grunt.initConfig({
        pkg: pkg,
        cfg: cfg,
        compass:{
            dist: {
                options:{
                    // config: 'config.rb',
                    sassDir: '<%= cfg.des %>styles/sass',
                    cssDir: '<%= cfg.des %>styles',
                    imagesDir: '<%= cfg.des %>images',
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    boring: false,
                    quiet: false,
                    debugInfo: false,
                    noLineComments: true,
                    trace: true,
                    // Ignores filenames starting with underscore. banner use with specify
                    // specify: [
                    //     // '<%= cfg.des %>sass/style.scss',
                    //     // '<%= cfg.des %>sass/sprite.scss',
                    //     // 'src/app/sass/mix.scss',
                    //     ]
                }
            },
            server: {
                options: {
                  debugInfo: false
                }
            }
        },
        watch:{
            configFiles: {
                files: [ 'Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            options: {
                livereload: cfg.liveport,
                dateFormat: function(time) {
                    // (new Date()).toString()
                    grunt.log.subhead('This Watch finished in ' + Date.now() + ' end');
                    grunt.log.ok('Waiting for change...');
                }
            },
            compass: {
                files: ['<%= cfg.des %>styles/sass/*.{scss,sass}'],
                tasks: ['compass:dist']
            },
            livereload:{
                files:[cfg.des + '**',  'samples/**', 'manualtest/**']
            }
        },
        connect:{
            options:{
                port: cfg.port,
                hostname: cfg.ip,
                livereload: cfg.liveport,
                middleware: function(connect, options){
                        return [
                            require('connect-livereload')(),
                            connect.static(options.base[0]),
                            connect.directory(options.base[0])
                        ];
                    }
            },
            server:{
                options:{
                    base: cfg.src,
                    // keepalive:true,//this option will stop all other task
                    open:{
                        target:'http://'+ cfg.ip +':'+cfg.port,
                        appName:'chrome'
                    }
                }
            }
        }
    });

//register task
    grunt.registerTask('server',['connect','watch']);

    // grunt.registerTask('server',['connect','watch']);

    // grunt.registerTask('min', ['clean','uglify', 'cssmin']);

};