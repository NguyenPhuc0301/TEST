export const colors = {
  bg: '#0D1B2A',
  surface: '#16283F',
  card: '#213A59',
  cardActive: '#397CB8',
  border: '#38506B',
  text: '#FFFFFF',
  textSoft: '#D8E2EC',
  textMuted: '#91A5BB',
  rain: '#B9E3FF',
  accent: '#F7B733',
  danger: '#EF5B5B',
};

/** Màu vùng đầu trang theo thời tiết và ngày/đêm. */
export const getHeroColor = (code: number, isDay: boolean) => {
  if (code >= 95) return '#2B2F4A';
  if (code >= 51 && code <= 86) return isDay ? '#35506B' : '#1E3249';
  if (code >= 45 && code <= 48) return '#4A5C6E';
  if (!isDay) return '#1B2D4A';
  return code <= 1 ? '#2F7BC4' : '#3F6A99';
};
