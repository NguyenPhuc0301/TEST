import {useCallback, useEffect, useRef, useState} from 'react';
import {fetchPlaceName, fetchWeather} from '../api/weatherApi';
import {Place, WeatherData} from '../types/weather';
import {getCurrentCoords} from '../utils/location';

export const DEFAULT_PLACE: Place = {name: 'Hà Nội', latitude: 21.0285, longitude: 105.8542};

/** loading: đang tải · ready: có dữ liệu · error: lỗi mạng/API · denied: chưa có quyền vị trí · empty: API không trả dữ liệu */
export type Status = 'loading' | 'ready' | 'error' | 'denied' | 'empty';

export function useWeather() {
  const [status, setStatus] = useState<Status>('loading');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [place, setPlace] = useState<Place>(DEFAULT_PLACE);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState('');

  const weatherRef = useRef<WeatherData | null>(null);
  const useDefaultRef = useRef(false);

  const load = useCallback(async (opts: {refresh?: boolean; useDefault?: boolean} = {}) => {
    if (opts.useDefault !== undefined) {
      useDefaultRef.current = opts.useDefault;
    }
    if (opts.refresh) {
      setRefreshing(true);
    } else {
      setStatus('loading');
    }

    try {
      let target: Place;
      if (useDefaultRef.current) {
        target = DEFAULT_PLACE;
      } else {
        const coords = await getCurrentCoords();
        const name = await fetchPlaceName(coords).catch(() => 'Vị trí hiện tại');
        target = {...coords, name};
      }

      const data = await fetchWeather(target);
      if (!data?.hourly?.time?.length || !data?.daily?.time?.length) {
        setStatus('empty');
        return;
      }

      weatherRef.current = data;
      setWeather(data);
      setPlace(target);
      setMessage('');
      setStatus('ready');
    } catch (e: any) {
      const denied = e?.code === 'denied';
      if (weatherRef.current) {
        // Đã có dữ liệu cũ: giữ nguyên màn hình, chỉ báo lỗi nhẹ
        setStatus('ready');
        setMessage(
          denied
            ? 'Chưa được cấp quyền vị trí nên chưa thể cập nhật.'
            : 'Không cập nhật được. Đang hiển thị dữ liệu lần trước.',
        );
      } else if (denied) {
        setStatus('denied');
      } else {
        setStatus('error');
      }
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {status, weather, place, refreshing, message, load};
}
