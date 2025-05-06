import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
}
export default App;