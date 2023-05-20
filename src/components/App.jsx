import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImagesOnQuery from 'services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

export function App() {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const response = await fetchImagesOnQuery(query, page);

        if (!response.totalHits) {
          throw new Error('No data :-(');
        }

        const selectedProperties = response.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );

        // Оновлення масиву зображень (необхідно при настиканні кнопки Load more)
        setPictures(prevPictures => [...prevPictures, ...selectedProperties]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (error) {
      // console.error('Error:', error);
      // Код для обробки помилок
      toast.error('Ooops... Sorry!!! Nothing was found for your query!');
    }
  }, [error]);

  // Оновити state App за пошуковим запитом
  const handleFormSubmit = searchQuery => {
    if (query !== searchQuery) {
      resetState();
      setQuery(searchQuery);
    }
  };

  const resetState = () => {
    setQuery('');
    setPictures([]);
    setPage(1);
    setError(null);
  };

  // Завантажити наступну сторінку картинок
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const isShowGallery = pictures.length > 0 && query;
  const isShowButton = isShowGallery && !isLoading && !(pictures.length % 12);
  // const errorMessage = error
  //   ? `Ooops... Sorry!!! Nothing was found for query: "${query}"`
  //   : null;

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {isShowGallery && <ImageGallery pictures={pictures} />}
      {isShowButton && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}

      {/* {error && (
        <div>
          {errorMessage}
        </div>
      )} */}

      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
    </>
  );
}
