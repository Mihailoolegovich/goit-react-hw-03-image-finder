import { React, Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Button from 'components/Button';
import propTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24820519-59aa99241bf38d02e4bce65a9';

class ImageGallery extends Component {
  state = {
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
    const prevName = prevProps.searchName;
    const newName = this.props.searchName;
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
    fetch(
      `${BASE_URL}?key=${API_KEY}&q=${newName}&image_type=photo&pretty=true&page=${pageNum}&per_page=12`
    )
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
                return {
                  id: id,
                  webformatURL: webformatURL,
                  largeImageURL: largeImageURL,
                  tags: tags,
                };
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
  render() {
    const { perPage, openModal, loader, dataModal, dataApi, dataImage } =
      this.state;

    return (
      <>
        <ul className="gallery">
          <ImageGalleryItem data={dataImage} onClick={this.addDataFromModal} />
          {openModal && (
            <Modal activeModal={this.toggleModal}>
              <img
                key={dataModal.id}
                src={dataModal.largeImageURL}
                alt={dataModal.tags}
              />
            </Modal>
          )}
        </ul>
        {loader && <Loader />}
        {dataApi.totalHits > 0 && dataApi.totalHits > perPage ? (
          <Button onClick={this.incrementPageNum} />
        ) : null}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchName: propTypes.string,
};
export default ImageGallery;
