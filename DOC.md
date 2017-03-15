## Modules

<dl>
<dt><a href="#COMPONENT_form-validate-field">COMPONENT:form-validate-field</a></dt>
<dd></dd>
<dt><a href="#COMPONENT_form-validate">COMPONENT:form-validate</a></dt>
<dd><p>Wrapper component for a form for having the ability of validating all the elements together.</p>
</dd>
<dt><a href="#HELPER_form-validator">HELPER:form-validator</a></dt>
<dd></dd>
<dt><a href="#MIXIN_form-validator">MIXIN:form-validator</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#ValidateGroup">ValidateGroup</a></dt>
<dd><p>ValidateGroup</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#createValidator">createValidator(func)</a> ⇒ <code>Array.&lt;function()&gt;</code></dt>
<dd></dd>
</dl>

<a name="COMPONENT_form-validate-field"></a>

## COMPONENT:form-validate-field
<a name="COMPONENT_form-validate"></a>

## COMPONENT:form-validate
Wrapper component for a form for having the ability of validating all the elements together.

**Properties**

| Name | Type |
| --- | --- |
| instance | <code>SERVICE:validator~ValidateGroup</code> | 

**Example**  
```js
// Will export 2 objects:
// > form - this component instance
// > validators - the validators exposed by validatorService
{{#form-validate as |form|}}
   {{#form-validate-field group=form value=input validators=validators as |validate errorMessage|}}
     {{input value=input focus-out=(action validate)}}
     <p>{{errorMessage}}</p>
   {{/form-validate-field}}
{{/form-validate}}
```
<a name="HELPER_form-validator"></a>

## HELPER:form-validator
**Since**: 0.0.1-beta.10  
**Example**  
```js
// Use validator provided in light-validate-js
{{validator 'Length' params=myParams errorMessage='Invalid'}}

// Use a function defined in controller
{{validator (action validateFunction) params=myParams}}
```
<a name="MIXIN_form-validator"></a>

## MIXIN:form-validator

* [MIXIN:form-validator](#MIXIN_form-validator)
    * [.disabled](#MIXIN_form-validator.disabled) : <code>boolean</code>
    * [.value](#MIXIN_form-validator.value) : <code>Object</code>
    * [.errorMessage](#MIXIN_form-validator.errorMessage) : <code>string</code>
    * [._validateError](#MIXIN_form-validator._validateError) : <code>ValidateError</code>
    * [.validatorGroup](#MIXIN_form-validator.validatorGroup) : <code>[Array.&lt;COMPONENT:form-validate&gt;](#COMPONENT_form-validate)</code>
    * [.validators](#MIXIN_form-validator.validators) : <code>object</code> &#124; <code>function</code> &#124; <code>Array.&lt;object&gt;</code>
    * [.actions](#MIXIN_form-validator.actions) : <code>object</code>
        * [.validate()](#MIXIN_form-validator.actions.validate)
    * [.updateErrorMessage(errorObj)](#MIXIN_form-validator.updateErrorMessage)
    * [.resetValidate()](#MIXIN_form-validator.resetValidate)
    * [.validate()](#MIXIN_form-validator.validate) ⇒ <code>string</code>

<a name="MIXIN_form-validator.disabled"></a>

### MIXIN:form-validator.disabled : <code>boolean</code>
**Kind**: static property of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
**Since**: 0.0.1-beta.1  
<a name="MIXIN_form-validator.value"></a>

### MIXIN:form-validator.value : <code>Object</code>
Value for validation

**Kind**: static property of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
<a name="MIXIN_form-validator.errorMessage"></a>

### MIXIN:form-validator.errorMessage : <code>string</code>
**Kind**: static property of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
<a name="MIXIN_form-validator._validateError"></a>

### MIXIN:form-validator._validateError : <code>ValidateError</code>
Original ValdiateError object returned by light-validate-js

**Kind**: static property of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
**See**: [light-validate-js](https://github.com/JennieJi/light-validate-js/blob/master/API.md#ValidateError)  
<a name="MIXIN_form-validator.validatorGroup"></a>

### MIXIN:form-validator.validatorGroup : <code>[Array.&lt;COMPONENT:form-validate&gt;](#COMPONENT_form-validate)</code>
Instance of component form-validate

**Kind**: static property of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
<a name="MIXIN_form-validator.validators"></a>

### MIXIN:form-validator.validators : <code>object</code> &#124; <code>function</code> &#124; <code>Array.&lt;object&gt;</code>
A group of validators, see light-form-validate's validators parameter of validate method.

**Kind**: static property of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
<a name="MIXIN_form-validator.actions"></a>

### MIXIN:form-validator.actions : <code>object</code>
**Kind**: static property of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
<a name="MIXIN_form-validator.actions.validate"></a>

#### actions.validate()
**Kind**: static method of <code>[actions](#MIXIN_form-validator.actions)</code>  
**Todo**

- [ ] Deprecate in next version

<a name="MIXIN_form-validator.updateErrorMessage"></a>

### MIXIN:form-validator.updateErrorMessage(errorObj)
Update error message list with given error objects

**Kind**: static method of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
**Since**: 0.0.1-beta.13  

| Param | Type | Description |
| --- | --- | --- |
| errorObj | <code>ValidateError</code> | See [light-validate-js](https://github.com/JennieJi/light-validate-js/blob/master/API.md#ValidateError) |

<a name="MIXIN_form-validator.resetValidate"></a>

### MIXIN:form-validator.resetValidate()
**Kind**: static method of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
**Since**: 0.0.1-beta.13  
<a name="MIXIN_form-validator.validate"></a>

### MIXIN:form-validator.validate() ⇒ <code>string</code>
Validate the value by given validators.

**Kind**: static method of <code>[MIXIN:form-validator](#MIXIN_form-validator)</code>  
**Since**: 0.0.1-beta.3  
<a name="ValidateGroup"></a>

## ValidateGroup
ValidateGroup

**Kind**: global class  

* [ValidateGroup](#ValidateGroup)
    * [.parseGroup(fields)](#ValidateGroup+parseGroup) ⇒ <code>Array.&lt;object&gt;</code>
    * [.register(field)](#ValidateGroup+register)
    * [.unregister(field)](#ValidateGroup+unregister)
    * [.validate(exitOnceError)](#ValidateGroup+validate) ⇒ <code>ValidatePromise</code>

<a name="ValidateGroup+parseGroup"></a>

### validateGroup.parseGroup(fields) ⇒ <code>Array.&lt;object&gt;</code>
**Kind**: instance method of <code>[ValidateGroup](#ValidateGroup)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>Array.&lt;Ember.Component&gt;</code> | See [ValidateGroup.fields](ValidateGroup.fields) |

<a name="ValidateGroup+register"></a>

### validateGroup.register(field)
**Kind**: instance method of <code>[ValidateGroup](#ValidateGroup)</code>  

| Param | Type |
| --- | --- |
| field | <code>Ember.Component</code> | 

<a name="ValidateGroup+unregister"></a>

### validateGroup.unregister(field)
**Kind**: instance method of <code>[ValidateGroup](#ValidateGroup)</code>  

| Param | Type |
| --- | --- |
| field | <code>Ember.Component</code> | 

<a name="ValidateGroup+validate"></a>

### validateGroup.validate(exitOnceError) ⇒ <code>ValidatePromise</code>
**Kind**: instance method of <code>[ValidateGroup](#ValidateGroup)</code>  

| Param | Type | Default |
| --- | --- | --- |
| exitOnceError | <code>boolean</code> | <code>true</code> | 

<a name="createValidator"></a>

## createValidator(func) ⇒ <code>Array.&lt;function()&gt;</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| func | <code>function</code> | 

