import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', text: '' });

  useEffect(() => {
    axios.get(`https://inyserver-2.onrender.com/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.error('Error fetching article:', err));


    axios.get(`https://inyserver-2.onrender.com/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error('Error fetching comments:', err));
  }, [id]);

  // ✅ Insert your updated function here
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

      // 👇 Update local comments array immediately
      setComments([...comments, res.data]);
    } catch (err) {
      console.error('Error posting comment:', err);
      alert("Failed to post comment.");
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
