import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './providers/AuthProvider';
import { ToastProvider } from './providers/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <div className="app">
            <Navbar />
            <main>
              <Outlet />
            </main>
            <Chatbot />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
