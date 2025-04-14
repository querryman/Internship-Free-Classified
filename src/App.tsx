import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { Sell } from './pages/Sell';
import { CarDetails } from './pages/CarDetails';
import { Shopping } from './pages/Shopping';
import { Services } from './pages/Services';
import { Jobs } from './pages/Jobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/sell/car" element={<CarDetails />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/services" element={<Services />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;