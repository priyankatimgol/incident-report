import Modeler from 'bpmn-js/lib/Modeler';
import { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import propertiesPanelModule from '../../../Components/package/bpmn-js-properties-panel';
import propertiesProviderModule from '../../../Components/package/bpmn-js-properties-panel/lib/provider/camunda';

import { filterBy } from '@progress/kendo-data-query';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { getPermitType } from 'Services/API/masterApi';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import FileSaver from 'file-saver';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaDownload } from 'react-icons/fa';
import { GoFileSubmodule } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonButton from '../../../Components/Buttons/CommonButton';
import { ApiGetNoAuth } from '../../../Services/API/ApiData';
import { createWorkFlow, getWorkFlow, updateWorkFlow } from '../api';
import '../style.css';

let defaultXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.3.5">
  <bpmn:process id="Process_1" isExecutable="true" />
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1" />
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

let canvas = null;
let elementRegistry = null;
let eventBus = null;
let moddle = null;
let contextPad = null;
let modeling = null;
let bpmnFactory = null;
let elementFactory = null;

const intialstate = {
  logic: 'and',
  filters: [],
};

const WorkFlow = () => {
  const [dropdownevent, setDropdownevent] = useState({
    type: 'WorkPermit',
    id: 1,
  });
  const [getpermittype, setGetpermittype] = useState([]);
  const [diagram, diagramSet] = useState('');
  const [workFlowName, setWorkFlowName] = useState('');
  const [modal, setModal] = useState({});
  const { t } = useTranslation();
  const [active, setActive] = useState(true);
  const [applicable, setApplicable] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const param = useParams();
  const location = useLocation();
  const [activeFlag, setActiveFlag] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState({});

  const isNew = param.id === 'new';
  const [applicableForValue, setApplicableForValue] = useState([]);
  const [containers, setContainers] = useState('');
  const ref = useRef(null);
  const max = 41;

  const container = document.getElementById('container');
  const [type, setType] = useState({
    type: '',
    id: '',
  });

  const handleFileSelect = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      var xmls = e.target.result;
      setContainers(xmls);
      openDiagram(modal, xmls);
    };

    reader.readAsText(file);
    setActive(false);
  };
  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  const download = async () => {
    let link = document.getElementById('downloadXML');
    var blob = new Blob([containers], {
      type: 'data:application/bpmn20-xml;charset=UTF-8',
    });
    FileSaver.saveAs(blob, 'diagram.bpmn');
  };
  const uploadFile = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      var xmls = e.target.result;
      setContainers(xmls);
      openDiagram(modal, xmls);
    };

    reader.readAsText(file);
    setActive(false);
  };

  const getModelVariables = function (modeler) {
    canvas = modeler.get('canvas');
    elementRegistry = modeler.get('elementRegistry');

    eventBus = modeler.get('eventBus');
    contextPad = modeler.get('contextPad');

    moddle = modeler.get('moddle');

    modeling = modeler.get('modeling');

    bpmnFactory = modeler.get('bpmnFactory');

    elementFactory = modeler.get('elementFactory');
  };

  const onEventHandler = async function () {
    const modeler = await getModal();
    var events = [
      'commandStack.elements.create.postExecuted',
      'commandStack.elements.delete.postExecuted',
      'commandStack.elements.move.postExecuted',
      'elements.changed',
      'element.changed',
      'element.click',
    ];
    eventBus.on([...events], function (e) {});
  };
  const openDiagram = async (modeler, xml) => {
    try {
      await modeler.importXML(xml);
      getModelVariables(modeler);
      canvas.zoom('fit-viewport');
    } catch (err) {
      container?.find('.error pre').text(err.message);
    }
  };

  const createNewDiagram = (modeler) => {
    openDiagram(modeler, diagram);
  };

  const debounce = (fn, timeout) => {
    var timer;

    return function () {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(fn, timeout);
    };
  };

  const getModal = () => {
    class CustomModeler extends Modeler {}

    CustomModeler.prototype._modules = [...Modeler.prototype._modules, propertiesProviderModule];
    return new CustomModeler({
      container: container,
      keyboard: {
        bindTo: document,
      },
      propertiesPanel: {
        parent: '#properties-panel-parent',
      },
      additionalModules: [propertiesPanelModule, propertiesProviderModule],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
    });
  };
  const getBPMNfile = async () => {
    if (diagram.length > 0) {
      const modeler = await getModal();
      setModal(modeler);
      createNewDiagram(modeler);
      var exportArtifacts = debounce(async function () {
        try {
          const { xml } = await modeler.saveXML({ format: true });
          if (xml.length > 492) {
            setActive(false);
          } else {
            setActive(true);
          }
          setContainers(xml);
          var encodedData = encodeURIComponent(xml);
        } catch (err) {}
      }, 500);

      modeler.on('commandStack.changed', exportArtifacts);
    }
  };

  const getStatus = async (id) => {
    let newdata = 'wf';
    let res = await ApiGetNoAuth(`/Master/statuslimit/${id}/${newdata}`);

    localStorage.setItem('setStatus', JSON.stringify(res.data?.responseObject));
  };

  // const getRole = async () => {
  //   let res = await ApiGetNoAuth(`/Master/roles`);
  //   localStorage.setItem('setRole', JSON.stringify(res.data?.responseObject));
  // };
  const getColumnList = async (workflowid) => {
    let res = await ApiGetNoAuth(`/Master/tblcolumn/${workflowid}`);
    localStorage.setItem('setCloumnList', JSON.stringify(res.data?.responseObject));
    localStorage.setItem('setworkflowid', workflowid);
  };

  const getPermitList = async () => {
    try {
      const res = await getPermitType();
      const newArray = res.data.responseObject.map((val) => ({
        type: val.wfType,
        id: val.wfTypeId,
      }));
      setGetpermittype(newArray);
    } catch (err) {
      console.log('err', err);
    }
  };

  const getApplicable = async (newid) => {
    await ApiGetNoAuth(`/Master/workflowtypes/${newid}`)
      .then((res) => {
        let newArr = res.data?.responseObject.map((val) => ({
          id: val.processId,
          type: val.processType,
        }));
        setApplicable(newArr);
        setDataAll(newArr);
      })
      .catch((err) => console.log('err', err));
  };

  const onChangeValue = (event) => {
    setApplicableForValue([...event.value]);
    setApplicable(dataAll);
  };
  const onChangeFilterValue = (event) => {
    if (event.filter.value) {
      setApplicable(filterBy(dataAll.slice(), event.filter));
    } else {
      setApplicable(dataAll);
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!workFlowName) {
      formIsValid = false;
      errors['workFlowName'] = t('please_enter_workflowName');
    }
    if (type.type === '') {
      formIsValid = false;
      errors['type'] = t('please_select_permit_type');
    }
    if (applicableForValue.length === 0) {
      formIsValid = false;
      errors['applicableForValue'] = t('please_select_process_type');
    }
    setError(errors);
    return formIsValid;
  };

  var numberRegex = new RegExp(/^[0-9]+$/);
  var format = new RegExp(/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g);
  const valid = () => {
    let errors = {};
    let formIsValid = true;

    if (workFlowName.length >= 40) {
      formIsValid = false;
      errors['workFlowName'] = t('workflow_name_must_be_40_character');
    }
    if (format.test(workFlowName)) {
      formIsValid = false;
      errors['workFlowName'] = t('special_characters_are_not_allowed');
    }
    if (numberRegex.test(workFlowName)) {
      formIsValid = false;
      errors['workFlowName'] = t('numbers_are_not_allowed');
    }

    setError(errors);

    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = {
      Description: workFlowName,
      Pid: applicableForValue.map((val) => ({ Pid: val.id, wptype: val.type })),
      XmlData: containers,
      wfTypeId: type.id,
    };

    try {
      if (validateForm()) {
        const res = await createWorkFlow(body);
        let message = res.data.responseMessage;
        if (res.data.responseCode === 202) {
          toast.error(t(message));
        } else if (res.data.responseCode === 402) {
          toast.error(t(message));
        } else if (res.data.responseCode === 200) {
          toast.success(t(message));
          navigate('/manage-workflow');
        }
      }
    } catch (err) {
      toast.error(t(err.title || 'workflow_creation_failed'));
    }
  };

  const handleUpdate = async () => {
    let data = {
      Description: workFlowName,
      Pid: applicableForValue.map((val) => ({ Pid: val.id, wptype: val.type })),
      XmlData: containers,
      wfTypeId: type.id,
    };
    try {
      if (validateForm()) {
        const res = await updateWorkFlow(param?.id, data);
        const massage = res.data.responseMessage;
        if (res.data.responseCode === 202) {
          toast.error(t(massage));
        }

        if (res.data.responseCode === 402) {
          toast.error(t(massage));
        } else {
          toast.success(t(massage));
          navigate('/manage-workflow');
        }
      }
    } catch (error) {
      toast.error(t(error.title || 'workflow_updation_failed'));
      console.log('error [handleUpdate]', error);
    }
  };

  useEffect(() => {
    // getRole();
    getPermitList();
  }, []);

  useEffect(() => {
    if (getpermittype[0]?.id) {
      getApplicable(getpermittype[0]?.id);
      getStatus(getpermittype[0]?.id);
      getColumnList(getpermittype[0]?.id);
    }
  }, [getpermittype[0]?.id]);

  useEffect(() => {
    getBPMNfile();
  }, [diagram]);

  const getData = async (id) => {
    try {
      await getWorkFlow(id)
        .then((res) => {
          setActiveFlag(true);
          setType({
            id: res.data.responseObject[0]?.wfTypeId,
            type: res.data.responseObject[0]?.permitType,
          });
          diagramSet(res.data.responseObject[0]?.xmldata);
          setContainers(res.data.responseObject[0]?.xmldata);
          setWorkFlowName(res.data.responseObject[0]?.wfdescription);

          const newdata = res.data.responseObject[0].pid.map((val) => ({
            id: val.pid,
            type: val.wpType,
          }));

          setApplicableForValue(newdata);
          setDropdownevent({
            type: res.data.responseObject[0]?.permitType,
          });
        })
        .catch((err) => console.log('ERROR', err));
      setActiveFlag(false);
    } catch (err) {
      console.log('err [getData]', err);
    }
  };

  useEffect(() => {
    if (param?.id === 'new') {
      diagramSet(defaultXML);
    } else {
      getData(location.state);
    }
  }, []);

  useEffect(() => {
    setDropdownevent(getpermittype[0]);
  }, [getpermittype]);

  const handlePage = () => {
    navigate('/manage-workflow');
  };
  const handleNameChange = (evt) => {
    if (valid()) {
      setWorkFlowName(evt.value);
    } else {
      setWorkFlowName(evt.value);
    }
  };

  const handlechange = (event) => {
    setDropdownevent(event.value);
    setType(event.value);
    setApplicableForValue('');
    const newid = event.value.id;
    getColumnList(newid);
    getApplicable(newid);
  };
  useEffect(() => {
    getStatus(type.id);
  }, [type.id]);

  return (
    <>
      {!activeFlag ? (
        <>
          <div>
            <Row className="align-items-end m-0">
              <Col xs={12} md={4}>
                <Label>{t('workflow_name')}</Label>
                <Input
                  placeholder={t('enter_workflow_name')}
                  value={workFlowName}
                  onChange={handleNameChange}
                  maxLength={max}
                />
                <span
                  style={{
                    color: 'red',
                    top: '5px',
                    fontSize: '10px',
                  }}
                >
                  {error['workFlowName']}
                </span>
              </Col>
              <Col xs={12} md={4}>
                <Label>{t('type')}</Label>
                <DropDownList
                  data={getpermittype}
                  onChange={handlechange}
                  value={type}
                  textField="type"
                  dataItemKey="id"
                  // defaultValue={dropdownevent}
                />
                <span
                  style={{
                    color: 'red',

                    top: '5px',
                    fontSize: '10px',
                  }}
                >
                  {error['type']}
                </span>
              </Col>
              <Col xs={12} md={4}>
                <Label>
                  {dropdownevent?.type !== undefined
                    ? `${dropdownevent?.type} Type`
                    : t('workPermit_type')}
                </Label>

                <MultiSelect
                  data={dropdownevent === 'WorkPermit' ? applicable : applicable}
                  name="applicableForValue"
                  onChange={onChangeValue}
                  onFilterChange={onChangeFilterValue}
                  value={applicableForValue}
                  placeholder={t('select_multiple_value')}
                  textField="type"
                  filterable={true}
                  dataItemKey="id"
                />
                <span
                  style={{
                    color: 'red',

                    top: '5px',
                    fontSize: '10px',
                  }}
                >
                  {error['applicableForValue']}
                </span>
              </Col>
            </Row>
          </div>

          <div className="d-flex">
            <div
              id="container"
              className="shadow"
              onDrop={handleFileSelect}
              onDragOver={handleDragOver}
              ref={ref}
              style={{
                height: '90vh',
                width: '90vw',
                position: 'relative',
                margin: '10px',
              }}
            >
              <div className="downloadBtn">
                {!active && (
                  <button className="shadowBtn" disabled={active} onClick={download}>
                    <FaDownload color="gray" />
                  </button>
                )}
                <div className="shadowBtn">
                  <label htmlFor="file" className="pointer">
                    <GoFileSubmodule color="gray" />
                  </label>
                  <input className="" type="file" id="file" hidden onChange={uploadFile} />
                </div>
              </div>
            </div>
            <div data-hide-panel={containers === ''} id="properties-panel-parent" />
          </div>
        </>
      ) : (
        ''
      )}

      {containers && (
        <div className="my-2  position-sticky bottom-0 z-9999  p-2 text-right">
          {!isNew ? (
            <CommonButton text={t('update')} mx={2} onHandleClick={handleUpdate} />
          ) : (
            <CommonButton text={t('submit')} onHandleClick={handleSubmit} mx={2} />
          )}
          <CommonButton fillMode="outline" text={t('cancel')} mx={2} onHandleClick={handlePage} />
        </div>
      )}
    </>
  );
};

export default WorkFlow;
