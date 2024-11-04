// src/components/PostForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/modules/posts';

const PostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length >= 5 && content) {
      dispatch(addPost({ title, content }));
      setTitle('');
      setContent('');
    } else {
      alert("제목은 5글자 이상, 내용은 필수입니다.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default PostForm;
