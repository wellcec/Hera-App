import React, { useCallback } from 'react'

import {
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core'

import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useConfig } from '../Context'
import useUserClient from '../clients/UserClient'

import bgLogin from '../assets/images/bg-login3.png'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: `calc(100% - ${theme.spacing(2)}px)`,
    '& .MuiPaper-root': {
      maxWidth: 700,
    },
  },
  close: {
    cursor: 'pointer',
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
  },
  paper: {
    width: '66%',
    overflow: 'auto',
    maxHeight: '100%',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '96%',
    },
    height: 470,
    maxWidth: 800,
    display: 'flex',
  },
  login: {
    backgroundImage: `url(${bgLogin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    minWidth: 300,
  },
  grid: {
    display: 'grid',
  }
}))

const Login = () => {
  const classes = useStyles()
  const userClient = useUserClient()
  const { setAuth, setUser, setLoading } = useConfig()

  const handleAuthenticate = useCallback((data) => new Promise((resolve, reject) => {
    userClient().authenticate(data).then((response) => {
      const { token } = response.data
      sessionStorage.setItem('auth', token)
      resolve(response.data)
    }, (error) => {
      alert(error)
      reject()
    })
  }), [userClient])


  const formik = useFormik({
    initialValues: { ...{ email: '', password: '' } },
    validationSchema: Yup.object({
      email: Yup.string().required(),
      password: Yup.string().max(100).required(),
    }),
    onSubmit: (data) => {
      setLoading(true)

      const authenticate = handleAuthenticate(data)
      authenticate.then((response) => {
        const { token = null } = response
        if (token) {
          userClient().getUser().then(
            (response) => {
              setAuth(true)
              setUser(response.data)
            }, (error) => {
              setAuth(false)
              setUser({})
              alert(error)
            },
          )
        }
      })

      setLoading(false)
    },
  })

  const handleLogin = () => {
    formik.submitForm()
  }

  return (
    <>
      <Box className={classes.modal}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={7} className={classes.grid}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box p={3} className={classes.form}>
                  <Box mb={5}>
                    <Typography component="span" color="primary" className={classes.title}>Seja bem-vindo(a)!</Typography>
                  </Box>

                  <Box>
                    <TextField
                      id="email"
                      label="E-mail"
                      fullWidth
                      {...formik.getFieldProps('email')}
                      error={formik.touched.email && !!formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Box>

                  <Box>
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      {...formik.getFieldProps('password')}
                      error={formik.touched.password && !!formik.errors.password}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Box>

                  <Box textAlign="end" pt={3}>
                    <Button color="primary" variant="contained" onClick={handleLogin}>
                      ENTRAR
                  </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={5} className={classes.grid}>
              <Box display="flex" className={classes.login}>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  )
}

export default Login
