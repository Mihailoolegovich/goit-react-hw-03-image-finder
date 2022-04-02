import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  state = {
    searchName: null,
  };

  submitForm = el => {
    this.setState({ searchName: el });
  };

  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.submitForm} />
        <ImageGallery searchName={this.state.searchName} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
