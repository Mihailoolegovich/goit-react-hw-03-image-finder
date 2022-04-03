import { React } from 'react';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem';
import propTypes from 'prop-types';

const ImageGallery = ({ dataImage, addDataFromModal }) => (
  <ul className="gallery">
    <ImageGalleryItem data={dataImage} onClick={addDataFromModal} />
  </ul>
);

ImageGallery.propTypes = {
  dataImage: propTypes.array,
  addDataFromModal: propTypes.func,
};
export default ImageGallery;
