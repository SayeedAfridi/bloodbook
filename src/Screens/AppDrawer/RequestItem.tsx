import { Button, Spacer } from '@src/components'
import { Box, Card, Text, TouchBox } from '@src/theme'
import { BloodRequest } from '@src/types/request.types'
import { fp, showErrorSnackbar } from '@src/utils'
import React from 'react'
import { Linking } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Share from 'react-native-share'

export interface RequestItemProps {
  req: BloodRequest
}

const RequestItem: React.FC<RequestItemProps> = ({ req }) => {
  const shareOnFB = React.useCallback(() => {
    Share.open({
      title: 'Urgent blood needed',
      message: `${req.bloodGroup} blood needed at ${req.address}. For more information call ${req.phone}`,
    }).catch(() => {
      showErrorSnackbar('Something went wrong!')
    })
  }, [req.address, req.bloodGroup, req.phone])

  return (
    <Card variant='elevated'>
      <Text color='danger' fontSize={fp(3)} variant='logo'>
        {req.bloodGroup}
      </Text>
      <Text variant='subtitle' textAlign='center'>
        Blood needed
      </Text>
      <Spacer space='medium' />
      <Text variant='button' color='text'>
        <Icon name='map-pin' /> {req.address}
      </Text>
      <TouchBox onPress={() => Linking.openURL(`tel:${req.phone}`)}>
        <Text variant='button' color='text'>
          <Icon name='phone' /> {req.phone}
        </Text>
      </TouchBox>
      <Box marginTop='s'>
        <Button onPress={shareOnFB} variant='secondary' title='Share Request' />
      </Box>
    </Card>
  )
}

export default RequestItem
