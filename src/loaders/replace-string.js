const getOptions = require('loader-utils').getOptions;

module.exports = function(str) {
  const options = getOptions(this);
  return str.replace(options.search, options.replace);
}
