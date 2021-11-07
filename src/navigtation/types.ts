import { RouteProp } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export interface AppNavigationProps<RouteName extends keyof AppStackRoutes> {
  navigation: NativeStackNavigationProp<AppStackRoutes, RouteName>
  route: RouteProp<AppStackRoutes, RouteName>
}

export type AppStackRoutes = {
  Startup: undefined
}

export type AppRoutes = AppStackRoutes
