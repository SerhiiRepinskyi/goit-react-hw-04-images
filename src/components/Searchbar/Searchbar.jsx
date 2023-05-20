import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Обробник для інпуту, відповідає за оновлення state Searchbar
  const handleInputChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  // Викликається під час submit - пошуку
  const handleSubmit = event => {
    event.preventDefault();

    // Відміняємо пошук по пустій стрічці
    if (searchQuery.trim() === '') {
      toast.error('Hello! :-)) Finally enter your search query!');
      return;
    }

    // Передаємо через prop значення searchQuery в App
    onSubmit(searchQuery);

    // Очистка після submit
    // setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
