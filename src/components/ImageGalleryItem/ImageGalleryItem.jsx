import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  src = '',
  alt = '',
  largeImage = '',
  isShowModal,
}) {
  const createModal = () => {
    isShowModal(largeImage, alt);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img src={src} alt={alt} onClick={createModal} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  isShowModal: PropTypes.func.isRequired,
};
