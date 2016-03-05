/*

TO DO

1) Reduce CSS duplication
   - Ideally just a single build - global.scss turns into /build/global.css
   - Can Autoprefixer output minified?
   - If it can, is it as good as cssmin?
   - Could Sass be used again to minify instead?
   - If it can, is it as good as cssmin?

2) Better JS dependency management
   - Require js?
   - Can it be like the Asset Pipeline where you just do //= require "whatever.js"

3) Is HTML minification worth it?

4) Set up a Jasmine test just to try it.

5) Can this Gruntfile.js be abstracted into smaller parts?
   - https://github.com/cowboy/wesbos/commit/5a2980a7818957cbaeedcd7552af9ce54e05e3fb

*/


module.exports = function(grunt) {

  // Utility to load the different option files
  // based on their names
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });

    return object;
  }

  // Initial config
  var config = {
    pkg: grunt.file.readJSON('package.json')
  }

   grunt.initConfig({
      //concat: {
        //basic_and_extras: {
          //files: {
            //'assets/js/libs.min.js': 'assets/js/libs/{,*/}*.js',
            //'assets/js/modernizr.min.js': 'assets/js/modernizer/modernizr.custom.js',
            //'assets/js/vendor.js': 'assets/js/vendor/{,*/}*.js'
          //}
        //}
      //},

      concat: {
          libs: {
              src: 'assets/js/libs/{,*/}*.js',
              dest: 'assets/js/libs.js'
          },
          vendor: {
              src: 'assets/js/vendor/{,*/}*.js',
              dest: 'assets/js/vendor.js'
          }
      },
      compassMultiple: {
        options : {
          // if you need, you can set options. 
          environment: 'production',
          outputStyle: 'nested', //nested, expanded, compact, compressed
          javascriptsDir: 'assets/js',
          imagesDir: 'assets/img',
          fontsDir: 'assets/fonts',
          //importPath: './css/framework',
          relativeAssets: true,
          time: true
        },
     
        // you can specify compiling target as options.sassDir, and output dir as options.cssDir. 
        // At now, you can only set sassDir and cssDir options. 
        common : {
          options: {
            // every compile needs sassDir and cssDir. 
            sassDir: 'assets/sass',
            cssDir: 'assets/css'
          }
        }
      },
      imagemin: {
        dynamic:{     
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'assets/img',                // Src matches are relative to this path
              src: ['assets/img/{,*/}*.{png,jpg,jpeg}'],   // Actual patterns to match
              dest: 'assets/img'        // Destination path prefix
            }]
          }
      },

      assemble: {
          options: {
              data: 'template/data/*.{json,yml}', 
              flatten: true,
              published: false, 
              assetsimg: 'assets/img',
              assetsjs: 'assets/js',
              assetscss: 'assets/css',
              layout: 'template/layouts/default.hbs',
              partials: ['template/partials/*.hbs']  
          },
          pages: {
              files: {
                  './': ['template/pages/*.hbs', '!templates/pages/index.hbs']
              }
          },
          index: {
              files: {
                  './': ['template/pages/index.hbs']
              }
          }
      },

      //Reformatting HTML 
      prettify: {
          options: {
            indent: 4
            /*indent_char: ' ',
            //wrap_line_length: 78,*/
            //brace_style: 'expand',
            //unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
          },
          all: {
              expand: true,
              cwd: './',
              ext: '.html',
              src: ['*.html'],
              dest: './'
          }
      },

      // Syncronize Files
      sync: {
          fonts: {
              files: [
                  {
                      cwd: 'assets/fonts',
                      src: ['**'],
                      dest: 'assets/fonts'
                  }
              ],
              verbose: true,
              updateAndDelete: true
          },
          images: {
              files: [
                  {
                      cwd: 'assets/img',
                      src: ['**'],
                      dest: 'assets/img'
                  }
              ],
              verbose: true,
              updateAndDelete: true
          }
      },


      connect: {
        server: {
          options: {
            port: 9001,
            hostname: 'localhost'
          }
        }
      },

      watch: {
        options: {
          livereload: true,
        },
          concat: {
            files: ['assets/js/**/*.js'],
            tasks: ['concat:libs','concat:vendor']
          },
          imagemin: {
            files: ['{,*/}*.{png,jpg,jpeg}'],
            tasks: ['imagemin:dynamic']
          },
          assemble: {
            files: ['template/{,*/}*.hbs', 'template/data/{,*/}*.yml', 'template/data/{,*/}*.json'],
            tasks: ['assemble',  'prettify:all']
          },
          fonts: {
            files: ['assets/fonts/**'],
            tasks: ['sync:fonts']
          },
          compassMultiple: {
            files: ['assets/sass/{,*/}*.{scss,sass}'],
            tasks: ['compassMultiple:common']
          },
          image: {
              files: ['assets/img/**'],
              tasks: ['sync:images']
          }
      }

   });



  // Load tasks from the tasks folder
  //grunt.loadTasks('tasks');
  // Load all the tasks options in tasks/options base on the name:
  // watch.js => watch{}
  //grunt.util._.extend(config, loadConfig('./tasks/options/watch{}'));
  
  //grunt.initConfig(config);
  //require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-compass-multiple');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['assemble', 'compassMultiple','imagemin' , 'concat', 'prettify:all', 'sync', 'connect', 'watch']);
  // Moved to the tasks folder:
  //grunt.registerTask('dev', ['connect', 'watch']);

};
