/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    snippetSearchPaths: ['addon', 'tests/dummy/app']
    // Add options here
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import(app.bowerDirectory + '/light-validate-js/dist/Validator.validate.js');
  app.import(app.bowerDirectory + '/light-validate-js/dist/Validator.validator.js');

  return app.toTree();
};
