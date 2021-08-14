import React from 'react'
import { View, Dimensions, Text } from 'react-native'
import {
  BarChart,
} from 'react-native-chart-kit'
import { data } from './data'
import 'babel-polyfill'
import { COLORS } from '../../../constants'

// in Expo - swipe left to see the following styling, or create your own
const chartConfig = {
  backgroundColor: COLORS.primary,
  backgroundGradientFrom: COLORS.primary,
  backgroundGradientTo: COLORS.solid,
  fillShadowGradient: '#000',
  backgroundGradientToOpacity: 0.6,
  barRadius: 5,
  style: {},
  color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
}
const labelStyle = {
  color: chartConfig.color(),
  marginVertical: 10,
  textAlign: 'center',
  fontSize: 18
}
const graphStyle = {
  borderRadius: 15,
  ...chartConfig.style
}

export default function TaskChart({ }) {

  const width = Dimensions.get('window').width - 30
  const height = 220

  return (
    <View

      style={{
        backgroundColor: chartConfig.backgroundColor, padding: 15
      }}
    >
      <Text style={labelStyle}>Bar Graph</Text>
      <BarChart
        width={width}
        height={height}
        data={data}
        chartConfig={chartConfig}
        style={graphStyle}
      />
    </View>
  )


}