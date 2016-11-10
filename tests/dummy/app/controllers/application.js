import Ember from 'ember';

export default Ember.Controller.extend({
  validator: Ember.inject.service(),

  validateRequired: Ember.computed('validator.validators', function() {
    return [{
      validator: this.get('validator.validators').Length,
      parameters: [{
        min: 0,
        excludeEdge: true
      }],
      errorMessage: 'required'
    }];
  }),
  validateInteger: Ember.computed('validator.validators', function() {
    return [{
      validator: this.get('validator.validators').Regular,
      parameters: [{
        regular: /^\d*$/
      }],
      errorMessage: 'Must be integer'
    }];
  }),
  validateRange: Ember.computed('validator.validators', function() {
    return [{
      validator: this.get('validator.validators').NumberRange,
      parameters: [{
        min: 5,
        max: 10
      }],
      errorMessage: 'Must in range 5-10'
    }];
  })
});
