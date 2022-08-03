import React, { useState, useEffect } from 'react';
import Gallery from './Gallery/Gallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import imagesApi from 'service/imageService';
import Loader from './Loader/Loader';

const App = () => {
  const [state, setState] = useState({
    query: '',
    page: 1,
    images: [],
    isPending: false,
    isOpenModal: false,
    imageData: null,
  });

  const { query, page, imageData, images, status, isOpenModal, isPending } =
    state;
  useEffect(() => {
    if (query === '') {
      return;
    }
    imagesApi
      .getImages(query, page)
      .then(data => {
        setState(prevState => ({
          ...prevState,
          images: [...prevState.images, ...data.hits],
        }));
      })
      .catch(error => console.error(error))
      .finally(() => {
        setState(prevState => ({ ...prevState, isPending: false }));
      });
  }, [query, page]);

  const closeModal = () => {
    setState(prevState => ({
      ...prevState,
      isOpenModal: false,
      imageData: null,
    }));
  };
  const openModal = image => {
    setState(prevState => ({
      ...prevState,
      isOpenModal: true,
      imageData: image,
    }));
  };
  const onSubmit = query => {
    setState(prevState => ({
      ...prevState,
      isPending: true,
      query,
      images: [],
      page: 1,
    }));
  };

  const loadMore = () => {
    setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
      isPending: true,
    }));
  };

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
      {isPending && <Loader color={'#3f51b5'} />}
      {query.length === 0 && <h2>Sorry. There are no images ..</h2>}
      {query.length !== 0 && <Button onClick={loadMore} />}
      {isOpenModal && <Modal closeModal={closeModal} image={imageData} />}
    </>
  );
};

export default App;
