import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../components/MyTexyInput';
import MySelect from '../../components/MySelect';
import MyCheckbox from '../../components/MyCheckbox';
import {
  Button,
  Col,
  FormFile,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import Loader from '../../components/Loader';
import axios from 'axios';

// And now we can use these
const RegisterScreen_New = () => {
  const [firstName, setFirstName] = useState('');
  const [mInit, setMInit] = useState('Mr');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [degree, setDegree] = useState('');
  const [degreeYear, setDegreeYear] = useState('');
  const [major, setMajor] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [certificate, setCertificate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploading, setUploading] = useState(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
      setCertificate(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('firstName:' + firstName);
    // alert(JSON.stringify(values, null, 2));
    // Dispatch Register
    // dispatch(
    //   register(
    //     email,
    //     password,
    //     firstName,
    //     mInit,
    //     lastName,
    //     address1,
    //     city,
    //     state,
    //     zipcode,
    //     primaryPhone,
    //     degree,
    //     degreeYear,
    //     major,
    //     collegeName,
    //     certificate,
    //     checkChapter
    //   )
    // );
  };

  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          mInit: '',
          firstName: '',
          lastName: '',
          address1: '',
          state: '',
          city: '',
          zipcode: '',
          primaryPhone: '',
          degree: '',
          degreeYear: '',
          major: '',
          collegeName: '',
          certificate: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptedTerms: false, // added for our checkbox
          // jobType: '', // added for our select
        }}
        validationSchema={Yup.object({
          mInit: Yup.string()
            .oneOf(['Mr', 'Mrs', 'Ms'], 'Invalid Initial Type')
            .required('Required'),
          firstName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          address1: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),

          state: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          city: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
          zipcode: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          primaryPhone: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Required'),
          degree: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
          degreeYear: Yup.number()
            .test(
              'len',
              'Must be exactly 4 characters',
              (val) => val && val.toString().length === 4
            )
            .max(new Date().getFullYear())
            .required('Required'),
          major: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
          collegeName: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
          certificates: Yup.string().required('Required'),

          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .required('Password is required'),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
          ),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          // jobType: Yup.string()
          //   .oneOf(
          //     ['designer', 'development', 'product', 'other'],
          //     'Invalid Job Type'
          //   )
          //   .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
        // onSubmit={submitHandler}
      >
        <Form>
          <Row>
            <FormGroup as={Col} md='2'>
              <FormLabel>Name</FormLabel>
            </FormGroup>
            <FormGroup as={Col} md='2'>
              <MySelect name='mInit' className='form-control'>
                <option value=''>Select</option>
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
                <option value='Ms'>Ms</option>
              </MySelect>
            </FormGroup>
            <FormGroup as={Col} md='4'>
              <MyTextInput
                name='firstName'
                type='text'
                placeholder='First Name'
                className='form-control'
              />
            </FormGroup>
            <FormGroup as={Col} md='4'>
              <MyTextInput
                name='lastName'
                type='text'
                placeholder='Last Name'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md='2'>
              <FormLabel>Address</FormLabel>
            </FormGroup>

            <FormGroup as={Col} md='10' controlId='address1'>
              <MyTextInput
                name='address1'
                type='text'
                placeholder='1234 Main St...'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md={{ span: 10, offset: 2 }} controlId='state'>
              <MyTextInput
                name='state'
                type='text'
                placeholder='Enter State..'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md={{ span: 10, offset: 2 }} controlId='city'>
              <MyTextInput
                name='city'
                type='text'
                placeholder='Enter City..'
                className='form-control'
              />
            </FormGroup>

            <FormGroup
              as={Col}
              md={{ span: 10, offset: 2 }}
              controlId='zipcode'
            >
              <MyTextInput
                name='zipcode'
                type='text'
                placeholder='Enter Zipcode..'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md='2'>
              <FormLabel>Phone Number</FormLabel>
            </FormGroup>
            <FormGroup as={Col} md='10' controlId='primaryPhone'>
              <MyTextInput
                name='primaryPhone'
                type='text'
                placeholder='Enter Your Phone Number..'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md='2'>
              <FormLabel>Education</FormLabel>
            </FormGroup>
            <FormGroup as={Col} md='5' controlId='degree'>
              <MyTextInput
                name='degree'
                type='text'
                placeholder='Enter Your Last Degree Received..'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md='5' controlId='degreeYear'>
              <MyTextInput
                name='degreeYear'
                type='number'
                placeholder='xxxx'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md={{ span: 5, offset: 2 }} controlId='major'>
              <MyTextInput
                name='major'
                type='text'
                placeholder='Enter Your Major..'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md='5' controlId='collegeName'>
              <MyTextInput
                name='collegeName'
                type='text'
                placeholder='Enter Your University/College Name..'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md='2'>
              <FormLabel>Certificate</FormLabel>
            </FormGroup>
            <FormGroup as={Col} md='10' controlId='certificate'>
              <FormFile
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></FormFile>
              {uploading && <Loader />}
              <MyTextInput
                name='certificate'
                type='text'
                className='form-control'
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
              />
            </FormGroup>

            <FormGroup as={Col} md='2'>
              <FormLabel>Email Address</FormLabel>
            </FormGroup>
            <FormGroup as={Col} md='10' controlId='email'>
              <MyTextInput
                name='email'
                type='email'
                placeholder='Enter email..'
                className='form-control'
              />
            </FormGroup>

            <FormGroup
              as={Col}
              md={{ span: 5, offset: 2 }}
              controlId='password'
            >
              <MyTextInput
                name='password'
                type='password'
                placeholder='Enter password..'
                className='form-control'
              />
            </FormGroup>

            <FormGroup as={Col} md={{ span: 5 }} controlId='confirmPassword'>
              <MyTextInput
                name='confirmPassword'
                type='password'
                placeholder='Confirm password..'
                className='form-control'
              />
            </FormGroup>

            {/* <MyCheckbox name='acceptedTerms'>
              I accept the terms and conditions
            </MyCheckbox> */}
          </Row>

          <FormGroup as={Row}>
            <Col md={{ span: 10, offset: 2 }}>
              <Button type='submit' variant='info' block>
                Register
              </Button>
            </Col>
          </FormGroup>

          {/* <button type='submit'>Submit</button> */}
        </Form>
      </Formik>
    </>
  );
};

export default RegisterScreen_New;
