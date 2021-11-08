import { TextInput } from '@src/components'
import { AuthNavigationProps } from '@src/navigtation/types'
import React from 'react'
import AuthLayout from './AuthLayout'

export interface LoginProps {}

const Signup: React.FC<AuthNavigationProps<'Signup'>> = ({ navigation }) => {
  return (
    <AuthLayout
      mainButtonTitle='Signup'
      mainButtonPressed={() => {}}
      onSignupPressed={() => navigation.navigate('Login')}
      signUpTitle='Already have an account? Login'
      onBackButtonPressed={() => navigation.goBack()}
      title='Signup'>
      <TextInput box icon='mail' placeholder='Your Email' />
      <TextInput box icon='lock' placeholder='Your Password' password />
      <TextInput box icon='lock' placeholder='Confirm Password' password />
    </AuthLayout>
  )
}

export default Signup
