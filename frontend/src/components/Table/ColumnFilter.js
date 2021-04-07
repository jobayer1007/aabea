import React from 'react';
import { Col, Form } from 'react-bootstrap';

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <>
      <Form.Row>
        {/* <Form.Group as={Col} md='4'>
          <Form.Label>Search:</Form.Label>
        </Form.Group> */}
        <Form.Group as={Col} controlId='searchByColumn'>
          <Form.Control
            placeholder='Search'
            value={filterValue || ''}
            onChange={(e) => setFilter(e.target.value)}
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

export default ColumnFilter;
