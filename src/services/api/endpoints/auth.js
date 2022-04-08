import axios from '../axios'

const endpoints = {
  registration: data => axios.post('/v1/auth/email/register', data),
  login: (data, config) => { 
      console.log(data, config);
      return axios.post('/user/login', data, config)},
  forgotPassword: data => axios.post('/v1/auth/forgot/password', data),
  getProfile: () => axios.get('/v1/auth/me'),
  updateProfile: data => axios.patch('/v1/auth/me', data)
}

export default endpoints
