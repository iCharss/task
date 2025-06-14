import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { NotesProvider } from './context/NotesContext';
import { ActiveNotesPage } from './pages/ActivateNotesPage';
import { ArchivedNotesPage } from './pages/ArchivatedNotesPage';
import { HomeIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import './index.css'; 

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <NotesApp /> : <Navigate to="/login" />}>
          <Route index element={<ActiveNotesPage />} />
          <Route path="archived" element={<ArchivedNotesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}


function NotesApp() {
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
    window.location.reload();
  };

  if (!token) return null;

  return (
    <NotesProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 flex items-center space-x-2 ${
                  activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
              >
                <HomeIcon className="h-5 w-5" />
                <span>Active Notes</span>
              </button>
              <button
                onClick={() => setActiveTab('archived')}
                className={`px-4 py-2 flex items-center space-x-2 ${
                  activeTab === 'archived' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
              >
                <ArchiveBoxIcon className="h-5 w-5" />
                <span>Archived Notes</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {username && (
                <span className="text-gray-700">Logged in as <b>{username}</b></span>
              )}
              <button
                onClick={handleSignOut}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          {activeTab === 'active' ? <ActiveNotesPage /> : <ArchivedNotesPage />}
        </main>
      </div>
    </NotesProvider>
  );
}

export default App;