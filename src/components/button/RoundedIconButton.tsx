import { Box, TouchBox } from '@src/theme'
import React from 'react'
import { RoundedIconProps } from '../RoundedIcon'
import Icon from 'react-native-vector-icons/Feather'

interface RoundedIcnBtnProps extends RoundedIconProps {
  onPress?: () => void
  boxProps?: any
}

const RoundedIconButton: React.FC<RoundedIcnBtnProps> = ({
  onPress,
  iconRatio = 0.6,
  ...props
}: RoundedIcnBtnProps) => {
  const iconSize = props.size * iconRatio
  return (
    <Box
      justifyContent='center'
      alignItems='center'
      borderRadius='round'
      overflow='hidden'>
      <TouchBox
        backgroundColor={props.backgroundColor}
        height={props.size}
        width={props.size}
        android_ripple={{ borderless: true, radius: props.size }}
        justifyContent='center'
        alignItems='center'
        borderRadius='round'
        onPress={onPress}>
        <Icon name={props.name} size={iconSize} />
      </TouchBox>
    </Box>
  )
}

export default RoundedIconButton
