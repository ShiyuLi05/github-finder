import './style/index.css';
import User from './components/User';
import Search from './components/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/github-finder" element={<Search />} />
        <Route exact path="/user/:username" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


