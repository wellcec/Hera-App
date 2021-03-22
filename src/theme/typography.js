const font = ['Poppins', 'sans-serif'].join(',')

const textStyle = {
  fontFamily: font,
  fontWeight: 600,
  color: '#595959',
}

export default {
  fontFamily: ['Open Sans', 'sans-serif'].join(','),
  h1: textStyle,
  h2: textStyle,
  h3: textStyle,
  h4: textStyle,
  h5: textStyle,
  h6: textStyle,
  subtitle1: {
    fontFamily: font,
  },
  subtitle2: {
    fontFamily: font,
  },
  body2: {
    fontSize: window.innerWidth < 1600 ? '.75rem' : '.85rem',
  },
}
