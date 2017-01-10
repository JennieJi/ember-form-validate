import { moduleFor, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

let App;
moduleFor('service:validator', 'Unit | Service | validator', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
