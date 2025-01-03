import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import UserDetails from './components/UserDetails';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
    
  );
}

export default App;
