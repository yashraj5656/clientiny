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
        <div key={article._id} className="article-preview">
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.content.slice(0, 150)}...</p>
          <Link to={`/article/${article._id}`}>Read Full Article</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
