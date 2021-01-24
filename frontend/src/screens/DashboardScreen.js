import React from 'react';
import { Table } from 'react-bootstrap';

const DashboardScreen = () => {
  return (
    <div>
      <section className='content-header'>{/* /.container-fluid */}</section>

      {/* main body                                 */}
      <section className='container'>
        <div className='container-fluid'>
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr> */}
            </tbody>
          </Table>
        </div>
        {/* /.container-fluid */}
      </section>
    </div>
  );
};

export default DashboardScreen;
