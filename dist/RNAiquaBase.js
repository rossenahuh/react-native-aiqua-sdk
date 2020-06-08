function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { NativeModules, Platform } from 'react-native';
var RNAiquaSdk = NativeModules.RNAiquaSdk;

var RNAiquaBase = /*#__PURE__*/function () {
  function RNAiquaBase() {
    _classCallCheck(this, RNAiquaBase);
  }

  _createClass(RNAiquaBase, null, [{
    key: "configure",

    /**
     * Configures the SDK
     * @param {String} appId
     * @param {String} senderId - For Android
     * @param {String} appGroup - For iOS
     * @param {Boolean} isDev - For iOS
     */
    value: function configure(_ref) {
      var appId = _ref.appId,
          _ref$senderId = _ref.senderId,
          senderId = _ref$senderId === void 0 ? null : _ref$senderId,
          _ref$appGroup = _ref.appGroup,
          appGroup = _ref$appGroup === void 0 ? null : _ref$appGroup,
          _ref$isDev = _ref.isDev,
          isDev = _ref$isDev === void 0 ? false : _ref$isDev;

      if (!appId) {
        console.warn('RNAiqua: APP ID must be provided!');
        return;
      }

      RNAiquaBase.isConfigured = true;
    }
    /**
     * Set the Associated Domains for Universal links in iOS
     *
     * @param {Array} domains - The Associated Domains
     *
     * For example:
     * RNAiqua.setUniversalLinkDomains(["first.domain.com", "second.domain.com]);
     */

  }, {
    key: "setUniversalLinkDomains",
    value: function setUniversalLinkDomains(domains) {
      console.warn("'RNAiqua: setUniversalLinkDomains' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "setToken",
    value: function setToken(token) {
      console.warn("'RNAiqua: setToken' is not supported on ".concat(Platform.OS));
    }
    /**
     * Logs an event.
     * There are 6 ways to call this method:
     * 1. logEvent(eventName: string);
     * 2. logEvent(eventName: string, parameters: object);
     * 3. logEvent(eventName: string, valueToSum: number);
     * 4. logEvent(eventName: string, valueToSum: number, currency: string);
     * 5. logEvent(eventName: string, parameters: object, valueToSum: number);
     * 6. logEvent(eventName: string, parameters: object, valueToSum: number, currency: string);
     *
     * @param {String} eventName event name
     * @param {Object} eventInfo dictionary of all the parameters for the event
     * @param {Number} valueToSum monetary value associated to the event
     * @param {String} valueToSumCurrency currency code of the value to sum
     *
     */

  }, {
    key: "logEvent",
    value: function logEvent() {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      if (arguments.length === 1) {
        return RNAiquaSdk.logEvent.apply(RNAiquaSdk, arguments);
      }

      if (arguments.length === 2) {
        if (_typeof(arguments.length <= 1 ? undefined : arguments[1]) === 'object') {
          return RNAiquaSdk.logEventWithParameters.apply(RNAiquaSdk, arguments);
        }

        if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'number') {
          return RNAiquaSdk.logEventWithValueToSum.apply(RNAiquaSdk, arguments);
        }
      }

      if (arguments.length === 3) {
        if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'number' && typeof (arguments.length <= 2 ? undefined : arguments[2]) === 'string') {
          return RNAiquaSdk.logEventWithValueToSumAndCurrency.apply(RNAiquaSdk, arguments);
        }

        if (_typeof(arguments.length <= 1 ? undefined : arguments[1]) === 'object' && typeof (arguments.length <= 2 ? undefined : arguments[2]) === 'number') {
          return RNAiquaSdk.logEventWithParametersAndValueToSum.apply(RNAiquaSdk, arguments);
        }
      }

      if (arguments.length === 4) {
        return RNAiquaSdk.logEventWithParametersAndValueToSumAndCurrency.apply(RNAiquaSdk, arguments);
      }
    }
    /**
     * Hides In-App Campaign.
     * @param {Boolean} disable
     */

  }, {
    key: "disableInAppCampaigns",
    value: function disableInAppCampaigns(disable) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.disableInAppCampaigns(disable);
    }
    /**
     * Uploads queued data to the QGraph server.
     * By default, queued data is flushed to the QGraph servers every 15 seconds
     * (the default for flushInterval). You only need to call this method
     * manually if you want to force a flush at a particular moment.
     */

  }, {
    key: "flush",
    value: function flush() {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.flush();
    }
    /**
     * @param {String} userId unique id of the user
     */

  }, {
    key: "setUserId",
    value: function setUserId(userId) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setUserId(userId);
    }
    /**
     * @param {String} name first name of user
     */

  }, {
    key: "setName",
    value: function setName(name) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setName(name);
    }
    /**
     * @param {String} firstName first name of user
     */

  }, {
    key: "setFirstName",
    value: function setFirstName(firstName) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setFirstName(firstName);
    }
    /**
     * @param {String} lastName last name of the user
     */

  }, {
    key: "setLastName",
    value: function setLastName(lastName) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setLastName(lastName);
    }
    /**
     * @param {String} city city of the user
     */

  }, {
    key: "setCity",
    value: function setCity(city) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setCity(city);
    }
    /**
     * @param {String} email email of the user
     */

  }, {
    key: "setEmail",
    value: function setEmail(email) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setEmail(email);
    }
    /**
     * @param {Number} day day in birthday of user
     */

  }, {
    key: "setDayOfBirth",
    value: function setDayOfBirth(day) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setDayOfBirth(day);
    }
    /**
     * @param {Number} month month in birthday of user
     */

  }, {
    key: "setMonthOfBirth",
    value: function setMonthOfBirth(month) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setMonthOfBirth(month);
    }
    /**
     * @param {Number} year year in birthday of user
     */

  }, {
    key: "setYearOfBirth",
    value: function setYearOfBirth(year) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setYearOfBirth(year);
    }
    /**
     * Sets specified custom fields
     * @param {String} key
     * @param value boolean, string, or number
     */

  }, {
    key: "setCustomKey",
    value: function setCustomKey(key, value) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setCustomKey(key, value);
    }
    /**
     * Sets the View Through Attribution Window for event attribution.
     * This method should be used to set the View through attribution window.
     * View through attribution works only for InApp notifications.
     * Default to 1 hr (3600 secs).
     *
     * eg: for view through attribution window to be 2 hrs, pass the value: 7200
     * @note Pass seconds as '0' to disable view through attribution
     * @param {Number} seconds attribution window time in seconds
     */

  }, {
    key: "setAttributionWindow",
    value: function setAttributionWindow(seconds) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setAttributionWindow(seconds);
    }
    /**
     * This method should be used to set the click through attribution window.
     * Click through works for push notification (sent by QGraph) clicks and
     * InApp Notification clicks.
     * Default to 24 hrs (86400 secs).
     *
     * eg: for click attribution window to be 12 hrs, pass the value: 43200
     * @note Pass seconds as '0' to disable click attribution
     * @param {Number} seconds attribution window time in seconds
     */

  }, {
    key: "setClickAttributionWindow",
    value: function setClickAttributionWindow(seconds) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setClickAttributionWindow(seconds);
    }
  }, {
    key: "setPhoneNumber",
    value: function setPhoneNumber(phoneNo) {
      console.warn("'RNAiqua: setPhoneNumber' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "enableGATrackingWithGAID",
    value: function enableGATrackingWithGAID(gaID) {
      console.warn("'enableGATrackingWithGAID' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "enablePushBooster",
    value: function enablePushBooster() {
      console.warn("'RNAiqua: enablePushBooster' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "disableGATracking",
    value: function disableGATracking() {
      console.warn("'RNAiqua: disableGATracking' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "getTrackerId",
    value: function getTrackerId(callback) {
      console.warn("'RNAiqua: getTrackerId' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "disableLocationTracking",
    value: function disableLocationTracking() {
      console.warn("'disableLocationTracking' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "isQGMessage",
    value: function isQGMessage(message, callback) {
      console.warn("'RNAiqua: isQGMessage' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "setMaxNumStoredNotifications",
    value: function setMaxNumStoredNotifications(maxNumStoredNotifications) {
      console.warn("'setMaxNumStoredNotifications' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "getStoredNotifications",
    value: function getStoredNotifications(callback) {
      console.warn("'RNAiqua: getStoredNotifications' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "deleteStoredNotifications",
    value: function deleteStoredNotifications() {
      console.warn("'RNAiqua: deleteStoredNotifications' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "setUtmSource",
    value: function setUtmSource(utmSource) {
      console.warn("'RNAiqua: setUtmSource' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "setUtmMedium",
    value: function setUtmMedium(utmMedium) {
      console.warn("'RNAiqua: setUtmMedium' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "setUtmTerm",
    value: function setUtmTerm(utmTerm) {
      console.warn("'RNAiqua: setUtmTerm' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "setUtmContent",
    value: function setUtmContent(utmContent) {
      console.warn("'RNAiqua: setUtmContent' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "setUtmCampaign",
    value: function setUtmCampaign(utmCampaign) {
      console.warn("'RNAiqua: setUtmCampaign' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "getRecommendationForModelUserToProduct",
    value: function getRecommendationForModelUserToProduct() {
      console.warn("'RNAiqua: getRecommendationForModelUserToProduct' is not supported on ".concat(Platform.OS));
    }
    /**
     * This method should be used to enable or disable personalization.
     * Personalization is enabled by default.
     * Disabling it won't fetch personalization data
     *
     * eg: to disable pass 'true' and to enable again 'false'
     * RNAiqua.setPersonalizationDisabledStatus(true)
     *
     * @param {Boolean} status
     */

  }, {
    key: "setPersonalizationDisabledStatus",
    value: function setPersonalizationDisabledStatus(status) {
      if (!RNAiquaBase.isConfigured) {
        console.warn('RNAiqua: Must configure the SDK first!');
        return;
      }

      RNAiquaSdk.setPersonalizationDisabledStatus(status);
    }
  }, {
    key: "getPersonalizedConfig",
    value: function getPersonalizedConfig(_ref2) {
      var key = _ref2.key,
          type = _ref2.type,
          component = _ref2.component,
          defaultValue = _ref2.defaultValue;
      console.warn("'RNAiqua: setPersonalizationDisabledStatus' is not supported on ".concat(Platform.OS));
    }
  }, {
    key: "getAllPersonalizedConfigForComponent",
    value: function getAllPersonalizedConfigForComponent(_ref3) {
      var component = _ref3.component,
          _ref3$configKeys = _ref3.configKeys,
          configKeys = _ref3$configKeys === void 0 ? [] : _ref3$configKeys;
      console.warn("'RNAiqua: setPersonalizationDisabledStatus' is not supported on ".concat(Platform.OS));
    }
  }]);

  return RNAiquaBase;
}();

RNAiquaBase.isConfigured = false;
export default RNAiquaBase;