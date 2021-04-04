/**
 * Convert temperature from Kelvin to Celcius
 */
export function kToC(K: number) {
  return K - 273.15
}

/**
 * Convert temperature from Kelvin to Fahrenheit
 */
export function kToF(K: number) {
  return ((K - 273.15) * 9) / 5 + 32
}
