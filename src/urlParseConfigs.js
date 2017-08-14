let instance = null;
function getUrlParseConfig() {
  function urlParseConfig() {
    let urlParseConfigs = {};
    return {
      getConfig() {
        return urlParseConfigs;
      },
      addConfig(config) {
        urlParseConfigs = Object.assign(urlParseConfigs, config);
      },
    };
  }

  if (!instance) {
    instance = urlParseConfig();
  }

  return instance;
}

export default getUrlParseConfig();

