import { useNavigation } from '@react-navigation/native'
import { Button, Spacer } from '@src/components'
import { Box, Card, Text } from '@src/theme'
import { User } from '@src/types/auth.types'
import { fp } from '@src/utils'
import dayjs from 'dayjs'
import React from 'react'
import { Linking } from 'react-native'

export interface DonorItemProps {
  donor: User
}

const DonorItem: React.FC<DonorItemProps> = ({ donor }) => {
  const nav = useNavigation<any>()
  const isNotElligible =
    donor.lastDonated && dayjs().isBefore(dayjs(donor.lastDonated).add(4, 'M'))
  return (
    <Card variant='elevated' justifyContent='flex-start'>
      <Box marginHorizontal='s'>
        <Text color='text' fontSize={fp(2.5)} variant='logo' textAlign='left'>
          {donor.name}
        </Text>
        <Text variant='button' color='grey'>
          Blood Group: {donor.bloodGroup}
        </Text>
        <Text variant='button' color='grey'>
          {isNotElligible ? 'Not e' : 'E'}
          ligible for donation
        </Text>
      </Box>
      {!isNotElligible ? (
        <>
          <Spacer space='medium' />
          <Box flexDirection='row'>
            <Button
              title='Request'
              variant='primary'
              onPress={() => nav.navigate('CreateRequest', { toUser: donor })}
              hBlock
            />
            <Button
              title='Call Now'
              onPress={() => Linking.openURL(`tel:${donor.phone}`)}
              variant='secondary'
              hBlock
            />
          </Box>
        </>
      ) : null}
    </Card>
  )
}

export default DonorItem
