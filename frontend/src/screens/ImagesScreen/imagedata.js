<Card.Body>
  {loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>Image Type</th>
          <th>Image</th>
          {userInfo &&
            (userInfo.userRole === 'systemAdmin' ||
              userInfo.userRole === 'admin') && <th>DELETE</th>}
        </tr>
      </thead>

      <tbody>
        {images.map((image) => (
          <tr key={image.imageId}>
            {/* // <td>{announcement.chapterId}</td> */}
            {/* <td>
            {' '}
            <Image src={user.image} thumbnail />
          </td> */}
            <td> {image.imageName}</td>
            <td>
              {' '}
              {/* <Image src={image.image} alt={image.image} /> */}
              {/* <Card.Img src={image.image} variant='top' /> */}
            </td>
            {userInfo &&
              (userInfo.userRole === 'systemAdmin' ||
                userInfo.userRole === 'admin') && (
                <td>
                  {/* <Button
                  variant='light'
                  className='btn-sm'
                  onClick={() =>
                    editHistoryHandler(image.imageId)
                  }
                >
                  <i className='fas fa-edit'></i>
                </Button> */}

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteImageHandler(image.imageId)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              )}
          </tr>
        ))}
      </tbody>
    </Table>
  )}
</Card.Body>;

<Card.Body>
  {addImage
    ? (imageNewError && <Message variant='danger'>{imageNewError}</Message>) ||
      (imageNewLoading && <Loader />) ||
      (success ? (
        <Message variant='success'>{success}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='imageName'>
            <Form.Label>Image Type</Form.Label>
            <Form.Control
              as='select'
              type='text'
              placeholder='Please Enter A Title..'
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            >
              <option>Please Select an image type</option>

              <option value='logo'>Logo</option>
              <option value='navbarImage'>Navbar Image</option>
              <option value='homeScreenImage'>Home Screen Image</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='imageDescription'>
            <Form.Label>Image Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Please Enter image description'
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='imageLink'>
            <Form.Label>Image Link</Form.Label>
            <Form.Control
              type='text'
              placeholder='Please Enter image link(optional)'
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} md='2'>
            <Form.Label>Image</Form.Label>
          </Form.Group>
          <Form.Group as={Col} md='10' controlId='image'>
            <Form.Control
              required
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

          <Button type='submit' variant='info' block>
            <i className='fas fa-plus' /> Add
          </Button>
        </Form>
      ))
    : null}
</Card.Body>;
