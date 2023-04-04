import React from 'react'
import { HomeNavigationProps } from '@src/navigtation/types'
import { Container, Header } from '@src/components'
import { Box } from '@src/theme'
import { useMount } from '@src/hooks'
import { getErrorMessage, showErrorSnackbar } from '@src/utils'
import { firestoreService } from '@src/services'
import { userCollection } from '@src/constants/collections'
import { FlatList, RefreshControl } from 'react-native'
import OverLayLoader from '@src/components/OverLayLoader'
import DonorItem from './DonorItem'
import { User } from '@src/types/auth.types'
import { useSelector } from 'react-redux'
import { selectUser } from '@src/redux/auth/auth.selectors'

const Donors: React.FC<HomeNavigationProps<'Donors'>> = ({ navigation }) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [reqs, setReqs] = React.useState<User[]>([])
  const user = useSelector(selectUser)

  const loadReqs = async () => {
    try {
      setLoading(true)
      const userCollectionRef =
        firestoreService.getCollectionRef(userCollection)
      const reqsSnap = await userCollectionRef
        .where('uid', '!=', user?.uid)
        .get()
      const data = firestoreService.convertCollectionsSnapshotToMap(reqsSnap)
      setReqs(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
    }
  }

  useMount(() => {
    loadReqs()
  })
  if (loading) {
    return (
      <Container>
        <Header
          left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
          title='Donors'
        />
        <Box flex={1} backgroundColor='background'>
          <OverLayLoader />
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Header
        left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
        title='Donors'
      />
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
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => <DonorItem donor={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Container>
  )
}

export default Donors
