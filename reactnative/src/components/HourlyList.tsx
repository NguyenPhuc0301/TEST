import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {DetailItem} from '../types/weather';
import {colors} from '../theme/colors';

type Props = {items: DetailItem[]; onPress: (item: DetailItem) => void};

export default function HourlyList({items, onPress}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {items.map((item, index) => (
        <Pressable
          key={item.id}
          onPress={() => onPress(item)}
          style={({pressed}) => [
            styles.card,
            index === 0 && styles.cardNow,
            pressed && styles.pressed,
          ]}>
          <Text style={styles.time}>{item.title}</Text>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.temp}>{Math.round(item.temperature)}°</Text>
          <Text style={styles.rain}>💧 {Math.round(item.rainProbability)}%</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 15, paddingBottom: 10},
  card: {width: 78, height: 150, backgroundColor: colors.card, borderRadius: 18, marginHorizontal: 5, paddingVertical: 14, alignItems: 'center', justifyContent: 'space-between'},
  cardNow: {backgroundColor: colors.cardActive},
  pressed: {opacity: 0.7},
  time: {color: '#DCE7F2', fontSize: 13},
  icon: {fontSize: 28},
  temp: {color: colors.text, fontSize: 21, fontWeight: '700'},
  rain: {color: colors.rain, fontSize: 11},
});
