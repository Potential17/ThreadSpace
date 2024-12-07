import { useState, useEffect } from 'react';
import { Post, Comment } from '../types';
import { PostService } from '../services/api';

export const usePost = (postId: number) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          PostService.getPostById(postId),
          PostService.getPostComments(postId),
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError('Failed to fetch post details');
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const addComment = async (name: string, email: string, body: string) => {
    try {
      const newComment = await PostService.createComment(postId, {
        name,
        email,
        body,
      });
      setComments(prev => [...prev, newComment]);
      return true;
    } catch (err) {
      setError('Failed to add comment');
      return false;
    }
  };

  return { post, comments, loading, error, addComment };
};