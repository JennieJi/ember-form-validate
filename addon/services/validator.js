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
  constructor() {
    this.fields = Ember.A();
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
  }

  /**
   * @method
   * @param exitOnceError {boolean}
   * @return {ValidatePromise}
   */
  validate(exitOnceError = true) {
    const cacheFields = this.fields.slice();
    return groupValidate(this.parseGroup(this.fields), exitOnceError).then(() => {
      cacheFields.forEach(field => field.resetValidate());
      return true;
    }).catch(errs => {
      errs = Ember.isArray(errs) ? errs : [];
      cacheFields.forEach((field, i) => {
        field.updateErrorMessage(errs.find(e => e.name.toString() === i.toString()));
      });
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
