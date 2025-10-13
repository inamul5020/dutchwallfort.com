import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    api.post('/auth/register', { email, password, name }),
  getProfile: () => api.get('/auth/profile'),
};

export const roomsAPI = {
  getAll: () => api.get('/rooms'),
  getById: (id: number) => api.get(`/rooms/by-id/${id}`),
  getBySlug: (slug: string) => api.get(`/rooms/${slug}`),
  create: (data: any) => api.post('/rooms', data),
  update: (id: number, data: any) => api.put(`/rooms/by-id/${id}`, data),
  delete: (id: number) => api.delete(`/rooms/by-id/${id}`),
};

export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id: number) => api.get(`/services/${id}`),
  create: (data: any) => api.post('/services', data),
  update: (id: number, data: any) => api.put(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`),
};

export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  getById: (id: number) => api.get(`/bookings/${id}`),
  create: (data: any) => api.post('/bookings', data),
  updateStatus: (id: number, status: string) =>
    api.patch(`/bookings/${id}/status`, { status }),
  delete: (id: number) => api.delete(`/bookings/${id}`),
};

export const blogAPI = {
  getAll: (status?: string) => api.get('/blog', { params: { status } }),
  getById: (id: number) => api.get(`/blog/${id}`),
  create: (data: any) => api.post('/blog', data),
  update: (id: number, data: any) => api.put(`/blog/${id}`, data),
  delete: (id: number) => api.delete(`/blog/${id}`),
};

export const testimonialsAPI = {
  getAll: (featured?: boolean, approved?: boolean) => 
    api.get('/testimonials', { 
      params: { 
        ...(featured !== undefined && { featured }), 
        ...(approved !== undefined && { approved }) 
      } 
    }),
  getById: (id: number) => api.get(`/testimonials/${id}`),
  create: (data: any) => api.post('/testimonials', data),
  update: (id: number, data: any) => api.put(`/testimonials/${id}`, data),
  delete: (id: number) => api.delete(`/testimonials/${id}`),
};

export default api;
