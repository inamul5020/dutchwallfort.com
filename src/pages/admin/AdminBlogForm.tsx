import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogAPI } from '../../lib/api';
import { ArrowLeft, Save } from 'lucide-react';
// import RichTextEditor from '../../components/RichTextEditor';

interface BlogFormData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  is_published: boolean;
}

const AdminBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<BlogFormData>({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author: 'Dutch Wall Fort',
    is_published: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await blogAPI.getById(parseInt(id!));
      if (response.data) {
        setFormData(response.data);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError('Failed to load blog post data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const dataToSave: any = {
        ...formData,
        updated_at: new Date().toISOString(),
      };

      if (formData.is_published && !isEditing) {
        dataToSave.published_at = new Date().toISOString();
      }

      if (isEditing) {
        await blogAPI.update(parseInt(id!), dataToSave);
      } else {
        await blogAPI.create(dataToSave);
      }

      navigate('/admin/blog');
    } catch (error: any) {
      console.error('Error saving blog post:', error);
      setError(error.message || 'Failed to save blog post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/blog')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Blog Post' : 'Create New Post'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter a compelling title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="post-url-slug"
            />
            <p className="mt-1 text-xs text-gray-500">URL-friendly version of the title</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              required
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL
            </label>
            <input
              type="text"
              name="featured_image"
              value={formData.featured_image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="/images/blog/post-image.jpg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            required
            rows={3}
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            placeholder="A brief summary that appears in blog listings"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={20}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="Write your blog post content here..."
          />
          <p className="mt-2 text-xs text-gray-500">
            💡 Use the toolbar above to format text, add images, create lists, insert links, and more. 
            Images will be automatically uploaded to the server.
          </p>
        </div>

        <div className="border-t pt-6">
          <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleCheckbox}
              className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 w-5 h-5"
            />
            <span>Publish this post immediately</span>
          </label>
          <p className="mt-2 text-xs text-gray-500">
            If unchecked, the post will be saved as a draft and won't be visible to the public.
          </p>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 inline-flex items-center disabled:opacity-50"
          >
            <Save size={20} className="mr-2" />
            {isLoading ? 'Saving...' : formData.is_published ? 'Publish Post' : 'Save Draft'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;
