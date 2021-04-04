import AsyncStorage from '@react-native-async-storage/async-storage';
import {SEARCH_HISTORY} from '../utils/constants';

export async function getSearchHistoryApi() {
  try {
    const history = await AsyncStorage.getItem(SEARCH_HISTORY);
    if (!history) return [];
    return JSON.parse(history);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateSearchHistoryApi(search) {
  const history = await getSearchHistoryApi();

  history.push({
    search,
    date: new Date(),
  });
  await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}
