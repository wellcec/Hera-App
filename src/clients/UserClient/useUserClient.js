import { useCallback } from 'react'
import axios from 'axios'
import security from '../../security/useSecurity'

const useUserClient = () => {

  const authenticate = useCallback((values) => axios.post(`${window.ENV.API_URL}/authenticate`, values), [])

  const getUser = useCallback(() => axios.get(`${window.ENV.API_URL}/user`, security().config), [])

  return useCallback(() => ({
    authenticate,
    getUser,
  }), [
    authenticate,
    getUser,
  ])
}

export default useUserClient