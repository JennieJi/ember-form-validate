import Ember from 'ember';
/**
 * @exports MIXIN:form-validator
 */
export default Ember.Mixin.create(
/** @lends MIXIN:form-validator */
{
  validator: Ember.inject.service(),

  classNames: ['ember-form-validate__validator'],
  classNameBindings: [
    'errorMessage:ember-form-validate__validator--invalid'
  ],

  /**
   * @type {boolean}
   * @since 0.0.1-beta.1
   */
  disabled: false,
  /**
   * Value for validation
   * @type {}
   */
  value: void 0,
  /**
   * @type {string}
   */
  errorMessage: void 0,
  _validateError: void 0,
  _updateErrorMessage(errorObj) {
    if (!(this.get('isDestroyed') || this.get('isDestroying'))) {
      this.setProperties({
        errorMessage: errorObj &&
          (errorObj.errorMessage ||
            (Ember.isPresent(errorObj.error) &&
              (Ember.String.isHTMLSafe && Ember.String.isHTMLSafe(errorObj.error) ? errorObj.error : errorObj.error.toString())
            ) || ''),
        _validateError: errorObj
      });
      this._validatorGroupCaller(this.get('validatorGroup'), 'updateError', [this]);
    }
  },
  /**
   * Instance of component form-validate
   * @type {?COMPONENT:form-validate}
   */
  validatorGroup: void 0,
  _validatorGroup: void 0,
  /**
   * A group of validators, see light-form-validate's validators parameter of validate method.
   * @type {object|function|Array.<object>}
   */
  validators: [],
  _validators: Ember.computed('validators', function() {
    let validators = this.get('validators');
    if (typeof validators === 'function') {
      validators = validators.call(this);
    }
    if (Ember.isArray(validators)) {
      return validators.filter(v => Ember.isPresent(v));
    } else if (typeof validators === 'object' && Object.keys(validators).includes('validator')) {
      return [validators];
    } else if (Ember.isNone(validators) || validators === false) {
      return [];
    } else {
      console.error('Invalid validators on element: ',  this.$());
    }
  }),

  _register(group) {
    this._validatorGroupCaller(group, 'register', [this]);
  },
  _unregister(group) {
    this._validatorGroupCaller(group, 'unregister', [this]);
  },
  _validatorGroupCaller(group, action, args = []) {
    if (Ember.isArray(group)){
      const originalArgs = Array.prototype.slice.call(arguments, 1);
      group.forEach(g => this._validatorGroupCaller(g, ...originalArgs));
    } else if (group && group[action]) {
      group[action](...args);
    }
  },

  _resetValidate() {
    this._updateErrorMessage();
  },
  _formValidatorSetup: Ember.on('init', Ember.observer('validatorGroup', function() {
    const newGroup = this.get('validatorGroup');
    this._unregister(this.get('_validatorGroup'));
    this.set('_validatorGroup', newGroup);
    if (!this.get('disabled')) {
      this._register(newGroup);
    }
  })),
  _formValidatorEnable: Ember.on('init', Ember.observer('disabled', function() {
    if (this.get('disabled')) {
      this._unregister(this.get('validatorGroup'));
      this._resetValidate();
    } else {
      this._register(this.get('validatorGroup'));
    }
  })),
  willDestroyElement() {
    this._unregister(this.get('validatorGroup'));
  },

  /**
   * @method
   * @since 0.0.1-beta.3
   * @desc Validate the value by given validators.
   * @return {string}
   */
  validate() {
    if (this.get('disabled')) { return; }
    const validators = this.get('_validators');
    return this.get('validator').validate(this.get('value'), validators).then(() => this._resetValidate()).catch(err => this._updateErrorMessage(err));
  },

  /**
   * @type {object}
   */
  actions: {
    /**
     * @todo Deprecate in next version
     */
    validate() {
      return this.validate();
    }
  }
});
