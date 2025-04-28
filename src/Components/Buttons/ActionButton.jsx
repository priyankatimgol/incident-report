import { Tooltip } from '@mui/material';

const ActionButton = ({ handleClick, icon, title }) => {
  return (
    <>
      <Tooltip title={title}>
        <button className="p-1 border-0 btn-primary-color bg-transparent " onClick={handleClick}>
          <i class={icon} aria-hidden="true"></i>
        </button>
      </Tooltip>
    </>
  );
};

export default ActionButton;
