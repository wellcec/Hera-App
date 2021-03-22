import { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import './helpers/yup'
import Context from './Context'
import useSecurity from './security'
import { createTheme } from './theme'
import { DEFAULT_ALERT } from './constants'

import Header from './layout/Header'
import Home from './pages/home/Home'
import Alerts from './components/Alerts'
import Loading from './layout/loading/Circle'
import LoginScreen from './layout/LoginScreen'

import useUserClient from './clients/UserClient'

const App = () => {
  const { Provider } = Context
  const [theme] = useState(createTheme())
  const userClient = useUserClient()

  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useState(true)
  const [user, setUser] = useState({})
  const [alert, setAlert] = useState(DEFAULT_ALERT)

  const token = useSecurity().accessToken

  const RemoveAccessToken = () => {
    useSecurity().removeAccessToken()
  }

  useEffect(() => {
    if (token) {
      setLoading(true)

      userClient().getUser().then(
        (response) => {
          setAuth(true)
          setUser(response.data)
          setLoading(false)
        }, () => {
          RemoveAccessToken()
          setAuth(false)
          setLoading(false)
        }
      )
    } else {
      setAuth(false)
    }
  }, [userClient, token])

  return (
    <>
      {loading && (
        <Loading />
      )}

      {theme && (
        <Provider value={{
          auth,
          setAuth,
          user,
          setUser,
          loading,
          setLoading,
          alert,
          setAlert,
        }}>
          <ThemeProvider theme={theme}>
            <Router>
              {auth && (
                <Header />
              )}
              <Switch>
                <Route exact path='/'>
                  {auth && (
                    <Home />
                  )}

                  {!auth && (
                    <LoginScreen />
                  )}
                </Route>
              </Switch>
            </Router>

            <Alerts alert={alert} />
          </ThemeProvider>
        </Provider>
      )}
    </>
  )
}

export default App
