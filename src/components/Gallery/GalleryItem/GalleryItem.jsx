import PropTypes from 'prop-types';

const GalleryItem = ({ image, openModal }) => {
  return (
    <li onClick={() => openModal(image)} className="imageGalleryItem-image">
      <img src={image.webformatURL} alt={image.tags} />
    </li>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default GalleryItem;
