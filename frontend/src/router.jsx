import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import DonorRegistration from './components/DonorRegistration';
import RequestBlood from './components/RequestBlood';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';
import PrivateRoute from './components/PrivateRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route
        path="donor-registration"
        element={
          <PrivateRoute>
            <DonorRegistration />
          </PrivateRoute>
        }
      />
      <Route
        path="request-blood"
        element={
          <PrivateRoute>
            <RequestBlood />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);