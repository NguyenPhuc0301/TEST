import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {DetailItem} from '../types/weather';
import {colors} from '../theme/colors';

type Props = {items: DetailItem[]; onPress: (item: DetailItem) => void};

export default function DailyList({items, onPress}: Props) {
  // Thanh nhiệt độ: vị trí/độ dài theo khoảng min–max của cả tuần
  const weekMin = Math.min(...items.map(i => i.tempMin));
  const weekMax = Math.max(...items.map(i => i.tempMax));
  const range = Math.max(weekMax - weekMin, 1);

  return (
    <View style={styles.card}>
      {items.map((item, index) => {
        const left = ((item.tempMin - weekMin) / range) * 100;
        const width = Math.max(((item.tempMax - item.tempMin) / range) * 100, 8);
        return (
          <Pressable
            key={item.id}
            onPress={() => onPress(item)}
            style={({pressed}) => [
              styles.row,
              index !== items.length - 1 && styles.border,
              pressed && styles.pressed,
            ]}>
            <View style={styles.dayCol}>
              <Text style={styles.dayName}>{item.title}</Text>
              <Text style={styles.date}>{item.subtitle.split(', ')[1]}</Text>
            </View>

            <View style={styles.weather}>
              <Text style={styles.icon}>{item.icon}</Text>
              <View>
                <Text style={styles.status}>{item.text}</Text>
                <Text style={styles.rain}>💧 {Math.round(item.rainProbability)}%</Text>
              </View>
            </View>

            <View style={styles.tempCol}>
              <Text style={styles.min}>{Math.round(item.tempMin)}°</Text>
              <View style={styles.track}>
                <View style={[styles.fill, {left: `${left}%`, width: `${Math.min(width, 100 - left)}%`}]} />
              </View>
              <Text style={styles.max}>{Math.round(item.tempMax)}°</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {backgroundColor: colors.card, marginHorizontal: 15, borderRadius: 18, overflow: 'hidden'},
  row: {minHeight: 78, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15},
  border: {borderBottomWidth: 1, borderBottomColor: colors.border},
  pressed: {backgroundColor: '#2A4768'},
  dayCol: {width: 78},
  dayName: {color: colors.text, fontSize: 15, fontWeight: '700'},
  date: {color: colors.textMuted, fontSize: 12, marginTop: 3},
  weather: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  icon: {fontSize: 25, marginRight: 8},
  status: {color: colors.textSoft, fontSize: 12},
  rain: {color: colors.rain, fontSize: 11, marginTop: 2},
  tempCol: {width: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'},
  min: {color: '#AFC0D3', fontSize: 15, width: 32, textAlign: 'right'},
  track: {width: 46, height: 5, backgroundColor: '#4E647C', borderRadius: 5, marginHorizontal: 8, overflow: 'hidden'},
  fill: {position: 'absolute', top: 0, bottom: 0, backgroundColor: colors.accent, borderRadius: 5},
  max: {color: colors.text, fontSize: 15, width: 32},
});
