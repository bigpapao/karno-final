import api from './api';

const USE_MOCK = false; // Set to true for development with mock data

// Mock data for development
const mockProducts = [
  {
    _id: '1',
    name: 'فیلتر روغن سایپا پراید',
    description: 'فیلتر روغن با کیفیت بالا برای خودروهای سایپا پراید',
    price: 100000,
    discountPrice: 85000,
    category: { _id: 'cat1', name: 'موتور' },
    brand: { _id: 'brand1', name: 'سایپا' },
    stock: 45,
    sku: 'SAI-FIL-001',
    weight: 500,
    featured: true,
    images: [
      { url: '/images/products/filter.jpg', alt: 'فیلتر روغن سایپا' }
    ],
    specifications: [
      { name: 'نوع', value: 'فیلتر روغن' },
      { name: 'سازگاری', value: 'سایپا پراید، تیبا' }
    ],
    compatibleVehicles: [
      { make: 'سایپا', model: 'پراید', year: 2020 },
      { make: 'سایپا', model: 'تیبا', year: 2019 }
    ],
    rating: 4.5,
    numReviews: 87,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z'
  },
  {
    _id: '2',
    name: 'لنت ترمز پژو 206',
    description: 'لنت ترمز با کیفیت اروپایی برای خودروهای پژو ایران خودرو',
    price: 200000,
    discountPrice: null,
    category: { _id: 'cat2', name: 'ترمز' },
    brand: { _id: 'brand2', name: 'ایران خودرو' },
    stock: 32,
    sku: 'IKC-BRK-002',
    weight: 800,
    featured: false,
    images: [
      { url: '/images/products/brake.jpg', alt: 'لنت ترمز پژو' }
    ],
    specifications: [
      { name: 'نوع', value: 'لنت ترمز' },
      { name: 'مواد', value: 'سرامیک' }
    ],
    compatibleVehicles: [
      { make: 'ایران خودرو', model: 'پژو 206', year: 2018 },
      { make: 'ایران خودرو', model: 'پژو 207', year: 2019 }
    ],
    rating: 4.8,
    numReviews: 65,
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z'
  }
];

// eslint-disable-next-line no-unused-vars
const mockCategories = [
  { _id: 'cat1', name: 'موتور' },
  { _id: 'cat2', name: 'ترمز' },
  { _id: 'cat3', name: 'برق خودرو' },
  { _id: 'cat4', name: 'سیستم تعلیق' }
];

// eslint-disable-next-line no-unused-vars
const mockBrands = [
  { _id: 'brand1', name: 'سایپا' },
  { _id: 'brand2', name: 'ایران خودرو' },
  { _id: 'brand3', name: 'MVM' },
  { _id: 'brand4', name: 'بهمن موتور' },
  { _id: 'brand5', name: 'بوش' }
];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  // Get all products with filtering and pagination
  getProducts: async (params = {}) => {
    if (USE_MOCK) {
      await delay(500); // Simulate network delay
      
      let filteredProducts = [...mockProducts];
      
      // Apply search filter
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.sku.toLowerCase().includes(searchTerm) ||
          product.category.name.toLowerCase().includes(searchTerm) ||
          product.brand.name.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply category filter
      if (params.category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category._id === params.category
        );
      }
      
      // Apply brand filter
      if (params.brand) {
        filteredProducts = filteredProducts.filter(product =>
          product.brand._id === params.brand
        );
      }
      
      // Apply stock level filter
      if (params.stockLevel) {
        switch (params.stockLevel) {
          case 'available':
            filteredProducts = filteredProducts.filter(product => product.stock > 0);
            break;
          case 'low':
            filteredProducts = filteredProducts.filter(product => product.stock > 0 && product.stock < 10);
            break;
          case 'out':
            filteredProducts = filteredProducts.filter(product => product.stock === 0);
            break;
          default:
            // No additional filtering for unknown stock levels
            break;
        }
      }
      
      // Pagination
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      return {
        products: paginatedProducts,
        pagination: {
          total: filteredProducts.length,
          page: page,
          limit: limit,
          pages: Math.ceil(filteredProducts.length / limit)
        }
      };
    }

    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProduct: async (id) => {
    if (USE_MOCK) {
      await delay(300);
      const product = mockProducts.find(p => p._id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }

    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    if (USE_MOCK) {
      await delay(800);
      const newProduct = {
        _id: Date.now().toString(),
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: 0,
        numReviews: 0
      };
      mockProducts.push(newProduct);
      return newProduct;
    }

    try {
      const response = await api.post('/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update existing product
  updateProduct: async (id, productData) => {
    if (USE_MOCK) {
      await delay(800);
      const index = mockProducts.findIndex(p => p._id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }
      mockProducts[index] = {
        ...mockProducts[index],
        ...productData,
        updatedAt: new Date().toISOString()
      };
      return mockProducts[index];
    }

    try {
      const response = await api.put(`/products/${id}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    if (USE_MOCK) {
      await delay(500);
      const index = mockProducts.findIndex(p => p._id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }
      mockProducts.splice(index, 1);
      return { message: 'Product deleted successfully' };
    }

    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit = 10) => {
    if (USE_MOCK) {
      await delay(400);
      const featured = mockProducts.filter(p => p.featured).slice(0, limit);
      return { products: featured };
    }

    try {
      const response = await api.get('/products/featured', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    if (USE_MOCK) {
      return this.getProducts({ search: query, ...filters });
    }

    try {
      const response = await api.get('/products/search', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params = {}) => {
    if (USE_MOCK) {
      return this.getProducts({ category: categoryId, ...params });
    }

    try {
      const response = await api.get(`/products/category/${categoryId}`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get products by brand
  getProductsByBrand: async (brandId, params = {}) => {
    if (USE_MOCK) {
      return this.getProducts({ brand: brandId, ...params });
    }

    try {
      const response = await api.get(`/products/brand/${brandId}`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }
  },

  // Update product stock
  updateStock: async (id, stock) => {
    if (USE_MOCK) {
      await delay(300);
      const product = mockProducts.find(p => p._id === id);
      if (product) {
        product.stock = stock;
        product.updatedAt = new Date().toISOString();
      }
      return product;
    }

    try {
      const response = await api.put(`/products/${id}/stock`, { stock });
      return response.data;
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw error;
    }
  },

  // Bulk update products
  bulkUpdate: async (productIds, updateData) => {
    if (USE_MOCK) {
      await delay(1000);
      productIds.forEach(id => {
        const product = mockProducts.find(p => p._id === id);
        if (product) {
          Object.assign(product, updateData);
          product.updatedAt = new Date().toISOString();
        }
      });
      return { message: 'Products updated successfully' };
    }

    try {
      const response = await api.put('/products/bulk-update', {
        productIds,
        updateData
      });
      return response.data;
    } catch (error) {
      console.error('Error bulk updating products:', error);
      throw error;
    }
  },

  // Get products by vehicle model (NEW METHOD)
  getProductsByModel: async (modelId, params = {}) => {
    if (USE_MOCK) {
      await delay(400);
      // For mock data, filter products that have compatible vehicles matching the model
      const modelMap = {
        'pride_111': 'پراید',
        'pride_131': 'پراید', 
        'tiba': 'تیبا',
        'peugeot_206': 'پژو 206',
        'peugeot_pars': 'پژو پارس',
        'samand_lx': 'سمند',
        'dena': 'دنا',
        'quick': 'کوییک',
        'shahin': 'شاهین',
        'runna': 'رانا'
      };
      
      const modelName = modelMap[modelId];
      if (!modelName) {
        return { products: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } };
      }
      
      const filteredProducts = mockProducts.filter(product =>
        product.compatibleVehicles?.some(vehicle => 
          vehicle.model.includes(modelName.split(' ')[0]) // Match main model name
        )
      );
      
      // Apply additional filters
      let result = filteredProducts;
      
      if (params.category) {
        result = result.filter(product => product.category._id === params.category);
      }
      
      // Pagination
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = result.slice(startIndex, endIndex);
      
      return {
        products: paginatedProducts,
        pagination: {
          total: result.length,
          page: page,
          limit: limit,
          pages: Math.ceil(result.length / limit)
        }
      };
    }

    try {
      const response = await api.get(`/products/model/${modelId}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by model:', error);
      throw error;
    }
  },

  // Get products by manufacturer (NEW METHOD)
  getProductsByManufacturer: async (manufacturerId, params = {}) => {
    if (USE_MOCK) {
      await delay(400);
      const manufacturerMap = {
        'saipa': 'سایپا',
        'ikco': 'ایران خودرو'
      };
      
      const manufacturerName = manufacturerMap[manufacturerId];
      if (!manufacturerName) {
        return { products: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } };
      }
      
      const filteredProducts = mockProducts.filter(product =>
        product.compatibleVehicles?.some(vehicle => 
          vehicle.make === manufacturerName
        )
      );
      
      // Apply additional filters and pagination similar to getProductsByModel
      let result = filteredProducts;
      
      if (params.category) {
        result = result.filter(product => product.category._id === params.category);
      }
      
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = result.slice(startIndex, endIndex);
      
      return {
        products: paginatedProducts,
        pagination: {
          total: result.length,
          page: page,
          limit: limit,
          pages: Math.ceil(result.length / limit)
        }
      };
    }

    try {
      const response = await api.get(`/products/manufacturer/${manufacturerId}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by manufacturer:', error);
      throw error;
    }
  },

  // Get compatible vehicles for admin (NEW METHOD)
  getCompatibleVehicles: async () => {
    if (USE_MOCK) {
      await delay(200);
      // Return all unique vehicle combinations from existing products
      const vehicles = new Set();
      mockProducts.forEach(product => {
        product.compatibleVehicles?.forEach(vehicle => {
          vehicles.add(JSON.stringify({
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year
          }));
        });
      });
      
      return Array.from(vehicles).map(v => JSON.parse(v));
    }

    try {
      const response = await api.get('/products/compatible-vehicles');
      return response.data;
    } catch (error) {
      console.error('Error fetching compatible vehicles:', error);
      throw error;
    }
  }
};

export default productService;
