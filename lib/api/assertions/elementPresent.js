/**
 * Checks if the given element exists in the DOM.
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.elementPresent("#main");
 *    };
 * ```
 *
 * @method elementPresent
 * @param {string} selector The selector (CSS / Xpath) used to locate the element.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */
const util = require('util');
const Element = require('../../element/element.js');

exports.assertion = function(selector, msg) {
  this.expected = 'present';
  this.element = Element.createFromSelector(selector, this.client.locateStrategy);
  this.message = msg || util.format('Testing if element <%s> is present.', this.element);

  this.pass = function(value) {
    return value === 'present';
  };

  this.value = function(result) {
    return (result.status !== 0 || result.value.length === 0) ? 'not present' : 'present';
  };

  this.command = function(callback) {
    return this.api.elements(this.client.locateStrategy, this.element, callback);
  };
};
