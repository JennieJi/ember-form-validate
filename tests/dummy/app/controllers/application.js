/* global Validator */
import Ember from 'ember';

export default Ember.Controller.extend({
  validator: Ember.inject.service(),

  validateRequired: Ember.computed('validator.validators', function() {
    return {
      validator: this.get('validator.validators').Length,
      parameters: [{
        min: 0,
        excludeEdge: true
      }],
      errorMessage: 'required'
    };
  }),
  validateInteger: Ember.computed('validator.validators', function() {
    return {
      validator(value) {
        return Validator.validator.Regular(value, {
          regular: /^\d*$/
        }) || Ember.String.htmlSafe('Must be integer');
      }
    };
  }),
  validateRange() {
    return {
      validator: this.get('validator.validators').NumberRange,
      parameters: [{
        min: 5,
        max: 10
      }],
      errorMessage: 'Must in range 5-10'
    };
  },

  fieldDisplay: true,

  actions: {
    destoryField(callback, e) {
      this.set('fieldDisplay', false);
      if (typeof callback === 'function') {
        callback.call(this);
      }
    }
  }
});
