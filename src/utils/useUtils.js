import { useCallback } from 'react'
import { isEmpty, truncate } from 'lodash'
import moment from 'moment'

import 'moment/locale/pt-br'

moment.locale('pt-br')

const useUtils = () => {
  const isBlank = useCallback((value) => {
    let data = ''

    if (typeof value === 'boolean') {
      data = `${value}`
    } else {
      data = `${value || ''}`
    }

    return isEmpty(data) || data.trim().length === 0
  }, [])

  const date = useCallback((value) => (value ? moment(value) : moment()), [])

  const formatHours = useCallback((value) => value && moment(value, "HH:mm:ss").format("HH:mm"), [])

  const formatDate = useCallback((value) => value && moment(value).format('DD/MM/YYYY'), [])

  const formatTruncate = useCallback((text, length) => {
    let complete = (text.length > length) ? '...' : ''

    return `${truncate(text, length)}${complete}`
  }, [])

  return {
    date,
    isBlank,
    formatDate,
    formatHours,
    formatTruncate,
  }
}

export default useUtils
