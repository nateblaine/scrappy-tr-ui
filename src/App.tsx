import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import { ItemsProvider } from './context/ItemsContext';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ItemsProvider>
        <Router>
          <div className="min-h-screen bg-[#0f0b1f]">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items/:id" element={<ItemDetail />} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
            </main>
          </div>
        </Router>
      </ItemsProvider>
    </QueryClientProvider>
  );
};

export default App;
