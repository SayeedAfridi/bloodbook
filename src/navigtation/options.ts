import { DrawerNavigationOptions } from '@react-navigation/drawer'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Platform } from 'react-native'

export const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
}

export const drawerScreenOptions: DrawerNavigationOptions = {
  headerShown: false,
}
