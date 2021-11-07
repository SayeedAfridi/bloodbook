import { Spacer } from '@src/components'
import { Box, Text } from '@src/theme'
import LottieView from 'lottie-react-native'
import React from 'react'

export interface StartupScreenProps {}

const AnimationSize = 200

const StartupScreen: React.FC<StartupScreenProps> = ({}) => {
  return (
    <Box
      backgroundColor='background'
      flex={1}
      justifyContent='center'
      alignItems='center'>
      <LottieView
        style={{ height: AnimationSize }}
        source={require('@src/assets/animations/blood-donate.json')}
        loop={true}
        autoPlay={true}
      />
      <Spacer space='large' />
      <Text color='grey' variant='logo'>
        Donate Blood , Save Life ❤️
      </Text>
    </Box>
  )
}

export default StartupScreen
