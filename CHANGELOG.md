# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)

## [0.0.1-beta.13] - 2017-03-15
### Deprecated
- Removed SERVICE:validator~ValidatorGroup.errors, since it causes too many problems(like modify property twice in one loop), and it can be accessed by reading SERVICE:validator~ValidatorGroup.fields.@each.errorMessage.

### Added
- Test cases for COMPONENT:form-validate-field about:
  - register/unregister from validator group
  - error message update triggered by validating by itself
  - error message update triggered by validating by validator group

### Changed
- Add MIXIN:form-validator.updateErrorMessage to have a debounce process of updating error message
- Rename MIXIN:form-validator._resetValidate to .resetValidate, since it is public and being used by validator group
- Fix group validate error update

## [0.0.1-beta.12] - 2017-03-14
### Changed
- Fix chaos of register/unregister fields in a group triggered by setting "disabled" & "validatorGroup" of MIXIN:form-validator

### Added
- Test cases for MIXIN:form-validator about register to/unregister from a validator group

## [0.0.1-beta.11] - 2017-01-17
### Added
- Changelog
- Travis

### Changed
- Fix modify errorMessages twice in one loop bug
