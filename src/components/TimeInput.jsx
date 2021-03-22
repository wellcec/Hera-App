import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import MomentUtils from '@date-io/moment'
import useUtils from '../utils/useUtils'

const useStyles = makeStyles(() => ({
  hourInput: {
    '& Button': {
      padding: '0px !important',
    },
  },
}))

const TimeInput = (props) => {
  const {
    id, name, value, onChange, onBlur, className,
  } = props

  const ref = useRef()
  const classes = useStyles()
  const { isBlank, formatHours } = useUtils()
  const [inputValue, setInputValue] = useState(null)

  useEffect(() => {
    let data = null

    if (typeof value === 'object') {
      data = value
    }

    if (!isBlank(value)) {
      data = formatHours(value)
    }

    setInputValue(data)
  }, [value, formatHours, isBlank])

  const handleBlur = (event) => {
    onBlur(event)
  }

  const handleChange = (data) => {
    let current = ''

    if (!isEmpty(data) && data.isValid()) {
      current = data.format('HH:mm')
    }

    setInputValue(data)
    onChange({
      target: {
        id,
        name,
        value: current,
      },
    })
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardTimePicker
        {...props}
        autoOk
        className={clsx(className, classes.hourInput)}
        disableToolbar
        inputProps={{ ref }}
        variant="inline"
        value={inputValue}
        format="HH:mm"
        onBlur={handleBlur}
        onChange={handleChange}
        onClose={() => setTimeout(() => ref.current && ref.current.focus())}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

TimeInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
}

TimeInput.defaultProps = {
  id: '',
  name: '',
  className: '',
  onChange: () => { },
  onBlur: () => { },
}

export default TimeInput
