import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', text: '' });

  useEffect(() => {
    if (!id) return;

    // Fetch article
    axios.get(`https://inyserver-2.onrender.com/articles/${id}`)
      .then((res) => {
        console.log("✅ Article fetched:", res.data);
        setArticle(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching article:", err);
      });

    // Fetch comments
    axios.get(`https://inyserver-2.onrender.com/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("❌ Error fetching comments:", err));
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      alert("Name and comment are required.");
      return;
    }

    try {
      const res = await axios.post('https://inyserver-2.onrender.com/comments', {
        articleId: id,
        ...form,
      });
      setForm({ name: '', text: '' });
      setComments([res.data, ...comments]); // newest on top
    } catch (err) {
      console.error('Error posting comment:', err);
      alert("Failed to post comment.");
    }
  };

  if (!article) return <p>Loading article...</p>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p className="meta">
        By {article.author} • {new Date(article.date).toLocaleDateString()}
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
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default ArticlePage;
