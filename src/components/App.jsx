import React, { Component } from 'react';
import Gallery from './Gallery/Gallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    isOpenModal: false,
    imageData: null,
  };

  closeModal = () => {
    this.setState({ isOpenModal: false, imageData: null });
  };
  openModal = image => {
    this.setState({ isOpenModal: true, imageData: image });
  };
  onSubmit = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  render() {
    const { query, page, imageData } = this.state;
    const { onSubmit, loadMore, openModal, closeModal } = this;
    return (
      <>
        <SearchBar onSubmit={onSubmit} />

        <Gallery
          openModal={openModal}
          query={query}
          page={page}
          loadMore={loadMore}
        />
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
