import React, {useMemo} from 'react';
import {RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {DEFAULT_PLACE, useWeather} from '../hooks/useWeather';
import {buildDailyItems, buildHourlyItems, buildNowItem} from '../utils/transform';
import {DetailItem} from '../types/weather';
import {colors, getHeroColor} from '../theme/colors';
import StateView from '../components/StateView';
import FadeInView from '../components/FadeInView';
import CurrentWeather from '../components/CurrentWeather';
import HourlyList from '../components/HourlyList';
import DailyList from '../components/DailyList';
import MetricsGrid from '../components/MetricsGrid';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const {status, weather, place, refreshing, message, load} = useWeather();

  const model = useMemo(() => {
    if (!weather) return null;
    return {now: buildNowItem(weather), hourly: buildHourlyItems(weather), daily: buildDailyItems(weather)};
  }, [weather]);

  if (status === 'loading' && !weather) {
    return <StateView loading title="Đang lấy vị trí và thời tiết…" />;
  }
  if (status === 'denied') {
    return (
      <StateView
        icon="📍"
        title="Cần quyền truy cập vị trí"
        message="Cho phép dùng vị trí để xem thời tiết nơi bạn đang ở, hoặc xem thời tiết Hà Nội."
        actions={[
          {label: 'Cấp quyền và thử lại', onPress: () => load({useDefault: false}), primary: true},
          {label: `Xem thời tiết ${DEFAULT_PLACE.name}`, onPress: () => load({useDefault: true})},
        ]}
      />
    );
  }
  if (status === 'error') {
    return (
      <StateView
        icon="⚠️"
        title="Không tải được thời tiết"
        message="Kiểm tra kết nối mạng và vị trí của thiết bị, rồi thử lại."
        actions={[{label: 'Thử lại', onPress: () => load(), primary: true}]}
      />
    );
  }
  if (status === 'empty' || !model) {
    return (
      <StateView
        icon="🌫️"
        title="Chưa có dữ liệu dự báo"
        message="Nguồn dữ liệu chưa trả về dự báo cho khu vực này."
        actions={[
          {label: 'Tải lại', onPress: () => load(), primary: true},
          {label: `Xem thời tiết ${DEFAULT_PLACE.name}`, onPress: () => load({useDefault: true})},
        ]}
      />
    );
  }

  const openDetail = (item: DetailItem) => navigation.navigate('Detail', {item, placeName: place.name});
  const hero = getHeroColor(weather!.current.weather_code, model.now.isDay);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={hero} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => load({refresh: true})}
            tintColor={colors.text}
          />
        }>
        <FadeInView>
          {!!message && <Text style={styles.banner}>{message}</Text>}

          <View style={{backgroundColor: hero}}>
            <CurrentWeather placeName={place.name} item={model.now} />
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Theo giờ · 24 giờ tới</Text>
            <HourlyList items={model.hourly} onPress={openDetail} />
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Theo ngày · 7 ngày tới</Text>
            <DailyList items={model.daily} onPress={openDetail} />
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Chỉ số hiện tại</Text>
            <MetricsGrid item={model.now} />
          </View>

          <Text style={styles.source}>Dữ liệu thời tiết: Open-Meteo</Text>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  banner: {backgroundColor: colors.danger, color: colors.text, textAlign: 'center', paddingVertical: 8, paddingHorizontal: 16, fontSize: 13},
  section: {marginTop: 12, paddingTop: 20, paddingBottom: 10, backgroundColor: colors.surface},
  title: {color: colors.text, fontSize: 18, fontWeight: '700', paddingHorizontal: 20, marginBottom: 14},
  source: {color: colors.textMuted, textAlign: 'center', fontSize: 12, marginVertical: 24},
});
