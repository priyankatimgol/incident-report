import { FieldWrapper } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { ListBox, processListBoxDragAndDrop } from '@progress/kendo-react-listbox';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonButton from '../../../Components/Buttons/CommonButton';
import { getSectionSequence, saveSectionList } from '../api';

const NewSection = () => {
  const navigate = useNavigate();
  const param = useParams();
  const max = 20;
  const [sectionlist, setSectionlist] = useState([]);
  const isNew = param.id === 'new';
  const wfId = isNew ? '' : param.id;
  const { t } = useTranslation();
  const [error, setError] = useState({});
  const [state, setState] = useState({
    array: [],
    dragArray: [],
    draggedItem: {},
  });

  const handleDragStart = (e) => {
    setState({ ...state, draggedItem: e.dataItem });
  };

  const handleDrop = (e) => {
    let result = processListBoxDragAndDrop(
      state.dragArray,
      state.array,
      state.draggedItem,
      e.dataItem,
      'sectionid',
    );

    setState({
      ...state,
      dragArray: result.listBoxOneData,
      array: result.listBoxTwoData,
    });
  };

  const handlePage = () => {
    navigate('/manage-section-sequence');
  };

  const getData = async () => {
    try {
      const res = await getSectionSequence(wfId);
      let name = res.data?.responseObject;
      setSectionlist(name);
      setState({
        ...state,
        dragArray: res.data?.responseObject.secList.map((val, i) => ({
          sectionName: val.sectionname,
          sectionid: val.sectionid,
        })),
      });
    } catch (error) {
      console.log('error [getData]', error);
    }
  };

  const handleSavesection = async () => {
    let newData = state.dragArray?.map((val, i) => ({
      ...val,
      seqno: i + 1,
    }));
    const data = {
      wfId: sectionlist.wfId,
      wfName: sectionlist.wfName,
      secList: newData,
    };

    try {
      const res = await saveSectionList(data);
      const massage = res.data.responseMessage;
      toast.success(t(massage));
      navigate('/manage-section-sequence');
    } catch (error) {
      console.log('error [getData]', error);
    }
  };

  useEffect(() => {
    if (wfId) {
      getData(wfId);
    }
  }, []);

  const handleNameChange = (event) => {
    setSectionlist(event.value);
  };

  return (
    <>
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{'Section List'}</h3>
        </Col>
      </Row>

      <Card>
        <CardBody>
          <div className="example ">
            <div className="demo-section k-content wide">
              <Col xs={12} md={6}>
                <FieldWrapper className="gridclass">
                  <Label>{t('permit_type')}</Label>
                  <Input
                    placeholder={t('workflow_name')}
                    value={sectionlist.wfName}
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
                </FieldWrapper>
              </Col>
              <Col xs={12} md={6}>
                <div>
                  <br />
                  <ListBox
                    data={state.dragArray}
                    textField="sectionName"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                  />
                </div>
              </Col>
            </div>
          </div>
          <Row className="my-3 justify-content-end">
            <CommonButton text={t('save')} onHandleClick={handleSavesection} />
            <CommonButton fillMode="outline" text={t('cancel')} mx={2} onHandleClick={handlePage} />
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
export default NewSection;
