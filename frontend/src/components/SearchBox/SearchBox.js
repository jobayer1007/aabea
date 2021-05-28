import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    // if (keyword.trim()) {
    //   history.push(`/search/${keyword}`);
    // } else {
    //   history.push('/blog');
    // }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Row>
        <Form.Group as={Col} md='10'>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search..'
            // className='mr-sm-2 ml-sm-5'
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md='2'>
          <Button type='submit' variant='outline-info'>
            Search
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchBox;
