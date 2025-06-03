import api from './api';

export const productService = {
  // Get all products with filtering and pagination
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  async getProduct(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create new product
  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update existing product
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  async deleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Get featured products
  async getFeaturedProducts(limit = 10) {
    try {
      const response = await api.get('/products/featured', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Search products
  async searchProducts(query, filters = {}) {
    try {
      const response = await api.get('/products/search', {
        params: { q: query, ...filters },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get products by category
  async getProductsByCategory(categoryId, params = {}) {
    try {
      const response = await api.get(`/products/category/${categoryId}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get products by brand
  async getProductsByBrand(brandId, params = {}) {
    try {
      const response = await api.get(`/products/brand/${brandId}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }
  },

  // Update product stock
  async updateStock(id, stock) {
    try {
      const response = await api.put(`/products/${id}/stock`, { stock });
      return response.data;
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw error;
    }
  },

  // Bulk update products
  async bulkUpdate(productIds, updateData) {
    try {
      const response = await api.put('/products/bulk-update', {
        productIds,
        updateData,
      });
      return response.data;
    } catch (error) {
      console.error('Error bulk updating products:', error);
      throw error;
    }
  },

  // Get products by vehicle model
  async getProductsByModel(modelId, params = {}) {
    try {
      const response = await api.get(`/products/model/${modelId}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by model:', error);
      throw error;
    }
  },

  // Get products by manufacturer
  async getProductsByManufacturer(manufacturerId, params = {}) {
    try {
      const response = await api.get(`/products/manufacturer/${manufacturerId}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by manufacturer:', error);
      throw error;
    }
  },

  // Get compatible vehicles
  async getCompatibleVehicles() {
    try {
      const response = await api.get('/products/compatible-vehicles');
      return response.data;
    } catch (error) {
      console.error('Error fetching compatible vehicles:', error);
      throw error;
    }
  },
};

export default productService;
