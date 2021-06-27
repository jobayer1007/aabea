import http from './http-common';
import axios from 'axios';

const upload = async (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append('image', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  };

  return await axios.post('/api/upload', formData, config);

  // return http.post('/upload', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   onUploadProgress,
  // });
};

const getFiles = async () => {
  return await axios.get('/api/uploads');
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService;
