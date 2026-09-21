import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // =========================================================
  // CONTAINER
  // =========================================================

  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 15,
  },

  errorIcon: {
    fontSize: 50,
    marginBottom: 15,
  },

  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
  },

  // =========================================================
  // PHẦN 1 - HIỆN TẠI
  // =========================================================

  currentSection: {
    paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#243B5A',
  },

  location: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 10,
  },

  currentMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  currentIcon: {
    fontSize: 65,
    marginRight: 12,
  },

  currentTemperature: {
    color: '#FFFFFF',
    fontSize: 76,
    fontWeight: '300',
  },

  currentStatus: {
    color: '#FFFFFF',
    fontSize: 22,
    marginTop: 5,
  },

  feelsLike: {
    color: '#C9D6E5',
    fontSize: 16,
    marginTop: 8,
  },

  currentDetails: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 35,
    paddingBottom: 25,
  },

  detailItem: {
    alignItems: 'center',
    minWidth: 80,
  },

  detailIcon: {
    fontSize: 22,
    marginBottom: 6,
  },

  detailValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  detailLabel: {
    color: '#AFC0D3',
    fontSize: 13,
    marginTop: 3,
  },

  // =========================================================
  // SECTION
  // =========================================================

  section: {
    marginTop: 12,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#16283F',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  // =========================================================
  // PHẦN 2 - THEO GIỜ
  // =========================================================

  hourlyContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  hourCard: {
    width: 82,
    height: 145,
    backgroundColor: '#213A59',
    borderRadius: 18,
    marginHorizontal: 5,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  currentHourCard: {
    backgroundColor: '#397CB8',
  },

  hourText: {
    color: '#DCE7F2',
    fontSize: 13,
  },

  hourIcon: {
    fontSize: 28,
    marginVertical: 8,
  },

  hourTemperature: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
  },

  rainText: {
    color: '#B9E3FF',
    fontSize: 11,
    marginTop: 5,
  },

  // =========================================================
  // PHẦN 3 - THEO NGÀY
  // =========================================================

  dailyCard: {
    backgroundColor: '#213A59',
    marginHorizontal: 15,
    borderRadius: 18,
    overflow: 'hidden',
  },

  dailyRow: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  dailyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#38506B',
  },

  dayColumn: {
    width: 82,
  },

  dayName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  dateText: {
    color: '#91A5BB',
    fontSize: 12,
    marginTop: 4,
  },

  dayWeather: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dayIcon: {
    fontSize: 25,
    marginRight: 8,
  },

  dayStatus: {
    color: '#D8E2EC',
    fontSize: 12,
  },

  temperatureColumn: {
    width: 125,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  maxTemperature: {
    color: '#FFFFFF',
    fontSize: 16,
    width: 35,
    textAlign: 'right',
  },

  temperatureBar: {
    width: 45,
    height: 5,
    backgroundColor: '#71869B',
    borderRadius: 5,
    marginHorizontal: 8,
    overflow: 'hidden',
  },

  temperatureBarFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#F7B733',
    borderRadius: 5,
  },

  minTemperature: {
    color: '#AFC0D3',
    fontSize: 16,
    width: 35,
  },

  // =========================================================
  // FOOTER
  // =========================================================

  source: {
    color: '#71869B',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
  },

  bottomSpace: {
    height: 30,
  },
});