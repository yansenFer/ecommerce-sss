export const baseUrlClientSide = process.env.NEXT_PUBLIC_ENV_VARIABLE
export const baseUrlServerSide = process.env.API_KEY

export const resourceUrl = {
  resource: {
    auth: {
      login: {
        endpoints: '/employee/login',
        method: 'POST',
      },
    },
    product: {
      read: {
        endpoints: '',
        method: 'GET',
      },
    },
  },
}
