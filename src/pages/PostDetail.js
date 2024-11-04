// src/pages/PostDetail.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../redux/modules/posts';

//useparams를 사용해서 현재 URL에 있는 파라미터를 가져온다. URL에서 postID를 가져옴.
//useparam에서 url이 post/1이면 postID는 1이된다.
const PostDetail = () => {
  const { postId } = useParams(); // postId는 문자열로 들어옴
  const dispatch = useDispatch();

//useEffect를 사용해 fetchPosts 호출해서 게시글 데이터 가져오기
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

//useSelector를 사용해서 Redux스토어의 상태를 선택하고, 거기서 필요한 게시글을 찾는다.
//.find()에서 id와 동일한 id를 가진 게시글을 찾는다.
  const post = useSelector(state =>
    state.posts.items.find(p => p.id === postId)
  );

//없으면 not found에러
  if (!post) {
    return <div>Post not found</div>;
  }

//유효하면 화면에 렌더링

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;

//특정 게시글을 클릭할때, 해당 게시글의 상세 페이지로 이동한다. URL에는 해당 게시글의 ID가 포함.
//redux스토어에서 postID에 해당하는 게시글을 찾아서 렌더링.