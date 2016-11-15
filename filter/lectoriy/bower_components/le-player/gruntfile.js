var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function (grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		clean : {
			options : {
				force : true
			},
			production : [
				'dist/**/*'
			]
		},
		webpack : {
			options : webpackConfig,
			build : {},
			"build-dev" : {
				devtool : 'eval',
				plugins : [
					new webpack.NoErrorsPlugin()
				],
				watch : true
			}
		},
		less : {
			development : {
				options : {
					"paths" : [
						"bower_components"
					],
					sourceMapFileInline : true

				},
				expand : true,
				cwd : 'source/less/',
				src : '**/le-player.less',
				ext : '.css',
				dest : 'dist/css/',
				profile : true,
				displayModules: true,
				plugins : [
					new webpack.optimize.DedupePlugin()
				]
			},
			production : {
				options : {
					"paths" : [
						"bower_components"
					],
					compress : true,
					yuicompress : true,
					strictUnits : true,
					optimization : 2,
					sourceMap : true
				},
				expand : true,
				cwd : 'source/less/',
				src : '**/le-player.less',
				ext : '.min.css',
				dest : 'dist/css/'
			}
		},
		postcss : {
			options : {
				processors : [
					require('autoprefixer')({ browsers : 'last 2 versions' })
				]
			},
			dist : {
				src : 'dist/css/**/le-player.css'
			}
		},
		concat : {
			js : {
				src : [
					'source/js/<%= pkg.name %>.es6.js'
				],
				dest : 'dist/js/<%= pkg.name %>.es6.js'
			}
		},
		watch : {
			less : {
				files : [ 'source/less/**/*' ],
				tasks : [ 'less:development', 'postcss' ]
			},
			// sass : {
			// 	files : [ 'source/sass/**/*' ],
			// 	tasks : [ 'sass:development' ]
			// },
			//js : {
				//files : [ 'source/js/**/*.js' ],
				//tasks : ['webpack:build-dev']
			//},

			svgstore : {
				files : [ 'source/svg/*.svg' ],
				tasks : [ 'svgstore' ]
			}

		},
		uglify : {
			js : {
				src : 'dist/js/<%= pkg.name %>.js',
				dest : 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		svgstore : {
			options : {
				prefix : 'leplayer-icon-',
				svg : {
					xmlns : 'http://www.w3.org/2000/svg',
				},
				symbol : {
					fill : 'currentColor',
					viewBox : '0 0 16 16'
				}
			},
			default : {
				files: {
					'dist/svg/svg-defs.svg': ['source/svg/*.svg'],
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-svgstore');

	grunt.registerTask('default', [ 'less:development', 'webpack:build-dev', 'concat', 'svgstore', 'watch' ]);
	grunt.registerTask('production', [ 'clean', 'less', 'postcss', 'concat', 'svgstore', 'webpack:build', 'uglify' ]);
};
