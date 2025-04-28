import { DropDownList } from '@progress/kendo-react-dropdowns';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody } from '@progress/kendo-react-layout';
import Dialog from 'Components/Dialog';
import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonButton from '../../../Components/Buttons/CommonButton';
import DropZone from '../../../Components/Form/DropZone';
import {
  createPlotLocation,
  getAreaList,
  getPermitType,
  getPlotLocationData,
  getWorkFlowList,
  updatePlotLocation,
} from '../../../Services/API/masterApi';
const NewPlotLocation = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [dropdownevent, setDropdownevent] = useState({
    type: '',
    id: '',
  });
  const [getpermittype, setGetpermittype] = useState([]);
  const [unableplot, setUnablePlot] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesupload, setFilesUpload] = useState(false);
  const [processtypeid, setProcessTypeId] = useState();
  const [applicable, setApplicable] = useState([]);
  const [user, setUsers] = useState({
    name: '',
    id: '',
  });
  const [visibleWindow, setVisibleWindow] = useState(false);
  const [error, setError] = useState({});
  const isNew = param.id === 'new';
  const paramId = isNew ? '' : param?.id;
  const { t } = useTranslation();
  const [area, setArea] = useState([]);
  const [fileShow, setFileShow] = useState();

  const inputRef = useRef(null);

  const getApplicable = async (newid) => {
    try {
      const res = await getWorkFlowList(newid);
      let newArr = res.data?.responseObject.map((val) => ({
        id: val.id,
        type: val.type,
      }));
      setApplicable(newArr);
    } catch (error) {
      console.log('error [getApplicable]', error);
    }
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let file = e.dataTransfer.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setFiles([file]);
      setFilesUpload(true);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];

      let fileURL = URL.createObjectURL(file);
      console.log('file 111', fileURL);
      file.fileURL = fileURL;
      console.log('getfile handlechange', file);
      setFiles([file]);
      setFilesUpload(true);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const showImages = (value) => {
    console.log('value', value);
    setVisibleWindow(!visibleWindow);
    setFileShow(value);
  };

  const deleteImage = async (value, index) => {
    setFiles([]);
  };

  const getAreas = async (newid) => {
    try {
      const res = await getAreaList(newid);
      let newArr = res.data?.responseObject.map((val) => ({
        id: val.id,
        name: val.name,
      }));
      setArea(newArr);
    } catch (err) {}
  };

  const getPermitList = async () => {
    try {
      const res = await getPermitType();
      setGetpermittype(res.data.responseObject);
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    getPermitList();
  }, []);

  useEffect(() => {
    if (processtypeid) {
      getAreas(processtypeid);
    }
  }, [processtypeid]);

  const handleUpdate = async () => {
    // if (!filesupload) {
    const base64String = files[0].fileURL;
    const cleanedBase64String = base64String.trim().replace(/[^A-Za-z0-9+/=]/g, '');
    const binaryData = atob(cleanedBase64String);
    const blob = new Blob([binaryData], { type: 'application/octet-stream' });
    const blobUrl = URL.createObjectURL(blob);
    const fileURL = blobUrl;
    const name = files[0].name;
    const type = files[0].type;
    const response = await fetch(fileURL);
    const blobData = await response.blob();
    const convertedFile = new File([blobData], name, { type });
    convertedFile.fileURL = fileURL;
    console.log('file hnadlechange convertedFile', convertedFile);
    // }
    let formData = new FormData();
    formData.append('area_info_id', user.id);
    formData.append('type', processtypeid);
    formData.append('enable', unableplot);
    formData.append('file', filesupload ? files[0] : convertedFile);
    try {
      if (validateForm()) {
        await updatePlotLocation(formData, param?.id)
          .then(async (res) => {
            if (res.data.responseCode === 402) {
              const plotmessage = res.data.responseMessage;
              toast.error(t('plotmessage'));
            } else {
              toast.success('Plot Location Updated Successfully');
              navigate('/manage-plot-location');
            }
          })
          .catch((err) => {
            toast.error(err);
          });
        // toast.success('Plot Location Updated Successfully');
        // navigate('/manage-plot-location');
      }
    } catch (error) {
      toast.error(error.title || 'Plot Location Updated Failed');
      console.log('error [handleUpdate]', error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (user.name === '' || user.name === undefined) {
      formIsValid = false;
      errors['name'] = t('please_select_permit_area');
    }
    if (processtypeid === '' || processtypeid === undefined) {
      formIsValid = false;
      errors['type'] = t('please_select_permit_type');
    }
    if (!files.length) {
      formIsValid = false;
      errors['files'] = t('please_upload_file');
    }
    setError(errors);
    return formIsValid;
  };

  const handleSubmit = async (dataItem) => {
    try {
      if (validateForm()) {
        let formData = new FormData();
        formData.append('area_info_id', user.id);
        formData.append('type', processtypeid);
        formData.append('enable', unableplot);
        formData.append('file', files[0]);
        console.log('files[] formData', formData.type);
        await createPlotLocation(formData)
          .then(async (res) => {
            if (res.data.responseCode === 402) {
              const plotmessage = res.data.responseMessage;
              toast.error(t('plotmessage'));
            } else {
              toast.success('Plot Location Created Successfully');
              navigate('/manage-plot-location');
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    } catch (error) {
      toast.error(error.title || 'Plot Location Created Failed');
      console.log('error [handleSubmit]', error);
    }
  };
  console.log('filesfiles', files);
  const getData = async (id) => {
    try {
      const res = await getPlotLocationData(id);
      console.log('getfile', files[0]?.fileURL);
      setFiles([
        {
          fileURL: res.data.responseObject.image,
          name: res.data.responseObject.filename,
          type: res.data.responseObject.file_content_type,
        },
      ]);
      setUnablePlot(res.data.responseObject.enable);
      setUsers({
        id: res.data.responseObject.area_info_id,
        name: res.data.responseObject.area_name,
      });
      setProcessTypeId(res.data.responseObject.type);
      setDropdownevent({
        id: res.data.responseObject.type,
        type: res.data.responseObject.typeName,
      });
    } catch (error) {
      console.log('error [getData]', error);
    }
  };

  useEffect(() => {
    if (paramId) {
      getData(paramId);
    }
  }, []);

  const handlePage = () => {
    navigate('/manage-plot-location');
  };

  const handlechange = (event) => {
    setUsers('');
    setDropdownevent(event.target.value);
    setProcessTypeId(
      getpermittype.find((_) => _.wfTypeId == event.target.value.wfTypeId)?.wfTypeId,
    );
    const newid = event.target.value.wfTypeId;
    getApplicable(newid);
    getAreas(newid);
  };

  const handlechangearea = (event) => {
    setUsers(event.target.value);
  };

  const handleCheckbox = (e) => {
    setUnablePlot(e.target.value);
  };

  return (
    <>
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{t('create_plot_location')}</h3>
        </Col>
      </Row>
      <Card className="border-0 shadow">
        <CardBody>
          <Row>
            <Col xs={12} md={4}>
              <Label>{t('type')}</Label>
              <DropDownList
                data={getpermittype}
                onChange={handlechange}
                value={{
                  wfType: getpermittype.find((_) => _.wfTypeId == processtypeid)?.wfType,
                }}
                textField="wfType"
                dataItemKey="wfTypeId"
                disabled={!isNew ? true : false}
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
              <Label>{t('area_location')}</Label>
              <DropDownList
                data={area}
                value={user}
                name={user}
                onChange={handlechangearea}
                textField="name"
                dataItemKey="id"
                disabled={!isNew ? true : false}
              />
              <span
                style={{
                  color: 'red',
                  top: '5px',
                  fontSize: '10px',
                }}
              >
                {error['name']}
              </span>
            </Col>
          </Row>
          <Row className="my-2">
            <Col xs={12} md={4}>
              <FieldWrapper className="gridclass mt-2">
                <Label>{t('enable_plot_location')}</Label>
                <Checkbox className="mx-2" value={unableplot} onChange={handleCheckbox} />
                <span
                  style={{
                    color: 'red',
                    top: '5px',
                    fontSize: '10px',
                  }}
                >
                  {error['value']}
                </span>
              </FieldWrapper>
            </Col>
          </Row>
          <Row className="my-2">
            <Col xs={12} md={4}>
              <FieldWrapper className="gridclass">
                <Label>{t('upload_plot_location')}</Label>
                <Row className="my-2">
                  <Col xs={12} md={12}>
                    <DropZone
                      inputRef={inputRef}
                      dragActive={dragActive}
                      files={files}
                      showImage={showImages}
                      deleteImage={deleteImage}
                      handleChange={handleChange}
                      handleDrag={handleDrag}
                      handleDrop={handleDrop}
                      onButtonClick={onButtonClick}
                    />
                    <span
                      style={{
                        color: 'red',
                        top: '5px',
                        fontSize: '10px',
                      }}
                    >
                      {error['files']}
                    </span>
                  </Col>
                </Row>
              </FieldWrapper>
            </Col>
          </Row>

          <div className="my-3 d-flex justify-content-end">
            {!isNew ? (
              <CommonButton mx={2} z={1} text={t('Update')} onHandleClick={handleUpdate} />
            ) : (
              <CommonButton mx={2} z={1} text={t('Submit')} onHandleClick={handleSubmit} />
            )}
            <CommonButton
              fillMode="outline"
              text={t('cancel')}
              mx={2}
              z={1}
              onHandleClick={handlePage}
            />
          </div>
        </CardBody>
      </Card>
      {visibleWindow && (
        <Dialog
          toggleDialog={visibleWindow}
          setToggleDialog={setVisibleWindow}
          img={
            isNew || filesupload
              ? fileShow.fileURL
              : `data:${fileShow.type};base64,${fileShow.fileURL}`
          }
        />
      )}
    </>
  );
};
export default NewPlotLocation;
