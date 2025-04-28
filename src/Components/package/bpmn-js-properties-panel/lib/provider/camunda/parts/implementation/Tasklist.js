var entryFactory = require('../../../../factory/EntryFactory');

var cmdHelper = require('../../../../helper/CmdHelper');

module.exports = function (element, bpmnFactory, options, translate) {
  var getBusinessObject = options.getBusinessObject;

  var isStartableInTasklistEntry = entryFactory.checkbox({
    id: 'isStartableInTasklist',
    label: translate('Trigger Email'),
    modelProperty: 'isStartableInTasklist',

    get: function (element, node) {
      var bo = getBusinessObject(element);
      var isStartableInTasklist = bo.get('camunda:isStartableInTasklist');

      return {
        isStartableInTasklist: isStartableInTasklist ? isStartableInTasklist : '',
      };
    },

    set: function (element, values) {
      var bo = getBusinessObject(element);
      return cmdHelper.updateBusinessObject(element, bo, {
        'camunda:isStartableInTasklist': !!values.isStartableInTasklist,
      });
    },
  });

  return [isStartableInTasklistEntry];
};
