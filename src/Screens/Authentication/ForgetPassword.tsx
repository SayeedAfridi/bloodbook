import { TextInput } from '@src/components'
import { AuthNavigationProps } from '@src/navigtation/types'
import React from 'react'
import AuthLayout from './AuthLayout'

export interface LoginProps {}

const ForgetPassword: React.FC<AuthNavigationProps<'ForgetPassword'>> = ({
  navigation,
}) => {
  return (
    <AuthLayout
      mainButtonTitle='Send Code'
      onBackButtonPressed={() => navigation.goBack()}
      mainButtonPressed={() => {}}
      onSignupPressed={() => navigation.navigate('Login')}
      signUpTitle='Have an account? Login'
      animation={require('@src/assets/animations/forgetpass.json')}
      title='Forget Password'>
      <TextInput box icon='mail' placeholder='Your Email' />
    </AuthLayout>
  )
}

export default ForgetPassword
