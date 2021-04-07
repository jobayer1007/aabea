import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import { allImage } from '../../actions/imageActions';

const ImageCarousel = () => {
  const dispatch = useDispatch();

  const imageAll = useSelector((state) => state.imageAll);
  const { loading, error, images } = imageAll;

  useEffect(() => {
    dispatch(allImage());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      pause='hover'
      className='bg-dark'
      controls={false}
      indicators={false}
      fade
    >
      {images.map((image) => (
        <Carousel.Item key={image.imageId}>
          <Link to={`/image/${image.imageId}`}>
            <Image
              src={image.image}
              alt={image.imageDescription}
              fluid
              style={{ height: '300px', width: '100%' }}
            />
            {/* <Carousel.Caption className='carousel-caption'>
              <h2>{image.imageName}</h2>
            </Carousel.Caption> */}
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
