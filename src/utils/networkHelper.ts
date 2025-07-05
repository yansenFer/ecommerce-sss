/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from 'axios'
import { baseUrlClientSide, baseUrlServerSide } from './url'
import { IToken } from '@/interface'
// import type { IUser } from '@/interface'

export type resourceObject = {
  endpoints: string
  method: string
  requestData?: any
  header?: any
}

export function getCookie<T = unknown>(name: string): T | null {
  const cookies = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))

  if (!cookies) return null

  try {
    return JSON.parse(decodeURIComponent(cookies.split('=')[1])) as T
  } catch (err) {
    console.error('Failed to parse cookie', err)
    return null
  }
}

export const networkHelper = ({
  resource,
  data,
  isSSR = true,
  param,
  isBlob = false,
  formdata,
  pdf,
  withCredential,
  timeout,
  id,
}: {
  resource: resourceObject
  data?: any
  param?: any
  signal?: AbortSignal
  formdata?: boolean
  isSSR?: boolean
  pdf?: boolean
  isBlob?: boolean
  token?: string
  withCredential?: boolean
  timeout?: number
  id?: number | string
}) => {
  //data user
  const user = getCookie<IToken>('user')
  const token = user?.token

  const config: AxiosRequestConfig = {
    ...(pdf ? { responseType: 'arraybuffer' } : {}), // Ensure binary data is received
    ...(isBlob ? { responseType: 'blob' } : {}),
    headers: {
      ...(resource?.header ? resource.header : {}),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(formdata ? { 'Content-Type': 'multipart/form-data' } : {}),
      'ngrok-skip-browser-warning': '69420',
    },

    // signal,
    ...(timeout && { timeout }),
    ...(withCredential && { withCredentials: withCredential }),
  }

  const baseUrl = isSSR ? baseUrlServerSide : baseUrlClientSide

  switch (resource.method) {
    case 'POST':
      return axios
        .post(
          `${baseUrl}${resource.endpoints}${id ? `/${id}` : ''}`,
          data,
          config
        )
        .catch(errorHandler)
    case 'GET':
      return axios
        .get(
          `${baseUrl}${resource.endpoints}${
            data ? `?${new URLSearchParams(data).toString()}` : ''
          }`,
          config
        )
        .catch(errorHandler)
    case 'PUT':
      return axios
        .put(
          `${baseUrl}${resource.endpoints}${id ? `/${id}` : ''}`,
          data,
          config
        )
        .catch(errorHandler)
    case 'PATCH':
      return axios
        .patch(
          `${baseUrl}${resource.endpoints}${id ? `/${id}` : ''}${param || ''}`,
          data,
          config
        )
        .catch(errorHandler)
    case 'DELETE':
      return axios
        .delete(
          `${baseUrl}${resource.endpoints}/${id || ''}${
            data ? `?${new URLSearchParams(data).toString()}` : ''
          }`,
          config
        )
        .catch(errorHandler)
    default:
      // DELETE
      return axios
        .post(`${baseUrl}${resource.endpoints}`, data, config)
        .catch(errorHandler)
  }
}

const errorHandler = async (error: any) => {
  console.log(error.response.data.errorList, 'ini error')

  return error
}
