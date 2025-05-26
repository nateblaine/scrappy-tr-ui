import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getItemById, items } = useItems();
  const navigate = useNavigate();
  
  const item = getItemById(id || '');
  
  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0b1f] to-[#1a1433] px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex items-center">
            <p className="text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] via-[#00ff5e] to-[#ff3b3b] sm:text-6xl">404</p>
            <div className="sm:ml-8">
              <div className="sm:border-l sm:border-purple-800 sm:pl-6">
                <h1 className="text-3xl font-display font-bold text-white tracking-tight sm:text-4xl">Item not found</h1>
                <p className="mt-2 text-base text-purple-200">The item you're looking for doesn't exist.</p>
              </div>
              <div className="mt-6 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                >
                  Go back home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  // Find the current item's index for navigation
  const currentIndex = items.findIndex(i => i.id === id);
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : null;
  
  const rarityColors = {
    Common: 'bg-gray-600 text-white',
    Uncommon: 'bg-green-500 text-white',
    Rare: 'bg-blue-500 text-white',
    Epic: 'bg-purple-600 text-white',
    Legendary: 'bg-yellow-500 text-gray-900',
  } as const;
  
  const rarityColor = rarityColors[item.rarity as keyof typeof rarityColors] || 'bg-gray-600 text-white';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0b1f] to-[#1a1433] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a1433] bg-opacity-50 backdrop-blur-sm rounded-xl border border-[#2d1b69] p-6 shadow-2xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Image */}
            <div className="flex flex-col-reverse items-start">
              <div className="w-full h-full">
                <img
                  src={item.imageFilename}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placecats.com/300/200';
                  }}
                />
              </div>
            </div>

            {/* Item info */}
            <div className="mt-6 lg:mt-0">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-display font-bold text-white">{item.name}</h1>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${rarityColor} border border-opacity-30`}>
                      {item.rarity}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-900/50 text-blue-200 border border-blue-700/50">
                      {item.type}
                    </span>
                    {item.craftable && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-900/30 text-green-300 border border-green-700/50">
                        Craftable
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] via-[#00ff5e] to-[#ffe234]">
                  {item.value} ₽
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Description</h3>
                <div className="text-purple-100 space-y-4">
                  <p className="leading-relaxed">{item.description}</p>
                </div>
              </div>

              {item.weightKg !== undefined && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Weight</h3>
                  <p className="text-purple-100">{item.weightKg} kg</p>
                </div>
              )}

              {item.craftableUsing && item.craftableUsing.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Crafting Materials</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.craftableUsing.map((material, index) => (
                      <Link
                        key={index}
                        to={`/items/${material.itemId}`}
                        className="flex items-center justify-between bg-[#1a1433] bg-opacity-50 hover:bg-[#2d1b69]/30 p-3 rounded-lg border border-[#2d1b69] hover:border-purple-500 transition-colors"
                      >
                        <span className="text-purple-100 hover:text-white text-sm font-medium">
                          {material.itemName}
                        </span>
                        <span className="ml-2 text-sm text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded">
                          x{material.amount}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {item.recyclesInto && item.recyclesInto.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Recycles Into</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.recyclesInto.map((recycled, index) => (
                      <Link
                        key={index}
                        to={`/items/${recycled.itemId}`}
                        className="flex items-center justify-between bg-[#1a1433] bg-opacity-50 hover:bg-[#2d1b69]/30 p-3 rounded-lg border border-[#2d1b69] hover:border-purple-500 transition-colors"
                      >
                        <span className="text-purple-100 hover:text-white text-sm font-medium">
                          {recycled.itemName}
                        </span>
                        <span className="ml-2 text-sm text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded">
                          x{recycled.amount}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {item.usedForCrafting && item.usedForCrafting.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Used For</h3>
                  <div className="space-y-2">
                    {item.usedForCrafting.map((craft, index) => (
                      <div key={index} className="bg-[#1a1433] bg-opacity-30 p-3 rounded-lg border border-[#2d1b69]">
                        <p className="text-purple-100 text-sm">{craft}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation between items */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-b border-[#2d1b69] py-4">
            {prevItem ? (
              <Link
                to={`/items/${prevItem.id}`}
                className="flex items-center text-sm font-medium text-purple-300 hover:text-white transition-colors mb-2 sm:mb-0"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                <span className="truncate max-w-[150px] sm:max-w-none">{prevItem.name}</span>
              </Link>
            ) : (
              <div />
            )}
            
            {nextItem && (
              <Link
                to={`/items/${nextItem.id}`}
                className="flex items-center text-sm font-medium text-purple-300 hover:text-white transition-colors mt-2 sm:mt-0"
              >
                <span className="truncate max-w-[150px] sm:max-w-none">{nextItem.name}</span>
                <ArrowRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
              </Link>
            )}
          </div>

          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-purple-300 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              Back to all items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
