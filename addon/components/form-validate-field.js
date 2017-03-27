import Ember from 'ember';
import FormValidatorMixin from '../mixins/form-validator';
import layout from '../templates/components/form-validate-field';

/**
 * @exports COMPONENT:form-validate-field
 * @mixes MIXIN:form-validator
 */
export default Ember.Component.extend(FormValidatorMixin, {
  layout
});
