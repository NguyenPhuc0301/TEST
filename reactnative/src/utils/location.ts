import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Coords} from '../types/weather';

const locationError = (code: 'denied' | 'unavailable') =>
  Object.assign(new Error(code), {code});

/** Xin quyền vị trí rồi lấy tọa độ hiện tại. Lỗi có `code` = 'denied' | 'unavailable'. */
export async function getCurrentCoords(): Promise<Coords> {
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
      throw locationError('denied');
    }
  } else {
    await new Promise<void>((resolve, reject) =>
      Geolocation.requestAuthorization(
        () => resolve(),
        () => reject(locationError('denied')),
      ),
    );
  }

  return new Promise<Coords>((resolve, reject) =>
    Geolocation.getCurrentPosition(
      pos => resolve({latitude: pos.coords.latitude, longitude: pos.coords.longitude}),
      () => reject(locationError('unavailable')),
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 60000},
    ),
  );
}
