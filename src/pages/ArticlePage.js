import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', text: '' });

  useEffect(() => {
    // Fetch article data
    axios.get(`https://inyserver-2.onrender.com/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.error('Error fetching article:', err));

    // Fetch comments for that article
    axios.get(`https://inyserver-2.onrender.com/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error('Error fetching comments:', err));
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.text.trim()) return;

    try {
      await axios.post('https://inyserver-2.onrender.com/comments', {
        articleId: id,
        ...form,
      });

      setForm({ name: '', text: '' });

      // Re-fetch comments only (not the whole article)
      const res = await axios.get(`https://inyserver-2.onrender.com/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return article ? (
    <div>
      <h2>{article.title}</h2>
      <p className="meta">
        By {article.author} • {new Date(article.date).toDateString()}
      </p>
      <p>{article.content}</p>

      <hr />
      <h3>Comments</h3>
      {comments.length > 0 ? comments.map((c) => (
        <div key={c._id} className="comment">
          <p><strong>{c.name}</strong>: {c.text}</p>
        </div>
      )) : <p>No comments yet.</p>}

      <form onSubmit={submitComment} className="comment-form">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          placeholder="Comment"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  ) : <p>Loading...</p>;
}

export default ArticlePage;
