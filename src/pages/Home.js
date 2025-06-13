import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://inyserver-2.onrender.com/articles').then((res) => {
      setArticles(res.data);
    });
  }, []);

  return (
    <div className="articles">
      {articles.map((a) => (
        <div key={a._id} className="article-card">
          <h2><Link to={`/article/${a._id}`}>{a.title}</Link></h2>
          <p className="meta">By {a.author} • {new Date(a.date).toDateString()}</p>
          <p>{a.content.slice(0, 200)}...</p>
        </div>
      ))}
    </div>
  );
}

export default Home;