'use strict';

exports.__esModule = true;
exports.Encoders = exports.Decoders = exports.encodeNumericObject = exports.encodeNumericArray = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.encodeDate = encodeDate;
exports.decodeDate = decodeDate;
exports.encodeBoolean = encodeBoolean;
exports.decodeBoolean = decodeBoolean;
exports.encodeJson = encodeJson;
exports.decodeJson = decodeJson;
exports.encodeArray = encodeArray;
exports.decodeArray = decodeArray;
exports.decodeNumericArray = decodeNumericArray;
exports.encodeObject = encodeObject;
exports.decodeObject = decodeObject;
exports.decodeNumericObject = decodeNumericObject;
exports.decode = decode;
exports.encode = encode;

var _lzString = require('lz-string');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Functions for encoding and decoding values as strings.
                                                                                                                                                                                                     */

/**
 * Encodes a date as a string in YYYY-MM-DD format.
 *
 * @param {Date} date
 * @return {String} the encoded date
 */


function encodeDate(date) {
  if (date == null) {
    return date;
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
}

/**
 * Converts a date in the format 'YYYY-mm-dd...' into a proper date, because
 * new Date() does not do that correctly. The date can be as complete or incomplete
 * as necessary (aka, '2015', '2015-10', '2015-10-01').
 * It will not work for dates that have times included in them.
 *
 * @param  {String} dateString String date form like '2015-10-01'
 * @return {Date} parsed date
 */
function decodeDate(dateString) {
  if (dateString == null || !dateString.length) {
    return undefined;
  }

  var parts = dateString.split('-');
  // may only be a year so won't even have a month
  if (parts[1] != null) {
    parts[1] -= 1; // Note: months are 0-based
  } else {
    // just a year, set the month and day to the first
    parts[1] = 0;
    parts[2] = 1;
  }

  var decoded = new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(parts))))();

  if (isNaN(decoded.getTime())) {
    return undefined;
  }

  return decoded;
}

/**
 * Encodes a boolean as a string. true -> "1", false -> "0".
 *
 * @param {Boolean} bool
 * @return {String} the encoded boolean
 */
function encodeBoolean(bool) {
  if (bool === undefined) {
    return undefined;
  }

  return bool ? '1' : '0';
}

/**
 * Decodes a boolean from a string. "1" -> true, "0" -> false.
 * Everything else maps to undefined.
 *
 * @param {String} boolStr the encoded boolean string
 * @return {Boolean} the boolean value
 */
function decodeBoolean(boolStr) {
  if (boolStr === '1') {
    return true;
  } else if (boolStr === '0') {
    return false;
  }

  return undefined;
}

/**
 * Encodes anything as a JSON string.
 *
 * @param {Any} any The thing to be encoded
 * @return {String} The JSON string representation of any
 */
function encodeJson(any) {
  if (any == null) {
    return undefined;
  }

  return JSON.stringify(any);
}

/**
 * Decodes a JSON string into javascript
 *
 * @param {String} jsonStr The JSON string representation
 * @return {Any} The javascript representation
 */
function decodeJson(jsonStr) {
  if (!jsonStr) {
    return undefined;
  }

  var result = void 0;
  try {
    result = JSON.parse(jsonStr);
  } catch (e) {/* ignore errors, returning undefined */}

  return result;
}

/**
 * Encodes an array as a JSON string.
 *
 * @param {Array} array The array to be encoded
 * @return {String} The JSON string representation of array
 */
function encodeArray(array) {
  var entrySeparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';

  if (!array) {
    return undefined;
  }

  return array.join(entrySeparator);
}

/**
 * Decodes a JSON string into javascript array
 *
 * @param {String} jsonStr The JSON string representation
 * @return {Array} The javascript representation
 */
function decodeArray(arrayStr) {
  var entrySeparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';

  if (!arrayStr) {
    return undefined;
  }

  return arrayStr.split(entrySeparator).map(function (item) {
    return item === '' ? undefined : item;
  });
}

/**
 * Encodes a numeric array as a JSON string. (alias of encodeArray)
 *
 * @param {Array} array The array to be encoded
 * @return {String} The JSON string representation of array
 */
var encodeNumericArray = exports.encodeNumericArray = encodeArray;

/**
 * Decodes a JSON string into javascript array where all entries are numbers
 *
 * @param {String} jsonStr The JSON string representation
 * @return {Array} The javascript representation
 */
function decodeNumericArray(arrayStr) {
  var entrySeparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';

  var decoded = decodeArray(arrayStr, entrySeparator);

  if (!decoded) {
    return undefined;
  }

  return decoded.map(function (d) {
    return d == null ? d : +d;
  });
}

/**
 * Encode simple objects as readable strings. Currently works only for simple,
 * flat objects where values are numbers, booleans or strings.
 *
 * For example { foo: bar, boo: baz } -> "foo-bar_boo-baz"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
function encodeObject(obj) {
  if (!obj || !Object.keys(obj).length) {
    return undefined;
  }

  // return Object.keys(obj).map(key => `${key}${keyValSeparator}${obj[key]}`).join(entrySeparator);
  return (0, _lzString.compressToBase64)(JSON.stringify(obj));
}

/**
 * Decodes a simple object to javascript. Currently works only for simple,
 * flat objects where values are numbers, booleans or strings.
 *
 * For example "foo-bar_boo-baz" -> { foo: bar, boo: baz }
 *
 * @param {String} objStr The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
function decodeObject(objStr) {
  if (!objStr || !objStr.length) {
    return undefined;
  }
  var obj = {};

  /* objStr.split(entrySeparator).forEach((entryStr) => {
    const [key, value] = entryStr.split(keyValSeparator);
    obj[key] = value;
  });*/

  try {
    obj = JSON.parse((0, _lzString.decompressFromBase64)(objStr));
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }

  return obj;
}

/**
 * Encode simple objects as readable strings. Alias of encodeObject.
 *
 * For example { foo: 123, boo: 521 } -> "foo-123_boo-521"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
var encodeNumericObject = exports.encodeNumericObject = encodeObject;

/**
 * Decodes a simple object to javascript where all values are numbers.
 * Currently works only for simple, flat objects.
 *
 * For example "foo-123_boo-521" -> { foo: 123, boo: 521 }
 *
 * @param {String} objStr The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
function decodeNumericObject(objStr) {
  var keyValSeparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  var entrySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '_';

  var decoded = decodeObject(objStr, keyValSeparator, entrySeparator);

  if (!decoded) {
    return undefined;
  }

  // convert to numbers
  Object.keys(decoded).forEach(function (key) {
    decoded[key] = decoded[key] == null ? decoded[key] : +decoded[key];
  });

  return decoded;
}

/**
 * Collection of Decoders by type
 */
var Decoders = exports.Decoders = {
  number: parseFloat,
  string: function string(d) {
    return d;
  },
  object: decodeObject,
  array: decodeArray,
  json: decodeJson,
  date: decodeDate,
  boolean: decodeBoolean,
  numericObject: decodeNumericObject,
  numericArray: decodeNumericArray
};

/**
 * Generic decode function that takes a type as an argument.
 *
 * @param {String|Function} type If a function, it is used to decode, otherwise the string is
 *  the key for the decoder in the Decoders collection.
 * @param {String} encodedValue the value to decode
 * @param {Any} defaultValue The default value to use if encodedValue is undefined.
 * @return {Any} The decoded value
 */
function decode(type, encodedValue, defaultValue) {
  var decodedValue = void 0;
  if (typeof type === 'function') {
    decodedValue = type(encodedValue, defaultValue);
  } else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type.decode) {
    decodedValue = type.decode(encodedValue, defaultValue);
  } else if (encodedValue === undefined) {
    decodedValue = defaultValue;
  } else if (Decoders[type]) {
    decodedValue = Decoders[type](encodedValue, defaultValue);
  } else {
    decodedValue = encodedValue;
  }

  return decodedValue;
}

/**
 * Collection of Decoders by type
 */
var Encoders = exports.Encoders = {
  number: String,
  string: function string(d) {
    return d;
  },
  object: encodeObject,
  array: encodeArray,
  json: encodeJson,
  date: encodeDate,
  boolean: encodeBoolean,
  numericObject: encodeNumericObject,
  numericArray: encodeNumericArray
};

/**
 * Generic encode function that takes a type as an argument.
 *
 * @param {String|Function} type If a function, it is used to encode, otherwise the string is
 *  the key for the encoder in the Encoders collection.
 * @param {String} decodedValue the value to encode
 * @return {Any} The encoded value
 */
function encode(type, decodedValue) {
  var encodedValue = void 0;
  if (typeof type === 'function') {
    encodedValue = type(decodedValue);
  } else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type.encode) {
    encodedValue = type.encode(decodedValue);
  } else if (Encoders[type]) {
    encodedValue = Encoders[type](decodedValue);
  } else {
    encodedValue = decodedValue;
  }

  return encodedValue;
}