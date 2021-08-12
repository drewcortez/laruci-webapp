import Button from './Button';
import Backdrop from './Backdrop';
import PropTypes from 'prop-types';
import styles from './ConfirmationDialog.module.scss';

const ConfirmationDialog = ({
  show,
  onCancel,
  onConfirm,
  message,
  cancelText,
  okText,
  children,
  className
}) => {
  if (show) {
    return (
      <div>
        <div className={[styles.confirmationBox, className ? className : ''].join(' ').trim()}>
          {message || 'Deseja salvar?'}
          {children}
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
        </div>
        <Backdrop />
      </div>
    );
  }
  return <div></div>;
};

ConfirmationDialog.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.string,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  className: PropTypes.string,
};

export default ConfirmationDialog;
