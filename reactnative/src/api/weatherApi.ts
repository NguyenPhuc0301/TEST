import {Coords, WeatherData} from '../types/weather';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

const PARAMS = {
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'precipitation',
    'weather_code',
    'wind_speed_10m',
    'wind_direction_10m',
    'is_day',
  ].join(','),
  hourly: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'precipitation_probability',
    'precipitation',
    'weather_code',
    'wind_speed_10m',
    'wind_direction_10m',
    'uv_index',
    'is_day',
  ].join(','),
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'precipitation_probability_max',
    'precipitation_sum',
    'wind_speed_10m_max',
    'wind_direction_10m_dominant',
    'uv_index_max',
    'sunrise',
    'sunset',
  ].join(','),
  forecast_days: 7,
  timezone: 'auto',
};

export async function fetchWeather({latitude, longitude}: Coords): Promise<WeatherData> {
  const query = Object.entries({latitude, longitude, ...PARAMS})
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  const response = await fetch(`${FORECAST_URL}?${query}`);
  if (!response.ok) {
    throw new Error(`Open-Meteo trả về lỗi ${response.status}`);
  }
  return response.json();
}

/** Open-Meteo không có reverse geocoding → dùng BigDataCloud (miễn phí, không cần key). */
export async function fetchPlaceName({latitude, longitude}: Coords): Promise<string> {
  const url =
    'https://api.bigdatacloud.net/data/reverse-geocode-client' +
    `?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Không lấy được tên địa điểm');
  }
  const json = await response.json();
  return json.locality || json.city || json.principalSubdivision || 'Vị trí hiện tại';
}
