import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import { allImage, getHomeScreenImage } from '../../actions/imageActions';

const ImageCarousel = () => {
  const dispatch = useDispatch();

  const imageHomeScreen = useSelector((state) => state.imageHomeScreen);
  const { loading, error, homeScreenImages } = imageHomeScreen;

  useEffect(() => {
    dispatch(getHomeScreenImage());
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
      {homeScreenImages &&
        homeScreenImages.map((image, index) => (
          <Carousel.Item key={index}>
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
