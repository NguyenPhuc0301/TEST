import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {DetailItem} from '../types/weather';
import {colors} from '../theme/colors';
import {getHumidityLabel, getUvLevel, getWindDirectionName} from '../utils/weatherInfo';

/** Thanh tiến trình; chạy từ 0 đến giá trị mỗi khi màn hình mở. */
function Bar({ratio, color = colors.accent}: {ratio: number; color?: string}) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(value, {toValue: Math.min(Math.max(ratio, 0), 1), duration: 600, useNativeDriver: false}).start();
  }, [ratio, value]);
  const width = value.interpolate({inputRange: [0, 1], outputRange: ['0%', '100%']});
  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, {width, backgroundColor: color}]} />
    </View>
  );
}

function Card({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Compass({deg}: {deg: number}) {
  return (
    <View style={styles.compass}>
      <Text style={[styles.cardinal, styles.north]}>B</Text>
      <Text style={[styles.cardinal, styles.south]}>N</Text>
      <Text style={[styles.cardinal, styles.east]}>Đ</Text>
      <Text style={[styles.cardinal, styles.west]}>T</Text>
      {/* Mũi tên chỉ hướng gió thổi tới = hướng gió + 180° */}
      <Text style={[styles.arrow, {transform: [{rotate: `${(deg + 180) % 360}deg`}]}]}>↑</Text>
    </View>
  );
}

export default function MetricsGrid({item}: {item: DetailItem}) {
  const uv = getUvLevel(item.uvIndex);
  const isDay = item.kind === 'day';

  return (
    <View style={styles.grid}>
      <Card title="🌡️ Nhiệt độ">
        <Text style={styles.value}>{Math.round(item.temperature)}°</Text>
        <Bar ratio={(item.temperature + 5) / 50} />
        <Text style={styles.sub}>
          {isDay
            ? `Thấp nhất ${Math.round(item.tempMin)}°`
            : `Cảm giác như ${Math.round(item.feelsLike)}°`}
        </Text>
      </Card>

      <Card title="💧 Độ ẩm">
        <Text style={styles.value}>{Math.round(item.humidity)}%</Text>
        <Bar ratio={item.humidity / 100} color="#5AB8F5" />
        <Text style={styles.sub}>{getHumidityLabel(item.humidity)}</Text>
      </Card>

      <Card title="💨 Tốc độ gió">
        <Text style={styles.value}>
          {Math.round(item.windSpeed)}
          <Text style={styles.unit}> km/h</Text>
        </Text>
        <Bar ratio={item.windSpeed / 50} color="#8FD3C9" />
        <Text style={styles.sub}>{isDay ? 'Mạnh nhất trong ngày' : 'Tại độ cao 10 m'}</Text>
      </Card>

      <Card title="🧭 Hướng gió">
        <View style={styles.compassRow}>
          <Compass deg={item.windDirection} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.valueSmall}>{getWindDirectionName(item.windDirection)}</Text>
            <Text style={styles.sub}>{Math.round(item.windDirection)}°</Text>
          </View>
        </View>
      </Card>

      <Card title="☀️ Chỉ số UV">
        <Text style={styles.value}>{item.uvIndex.toFixed(1)}</Text>
        <Bar ratio={item.uvIndex / 11} color={uv.color} />
        <Text style={[styles.sub, {color: uv.color}]}>{uv.label}</Text>
      </Card>

      <Card title="🌧️ Lượng mưa">
        <Text style={styles.value}>
          {item.precipitation.toFixed(1)}
          <Text style={styles.unit}> mm</Text>
        </Text>
        <Bar ratio={item.rainProbability / 100} color={colors.rain} />
        <Text style={styles.sub}>Khả năng mưa {Math.round(item.rainProbability)}%</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10},
  card: {width: '48%', margin: '1%', backgroundColor: colors.card, borderRadius: 18, padding: 14, minHeight: 124},
  cardTitle: {color: colors.textMuted, fontSize: 13, marginBottom: 8},
  value: {color: colors.text, fontSize: 28, fontWeight: '600', marginBottom: 10},
  valueSmall: {color: colors.text, fontSize: 18, fontWeight: '600'},
  unit: {fontSize: 14, fontWeight: '400', color: colors.textSoft},
  sub: {color: colors.textSoft, fontSize: 12, marginTop: 8},
  track: {height: 6, backgroundColor: '#4E647C', borderRadius: 6, overflow: 'hidden'},
  fill: {height: '100%', borderRadius: 6},
  compassRow: {flexDirection: 'row', alignItems: 'center', marginTop: 2},
  compass: {width: 68, height: 68, borderRadius: 34, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center'},
  arrow: {color: colors.accent, fontSize: 30, fontWeight: '700'},
  cardinal: {position: 'absolute', color: colors.textMuted, fontSize: 9},
  north: {top: 2},
  south: {bottom: 2},
  east: {right: 4},
  west: {left: 4},
});
