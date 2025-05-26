import React from 'react';
import { Link } from 'react-router-dom';

interface ItemCardProps {
  item: {
    id: string;
    name: string;
    imageFilename?: string;
    value: number;
    type: string;
    rarity: string;
    craftable: boolean;
    description: string;
    craftableUsing?: Array<{ itemId: string; amount: number; itemName: string }>;
    recyclesInto?: Array<{ itemId: string; amount: number; itemName: string }>;
  };
}

const rarityColors = {
  Common: 'bg-gray-600 text-white',
  Uncommon: 'bg-green-500 text-white',
  Rare: 'bg-blue-500 text-white',
  Epic: 'bg-purple-600 text-white',
  Legendary: 'bg-yellow-500 text-gray-900',
} as const;

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const rarityColor = rarityColors[item.rarity as keyof typeof rarityColors] || 'bg-gray-100 text-gray-800';
  
  return (
    <div key={item.id} className="group transition-all duration-300 hover:scale-[1.02]">
      <Link to={`/items/${item.id}`} className="group block h-full">
        <div className="h-full bg-[#1a1433] bg-opacity-50 backdrop-blur-sm rounded-xl border border-[#2d1b69] p-4 shadow-lg hover:border-purple-500 transition-colors hover:shadow-purple-500/20">
          {/* Item Image */}
          <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg overflow-hidden mb-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-purple-500/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          {/* Item Info */}
          <div className="p-2">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-display text-white">{item.name}</h3>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-purple-900/50 text-purple-200 border border-purple-700/50">
                {item.value} ₽
              </span>
            </div>
            
            <p className="text-sm text-purple-100 mb-4 line-clamp-2 min-h-[2.5rem]">
              {item.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-3">
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
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
