// import { Step, Stepper } from '@progress/kendo-react-layout';
import {
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
  Tooltip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BiCheck } from 'react-icons/bi';
const StepperComponet = ({
  stepperValue,
  stepperData,
  workPermitData,
  stepperName,
  statusdetails,
}) => {
  const { t, i18n } = useTranslation();
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#1274ac',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#1274ac',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));
  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active
      ? {
          color: '#784af4',
          width: 25,
          height: 25,
          borderRadius: '50%',
          backgroundColor: '#1976d2',
        }
      : {
          color: '#784af4',
          width: 25,
          height: 25,
          borderRadius: '50%',
          backgroundColor: 'lightgray',
        }),
    '& .QontoStepIcon-completedIcon': {
      color: '#ffff',
      zIndex: 1,
      fontSize: 18,
      width: 25,
      height: 25,
      borderRadius: '50%',
      backgroundColor: 'rgb(25, 118, 210) !important;',
    },
    '& .QontoStepIcon-circle': {
      width: 25,
      height: 25,
      borderRadius: '50%',
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {active || completed ? (
          <BiCheck className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  const setStatus = (e) => {};
  const newarray = statusdetails.map((val) => ({
    userrole: val.roleDesc,
    username: val.displayName,
    statusname: val.statusName,
  }));

  return (
    <Stepper alternativeLabel activeStep={stepperValue} connector={<QontoConnector />}>
      {stepperData.map((label) => {
        return label.statusId === 20 && workPermitData.statusId === 22 ||
        label.statusId === 20 && workPermitData.statusId === 24 ? (
          <Step key={stepperName}>
            <StepLabel
              StepIconComponent={QontoStepIcon}
              className="font-md"
              onClick={() => setStatus(label)}
            >
              {t(stepperName)}
            </StepLabel>
          </Step>
        ) : (
          <Tooltip
            title={
              <table>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
                {statusdetails.map((val) => {
                  return (
                    <tr>
                      <td>{val.userName}</td>
                      <td>{val.roleDesc}</td>
                      <td>{val.statusName}</td>
                    </tr>
                  );
                })}
              </table>
            }
          >
            <Step key={label.statusDesc}>
              <StepLabel StepIconComponent={QontoStepIcon} className="font-md">
                {t(label.statusDesc)}
              </StepLabel>
            </Step>
          </Tooltip>
        );
      })}
    </Stepper>
  );
};

export default StepperComponet;
