import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import About from './pages/About';
import Gallery from './pages/Gallery';
import LocalArea from './pages/LocalArea';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Policies from './pages/Policies';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRooms from './pages/admin/AdminRooms';
import AdminRoomForm from './pages/admin/AdminRoomForm';
import AdminBlog from './pages/admin/AdminBlog';
import AdminBlogForm from './pages/admin/AdminBlogForm';
import AdminServices from './pages/admin/AdminServices';
import AdminServiceForm from './pages/admin/AdminServiceForm';
import AdminBookings from './pages/admin/AdminBookings';
import AdminGallery from './pages/admin/AdminGallery';
import AdminVirtualTours from './pages/admin/AdminVirtualTours';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/rooms" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <Rooms />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/rooms/:slug" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <RoomDetail />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <About />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/gallery" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <Gallery />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/local-area" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <LocalArea />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/reviews" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <Reviews />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/policies" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <Policies />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/blog" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <Blog />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/blog/:slug" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <BlogDetail />
              </main>
              <Footer />
            </div>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="rooms/new" element={<AdminRoomForm />} />
            <Route path="rooms/edit/:id" element={<AdminRoomForm />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="blog/new" element={<AdminBlogForm />} />
            <Route path="blog/edit/:id" element={<AdminBlogForm />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="services/new" element={<AdminServiceForm />} />
            <Route path="services/edit/:id" element={<AdminServiceForm />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="virtual-tours" element={<AdminVirtualTours />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;