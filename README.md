ember-form-validate
=====
A simple ember form validate addon, using [light-validate-js](https://github.com/JennieJi/light-validate-js) (another repo of mine).    
[API details here](DOC.md)

## Get start
NOTE that this addon needs >=ember-cli@2.2.0beta.6
### Installation
`ember install ember-form-validate`    
### Basic Usage
You can use provided components form-validate and form-validate-field to do some simple tasks.    
HBS:
```
{{#form-validate as |form validate|}}
  <ul class="errors">
    {{#each form.errors as |err|}}
      <li>{{err.name}}: {{err.errorMessage}}</li>
    {{/each}}
  </ul>

  {{#form-validate-field value=required validators=validateRequired group=form as |validate errorMsg|}}
    Required: {{input placeholder='Enter text ...' value=required focus-out=validate}}
    {{input type='button' value='validate' click=(action validate)}} 
    {{errorMsg}}
  {{/form-validate-field}}

  {{#form-validate-field value=integer validators=validateInteger group=form as |validate errorMsg|}}
    Integer: {{input placeholder='Enter integer ...' value=integer focus-out=(action validate)}} 
    {{errorMsg}}
  {{/form-validate-field}}

  {{input type='button' value='Group Validate' click=(action validate (action 'submitForm'))}}

{{/form-validate}}
```
Controller:
```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
  validator: Ember.inject.service(),

  validateRequired: Ember.computed('validator.validators', function() {
    return [{
      validator: this.get('validator.validators').Length,
      parameters: [{
        min: 0,
        excludeEdge: true
      }],
      errorMessage: 'required'
    }];
  }),
  validateInteger: Ember.computed('validator.validators', function() {
    return [{
      validator: this.get('validator.validators').Regular,
      parameters: [{
        regular: /^\d*$/
      }],
      errorMessage: 'Must be integer'
    }];
  })
});
```

Or you can use provided validator service and form-validator mixin to power up your components and form validation. Check [API details here](DOC.md).

## Develop
### Installation

- `git clone` this repository
- `npm install`
  - `bower install`

### Running

- `ember server`
- Visit your app at http://localhost:4200.

### Running Tests

- `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
- `ember test`
  - `ember test --server`

### Building

- `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
