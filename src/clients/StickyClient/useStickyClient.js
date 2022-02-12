import { useCallback } from 'react'
import axios from 'axios'
import security from '../../security/useSecurity'

const useStickyClient = () => {
  const getStickies = useCallback((values) => axios.get(`${window.ENV.API_URL}/sticky`, values, security().config), [])

  const saveSticky = useCallback((values) => axios.post(`${window.ENV.API_URL}/sticky`, values, security().config), [])

  return useCallback(() => ({
    getStickies,
    saveSticky,
  }), [
    getStickies,
    saveSticky,
  ])
}

export default useStickyClient