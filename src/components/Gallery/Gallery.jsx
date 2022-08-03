import GalleryItem from './GalleryItem/GalleryItem';

const Gallery = ({ images, openModal }) => {
  return (
    <>
      <ul className="imageGallery">
        {images.map(image => (
          <GalleryItem openModal={openModal} key={image.id} image={image} />
        ))}
      </ul>
    </>
  );
};

export default Gallery;
