import Ember from 'ember';
/**
 * @exports MIXIN:form-validator
 *
 * @prop value {} Value for validation
 * @prop form {?COMPONENT:form-validate} Instance of component form-validate.
 * @prop validators {function[]} A group of functions to validate value by return error messages or return false as valid.
 */
export default Ember.Mixin.create(
/** @lends MIXIN:form-validator */
{
  validator: Ember.inject.service(),

  classNames: ['ember-form-validate__validator'],
  classNameBindings: [
    'errorMessage:ember-form-validate__validator--invalid'
  ],

  value: void 0,
  errorMessage: void 0,
  _errorMessageObserver: Ember.observer('group.errors', function() {
    const group = this.get('_group');
    if (group.errors.length) {
      let error = group && group.getError && group.getError(this);
      if (error) {
        this.set('errorMessage', error.errorMessage);
      }
    }
  }),
  group: void 0,
  _group: void 0,
  validators: [],

  _register(group) {
    if (group && group.register) {
      group.register(this);
    }
  },
  _unregister(group) {
    if (group && group.unregister) {
      group.unregister(this);
    }
  },

  _formValidatorSetup: Ember.on('didReceiveAttrs', Ember.observer('group', function() {
    const newGroup = this.get('group');
    this._unregister(this.get('_group'));
    this.set('_group', newGroup);
    this._register(newGroup);
  })),
  willDestroyElement() {
    this._unregister(this.get('group'));
  },

  actions: {
    /**
     * @method
     * @desc Validate the value by given validators.
     * @return {string}
     */
    validate() {
      return this.get('validator').validate(this.get('value'), this.get('validators')).then(() => {
        this.set('errorMessage', '');
      }).catch(err => {
        this.set('errorMessage', err && err.errorMessage || '');
      });
    }
  }
});
