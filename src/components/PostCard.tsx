import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <article 
      onClick={() => navigate(`/post/${post.id}`)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{post.body}</p>
      
      <div className="flex items-center justify-end text-blue-600 hover:text-blue-800">
        <span className="text-sm font-medium">Read more</span>
        <ArrowRight size={16} className="ml-1" />
      </div>
    </article>
  );
};