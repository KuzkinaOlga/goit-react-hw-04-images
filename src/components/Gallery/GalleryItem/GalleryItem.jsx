import PropTypes from 'prop-types';

const GalleryItem = ({ image, openModal }) => {
  return (
    <li className="imageGalleryItem-image">
      <img
        onClick={() => openModal(image)}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default GalleryItem;
