import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import { allImage, getNavbarImage } from '../../actions/imageActions';

const HeaderCarousel = () => {
  const dispatch = useDispatch();

  const imageNavbar = useSelector((state) => state.imageNavbar);
  const { loading, error, images } = imageNavbar;

  useEffect(() => {
    dispatch(getNavbarImage());
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
    >
      {images &&
        images.map((image, index) => (
          <Carousel.Item key={index}>
            <Link to={`/image/${image.imageId}`}>
              <Image
                src={image.image}
                alt={image.imageDescription}
                fluid
                style={{ height: '100px' }}
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

export default HeaderCarousel;
