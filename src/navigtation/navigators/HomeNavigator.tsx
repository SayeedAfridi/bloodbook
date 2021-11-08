import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeRoutes } from '../types'
import { Map } from '@src/Screens/AppDrawer'
import { drawerScreenOptions } from '../options'
import MyDrawer from './Drawer'

const { Navigator, Screen } = createDrawerNavigator<HomeRoutes>()

const HomeNavigator: React.FC = () => {
  return (
    <Navigator
      drawerContent={(props) => <MyDrawer {...props} />}
      screenOptions={drawerScreenOptions}>
      <Screen name='Map' component={Map} />
    </Navigator>
  )
}

export default HomeNavigator
