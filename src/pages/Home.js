import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [articles, setArticles] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // initial value

  // Fetch articles
  useEffect(() => {
    axios.get('https://inyserver-2.onrender.com/articles')
      .then((res) => setArticles(res.data))
      .catch((err) => console.error('Error fetching articles:', err));
  }, []);

  // Track screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {articles.length === 0 ? (
        <p>Loading articles...</p>
      ) : (
        articles.map((article) => (
          <div
            key={article._id}
            style={{
              borderBottom: '1px solid #ccc',
              marginBottom: '30px',
              paddingBottom: '20px'
            }}
          >
            <h2 style={{ marginBottom: '5px' }}>{article.title}</h2>
            <p style={{ color: '#555', fontStyle: 'italic' }}>
              By {article.author} • {new Date(article.date).toDateString()}
            </p>
            <p style={{ marginTop: '10px' }}>
              {article.content.slice(0, 200)}...
            </p>
            <Link to={`/article/${article._id}`}>
              <button
                style={{
                  marginTop: '10px',
                  padding: isMobile ? '6px 12px' : '8px 16px',
                  fontSize: isMobile ? '14px' : '16px',
                  cursor: 'pointer'
                }}
              >
                Read More
              </button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
