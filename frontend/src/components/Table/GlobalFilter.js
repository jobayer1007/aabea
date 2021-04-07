import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { Col, Form } from 'react-bootstrap';

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300);
  return (
    <>
      <Form.Row>
        {/* <Form.Group as={Col} md='4'>
          <Form.Label>Search:</Form.Label>
        </Form.Group> */}
        <Form.Group as={Col} controlId='search'>
          <Form.Control
            placeholder='Search'
            value={value || ''}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        {/* Search:{' '}
        <Form.Control
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value)}
        ></Form.Control> */}
      </Form.Row>
    </>
  );
};

export default GlobalFilter;
