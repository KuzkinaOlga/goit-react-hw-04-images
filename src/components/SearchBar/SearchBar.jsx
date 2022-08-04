import { useState } from 'react';

const SearchBar = ({ onSubmitBar }) => {
  const [value, setValue] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    onSubmitBar(value);
    setValue('');

    if (value.trim() === '') {
      alert('Please enter something');
      return;
    }
  };
  const search = event => {
    setValue(event.target.value);
  };

  return (
    <header className="searchbar">
      <form className="searchForm" onSubmit={onSubmit}>
        <button type="submit" className="searchForm-button">
          <span className="searchForm-button-label">Search</span>
        </button>

        <input
          value={value}
          onChange={search}
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
