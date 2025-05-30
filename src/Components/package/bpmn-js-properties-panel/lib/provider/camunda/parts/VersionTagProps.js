const { default: axios } = require('axios');

var entryFactory = require('../../../factory/EntryFactory'),
  cmdHelper = require('../../../helper/CmdHelper'),
  is = require('bpmn-js/lib/util/ModelUtil').is,
  getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

module.exports = function (group, element, translate) {
  var bo = getBusinessObject(element);

  if (!bo) {
    return;
  }

  if (is(element, 'bpmn:Task') || (is(element, 'bpmn:Participant') && bo.get('processRef'))) {
    var status = localStorage.getItem('setStatus');

    var versionTagEntry = entryFactory.selectBoxes({
      id: 'versionTag',
      label: translate('Status'),
      modelProperty: 'versionTag',
      selectOptions: JSON.parse(status),
    });

    // in participants we have to change the default behavior of set and get
    if (is(element, 'bpmn:Participant')) {
      versionTagEntry.get = function (element) {
        var processBo = bo.get('processRef');

        return {
          versionTag: processBo.get('camunda:versionTag'),
        };
      };

      versionTagEntry.set = function (element, values) {
        var processBo = bo.get('processRef');

        return cmdHelper.updateBusinessObject(element, processBo, {
          'camunda:versionTag': values.versionTag || undefined,
        });
      };
    }

    group.entries.push(versionTagEntry);
  }
};
