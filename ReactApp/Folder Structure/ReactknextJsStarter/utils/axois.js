import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const axiosApi = axios.create({
  baseURL: publicRuntimeConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer token`,
  },
})

export const axiosPost = async (
  url,
  data,
  token = null,
  contentType = 'application/json'
) => {
  let response = {}
  console.log('url ::', url)
  try {
    const result = await axiosApi.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': contentType,
      },
    })
    response.status = true
    response.data = result.data
  } catch (e) {
    if (e.response) {
      if (e.response.status == 400) {
        response.status = false
        response.message = e.response.data.message
      } else if (e.response.status == 500) {
        response.status = false
        response.message = 'Internal server error'
      } else {
        response.status = false
        response.message = 'something went wrong'
      }
    }
  }
  return response
}

export const axiosGet = async (url, token = null) => {
  let response = {}
  try {
    const result = await axiosApi.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
    response.status = true
    response.data = result.data
  } catch (e) {
    if (e.response) {
      if (e.response.status == 400) {
        response.status = false
        response.message = e.response.data.message
      } else if (e.response.status == 500) {
        response.status = false
        response.message = 'Internal server error'
      } else {
        response.status = false
        response.message = 'something went wrong'
      }
    }
  }
  return response
}

export const axiosDelete = async (url, token = null) => {
  let response = {}
  try {
    const result = await axiosApi.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    response.status = true
    response.data = result.data
  } catch (e) {
    if (e.response.status == 400) {
      response.status = false
      response.message = e.response.data.message
    } else if (e.response.status == 500) {
      response.status = false
      response.message = 'Internal server error'
    } else {
      response.status = false
      response.message = 'something went wrong'
    }
  }
  return response
}
