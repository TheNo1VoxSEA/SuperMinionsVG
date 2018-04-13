(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareNotification.
 */

var FlareNotificationWindow = require('./windows/flare_notification_window');
var NotificationOptions = require('./notification_options/notification_options');
var lodashIsUndefined = require('../../node_modules/lodash/lang/isUndefined');

/*:
 * @plugindesc Allows you to create notifications for player based events.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param Till Next Notification?
 * @desc How long should we wait before displaying the next notification?
 * Default: 175
 * @default 175
 *
 * @param How Long Till Notification Fade Out?
 * @desc How long before the notification fades out?
 * Default: 300
 * @default 300
 *
 * @param Should I stay at the top?
 * @desc Should the notification stay at the top?
 * Default: false
 * @default false
 *
 * @param Calulation For Fade out
 * @desc calculate how soon after fade in we should fade out.
 * Default: (175 / 2) + 50
 * @default (175 / 2) + 50
 *
 * @param Show Window?
 * @desc Do we want a window behind the text?
 * Default: true
 * @default true
 *
 * @help
 *
 * Notifications can be created easily, on the fly. Its amazing how easily they
 * can  be created. lets create one together:
 *
 * FlareNotification.notify(text, stickToTop, fadeOutNearBottom);
 *
 * - text: String, accepts short code like color and icon.
 * - StickToTop: Boolean, default false. Sticks to the top of the screen if enabled.
 * - fadeOutNearBottom: Boolean, default false. Fades out using plugin configured fade out time.
 *
 * Text with short codes must use double slash:
 *
 * FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
 *
 * The name of the window can be the same for all of your notifications if
 * you wish. We use, first in, first out concept:
 *
 * FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
 * FlareNotification.notify("\\i[8] \\c[10]Hello\\c[0]");
 * FlareNotification.notify("\\i[8] \\c[10]World\\c[0]");
 *
 * Hello World is First out then Hello and finally World.
 */

var FlareNotification = (function () {
  function FlareNotification() {
    _classCallCheck(this, FlareNotification);
  }

  _createClass(FlareNotification, null, [{
    key: 'notify',

    /**
     * Public API: Notify Window.
     *
     * Creates a window for the que.
     *
     * @param text - text for the window
     */
    value: function notify(text, stayAtTop, fadeoutTowardsBottom) {
      this._arrayOfNotifications.push({
        windowMethod: new FlareNotificationWindow(),
        text: text
      });

      var stayAtTop = false ? lodashIsUndefined(stayAtTop) : stayAtTop;
      var fadeoutTowardsBottom = false ? lodashIsUndefined(fadeoutTowardsBottom) : fadeoutTowardsBottom;

      window._windowOptions = {
        stayAtTop: stayAtTop,
        fadeoutTowardsBottom: fadeoutTowardsBottom
      };
    }

    /**
     * Private Method.
     *
     * Check if the queue array length is greator then 0.
     *
     * @return bool
     */

  }, {
    key: '_isThereAQueue',
    value: function _isThereAQueue() {
      if (this._arrayOfNotifications.length > 0) {
        return true;
      }

      return false;
    }

    /**
     * Private Methd
     *
     * Gets the queue array.
     *
     * @return Array
     */

  }, {
    key: '_getQueue',
    value: function _getQueue() {
      return this._arrayOfNotifications;
    }
  }]);

  return FlareNotification;
})();

window.FlareNotification = FlareNotification;

// Set up the options.
_NotificationOptions.createNotificationOptions();

// Do not touch or manipulate this.
FlareNotification._arrayOfNotifications = [];

// Do Not touch or manipulate this.
window._windowOptions = {};

},{"../../node_modules/lodash/lang/isUndefined":1,"./notification_options/notification_options":3,"./windows/flare_notification_window":5}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareNotification.
 */

// Plugin Options.
var FlareNotificationWindow = PluginManager.parameters('Flare-NotificationWindow');

/**
 * Notifiation Options.
 *
 * Set options such as how long till the next window and how long till
 * a window fades out after it fades in.
 */

var NotificationOptions = (function () {
  function NotificationOptions() {
    _classCallCheck(this, NotificationOptions);
  }

  _createClass(NotificationOptions, null, [{
    key: 'createNotificationOptions',
    value: function createNotificationOptions() {
      this._notificationOptions = {
        time_till_next_window: FlareNotificationWindow['Till Next Notification?'],
        fade_out_time: FlareNotificationWindow['How Long Till Notification Fade Out?'],
        stick_to_top: FlareNotificationWindow['Should I stay at the top?'],
        fade_out_calculation: FlareNotificationWindow['Calulation For Fade out'],
        show_window: FlareNotificationWindow['Show Window?']
      };
    }
  }, {
    key: 'getNotificationOptions',
    value: function getNotificationOptions() {
      return this._notificationOptions;
    }
  }]);

  return NotificationOptions;
})();

// Private global object.

window._NotificationOptions = NotificationOptions;
_NotificationOptions._notificationOptions = null;

module.exports = NotificationOptions;

},{}],4:[function(require,module,exports){
'use strict';

/**
 * @namespace FlareNotification.
 */

/**
 * Responsible for updating scene map.
 *
 * Allows us to show notifications on the map.
 */

var FlareNotificationWindow = require('../windows/flare_notification_window');

var oldSceneMapPrototypeInitializeMethod = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
  oldSceneMapPrototypeInitializeMethod.call(this);
  this._isWindowOpen = false;

  var timeTillNextwindow = _NotificationOptions.getNotificationOptions().time_till_next_window;

  if (isNaN(parseInt(timeTillNextwindow))) {
    throw new Error('Sorry but: ' + timeTillNextwindow + ' is not a number');
  }

  this._waitForWindowToClose = timeTillNextwindow;
  this._flareWindow = null;
};

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function () {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (this._waitForWindowToClose > 0) {
    this._waitForWindowToClose--;
  } else if (FlareNotification._getQueue().length > 0) {
    this.handleQueue();
  }
};

Scene_Map.prototype.handleQueue = function () {
  this.openFlareNotificationWindow();
  this.allowAnotherWindowToBeOpened(this._flareWindow);
};

Scene_Map.prototype.openFlareNotificationWindow = function () {
  if (this._flareWindow === null) {
    this._flareWindow = FlareNotification._getQueue().shift();
    this.addChild(this._flareWindow.windowMethod);
    this._flareWindow.windowMethod.open(this._flareWindow.text);
  }
};

Scene_Map.prototype.allowAnotherWindowToBeOpened = function (flareNotification) {
  this.removeChild(flareNotification);
  this._flareWindow = null;
  this._waitForWindowToClose = 75;
};

},{"../windows/flare_notification_window":5}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @namespace FlareNotification.
 */

var FlareWindowBase = require('../../flare_window_base');

/**
 * Create a notiication window.
 *
 * Responsible for creating a notification window that
 * can show various type sof notifications.
 */

var FlareNotificationWindow = (function (_FlareWindowBase) {
  _inherits(FlareNotificationWindow, _FlareWindowBase);

  function FlareNotificationWindow() {
    _classCallCheck(this, FlareNotificationWindow);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlareNotificationWindow).call(this));

    _this.initialize();
    return _this;
  }

  _createClass(FlareNotificationWindow, [{
    key: 'initialize',
    value: function initialize() {
      var width = this.windowWidth();
      var height = this.windowHeight();

      _get(Object.getPrototypeOf(FlareNotificationWindow.prototype), 'initialize', this).call(this, 0, 0, width, height);

      this.contentsOpacity = 0;
      this.opacity = 0;
      this._showCount = 0;
      this._storeShowCount = 0;
      this._fadeInFinished = false;

      this.refresh();
    }
  }, {
    key: 'windowWidth',
    value: function windowWidth() {
      return 560;
    }
  }, {
    key: 'windowHeight',
    value: function windowHeight() {
      return this.fittingHeight(1);
    }
  }, {
    key: 'update',
    value: function update() {
      _get(Object.getPrototypeOf(FlareNotificationWindow.prototype), 'update', this).call(this, this);

      if (this._showCount > 0) {
        this.updateFadeIn();

        if (window._windowOptions.stayAtTop || !_NotificationOptions.getNotificationOptions().stick_to_top) {
          this.y += 3;
        }

        this._showCount--;
      } else {
        this.updateFadeOut();
      }
    }
  }, {
    key: 'updateFadeOut',
    value: function updateFadeOut() {
      this.contentsOpacity -= 16;
    }
  }, {
    key: 'updateFadeIn',
    value: function updateFadeIn() {
      if (this.contentsOpacity === 255) {
        this._fadeInFinished = true;
      }

      if (this._fadeInFinished) {
        if (window._windowOptions.fadeoutTowardsBottom && this._showCount < this._storeShowCountHalf) {

          this.contentsOpacity -= 16;
        }
      } else {
        this.contentsOpacity += 16;
      }
    }
  }, {
    key: 'open',
    value: function open(text) {

      this.refresh(text);

      var fadeOutTime = _NotificationOptions.getNotificationOptions().fade_out_time;

      if (isNaN(parseInt(fadeOutTime))) {
        throw new Error('Sorry but: ' + fadeOutTime + ' is not a number');
      }

      this._showCount = fadeOutTime;
      this._storeShowCountHalf = Math.round(eval(_NotificationOptions.getNotificationOptions().fade_out_calculation));
    }
  }, {
    key: 'close',
    value: function close() {
      this._showCount = 0;
    }
  }, {
    key: 'refresh',
    value: function refresh(text) {
      var width = this.contentsWidth();

      if (_NotificationOptions.getNotificationOptions().show_window === "true") {
        this.drawBackground(0, 0, width, this.lineHeight());
      }

      this.flareDrawTextEx(text, 0, 0, width, 'center');
      this.resetFontSettings();
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground(x, y, width, height) {
      var colorOne = this.dimColor1();
      var ColorTwo = this.dimColor2();
      this.contents.gradientFillRect(x, y, width / 2, height, ColorTwo, colorOne);
      this.contents.gradientFillRect(x + width / 2, y, width / 2, height, colorOne, ColorTwo);
    }
  }]);

  return FlareNotificationWindow;
})(FlareWindowBase);

module.exports = FlareNotificationWindow;

},{"../../flare_window_base":6}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @namespace FlareCollection
 */

/**
 * All Flare based items use this window base.
 *
 * Flare Window Base extends the Window Base Class
 * and adds some additional generic helper methods
 * that are useful for creating windows and their contents.
 */

var FlareWindowBase = (function (_Window_Base) {
  _inherits(FlareWindowBase, _Window_Base);

  function FlareWindowBase(args) {
    _classCallCheck(this, FlareWindowBase);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FlareWindowBase).call(this, args));
  }

  /**
   * Custom drawtextEx function.
   *
   * We do not reset font settings, which is what the default method does.
   * I dont like giant text in my windows.
   *
   * It is usp to the implementor to call: this.resetFontSettings();
   */

  _createClass(FlareWindowBase, [{
    key: "flareDrawTextEx",
    value: function flareDrawTextEx(text, x, y) {
      if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        while (textState.index < textState.text.length) {
          this.processCharacter(textState);
        }
        return textState.x - x;
      } else {
        return 0;
      }
    }
  }]);

  return FlareWindowBase;
})(Window_Base);

module.exports = FlareWindowBase;

},{}]},{},[2,4]);
