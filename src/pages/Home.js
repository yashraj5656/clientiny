import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://inyserver-2.onrender.com/articles')
      .then((res) => setArticles(res.data))
      .catch((err) => console.error('Error fetching articles:', err));
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <div key={article._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <h2>{article.title}</h2>
          <p><strong>By {article.author}</strong> • {new Date(article.date).toDateString()}</p>
          <p>{article.content.slice(0, 200)}...</p>
          <Link to={`/article/${article._id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
