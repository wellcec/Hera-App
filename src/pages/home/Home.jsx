import React, { useCallback, useEffect, useState } from "react"
import {
  Box,
  Grid,
  makeStyles,
} from '@material-ui/core'

import Sticky from './Sticky'
import NewStickyModal from './NewStickyModal'
import DateInput from '../../components/DateInput'

import { useConfig } from '../../Context'
import useStickyClient from '../../clients/StickyClient/useStickyClient'

const useStyles = makeStyles((theme) => ({
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
  }
}))

const Home = () => {
  const classes = useStyles()
  const { setLoading } = useConfig()
  const stickyClient = useStickyClient()

  const [stickies, setStickies] = useState([])
  const [total, setTotal] = useState(0)

  const getStickies = useCallback(() => {
    setLoading(true)
    stickyClient().getStickies().then((response) => {
      console.log('stickies', response.data)
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
          <Grid className={classes.grid} container spacing={2}>
            {stickies.map((item, index) => (
              <Grid item xs="auto" key={index}>
                <Sticky sticky={item} />
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
