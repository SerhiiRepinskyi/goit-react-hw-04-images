import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  // Обробник для інпуту, відповідає за оновлення state Searchbar
  handleInputChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  // Викликається під час submit - пошуку
  handleSubmit = event => {
    event.preventDefault();

    // Відміняємо пошук по пустій стрічці
    if (this.state.searchQuery.trim() === '') {
      toast.error('Hello!:-) Finally enter your search query!');
      return;
    }

    // Передаємо через prop значення searchQuery в App
    this.props.onSubmit(this.state.searchQuery);

    // Очистка після submit
    // this.setState({ searchQuery: '' });
  };

  render() {
    const { handleInputChange, handleSubmit } = this;

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
            value={this.state.searchQuery}
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
