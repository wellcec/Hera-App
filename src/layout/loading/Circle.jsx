import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

import '../../assets/styles/loading.css'

const useStyles = makeStyles(() => ({
  roller: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#141422b0',
    zIndex: 9,
  },
}))

const Circle = () => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.roller} display="flex" alignItems="center" justifyContent="center">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Box>
    </>
  )
}

export default Circle
