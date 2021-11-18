import React from 'react'
import { Text as NativeText } from 'react-native'
import { fontScale } from 'react-native-utils-scale'

const Text = ({ fontSize = 14, bold, color, style, children, ...props }) => {
  return (
    <NativeText
      {...props}
      style={[
        {
          fontSize: fontScale(fontSize),
          color: !color ? 'black' : color,
        },
        bold && { fontWeight: 'bold' },
        style,
      ]}>
      {children}
    </NativeText>
  )
}


export default Text
