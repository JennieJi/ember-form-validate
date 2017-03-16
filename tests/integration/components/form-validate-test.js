import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-validate', 'Integration | Component | form validate', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{form-validate}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#form-validate}}
      template block text
    {{/form-validate}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

// test('register a group of fields in DOM order', function(assert) {
// });
