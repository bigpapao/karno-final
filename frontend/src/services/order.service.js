import api from './api';

export const orderService = {
  // Create a new order
  async createOrder(orderData) {
    try {
      const endpoint = orderData.guestInfo ? '/orders/guest' : '/orders';
      const response = await api.post(endpoint, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'خطا در ایجاد سفارش';
    }
  },

  // Get orders for authenticated user
  async getUserOrders() {
    try {
      const response = await api.get('/orders/user');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'خطا در دریافت سفارشات';
    }
  },

  // Get order details
  async getOrderDetails(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'خطا در دریافت جزئیات سفارش';
    }
  },

  // Get order by tracking code
  async getOrderByTracking(trackingCode, phoneNumber) {
    try {
      const response = await api.get(`/orders/tracking/${trackingCode}`, {
        params: { phone: phoneNumber },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'خطا در دریافت اطلاعات سفارش';
    }
  },

  // Cancel an order
  async cancelOrder(orderId) {
    try {
      const response = await api.post(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'خطا در لغو سفارش';
    }
  },

  // Admin: get all orders
  async getAllOrders(params = {}) {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  // Admin: update order status
  async updateOrderStatus(id, status) {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export default orderService;
