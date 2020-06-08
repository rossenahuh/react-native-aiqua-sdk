function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import RNAiquaBase from './RNAiquaBase';
import AiquaConfigType from './RNAiquaConfigType';
import { NativeModules } from 'react-native';
var RNAiquaSdk = NativeModules.RNAiquaSdk;

var RNAiquaIOS = /*#__PURE__*/function (_RNAiquaBase) {
  _inherits(RNAiquaIOS, _RNAiquaBase);

  function RNAiquaIOS() {
    _classCallCheck(this, RNAiquaIOS);

    return _possibleConstructorReturn(this, _getPrototypeOf(RNAiquaIOS).apply(this, arguments));
  }

  _createClass(RNAiquaIOS, null, [{
    key: "configure",
    value: function configure(_ref) {
      var appId = _ref.appId,
          _ref$senderId = _ref.senderId,
          senderId = _ref$senderId === void 0 ? null : _ref$senderId,
          _ref$appGroup = _ref.appGroup,
          appGroup = _ref$appGroup === void 0 ? null : _ref$appGroup,
          _ref$isDev = _ref.isDev,
          isDev = _ref$isDev === void 0 ? false : _ref$isDev;

      _get(_getPrototypeOf(RNAiquaIOS), "configure", this).call(this, {
        appId: appId,
        senderId: senderId,
        appGroup: appGroup,
        isDev: isDev
      });

      RNAiquaSdk.onStartWithAppGroup(appId, appGroup, isDev);
    }
  }, {
    key: "setUniversalLinkDomains",
    value: function setUniversalLinkDomains() {
      var domains = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!RNAiquaIOS.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      if (Array.isArray(domains)) {
        RNAiquaSdk.setUniversalLinkDomains(domains);
      } else {
        console.warn('RNAiqua: Type of domains should be Array of string');
      }
    }
    /**
     * @param {String} token apns token value
     */

  }, {
    key: "setToken",
    value: function setToken(token) {
      if (!RNAiquaIOS.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setToken(token);
    }
  }, {
    key: "getRecommendationForModelUserToProduct",
    value: function getRecommendationForModelUserToProduct() {
      if (!RNAiquaIOS.isConfigured) {
        var err = new Error('RNAiqua: Must configure the SDK first!');
        console.warn(err);
        return Promise.reject(err);
      }

      return new Promise(function (resolve, reject) {
        RNAiquaSdk.getRecommendationForModelUserToProduct(function (error, data) {
          if (error) {
            reject(new Error('Could not fetch data'));
          } else {
            resolve(data);
          }
        });
      });
    }
    /**
     * Returns a Promise with personalized value for a key.
     * Only specific types can be used with AiquaConfigType.
     * Currently, supported type are TEXT, COLOR, IMAGE_URL and DEEPLINK.
     *
     * eg: config for home screen title
     *  RNAiqua.getPersonalizedConfig({
     *      key: 'home-title',
     *      type: AiquaConfigType.TEXT,
     *      component: this.constructor.name,
     *      defaultValue: 'Home'
     *  }).then(value => {
     *      console.log('got the response:', value);
     *  })
     *
     * @param {string} key - key for the personalized element
     * @param {string} type - One of RNAiquaConfigType
     * @param {string} component - React Component Name 'this.constructor.name'
     * @param {string} defaultValue - default value for the key
     *
     * @note: If there is no personalization, defaultValue is returned
     */

  }, {
    key: "getPersonalizedConfig",
    value: function getPersonalizedConfig(_ref2) {
      var key = _ref2.key,
          type = _ref2.type,
          component = _ref2.component,
          defaultValue = _ref2.defaultValue;

      if (!RNAiquaIOS.isConfigured) {
        var err = new Error('RNAiqua: Must configure the SDK first!');
        console.warn(err);
        return Promise.reject(err);
      }

      if (!key || !type || !component || !defaultValue || typeof key !== 'string' || typeof type !== 'string' || typeof component !== 'string' || typeof defaultValue !== 'string') {
        var _err = new Error('RNAiqua: missing/invalid params in get config! all params must be passed as string');

        console.warn(_err);
        return Promise.reject(_err);
      } // assert type


      if (!Object.values(AiquaConfigType).includes(type)) {
        var _err2 = new Error('RNAiqua: invalid config type, use one of RNAiquaConfigType');

        console.warn(_err2);
        return Promise.reject(_err2);
      }

      var context = getContextForComponent(component);
      var configSearchKey = getConfigSearchKey(key, type, context);
      RNAiquaSdk.setAIQPConfigForKey(key, type, context, defaultValue);
      return new Promise(function (resolve, reject) {
        RNAiquaSdk.getAIQPConfig(function (error, configCache) {
          if (error) {
            resolve(defaultValue);
          } else {
            if (configCache && configCache[configSearchKey]) {
              resolve(configCache[configSearchKey]);
            } else {
              resolve(defaultValue);
            }
          }
        });
      });
    }
    /**
     * Returns a Promise with Personalized values for ALL keys in a Component.
     * Only specific types can be used with AiquaConfigType.
     * Currently, supported type are TEXT, COLOR, IMAGE_URL and DEEPLINK.
     *
     * eg: config for home screen
     *  RNAiqua.getPersonalizedConfig({
     *      component: this.constructor.name,
     *      configKeys: [
     *        {key: 'key1', type: AiquaConfigType.TEXT, defaultValue: 'default1'},
     *        {key: 'key2', type: AiquaConfigType.COLOR, defaultValue: '#234FAB'},
     *        {key: 'key3', type: AiquaConfigType.IMAGE_URL, defaultValue: 'https://example.com/icon.jpg'},
     *      ]
     *  }).then(configData => {
     *      console.log('got the response:', configData);
     *  })
     *
     * @param {string} component - React Component Name 'this.constructor.name'
     * @param {object} configKeys - array of config object with key, type, defaultValue
     *
     * @note: This function is useful for all keys in a component/screen
     */

  }, {
    key: "getAllPersonalizedConfigForComponent",
    value: function getAllPersonalizedConfigForComponent(_ref3) {
      var component = _ref3.component,
          _ref3$configKeys = _ref3.configKeys,
          configKeys = _ref3$configKeys === void 0 ? [] : _ref3$configKeys;

      if (!RNAiquaIOS.isConfigured) {
        var err = new Error('RNAiqua: Must configure the SDK first!');
        console.warn(err);
        return Promise.reject(err);
      }

      if (!component || !configKeys || typeof component !== 'string' || Array.isArray(configKeys) === false) {
        var _err3 = new Error('RNAiqua: missing/invalid params in get all config! component and configKeys are required');

        console.warn(_err3);
        return Promise.reject(_err3);
      }

      var context = getContextForComponent(component);
      return new Promise(function (resolve, reject) {
        RNAiquaSdk.getAIQPConfig(function (error, configCache) {
          configKeys.forEach(function (element) {
            if (!element.key || !element.type || !element.defaultValue) {
              console.warn('Aiqua: missing param in config element: ', element);
              return;
            }

            var key = element.key,
                type = element.type,
                defaultValue = element.defaultValue;
            var configSearchKey = getConfigSearchKey(key, type, context);
            RNAiquaSdk.setAIQPConfigForKey(key, type, context, defaultValue);

            if (!error && configCache && configCache[configSearchKey]) {
              element.value = configCache[configSearchKey];
            } else {
              element.value = defaultValue;
            }
          });
          resolve(configKeys);
        });
      });
    }
  }]);

  return RNAiquaIOS;
}(RNAiquaBase); // personalization helpers


function getContextForComponent(component) {
  return RNAiquaSdk.appVersion + '``|``' + component;
}

function getConfigSearchKey(key, type, context) {
  return context + '``|``' + type + '``|``' + key;
}

export default RNAiquaIOS;