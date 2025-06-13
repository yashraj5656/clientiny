import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import NewArticle from './pages/NewArticle';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>The iNY Times</h1>
          <p className="tagline">Truth • Tradition • Timeless</p>
          <Link to="/new">
            <button style={{ marginTop: '20px' }}>Post Your Story</button>
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
