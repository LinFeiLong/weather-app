import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * useAsyncStorage
 * hook setter and getter for AsyncStorage
 * @param key
 * @returns [getter, setter]
 */
export default function useAsyncStorage(key: string) {
  const getter = async (): Promise<string[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
      console.warn(e)
    }
    return []
  }

  const setter = async (value: string[]) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.warn(e)
    }
  }

  return [getter, setter]
}
