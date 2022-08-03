import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ closeModal, image }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEsc);
    return () => window.removeEventListener('keydown', closeByEsc);
  }, [closeModal]);

  const hadleOnClick = () => {
    closeModal();
  };

  return (
    <div className="overlay" onClick={hadleOnClick}>
      <div className="modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
