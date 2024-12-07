import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import type { Post, Comment } from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const PostService = {
  async getAllPosts(): Promise<Post[]> {
    const { data } = await api.get('/posts');
    return data;
  },

  async getPostById(id: number): Promise<Post> {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  async getPostComments(postId: number): Promise<Comment[]> {
    const { data } = await api.get(`/posts/${postId}/comments`);
    return data;
  },

  async createComment(postId: number, comment: { name: string; email: string; body: string }): Promise<Comment> {
    const { data } = await api.post(`/posts/${postId}/comments`, {
      ...comment,
      postId,
    });
    return data;
  },
};