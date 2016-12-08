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
    this.fields = Ember.A();
    this.cacheValidateFields =  Ember.A();
    this.errors =  Ember.A();
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
      this.fields.addObject(field);
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
    this._removeError(field);
  }

  /**
   * @method
   * @return {Array} See {@link ValidateGroup.errors}
   */
  resetErrors() {
    return this.errors.clear();
  }

  _getCachedFieldIndex(field) {
    return this.cacheValidateFields.indexOf(field);
  }
  /**
   * @method
   * @param field {Ember.Component}
   * @return {ValidateError}
   */
  getError(field) {
    const id = this._getCachedFieldIndex(field).toString();
    return this.errors.find(f => f.name.toString() === id);
  }

  _removeError(field) {
    this.errors.removeObject(this.getError(field));
  }
  /**
   * @method
   * @since 0.0.1-beta.10
   * @param field {Ember.Component}
   */
  updateError(field) {
    const fieldError = field.get('_validateError');
    if (!fieldError) {
      this._removeError(field);
    } else {
      const id = this._getCachedFieldIndex(field);
      let existingError = this.getError(field);
      let errorName = id < 0 ? this.cacheValidateFields.length : id;
      if (existingError) {
        Ember.merge(existingError, {
          name: errorName
        });
      } else {
        this.errors.pushObject(Ember.merge({
          name: errorName
        }, fieldError));
      }
      if (id < 0) {
        this.cacheValidateFields.pushObject(field);
      }
    }
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
      this.cacheValidateFields.setObjects(cacheFields);
      this.resetErrors();
      return true;
    }).catch(errs => {
      this.cacheValidateFields.setObjects(cacheFields);
      if (Ember.isArray(errs)) {
        errs.forEach(err => {
          if (Ember.isPresent(err && err.name) && Ember.isPresent(cacheFields[err.name])) {
            cacheFields[err.name]._updateErrorMessage(err);
          }
        });
      }
      this.errors.setObjects(errs);
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
