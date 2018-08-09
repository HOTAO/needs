import axios from 'axios'
import Qs from 'qs'

// const Api = 'http://192.168.1.187:8002/api'
const Api =
  process.env.NODE_ENV === 'production'
    ? 'http://192.168.1.187:8002/api'
    : 'http://localhost:3000/api'

export let API_ROOT = Api

axios.defaults.baseURL = API_ROOT
axios.defaults.headers.Accept = 'application/json'

axios.interceptors.request.use(
  config => {
    config.headers['Web-Access-Token'] =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiYWRtaW5fMTIzNDU2In0sImV4cCI6MTUzNjM4ODA5NSwiaWF0IjoxNTMzNzk2MDk1fQ.p5qY0IiWIPUZuKDX9Oph8hoDODStDLBA2LDQq6neKTalkg65oE66fE652cW3Ej72IHHmtqN8jMZv1jP9CpLwstJlotlItvh1SXNcw_mPa6UDR32ac6ZrAK8-oIoCOeYahlxShiQ0S_qKptY59dUsmRf-Y2hqvu7m6Rb-u2RGAadnenmmJ0Nf9YudAk_ce8x5T2dMBwelHuJiquEwCg-iKFTYsCdJ4jrFKNAOLZuLwBcib15ji7K25roaNnn5Oi85JxGC-0CvNZFiq5yb8b-FGTXU-4o4IIf44yfKHNeyU02hTxKvYDBkNCZyS5JZJpgRScxlouKbYmOmc2sFvgjUww'

    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'patch'
    ) {
      config.transformRequest = [
        (data, headers) => {
          return Qs.stringify(data)
        }
      ]
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(error.response)
    return Promise.reject(error.response)
  }
)

export default axios
