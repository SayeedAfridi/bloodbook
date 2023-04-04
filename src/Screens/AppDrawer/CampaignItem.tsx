import { Campaign } from '@src/types/request.types'
import React from 'react'
import { Box, Card, Text } from '@src/theme'
import { Image, Linking } from 'react-native'
import { hp } from '@src/utils'
import dayjs from 'dayjs'
import { Button, Spacer } from '@src/components'

export interface CampaignItemProps {
  camp: Campaign
}

const CampaignItem: React.FC<CampaignItemProps> = ({ camp }) => {
  return (
    <Card variant='elevated' padding='none' overflow='hidden'>
      <Image source={{ uri: camp.image }} style={{ height: hp(20) }} />
      <Box padding='m'>
        <Text variant='title'>{camp.title}</Text>
        <Text variant='subtitle'>
          From: {dayjs(camp.startDate).format('dddd, DD MMMM, YYYY')}
        </Text>
        <Text variant='subtitle'>
          To: {dayjs(camp.endDate).format('dddd, DD MMMM, YYYY')}
        </Text>
        <Spacer space='tiny' />
        <Text variant='subtitle'>Location: {camp.location}</Text>
      </Box>
      <Box paddingHorizontal='m' paddingBottom='m'>
        <Button
          variant='secondary'
          title='Call Organizer'
          onPress={() => Linking.openURL(`tel:${camp.createdBy.phone}`)}
        />
      </Box>
    </Card>
  )
}

export default CampaignItem
