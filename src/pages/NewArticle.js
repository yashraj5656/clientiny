import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewArticle() {
  const [form, setForm] = useState({ title: '', author: '', content: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://inyserver-2.onrender.com/articles', form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="new-article-form">
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
      />
      <textarea
        placeholder="Article Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      ></textarea>
      <button type="submit">Post Article</button>
    </form>
  );
}

export default NewArticle;
