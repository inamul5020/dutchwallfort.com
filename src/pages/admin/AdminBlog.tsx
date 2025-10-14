import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../../lib/api';
import { FileText, Plus, Edit, Trash2, Eye, EyeOff, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await blogAPI.getAll();
      setPosts(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePostStatus = async (id: string, currentStatus: boolean) => {
    try {
      const updateData: any = {
        is_published: !currentStatus,
        updated_at: new Date().toISOString()
      };

      if (!currentStatus) {
        updateData.published_at = new Date().toISOString();
      }

      await blogAPI.update(parseInt(id), updateData);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await blogAPI.delete(parseInt(id));
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.is_published;
    if (filter === 'draft') return !post.is_published;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        <Link
          to="/admin/blog/new"
          className="bg-amber-600 text-white px-4 py-2 rounded-md font-medium hover:bg-amber-700 transition-colors duration-200 inline-flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Create New Post
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex space-x-4">
          {[
            { key: 'all', label: 'All Posts' },
            { key: 'published', label: 'Published' },
            { key: 'draft', label: 'Drafts' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                filter === tab.key
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="text-amber-600 mr-3" size={20} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{post.excerpt}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{post.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {post.published_at ? (
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {new Date(post.published_at).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-gray-400">Not published</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => togglePostStatus(post.id, post.is_published)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.is_published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.is_published ? (
                      <>
                        <Eye size={12} className="mr-1" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff size={12} className="mr-1" />
                        Draft
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    to={`/admin/blog/edit/${post.id}`}
                    className="text-amber-600 hover:text-amber-900 inline-flex items-center"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-600 hover:text-red-900 inline-flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blog posts</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? 'Get started by creating your first blog post.' 
                : `No ${filter} posts found.`
              }
            </p>
            <div className="mt-6">
              <Link
                to="/admin/blog/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
              >
                <Plus size={16} className="mr-2" />
                Create Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;