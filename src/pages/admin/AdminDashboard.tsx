import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { roomsAPI, servicesAPI, blogAPI, bookingsAPI } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import { Bed, FileText, MapPin, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [stats, setStats] = useState({
    totalRooms: 0,
    activeRooms: 0,
    totalPosts: 0,
    publishedPosts: 0,
    totalServices: 0,
    activeServices: 0,
    totalBookings: 0,
    newBookings: 0
  });

  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchDashboardData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data...');
      console.log('Token in localStorage:', localStorage.getItem('token'));
      
      // Fetch stats
      const [roomsResult, postsResult, servicesResult, bookingsResult] = await Promise.all([
        roomsAPI.getAll(),
        blogAPI.getAll(),
        servicesAPI.getAll(),
        bookingsAPI.getAll()
      ]);

      console.log('API Results:', {
        rooms: roomsResult.data,
        posts: postsResult.data,
        services: servicesResult.data,
        bookings: bookingsResult.data
      });

      // Calculate stats
      const rooms = roomsResult.data?.data || [];
      const posts = postsResult.data?.data || [];
      const services = servicesResult.data?.data || [];
      const bookings = bookingsResult.data?.data || [];

      console.log('Processed data:', { rooms, posts, services, bookings });

      setStats({
        totalRooms: rooms.length,
        activeRooms: rooms.filter(r => r.isActive).length,
        totalPosts: posts.length,
        publishedPosts: posts.filter(p => p.is_published).length,
        totalServices: services.length,
        activeServices: services.filter(s => s.isActive).length,
        totalBookings: bookings.length,
        newBookings: bookings.filter(b => b.status === 'pending').length
      });

      // Fetch recent bookings
      const allBookings = bookingsResult.data?.data || [];
      const recent = allBookings
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      setRecentBookings(recent);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      console.error('Error details:', error.response?.data);
      console.error('Error status:', error.response?.status);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Rooms',
      value: `${stats.activeRooms}/${stats.totalRooms}`,
      subtitle: 'Active Rooms',
      icon: Bed,
      color: 'bg-blue-500',
      link: '/admin/rooms'
    },
    {
      title: 'Blog Posts',
      value: `${stats.publishedPosts}/${stats.totalPosts}`,
      subtitle: 'Published Posts',
      icon: FileText,
      color: 'bg-green-500',
      link: '/admin/blog'
    },
    {
      title: 'Services',
      value: `${stats.activeServices}/${stats.totalServices}`,
      subtitle: 'Active Services',
      icon: MapPin,
      color: 'bg-purple-500',
      link: '/admin/services'
    },
    {
      title: 'Bookings',
      value: stats.newBookings,
      subtitle: 'New Inquiries',
      icon: Calendar,
      color: 'bg-amber-500',
      link: '/admin/bookings'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-600">
          Welcome to Dutch Wall Fort Admin Panel
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className={`${card.color} rounded-lg p-3 mr-4`}>
                <card.icon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-600">{card.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
            <Link
              to="/admin/bookings"
              className="text-amber-600 hover:text-amber-800 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {recentBookings.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{booking.full_name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent bookings</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/rooms/new"
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <Bed className="text-blue-600 mr-3" size={20} />
              <span className="font-medium text-blue-900">Add New Room</span>
            </Link>
            
            <Link
              to="/admin/blog/new"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              <FileText className="text-green-600 mr-3" size={20} />
              <span className="font-medium text-green-900">Create Blog Post</span>
            </Link>
            
            <Link
              to="/admin/services/new"
              className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
            >
              <MapPin className="text-purple-600 mr-3" size={20} />
              <span className="font-medium text-purple-900">Add New Service</span>
            </Link>
            
            <Link
              to="/admin/bookings"
              className="flex items-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200"
            >
              <Calendar className="text-amber-600 mr-3" size={20} />
              <span className="font-medium text-amber-900">Manage Bookings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;