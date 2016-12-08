import Ember from 'ember';

export default Ember.Helper.extend({
  validatorService: Ember.inject.service('validator'),
  compute([validator, ...params], hash = {}) {
    const validatorService = this.get('validatorService');
    let validatorFunc = validator;
    if (typeof validator === 'string') {
      validatorFunc = validatorService.get('validators')[validator];
    }
    if (typeof validatorFunc === 'function') {
      let parameters = hash.params || params
      return validatorService.createValidator((...args) => validatorFunc(...args) || hash.errorMessage, ...parameters);
    } else {
      console.error(`[ember-form-validate/helper:validator] Validator ${validator} is invalid!`);
    }
  }
});
