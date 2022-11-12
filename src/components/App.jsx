import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import imageMapper from 'utils/mapper';
import Button from 'components/Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages, PER_PAGE } from 'services/api';
import 'react-toastify/dist/ReactToastify.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [total, setTotal] = useState(0);

  const handleData = async (page, query) => {
    setStatus(STATUS.PENDING);
    try {
      const fetchData = await fetchImages(query, page);
      const { totalHits: total } = fetchData;
      const data = imageMapper(fetchData.hits);
      if (data.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setStatus(STATUS.REJECTED);
        return;
      }

      setImages(prevState => [...prevState, ...data]);
      setTotal(total);
      setStatus(STATUS.RESOLVED);
    } catch (error) {
      toast.error(error.message);
      setStatus(STATUS.REJECTED);
    }
  };

  useEffect(() => {
    if (query !== '') {
      handleData(page, query);
    }
  }, [page, query]);

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

  const handleOnSubmit = searchQuery => {
    if (query === searchQuery) return;
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const onCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleOnSubmit} />
      <ImageGallery images={images} showModal={setSelectedImage} />
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.REJECTED && <></>}
      {status === STATUS.RESOLVED && (
        <>
          {page <= Math.floor(total / PER_PAGE) && (
            <Button onClick={handleClick} text="Load more"></Button>
          )}
          {selectedImage && (
            <Modal
              onCloseModal={onCloseModal}
              src={selectedImage.largeImageURL}
              name={selectedImage.tags}
            />
          )}
        </>
      )}
      <ToastContainer autoClose={1000} />
    </div>
  );
};
