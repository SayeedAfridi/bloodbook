import { useMount } from '@src/hooks'
import { HomeNavigationProps } from '@src/navigtation/types'
import { geoService } from '@src/services'
import { Box } from '@src/theme'
import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geo from 'react-native-geolocation-service'
import { RoundedIconButton } from '@src/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Map: React.FC<HomeNavigationProps<'Map'>> = ({ navigation }) => {
  const [location, setLocation] = React.useState<Geo.GeoPosition | undefined>(
    undefined,
  )
  const [loading, setLoading] = React.useState<boolean>(false)
  const insets = useSafeAreaInsets()

  useMount(async () => {
    setLoading(true)
    const position = await geoService.getCurrentPosition()
    setLocation(position)
    setLoading(false)
  })
  return (
    <Box flex={1} backgroundColor='background'>
      <Box zIndex={999} position='absolute' top={insets.top + 20} left={20}>
        <RoundedIconButton
          size={38}
          color='text'
          backgroundColor='background'
          name='menu'
          onPress={() => navigation.openDrawer()}
        />
      </Box>

      <Box zIndex={999} position='absolute' bottom={20} right={20}>
        <RoundedIconButton
          size={48}
          color='background'
          backgroundColor='primary'
          name='plus'
          onPress={() => navigation.openDrawer()}
        />
      </Box>
      <Box style={StyleSheet.absoluteFill}>
        {!loading && location ? (
          <MapView
            style={StyleSheet.absoluteFill}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0045,
              longitudeDelta: 0.0095,
            }}
            // initialRegion={location}

            // customMapStyle={mapStyle}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              flat={true}
              title='My Location'
            />
          </MapView>
        ) : null}
      </Box>
    </Box>
  )
}

export default Map
