'use strict';

var properties = require('./implementation/ConditionProperties'),
  elementHelper = require('../../../helper/ElementHelper'),
  cmdHelper = require('../../../helper/CmdHelper');


module.exports = function (group, element, bpmnFactory, translate) {

  var propertiesEntry = properties(element, bpmnFactory, {
    id: 'properties',
    modelProperties: ['name', 'value'],
    labels: [translate('Rule Parameter'), translate('Condition Value')],

    getParent: function (element, node, bo) {
      return bo.extensionElements;
    },

    createParent: function (element, bo) {
      var parent = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);

      console.log("parent", bpmnFactory)
      var cmd = cmdHelper.updateBusinessObject(element, bo, { extensionElements: parent });
      return {
        cmd: cmd,
        parent: parent
      };
    }
  }, translate);

  if (propertiesEntry) {
    group.entries.push(propertiesEntry);
  }

};
