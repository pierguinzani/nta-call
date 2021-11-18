import React from 'react'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-utils-scale'
import { styles } from './styles'
import Text from '../Text'

const Button = ({
  fontSize,
  bgColor,
  style,
  textColor,
  title,
  onPress,
  border = false,
  disabled
}) => {
  if (border) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          {
            borderColor: textColor === '' ? 'gray' : textColor,
            borderWidth: scale(0.4),
          },
          style,
        ]}
        disabled={disabled}
        >
        <Text
          style={[
            styles.text,
            {
              color: textColor === '' ? 'gray' : textColor,
            },
            fontSize && { fontSize: scale(fontSize) },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: bgColor === '' ? 'black' : bgColor },
        style,
      ]}>
      <Text
        style={[
          styles.text,
          { color: textColor === '' ? 'gray' : textColor },
          fontSize && { fontSize: scale(fontSize) },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
