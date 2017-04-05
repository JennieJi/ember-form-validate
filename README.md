ember-form-validate    
[![Build Status](https://travis-ci.org/JennieJi/ember-form-validate.svg?branch=master)](https://travis-ci.org/JennieJi/ember-form-validate) 
[![npm version](https://badge.fury.io/js/ember-form-validate.svg)](https://badge.fury.io/js/ember-form-validate) 
[![ember version](https://embadge.io/v1/jennieji/ember-form-validate/master/ember-cli.svg)](https://badge.fury.io/js/ember-form-validate)
[![Ember Observer Score](https://emberobserver.com/badges/ember-form-validate.svg)](https://emberobserver.com/addons/ember-form-validate)

[![Coverage Status](https://coveralls.io/repos/github/JennieJi/ember-form-validate/badge.svg?branch=master)](https://coveralls.io/github/JennieJi/ember-form-validate?branch=master)
=====
A simple ember form validate addon, using [light-validate-js](https://github.com/JennieJi/light-validate-js) (another repo of mine).    
[API details here](DOC.md)  

## Get start
### Installation
`ember install ember-form-validate`    
### Basic Usage
You can use provided components form-validate and form-validate-field to do some simple tasks.    
HBS:
```hbs
{{#form-validate as |form validate|}}
  <ul class="errors">
    {{#each form.fields as |field index|}}
      {{#if field.errorMessage}}
        <li>{{index}}: {{field.errorMessage}}</li>
      {{/if}}
    {{/each}}
  </ul>

  {{#form-validate-field value=required1 validators=validateRequired validatorGroup=form as |validate errorMsg|}}
    Required: {{input placeholder='Enter text ...' value=required1 focus-out=(action validate)}}
    {{input type='button' value='validate' click=(action validate)}} 
    {{errorMsg}}
  {{/form-validate-field}}

  {{#form-validate-field value=required2 validators=validateRequiredFunc validatorGroup=form as |validate errorMsg|}}
    Required2: {{input placeholder='Enter text ...' value=required2 focus-out=(action validate)}}
    {{input type='button' value='validate' click=(action validate)}} 
    {{errorMsg}}
  {{/form-validate-field}}

  {{#form-validate-field value=required3 validators=(validator 'Length' params=(hash excludeEdge=true) errorMessage='This field is required!') validatorGroup=form as |validate errorMsg|}}
    Required: {{input placeholder='Enter text ...' value=required3 focus-out=(action validate)}}
    {{errorMsg}}
  {{/form-validate-field}}

  {{#form-validate-field value=integer validators=validateInteger validatorGroup=form as |validate errorMsg|}}
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
  // A group of validators
  validateRequired: Ember.computed('validator.validators', function() {
    return validateRequiredFunc();
  }),
  // Function by returning single/multiple validators
  validateRequiredFunc() {
    return [{
      validator: this.get('validator.validators').Length,
      parameters: [{
        min: 0,
        excludeEdge: true
      }],
      errorMessage: 'required'
    }];
  },
  // Single object as validator
  validateInteger: Ember.computed('validator.validators', function() {
    return {
      validator: this.get('validator.validators').Regular,
      parameters: [{
        regular: /^\d*$/
      }],
      errorMessage: 'Must be integer'
    };
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
