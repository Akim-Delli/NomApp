/*!
 * SmartAdmin's Gruntfile for HTML / AJAX / PHP Versions (please use a seperate Gruntfile for the AngularJS verison)
 * Copyright 2013-2014 MYORANGE INC.
 */

module.exports = function(grunt) {
  'use strict';
  
  // DEFINE DIRECTORY FOR SMARTADMIN VERSION HERE
  var globalConfig = {
    src: 'COMMON_ASSETS',
    dest: 'AJAX_version' // PHP_version/PHP_AJAX_Version | PHP_version/PHP_HTML_Version | HTML_version | AJAX_version |
  };
    
  // DEFINE YOUR VERSION NAME 	  
  grunt.initConfig({
  	globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * SmartAdmin v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\') }\n\n',
    
    // COMBINE JS FILES 
    /*
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // Files Array Format
        files: [
        	{ src: [
        		'js/example.js', 
        		'js/example2.js'
        		], 
        	  dest: 
        		'js/combined.min.js'
        	}
        ]
      }
    },*/
    
	// JS TESTING    
    jshint: {
      files: [
        'Gruntfile.js', 
        '<%= globalConfig.src %>/UNMINIFIED_JS/app.js',
        '<%= globalConfig.src %>/UNMINIFIED_JS/smartwidgets'
      ],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    
    // MINIFY JS FILE
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
	  build: {
	  	
        // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
        // runs and build the appropriate src-dest file mappings then, so you
        // don't need to update the Gruntfile when files are added or removed.
        files: [{
            expand: true,
            src: ['**/*.js', '!**/*.min.js', '!**/*.backup.js'],
            dest: '<%= globalConfig.dest %>/js/',
            cwd: '<%= globalConfig.src %>/UNMINIFIED_JS/',
            extDot: 'last',
            ext: '.min.js'
            
        }]
      }
    },
    
    // LESS FILE COMPILATION
	less: {
	  development: {
	    options: {
	      banner: '<%= banner %>'
	    },
	    files: {
          "<%= globalConfig.src %>/UNMINIFIED_CSS/bootstrap.css": "<%= globalConfig.src %>/LESS_FILES/bootstrap.less",
	      "<%= globalConfig.src %>/UNMINIFIED_CSS/smartadmin-production.css": "<%= globalConfig.src %>/LESS_FILES/smartadmin-production.less",
	      "<%= globalConfig.src %>/UNMINIFIED_CSS/font-awesome.css": "<%= globalConfig.src %>/LESS_FILES/library/fontawesome/font-awesome.less",
	      "<%= globalConfig.src %>/UNMINIFIED_CSS/smartadmin-skins.css": "<%= globalConfig.src %>/LESS_FILES/smartadmin-skin/smartadmin-skins.less"
	    }
	  }
	},
	
	// MINIFY CSS
	cssmin: {
	  minify: {
	    expand: true,
	    src: ['*.css', '!*.min.css'],
	    dest: '<%= globalConfig.dest %>/css/',
	    cwd: '<%= globalConfig.src %>/UNMINIFIED_CSS/',
	    extDot: 'last',
	    ext: '.min.css'
	  }
	},
	
    // WATCH FILES FOR CHANGES
    watch: {
      files: ['<%= globalConfig.src %>/LESS_FILES/smartadmin/top-menu.less','<%= globalConfig.src %>/UNMINIFIED_JS/app.js', '<%= globalConfig.src %>/UNMINIFIED_JS/demo.js'],
      tasks: ['less','cssmin']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');  

  grunt.registerTask('dist-test', ['jshint']);
  grunt.registerTask('default', ['uglify', 'less','cssmin']);
  grunt.registerTask('dist-less', ['less','cssmin']);
  grunt.registerTask('dist-js', ['uglify']);
  grunt.registerTask('dist-watch', ['watch']);


};