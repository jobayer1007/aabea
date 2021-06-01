import React, { useEffect } from 'react';
import { Col, Row, Card, ListGroup, Container, Media } from 'react-bootstrap';
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
import { allEvents } from '../../actions/eventActions';
import { allHelps } from '../../actions/helpActions';
import { allLinks } from '../../actions/linkActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const announcementAll = useSelector((state) => state.announcementAll);
  const { loading, error, announcements } = announcementAll;

  const helpAll = useSelector((state) => state.helpAll);
  const {
    loading: helpAllLoading,
    error: helpAllError,
    helpContacts,
  } = helpAll;

  const linkAll = useSelector((state) => state.linkAll);
  const { loading: linkAllLoading, error: linkAllError, links } = linkAll;

  const eventAll = useSelector((state) => state.eventAll);
  const { loading: eventsLoading, error: eventsError, events } = eventAll;

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

  const checkChapter = window.location.host.split('.')[0];

  useEffect(() => {
    console.log(checkChapter);
    console.log(typeof checkChapter);
    dispatch(allAnnouncements(checkChapter)); // done
    dispatch(allHelps(checkChapter)); // done
    dispatch(allLinks(checkChapter)); // done
    dispatch(allEvents(checkChapter)); // done
    dispatch(allMission());
    dispatch(allVission());
    dispatch(allHistory());
    dispatch(allCMembers(checkChapter)); // done
  }, [dispatch]);
  // console.log(cMembers);
  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, order: 1 }} lg={{ span: 3, order: 1 }}>
          <Card className='mb-2'>
            <Card.Header className='text-info' as='h4'>
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
            <>
              {eventsLoading ? (
                <Loader />
              ) : eventsError ? (
                <Message variant='danger'>{eventsError}</Message>
              ) : (
                <ListGroup variant='flush'>
                  {events.map((event, index) => (
                    <ListGroup.Item key={index}>
                      <Link to={`/event/${event.eventId}`}>
                        <span className='text-info d-flex justify-content-between align-items-center'>
                          {event.eventName}
                          {event.eventStatus ? (
                            <span className='badge badge-info badge-pill'>
                              live
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </>
          </Card>

          <Card className='mb-2'>
            <Card.Header className='text-info' as='h4'>
              Contacts for help/support
            </Card.Header>
            <Card.Body>
              {helpAllLoading ? (
                <Loader />
              ) : helpAllError ? (
                <Message variant='danger'>{helpAllError}</Message>
              ) : helpContacts && helpContacts.length !== 0 ? (
                <>
                  {helpContacts.map((helpContact, index) => (
                    <>
                      <Media key={index}>
                        <img
                          width={64}
                          height={64}
                          className='mr-3'
                          src={helpContact.profilePicture}
                          alt='picture'
                        />
                        <Media.Body>
                          <h5>{helpContact.contactName}</h5>
                          <p>{helpContact.helpFor}</p>
                          <p>
                            Email :
                            <a href={`mailTo: ${helpContact.contactEmail}`}>
                              {helpContact.contactEmail}
                            </a>
                          </p>

                          <p>
                            Phone :
                            <a href={`tel: ${helpContact.contactPhone}`}>
                              {helpContact.contactPhone}
                            </a>
                          </p>
                        </Media.Body>
                      </Media>
                      <hr />
                    </>
                  ))}
                </>
              ) : null}
            </Card.Body>
          </Card>

          <Card className='mb-2'>
            <Card.Header className='text-info'>Quick Links</Card.Header>
            {linkAllLoading ? (
              <Loader />
            ) : linkAllError ? (
              <Message variant='danger'>{linkAllError}</Message>
            ) : links && links.length !== 0 ? (
              <>
                {links.map((linku, index) => (
                  <Card.Body key={index}>
                    <Card.Link href={linku.link}>{linku.linkTitle}</Card.Link>
                  </Card.Body>
                ))}
              </>
            ) : null}
          </Card>
        </Col>

        <Col md={{ order: 12 }} lg={{ span: 6, order: 2 }}>
          <Card className='text-center mb-2 home-carousal'>
            <ImageCarousel />
          </Card>

          <Card className='text-justify mb-2'>
            <Card.Header className='text-info text-center' as='h4'>
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
            <Card.Header className='text-info text-center' as='h4'>
              Vision
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
            <Card.Header className='text-info text-center' as='h4'>
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

          {/* <Card className='text-justify mb-2'>
            <Card.Header className='text-info text-center' as='h4'>
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
          </Card> */}
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
