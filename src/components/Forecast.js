export default function Forecast({ forecast }) {
  return (
    <ul>
      {forecast.map(item => (
        <li key={item.dt}>{parseFloat(item.main.temp - 273.15).toFixed(2)}</li>
      ))}
    </ul>
  );
}
