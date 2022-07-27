import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.closeModal();
      }
    });
  }

  hadleOnClick = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <div className="overlay" onClick={this.hadleOnClick}>
        <div className="modal">
          <img
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
          />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
