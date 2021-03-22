import typography from './typography'
import { buttonStyle, buttonPrimaryStyle } from './MuiButton'
import MuiPaper from './MuiPaper'

export default {
  direction: 'ltr',
  sizes: {
    header: 80,
    nav: window.innerWidth < 1920 ? 250 : 300,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,

  },
  typography,
  overrides: {
    MuiPaper,
    MuiButton: {
      text: {
        ...buttonStyle,
        padding: 5,
        minWidth: 0,
      },
      outlined: buttonStyle,
      containedPrimary: buttonPrimaryStyle,
      containedSecondary: buttonStyle,
    },
    MuiInput: {
      underline: {
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottomColor: '#949494',
        },
      },
      colorSecondary: {
        '&$focused::after': {
          borderBottomColor: '#595959',
        },
        '&.MuiInput-underline::after': {
          borderBottomColor: '#595959',
        },
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: 14,
      },
      colorSecondary: {
        '&.Mui-focused': {
          color: '#595959',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1600,
    },
  },
}
