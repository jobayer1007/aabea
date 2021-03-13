import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as S from './AnnouncementScreen.Styles';
import Sidebar from '../../components/Sidebar/Sidebar';

const AnnouncementScreen = () => {
  return (
    <>
      <Row className='content'>
        {/* Sidebar */}
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          id='sidebar-wrapper'
          className='mb-2'
        >
          <Sidebar />
        </Col>
        {/* Sidebar End */}
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
        >
          <S.CardDeck>
            {/* <CardColumns> */}

            <Row>
              <Col
                md={{ span: 12, order: 1 }}
                lg={{ span: 12, order: 1 }}
                // style={{ padding: 0 }}
                className='mb-2'
              >
                <Card border='primary'>
                  <Card.Header className='text-center' as='h2'>
                    <Link
                      className='btn btn-outline-info btn-sm btn-block rounded'
                      // onClick={() => setAddChapter(!addChapter)}
                    >
                      New Announcement
                    </Link>
                  </Card.Header>
                </Card>
              </Col>

              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2'
                id='all-chapter'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>All Announcements</Card.Header>
                </Card>
              </Col>
            </Row>
          </S.CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default AnnouncementScreen;
