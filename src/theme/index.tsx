import {
  createTheme,
  createText,
  createBox,
  useTheme as useReTheme,
  createVariant,
  createRestyleComponent,
  VariantProps,
} from '@shopify/restyle'
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native'
import palette from './palette'
import textVariants from './textVariants'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import cardVariants from './cardVariants'
import React from 'react'

const theme = createTheme({
  colors: {
    primary: palette.greenLizard,
    lightSecondary: palette.menthol,
    secondary: palette.darkGreen,
    text: palette.black,
    grey: palette.grey,
    white: palette.white,
    offWhite: palette.offWhite,
    lightGrey: palette.lightGrey,
    darkGrey: palette.darkGrey,
    danger: palette.red,
    background: palette.white,
    transparent: 'transparent',
    orange: palette.orange,
    schoolBusYellow: palette.schoolBusYellow,
    purple: palette.purple,
    lightPurple: palette.lightPurple,
    green: palette.green,
    greenYellow: palette.greenYellow,
    yellow: palette.yellow,
    darkYellow: palette.darkYellow,
    teal: palette.teal,
    lightCayan: palette.lightCayan,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 48,
    none: 0,
    bottomTab: 55,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii: {
    s: 5,
    m: 10,
    l: 20,
    xl: 32,
    none: 0,
    round: 100 / 2,
  },
  textVariants,
  cardVariants,
})

export type Theme = typeof theme

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme()
    return styles(currentTheme)
  }

const variant = createVariant({ themeKey: 'cardVariants' })

type CardProps = VariantProps<Theme, 'cardVariants'> & {
  children?: React.ReactNode
}

const CardV = createRestyleComponent<CardProps, Theme>([variant])

export const Card = createBox<Theme, CardProps>(CardV)

const Text = createText<Theme>()

Text.defaultProps = {
  variant: 'body',
}

export const Box = createBox<Theme>()
export const SafeBox = createBox<Theme, SafeAreaViewProps>(SafeAreaView)
export const useTheme = () => useReTheme<Theme>()
export interface TouchBoxProps extends TouchableOpacityProps {
  children?: React.ReactNode | React.ReactNode[]
}
export const TouchBox = createBox<Theme, TouchBoxProps>(
  ({ activeOpacity = 0.75, ...props }) => (
    <TouchableOpacity activeOpacity={activeOpacity} {...props} />
  ),
)

export { Text }

export default theme
