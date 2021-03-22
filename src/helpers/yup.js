import * as Yup from 'yup'

const YUP_MESSAGE = {
  email: 'E-mail inválido.',
  invalid: 'Valor inválido.',
  required: 'Campo obrigatório.',
  max: ({ max }) => `Digite no máximo ${max} caracteres`,
}

Yup.setLocale({
  mixed: {
    default: YUP_MESSAGE.invalid,
    notType: YUP_MESSAGE.invalid,
    required: YUP_MESSAGE.required,
  },
  number: {
    integer: YUP_MESSAGE.invalid,
  },
  string: {
    max: YUP_MESSAGE.max,
    email: YUP_MESSAGE.email,
  },
})

export default YUP_MESSAGE
