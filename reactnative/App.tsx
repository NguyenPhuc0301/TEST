import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import {styles} from './src/styles';

/*
|--------------------------------------------------------------------------
| THÔNG TIN ĐỊA ĐIỂM
|--------------------------------------------------------------------------
*/

const LOCATION = {
  name: 'Hà Nội',
  latitude: 21.0285,
  longitude: 105.8542,
};

/*
|--------------------------------------------------------------------------
| KIỂU DỮ LIỆU API
|--------------------------------------------------------------------------
*/

type WeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };

  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

/*
|--------------------------------------------------------------------------
| CHUYỂN WEATHER CODE → ICON + TÊN THỜI TIẾT
|--------------------------------------------------------------------------
*/

const getWeatherInfo = (code: number) => {
  switch (code) {
    case 0:
      return {
        icon: '☀️',
        text: 'Trời quang',
      };

    case 1:
      return {
        icon: '🌤️',
        text: 'Ít mây',
      };

    case 2:
      return {
        icon: '⛅',
        text: 'Có mây',
      };

    case 3:
      return {
        icon: '☁️',
        text: 'Nhiều mây',
      };

    case 45:
    case 48:
      return {
        icon: '🌫️',
        text: 'Sương mù',
      };

    case 51:
    case 53:
    case 55:
      return {
        icon: '🌦️',
        text: 'Mưa phùn',
      };

    case 61:
    case 63:
    case 65:
      return {
        icon: '🌧️',
        text: 'Mưa',
      };

    case 66:
    case 67:
      return {
        icon: '🌧️',
        text: 'Mưa lạnh',
      };

    case 71:
    case 73:
    case 75:
    case 77:
      return {
        icon: '❄️',
        text: 'Tuyết',
      };

    case 80:
    case 81:
    case 82:
      return {
        icon: '🌦️',
        text: 'Mưa rào',
      };

    case 85:
    case 86:
      return {
        icon: '🌨️',
        text: 'Mưa tuyết',
      };

    case 95:
    case 96:
    case 99:
      return {
        icon: '⛈️',
        text: 'Dông',
      };

    default:
      return {
        icon: '🌤️',
        text: 'Không xác định',
      };
  }
};

/*
|--------------------------------------------------------------------------
| FORMAT GIỜ
|--------------------------------------------------------------------------
*/

const formatHour = (time: string) => {
  return time.substring(11, 13) + ':00';
};

/*
|--------------------------------------------------------------------------
| LẤY TÊN THỨ
|--------------------------------------------------------------------------
*/

const getDayName = (dateString: string, index: number) => {
  if (index === 0) {
    return 'Hôm nay';
  }

  const date = new Date(`${dateString}T12:00:00`);

  const days = [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];

  return days[date.getDay()];
};

/*
|--------------------------------------------------------------------------
| APP
|--------------------------------------------------------------------------
*/

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState('');

  /*
  |--------------------------------------------------------------------------
  | GỌI API OPEN-METEO
  |--------------------------------------------------------------------------
  */

  const fetchWeather = async () => {
    try {
      setError('');

      const url =
        'https://api.open-meteo.com/v1/forecast?' +
        `latitude=${LOCATION.latitude}` +
        `&longitude=${LOCATION.longitude}` +
        '&current=' +
        'temperature_2m,' +
        'relative_humidity_2m,' +
        'apparent_temperature,' +
        'weather_code,' +
        'wind_speed_10m,' +
        'is_day' +
        '&hourly=' +
        'temperature_2m,' +
        'weather_code,' +
        'precipitation_probability' +
        '&daily=' +
        'weather_code,' +
        'temperature_2m_max,' +
        'temperature_2m_min' +
        '&forecast_days=7' +
        '&timezone=auto';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();

      setWeather(data);
    } catch (err) {
      console.log('Weather API Error:', err);

      setError(
        'Không thể lấy dữ liệu thời tiết. Vui lòng kiểm tra kết nối mạng.',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | GỌI API KHI MỞ APP
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchWeather();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | PULL TO REFRESH
  |--------------------------------------------------------------------------
  */

  const handleRefresh = () => {
    setRefreshing(true);

    fetchWeather();
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" />

        <ActivityIndicator
          size="large"
          color="#FFFFFF"
        />

        <Text style={styles.loadingText}>
          Đang tải thời tiết Hà Nội...
        </Text>
      </SafeAreaView>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error || !weather) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.errorIcon}>
          ⚠️
        </Text>

        <Text style={styles.errorText}>
          {error || 'Không có dữ liệu thời tiết'}
        </Text>
      </SafeAreaView>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | THÔNG TIN HIỆN TẠI
  |--------------------------------------------------------------------------
  */

  const currentInfo = getWeatherInfo(
    weather.current.weather_code,
  );

  /*
  |--------------------------------------------------------------------------
  | XÁC ĐỊNH GIỜ HIỆN TẠI
  |--------------------------------------------------------------------------
  */

  const currentHour = weather.current.time.substring(0, 13);

  let currentHourIndex = weather.hourly.time.findIndex(
    time => time.substring(0, 13) === currentHour,
  );

  if (currentHourIndex === -1) {
    currentHourIndex = 0;
  }

  /*
  |--------------------------------------------------------------------------
  | LẤY 12 MỐC GIỜ TIẾP THEO
  |--------------------------------------------------------------------------
  */

  const hourlyData = weather.hourly.time
    .map((time, index) => ({
      time,
      temperature: weather.hourly.temperature_2m[index],
      weatherCode: weather.hourly.weather_code[index],
      rain: weather.hourly.precipitation_probability[index],
    }))
    .slice(currentHourIndex, currentHourIndex + 12);

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#243B5A"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#FFFFFF"
          />
        }>

        {/* =====================================================
            PHẦN 1
            HIỆN TẠI
            ===================================================== */}

        <View style={styles.currentSection}>

          <Text style={styles.location}>
            {LOCATION.name}
          </Text>

          <View style={styles.currentMain}>

            <Text style={styles.currentIcon}>
              {currentInfo.icon}
            </Text>

            <Text style={styles.currentTemperature}>
              {Math.round(
                weather.current.temperature_2m,
              )}
              °
            </Text>

          </View>

          <Text style={styles.currentStatus}>
            {currentInfo.text}
          </Text>

          <Text style={styles.feelsLike}>
            Cảm giác như{' '}
            {Math.round(
              weather.current.apparent_temperature,
            )}
            °
          </Text>

          <View style={styles.currentDetails}>

            {/* Độ ẩm */}

            <View style={styles.detailItem}>

              <Text style={styles.detailIcon}>
                💧
              </Text>

              <Text style={styles.detailValue}>
                {weather.current.relative_humidity_2m}%
              </Text>

              <Text style={styles.detailLabel}>
                Độ ẩm
              </Text>

            </View>

            {/* Gió */}

            <View style={styles.detailItem}>

              <Text style={styles.detailIcon}>
                💨
              </Text>

              <Text style={styles.detailValue}>
                {Math.round(
                  weather.current.wind_speed_10m,
                )}
              </Text>

              <Text style={styles.detailLabel}>
                km/h
              </Text>

            </View>

            {/* Nhiệt độ */}

            <View style={styles.detailItem}>

              <Text style={styles.detailIcon}>
                🌡️
              </Text>

              <Text style={styles.detailValue}>
                {Math.round(
                  weather.current.temperature_2m,
                )}
                °
              </Text>

              <Text style={styles.detailLabel}>
                Nhiệt độ
              </Text>

            </View>

          </View>

        </View>

        {/* =====================================================
            PHẦN 2
            THEO GIỜ
            ===================================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Theo giờ
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.hourlyContainer
            }>

            {hourlyData.map((item, index) => {

              const info = getWeatherInfo(
                item.weatherCode,
              );

              return (
                <View
                  key={`${item.time}-${index}`}
                  style={[
                    styles.hourCard,
                    index === 0 &&
                      styles.currentHourCard,
                  ]}>

                  <Text style={styles.hourText}>
                    {index === 0
                      ? 'Bây giờ'
                      : formatHour(item.time)}
                  </Text>

                  <Text style={styles.hourIcon}>
                    {info.icon}
                  </Text>

                  <Text style={styles.hourTemperature}>
                    {Math.round(item.temperature)}°
                  </Text>

                  {item.rain > 0 && (
                    <Text style={styles.rainText}>
                      💧 {item.rain}%
                    </Text>
                  )}

                </View>
              );
            })}

          </ScrollView>

        </View>

        {/* =====================================================
            PHẦN 3
            THEO NGÀY TRONG TUẦN
            ===================================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Theo ngày trong tuần
          </Text>

          <View style={styles.dailyCard}>

            {weather.daily.time.map(
              (date, index) => {

                const info = getWeatherInfo(
                  weather.daily.weather_code[index],
                );

                return (
                  <View
                    key={date}
                    style={[
                      styles.dailyRow,
                      index !==
                        weather.daily.time.length - 1 &&
                        styles.dailyBorder,
                    ]}>

                    {/* TÊN NGÀY */}

                    <View style={styles.dayColumn}>

                      <Text style={styles.dayName}>
                        {getDayName(
                          date,
                          index,
                        )}
                      </Text>

                      <Text style={styles.dateText}>
                        {date.substring(8, 10)}
                        /
                        {date.substring(5, 7)}
                      </Text>

                    </View>

                    {/* THỜI TIẾT */}

                    <View style={styles.dayWeather}>

                      <Text style={styles.dayIcon}>
                        {info.icon}
                      </Text>

                      <Text style={styles.dayStatus}>
                        {info.text}
                      </Text>

                    </View>

                    {/* NHIỆT ĐỘ */}

                    <View
                      style={
                        styles.temperatureColumn
                      }>

                      <Text
                        style={
                          styles.maxTemperature
                        }>
                        {Math.round(
                          weather.daily
                            .temperature_2m_max[
                            index
                          ],
                        )}
                        °
                      </Text>

                      <View
                        style={
                          styles.temperatureBar
                        }>

                        <View
                          style={
                            styles.temperatureBarFill
                          }
                        />

                      </View>

                      <Text
                        style={
                          styles.minTemperature
                        }>
                        {Math.round(
                          weather.daily
                            .temperature_2m_min[
                            index
                          ],
                        )}
                        °
                      </Text>

                    </View>

                  </View>
                );
              },
            )}

          </View>

        </View>

        {/* =====================================================
            NGUỒN DỮ LIỆU
            ===================================================== */}

        <Text style={styles.source}>
          Dữ liệu thời tiết: Open-Meteo
        </Text>

        <View style={styles.bottomSpace} />

      </ScrollView>

    </SafeAreaView>
  );
}

export default App;