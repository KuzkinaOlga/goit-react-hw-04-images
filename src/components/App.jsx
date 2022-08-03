import React, { Component } from 'react';
import Gallery from './Gallery/Gallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import imagesApi from 'service/imageService';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isPending: false,
    isOpenModal: false,
    imageData: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      imagesApi
        .getImages(query, page)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
        })
        .catch(error => console.error(error))
        .finally(() => {
          this.setState({ isPending: false });
        });
    }
  }

  closeModal = () => {
    this.setState({ isOpenModal: false, imageData: null });
  };
  openModal = image => {
    this.setState({ isOpenModal: true, imageData: image });
  };
  onSubmit = query => {
    this.setState({
      isPending: true,
      query,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
      isPending: true,
    }));
  };

  render() {
    const { query, page, imageData, images, status } = this.state;
    const { onSubmit, loadMore, openModal, closeModal } = this;
    return (
      <>
        <SearchBar onSubmit={onSubmit} />

        <Gallery
          openModal={openModal}
          query={query}
          page={page}
          loadMore={loadMore}
          images={images}
          status={status}
        />
        {this.state.isPending && <Loader color={'#3f51b5'} />}
        {query.length === 0 && <h2>Sorry. There are no images ...</h2>}
        {query.length !== 0 && <Button onClick={loadMore} />}
        {this.state.isOpenModal && (
          <Modal closeModal={closeModal} image={imageData} />
        )}
      </>
    );
  }
}

export default App;
