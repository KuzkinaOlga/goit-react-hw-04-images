import { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import GalleryItem from './GalleryItem/GalleryItem';

class Gallery extends Component {
  state = {
    images: [],
    status: '',
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.props;
    if (prevProps.query !== query || prevProps.page !== page) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?key=28799879-b9399141b8be01027c0bc8041&q=${query}&page=${page}&image_type=photo`
      )
        .then(res => res.json())
        .then(res =>
          this.setState(prevState => ({
            ...prevState,
            images: page === 1 ? res.hits : [...prevState.images, ...res.hits],
            status: 'success',
          }))
        );
    }
  }
  render() {
    const { images } = this.state;

    return (
      <>
        {this.state.status === 'pending' && <Loader color={'#3f51b5'} />}

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
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

export default Gallery;
