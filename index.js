/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-form-validate',
  // isDevelopingAddon: function() {
  //   return true;
  // },
  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/light-validate-js/dist/Validator.validate.js');
    app.import(app.bowerDirectory + '/light-validate-js/dist/Validator.validator.js');
  }
};
