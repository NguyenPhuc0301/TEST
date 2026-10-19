import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors, getHeroColor} from '../theme/colors';
import MetricsGrid from '../components/MetricsGrid';
import {formatClock} from '../utils/transform';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({route}: Props) {
  const {item, placeName} = route.params;
  const isDay = item.kind === 'day';

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 30}}>
      <View style={[styles.hero, {backgroundColor: getHeroColor(0, item.isDay)}]}>
        <Text style={styles.place}>📍 {placeName}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <View style={styles.main}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.temp}>{Math.round(item.temperature)}°</Text>
        </View>
        <Text style={styles.status}>{item.text}</Text>
        {isDay ? (
          <Text style={styles.range}>
            Cao nhất {Math.round(item.tempMax)}° · Thấp nhất {Math.round(item.tempMin)}°
          </Text>
        ) : (
          <Text style={styles.range}>Cảm giác như {Math.round(item.feelsLike)}°</Text>
        )}
      </View>

      {!!item.sunrise && (
        <View style={styles.sun}>
          <Text style={styles.sunText}>🌅 Mặt trời mọc {formatClock(item.sunrise)}</Text>
          <Text style={styles.sunText}>🌇 Mặt trời lặn {formatClock(item.sunset)}</Text>
        </View>
      )}

      <MetricsGrid item={item} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  hero: {alignItems: 'center', paddingTop: 20, paddingBottom: 26, paddingHorizontal: 20, marginBottom: 12},
  place: {color: colors.text, fontSize: 20, fontWeight: '700'},
  subtitle: {color: colors.textSoft, fontSize: 14, marginTop: 4},
  main: {flexDirection: 'row', alignItems: 'center', marginTop: 14},
  icon: {fontSize: 56, marginRight: 10},
  temp: {color: colors.text, fontSize: 68, fontWeight: '300'},
  status: {color: colors.text, fontSize: 20, marginTop: 2},
  range: {color: colors.textSoft, fontSize: 15, marginTop: 8},
  sun: {flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 15, marginBottom: 10, paddingVertical: 12, backgroundColor: colors.card, borderRadius: 18},
  sunText: {color: colors.textSoft, fontSize: 13},
});
