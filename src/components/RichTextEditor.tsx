import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
  disabled?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  height = 400,
  placeholder = 'Start writing your content...',
  disabled = false
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const handleImageUpload = (blobInfo: any, success: any, failure: any) => {
    // Create FormData for image upload
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    // Upload to our backend
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/api/upload`, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        success(result.data.url);
      } else {
        failure('Image upload failed');
      }
    })
    .catch(error => {
      console.error('Image upload error:', error);
      failure('Image upload failed');
    });
  };

  return (
    <div className="rich-text-editor">
      <Editor
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        value={value}
        onEditorChange={handleEditorChange}
        disabled={disabled}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | image | link | code | table | ' +
            'charmap | insertdatetime | media | ' +
            'searchreplace | visualblocks | fullscreen | preview | ' +
            'wordcount',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
          placeholder: placeholder,
          branding: false,
          promotion: false,
          resize: true,
          statusbar: true,
          elementpath: true,
          contextmenu: 'link image table',
          file_picker_types: 'image',
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === 'image') {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.click();
              input.onchange = function() {
                const file = (this as HTMLInputElement).files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append('file', file);
                  
                  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                  fetch(`${apiUrl}/api/upload`, {
                    method: 'POST',
                    body: formData,
                  })
                  .then(response => response.json())
                  .then(result => {
                    if (result.success) {
                      callback(result.data.url, { title: file.name });
                    }
                  })
                  .catch(error => {
                    console.error('Image upload error:', error);
                  });
                }
              };
            }
          },
          images_upload_handler: handleImageUpload,
          automatic_uploads: true,
          paste_data_images: true,
          convert_urls: false,
          relative_urls: false,
          remove_script_host: false,
          document_base_url: window.location.origin,
          setup: (editor) => {
            editor.on('init', () => {
              editor.getContainer().style.border = '1px solid #d1d5db';
              editor.getContainer().style.borderRadius = '0.375rem';
            });
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;
