## Modules

<dl>
<dt><a href="#COMPONENT_form-validate-field">COMPONENT:form-validate-field</a></dt>
<dd></dd>
<dt><a href="#COMPONENT_form-validate">COMPONENT:form-validate</a></dt>
<dd><p>Wrapper component for a form for having the ability of validating all the elements together.</p>
</dd>
<dt><a href="#MIXIN_form-validator">MIXIN:form-validator</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#ValidateGroup">ValidateGroup</a></dt>
<dd></dd>
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
     {{input value=input focus-out=validate}}
     <p>{{errorMessage}}</p>
   {{/form-validate-field}}
{{/form-validate}}
```
<a name="MIXIN_form-validator"></a>

## MIXIN:form-validator
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value |  | Value for validation |
| form | <code>[COMPONENT:form-validate](#COMPONENT_form-validate)</code> | Instance of component form-validate. |
| validators | <code>Array.&lt;function()&gt;</code> | A group of functions to validate value by return error messages or return false as valid. |

<a name="ValidateGroup"></a>

## ValidateGroup
**Kind**: global class  

* [ValidateGroup](#ValidateGroup)
    * [new exports.ValidateGroup()](#new_ValidateGroup_new)
    * [.fields](#ValidateGroup+fields)
    * [.errors](#ValidateGroup+errors)
    * [.parseField()](#ValidateGroup+parseField)
    * [.parseGroup(fields)](#ValidateGroup+parseGroup) ⇒ <code>Array.&lt;object&gt;</code>
    * [.register(field)](#ValidateGroup+register)
    * [.unregister(field)](#ValidateGroup+unregister)
    * [.resetErrors()](#ValidateGroup+resetErrors) ⇒ <code>Array</code>
    * [.getError(field)](#ValidateGroup+getError) ⇒ <code>ValidateError</code>
    * [.validate(exitOnceError)](#ValidateGroup+validate) ⇒ <code>ValidatePromise</code>

<a name="new_ValidateGroup_new"></a>

### new exports.ValidateGroup()
ValidateGroup

<a name="ValidateGroup+fields"></a>

### validateGroup.fields
**Kind**: instance property of <code>[ValidateGroup](#ValidateGroup)</code>  
**Properties**

| Name | Type |
| --- | --- |
| fields | <code>Array.&lt;Ember.Component&gt;</code> | 

<a name="ValidateGroup+errors"></a>

### validateGroup.errors
**Kind**: instance property of <code>[ValidateGroup](#ValidateGroup)</code>  
**Properties**

| Name | Type |
| --- | --- |
| errors | <code>Array.&lt;ValidateError&gt;</code> | 

<a name="ValidateGroup+parseField"></a>

### validateGroup.parseField()
**Kind**: instance method of <code>[ValidateGroup](#ValidateGroup)</code>  
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

<a name="ValidateGroup+resetErrors"></a>

### validateGroup.resetErrors() ⇒ <code>Array</code>
**Kind**: instance method of <code>[ValidateGroup](#ValidateGroup)</code>  
**Returns**: <code>Array</code> - See [ValidateGroup.errors](ValidateGroup.errors)  
<a name="ValidateGroup+getError"></a>

### validateGroup.getError(field) ⇒ <code>ValidateError</code>
**Kind**: instance method of <code>[ValidateGroup](#ValidateGroup)</code>  

| Param | Type |
| --- | --- |
| field | <code>Ember.Component</code> | 

<a name="ValidateGroup+validate"></a>

### validateGroup.validate(exitOnceError) ⇒ <code>ValidatePromise</code>
**Kind**: instance method of <code>[ValidateGroup](#ValidateGroup)</code>  

| Param | Type |
| --- | --- |
| exitOnceError | <code>boolean</code> | 

<a name="createValidator"></a>

## createValidator(func) ⇒ <code>Array.&lt;function()&gt;</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| func | <code>function</code> | 

