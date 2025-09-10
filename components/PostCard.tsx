import React from 'react';
import { Post } from '../types';
import { Button } from './Button';

interface PostCardProps {
  post: Post;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

// A simple function to truncate text
const truncateText = (text: string, length: number) => {
    if (text.length <= length) {
        return text;
    }
    return text.substring(0, length) + '...';
};

export const PostCard: React.FC<PostCardProps> = ({ post, onView, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col group">
      {post.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
            <img 
                src={post.imageUrl} 
                alt={post.imageAlt || post.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {post.category && (
                <span className="absolute top-2 right-2 bg-sky-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {post.category}
                </span>
            )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{post.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">
          {truncateText(post.content, 100)}
        </p>
        <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Button onClick={() => onView(post.id)} variant="primary">
                    Read More
                </Button>
            </div>
            {isAdmin && (
            <div className="flex space-x-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <Button onClick={() => onEdit(post.id)} variant="secondary" className="w-full">
                Edit
                </Button>
                <Button onClick={() => onDelete(post.id)} variant="danger" className="w-full">
                Delete
                </Button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};