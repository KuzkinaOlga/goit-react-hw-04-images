import { useState, useEffect } from 'react';
import Gallery from './Gallery/Gallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import imagesApi from 'service/imageService';
import Loader from './Loader/Loader';

const PER_PAGE = 12;

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async (query, page) => {
      setIsPending(true);

      try {
        const data = await imagesApi.getImages(query, page);

        setImages(images => [...images, ...data.hits]);
        setIsVisible(page < Math.ceil(data.total / PER_PAGE));
      } catch (error) {
        console.error(error);
      } finally {
        setIsPending(false);
      }
    };

    fetchImages(query, page);
  }, [page, query]);

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
      <SearchBar onSubmitBar={onSubmit} />

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
