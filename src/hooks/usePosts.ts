import { useState, useEffect, useMemo } from 'react';
import { Post } from '../types';
import { PostService } from '../services/api';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await PostService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const query = searchQuery.toLowerCase();
    return posts.filter(
      post => 
        post.title.toLowerCase().includes(query) || 
        post.body.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  return { 
    posts: filteredPosts, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery 
  };
};