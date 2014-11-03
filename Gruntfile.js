module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			build: {
				cwd: 'src',
				src: ['!**'],
				dest: 'dist',
				expand: true
			}
		},

		clean: {
			build: {
				src: ['dist']
			}
		},

		sass: {
			build: {
				options: {
					style: 'expanded',
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: 'src/stylesheets',
					src: ['**/*.scss'],
					dest: 'dist',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			build: {
				expand: true,
				cwd: 'dist',
				src: ['**/*.css'],
				dest: 'dist'
			}
		},

		coffee: {
			build: {
				expand: true,
				cwd: 'src/javascripts',
				src: ['**/*.coffee'],
				dest: 'dist',
				ext: '.js'
			}
		},

		uglify: {
			build: {
				files: {
					'dist/ocModal.min.js': ['dist/ocModal.js']
				}
			}
		},

		watch: {
			javascripts: {
				files: ['src/javascripts/*.coffee'],
				tasks: ['javascripts'],
				options: {
					spawn: false
				}
			},
			stylesheets: {
				files: ['src/stylesheets/*.scss'],
				tasks: ['stylesheets'],
				options: {
					spawn: false
				}
			}
		}

	});

	// Register your plugins here
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register your tasks here
	grunt.registerTask('stylesheets', ['sass', 'autoprefixer']);
	grunt.registerTask('javascripts', ['coffee', 'uglify']);
	grunt.registerTask('build', ['clean', 'copy', 'stylesheets', 'javascripts']);
	grunt.registerTask('default', ['build', 'watch']);
};