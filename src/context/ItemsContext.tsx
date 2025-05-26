import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Item {
  id: string;
  name: string;
  imageFilename?: string;
  value?: number;
  type: string;
  rarity?: string;
  craftable: boolean;
  craftableUsing?: Array<{
    itemId: string;
    amount: number;
    itemName: string;
  }>;
  recyclesInto?: Array<{
    itemId: string;
    amount: number;
    itemName: string;
  }>;
  usedForCrafting?: string[];
  weightKg?: number;
  description: string;
  [key: string]: any; // Allow for additional properties that might be in the JSON
}

interface ItemsContextType {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: {
    rarity: string[];
    type: string[];
    craftable: boolean | null;
  };
  updateFilters: (filterType: 'rarity' | 'type' | 'craftable', value: any) => void;
  getItemById: (id: string) => Item | undefined;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const useItems = (): ItemsContextType => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};

interface ItemsProviderProps {
  children: ReactNode;
}

export const ItemsProvider: React.FC<ItemsProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({
    rarity: [] as string[],
    type: [] as string[],
    craftable: null as boolean | null,
  });

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // In a real app, replace this with your actual API endpoint
        // const response = await axios.get('/api/items');
        // setItems(response.data);
        
        // Import items from the JSON file
        const itemsData = await import('../data/items.json');
        
        // Transform the JSON data to match our Item type with proper defaults
        const mockItems: Item[] = itemsData.default.map(item => ({
          ...item,
          // Set default values for optional fields
          value: item.value ?? 0,
          rarity: item.rarity ?? 'Common',
          weightKg: item.weightKg ?? 0,
          imageFilename: item.imageFilename ?? 'https://placecats.com/300/200',
          craftableUsing: item.craftableUsing ?? [],
          recyclesInto: item.recyclesInto ?? [],
          usedForCrafting: item.usedForCrafting ?? []
        }));
        
        setItems(mockItems);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch items');
        setIsLoading(false);
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, []);

  const updateFilters = (filterType: 'rarity' | 'type' | 'craftable', value: any) => {
    setFilters(prev => {
      if (filterType === 'craftable') {
        return { ...prev, craftable: value };
      } else {
        const currentValues = prev[filterType] as string[];
        const newValues = currentValues.includes(value as string)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value as string];
        return { ...prev, [filterType]: newValues };
      }
    });
  };

  const getItemById = (id: string): Item | undefined => {
    return items.find(item => item.id === id);
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        filters,
        updateFilters,
        getItemById,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
