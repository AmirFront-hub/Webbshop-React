import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();
  
  if (!isLoggedIn) {
    // Redirect to login page, but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;