import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { Button } from './Button';
import { Spinner } from './Spinner';
import { generateBlogPostContent, generateImage } from '../services/geminiService';

interface PostEditorProps {
  post?: Post | null;
  onSave: (post: Omit<Post, 'id' | 'createdAt'> & { id?: string }) => void;
  onCancel: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [category, setCategory] = useState('');

  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generationPrompt, setGenerationPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImageUrl(post.imageUrl || '');
      setImageAlt(post.imageAlt || '');
      setCategory(post.category || '');
    } else {
      setTitle('');
      setContent('');
      setImageUrl('');
      setImageAlt('');
      setCategory('');
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: post?.id,
      title,
      content,
      imageUrl,
      imageAlt,
      category,
    });
  };

  const handleGenerateContent = async () => {
    if (!generationPrompt) return;
    setIsGeneratingContent(true);
    const generatedContent = await generateBlogPostContent(generationPrompt);
    if (!generatedContent.startsWith('Error:')) {
        setContent(generatedContent);
    } else {
        alert(generatedContent);
    }
    setIsGeneratingContent(false);
  };
  
  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    const generatedUrl = await generateImage(imagePrompt);
    if (!generatedUrl.startsWith('Error:')) {
        setImageUrl(generatedUrl);
        setImageAlt(imagePrompt);
    } else {
        alert(generatedUrl);
    }
    setIsGeneratingImage(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
        {post ? 'Edit Post' : 'Create New Post'}
      </h2>
      
      <div className="space-y-6">
        {/* Content Generation */}
        <div className="bg-sky-50 dark:bg-sky-900/50 p-4 rounded-lg">
            <label htmlFor="content-prompt" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Generate Content with AI
            </label>
            <div className="flex space-x-2">
                <input
                    id="content-prompt"
                    type="text"
                    value={generationPrompt}
                    onChange={(e) => setGenerationPrompt(e.target.value)}
                    className="flex-grow block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-white"
                    placeholder="e.g., 'Write a post about the benefits of React Server Components'"
                />
                <Button onClick={handleGenerateContent} isLoading={isGeneratingContent}>
                    Generate
                </Button>
            </div>
        </div>

        {/* Image Generation */}
        <div className="bg-sky-50 dark:bg-sky-900/50 p-4 rounded-lg">
            <label htmlFor="image-prompt" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Generate Image with AI
            </label>
            <div className="flex space-x-2">
                <input
                    id="image-prompt"
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    className="flex-grow block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-white"
                    placeholder="e.g., 'An abstract image of a developer coding'"
                />
                <Button onClick={handleGenerateImage} isLoading={isGeneratingImage}>
                    Generate
                </Button>
            </div>
            {isGeneratingImage && <p className="text-xs mt-2 text-slate-500">Image generation can take a moment...</p>}
            {imageUrl && <img src={imageUrl} alt={imageAlt} className="mt-4 rounded-lg max-h-64 object-cover w-full" />}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Content
          </label>
          <textarea
            id="content"
            required
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-white"
            placeholder="e.g., AI, Web Development"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Image URL (optional)
          </label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="imageAlt" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Image Alt Text (optional)
          </label>
          <input
            id="imageAlt"
            type="text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-white"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Post
          </Button>
        </div>
      </form>
    </div>
  );
};
