import { DialogActionsBar, Dialog as KendoDialog } from '@progress/kendo-react-dialogs';
import { MdClose } from 'react-icons/md';
import CommonButton from '../Buttons/CommonButton';
import '../Dialog/index.css';

const Dialog = ({ text, toggleDialog, handleDelete, setToggleDialog, img, setLoading }) => {
  const toggleChange = () => {
    setToggleDialog(!toggleDialog);
    setLoading(false);
  };
  return (
    <div>
      <KendoDialog
        title={text ? 'Please confirm' : ''}
        onClose={() => setToggleDialog(!toggleDialog)}
      >
        {img && (
          <div
            className="text-right w-100"
            style={{ position: 'absolute', top: '0px', right: '0px' }}
            onClick={() => setToggleDialog(!toggleDialog)}
          >
            <MdClose fontSize={25} className="text-primary pointer" />
          </div>
        )}
        {text ? (
          <p
            style={{
              margin: '25px',
              textAlign: 'center',
            }}
          >
            {text}
          </p>
        ) : (
          <img src={img} alt="" width={100} />
        )}
        {text && (
          <DialogActionsBar>
            <CommonButton
              text={'no'}
              showColor={false}
              className={'toogle-btn'}
              onHandleClick={toggleChange}
            />
            <CommonButton text={'yes'} onHandleClick={handleDelete} />
          </DialogActionsBar>
        )}
      </KendoDialog>
    </div>
  );
};

export default Dialog;
