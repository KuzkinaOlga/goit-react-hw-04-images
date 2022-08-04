import { Component } from 'react';

class SearchBar extends Component {
  state = {
    value: '',
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);

    if (this.state.value.trim() === '') {
      alert('Please enter something');
      return;
    }
  };
  search = ({ target: { value } }) => {
    this.setState({ value });
  };
  render() {
    const { onSubmit } = this;
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={onSubmit}>
          <button type="submit" className="searchForm-button">
            <span className="searchForm-button-label">Search</span>
          </button>

          <input
            value={this.state.value}
            onChange={this.search}
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
