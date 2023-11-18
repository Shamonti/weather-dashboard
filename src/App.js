import Chart from './components/Chart';
import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';

function App() {
  return (
    <div className='App'>
      <header>
        <h1 className='text-3xl font-bold underline'>Weather Dashboard</h1>
      </header>

      <main>
        <CurrentWeather />

        <p>Forecast</p>
        <Forecast />
      </main>
    </div>
  );
}

export default App;
