import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: process.env.VUE_APP_LINK_API,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
