import React, { useEffect } from 'react';
import { Col, Row, Card, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allAnnouncements } from '../../actions/announcementAction';
import { allMission } from '../../actions/missionActions';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import parse from 'html-react-parser';
import { allVission } from '../../actions/vissionActions';
import { allHistory } from '../../actions/historyActions';
import { allCMembers } from '../../actions/committeeActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const announcementAll = useSelector((state) => state.announcementAll);
  const { loading, error, announcements } = announcementAll;

  const missionAll = useSelector((state) => state.missionAll);
  const { loading: missionLoading, error: missionError, missions } = missionAll;

  const vissionAll = useSelector((state) => state.vissionAll);
  const { loading: vissionLoading, error: vissionError, vissions } = vissionAll;

  const historyAll = useSelector((state) => state.historyAll);
  const {
    loading: historyLoading,
    error: historyError,
    histories,
  } = historyAll;

  const cMemberAll = useSelector((state) => state.cMemberAll);
  const {
    loading: cMemeberLoading,
    error: cMemberError,
    cMembers,
  } = cMemberAll;

  useEffect(() => {
    dispatch(allAnnouncements());
    dispatch(allMission());
    dispatch(allVission());
    dispatch(allHistory());
    dispatch(allCMembers());
  }, [dispatch]);
  // console.log(cMembers);
  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, order: 1 }} lg={{ span: 3, order: 1 }}>
          <Card className='mb-2'>
            <Card.Header className='text-info' as='h5'>
              Announcements
            </Card.Header>

            <>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <ListGroup variant='flush'>
                  {announcements.map((announcement, index) => (
                    <ListGroup.Item key={index}>
                      <Link
                        to={`/announcements/${announcement.announcementId}`}
                      >
                        <span className='text-info'> {announcement.title}</span>
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </>
          </Card>
          <Card className='mb-2'>
            <Card.Header className='text-info' as='h4'>
              Events :
            </Card.Header>
            <Card.Body>
              <Card.Text className='text-info'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                officiis facilis beatae consequatur reiciendis dicta quia
                voluptatem, ab, voluptatum eligendi ullam libero facere impedit
                molestiae repudiandae ipsa, necessitatibus numquam velit?
              </Card.Text>
            </Card.Body>

            <Card.Body>
              <Card.Link href='#'>Card Link</Card.Link>
              <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
          </Card>

          <Card className='mb-2'>
            <Card.Body>
              <Card.Title className='text-info'>Quick Links</Card.Title>
              <Card.Link href='#'>Link 1</Card.Link>
              <Card.Link href='#'>Link 2</Card.Link>
              <Card.Link href='#'>Link 3</Card.Link>
              <Card.Link href='#'>Link 4</Card.Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={{ order: 12 }} lg={{ span: 6, order: 2 }}>
          <Card className='text-center mb-2 home-carousal'>
            <ImageCarousel />
          </Card>

          <Card className='text-justify mb-2'>
            <Card.Header className='text-info' as='h2'>
              Mission
            </Card.Header>
            <Card.Body>
              {missionLoading ? (
                <Loader />
              ) : missionError ? (
                <Message variant='danger'>{missionError}</Message>
              ) : (
                <>
                  {missions.map((mission, index) => (
                    <Card.Body key={index}>
                      <Card.Text>
                        {parse(mission.body.substring(0, 300))}...
                        <Link to={`/chapters/mission/${mission.chapterId}`}>
                          Read more
                        </Link>
                      </Card.Text>
                    </Card.Body>
                  ))}
                </>
              )}
            </Card.Body>
          </Card>

          <Card className='text-justify mb-2'>
            <Card.Header className='text-info' as='h2'>
              Vission
            </Card.Header>
            <Card.Body>
              {vissionLoading ? (
                <Loader />
              ) : vissionError ? (
                <Message variant='danger'>{vissionError}</Message>
              ) : (
                <>
                  {vissions.map((vission, index) => (
                    <Card.Body key={index}>
                      <Card.Text>
                        {parse(vission.body.substring(0, 300))}...
                        <Link to={`/chapters/vission/${vission.chapterId}`}>
                          Read more
                        </Link>
                      </Card.Text>
                    </Card.Body>
                  ))}
                </>
              )}
            </Card.Body>
          </Card>

          <Card className='text-justify mb-2'>
            <Card.Header className='text-info' as='h2'>
              History
            </Card.Header>
            <>
              {historyLoading ? (
                <Loader />
              ) : historyError ? (
                <Message variant='danger'>{historyError}</Message>
              ) : (
                <>
                  {histories.map((history, index) => (
                    <Card.Body key={index}>
                      <Card.Text>
                        {parse(history.body.substring(0, 300))}...
                        <Link to={`/chapters/history/${history.chapterId}`}>
                          Read more
                        </Link>
                      </Card.Text>
                    </Card.Body>
                  ))}
                </>
              )}
            </>
          </Card>

          <Card className='text-justify mb-2'>
            <Card.Header className='text-info' as='h2'>
              Any other Main Topic
            </Card.Header>
            <Card.Body>
              <Card.Title className='text-info'>Topic Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                ipsa amet, optio mollitia rem hic odit aliquam quaerat dolor
                minus molestias iusto sint, quia, quis laudantium ducimus animi
                possimus inventore!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={{ span: 6, order: 2 }} lg={{ span: 3, order: 12 }}>
          {cMemeberLoading ? (
            <Loader />
          ) : cMemberError ? (
            <Message variant='danger'>{cMemberError}</Message>
          ) : (
            cMembers.length !== 0 &&
            cMembers.map((cMember, index) => (
              <Card key={index} className='text-justify mb-2'>
                <Card.Img
                  variant='top'
                  src={cMember.member.profilePicture}
                  style={{ width: '100%' }}
                />
                <Card.Header className='text-info'>
                  {cMember.position.toUpperCase()}
                  <Card.Title className='text-info'>
                    {cMember.member.mInit} {cMember.member.firstName}{' '}
                    {cMember.member.lastName}
                  </Card.Title>
                </Card.Header>

                <Card.Body>
                  {parse(cMember.bio.substring(0, 100))}...
                  <Link to={`/committee/${cMember.cId}`}>Read more</Link>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
