import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import MomentUtils from '@date-io/moment'
import useUtils from '../utils/useUtils'

const useStyles = makeStyles(() => ({
  dateInput: {
    '& Button': {
      padding: '0px !important',
    },
  },
}))

const DateInput = (props) => {
  const {
    id, name, value, onChange, onBlur, className,
  } = props

  const ref = useRef()
  const classes = useStyles()
  const { isBlank, date } = useUtils()
  const [inputValue, setInputValue] = useState(null)

  useEffect(() => {
    let data = null

    if (typeof value === 'object') {
      data = value
    }

    if (!isBlank(value)) {
      data = date(value)
    }

    setInputValue(data)
  }, [value, date, isBlank])

  const handleBlur = (event) => {
    onBlur(event)

    if (inputValue && !inputValue.isValid()) {
      setInputValue(null)
    }
  }

  const handleChange = (data) => {
    let current = ''

    if (!isEmpty(data) && data.isValid()) {
      current = data.toJSON()
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
      <KeyboardDatePicker
        {...props}
        autoOk
        className={clsx(className, classes.dateInput)}
        disableToolbar
        inputProps={{ ref }}
        variant="inline"
        value={inputValue}
        format="DD/MM/YYYY"
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

DateInput.propTypes = {
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

DateInput.defaultProps = {
  id: '',
  name: '',
  className: '',
  onChange: () => { },
  onBlur: () => { },
}

export default DateInput
