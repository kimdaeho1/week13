// src/redux/modules/posts.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../shared/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.get('/posts');
  return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
  const response = await api.post('/posts', newPost);
  return response.data;
});

// 수정 기능: 게시물 수정하기
export const editPost = createAsyncThunk('posts/editPost', async (updatedPost) => {
  const response = await api.put(`/posts/${updatedPost.id}`, updatedPost);
  return response.data;
});

// 삭제 기능: 실제 데이터베이스에서 게시물 삭제하기
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await api.delete(`/posts/${id}`);
  return id;
});

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
