/*jshint node:true*/
module.exports = {
  normalizeEntityName: function() {},

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(options) {
    return this.addBowerPackageToProject('light-validate-js', '^0.0.1-beta.2');
  }
};
