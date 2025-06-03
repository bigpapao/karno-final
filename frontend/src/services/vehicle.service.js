import api from './api';

export const vehicleService = {
  // Get all manufacturers
  getManufacturers: async () => {
    try {
      const response = await api.get('/vehicles/manufacturers');
      return response.data.manufacturers || [];
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
      throw error;
    }
  },

  // Get all models
  getAllModels: async () => {
    try {
      const response = await api.get('/vehicles/models');
      return response.data.models || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },

  // Get models for a specific manufacturer
  getModelsByManufacturer: async (manufacturerId) => {
    try {
      const response = await api.get(`/vehicles/manufacturers/${manufacturerId}/models`);
      return response.data.models || [];
    } catch (error) {
      console.error('Error fetching models by manufacturer:', error);
      throw error;
    }
  },

  // Get single model by ID
  getModelById: async (modelId) => {
    try {
      const response = await api.get(`/vehicles/models/${modelId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching model:', error);
      throw error;
    }
  },

  // Get vehicle statistics
  getVehicleStats: async () => {
    try {
      const response = await api.get('/vehicles/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle stats:', error);
      throw error;
    }
  },

  // Admin functions for managing vehicles
  createManufacturer: async (manufacturerData) => {
    try {
      const response = await api.post('/vehicles/manufacturers', manufacturerData);
      return response.data;
    } catch (error) {
      console.error('Error creating manufacturer:', error);
      throw error;
    }
  },

  updateManufacturer: async (manufacturerId, manufacturerData) => {
    try {
      const response = await api.put(`/vehicles/manufacturers/${manufacturerId}`, manufacturerData);
      return response.data;
    } catch (error) {
      console.error('Error updating manufacturer:', error);
      throw error;
    }
  },

  deleteManufacturer: async (manufacturerId) => {
    try {
      const response = await api.delete(`/vehicles/manufacturers/${manufacturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting manufacturer:', error);
      throw error;
    }
  },

  createModel: async (modelData) => {
    try {
      const response = await api.post('/vehicles/models', modelData);
      return response.data;
    } catch (error) {
      console.error('Error creating model:', error);
      throw error;
    }
  },

  updateModel: async (modelId, modelData) => {
    try {
      const response = await api.put(`/vehicles/models/${modelId}`, modelData);
      return response.data;
    } catch (error) {
      console.error('Error updating model:', error);
      throw error;
    }
  },

  deleteModel: async (modelId) => {
    try {
      const response = await api.delete(`/vehicles/models/${modelId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting model:', error);
      throw error;
    }
  }
};

export default vehicleService; 