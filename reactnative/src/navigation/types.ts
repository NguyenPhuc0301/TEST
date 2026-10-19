import {DetailItem} from '../types/weather';

export type RootStackParamList = {
  Home: undefined;
  Detail: {item: DetailItem; placeName: string};
};
