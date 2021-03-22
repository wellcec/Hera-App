import React, { useCallback, useEffect, useState } from "react"
import {
  Box,
  Grid,
  Paper,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { truncate } from 'lodash'

import '../../assets/styles/stickies.css'
import NewStickyModal from './NewStickyModal'
import DateInput from '../../components/DateInput'

import { useConfig } from '../../Context'
import useUtils from '../../utils/useUtils'
import { DEFAULT_LENGTH_TITLE, DEFAULT_LENGTH_DESC } from '../../constants'
import useStickyClient from '../../clients/StickyClient/useStickyClient'

const useStyles = makeStyles((theme) => ({
  card: {
    width: 200,
    height: 200,
    borderRadius: 18,
    padding: 24,
    cursor: 'pointer',
  },
  date: {
    '& *': {
      color: '#ffffff',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #ffffff'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #ffffff',
    },
  },
  day: {
    fontSize: 60,
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
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const Home = () => {
  const classes = useStyles()
  const stickyClient = useStickyClient()
  const { setLoading } = useConfig()

  const { formatDate, date, formatHours, formatTruncate } = useUtils()
  const [stickies, setStickies] = useState([])
  const [total, setTotal] = useState(0)

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

  const getStickies = useCallback(() => {
    setLoading(true)
    stickyClient().getStickies().then((response) => {
      setStickies(response.data)
      setTotal(response.data.length)
      setLoading(false)
    }, (response) => {
      setLoading(false)
    })
  }, [stickyClient, setLoading])

  useEffect(() => {
    getStickies()
  }, [getStickies])

  return (
    <>
      <Box>
        <Box display="flex" mx={20} mt={20}>
          <DateInput
            id="endDueDate"
            label="Data desejada"
            title="Data desejada"
            className={classes.date}
            value=""
          />
        </Box>

        <Box display="flex" justifyContent="center" mx={20} mt={5}>
          <Grid container spacing={2}>
            {stickies.map((item, index) => (
              <Grid item xs="auto" key={index}>
                <Paper elevation={3} className={`${classes.card} card ${getColor(item.date, item.hour)}`}>
                  <div className="overlay">
                    <Box className={classes.description}>
                      {formatTruncate(item.description, DEFAULT_LENGTH_DESC)}
                    </Box>
                  </div>
                  <div className="circle">
                    <Typography className={classes.day}>
                      {getDay(item.date)}
                    </Typography>
                  </div>

                  <Box mx={2}>
                    <Typography className={classes.hour}>
                      {getHour(item.hour.toString())}
                    </Typography>
                  </Box>

                  <Box mx={2}>
                    <Typography className={classes.title}>
                      {formatTruncate(item.title, DEFAULT_LENGTH_TITLE)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <NewStickyModal onSuccess={getStickies} />
    </>
  )
}

export default Home
