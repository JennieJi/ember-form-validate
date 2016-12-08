/* global Validator */
/**
 * @exports SERVICE:validator
 */
import Ember from 'ember';

Validator.validate.Promise = Ember.RSVP.Promise;
const {validate, groupValidate} = Validator.validate;


/**
 * ValidateGroup
 * @class
 */
export class ValidateGroup {
  constructor () {
    this.fields = [];
    this.cacheValidateFields = [];
    this.errors = [];
  }

  /**
   * @private
   * @param field {Ember.Component}
   * @return {object}
   */
  parseField(field) {
    return {
      value: field.get('value'),
      validators: field.get('_validators')
    };
  }

  /**
   * @method
   * @param fields {Array.<Ember.Component>} See {@link ValidateGroup.fields}
   * @return {Array.<object>}
   */
  parseGroup(fields) {
    let group = {};
    fields.forEach((field, i) => group[i] = this.parseField(field));
    return group;
  }

  /**
   * @method
   * @param field {Ember.Component}
   */
  register(field) {
    if (this.fields.indexOf(field) < 0) {
      this.fields.push(field);
    }
  }

  /**
   * @method
   * @param field {Ember.Component}
   */
  unregister(field) {
    this.fields.splice(this.fields.indexOf(field), 1);
    const cachedId = this.cacheValidateFields.indexOf(field);
    if (Ember.isArray(this.errors)) {
      Ember.set(this, 'errors', this.errors.filter(err => err.name.toString() !== cachedId.toString()));
    }
  }

  /**
   * @method
   * @return {Array} See {@link ValidateGroup.errors}
   */
  resetErrors() {
    return Ember.set(this, 'errors', []);
  }

  /**
   * @method
   * @param field {Ember.Component}
   * @return {ValidateError}
   */
  getError(field) {
    const id = this.cacheValidateFields.indexOf(field);
    return this.errors.find(f => f.name.toString() === id.toString());
  }

  /**
   * @method
   * @param exitOnceError {boolean}
   * @return {ValidatePromise}
   */
  validate(exitOnceError = true) {
    const cacheFields = this.fields.slice();
    this.resetErrors();
    return groupValidate(this.parseGroup(this.fields), exitOnceError).then(() => {
      this.cacheValidateFields = cacheFields;
      return true;
    }).catch(errs => {
      this.cacheValidateFields = cacheFields;
      if (Ember.isArray(errs)) {
        errs.forEach(err => {
          if (Ember.isPresent(err && err.name) && Ember.isPresent(cacheFields[err.name])) {
            cacheFields[err.name]._updateErrorMessage(err);
          }
        });
      }
      Ember.set(this, 'errors', errs);
      throw errs;
    });
  }
}

/**
 * @method
 * @param func {function}
 * @return {Array.<function>}
 */
export function createValidator (func, ...params) {
  if (typeof func !== 'function') {
    throw `First parameter of SERVICE:validator~createValidator ${func} is not a function!`;
  }
  return {
    validator: func,
    parameters: params
  };
}

export default Ember.Service.extend({
  createGroup() {
    return new ValidateGroup();
  },
  createValidator,
  validate,
  validators: Validator.validator
});
