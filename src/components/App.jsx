import React, { Component } from 'react';
import apiService from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Loader from './Loader';
import Button from './Button';

class App extends Component {
  state = {
    searchName: null,

    dataApi: [],
    dataImage: [],
    dataModal: [],

    perPage: 0,
    pageNum: 1,

    openModal: false,
    loader: false,

    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchName;
    const newName = this.state.searchName;
    const pageNumOld = prevState.pageNum;
    const { pageNum } = this.state;

    if (prevName !== newName) {
      this.setState({ loader: true });
      this.setState({ dataImage: [], perPage: 0, pageNum: 1 });

      this.fetchRequest(newName, pageNum);
    }

    if (pageNumOld !== pageNum) {
      this.setState({ loader: true });

      this.fetchRequest(newName, pageNum);
    }
  }

  fetchRequest = (newName, pageNum) => {
    apiService(newName, pageNum)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Not find ${newName}`));
      })
      .then(el => {
        this.setState({ dataApi: el });
        this.setState(prevState => ({
          dataImage: [
            ...prevState.dataImage,
            ...this.state.dataApi.hits.map(
              ({ id, webformatURL, largeImageURL, tags }) => {
                return { id, webformatURL, largeImageURL, tags };
              }
            ),
          ],
        }));
      })
      .catch(error => {
        this.setState({ error: error });
        toast.error(`${this.state.error}`);
      })
      .finally(() => {
        const { dataApi, perPage } = this.state;

        this.setState({ loader: false });

        if (dataApi.totalHits === 0) {
          return toast.error(`Error: Not find ${newName}`);
        }

        if (pageNum === 1) {
          toast.success(
            `Query "${newName}" found ${this.state.dataApi.totalHits} image`
          );
        }
        this.setState({
          perPage: perPage + dataApi.hits.length,
        });

        if (dataApi.totalHits === this.state.perPage) {
          toast.warn(`Found all photos with the name ${newName}`);
        }
      });
  };
  incrementPageNum = () => {
    this.setState(prevState => ({
      pageNum: prevState.pageNum + 1,
    }));
  };

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  addDataFromModal = id => {
    this.setState({
      dataModal: this.state.dataImage.find(el => el.id === id),
    });
    this.toggleModal();
  };

  submitForm = el => {
    this.setState({ searchName: el });
  };

  render() {
    const { perPage, openModal, loader, dataModal, dataApi, dataImage } =
      this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.submitForm} />
        <ImageGallery
          dataImage={dataImage}
          addDataFromModal={this.addDataFromModal}
        />
        {openModal && (
          <Modal activeModal={this.toggleModal}>
            <img
              key={dataModal.id}
              src={dataModal.largeImageURL}
              alt={dataModal.tags}
            />
          </Modal>
        )}

        {loader && <Loader />}
        {dataApi.totalHits > 0 && dataApi.totalHits > perPage ? (
          <Button onClick={this.incrementPageNum} />
        ) : null}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
