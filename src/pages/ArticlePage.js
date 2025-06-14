import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', text: '' });

  useEffect(() => {
    console.log("🔍 Article ID from URL:", id);

    axios.get(`https://inyserver-2.onrender.com/articles/${id}`)
      .then((res) => {
        console.log("✅ Article fetched:", res.data);
        setArticle(res.data);
      })
      .catch((err) => console.error('❌ Error fetching article:', err));

    axios.get(`https://inyserver-2.onrender.com/comments/${id}`)
      .then((res) => {
        console.log("💬 Comments fetched:", res.data);
        setComments(res.data);
      })
      .catch((err) => console.error('❌ Error fetching comments:', err));
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
      setComments(prev => [res.data, ...prev]); // prepend new comment
    } catch (err) {
      console.error('❌ Error posting comment:', err);
      alert("Failed to post comment.");
    }
  };

  return article ? (
    <div style={{ background: '#fdfde7', padding: '1rem', fontFamily: 'serif' }}>
      <h2>{article.title}</h2>
      <p style={{ fontStyle: 'italic', color: '#555' }}>
        By {article.author || 'Unknown'} • {article.date ? new Date(article.date).toDateString() : 'Unknown Date'}
      </p>
      <p>{article.content}</p>

      <hr />
      <h3 style={{ marginTop: '2rem' }}>Comments</h3>
      {comments.length > 0 ? (
        comments.map((c) => (
          <div key={c._id} style={{ borderTop: '1px solid #ddd', padding: '10px 0' }}>
            <p><strong>{c.name}</strong>: {c.text}</p>
            <small style={{ color: '#999' }}>{new Date(c.date).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      <form onSubmit={submitComment} style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: '100%', padding: '8px', marginBottom: '0.5rem' }}
        />
        <textarea
          placeholder="Comment"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          style={{ width: '100%', padding: '8px', marginBottom: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#000', color: '#fff', border: 'none' }}>
          Post Comment
        </button>
      </form>
    </div>
  ) : (
    <p>Loading article...</p>
  );
}

export default ArticlePage;
