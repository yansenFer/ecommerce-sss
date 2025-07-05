export const baseUrl = import.meta.env.VITE_API_BASE_URL

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
