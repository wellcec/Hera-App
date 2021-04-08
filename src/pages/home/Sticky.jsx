import React from "react"
import PropTypes from 'prop-types'
import {
  Box,
  Paper,
  makeStyles,
  Typography,
} from '@material-ui/core'

import '../../assets/styles/stickies.css'

import useUtils from '../../utils/useUtils'
import { DEFAULT_LENGTH_TITLE, DEFAULT_LENGTH_DESC } from '../../constants'

const useStyles = makeStyles((theme) => ({
  card: {
    width: 200,
    height: 200,
    borderRadius: 18,
    padding: 24,
    cursor: 'pointer',
  },
  day: {
    fontSize: 40,
    color: theme.palette.text.primary,
    zIndex: 'inherit',
  },
  hour: {
    fontSize: 16,
  },
  description: {
    position: 'absolute',
    top: 79,
    left: 38,
    fontSize: 4,
    maxWidth: 42,
  },
  title: {
    fontSize: 16,
  },
  boxTitle: {
    maxHeight: 40,
  },
}))

const Sticky = ({ sticky }) => {
  const classes = useStyles()
  const { date, formatHours, formatTruncate } = useUtils()

  const getDay = (value) => {
    const day = date(value).date()
    if (day.toString().length === 1) return `0${day}`
    return day
  }

  const getHour = (value) => {
    return formatHours(value)
  }

  const getColor = (itemDate, itemHour) => {
    var dateTimeItem = date(`${date(itemDate).format('YYYY-MM-DD')}T${itemHour}`)
    var currentDateTime = date()

    return dateTimeItem > currentDateTime ? 'credentialing' : 'error'
  }

  return (
    <Paper elevation={3} className={`${classes.card} card ${getColor(sticky.date, sticky.hour)}`}>
      <div className="overlay">
        <Box className={classes.description}>
          {formatTruncate(sticky.description, DEFAULT_LENGTH_DESC)}
        </Box>
      </div>
      <div className="circle">
        <Typography className={classes.day}>
          {getHour(sticky.hour.toString())}
        </Typography>
      </div>

      <Box mx={1} mt={2} className={classes.boxTitle}>
        <Typography className={classes.title}>
          {formatTruncate(sticky.title, DEFAULT_LENGTH_TITLE)}
        </Typography>
      </Box>
    </Paper>
  )
}

Sticky.propTypes = {
  sticky: PropTypes.object.isRequired,
}

export default Sticky
