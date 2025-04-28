import ZoomWrapper from 'Components/ZoomWrapper/ZoomWrapper/ZoomWrapper';
import { getWorkPermitLocations } from 'Pages/Incident permit/api';
import { getWorkpermitArea } from 'Services/API/masterApi';
import moment from 'moment/moment';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import ImageMarker from 'react-image-marker';
import { useNavigate } from 'react-router-dom';
import ReactToolTipLite from 'react-tooltip-lite';
import WorkPermit_Location from './WorkPermit_Location.png';
import markerPinImg from './map-pin-solid.svg';
import './style.css';
const IMG_SRC = WorkPermit_Location;

const CANVAS_WIDTH = 1300;

const MARKER_WIDTH = 12;
const MARKER_HEIGHT = 20;
const MARKER_PIN = new Image();
MARKER_PIN.src = markerPinImg;

const WorkflowTracker = (props) => {
  const {
    imgSrc = IMG_SRC,
    setMarker,
    incidentpermitID,
    incidentpermit,
    marker,
    workPermitId,
    setIsUpdating,
    disabled,
    setTabValidation,
    setSavedata,
    setSelected,
    statusId,
    locationlist,
  } = props;
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [toolTipData, settoolTipData] = useState([])
  const [show, setShow] = useState(false)
  const [image, setImage] = useState([]);
  const imageElement = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const navigate = useNavigate();
  const setImageInCanvas = (src) => {
    if (!src) throw new Error('Image source not specified');
    const ele = document.createElement('img');
    ele.src = src;
    ele.crossOrigin = 'anonymous';
    ele.onload = () => {
      imageElement.current = ele;
      const canvas = document.getElementById('workflow-tracker-canvas');
      canvasRef.current = canvas;
      const image = imageElement.current;

      const ctx = canvas.getContext('2d');
      ctxRef.current = ctx;
      ctx.textAlign = 'center';
      const imageRatio = image.height / image.width;
      canvas.width = CANVAS_WIDTH;
      canvas.height = imageRatio * canvas.width;

      ctx &&
        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          canvas.width,
          canvas.width * imageRatio,
        );
    };
  };

  useEffect(() => {
    setImageInCanvas(imgSrc);
  }, [imgSrc]);

  const drawMarkers = useCallback(() => {
    // Draw markers
    const _markers = selectedMarkers.filter((_) => _);
    for (let i = 0; i < _markers.length; i++) {
      const tempMarker = _markers[i];
      const canvas = document.getElementById('workflow-tracker-canvas');
      const context = canvas.getContext('2d');

      // Draw marker
      ctxRef.current.drawImage(
        MARKER_PIN,
        tempMarker.XPos,
        tempMarker.YPos,
        MARKER_WIDTH,
        MARKER_HEIGHT,
      );
      const markerText = tempMarker.title;

      const textMeasurements = ctxRef.current.measureText(markerText);
      ctxRef.current.fillStyle = '#424242';
      ctxRef.current.globalAlpha = 0.9;
      ctxRef.current.fillRect(
        tempMarker.XPos - textMeasurements.width / 2,
        tempMarker.YPos - 20,
        textMeasurements.width + 10,
        20,
      );
      ctxRef.current.globalAlpha = 1;

      ctxRef.current.fillStyle = '#fff';
      ctxRef.current.font = '14px sans-serif';

      ctxRef.current.fillText(
        markerText,
        tempMarker.XPos - textMeasurements.width / 2 + 5,
        tempMarker.YPos - 5,
      );
    }
  }, [selectedMarkers]);

  useEffect(() => {
    if (!ctxRef.current || !canvasRef.current) return;
    drawMarkers();
  }, [drawMarkers]);

  const mouseClicked = function (mouse) {
    const canvas = mouse.target;
    const rect = canvas.getBoundingClientRect();
    const mouseXPos = mouse.clientX - rect.left;
    const mouseYPos = mouse.clientY - rect.top;
    const _marker = {
      XPos: mouseXPos - MARKER_WIDTH / 2,
      YPos: mouseYPos - MARKER_HEIGHT,
    };
    setMarker(_marker);
  };

  useEffect(() => {
    setLoadingData(true);
    setIsUpdating(true);
    getWorkpermitArea(incidentpermit.location)
      .then((res) => {
        setImage(res.data.responseObject);
        setLoadingData(false);
        setIsUpdating(false);
        setSavedata(false);
      })
      .catch((err) => console.error(err));
  }, [incidentpermit.zone]);

  useEffect(() => {
    setTabValidation(null);
  }, []);

  useEffect(() => {
    getWorkPermitLocations(incidentpermit.location,{ incidentpermitID })
      .then((res) => {
        let newArr = res.map((val) => ({ ...val, top: val.XPos / 10, left: val.YPos / 10 }));
        setSelectedMarkers(res);
        setMarkers(newArr);
      })
      .catch((err) => console.error(err));
  }, [incidentpermitID]);

  const updateMarker = (obj) => {
    let findInx = markers.findIndex((val) => val.incidentpermitID === incidentpermitID);
    if (findInx < 0) {
      setMarkers((prev) => [
        ...prev,
        { top: obj.top, left: obj.left, title: 'Current', incidentpermitID: incidentpermitID },
      ]);
    } else {
      let newArr = markers.slice(0, findInx);

      setMarkers((prev) => [
        ...newArr,
        { top: obj.top, left: obj.left, title: 'Current', incidentpermitID: incidentpermitID },
      ]);
    }
    setMarker({ XPos: obj.top * 10, YPos: obj.left * 10 });
  };



  const CustomMarker = (element) => {

    const handleClick = () => {
      if (element.requestid != undefined) {
        const newWindow = window.open(
          `#/manage-incident/${element.requestid}`,
          '_blank',
          'noopener noreferrer',
        );
        if (newWindow) {
          newWindow.opener = null; // Optional: Set the opener of the new window to null to prevent access to the parent window
        }
        setSelected(0);
      }
    };
    const handleMouseEnter = () => {
      handleon(element);
    };

   
    const handleMouseLeave = () => {
      handleoff()
    };

    return (
      <>
        <div
          draggable="true"
          onDrop={(event) => {
            console.log(event);
          }}
          data-tip
          data-for={`component_${element.id}`}
          // className={
          //   disabled || statusId >= 17
          //     ? ` ${
          //         element.workPermitId === undefined
          //           ? element.requestid === props.workPermitId
          //             ? ''
          //             : 'gray-custom-marker'
          //           : ''
          //       }`
          //     : ` ${
          //         element.workPermitId === undefined
          //           ? !element.requestid === props.workPermitId
          //             ? 'custom-marker'
          //             : 'gray-custom-marker'
          //           : 'custom-marker'
          //       }`
          // }
     
          className={
            disabled || statusId >= 17
            ? `${
              element.statusDesc === 'Close'
              ? ''
               : element.incidentpermitID === undefined
                  ? !element.requestid === props.incidentpermitID
                    ? 'gray-custom-marker'
                    : 'gray-custom-marker'
                  : ''
              }`
            : `${
              element.statusDesc === 'Close'
              ? ''
                :element.incidentpermitID === undefined
                  ? !element.requestid === props.incidentpermitID
                    ? 'custom-marker'
                    : 'gray-custom-marker'
                  : 'custom-marker'
              }`
          
          }
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>
    
        {!element.incidentpermitID && (
        <ReactToolTipLite
        content={
          <div className="">
            <p className="m-0 font-weight-light">
              Title : <span>{element.title}</span>{' '}
            </p>
            <p className="m-0 font-weight-light">
              ValidFrom :{' '}
              <span>
                {moment(element.validFrom).format('DD-MM-YYYY hh:MM:SS')}
              </span>{' '}
            </p>
            <p className="m-0 font-weight-light">
              ValidTo :{' '}
              <span>
                {moment(element.validTo).format('DD-MM-YYYY hh:MM:SS')}
              </span>{' '}
            </p>
            <p className="m-0 font-weight-light">
              Status : <span>{element.statusDesc}</span>{' '}
            </p>
            <p className="m-0 font-weight-light">
              Asset : <span>{element.assetDesc}</span>{' '}
            </p>
            <p className="m-0 font-weight-light">
              Permit Type : <span>{element.permitType}</span>{' '}
            </p>
          </div>
        }
        eventOn="hover"
        direction="bottom"
        background="#000"
        color="#fff"
        padding="8px"
        border="#000"
        fontSize="14px"
        offset={{ left: -10 }}
      >
      <span style={{display: "none"}}>Hover</span>
      </ReactToolTipLite>
        )}
      </>
    );
  };

  const handleon=(event)=>{
    setShow(true)
    settoolTipData([event])
   }

   const handleoff=()=>{
    setShow(false)
   }

  return (
    <div className="position-relative">
        {(show && !(toolTipData[0]?.title==="Current"))? (
       <div className='position-absolute'>   
       <div className="row">
       <div className="col-4">
        <p className="m-0 font-weight-light">
          Title: <span>{toolTipData[0]?.title}</span>
        </p>
        <p className="m-0 font-weight-light">
          Incident Type: <span>{toolTipData[0]?.permitType}</span>
        </p>
      </div>
      <div className="col-5">
        <p className="m-0 font-weight-light">
          Incident Date: <span>{moment(toolTipData[0]?.incidentdate).format('DD-MM-YYYY hh:MM:SS')}</span>
        </p>
        <p className="m-0 font-weight-light">
          Location: <span>{ toolTipData[0]?.location}</span>
        </p>
      </div>
      <div className="col-3">
        <p className="m-0 font-weight-light">
          Status: <span>{toolTipData[0]?.statusDesc}</span>
        </p>
         <p className="m-0 font-weight-light">
          Asset: <span>{toolTipData[0]?.assetDesc}</span>
         </p>
           </div>
          </div>
          </div>
              ):('')}
      {image?.file_content_type ? (
        <ZoomWrapper>
          <ImageMarker
            src={`data:${image?.file_content_type};base64,${image?.image}`}
            markers={markers}
            onAddMarker={(marker) => updateMarker(marker)}
            markerComponent={CustomMarker}
            onClick={() => console.log('clieck')}
            onMouseMove={() => console.log('moyse')}
            style={{
              cursor: 'pointer',
            }}
          />
        </ZoomWrapper>
      ) : (
        <h6>Image Not Found</h6>
      )}
    </div>
  );
};

export default memo(WorkflowTracker);
