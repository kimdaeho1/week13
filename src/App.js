// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './pages/PostDetail';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1>게시물 관리</h1>
        <PostForm />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

//라우팅을 설정해서 app내에서의 페이지 전환을 처리함. URL경로에 따라 컴포넌트를 렌더링함.
//Router-app의 라우팅을 설정하는 최상위 컴포넌트.
//router가 현재 url을 감지해서 올바른 컴포넌트를 렌더링함. 