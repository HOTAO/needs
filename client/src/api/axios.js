import axios from 'axios'
import Qs from 'qs'
import cache from '../cache/index.js'

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
    const token = cache.lsCache.get('token')
    token && (config.headers['Web-Access-Token'] = token)
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
