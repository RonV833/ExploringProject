import Mytask from './Mytask';
import './App.css';
import Mythoughts from './Mythoughts';


function App() {
  return (
    <div className="App">
        <h1 style={{marginTop:'0', padding:'3%'}}>Sample of my Daily Schedules</h1>
        <Mytask/><br/>
        <Mythoughts/>
    </div>
  );
}

export default App;
