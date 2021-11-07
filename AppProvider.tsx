import RootNavigation from '@src/navigtation/RootNavigation'
import App from './App'
import React from 'react'
import { ThemeProvider } from '@shopify/restyle'
import theme from '@src/theme'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const AppProvider: React.FC = () => {
  return (
    <RootNavigation>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </ThemeProvider>
    </RootNavigation>
  )
}

export default AppProvider
