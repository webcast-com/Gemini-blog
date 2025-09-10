import React from 'react';
import { Post } from '../types';
import { Button } from './Button';
import { PostCard } from './PostCard';

interface PostViewProps {
  post: Post;
  onBack: () => void;
  allPosts: Post[];
  onViewPost: (id: string) => void;
}

export const PostView: React.FC<PostViewProps> = ({ post, onBack, allPosts, onViewPost }) => {
  const otherPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back to all posts
        </Button>
      </div>

      <article className="bg-white dark:bg-slate-800 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg">
        {post.category && (
            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                {post.category}
            </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Published on {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
          />
        )}

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      {otherPosts.length > 0 && (
          <aside className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                  Read Next
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                  {otherPosts.map(p => (
                      <div key={p.id} className="cursor-pointer group" onClick={() => onViewPost(p.id)}>
                         {p.imageUrl && (
                             <img src={p.imageUrl} alt={p.imageAlt || p.title} className="rounded-lg mb-4 w-full h-32 object-cover transition-opacity duration-300 group-hover:opacity-80"/>
                         )}
                         <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">{p.title}</h3>
                      </div>
                  ))}
              </div>
          </aside>
      )}

    </div>
  );
};