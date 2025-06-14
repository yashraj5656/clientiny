import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import NewArticle from './pages/NewArticle';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="container">
        <header style={{ textAlign: 'center', padding: isMobile ? '20px 10px' : '40px 20px' }}>
          <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem' }}>The Yashraj Journal</h1>
          <p className="tagline" style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
            Truth • Tradition • Timeless
          </p>
          <Link to="/new">
            <button style={{
              marginTop: '20px',
              padding: isMobile ? '6px 12px' : '10px 20px',
              fontSize: isMobile ? '14px' : '16px',
              cursor: 'pointer'
            }}>
              Post Your Story
            </button>
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/new" element={<NewArticle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
