"use strict";

exports.__esModule = true;
var instance = null;
function getUrlParseConfig() {
  function urlParseConfig() {
    var urlParseConfigs = {};
    return {
      getConfig: function getConfig() {
        return urlParseConfigs;
      },
      addConfig: function addConfig(config) {
        urlParseConfigs = Object.assign(urlParseConfigs, config);
      }
    };
  }

  if (!instance) {
    instance = urlParseConfig();
  }

  return instance;
}

exports.default = getUrlParseConfig();