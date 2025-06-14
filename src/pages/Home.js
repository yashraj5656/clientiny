import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // 📁 Create this file

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://inyserver-2.onrender.com/articles')
      .then((res) => setArticles(res.data))
      .catch((err) => console.error('Error fetching articles:', err));
  }, []);

  return (
    <div className="home-container">
      {articles.map((article) => (
        <div key={article._id} className="article-card">
          <h3>{article.title}</h3>
          <p className="meta">By {article.author} • {new Date(article.date).toDateString()}</p>
          <p className="preview">{article.content.slice(0, 200)}...</p>
          <Link to={`/article/${article._id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
