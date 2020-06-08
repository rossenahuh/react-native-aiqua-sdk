function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { WebView } from 'react-native-webview';
import RNAiqua from './RNAiqua';
var AIQ_JS = "window.aiqMobileSdk = {\n                    promises:{},\n                    logEvent: function(e) {\n                        try { \n                            var t = {\n                                data: JSON.parse(e),\n                                type: 'event',\n                                source: 'aiq'\n                            };\n                            window.ReactNativeWebView.postMessage(JSON.stringify(t))\n                        } catch(e){}\n                    },\n                    setCustomKey: function(e) {\n                        try {\n                            var t = {\n                                data: JSON.parse(e),\n                                type: 'profile',\n                                source: 'aiq'\n                            };\n                            window.ReactNativeWebView.postMessage(JSON.stringify(t))\n                        } catch(e){}\n                    }\n                }; true;";

var RNAiquaWebView = /*#__PURE__*/function (_React$Component) {
  _inherits(RNAiquaWebView, _React$Component);

  function RNAiquaWebView() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RNAiquaWebView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RNAiquaWebView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_messageListener", function (event) {
      var _dtStr = event.nativeEvent.data;

      try {
        var _dt = JSON.parse(_dtStr);

        var source = _dt.source;

        if (source && source === 'aiq') {
          var type = _dt.type;
          var data = _dt.data;

          if (type === 'handshake') {
            var message = "window.postMessage('aiq_ack', '*'); true;";

            _this.webref.injectJavaScript(message);
          } else if (type === 'event') {
            var eventName = data.eventName,
                parameters = data.parameters,
                vts = data.vts;

            if (eventName) {
              if (parameters) {
                if (vts) {
                  RNAiqua.logEvent(eventName, parameters, vts);
                } else {
                  RNAiqua.logEvent(eventName, parameters);
                }
              } else {
                RNAiqua.logEvent(eventName);
              }
            }
          } else if (type === 'profile') {
            var key = data.key,
                value = data.value;
            RNAiqua.setCustomKey(key, value);
          }
        } else {
          _this.props.onMessage(event);
        }
      } catch (e) {
        _this.props.onMessage(event);
      }
    });

    return _this;
  }

  _createClass(RNAiquaWebView, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          onMessage = _this$props.onMessage,
          useWebKit = _this$props.useWebKit,
          injectedJavaScript = _this$props.injectedJavaScript,
          props = _objectWithoutProperties(_this$props, ["onMessage", "useWebKit", "injectedJavaScript"]);

      return React.createElement(WebView, _extends({
        ref: function ref(r) {
          return _this2.webref = r;
        },
        useWebKit: true,
        onMessage: this._messageListener,
        injectedJavaScript: AIQ_JS + injectedJavaScript
      }, props));
    }
  }]);

  return RNAiquaWebView;
}(React.Component);

export { RNAiquaWebView as default };