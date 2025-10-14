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
    api.patch(`/bookings/${id}`, { status }),
  confirm: (id: number) => api.put(`/bookings/${id}/confirm`),
  delete: (id: number) => api.delete(`/bookings/${id}`),
};

export const blogAPI = {
  getAll: (status?: string, category?: string) => api.get('/blog', { params: { status, category } }),
  getById: (id: number) => api.get(`/blog/${id}`),
  getBySlug: (slug: string) => api.get(`/blog/slug/${slug}`),
  create: (data: any) => api.post('/blog', data),
  update: (id: number, data: any) => api.put(`/blog/${id}`, data),
  delete: (id: number) => api.delete(`/blog/${id}`),
};

export const blogCategoriesAPI = {
  getAll: (active?: boolean) => api.get('/blog/categories', { params: { active } }),
  getById: (id: number) => api.get(`/blog/categories/${id}`),
  getBySlug: (slug: string) => api.get(`/blog/categories/slug/${slug}`),
  create: (data: any) => api.post('/blog/categories', data),
  update: (id: number, data: any) => api.put(`/blog/categories/${id}`, data),
  delete: (id: number) => api.delete(`/blog/categories/${id}`),
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

export const galleryAPI = {
  getAll: (category?: string, featured?: boolean, active?: boolean, limit?: number) => 
    api.get('/gallery', { 
      params: { 
        ...(category && { category }), 
        ...(featured !== undefined && { featured }), 
        ...(active !== undefined && { active }),
        ...(limit && { limit })
      } 
    }),
  getById: (id: number) => api.get(`/gallery/${id}`),
  create: (data: any) => api.post('/gallery', data),
  update: (id: number, data: any) => api.put(`/gallery/${id}`, data),
  delete: (id: number) => api.delete(`/gallery/${id}`),
};

export const virtualToursAPI = {
  getAll: (roomId?: number, tourType?: string, featured?: boolean, active?: boolean, limit?: number) => 
    api.get('/virtual-tours', { 
      params: { 
        ...(roomId && { roomId }), 
        ...(tourType && { tourType }), 
        ...(featured !== undefined && { featured }), 
        ...(active !== undefined && { active }),
        ...(limit && { limit })
      } 
    }),
  getById: (id: number) => api.get(`/virtual-tours/${id}`),
  create: (data: any) => api.post('/virtual-tours', data),
  update: (id: number, data: any) => api.put(`/virtual-tours/${id}`, data),
  delete: (id: number) => api.delete(`/virtual-tours/${id}`),
};

export const attractionsAPI = {
  getAll: (category?: string, featured?: boolean, active?: boolean, limit?: number, search?: string) => 
    api.get('/attractions', { 
      params: { 
        ...(category && { category }), 
        ...(featured !== undefined && { featured }), 
        ...(active !== undefined && { active }),
        ...(limit && { limit }),
        ...(search && { search })
      } 
    }),
  getById: (id: number) => api.get(`/attractions/${id}`),
  getBySlug: (slug: string) => api.get(`/attractions/slug/${slug}`),
  create: (data: any) => api.post('/attractions', data),
  update: (id: number, data: any) => api.put(`/attractions/${id}`, data),
  delete: (id: number) => api.delete(`/attractions/${id}`),
};

export default api;
