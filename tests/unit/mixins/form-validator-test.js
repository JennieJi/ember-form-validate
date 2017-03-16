import Ember from 'ember';
import FormValidatorMixin from 'ember-form-validate/mixins/form-validator';
import {ValidateGroup} from 'ember-form-validate/services/validator';
import { module, test } from 'qunit';

const FormValidatorObject = Ember.Object.extend(FormValidatorMixin);

function getInstance() {
  return FormValidatorObject.create();
}
function getGroupInstance() {
  return new ValidateGroup();
}
function getInstanceWithGroup(groups) {
  const ins = getInstance();
  groups = groups || getGroupInstance();
  Ember.run(this, function() {
    ins.set('validatorGroup', groups);
  });
  return ins;
}

module('Unit | Mixin | form validator');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.ok(getInstance());
});

test('register single validator in group', function(assert) {
  const group = getGroupInstance();
  const subject = getInstanceWithGroup(group);
  assert.ok(Ember.isArray(subject.get('validatorGroup')));
  assert.equal(group.fields[0], subject);

  test('disable validator, it should be unregistered from group', function(assert) {
    Ember.run(this, function() {
      subject.set('disabled', true);
    });
    assert.equal(subject.get('validatorGroup')[0], group);
    assert.equal(group.fields.length, 0);
  });

  test('enable validator, it should be register to group again', function(assert) {
    Ember.run(this, function() {
      subject.set('disabled', false);
    });
    assert.equal(group.fields[0], subject);
    assert.equal(group.fields.length, 1);
  });

  test('remove valdiatorGroup, validator should be unregistered from it', function(assert) {
    Ember.run(this, function() {
      subject.set('validatorGroup', false);
    });
    assert.ok(Ember.isArray(subject.get('validatorGroup')));
    assert.equal(subject.get('validatorGroup').length, 0);
    assert.equal(group.fields.length, 0);
  });

  test('add validatorGroup and set disabled, validator should not be registered to validatorGroup', function(assert) {
    Ember.run(this, function() {
      subject.setProperties({
        validatorGroup: group,
        disabled: true
      });
    });
    assert.equal(subject.get('validatorGroup')[0], group);
    assert.equal(group.fields.length, 0);
  });
});

test('register a group of validators in group', function(assert) {
  const group = getGroupInstance();
  const groupB = getGroupInstance();
  let subjects = [];
  for (let i = 20; i--;)  {
    subjects.push(getInstanceWithGroup(group));
  }
  assert.equal(group.fields.length, 20);

  test('batch add new group', function(assert) {
    Ember.run(this, function() {
      subjects.forEach(s => s.set('validatorGroup', [group, groupB]));
    });
    assert.equal(group.fields.length, 20);
    assert.equal(groupB.fields.length, 20);
  });
  test('batch remove new group', function(assert) {
    Ember.run(this, function() {
      subjects.forEach(s => s.set('validatorGroup', [group, groupB]));
    });
    Ember.run(this, function() {
      subjects.forEach((s, i) => {
        if (i % 2) { return; }
        s.set('validatorGroup', [group]);
      });
    });
    assert.equal(group.fields.length, 20);
    assert.equal(groupB.fields.length, 10);
  });
});
