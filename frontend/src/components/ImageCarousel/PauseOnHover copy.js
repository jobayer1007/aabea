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
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div>
      <h2>Pause On Hover</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      )}
    </div>
  );
};
export default PauseOnHover;
