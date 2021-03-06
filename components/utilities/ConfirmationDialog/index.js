import Button from '../Button';
import Backdrop from '../Backdrop';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const ConfirmationDialog = ({
  fixed = false,
  show,
  onCancel,
  onConfirm,
  message,
  cancelText,
  okText,
  children,
  className,
  noButtons = false,
}) => {
  if (show) {
    return (
      <div>
        <div
          className={[styles.confirmationBox, !fixed ? styles.longDialog : '', className ? className : '']
            .join(' ')
            .trim()}
        >
          {message || 'Deseja salvar?'}
          {children}
          {noButtons || (
            <span>
              {!!cancelText && (
                <Button className={styles.formButton} onClick={onCancel}>
                  {cancelText}
                </Button>
              )}
              <Button className={styles.formButton} onClick={onConfirm}>
                {okText || 'Ok'}
              </Button>
            </span>
          )}
        </div>
        <Backdrop />
      </div>
    );
  }
  return <></>;
};

ConfirmationDialog.propTypes = {
  fixed: PropTypes.bool,
  show: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.string,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  className: PropTypes.string,
  noButtons: PropTypes.bool,
};

export default ConfirmationDialog;
