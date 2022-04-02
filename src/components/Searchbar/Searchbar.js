import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Searchbar.css';

class Searchbar extends Component {
  state = {
    dataInput: '',
  };

  saveFromInput = e => {
    this.setState({ dataInput: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.dataInput.trim() === '') {
      toast.error('Error: No query entered');

      return;
    }
    this.props.onSubmit(this.state.dataInput);
    this.setState({ dataInput: '' });
  };

  render() {
    const { dataInput } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button-form">
            <span className="button-form__label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            value={dataInput}
            placeholder="Search images and photos"
            onChange={this.saveFromInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
