import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { usePost } from '../hooks/usePost';
import { CommentList } from '../components/CommentList';
import { CommentForm } from '../components/CommentForm';

export const PostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, comments, loading, error, addComment } = usePost(Number(id));

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">
          {error || 'Post not found'}
        </h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to posts
      </button>

      <article className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 leading-relaxed">{post.body}</p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>
          <CommentList comments={comments} />
          <CommentForm onSubmit={addComment} />
        </div>
      </article>
    </div>
  );
};