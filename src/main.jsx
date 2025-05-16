import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import Home from './pages/Home';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Product from './pages/Product';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Home },
            { path: "/collection", Component: Collection },
            { path: "/cart", Component: Cart },
            { path: "/product/:productId", Component: Product },
            { path: "/placeorder", Component: PlaceOrder },
            { path: "/orders", Component: Orders },
            { path: "/login", Component: Login },
            { path: "/admin", Component: AdminPanel },

        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);