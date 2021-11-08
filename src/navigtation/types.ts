import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export interface AppNavigationProps<RouteName extends keyof AppStackRoutes> {
  navigation: NativeStackNavigationProp<AppStackRoutes, RouteName>
  route: RouteProp<AppStackRoutes, RouteName>
}

export type AppStackRoutes = {
  Startup: undefined
  Authentication: undefined
}

export type AppRoutes = AppStackRoutes & AuthRoutes

export interface AuthNavigationProps<RouteName extends keyof AuthRoutes> {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AuthRoutes, RouteName>,
    NativeStackNavigationProp<AppStackRoutes, 'Authentication'>
  >
  route: RouteProp<AuthRoutes, RouteName>
}

export type AuthRoutes = {
  Login: undefined
  Signup: undefined
  ForgetPassword: undefined
}
