import Ember from 'ember';
import FormValidatorMixin from 'ember-form-validate/mixins/form-validator';
import {ValidatorGroup} from 'ember-form-validate/services/validator';
import { module, test } from 'qunit';

module('Unit | Mixin | form validator');

// Replace this with your real tests.
test('it works', function(assert) {
  let FormValidatorObject = Ember.Object.extend(FormValidatorMixin);
  let subject = FormValidatorObject.create();
  assert.ok(subject);
});


test('register validator in group', function(assert) {
  const FormValidatorObject = Ember.Object.extend(FormValidatorMixin);
  const group = new ValidatorGroup();
  let subject = FormValidatorObject.create();
  subject.set('validatorGroup', group);
  assert.ok(Ember.isArray(subject.get('validatorGroup')));
  assert.equal(subject.get('validatorGroup').objectAt(0), group);
});
