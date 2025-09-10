import React, { useState, useEffect, useCallback } from 'react';
import { fetchNews } from '../services/geminiService';
import { NewsResult } from '../types';
import { Button } from './Button';
import { Spinner } from './Spinner';

export const NewsView: React.FC = () => {
  const [topic, setTopic] = useState('latest AI advancements');
  const [inputTopic, setInputTopic] = useState('latest AI advancements');
  const [newsResult, setNewsResult] = useState<NewsResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleFetchNews = useCallback(async () => {
    if (!topic) {
        setError('Please enter a topic to search for news.');
        return;
    }
    setIsLoading(true);
    setError('');
    setNewsResult(null);
    try {
      const result = await fetchNews(topic);
      setNewsResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  useEffect(() => {
    handleFetchNews();
  }, [handleFetchNews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTopic(inputTopic);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">AI-Powered News Summary</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Get the latest news on any topic, summarized by Gemini and grounded in Google Search.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2 mb-8">
        <input
          type="text"
          value={inputTopic}
          onChange={(e) => setInputTopic(e.target.value)}
          className="flex-grow block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-white"
          placeholder="e.g., tech industry news"
          disabled={isLoading}
        />
        <Button type="submit" isLoading={isLoading}>
          Search
        </Button>
      </form>

      {isLoading && (
        <div className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/50 rounded-lg p-12">
            <Spinner />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">Fetching the latest news for you...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!isLoading && newsResult && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Summary on "{topic}"</h3>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-wrap mb-8">
            {newsResult.summary}
          </div>

          {newsResult.sources.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 pt-4 border-t border-slate-200 dark:border-slate-700">Sources</h4>
              <ul className="space-y-3">
                {newsResult.sources.map((source, index) => (
                  <li key={index} className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-md">
                    <a 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sky-600 dark:text-sky-400 hover:underline font-medium break-all"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
