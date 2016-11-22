/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-form-validate',

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import(app.bowerDirectory + '/light-validate-js/dist/Validator.validate.js');
    app.import(app.bowerDirectory + '/light-validate-js/dist/Validator.validator.js');
  }
};
