import './App.css';
import Home from './Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import RaceList from './components/RaceList';
import RaceEdit from './components/RaceEdit';
import HorseList from './components/HorseList';
import HorseEdit from './components/HorseEdit';

function App() {
    return (
        <Router>
          <Routes>
            <Route index element={<Home />}/>
            <Route path='/' element={<Home />}/>
            <Route path='/races' element={<RaceList />}/>
            <Route path='/races/:id' element={<RaceEdit />}/>
            <Route path='/horses' element={<HorseList />}/>
            <Route path='/horses/:id' element={<HorseEdit />}/>
          </Routes>
        </Router>
    )
}

export default App;
