import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostList } from './components/PostList';
import { PostDetail } from './pages/PostDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
          </div>
        </header>

        <main className="max-w-5xl mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;