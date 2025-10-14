import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogAPI } from '../lib/api';
import BlogPostContent from '../components/BlogPostContent';
import { Calendar, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await blogAPI.getBySlug(slug!);
      if (response.data?.data) {
        setPost(response.data.data);
      } else {
        setError('Blog post not found');
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError('Failed to load blog post');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-8">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  if (!post.is_published) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Blog
        </Link>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Featured Image */}
          {post.featured_image && (
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Meta Information */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(post.published_at || post.created_at)}</span>
              <span className="mx-2">•</span>
              <User size={16} className="mr-1" />
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <BookOpen size={16} className="mr-1" />
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Share Button */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                <Share2 size={16} className="mr-2" />
                Share
              </button>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <BlogPostContent content={post.content} />
            </div>
          </div>
        </article>

        {/* Related Posts or Navigation */}
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors duration-200"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
