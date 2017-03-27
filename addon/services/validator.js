/* global Validator */
import Ember from 'ember';

Validator.validate.Promise = Ember.RSVP.Promise;
const {validate, groupValidate} = Validator.validate;


/**
 * Exported in services/validator.js
 * @class
 */
export class ValidateGroup {
  constructor() {
    /**
     * @this ValidatorGroup
     * @type {Array.<Ember.Component>}
     */
    this.fields = Ember.A();
  }

  /**
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
   * @param [insertAt=ValidatorGroup#fields.length] {number}       Since 0.0.1-beta.13, allow to register in a certain place
   */
  register(field, insertAt) {
    if (this.fields.indexOf(field) < 0) {
      insertAt = parseInt(insertAt, 10);
      if (!insertAt && insertAt !== 0 || insertAt < 0 || insertAt > this.fields.length) {
        insertAt = this.fields.length;
      }
      this.fields.insertAt(insertAt, field);
    }
  }

  /**
   * @method
   * @param field {Ember.Component}
   */
  unregister(field) {
    let index = this.fields.indexOf(field);
    if (index >= 0) {
      this.fields.removeAt(index);
    }
  }

  /**
   * @method
   * @param exitOnceError {boolean} Whether to exit once met error, or validate all fields.
   * @return {ValidatePromise}
   */
  validate(exitOnceError = true) {
    const cacheFields = this.fields.slice();
    return groupValidate(this.parseGroup(this.fields), exitOnceError).then(() => {
      cacheFields.forEach(field => field.resetValidate());
      return true;
    }).catch(errs => {
      errs = Ember.isArray(errs) ? errs : [];
      errs.forEach(err => cacheFields[err.name].updateErrorMessage(err));
      throw errs;
    });
  }
}

/**
 * Helper for creating validator.
 * Exported in services/validator.js.
 * @method
 * @param func {function} Validate function, which returns true as valid, or errorMessage/false as invalid. Check light-validate-js for details.
 * @return {object} Return a light-validate-js format validator object
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


/**
 * @exports SERVICE:validator
 * @borrows createValidator as createValidator
 */
export default Ember.Service.extend(
/** @lends SERVICE:validator */
{
  /**
   * Create a validate group instance
   * @return {ValidatGroup} ValidateGroup instance
   */
  createGroup() {
    return new ValidateGroup();
  },
  createValidator,
  /**
   * @todo to be deprecated in the next version
   * @see Validator.validate
   */
  validate,
  /**
   * @see Validator.validator
   */
  validators: Validator.validator
});
