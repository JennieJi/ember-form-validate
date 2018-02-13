import Ember from 'ember';
import {ValidateGroup} from 'ember-form-validate/services/validator';

function runEach(subject, func, ...args) {
  if (Ember.isArray(subject)) {
    Array.prototype.forEach.call(subject, s => runEach(s, func, ...args));
  } else if (Ember.isPresent(subject)) {
    func(subject, ...args);
  }
}

function findNearestItemIndexInChildset(parentset, index, childset) {
  if (index === parentset.length - 1) {
    return childset.length;
  } else {
    const result = childset.indexOf(parentset[index + 1]);
    if (result < 0) {
      return findNearestItemIndexInChildset(parentset, index + 1, childset);
    } else {
      return result;
    }
  }
}

/**
 * @exports MIXIN:form-validator
 * @mixin
 */
export default Ember.Mixin.create(
/** @lends MIXIN:form-validator */
{
  /**
   * @type {SERVICE:validator}
   */
  validator: Ember.inject.service(),

  classNames: ['ember-form-validate__validator'],
  classNameBindings: [
    'errorMessage:ember-form-validate__validator--invalid'
  ],

  /**
   * @type {boolean}
   * @since 0.0.1-beta.1
   */
  disabled: Ember.computed('_disabled', {
    get() {
      return this.get('_disabled');
    },
    set(key, value) {
      Ember.run.scheduleOnce('afterRender', this, () => {
        const group = this.get('validatorGroup');
        if (value) {
          this._unregister(group);
          this.resetValidate();
        } else {
          this._register(group);
        }
      });
      return Ember.trySet(this, '_disabled', value);
    }
  }),
  _disabled: false,
  /**
   * Value for validation
   * @type {}
   */
  value: void 0,
  /**
   * @type {string}
   */
  errorMessage: void 0,
  /**
   * Original ValdiateError object returned by light-validate-js
   * @type {ValidateError}
   * @See {@link https://github.com/JennieJi/light-validate-js/blob/master/API.md#ValidateError|light-validate-js}
   */
  _validateError: void 0,
  /**
   * Update error message list with given error objects
   * @method
   * @since 0.0.1-beta.13
   * @param errorObj {ValidateError} See {@link https://github.com/JennieJi/light-validate-js/blob/master/API.md#ValidateError|light-validate-js}
   */
  updateErrorMessage(errorObj) {
    Ember.run.debounce(this, this._updateErrorMessage, errorObj, 300, true);
  },
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
    }
  },
  /**
   * Instance of component form-validate
   * @type {?Array.<COMPONENT:form-validate>}
   */
  validatorGroup: Ember.computed('_validatorGroup', {
    get() {
      return this.get('_valdiatorGroup');
    },
    set(key, value) {
      const oldVal = this.get('_validatorGroup');
      const newVal = Ember.A().pushObjects(!Ember.isArray(value) ? (value instanceof ValidateGroup) ? [value] : [] : value);
      Ember.run.scheduleOnce('afterRender', this, () => {
        let groupAdded = Ember.copy(this.get('_validatorGroup'));
        if (Ember.isArray(oldVal)) {
          oldVal.forEach(g => {
            const indexInNewVal = groupAdded.indexOf(g);
            if (indexInNewVal >= 0) {
              groupAdded.splice(indexInNewVal, 1);
            } else {
              this._unregister(g);
            }
          });
        }
        this._register(groupAdded);
      });
      return Ember.trySet(this, '_validatorGroup', newVal);
    }
  }),
  _validatorGroup: [],
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

  _getOrderInGroup(group) {
    const allFields = Ember.$('.ember-form-validate__validator').toArray().map(field => field.id);
    const groupFields = group.fields.map(field => field.elementId);
    const indexInAll = allFields.indexOf(this.elementId);
    return findNearestItemIndexInChildset(allFields, indexInAll, groupFields);
  },
  _register(group) {
    const field = this;
    if (this.get('disabled')) { return; }
    runEach(group, (g) => {
      const insertAt = field._getOrderInGroup(g);
      g.register(field, insertAt);
    });
  },
  _unregister(group) {
    const field = this;
    runEach(group, (g) => {
      g.unregister(field);
    });
  },
  /**
   * Empty error messages
   * @method
   * @since 0.0.1-beta.13
   */
  resetValidate() {
    this.updateErrorMessage();
  },

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
    return this.get('validator').validate(this.get('value'), validators).then(() => this.resetValidate()).catch(err => this.updateErrorMessage(err));
  },

  /**
   * @type {object}
   */
  actions: {
    /**
     * @memberof MIXIN:form-validator.actions
     * @todo Deprecate in next version
     */
    validate() {
      return this.validate();
    }
  }
});
