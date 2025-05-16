import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Product from './pages/Product';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Login from './pages/Login';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "/collection", element: <Collection /> },
            { path: "/cart", element: <Cart /> },
            { path: "/product/:productId", element: <Product /> },
            { path: "/placeorder", element: <PlaceOrder /> },
            { path: "/orders", element: <Orders /> },
            { path: "/login", element: <Login /> },
            { 
                path: "/admin", 
                element: (
                    <ProtectedRoute>
                        <AdminPanel />
                    </ProtectedRoute>
                )
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);