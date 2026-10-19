import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DetailItem} from '../types/weather';
import {colors} from '../theme/colors';

export default function CurrentWeather({placeName, item}: {placeName: string; item: DetailItem}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.location}>📍 {placeName}</Text>
      <View style={styles.main}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.temp}>{Math.round(item.temperature)}°</Text>
      </View>
      <Text style={styles.status}>{item.text}</Text>
      <Text style={styles.range}>
        Cao nhất {Math.round(item.tempMax)}° · Thấp nhất {Math.round(item.tempMin)}°
      </Text>
      <Text style={styles.feels}>Cảm giác như {Math.round(item.feelsLike)}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', paddingTop: 24, paddingBottom: 28, paddingHorizontal: 20},
  location: {color: colors.text, fontSize: 26, fontWeight: '700'},
  main: {flexDirection: 'row', alignItems: 'center', marginTop: 16},
  icon: {fontSize: 64, marginRight: 12},
  temp: {color: colors.text, fontSize: 76, fontWeight: '300'},
  status: {color: colors.text, fontSize: 22, marginTop: 4},
  range: {color: colors.textSoft, fontSize: 16, marginTop: 10},
  feels: {color: '#C9D6E5', fontSize: 15, marginTop: 4},
});
