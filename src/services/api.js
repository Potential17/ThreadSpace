import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const PostService = {
  async getAllPosts() {
    const { data } = await api.get('/posts');
    return data;
  },

  async getPostById(id) {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  async getPostComments(postId) {
    const { data } = await api.get(`/posts/${postId}/comments`);
    return data;
  },

  async createComment(postId, comment) {
    const { data } = await api.post(`/posts/${postId}/comments`, {
      ...comment,
      postId,
    });
    return data;
  },
};