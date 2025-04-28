import { saveAs } from '@progress/kendo-file-saver';
import {
  Button,
  ButtonGroup,
  Toolbar,
  ToolbarItem,
  ToolbarSpacer,
} from '@progress/kendo-react-buttons';
import { Icon } from '@progress/kendo-react-common';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import { Signature } from '@progress/kendo-react-inputs';
import { LocalizationProvider } from '@progress/kendo-react-intl';
import { Label } from '@progress/kendo-react-labels';
import { Upload } from '@progress/kendo-react-upload';
import moment from 'moment';
// import { getCheckList } from 'Pages/CheckList/api';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getCheckListForPermitType, getCommentList } from '../../api';
// import './style.css';
const {
  Bold,
  dynaminButton,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  ForeColor,
  BackColor,
  CleanFormatting,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  NumberedList,
  BulletedList,
  Undo,
  Redo,
  FontSize,
  FontName,
  FormatBlock,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
  InsertFile,
  SelectAll,
  Print,
  Pdf,
  AddRowBefore,
  AddRowAfter,
  AddColumnBefore,
  AddColumnAfter,
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  MergeCells,
  SplitCell,
} = EditorTools;
const Datasignature = (props) => {
  const {
    permitId,
    dynaminButton,
    incidentpermitID,
    setFormDefinitions,
    comment,
    handleFile,
    handleComment,
    disabled,
    file,
    setFile,
    setIsUpdating,
    setTabValidation,
    setSavedata,
    error,
  } = props;

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [color, setColor] = useState('#000');
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [showUpload, setShowUpload] = useState(false);
  const [sectionlist, setSectionlist] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [imageURL, setImageURL] = useState();
  const getUniqueChecklist = (data) => {
    const formDataList = [];

    for (let i = 0; i < data.length; i++) {
      const { formData } = data[i];
      formDataList.push(...formData);
    }

    const uniqueKey = 'checklistid';
    const mapObject = new Map(formDataList.map((item) => [item[uniqueKey], item]));
    return [...mapObject.values()];
  };

  const getChecklistIdsForPermitType = async (permitId) => {
    try {
      setLoadingData(true);
      const res = await getCheckListForPermitType({ permitId });
      setSectionlist(res.data.responseObject);
      const formData = getUniqueChecklist(res.data.responseObject);
      const checklistsData = [];
      for (let i = 0; i < formData.length; i++) {
        const { checklistid, checklist } = formData[i];

        checklistsData.push({
          name: checklist,
          id: checklistid,
          formData: res,
        });
      }

      setFormDefinitions(checklistsData);
      setLoadingData(false);
      setSavedata(false);
    } catch (err) {
      setLoadingData(false);
      setSavedata(false);
      console.log('Error [getChecklistIdsForPermitType]', err);
    }
  };

  useEffect(() => {
    if (permitId) {
      getChecklistIdsForPermitType(permitId);
    }
  }, [permitId]);

  useEffect(() => {
    getList();
    setTabValidation(null);
  }, []);

  const getList = async () => {
    try {
      const res = await getCommentList(incidentpermitID);
      setCommentList(
        res.data?.responseObject?.map((val) => ({
          createdate: moment(val.createDate).format('DD-MM-YYYY HH:mm:ss'),
          name: val.userName,
          statuscondition: val.statusCondition,
          signature: val.signature,
          roledesc: val.roleDesc,
          statusname: val.statusName,
        })),
      );
      setSavedata(false);
    } catch (error) {
      setSavedata(false);
      console.log('err [getCheckList]', error);
    }
  };
  const onDrawClick = () => {
    setShowUpload(false);
  };
  const onUploadClick = () => {
    setShowUpload(true);
  };
  const revokeImageURL = () => {
    if (imageURL) {
      URL.revokeObjectURL(imageURL);
      setImageURL(undefined);
    }
  };

  // Clean up on unmount.
  useEffect(() => revokeImageURL, []);
  const readImage = (file) => {
    const reader = new FileReader();
    const onLoad = () => {
      setFile(reader.result);
      reader.removeEventListener('load', onLoad);
    };
    reader.addEventListener('load', onLoad);
    reader.readAsDataURL(file);
  };
  const onFileSelect = (e) => {
    const entry = e.affectedFiles[0];
    if (entry && entry.getRawFile) {
      const file = entry.getRawFile();
      readImage(file);
      revokeImageURL();
      setImageURL(URL.createObjectURL(file));
    }
  };
  const onSave = () => {
    if (file) {
      saveAs(file, 'signature.png');
    }
  };
  const onClear = () => {
    setFile(undefined);
    revokeImageURL();
  };

  return (
    <Row className="mb-2">
      <Col md={12} className="mx-auto px-3 pb-3">
        {dynaminButton?.length != 0 && dynaminButton != undefined ? (
          //dynaminButton[0]?.displayName != 'submit for investigation' ? (
            dynaminButton[0]?.displayName != '' ? (

            <>
              <Row>
                <Col xs={12} md={8} className="mt-3">
                  {!disabled && (
                    <>
                      <Label style={{ 'font-weight': 'bold', fontSize: '14px' }}>
                        {t('comments')}
                      </Label>
                      <br></br>
                      <Editor
                        disabled={true}
                        className="rounded"
                        tools={[
                          [Bold, Italic, Underline, Strikethrough],
                          [Subscript, Superscript],
                          ForeColor,
                          BackColor,
                          [CleanFormatting],
                          [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                          [Indent, Outdent],
                          [OrderedList, UnorderedList],
                          [NumberedList, BulletedList],
                          FontSize,
                          FontName,
                          FormatBlock,
                          [SelectAll],
                          [Undo, Redo],
                          [Link, Unlink, InsertImage, ViewHtml],
                          [InsertTable, InsertFile],
                          [Pdf, Print],
                          [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                          [DeleteRow, DeleteColumn, DeleteTable],
                          [MergeCells, SplitCell],
                        ]}
                        contentStyle={{
                          height: 100,
                        }}
                        onChange={handleComment}
                        value={comment}
                      />

                      <span style={{ color: 'red', top: '5px', fontSize: '15px' }}>
                        {error['comment']}
                      </span>
                    </>
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  {!disabled && (
                    <div className="example">
                      <div className="content-wrapper">
                        <div className="signature-wrapper mt-3">
                          <Label>{t('signature')}</Label>
                          <br></br>
                          <div className="content-wrapper">
                            <Toolbar>
                              <ToolbarItem>
                                <ButtonGroup>
                                  <Button
                                    togglable={true}
                                    selected={!showUpload}
                                    onClick={onDrawClick}
                                    icon="brush"
                                  >
                                    {t('draw')}
                                  </Button>
                                  <Button
                                    togglable={true}
                                    selected={showUpload}
                                    onClick={onUploadClick}
                                    icon="upload"
                                  >
                                    {t('upload')}
                                  </Button>
                                </ButtonGroup>
                              </ToolbarItem>
                              {showUpload && (
                                <ToolbarItem className="toolbar-tool">
                                  {t('upload_your_signature:')}
                                  <LocalizationProvider language="en-US">
                                    <Upload
                                      autoUpload={false}
                                      restrictions={{
                                        allowedExtensions: ['png', 'jpeg'],
                                      }}
                                      showFileList={false}
                                      showActionButtons={false}
                                      onAdd={onFileSelect}
                                    />
                                  </LocalizationProvider>
                                </ToolbarItem>
                              )}

                              <ToolbarSpacer />
                            </Toolbar>
                            <div className="signature-wrapper">
                              {!showUpload && (
                                <Signature
                                  value={file}
                                  onChange={handleFile}
                                  color={color}
                                  backgroundColor={backgroundColor}
                                  strokeWidth={strokeWidth}
                                  smooth={true}
                                  maximizable={true}
                                  hideLine={true}
                                />
                              )}

                              {showUpload && (
                                <>
                                  {!imageURL && (
                                    <div className="placeholder">
                                      <Icon name="image" size="xlarge" />
                                      <span>{t('please_browse_an_image_to_preview_here')}</span>
                                    </div>
                                  )}

                                  {imageURL && (
                                    <img
                                      src={imageURL}
                                      alt="KendoReact Signature uploaded image"
                                      title="Uploaded signature"
                                      draggable="false"
                                    />
                                  )}
                                </>
                              )}
                            </div>

                            <Toolbar>
                              <Button
                                icon="save"
                                themeColor="primary"
                                disabled={!file}
                                onClick={onSave}
                              >
                                {t('save')}
                              </Button>

                              <Button onClick={onClear}>{t('clear')}</Button>
                            </Toolbar>
                          </div>
                          <span style={{ color: 'red', top: '5px', fontSize: '15px' }}>
                            {error['file']}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </>
          ) : (
            ''
          )
        ) : (
          <>
            <Row>
              <Col xs={12} md={8} className="mt-3">
                {!disabled && (
                  <>
                    <Label style={{ 'font-weight': 'bold', fontSize: '14px' }}>
                      {t('comments')}
                    </Label>
                    <br></br>
                    <Editor
                      disabled={true}
                      className="rounded"
                      tools={[
                        [Bold, Italic, Underline, Strikethrough],
                        [Subscript, Superscript],
                        ForeColor,
                        BackColor,
                        [CleanFormatting],
                        [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                        [Indent, Outdent],
                        [OrderedList, UnorderedList],
                        [NumberedList, BulletedList],
                        FontSize,
                        FontName,
                        FormatBlock,
                        [SelectAll],
                        [Undo, Redo],
                        [Link, Unlink, InsertImage, ViewHtml],
                        [InsertTable, InsertFile],
                        [Pdf, Print],
                        [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                        [DeleteRow, DeleteColumn, DeleteTable],
                        [MergeCells, SplitCell],
                      ]}
                      contentStyle={{
                        height: 100,
                      }}
                      onChange={handleComment}
                      value={comment}
                    />

                    <span style={{ color: 'red', top: '5px', fontSize: '15px' }}>
                      {error['comment']}
                    </span>
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4}>
                {!disabled && (
                  <div className="example">
                    <div className="content-wrapper">
                      <div className="signature-wrapper mt-3">
                        <Label>{t('signature')}</Label>
                        <br></br>
                        <div className="content-wrapper">
                          <Toolbar>
                            <ToolbarItem>
                              <ButtonGroup>
                                <Button
                                  togglable={true}
                                  selected={!showUpload}
                                  onClick={onDrawClick}
                                  icon="brush"
                                >
                                  {t('draw')}
                                </Button>
                                <Button
                                  togglable={true}
                                  selected={showUpload}
                                  onClick={onUploadClick}
                                  icon="upload"
                                >
                                  {t('upload')}
                                </Button>
                              </ButtonGroup>
                            </ToolbarItem>
                            {showUpload && (
                              <ToolbarItem className="toolbar-tool">
                                {t('upload_your_signature:')}
                                <LocalizationProvider language="en-US">
                                  <Upload
                                    autoUpload={false}
                                    restrictions={{
                                      allowedExtensions: ['png', 'jpeg'],
                                    }}
                                    showFileList={false}
                                    showActionButtons={false}
                                    onAdd={onFileSelect}
                                  />
                                </LocalizationProvider>
                              </ToolbarItem>
                            )}

                            <ToolbarSpacer />
                          </Toolbar>
                          <div className="signature-wrapper">
                            {!showUpload && (
                              <Signature
                                value={file}
                                onChange={handleFile}
                                color={color}
                                backgroundColor={backgroundColor}
                                strokeWidth={strokeWidth}
                                smooth={true}
                                maximizable={true}
                                hideLine={true}
                              />
                            )}

                            {showUpload && (
                              <>
                                {!imageURL && (
                                  <div className="placeholder">
                                    <Icon name="image" size="xlarge" />
                                    <span>{t('please_browse_an_image_to_preview_here')}</span>
                                  </div>
                                )}

                                {imageURL && (
                                  <img
                                    src={imageURL}
                                    alt="KendoReact Signature uploaded image"
                                    title="Uploaded signature"
                                    draggable="false"
                                  />
                                )}
                              </>
                            )}
                          </div>

                          <Toolbar>
                            <Button
                              icon="save"
                              themeColor="primary"
                              disabled={!file}
                              onClick={onSave}
                            >
                              {t('save')}
                            </Button>

                            <Button onClick={onClear}>{t('clear')}</Button>
                          </Toolbar>
                        </div>
                        <span style={{ color: 'red', top: '5px', fontSize: '15px' }}>
                          {error['file']}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </>
        )}

        {commentList.map((val) => {
          return (
            <Row className="">
              <>
                <Col xs={12} md={8}>
                  <Label className="font_size14 mt-3">
                    <span className="font-weight-bold text-primary mx-1">{val.statusname}</span>{' '}
                    {t('by')} <span className="font-weight-bold text-primary mx-1">{val.name}</span>{' '}
                    {t('on_date')}{' '}
                    <span className="font-weight-bold text-primary mx-1">{val.createdate}</span>
                  </Label>

                  <div
                    className=" w-100 fix-height border k-input-solid k-rounded-md p-1"
                    dangerouslySetInnerHTML={{ __html: val.statuscondition }}
                  ></div>
                </Col>
                <Col xs={12} md={4}>
                  {/* {!disabled &&( */}
                  <div className="example">
                    <div className="content-wrapper">
                      <div className="signature-wrapper">
                        <Label className="font_size14 mt-3">{t('signature')}</Label>

                        {!showUpload && (
                          <Signature
                            disabled={true}
                            value={val.signature}
                            // onChange={handleFile}
                            color={color}
                            backgroundColor={backgroundColor}
                            strokeWidth={strokeWidth}
                            smooth={true}
                            maximizable={true}
                            hideLine={true}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                </Col>
              </>
            </Row>
          );
        })}
      </Col>
    </Row>
  );
};
export default Datasignature;
