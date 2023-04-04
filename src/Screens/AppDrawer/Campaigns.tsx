import React from 'react'
import { HomeNavigationProps } from '@src/navigtation/types'
import { Container, Header, RoundedIconButton } from '@src/components'
import { Box } from '@src/theme'
import { Campaign } from '@src/types/request.types'
import { getErrorMessage, showErrorSnackbar } from '@src/utils'
import { firestoreService } from '@src/services'
import { campaignsCollection } from '@src/constants/collections'
import { FlatList, RefreshControl } from 'react-native'
import OverLayLoader from '@src/components/OverLayLoader'
import CampaignItem from './CampaignItem'
import { useFocusEffect } from '@react-navigation/native'

const Campaigns: React.FC<HomeNavigationProps<'Campaigns'>> = ({
  navigation,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [reqs, setReqs] = React.useState<Campaign[]>([])

  const loadReqs = React.useCallback(async () => {
    try {
      setLoading(true)
      const campaignsRef =
        firestoreService.getCollectionRef(campaignsCollection)
      const reqsSnap = await campaignsRef.get()
      const data = firestoreService.convertCollectionsSnapshotToMap(reqsSnap)
      setReqs(data)
      setLoading(false)
      return () => {}
    } catch (error) {
      setLoading(false)
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
      return () => {}
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      loadReqs()
    }, [loadReqs]),
  )

  if (loading) {
    return (
      <Container>
        <Header
          left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
          title='Campaigns'
        />
        <Box flex={1} backgroundColor='background'>
          <OverLayLoader />
          <Box zIndex={999} position='absolute' bottom={20} right={20}>
            <RoundedIconButton
              size={48}
              color='background'
              backgroundColor='primary'
              name='plus'
              onPress={() => navigation.navigate('CreateCampaign')}
            />
          </Box>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Header
        left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
        title='Campaigns'
      />
      <Box zIndex={999} position='absolute' bottom={20} right={20}>
        <RoundedIconButton
          size={48}
          color='background'
          backgroundColor='primary'
          name='plus'
          onPress={() => navigation.navigate('CreateCampaign')}
        />
      </Box>
      <Box
        flex={1}
        backgroundColor='background'
        paddingHorizontal='s'
        paddingVertical='s'>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={loadReqs} />
          }
          data={reqs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CampaignItem camp={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Container>
  )
}

export default Campaigns
