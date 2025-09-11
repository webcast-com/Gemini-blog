// FIX: Implemented the main App component to manage state, routing, and render the application's UI. This resolves the 'not a module' error in index.tsx and other related errors by providing a valid, exportable component.
import React, { useState, useEffect } from 'react';
import { Post } from './types';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
import { PostView } from './components/PostView';
import { PostEditor } from './components/PostEditor';
import { LoginView } from './components/LoginView';
import { NewsView } from './components/NewsView';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';

// Mock data for initial state
const initialPosts: Post[] = [
    {
        id: '1',
        title: 'The Rise of AI in Web Development',
        content: 'Artificial Intelligence is revolutionizing web development, from automated coding to intelligent user interfaces. This post explores the latest trends and tools that are shaping the future of the web. We will dive into how AI can assist in debugging, testing, and even designing websites, making the development process faster and more efficient. Furthermore, we will discuss the ethical considerations and the potential impact on jobs for developers.',
        imageUrl: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
        imageAlt: 'Abstract AI art',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        category: 'AI',
    },
    {
        id: '2',
        title: 'A Deep Dive into React Server Components',
        content: 'React Server Components are a new paradigm that allows developers to build applications that span the server and client, combining the rich interactivity of client-side apps with the performance of traditional server rendering. This post explains what they are, how they work, and how you can start using them in your projects. We will walk through a practical example to illustrate the benefits and show how to fetch data more efficiently.',
        imageUrl: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
        imageAlt: 'React logo with server icons',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Web Development',
    },
     {
        id: '3',
        title: 'Mastering TypeScript for Large-Scale Applications',
        content: 'TypeScript has become the standard for building robust, large-scale web applications. Its static typing system helps catch errors early and improves developer productivity. In this article, we share best practices for using TypeScript effectively, including advanced types, project configuration, and integrating with popular libraries like React and Node.js. Learn how to structure your code for maintainability and scalability.',
        imageUrl: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
        imageAlt: 'TypeScript logo and code',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Web Development',
    },
];

type View = 'home' | 'view' | 'edit' | 'create' | 'login' | 'news';

const ADMIN_PASSWORD = 'password123';
const SESSION_KEY = 'gemini-blog-auth';
const POSTS_STORAGE_KEY = 'gemini-blog-posts';

const App: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(() => {
        try {
            const savedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
            return savedPosts ? JSON.parse(savedPosts) : initialPosts;
        } catch (error) {
            console.error('Error reading posts from localStorage:', error);
            return initialPosts;
        }
    });

    const [view, setView] = useState<View>('home');
    const [currentPostId, setCurrentPostId] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Persist posts to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
        } catch (error) {
            console.error('Error saving posts to localStorage:', error);
        }
    }, [posts]);


    // Check session on initial load
    useEffect(() => {
        if (sessionStorage.getItem(SESSION_KEY) === 'true') {
            setIsAdmin(true);
        }
    }, []);

    const handleSavePost = (postToSave: Omit<Post, 'id' | 'createdAt'> & { id?: string }) => {
        if (postToSave.id) {
            // Update existing post
            setPosts(posts.map(p => p.id === postToSave.id ? { ...posts.find(post => post.id === postToSave.id)!, ...postToSave } as Post : p));
        } else {
            // Create new post
            const newPost: Post = {
                ...postToSave,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
            };
            setPosts([newPost, ...posts]);
        }
        setView('home');
        setCurrentPostId(null);
    };

    const handleDeletePost = (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(p => p.id !== id));
        }
    };

    const handleViewPost = (id: string) => {
        setCurrentPostId(id);
        setView('view');
        window.scrollTo(0, 0);
    };
    
    const handleEditPost = (id: string) => {
        setCurrentPostId(id);
        setView('edit');
    };

    const handleCreatePost = () => {
        setCurrentPostId(null);
        setView('create');
    };
    
    const handleLoginAttempt = (password: string): boolean => {
        if (password === ADMIN_PASSWORD) {
            setIsAdmin(true);
            sessionStorage.setItem(SESSION_KEY, 'true');
            setView('home');
            return true;
        }
        return false;
    }

    const handleLogout = () => {
        setIsAdmin(false);
        sessionStorage.removeItem(SESSION_KEY);
        setView('home'); // Redirect to home after logout
    }

    const handleNavigate = (targetView: 'home' | 'news') => {
        setView(targetView);
        setCurrentPostId(null);
    };
    
    const renderContent = () => {
        const postToView = posts.find(p => p.id === currentPostId);
        const postToEdit = posts.find(p => p.id === currentPostId);

        switch (view) {
            case 'view':
                return postToView ? <PostView post={postToView} onBack={() => setView('home')} allPosts={posts} onViewPost={handleViewPost} /> : <p>Post not found</p>;
            case 'edit':
                return isAdmin ? <PostEditor post={postToEdit} onSave={handleSavePost} onCancel={() => setView('home')} /> : <LoginView onLogin={handleLoginAttempt} />;
            case 'create':
                return isAdmin ? <PostEditor onSave={handleSavePost} onCancel={() => setView('home')} /> : <LoginView onLogin={handleLoginAttempt} />;
            case 'login':
                return <LoginView onLogin={handleLoginAttempt} />;
            case 'news':
                return <NewsView />;
            case 'home':
            default:
                const categories = ['All', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean))) as string[]];
                const filteredPosts = selectedCategory === 'All' ? posts : posts.filter(p => p.category === selectedCategory);
                
                return (
                    <>
                        <Hero onBrowseClick={() => document.getElementById('post-list')?.scrollIntoView({ behavior: 'smooth' })} />
                        <div id="post-list">
                            <PostList
                                posts={filteredPosts}
                                onViewPost={handleViewPost}
                                onEditPost={handleEditPost}
                                onDeletePost={handleDeletePost}
                                onCreatePost={handleCreatePost}
                                isAdmin={isAdmin}
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                            />
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 font-sans">
            <Header
                onNavigate={handleNavigate}
                isAdmin={isAdmin}
                onLogin={() => setView('login')}
                onLogout={handleLogout}
            />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};

export default App;