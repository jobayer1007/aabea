import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentById } from '../../actions/documentAction';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Document = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const documentById = useSelector((state) => state.documentById);
  const { loading, error, document: blobDocument } = documentById;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    dispatch(getDocumentById(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        blobDocument && (
          <Container className='text-center'>
            {/* <a href={blobDocument.document} target='_blank'>
              download blob
            </a> */}
            {/* <hr /> */}
            <iframe
              // id='viewer'
              style={{ width: '100%', height: '80vh' }}
              //comment this src at server
              // src={window.URL.createObjectURL(
              //   new Blob([blobDocument], { type: 'application/pdf' })
              // )}

              src={blobDocument.document} // Uncomment at server
            >
              last added
            </iframe>
          </Container>
        )
      )}
    </div>
  );
};

export default Document;
