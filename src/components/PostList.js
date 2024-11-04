import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, editPost } from '../redux/modules/posts';
import { Link } from 'react-router-dom';

//Link는 페이지간 네비게이션을 제공.

//useDispatch는 redux액션을 디스패치하는 훅으로, 게시글 목록을 불러오거나, 수정 삭제할때 필요 
//useSelector는 redux상태에서 게시글 목록을 가져오는데 사용.
const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.items);

//useState는 editmode를 통해 수정모드가 아닌경우 null, 수정을 진행할때 해당 게시글의 id저장.
//edittitle, content는 수정중인 게시글의 제목과 내용을 저장하기 위함.
  const [editMode, setEditMode] = useState(null);
  const editTitleRef = useRef('');
  const editContentRef = useRef('');

// useEffect를 사용해 처음 컴포넌트가 렌더링 될 때 게시글 목록을 불러오기 위해
//fetchPosts를 디스패치한다. dispatch가 변경될때마다 호출되게 함. 
//dispatch는 redux에서 액션을 발생시키기 위해 사용하는 함수.
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

//수정모드를 활성화하고, 수정할 게시글의 제목과 내용을 저장.
  const handleEdit = (post) => {
    setEditMode(post.id);
    editTitleRef.current = post.title;
    editContentRef.current = post.content;
  };

//수정모드를 종료하는 함수.
  const handleCancel = () => {
    setEditMode(null);
  };

//사용자가 수정한 게시글을 저장할 때 호출됨.
//edittitle, content에 저장된 값을 사용해 editpost액션을 디스패치하여 게시글 수정
//수정후 handlecancel을 호출해서 수정모드 종료
  const handleSave = (id) => {
    dispatch(editPost({ id, title: editTitleRef.current, content: editContentRef.current }));
    handleCancel();
  };

//handledelete함수는 사용자가 게시글을 삭제할때 호출.
//deletepost액션을 디스패치.

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

//div요소 안에 게시글 목록이 ul로 감싸져있고, posts배열을 map함수로 순회하면서 게시글을 li로 렌더링.
//input과 textarea로 제목과 내용을 수정하고, 값은 저장되게.
//수정모드가 아니면 게시글의 제목과 내용 렌더링. 
  return (
    <div className="post-list">
      <ul>
        {posts.map(post => (
          <li key={post.id} className="post-item">
            {editMode === post.id ? (
              <div>
                <input
                  type="text"
                  defaultValue={editTitleRef.current}
                  onChange={(e) => (editTitleRef.current = e.target.value)}
                  className="edit-input"
                />
                <textarea
                  defaultValue={editContentRef.current}
                  onChange={(e) => (editContentRef.current = e.target.value)}
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
