import React, { Component, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getNavbarImage } from '../../actions/imageActions';
import Loader from '../Loader';
import Message from '../Message';

const PauseOnHover = () => {
  const dispatch = useDispatch();

  const imageNavbar = useSelector((state) => state.imageNavbar);
  const { loading, error, images } = imageNavbar;

  useEffect(() => {
    dispatch(getNavbarImage());
  }, [dispatch]);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Slider {...settings}>
          {images &&
            images.map((image, index) => (
              <div key={index}>
                <Link to={`/image/${image.imageId}`}>
                  <Image
                    src={image.image}
                    alt={image.imageDescription}
                    fluid
                    style={{ height: '100px' }}
                    // style={{ height: '100px', width: '100px' }}
                  />

                  {/* <Carousel.Caption className='carousel-caption'>
              <h2>{image.imageName}</h2>
            </Carousel.Caption> */}
                </Link>
              </div>
            ))}
        </Slider>
      )}
    </div>
  );
};
export default PauseOnHover;
