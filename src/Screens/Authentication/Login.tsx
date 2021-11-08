import { TextInput } from '@src/components'
import { AuthNavigationProps } from '@src/navigtation/types'
import React from 'react'
import AuthLayout from './AuthLayout'
import { useFormik } from 'formik'
import { loginSchema } from '@src/validations/user.validations'
import { useSelector } from 'react-redux'
import { selectIsLoggingIn } from '@src/redux/auth/auth.selectors'
import { loginAsync } from '@src/redux/auth/auth.async'
import { useAppDispatch } from '@src/hooks'

export interface LoginProps {}

const initialValues = {
  email: '',
  password: '',
}

const Login: React.FC<AuthNavigationProps<'Login'>> = ({ navigation }) => {
  const loading = useSelector(selectIsLoggingIn)
  const dispatch = useAppDispatch()

  const onSubmit = (v: typeof initialValues) => {
    dispatch(loginAsync(v))
  }
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema: loginSchema,
    })
  return (
    <AuthLayout
      mainButtonTitle='Login'
      mainButtonPressed={handleSubmit}
      onSignupPressed={() => navigation.navigate('Signup')}
      onForgotPassword={() => navigation.navigate('ForgetPassword')}
      busy={loading}
      title='Login'>
      <TextInput
        box
        icon='mail'
        placeholder='Your Email'
        value={values.email}
        touched={touched.email}
        error={errors.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        box
        icon='lock'
        placeholder='Your Password'
        password
        value={values.password}
        touched={touched.password}
        error={errors.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        autoCapitalize='none'
      />
    </AuthLayout>
  )
}

export default Login
