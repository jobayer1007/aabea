import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import {
  getUserDetails,
  getUserDetailsById,
  updateUser,
} from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const UserEditScreen = ({ match, history }) => {
  const memberId = match.params.id;

  const [firstName, setFirstName] = useState('');
  const [mInit, setMInit] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [degree, setDegree] = useState('');
  const [degreeYear, setDegreeYear] = useState('');
  const [major, setMajor] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [email, setEmail] = useState('');
  const [alternateEmail, setAlternateEmail] = useState('');
  const [image, setImage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/dashboard');
    } else {
      if (!user.memberId) {
        console.log(memberId);
        dispatch(getUserDetailsById(memberId));
      } else {
        setFirstName(user.firstName);
        setMInit(user.mInit);
        setLastName(user.lastName);
        setAddress1(user.address1);
        setAddress2(user.address2);
        setCity(user.city);
        setState(user.state);
        setZipcode(user.zipcode);
        setPrimaryPhone(user.primaryPhone);
        setAlternatePhone(user.alternatePhone);
        setDegree(user.degree);
        setDegreeYear(user.degreeYear);
        setMajor(user.major);
        setCollegeName(user.collegeName);
        setEmail(user.primaryEmail);
        setAlternateEmail(user.alternateEmail);
        setImage(user.image);
        setUserRole(user.userRole);
        setStatus(user.status);
      }
    }
  }, [dispatch, history, user, memberId, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        id: memberId,
        image,
        userRole,
        firstName,
        mInit,
        lastName,
        address1,
        address2,
        city,
        state,
        zipcode,
        alternateEmail,
        primaryPhone,
        alternatePhone,
        degree,
        degreeYear,
        major,
        collegeName,
        status,
      })
    );
  };

  return (
    <>
      {userInfo.userRole === 'systemAdmin' ? (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-success'
          to='/systemAdmin'
        >
          Go Back
        </Link>
      ) : (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-success'
          to='/dashboard'
        >
          Go Back
        </Link>
      )}

      <FormContainer>
        <Card border='primary'>
          <Card.Header className='text-center' as='h2'>
            Edit User
          </Card.Header>
          <Card.Body>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='firstName'
                    placeholder='Please Enter Your First Name..'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='mInit'>
                  <Form.Label>M. Initial</Form.Label>
                  <Form.Control
                    type='mInit'
                    placeholder=' Please Enter Your M. Initial: Mr / Ms'
                    value={mInit}
                    onChange={(e) => setMInit(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='lastName'
                    placeholder='Please Enter Your Last Name..'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='address1'>
                  <Form.Label>Primary Address</Form.Label>
                  <Form.Control
                    type='address1'
                    placeholder='Please Enter Address..'
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='address2'>
                  <Form.Label>Alternative Address</Form.Label>
                  <Form.Control
                    type='address2'
                    placeholder='Please Enter Address..'
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type='city'
                    placeholder='Enter City..'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='state'>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type='state'
                    placeholder='Enter State..'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='zipcode'>
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control
                    type='zipcode'
                    placeholder='Enter Zipcode..'
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='primaryPhone'>
                  <Form.Label>Primary Phone Number</Form.Label>
                  <Form.Control
                    type='primaryPhone'
                    placeholder='Enter Your Phone Number..'
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='alternatePhone'>
                  <Form.Label>Alternate Phone Number</Form.Label>
                  <Form.Control
                    type='alternatePhone'
                    placeholder='Enter additional Phone Number..'
                    value={alternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='degree'>
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type='degree'
                    placeholder='Enter Your Last Degree Received..'
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='degreeYear'>
                  <Form.Label>Degree Year</Form.Label>
                  <Form.Control
                    type='degreeYear'
                    placeholder='Enter The Year of Degree Awarded..'
                    value={degreeYear}
                    onChange={(e) => setDegreeYear(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='major'>
                  <Form.Label>Major</Form.Label>
                  <Form.Control
                    type='major'
                    placeholder='Enter Your Major..'
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='collegeName'>
                  <Form.Label>College Name</Form.Label>
                  <Form.Control
                    type='collegeName'
                    placeholder='Enter Your University/College Name..'
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email..'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='alternateEmail'>
                  <Form.Label>Alternate Email Address</Form.Label>
                  <Form.Control
                    type='alternateEmail'
                    placeholder='Enter another Email..'
                    value={alternateEmail}
                    onChange={(e) => setAlternateEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>Image :</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url..'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='status'>
                  <Form.Label>Member Status</Form.Label>
                  <Form.Control
                    type='status'
                    placeholder='Member Status: active/inactive/pending'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='userRole'>
                  <Form.Label>Member Type</Form.Label>
                  <Form.Control
                    type='userRole'
                    placeholder='User Role: admin/member/systemAdmin'
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* <Form.Group controlId='isAdmin'> */}
                {/* <Form.Label>Admin</Form.Label> */}
                {/* <Form.Check */}
                {/* type='checkbox' */}
                {/* label='Is Admin' */}
                {/* checked={isAdmin} */}
                {/* onChange={(e) => setIsAdmin(e.target.checked)} */}
                {/* ></Form.Check> */}
                {/* </Form.Group> */}

                <Button type='submit' variant='primary' block>
                  Update
                </Button>
              </Form>
            )}
          </Card.Body>
          <Card.Footer className='text-muted'>2 days ago</Card.Footer>
        </Card>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
