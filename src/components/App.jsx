import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImagesOnQuery from 'services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

export class App extends Component {
  state = {
    query: '',
    pictures: [],
    page: 1,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.uploadImages();
    }
  }

  async uploadImages() {
    this.setState({ isLoading: true });

    try {
      // const { totalHits, hits } = await fetchImagesOnQuery(
      //   this.state.query,
      //   this.state.page
      // );
      const responseApi = await fetchImagesOnQuery(
        this.state.query,
        this.state.page
      );

      if (!responseApi.totalHits) {
        toast.error(
          `Ooops... Sorry!!! Nothing was found for query: "${this.state.query}"`
        );
        throw new Error('No data :-(');
      }

      const selectedProperties = responseApi.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        }
      );

      // Оновлення масиву зображень (необхідно при настиканні кнопки Load more)
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...selectedProperties],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  // Оновити state App за пошуковим запитом
  handleFormSubmit = searchQuery => {
    if (this.state.query !== searchQuery) {
      this.setState({ query: searchQuery, pictures: [], page: 1 });
    }
  };

  // Завантажити наступну сторінку картинок
  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { query, pictures, page, isLoading } = this.state;
    const isShowGallery = pictures.length > 0 && query;
    const isShowButton = isShowGallery && !isLoading && !(pictures.length % 12);

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isShowGallery && <ImageGallery pictures={pictures} page={page} />}
        {isShowButton && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}

        <ToastContainer autoClose={2500} position="top-center" />
      </>
    );
  }
}
