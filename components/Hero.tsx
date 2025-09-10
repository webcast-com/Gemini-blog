import React from 'react';
import { Button } from './Button';

interface HeroProps {
    onBrowseClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseClick }) => {
    return (
        <section className="relative overflow-hidden text-center py-20 md:py-28 px-4 rounded-lg shadow-lg mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-sky-50 to-slate-50 dark:from-slate-800 dark:via-sky-950 dark:to-slate-900 bg-[length:400%_400%] animate-[gradient-animation_15s_ease_infinite] -z-0"></div>
            <div className="relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white">
                    Welcome to <span className="text-sky-500">Gemini Blog</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-md md:text-lg text-slate-600 dark:text-slate-300">
                    Exploring the frontiers of technology, creativity, and AI-powered content. All generated with the help of Google Gemini.
                </p>
                <div className="mt-8">
                    <Button onClick={onBrowseClick} variant="primary" className="px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg">
                        Browse Articles
                    </Button>
                </div>
            </div>
        </section>
    );
};