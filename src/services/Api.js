import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:8084/api`,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
