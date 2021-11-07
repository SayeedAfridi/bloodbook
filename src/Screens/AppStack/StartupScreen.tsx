import Container from '@src/components/Container'
import { Box, Text } from '@src/theme'
import React from 'react'

export interface StartupScreenProps {}

const StartupScreen: React.FC<StartupScreenProps> = ({}) => {
  return (
    <Container>
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Text variant='title'>
          This is a startup screen. Create screen and explore.
        </Text>
      </Box>
    </Container>
  )
}

export default StartupScreen
