import * as ScreenOrientation from "expo-screen-orientation"

export const changeScreenOrientation = async () => {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
}
