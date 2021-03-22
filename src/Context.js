import React, { useContext } from 'react'

const Context = React.createContext()

export const useConfig = () => {
  const {
    auth,
    setAuth,
    user,
    setUser,
    loading, 
    setLoading,
    alert,
    setAlert,
  } = useContext(Context)

  return {
    auth,
    setAuth,
    user,
    setUser,
    loading, 
    setLoading,
    alert,
    setAlert,
  }
}

export default Context
