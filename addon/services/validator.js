/* global Validator */
/**
 * @exports SERVICE:validator
 */
import Ember from 'ember';

Validator.validate.Promise = Ember.RSVP.Promise;
const {validate, groupValidate} = Validator.validate;

/**
 * @private
 * @param field {Ember.Component}
 * @return {object}
 */
function parseField(field) {
  return {
    value: field.get('value'),
    validators: field.get('validators')
  };
}

/**
 * ValidateGroup
 * @class
 */
export function ValidateGroup() {
  let _fields = [];
  let _cacheValidateFields = [];

  /**
   * @prop fields {Array.<Ember.Component>}
   */
  this.fields = _fields;
  /**
   * @prop errors {Array.<ValidateError>}
   */
  this.errors = [];

  /**
   * @method
   */
  this.parseField = parseField;
  /**
   * @method
   * @param fields {Array.<Ember.Component>} See {@link ValidateGroup.fields}
   * @return {Array.<object>}
   */
  this.parseGroup = fields => {
    let group = {};
    fields.forEach((field, i) => group[i] = this.parseField(field));
    return group;
  };

  /**
   * @method
   * @param field {Ember.Component}
   */
  this.register = field => {
    _fields.push(field);
  };

  /**
   * @method
   * @param field {Ember.Component}
   */
  this.unregister = field => {
    let i = _fields.indexOf(field);
    _fields.splice(i, 1);
  };

  /**
   * @method
   * @return {Array} See {@link ValidateGroup.errors}
   */
  this.resetErrors = () => Ember.set(this, 'errors', []);

  /**
   * @method
   * @param field {Ember.Component}
   * @return {ValidateError}
   */
  this.getError = field => {
    const id = _cacheValidateFields.indexOf(field);
    return this.errors.find(f => f.name.toString() === id.toString());
  };

  /**
   * @method
   * @param exitOnceError {boolean}
   * @return {ValidatePromise}
   */
  this.validate = (exitOnceError = true) => {
    const cacheFields = _fields.slice();
    this.resetErrors();
    return groupValidate(this.parseGroup(_fields), exitOnceError).then(() => {
      _cacheValidateFields = cacheFields;
      return true;
    }).catch(errs => {
      _cacheValidateFields = cacheFields;
      Ember.set(this, 'errors', errs);
      throw errs;
    });
  };

  return this;
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
  return [function(value) {
    return func(value, ...params);
  }];
}

export default Ember.Service.extend({
  createGroup() {
    return new ValidateGroup();
  },
  createValidator,
  validate,
  validators: Validator.validator
});
