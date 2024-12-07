import React from 'react';
import { PostCard } from './PostCard';
import { SearchBar } from './SearchBar';
import { usePosts } from '../hooks/usePosts';
import { Loader } from 'lucide-react';

export const PostList = () => {
  const { posts, loading, error, searchQuery, setSearchQuery } = usePosts();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found matching your search.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};