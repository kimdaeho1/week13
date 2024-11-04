// src/redux/modules/posts.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../shared/api';

//createSlice는 slice를 생성하는데, 특정기능과 관련된 상태와 리듀서를 관리하는단위.
//createAsyncThunk는 비동기 액션을 처리하는데 사용하는 유틸리티 함수로, 비동기 요청을 쉽게 다룰수 있게함.

//createAsyncThunk를 사용해서 비동기적으로 처리하게 하는데, 서버에서 게시물 목록을 가져오는 get요청을 보냄
//response.data를 반환하여 서버로부터 받은 데이터를 전역 상태에 저장.
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.get('/posts');
  return response.data;
});

//addPost, 게시물 추가하기. 서버에 추가하기 위한 POST요청으로, 
//newPost는 추가할 게시물의 데이터다. 서버의 응답으로 반환된 추가된 게시물 데이터를 전역 상태에 추가
export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
  const response = await api.post('/posts', newPost);
  return response.data;
});

//editPost, 게시물 수정하기. 특정 게시물을 수정하기 위한 PUT요청임.
//updatedPost.id를 사용해서 어떤 게시물을 수정할지 지정함. 이를 상태에서 업데이트한다.
export const editPost = createAsyncThunk('posts/editPost', async (updatedPost) => {
  const response = await api.put(`/posts/${updatedPost.id}`, updatedPost);
  return response.data;
});

//deletePost, 게시물 삭제하기. delete요청으로서 id를 사용해서 게시물을 삭제할지 지정함.
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await api.delete(`/posts/${id}`);
  return id;
});

//postSlice 슬라이스 생성. 게시물과 관련된 상태와 리듀서를 관리하는 슬라이스.
//슬라이스의 이름 name, 초기상태는 initialState, 게시물목록을 담는 배열. 
//리듀서 - 동기적으로 작동하는 리듀서가 정의될 수 있는 부분.
//extrareducer - 비동기 작업 처리. 비동기 액션의 상태 변화에 따른 리듀서 로직 정의.
//비동기 액션이 성공했다면, 서버에서 가져온 게시물 목록 업데이트, 추가, 삭제, 수정들을 
//업데이트함.
const postsSlice = createSlice({
  name: 'posts',
  initialState: { items: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;

//리듀서는 상태를 변경하는 순수함수. 현재 상태를 받아서 새로운 상태를 반환하는 함수.
//슬라이스가 리듀서를 포함하는 더 큰 개념으로, 특정 기능의 상태와 리듀서가 한 곳에 묶여있음.
