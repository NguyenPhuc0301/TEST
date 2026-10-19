import {DetailItem, WeatherData} from '../types/weather';
import {getWeatherInfo} from './weatherInfo';

const DAY_NAMES = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

const dayName = (date: string) => DAY_NAMES[new Date(`${date}T12:00:00`).getDay()];
const shortDate = (date: string) => `${date.substring(8, 10)}/${date.substring(5, 7)}`;
export const formatHour = (time: string) => `${time.substring(11, 13)}:00`;
export const formatClock = (time?: string) => (time ? time.substring(11, 16) : '--:--');

export const getCurrentHourIndex = (w: WeatherData) => {
  const idx = w.hourly.time.findIndex(t => t.startsWith(w.current.time.substring(0, 13)));
  return idx === -1 ? 0 : idx;
};

export function buildNowItem(w: WeatherData): DetailItem {
  const i = getCurrentHourIndex(w);
  const info = getWeatherInfo(w.current.weather_code, w.current.is_day === 1);
  return {
    id: 'now',
    kind: 'now',
    title: 'Bây giờ',
    subtitle: `${dayName(w.current.time.substring(0, 10))}, ${shortDate(w.current.time)}`,
    ...info,
    isDay: w.current.is_day === 1,
    temperature: w.current.temperature_2m,
    tempMax: w.daily.temperature_2m_max[0],
    tempMin: w.daily.temperature_2m_min[0],
    feelsLike: w.current.apparent_temperature,
    humidity: w.current.relative_humidity_2m,
    windSpeed: w.current.wind_speed_10m,
    windDirection: w.current.wind_direction_10m,
    uvIndex: w.hourly.uv_index[i] ?? 0,
    precipitation: w.current.precipitation,
    rainProbability: w.hourly.precipitation_probability[i] ?? 0,
    sunrise: w.daily.sunrise[0],
    sunset: w.daily.sunset[0],
  };
}

/** 24 mốc giờ tiếp theo, tính từ giờ hiện tại. */
export function buildHourlyItems(w: WeatherData): DetailItem[] {
  const start = getCurrentHourIndex(w);
  const h = w.hourly;
  return h.time.slice(start, start + 24).map((time, k) => {
    const i = start + k;
    const isDay = h.is_day[i] === 1;
    const info = getWeatherInfo(h.weather_code[i], isDay);
    const date = time.substring(0, 10);
    return {
      id: time,
      kind: 'hour',
      title: k === 0 ? 'Bây giờ' : formatHour(time),
      subtitle: `${dayName(date)}, ${shortDate(date)} · ${formatHour(time)}`,
      ...info,
      isDay,
      temperature: h.temperature_2m[i],
      tempMax: h.temperature_2m[i],
      tempMin: h.temperature_2m[i],
      feelsLike: h.apparent_temperature[i],
      humidity: h.relative_humidity_2m[i],
      windSpeed: h.wind_speed_10m[i],
      windDirection: h.wind_direction_10m[i],
      uvIndex: h.uv_index[i] ?? 0,
      precipitation: h.precipitation[i] ?? 0,
      rainProbability: h.precipitation_probability[i] ?? 0,
    };
  });
}

export function buildDailyItems(w: WeatherData): DetailItem[] {
  const d = w.daily;
  return d.time.map((date, i) => {
    const info = getWeatherInfo(d.weather_code[i], true);
    // Độ ẩm trung bình ngày: tính từ dữ liệu theo giờ
    const hums = w.hourly.relative_humidity_2m.filter((_, k) => w.hourly.time[k].startsWith(date));
    const humidity = hums.length ? hums.reduce((a, b) => a + b, 0) / hums.length : 0;
    return {
      id: date,
      kind: 'day',
      title: i === 0 ? 'Hôm nay' : dayName(date),
      subtitle: `${dayName(date)}, ${shortDate(date)}`,
      ...info,
      isDay: true,
      temperature: d.temperature_2m_max[i],
      tempMax: d.temperature_2m_max[i],
      tempMin: d.temperature_2m_min[i],
      feelsLike: d.apparent_temperature_max[i],
      humidity,
      windSpeed: d.wind_speed_10m_max[i],
      windDirection: d.wind_direction_10m_dominant[i],
      uvIndex: d.uv_index_max[i] ?? 0,
      precipitation: d.precipitation_sum[i] ?? 0,
      rainProbability: d.precipitation_probability_max[i] ?? 0,
      sunrise: d.sunrise[i],
      sunset: d.sunset[i],
    };
  });
}
