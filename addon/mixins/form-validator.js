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
  _errorMessageObserver: Ember.observer('group.errors.[]', function() {
    const group = this.get('_group');
    let error;
    if (group.errors.length) {
      error = group && group.getError && group.getError(this);
    }
    this._updateErrorMessage(error);
  }),
  _updateErrorMessage(errorObj) {
    if (!(this.get('isDestroyed') || this.get('isDestroying'))) {
      this.set('errorMessage', errorObj && (Ember.String.htmlSafe(errorObj.errorMessage) || errorObj.error instanceof Ember.Handlebars.SafeString && errorObj.error) || '');
    }
  },
  /**
   * Instance of component form-validate
   * @type {?COMPONENT:form-validate}
   */
  group: void 0,
  _group: void 0,
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
      return validators;
    } else if (typeof validators === 'object' && Object.keys(validators).includes('validator')) {
      return [validators];
    } else {
      console.error('Invalid validators on element: ',  this.$());
    }
  }),

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


  _resetValidate() {
    this._updateErrorMessage();
  },
  _formValidatorSetup: Ember.on('init', Ember.observer('group', function() {
    const newGroup = this.get('group');
    this._unregister(this.get('_group'));
    this.set('_group', newGroup);
    if (!this.get('disabled')) {
      this._register(newGroup);
    }
  })),
  _formValidatorEnable: Ember.on('init', Ember.observer('disabled', function() {
    if (this.get('disabled')) {
      this._unregister(this.get('group'));
      this._resetValidate();
    } else {
      this._register(this.get('group'));
    }
  })),
  willDestroyElement() {
    this._unregister(this.get('group'));
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
    return this.get('validator').validate(this.get('value'), validators).then(() => {
        this._resetValidate();
      }).catch(err => {
        this._updateErrorMessage(err);
      }).finally(() => resolve());
    });
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
