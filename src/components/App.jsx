import React, { Component } from 'react';
import Gallery from './Gallery/Gallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';

class App extends Component {
  state = {
    query: '',
    page: 1,
  };
  onSubmit = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  loadMore = () => {
    console.log('clik');
    this.setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };
  render() {
    const { query, page } = this.state;
    const { onSubmit, loadMore } = this;
    return (
      <>
        <SearchBar onSubmit={onSubmit} />
        <Gallery query={query} page={page} loadMore={loadMore} />
        {query.length === 0 && <h2>Sorry. There are no images ...</h2>}
        {query.length !== 0 && <Button onClick={loadMore} />}
      </>
    );
  }
}

export default App;
