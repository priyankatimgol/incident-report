var escapeHTML = require('../Utils').escapeHTML;

var domify = require('min-dom').domify;

var forEach = require('lodash/forEach');

var entryFieldDescription = require('./EntryFieldDescription');

var isList = function (list) {
  return !(!list || Object.prototype.toString.call(list) !== '[object Array]');
};

var addEmptyParameter = function (list) {
  return list.concat([{ name: '', value: '' }]);
};

var createOption = function (option) {
  return '<option value="' + option.value + '">' + option.name + '</option>';
};

/**
 * @param  {Object} options
 * @param  {string} options.id
 * @param  {string} [options.label]
 * @param  {Array<Object>} options.selectOptions
 * @param  {string} options.modelProperty
 * @param  {boolean} options.emptyParameter
 * @param  {function} options.disabled
 * @param  {function} options.hidden
 * @param  {Object} defaultParameters
 *
 * @return {Object}
 */
var selectbox = function (options, defaultParameters) {
  var resource = defaultParameters,
    label = options.label || resource.id,
    selectOptions = options.selectOptions || [
      { name: 'work', value: 'Work' },
      { name: 'incident', value: 'Incident' },
    ],
    modelProperty = options.modelProperty,
    emptyParameter = options.emptyParameter,
    canBeDisabled = !!options.disabled && typeof options.disabled === 'function',
    canBeHidden = !!options.hidden && typeof options.hidden === 'function',
    description = options.description;

  if (emptyParameter) {
    selectOptions = addEmptyParameter(selectOptions);
  }

  resource.html =
    '<label for="camunda-' +
    escapeHTML(resource.id) +
    '"' +
    (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
    (canBeHidden ? 'data-show="isHidden" ' : '') +
    '>' +
    escapeHTML(label) +
    '</label>' +
    '<select style="border-color: black;" class="k-dropdownlist k-picker  k-picker-md k-rounded-md k-picker-solid" id="camunda-' +
    escapeHTML(resource.id) +
    '-select" name="' +
    escapeHTML(modelProperty) +
    '"' +
    (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
    (canBeHidden ? 'data-show="isHidden" ' : '') +
    ' data-value>';

  if (isList(selectOptions)) {
    forEach(selectOptions, function (option) {
      resource.html +=
        '<option value="' +
        escapeHTML(option.statusId) +
        '">' +
        (option.statusDesc ? escapeHTML(option.statusDesc) : '') +
        '</option>';
    });
  }

  resource.html += '</select>';

  // add description below select box entry field
  if (description && typeof options.showCustomInput !== 'function') {
    resource.html += entryFieldDescription(description);
  }

  /**
   * Fill the select box options dynamically.
   *
   * Calls the defined function #selectOptions in the entry to get the
   * values for the options and set the value to the inputNode.
   *
   * @param {djs.model.Base} element
   * @param {HTMLElement} entryNode
   * @param {EntryDescriptor} inputNode
   * @param {Object} inputName
   * @param {Object} newValue
   */
  resource.setControlValue = function (element, entryNode, inputNode, inputName, newValue) {
    if (typeof selectOptions === 'function') {
      var options = selectOptions(element, inputNode);

      if (options) {
        // remove existing options
        while (inputNode.firstChild) {
          inputNode.removeChild(inputNode.firstChild);
        }

        // add options
        forEach(options, function (option) {
          var template = domify(createOption(option));

          inputNode.appendChild(template);
        });
      }
    }

    // set select value
    if (newValue !== undefined) {
      inputNode.value = newValue;
    }
  };

  if (canBeDisabled) {
    resource.isDisabled = function () {
      return options.disabled.apply(resource, arguments);
    };
  }

  if (canBeHidden) {
    resource.isHidden = function () {
      return !options.hidden.apply(resource, arguments);
    };
  }

  resource.cssClasses = ['bpp-dropdown'];

  return resource;
};

module.exports = selectbox;
