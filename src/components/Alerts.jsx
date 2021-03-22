import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import { useConfig } from '../Context'
import { DEFAULT_ALERT } from '../constants'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alerts = () => {
  const { alert, setAlert } = useConfig()

  const handleClose = () => {
    setAlert(DEFAULT_ALERT)
  }

  return (
    <>
      <Snackbar open={alert?.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert?.type}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Alerts
