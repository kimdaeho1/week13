// src/redux/config/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../modules/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
