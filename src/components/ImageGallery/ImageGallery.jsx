import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import css from './ImageGallery.module.css';

export default function ImageGallery({ pictures }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [alt, setAlt] = useState('');

  const showModal = (largeImage, alt) => {
    setIsShowModal(true);
    setLargeImage(largeImage);
    setAlt(alt);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {isShowModal && <Modal src={largeImage} alt={alt} onClick={hideModal} />}

      <ul className={css.imageGallery}>
        {pictures.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              src={webformatURL}
              alt={tags}
              largeImage={largeImageURL}
              isShowModal={showModal}
            />
          );
        })}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
};
