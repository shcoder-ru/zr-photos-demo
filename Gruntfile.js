module.exports = function(grunt){
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'public',
          open: true,
        }
      }
    },
    copy: {
      goog: {
        expand: true,
        cwd: 'node_modules/closure-library/closure/goog',
        src: '**',
        dest: 'public/js/goog/'
      },
      soyutils: {
        src: 'tools/soyutils_usegoog.js',
        dest: 'public/js/soyutils_usegoog.js'
      },
      thirdParty: {
        expand: true,
        cwd: 'node_modules/closure-library/third_party/closure/goog',
        src: '**',
        dest: 'public/third_party/closure/goog/'
      }
    },
    exec: {
      tpl: 'java -jar tools/SoyToJsSrcCompiler.jar '+
      '--outputPathFormat public/js/gallery.js '+
      '--srcs tpl/gallery.soy'
    },
    less: {
      app: {
        options: {
          paths: ['css'],
          compress: false,
          modifyVars: {
            version: '<%= pkg.version %>'
          }
        },
        files: {
          'public/css/app.css': 'less/app.less'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['public/index.html']
      },
      js: {
        files: ['public/js/app.js']
      },
      less: {
        files: ['less/{,*/}*.less'],
        tasks: ['less:app']
      },
      tpl: {
        files: ['tpl/{,*/}*.soy'],
        tasks: ['exec:tpl']
      }
    }
  });

  grunt.registerTask('default', [
    'copy',
    'less:app',
    'exec:tpl',
    'connect',
    'watch'
  ]);

};