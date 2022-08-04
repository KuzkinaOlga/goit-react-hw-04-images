import React, { useState, useEffect } from 'react';
import Gallery from './Gallery/Gallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import imagesApi from 'service/imageService';
import Loader from './Loader/Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [perPage] = useState(12);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    imagesApi
      .getImages(query, page)
      .then(data => {
        setImages([...images, ...data.hits]);
        setIsVisible(page < Math.ceil(data.total / perPage));
      })
      .catch(error => console.error(error))
      .finally(() => {
        setIsPending(false);
      });
  }, [query, page, images, perPage]);

  const closeModal = () => {
    setIsOpenModal(false);
    setImageData(null);
  };
  const openModal = image => {
    setIsOpenModal(true);
    setImageData(image);
  };
  const onSubmit = query => {
    setIsPending(true);
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page => page + 1);
    setIsPending(true);
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
      />
      {isPending && <Loader color={'#3f51b5'} />}
      {images.length === 0 && <h2>Sorry. There are no images ..</h2>}
      {isVisible && <Button onClick={loadMore} />}
      {isOpenModal && <Modal closeModal={closeModal} image={imageData} />}
    </>
  );
};

export default App;
