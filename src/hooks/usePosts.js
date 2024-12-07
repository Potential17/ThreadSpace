import { useState, useEffect, useMemo } from 'react';
import { PostService } from '../services/api';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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