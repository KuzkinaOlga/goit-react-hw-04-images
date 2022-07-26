import { Component } from 'react';

class Gallery extends Component {
  state = {
    images: [],
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.props;
    if (prevProps.query !== query || prevProps.page !== page) {
      fetch(
        `https://pixabay.com/api/?key=28799879-b9399141b8be01027c0bc8041&q=${query}&page=${page}&image_type=photo`
      )
        .then(res => res.json())
        .then(res =>
          this.setState(prevState => ({
            ...prevState,
            images: page === 1 ? res.hits : [...prevState.images, ...res.hits],
          }))
        );
    }
  }
  render() {
    const { images } = this.state;

    return (
      <ul className="imageGallery">
        {images.map(image => (
          <li className="imageGalleryItem-image" key={image.id}>
            <img src={image.webformatURL} alt={image.tags} />
          </li>
        ))}
      </ul>
    );
  }
}

export default Gallery;
