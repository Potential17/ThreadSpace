import React from 'react';
import { Comment } from '../types';
import { Mail, User } from 'lucide-react';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm text-gray-500">
              <User size={16} className="mr-1" />
              <span>{comment.name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Mail size={16} className="mr-1" />
              <span>{comment.email}</span>
            </div>
          </div>
          <p className="text-gray-700">{comment.body}</p>
        </div>
      ))}
    </div>
  );
};