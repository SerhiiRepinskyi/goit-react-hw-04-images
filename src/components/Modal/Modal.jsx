import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ src, alt, onClick }) {
  useEffect(() => {
    const closeModal = event => {
      if (event.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [onClick]);

  function closeModal(event) {
    if (event.target === event.currentTarget) {
      onClick();
    }
  }

  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
