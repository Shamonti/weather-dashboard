export default function CurrentWeather({ currweather }) {
  return <div>{currweather.temp - 273.15}</div>;
}
