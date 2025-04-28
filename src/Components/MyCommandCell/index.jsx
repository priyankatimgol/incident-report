import ActionButton from 'Components/Buttons/ActionButton';
import { useTranslation } from 'react-i18next';
const MyCommandCell = (props) => {
  const { dataItem, state, selected, userRoleValue } = props;
  const { t, i18n } = useTranslation();
  const isNewItem = dataItem.id === undefined;
  return dataItem?.inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() => (isNewItem ? props.add(dataItem) : props.update(dataItem))}
      >
        {isNewItem ? 'Add' : 'Update'}
      </button>

      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() => (isNewItem ? props.discard(dataItem) : props.cancel(dataItem))}
      >
        {isNewItem ? 'Discard' : 'Cancel'}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <div className="d-flex">
        {props.view && (
          <ActionButton
            title={t('view')}
            handleClick={() => props.view(dataItem)}
            icon="fa fa-eye"
          />
        )}
        {selected === '1' || (
          <ActionButton
            title={t('edit')}
            handleClick={() => props.edit(dataItem)}
            icon="fa fa-sharp fa-solid fa-pencil mx-1"
          />
        )}
        {userRoleValue === true &&
          state != 'sequence' &&
          (selected === '1' || (
            <ActionButton
              title={t('remove')}
              handleClick={() => 'Confirm deleting: ' + dataItem.id && props.remove(dataItem)}
              icon="fa fa-close mx-1"
            />
          ))}
      </div>
    </td>
  );
};

export default MyCommandCell;
