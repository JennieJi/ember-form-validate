import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import {ValidateGroup, createValidator} from 'ember-form-validate/services/validator';

const validatorWithErrorMessage = createValidator(() => 'Error Message');
// const validatorPass = createValidator(function() { return true; });

function getGroupInstance() {
  return new ValidateGroup();
}

moduleForComponent('form-validate-field', 'Integration | Component | form validate field', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{form-validate-field}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#form-validate-field}}
      template block text
    {{/form-validate-field}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');

  this.render(hbs`
    {{#form-validate-field as |validate errorMessage|}}
      {{errorMessage}}
    {{/form-validate-field}}
  `);

  assert.equal(this.$().text().trim(), '');
});

test('register a validator by setting "validatorGroup" property', function(assert) {
  const group = getGroupInstance();
  this.set('validatorGroup', group);
  this.render(hbs`
    {{form-validate-field
    validatorGroup=validatorGroup}}
  `);
  assert.equal(group.fields.length, 1);
});

test('set "disabled" and it should be register/unregistered from validatorGroup', function(assert) {
  const group = getGroupInstance();
  this.set('validatorGroup', group);
  this.set('diabled', false);
  this.render(hbs`
      {{form-validate-field
      disabled=disabled
      validatorGroup=validatorGroup}}
  `);
  assert.equal(group.fields.length, 1);
  this.set('disabled', true);
  assert.equal(group.fields.length, 0);
  this.set('disabled', false);
  assert.equal(group.fields.length, 1);
});
test('destory/init component and it should be register/unregistered from validatorGroup', function(assert) {
  const group = getGroupInstance();
  this.set('validatorGroup', group);
  this.set('showComponent', true);

  this.render(hbs`
    {{#if showComponent}}
      {{form-validate-field
      disabled=disabled
      validatorGroup=validatorGroup}}
    {{/if}}
  `);
  assert.equal(group.fields.length, 1);
  this.set('showComponent', false);
  assert.equal(group.fields.length, 0);
  this.set('showComponent', true);
  assert.equal(group.fields.length, 1);
});
test('destroy and re-init component and it should be registered to original order in validatorGroup', function(assert) {
  const group = getGroupInstance();
  this.set('validatorGroup', group);
  this.set('showComponent', true);
  this.render(hbs`
    {{form-validate-field validatorGroup=validatorGroup}}
    {{#if showComponent}}
      {{form-validate-field class='component-to-check' validatorGroup=validatorGroup}}
    {{/if}}
    {{form-validate-field validatorGroup=validatorGroup}}
  `);
  assert.equal(group.fields.length, 3);
  assert.equal(group.fields[1].class, 'component-to-check');
  this.set('showComponent', false);
  assert.equal(group.fields.length, 2);
  this.set('showComponent', true);
  assert.equal(group.fields[1].class, 'component-to-check');
});
test('component validate failed, it should have error message', function(assert) {
  const group = getGroupInstance();
  this.set('validators', validatorWithErrorMessage);
  this.set('validatorGroup', group);
  this.render(hbs`
    {{#form-validate-field
      validatorGroup=validatorGroup
      validators=validators
      as |validate errorMessage|}}
      <div class='error-message'>{{errorMessage}}</div>
      <div class='validate-button' {{action validate}}>Validate</div>
    {{/form-validate-field}}
  `);
  let $errorMessage = this.$('.error-message');
  let component = group.fields[0];
  assert.equal(component.get('_validators').length, 1);
  this.$('.validate-button').click();
  return wait().then(() => {
    assert.equal($errorMessage.text(), 'Error Message');
    component.resetValidate();
    return wait().then(() => {
      assert.equal($errorMessage.text(), '');
      group.validate().catch(e => e);
      return wait().then(() => {
        assert.equal($errorMessage.text(), 'Error Message');
      });
    });
  });
});
