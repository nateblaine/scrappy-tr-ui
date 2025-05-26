import React from 'react';
import { useItems } from '../context/ItemsContext';
import ItemCard from '../components/ItemCard';
import Filters from '../components/Filters';

const Home: React.FC = () => {
  const { items, isLoading, error, searchTerm, filters } = useItems();

  // Filter items based on search term and filters
  const filteredItems = React.useMemo(() => {
    return items.filter(item => {
      // Search term filter
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Rarity filter
      const matchesRarity = filters.rarity.length === 0 || filters.rarity.includes(item.rarity ?? '');
      
      // Type filter
      const matchesType = filters.type.length === 0 || filters.type.includes(item.type);
      
      // Craftable filter
      const matchesCraftable = filters.craftable === null || item.craftable === filters.craftable;
      
      return matchesSearch && matchesRarity && matchesType && matchesCraftable;
    });
  }, [items, searchTerm, filters]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0b1f] to-[#1a1433] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Filters - shown on small screens, hidden on lg and up */}
        <div className="lg:hidden mb-6">
          <div className="bg-[#1a1433]/50 backdrop-blur-sm rounded-xl p-4 border border-[#2d1b69] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
            <Filters />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filters - hidden on mobile, shown on lg and up */}
          <div className="hidden lg:block">
            <Filters />
          </div>
          
          {/* Item grid - full width on mobile, 3/4 on desktop */}
          <div className="lg:col-span-3">
            <div className="bg-[#1a1433] bg-opacity-50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-[#2d1b69] shadow-2xl">
              <div className="max-w-2xl mx-auto py-4 sm:py-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-display text-white mb-6 tracking-wider">ITEM CATALOG</h2>
                
                {filteredItems.length === 0 ? (
                  <div className="text-center py-12 bg-[#1a1433] bg-opacity-50 rounded-lg border border-dashed border-[#2d1b69] p-8">
                    <svg
                      className="mx-auto h-16 w-16 text-purple-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15c-1.43 0-2.82.2-4.13.573M4.5 19.5l3.35-.89m0 0a7.984 7.984 0 014.15-1.51m-4.15 1.51l-1.32-.352a48.25 48.25 0 010-8.426m4.15 1.51l3.35-.89m0 0a7.968 7.968 0 014.15-1.51m-4.15 1.51a7.968 7.968 0 01-1.32-.352"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-purple-100 font-display">No items found</h3>
                    <p className="mt-2 text-purple-300">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    {filteredItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
