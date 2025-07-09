/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from 'axios'
import { baseUrlClientSide, baseUrlServerSide } from './url'

export type resourceObject = {
  endpoints: string
  method: string
  requestData?: any
  header?: any
}

export const networkHelper = ({
  resource,
  data,
  isSSR = true,
  formdata,
  timeout,
  id,
}: {
  resource: resourceObject
  data?: any
  formdata?: boolean
  isSSR?: boolean
  timeout?: number
  id?: number | string
}) => {
  //data user

  const config: AxiosRequestConfig = {
    headers: {
      ...(resource?.header ? resource.header : {}),
      ...(formdata ? { 'Content-Type': 'multipart/form-data' } : {}),
      'ngrok-skip-browser-warning': '69420',
    },
    // signal,
    ...(timeout && { timeout }),
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
          `${baseUrl}${resource.endpoints}${id ? `/${id}` : ''}${
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
  console.log(error, 'ini error')

  return error
}
