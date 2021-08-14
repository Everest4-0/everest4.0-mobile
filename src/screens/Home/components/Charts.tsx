import React from 'react'
import 'babel-polyfill'

import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated
} from "react-native";
import { isIphoneX } from 'react-native-iphone-x-helper'

import { icons, COLORS, SIZES, FONTS } from '../../../constants'
import GoalChart from './GoalChart';
import TaskChart from './TaskChart';


export default function Charts({ }) {

  const scrollX = new Animated.Value(0);
  const components=[GoalChart, TaskChart, View];
  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ], { useNativeDriver: false })}
      >
        {
          components?.map((Item, index) => (
            <View
              key={`menu-${index}`}
              style={{ alignItems: 'center' }}
            >
              <View style={{ height: SIZES.height * 0.35 }}>
                <Item/>
              </View>

           </View>
          ))
        }
      </Animated.ScrollView>
    )
  }

  function renderDots() {

    const dotPosition = Animated.divide(scrollX, SIZES.width)

    return (
      <View style={{ height: 50 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding
          }}
        >
          {components?.map((item, index) => {

            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp"
            })

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp"
            })

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.secondary, COLORS.white, COLORS.secondary],
              extrapolate: "clamp"
            })

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor
                }}
              />
            )
          })}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderFoodInfo()}
      {renderDots()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary
  }
})