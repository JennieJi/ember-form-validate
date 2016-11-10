import Ember from 'ember';
import FormValidatorMixin from 'ember-form-validate/mixins/form-validator';
import { module, test } from 'qunit';

module('Unit | Mixin | form validator');

// Replace this with your real tests.
test('it works', function(assert) {
  let FormValidatorObject = Ember.Object.extend(FormValidatorMixin);
  let subject = FormValidatorObject.create();
  assert.ok(subject);
});
