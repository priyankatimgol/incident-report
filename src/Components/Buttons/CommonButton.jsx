import { Button } from '@progress/kendo-react-buttons';
import './style.css';

const CommonButton = ({
  text,
  imageUrl,
  fillMode,
  onHandleClick,
  title,
  mx,
  z,
  icon,
  showColor = true,
  className = '',
  ...props
}) => {
  return (
    <Button
      type="button"
      className={`  z-${z} text-uppercase   mx-${mx} px-4 py-2  ${
        showColor && 'k-button-solid-primary'
      } ${className}  text-uppercase  mx-${mx} `}
      rounded="small"
      fillMode={fillMode}
      themeColor="primary"
      onClick={onHandleClick}
      icon={icon}
      imageUrl={imageUrl}
      title={title}
      loader="circular-stripes"
      disabled={props.loading}
      {...props}
    >
      {props.loading ? (
        <div class="spinner-border spinner-border-sm text-light " role="status">
          <span class="visually-hidden"></span>
        </div>
      ) : (
        text
      )}
    </Button>
  );
};

export default CommonButton;
