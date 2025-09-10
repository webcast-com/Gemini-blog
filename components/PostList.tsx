import React from 'react';
import { Post } from '../types';
import { PostCard } from './PostCard';
import { Button } from './Button';

interface PostListProps {
  posts: Post[];
  onViewPost: (id: string) => void;
  onEditPost: (id: string) => void;
  onDeletePost: (id: string) => void;
  onCreatePost: () => void;
  isAdmin: boolean;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  onViewPost,
  onEditPost,
  onDeletePost,
  onCreatePost,
  isAdmin,
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-0">
          {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
        </h2>
        {isAdmin && (
          <Button onClick={onCreatePost} variant="primary">
            Create New Post
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-sky-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onView={onViewPost}
              onEdit={onEditPost}
              onDelete={onDeletePost}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white dark:bg-slate-800 p-12 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-slate-900 dark:text-white">No posts found!</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
                {isAdmin ? "Try selecting another category or create a new post." : "There are no articles in this category yet. Check back later!"}
            </p>
        </div>
      )}
    </div>
  );
};