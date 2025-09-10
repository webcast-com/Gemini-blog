import React from 'react';

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.921.98 3.62 2.464 4.616-.914-.028-1.77-.279-2.522-.693v.064c0 2.682 1.908 4.915 4.438 5.424-.464.126-.95.193-1.455.193-.356 0-.702-.034-1.043-.098.719 2.2 2.797 3.803 5.266 3.847-1.895 1.482-4.288 2.366-6.884 2.366-.447 0-.889-.026-1.325-.077 2.453 1.573 5.373 2.492 8.503 2.492 9.925 0 15.36-8.217 15.36-15.36 0-.234-.005-.466-.015-.696.936-.676 1.798-1.52 2.46-2.548z"/>
    </svg>
);

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);


export const Footer: React.FC = () => {
    return (
        <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mt-12 border-t border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Gemini Blog. All rights reserved.</p>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                       <p>Powered by Google Gemini</p>
                       <div className="flex space-x-4">
                            <a href="#" className="hover:text-sky-500 transition-colors"><TwitterIcon /></a>
                            <a href="#" className="hover:text-sky-500 transition-colors"><GithubIcon /></a>
                       </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
