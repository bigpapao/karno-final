import axiosInstance from './api';

// Search service for handling all search-related API calls
class SearchService {
  // Get search suggestions with debouncing
  async getSuggestions(query, limit = 8) {
    if (!query || query.length < 2) {
      return { suggestions: [], recent: [] };
    }

    try {
      const response = await axiosInstance.get('/products/suggest', {
        params: { q: query, limit }
      });

      if (response.data?.status === 'success') {
        return {
          suggestions: response.data.data || [],
          recent: this.getRecentSearches()
        };
      }
      return { suggestions: [], recent: this.getRecentSearches() };
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return { suggestions: [], recent: this.getRecentSearches() };
    }
  }

  // Perform full search
  async search(query, filters = {}, page = 1, limit = 20) {
    try {
      const params = {
        q: query,
        page,
        limit,
        ...filters
      };

      // Add filters as JSON string if they exist
      if (Object.keys(filters).length > 0) {
        params.filter = JSON.stringify(filters);
      }

      const response = await axiosInstance.get('/products/search', { params });

      if (response.data?.status === 'success') {
        // Save search to recent searches
        this.saveRecentSearch(query);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error performing search:', error);
      throw error;
    }
  }

  // Search by vehicle compatibility
  async searchByVehicle(make, model, year, page = 1, limit = 20) {
    try {
      const params = { make, page, limit };
      if (model) params.model = model;
      if (year) params.year = year;

      const response = await axiosInstance.get('/products/vehicle-search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching by vehicle:', error);
      throw error;
    }
  }

  // Get vehicle makes
  async getVehicleMakes() {
    try {
      const response = await axiosInstance.get('/products/vehicle-makes');
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle makes:', error);
      return [];
    }
  }

  // Get vehicle models for a make
  async getVehicleModels(make) {
    try {
      const response = await axiosInstance.get('/products/vehicle-models', {
        params: { make }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle models:', error);
      return [];
    }
  }

  // Get vehicle years for a make and model
  async getVehicleYears(make, model) {
    try {
      const response = await axiosInstance.get('/products/vehicle-years', {
        params: { make, model }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle years:', error);
      return [];
    }
  }

  // Local storage management for recent searches
  saveRecentSearch(query) {
    const searches = this.getRecentSearches();
    const filteredSearches = searches.filter(search => 
      search.toLowerCase() !== query.toLowerCase()
    );
    
    const newSearches = [query, ...filteredSearches].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(newSearches));
  }

  getRecentSearches() {
    try {
      const searches = localStorage.getItem('recentSearches');
      return searches ? JSON.parse(searches) : [];
    } catch (error) {
      return [];
    }
  }

  clearRecentSearches() {
    localStorage.removeItem('recentSearches');
  }

  // Popular searches (could be fetched from backend analytics)
  getPopularSearches() {
    return [
      'لنت ترمز',
      'فیلتر روغن',
      'شمع',
      'فیلتر هوا',
      'کمک فنر',
      'باطری',
      'تایر',
      'روغن موتور'
    ];
  }

  // Smart search suggestions based on user input
  getSmartSuggestions(query) {
    const suggestions = [];
    const queryLower = query.toLowerCase();

    // Common auto-completions
    const autoComplete = {
      'لنت': ['لنت ترمز', 'لنت جلو', 'لنت عقب'],
      'فیلتر': ['فیلتر روغن', 'فیلتر هوا', 'فیلتر بنزین', 'فیلتر کابین'],
      'شمع': ['شمع خودرو', 'شمع احتراق'],
      'کمک': ['کمک فنر', 'کمک جلو', 'کمک عقب'],
      'باطری': ['باطری خودرو', 'باطری اسید'],
      'روغن': ['روغن موتور', 'روغن گیربکس', 'روغن ترمز'],
      'لاستیک': ['لاستیک خودرو', 'لاستیک تابستانه', 'لاستیک زمستانه'],
      'برف': ['برف پاک کن', 'برف پاک کن جلو']
    };

    // Find matches
    Object.keys(autoComplete).forEach(key => {
      if (key.includes(queryLower) || queryLower.includes(key)) {
        suggestions.push(...autoComplete[key]);
      }
    });

    return suggestions.slice(0, 3);
  }

  // Format suggestion for display
  formatSuggestion(suggestion) {
    const baseFormat = {
      id: suggestion.id,
      name: suggestion.name,
      type: suggestion.type,
      slug: suggestion.slug
    };

    switch (suggestion.type) {
      case 'product':
        return {
          ...baseFormat,
          subtitle: `${suggestion.brand} - ${suggestion.category}`,
          image: suggestion.image,
          icon: 'product'
        };
      case 'brand':
        return {
          ...baseFormat,
          subtitle: 'برند',
          icon: 'brand'
        };
      case 'category':
        return {
          ...baseFormat,
          subtitle: 'دسته‌بندی',
          icon: 'category'
        };
      default:
        return baseFormat;
    }
  }
}

// Export the instance properly to avoid eslint warnings
const searchService = new SearchService();
export default searchService; 