import React, { useEffect } from 'react';
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

  const checkChapter = window.location.host.split('.')[0];

  useEffect(() => {
    dispatch(getNavbarImage(checkChapter));
  }, [dispatch]);

  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
                    style={{ width: '100%', padding: '0.2px' }}
                    className='navbarEventImage'
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
