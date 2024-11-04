// src/pages/PostDetail.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../redux/modules/posts';

const PostDetail = () => {
  const { postId } = useParams(); // postId는 문자열로 들어옴
  const dispatch = useDispatch();

  // 페이지에 진입할 때 fetchPosts 호출
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // postId를 그대로 사용하여 문자열로 비교
  const post = useSelector(state =>
    state.posts.items.find(p => p.id === postId)
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
