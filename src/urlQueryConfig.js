// function to create the singleton options object that can be shared
// throughout an application
function createUrlQueryConfig() {
  // default options
  return {
    // use this history if no history is specified
    history: {
      push() {
        // eslint-disable-next-line
        console.error('No history provided to react-url-query. Please provide one via configureUrlQuery.');
      },
      replace() {
        // eslint-disable-next-line
        console.error('No history provided to react-url-query. Please provide one via configureUrlQuery.');
      },
    },
  };
}

export default createUrlQueryConfig();
