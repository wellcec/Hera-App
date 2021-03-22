const useSecurity = () => {
  const accessToken = sessionStorage.getItem('auth')

  const removeAccessToken = () => {
    sessionStorage.removeItem('auth')
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }

  return {
    accessToken,
    removeAccessToken,
    config,
  }
}

export default useSecurity
