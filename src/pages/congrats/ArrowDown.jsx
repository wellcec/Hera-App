import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'

const ArrowDown = ({ onClick, color = '#060c2499' }) => {
  const useStyles = makeStyles(() => ({
    colorIcon: {
      fill: `${color} !important`,
    },
  }))

  return (
    <IconButton size='medium' onClick={onClick} style={{ transform: 'rotate(270deg)', backgroundColor: '#fff' }}>
      <ArrowBack className={`shake ${useStyles().colorIcon}`} style={{ fontSize: '35px' }} />
    </IconButton>
  )
}

export default ArrowDown
