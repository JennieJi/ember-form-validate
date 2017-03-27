import Ember from 'ember';
import layout from '../templates/components/form-validate';

/**
 * @exports COMPONENT:form-validate
 * @desc Wrapper component for a form for having the ability of validating all the elements together.
 * @borrows SERVICE:validator as validator
 *
 * @example
 * // Will export 2 objects:
 * // > form - this component instance
 * // > validators - the validators exposed by validatorService
 * {{#form-validate as |form|}}
 *    {{#form-validate-field group=form value=input validators=validators as |validate errorMessage|}}
 *      {{input value=input focus-out=(action validate)}}
 *      <p>{{errorMessage}}</p>
 *    {{/form-validate-field}}
 * {{/form-validate}}
 */
export default Ember.Component.extend(
/**
 * @lends COMPONENT:form-validate
 */
{
  validator: Ember.inject.service(),
  layout,
  tagName: 'form',
  classNames: ['ember-form-validate'],
  classNameBindings: [
    'instance.errors.length:ember-form-validate--invalid'
  ],
  /**
   * @type {ValidateGroup} Instance of ValidateGroup
   */
  instance: void 0,
  setup: Ember.on('init', function() {
    if (!this.get('instance')) {
      let instance = this.get('validator').createGroup();
      this.set('instance', instance);
    }
  }),
  /**
   * @type {boolean} See {@link ValidateGroup.validate}
   */
  exitOnceError: true,
  /**
   * @type {object}
   */
  actions: {
    /**
     * @memberof COMPONENT:form-validate.actions
     * @param [successCallback] {function}
     * @param [failCallback] {function}
     * @return {ValidatePromise} See {@link ValidateGroup.validate}
     */
    validate(successCallback, failCallback) {
      const instance = this.get('instance');
      if (instance) {
        let event = arguments[arguments.length - 1];
        if (event && event.preventDefault) {
          event.preventDefault();
        }
        return instance.validate(this.get('exitOnceError')).then(() => {
          if (typeof successCallback === 'function') {
            return successCallback(this);
          }
        }).catch(err => {
          if (typeof failCallback === 'function') {
            return failCallback(err, this);
          }
        });
      }
    }
  }
});
