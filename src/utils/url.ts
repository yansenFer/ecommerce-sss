export const baseUrlClientSide = process.env.NEXT_PUBLIC_BASE_URL
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
        endpoints: '/products',
        method: 'GET',
      },
    },
    categories: {
      read: {
        endpoints: '/categories',
        method: 'GET',
      },
    },
  },
}
