"use strict";

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-phantomas');

  var url = require('url');

  var target = grunt.option('target');
  if (!target) throw "must supply target";

  target = url.parse(target);

  // example.com/testing => example.com_testing
  var saveFolder = (target.hostname + target.pathname).replace(/\//g, '_');

  // remove _ as last char
  var len = saveFolder.length - 1;
  if (saveFolder[len] === '_') saveFolder = saveFolder.substring(0, len);

  /*
   run with:
   grunt phantomas --target=http://www.google.com

   each unique url requires a different index path.
   if the index path is the same then the metrics will be combined regardless of url.

   "httpTrafficCompleted: time it took to receive the last byte of the last HTTP response"
   https://github.com/macbre/phantomas
   */

  grunt.initConfig({
    phantomas: {
      gruntSite: {
        options: {
          // MUST end with a slash or folders won't be written to the proper location
          indexPath: saveFolder + "/",
          url: target.href,
          group: {
            'TIMINGS': [
              'httpTrafficCompleted'
            ]
          },
          numberOfRuns: 10
        }
      }
    }
  });
};