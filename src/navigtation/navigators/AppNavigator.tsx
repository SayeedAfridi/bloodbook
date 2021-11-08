import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackRoutes } from '../types'
import StartupScreen from '@src/Screens/AppStack/StartupScreen'
import { stackScreenOptions } from '../options'
import AuthNavigator from './AuthNavigator'

const { Navigator, Screen } = createNativeStackNavigator<AppStackRoutes>()

const AppNavigator: React.FC = () => {
  return (
    <Navigator screenOptions={stackScreenOptions}>
      <Screen name='Startup' component={StartupScreen} />
      <Screen name='Authentication' component={AuthNavigator} />
    </Navigator>
  )
}

export default AppNavigator
