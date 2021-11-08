import { TextInput } from '@src/components'
import { AuthNavigationProps } from '@src/navigtation/types'
import React from 'react'
import AuthLayout from './AuthLayout'

export interface LoginProps {}

const Login: React.FC<AuthNavigationProps<'Login'>> = ({ navigation }) => {
  return (
    <AuthLayout
      mainButtonTitle='Login'
      mainButtonPressed={() => {}}
      onSignupPressed={() => navigation.navigate('Signup')}
      onForgotPassword={() => navigation.navigate('ForgetPassword')}
      title='Login'>
      <TextInput box icon='mail' placeholder='Your Email' />
      <TextInput box icon='lock' placeholder='Your Password' password />
    </AuthLayout>
  )
}

export default Login
