import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import searchService from '../services/searchService';
import { useDebounce } from './useDebounce';

// Custom hook for managing search functionality
export const useSearch = (options = {}) => {
  const {
    debounceDelay = 300,
    maxSuggestions = 8,
    enableAutoComplete = true,
    enableRecentSearches = true,
  } = options;

  const navigate = useNavigate();
  
  // Search state
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchResults, setSearchResults] = useState(null);
  const [hasError, setHasError] = useState(false);

  // Debounced query for API calls
  const debouncedQuery = useDebounce(query, debounceDelay);

  // Initialize data on mount
  useEffect(() => {
    if (enableRecentSearches) {
      setRecentSearches(searchService.getRecentSearches());
    }
    setPopularSearches(searchService.getPopularSearches());
  }, [enableRecentSearches]);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setSuggestions([]);
        setHasError(false);
        return;
      }

      setLoading(true);
      setHasError(false);

      try {
        const result = await searchService.getSuggestions(debouncedQuery, maxSuggestions);
        
        // Combine API suggestions with smart local suggestions
        const apiSuggestions = result.suggestions.map(searchService.formatSuggestion);
        const smartSuggestions = enableAutoComplete 
          ? searchService.getSmartSuggestions(debouncedQuery)
              .map(text => ({
                id: `smart-${text}`,
                name: text,
                type: 'suggestion',
                subtitle: 'پیشنهاد هوشمند',
                icon: 'auto_awesome'
              }))
          : [];

        // Merge and deduplicate suggestions
        const allSuggestions = [...apiSuggestions, ...smartSuggestions];
        const uniqueSuggestions = allSuggestions.filter((suggestion, index, self) =>
          index === self.findIndex(s => s.name.toLowerCase() === suggestion.name.toLowerCase())
        );

        setSuggestions(uniqueSuggestions.slice(0, maxSuggestions));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setHasError(true);
        
        // Fallback to smart suggestions only
        if (enableAutoComplete) {
          const fallbackSuggestions = searchService.getSmartSuggestions(debouncedQuery)
            .map(text => ({
              id: `fallback-${text}`,
              name: text,
              type: 'suggestion',
              subtitle: 'پیشنهاد',
              icon: 'search'
            }));
          setSuggestions(fallbackSuggestions);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, maxSuggestions, enableAutoComplete]);

  // Handle input change
  const handleInputChange = useCallback((newQuery) => {
    setQuery(newQuery);
    setSelectedIndex(-1);
    
    if (newQuery.length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setSuggestions([]);
    }
  }, []);

  // Perform full search - MOVED BEFORE handleSuggestionSelect
  const performSearch = useCallback(async (searchQuery = query, filters = {}) => {
    if (!searchQuery?.trim()) return;

    setLoading(true);
    setHasError(false);

    try {
      const results = await searchService.search(searchQuery, filters);
      setSearchResults(results);
      
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      
      // Update recent searches
      if (enableRecentSearches) {
        searchService.saveRecentSearch(searchQuery);
        setRecentSearches(searchService.getRecentSearches());
      }
    } catch (error) {
      console.error('Search error:', error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [query, navigate, enableRecentSearches]);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion) => {
    const searchQuery = suggestion.name;
    setQuery(searchQuery);
    setIsOpen(false);
    setSuggestions([]);

    // Navigate based on suggestion type
    switch (suggestion.type) {
      case 'product':
        navigate(`/products/${suggestion.slug}`);
        break;
      case 'brand':
        navigate(`/brands/${suggestion.slug}`);
        break;
      case 'category':
        navigate(`/categories/${suggestion.slug}`);
        break;
      default:
        // Perform search
        performSearch(searchQuery);
        break;
    }

    // Update recent searches
    if (enableRecentSearches) {
      searchService.saveRecentSearch(searchQuery);
      setRecentSearches(searchService.getRecentSearches());
    }
  }, [navigate, enableRecentSearches, performSearch]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : -1
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > -1 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        } else {
          performSearch(query);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  }, [isOpen, suggestions, selectedIndex, handleSuggestionSelect, performSearch, query]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    setSearchResults(null);
    setHasError(false);
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    searchService.clearRecentSearches();
    setRecentSearches([]);
  }, []);

  // Get combined suggestions (recent + current suggestions)
  const getCombinedSuggestions = useCallback(() => {
    if (query.length < 2) {
      // Show recent and popular searches when no query
      const combined = [];
      
      if (enableRecentSearches && recentSearches.length > 0) {
        combined.push({
          title: 'جستجوهای اخیر',
          items: recentSearches.map(search => ({
            id: `recent-${search}`,
            name: search,
            type: 'recent',
            subtitle: 'جستجوی اخیر',
            icon: 'history'
          }))
        });
      }

      if (popularSearches.length > 0) {
        combined.push({
          title: 'جستجوهای محبوب',
          items: popularSearches.slice(0, 5).map(search => ({
            id: `popular-${search}`,
            name: search,
            type: 'popular',
            subtitle: 'جستجوی محبوب',
            icon: 'trending_up'
          }))
        });
      }

      return combined;
    }

    // Show current suggestions grouped by type
    const grouped = suggestions.reduce((acc, suggestion) => {
      const type = suggestion.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(suggestion);
      return acc;
    }, {});

    const result = [];
    
    if (grouped.product?.length > 0) {
      result.push({
        title: 'محصولات',
        items: grouped.product
      });
    }
    
    if (grouped.brand?.length > 0) {
      result.push({
        title: 'برندها',
        items: grouped.brand
      });
    }
    
    if (grouped.category?.length > 0) {
      result.push({
        title: 'دسته‌بندی‌ها',
        items: grouped.category
      });
    }
    
    if (grouped.suggestion?.length > 0) {
      result.push({
        title: 'پیشنهادات',
        items: grouped.suggestion
      });
    }

    return result;
  }, [query, suggestions, recentSearches, popularSearches, enableRecentSearches]);

  return {
    // State
    query,
    suggestions,
    recentSearches,
    popularSearches,
    loading,
    isOpen,
    selectedIndex,
    searchResults,
    hasError,
    
    // Computed
    combinedSuggestions: getCombinedSuggestions(),
    
    // Actions
    setQuery: handleInputChange,
    setIsOpen,
    performSearch,
    handleSuggestionSelect,
    handleKeyDown,
    clearSearch,
    clearRecentSearches,
    
    // Utilities
    isSearching: loading,
    hasQuery: query.length > 0,
    hasSuggestions: suggestions.length > 0,
  };
};

export default useSearch; 