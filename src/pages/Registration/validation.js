import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  level: yup.number().required(),
  password: yup
    .string()
    .min(6)
    .max(18)
    .required()
})

export default schema
