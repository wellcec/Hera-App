import { merge } from 'lodash'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

import MuiBaseConfig from './MuiBaseConfig'

const DEFAULT_THEME = {
  id: 'default',
  primary: '#302a48',
}

export const createTheme = (color = DEFAULT_THEME) => {
  const configs = {
    name: color.id,
    palette: {
      primary: {
        main: color.primary,
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#EFEFEF',
        contrastText: '#8B7676',
      },
      text: {
        primary: '#3C3C3C',
      },
      error: {
        main: '#C3284C',
      },
    },
  }

  const theme = createMuiTheme(merge({}, MuiBaseConfig, configs))

  return responsiveFontSizes(theme)
}

export default createTheme
