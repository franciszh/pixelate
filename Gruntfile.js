module.exports = function(grunt) {


  // Configure Grunt 
grunt.initConfig({
    serve: {
        options: {
            port: 9000
        }
    }
});

grunt.loadNpmTasks('grunt-serve');
  // Creates the `server` task
grunt.registerTask('default', ['serve']);	
};