import React from 'react';
import { useItems } from '../context/ItemsContext';

const Filters: React.FC = () => {
  const { filters, updateFilters } = useItems();
  
  const allRarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const allTypes = ['Weapon', 'Armor', 'Consumable', 'Material', 'Advanced Material', 'Quest Item'];

  // Rarity colors mapping
  const rarityColors: Record<string, string> = {
    Common: 'bg-gray-600 border-gray-500',
    Uncommon: 'bg-green-600 border-green-500',
    Rare: 'bg-blue-600 border-blue-500',
    Epic: 'bg-purple-600 border-purple-500',
    Legendary: 'bg-yellow-600 border-yellow-500',
  };

  // Check if any filters are active
  const isAnyFilterActive = 
    filters.rarity.length > 0 || 
    filters.type.length > 0 || 
    filters.craftable !== null;

  return (
    <div className="space-y-6 bg-[#1a1433]/50 backdrop-blur-sm rounded-xl border border-[#2d1b69] p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Filters
        </h3>
        {isAnyFilterActive && (
          <button
            type="button"
            onClick={() => {
              updateFilters('rarity', '');
              updateFilters('type', '');
              updateFilters('craftable', null);
            }}
            className="text-xs text-purple-300 hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Rarity Filter */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-purple-200 mb-2 uppercase tracking-wider">Rarity</h4>
        <div className="grid grid-cols-2 gap-1.5">
          {allRarities.map((rarity) => {
            const isSelected = filters.rarity.includes(rarity);
            return (
              <div 
                key={rarity} 
                className={`relative flex items-center p-1.5 rounded-md cursor-pointer transition-all text-xs ${isSelected 
                  ? `${rarityColors[rarity]} border border-opacity-70` 
                  : 'bg-[#2d1b69]/50 border border-[#2d1b69] hover:border-purple-500'}`}
                onClick={() => updateFilters('rarity', rarity)}
              >
                <input
                  id={`rarity-${rarity}`}
                  name="rarity"
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => {}}
                />
                <div className={`flex-shrink-0 flex items-center justify-center w-3.5 h-3.5 rounded-sm border ${isSelected 
                  ? 'bg-white border-white' 
                  : 'border-purple-400'}`}>
                  {isSelected && (
                    <svg className="w-2.5 h-2.5 text-[#2d1b69]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <label 
                  htmlFor={`rarity-${rarity}`} 
                  className={`ml-2 font-medium cursor-pointer truncate ${isSelected ? 'text-white' : 'text-purple-100'} select-none`}
                  onClick={(e) => e.preventDefault()}
                >
                  {rarity}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Type Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-purple-200 mb-3 uppercase tracking-wider">Type</h4>
        <div className="space-y-2">
          {allTypes.map((type) => {
            const isSelected = filters.type.includes(type);
            return (
              <div 
                key={type} 
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${isSelected 
                  ? 'bg-purple-600/30 border border-purple-500/50' 
                  : 'bg-[#2d1b69]/30 border border-[#2d1b69] hover:border-purple-500'}`}
                onClick={() => updateFilters('type', type)}
              >
                <input
                  id={`type-${type}`}
                  name="type"
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => {}}
                />
                <div className={`flex items-center justify-center w-4 h-4 rounded-sm border ${isSelected 
                  ? 'bg-purple-400 border-purple-400' 
                  : 'border-purple-400'}`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-[#1a1433]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <label 
                  htmlFor={`type-${type}`} 
                  className={`ml-3 text-sm ${isSelected ? 'text-white font-medium' : 'text-purple-100'} select-none`}
                  onClick={(e) => e.preventDefault()}
                >
                  {type}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Craftable Filter */}
      <div className="mb-2">
        <h4 className="text-sm font-medium text-purple-200 mb-3 uppercase tracking-wider">Craftable</h4>
        <div className="space-y-2">
          {[
            { id: 'any', value: null, label: 'Any' },
            { id: 'yes', value: true, label: 'Craftable Only' },
            { id: 'no', value: false, label: 'Not Craftable' }
          ].map((option) => {
            const isSelected = filters.craftable === option.value;
            return (
              <div 
                key={option.id}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${isSelected 
                  ? 'bg-purple-600/30 border border-purple-500/50' 
                  : 'bg-[#2d1b69]/30 border border-[#2d1b69] hover:border-purple-500'}`}
                onClick={() => updateFilters('craftable', option.value)}
              >
                <div className={`flex items-center justify-center w-4 h-4 rounded-full border ${isSelected 
                  ? 'border-transparent bg-purple-400' 
                  : 'border-purple-400'}`}>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#1a1433]"></div>
                  )}
                </div>
                <label 
                  htmlFor={`craftable-${option.id}`} 
                  className={`ml-3 text-sm ${isSelected ? 'text-white font-medium' : 'text-purple-100'} select-none`}
                  onClick={(e) => e.preventDefault()}
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
