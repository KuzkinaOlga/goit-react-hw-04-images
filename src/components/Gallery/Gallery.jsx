
import Loader from '../Loader/Loader';
import GalleryItem from './GalleryItem/GalleryItem';

const Gallery = ({}) => {
    componentDidUpdate(prevProps, prevState) {
      const { query, page, images, status } = this.props
      if (prevProps.query !== query || prevProps.page !== page || prevProps.images !== images || prevProps.status !== status) {
        this.setState({ status: 'pending' })
        fetch(
          `https://pixabay.com/api/?key=28799879-b9399141b8be01027c0bc8041&q=${query}&page=${page}&image_type=photo`
        )
          .then(res => res.json())
          .then(res =>
            this.setState(prevProps => ({
              ...prevProps,
              images: page === 1 ? res.hits : [...prevProps.images, ...res.hits],
              status: 'success',
            }))
          )
    }
  }

return (
        <>
          {this.props.status === 'pending' && <Loader color={'#3f51b5'} />}

          <ul className="imageGallery">
            {images.map(image => (
              <GalleryItem
                openModal={this.props.openModal}
                key={image.id}
                image={image}
              />
            ))}
          </ul>
        </>
      )
  };


export default Gallery;
