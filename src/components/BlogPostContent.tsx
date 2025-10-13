import React from 'react';

interface BlogPostContentProps {
  content: string;
  className?: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ 
  content, 
  className = '' 
}) => {
  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        // Custom styles for rich text content
        lineHeight: '1.7',
        color: '#374151',
      }}
    />
  );
};

export default BlogPostContent;
