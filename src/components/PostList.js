// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, editPost } from '../redux/modules/posts';
import { Link } from 'react-router-dom';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.items);

  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEdit = (post) => {
    setEditMode(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleSave = (id) => {
    dispatch(editPost({ id, title: editTitle, content: editContent }));
    handleCancel();
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="post-list">
      <ul>
        {posts.map(post => (
          <li key={post.id} className="post-item">
            {editMode === post.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="edit-input"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="edit-input"
                />
                <button
                  onClick={() => handleSave(post.id)}
                  className="edit-button save"
                >
                  저장
                </button>
                <button
                  onClick={handleCancel}
                  className="edit-button cancel"
                >
                  취소
                </button>
              </div>
            ) : (
              <div>
                <Link to={`/post/${post.id}`}>
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.content}</p>
                <button onClick={() => handleEdit(post)} className="edit">수정</button>
                <button onClick={() => handleDelete(post.id)}>삭제</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
