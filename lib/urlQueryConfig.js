'use strict';

exports.__esModule = true;
// function to create the singleton options object that can be shared
// throughout an application
function createUrlQueryConfig() {
  // default options
  return {
    // use this history if no history is specified
    history: {
      push: function push() {
        // eslint-disable-next-line
        console.error('No history provided to react-url-query. Please provide one via configureUrlQuery.');
      },
      replace: function replace() {
        // eslint-disable-next-line
        console.error('No history provided to react-url-query. Please provide one via configureUrlQuery.');
      }
    }
  };
}

exports.default = createUrlQueryConfig();