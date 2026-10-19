export const getWeatherInfo = (code: number, isDay = true) => {
  switch (code) {
    case 0:
      return {icon: isDay ? '☀️' : '🌙', text: 'Trời quang'};
    case 1:
      return {icon: isDay ? '🌤️' : '🌙', text: 'Ít mây'};
    case 2:
      return {icon: isDay ? '⛅' : '☁️', text: 'Có mây'};
    case 3:
      return {icon: '☁️', text: 'Nhiều mây'};
    case 45:
    case 48:
      return {icon: '🌫️', text: 'Sương mù'};
    case 51:
    case 53:
    case 55:
      return {icon: '🌦️', text: 'Mưa phùn'};
    case 56:
    case 57:
    case 66:
    case 67:
      return {icon: '🌧️', text: 'Mưa lạnh'};
    case 61:
    case 63:
    case 65:
      return {icon: '🌧️', text: 'Mưa'};
    case 71:
    case 73:
    case 75:
    case 77:
      return {icon: '❄️', text: 'Tuyết'};
    case 80:
    case 81:
    case 82:
      return {icon: '🌦️', text: 'Mưa rào'};
    case 85:
    case 86:
      return {icon: '🌨️', text: 'Mưa tuyết'};
    case 95:
    case 96:
    case 99:
      return {icon: '⛈️', text: 'Dông'};
    default:
      return {icon: '🌤️', text: 'Không xác định'};
  }
};

const DIRECTIONS = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];

/** Hướng gió là hướng gió THỔI ĐẾN từ đâu (ví dụ 45° = gió Đông Bắc). */
export const getWindDirectionName = (deg: number) =>
  DIRECTIONS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];

export const getUvLevel = (uv: number) => {
  if (uv < 3) return {label: 'Thấp', color: '#7BD389'};
  if (uv < 6) return {label: 'Trung bình', color: '#F7D154'};
  if (uv < 8) return {label: 'Cao', color: '#F79A3E'};
  if (uv < 11) return {label: 'Rất cao', color: '#EF5B5B'};
  return {label: 'Cực cao', color: '#B05CE8'};
};

export const getHumidityLabel = (h: number) =>
  h < 30 ? 'Khô' : h <= 60 ? 'Dễ chịu' : h <= 80 ? 'Ẩm' : 'Rất ẩm';
