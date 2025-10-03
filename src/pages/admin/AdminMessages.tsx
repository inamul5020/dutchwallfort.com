import React, { useState, useEffect } from 'react';
import { messagesAPI } from '../../lib/api';
import { Mail, Phone, MessageCircle, Filter, Eye, EyeOff } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await messagesAPI.getAll();
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMessageStatus = async (id: number, newStatus: string) => {
    try {
      await messagesAPI.updateStatus(id, newStatus);
      fetchMessages();
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const filteredMessages = statusFilter === 'all'
    ? messages
    : messages.filter(message => message.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      case 'replied':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        <div className="text-sm text-gray-600">
          Total Messages: {messages.length}
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-400" />
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Messages' },
              { key: 'unread', label: 'Unread' },
              { key: 'read', label: 'Read' },
              { key: 'replied', label: 'Replied' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setStatusFilter(filter.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  statusFilter === filter.key
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Mail className="text-amber-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                  <p className="text-sm text-gray-600">
                    Received: {new Date(message.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={message.status}
                  onChange={(e) => updateMessageStatus(message.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(message.status)}`}
                >
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-900 mb-2">{message.subject}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Contact Information</p>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Mail size={14} className="text-gray-400" />
                    <a href={`mailto:${message.email}`} className="text-sm text-amber-600 hover:text-amber-800">
                      {message.email}
                    </a>
                  </div>
                  {message.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone size={14} className="text-gray-400" />
                      <a href={`tel:${message.phone}`} className="text-sm text-amber-600 hover:text-amber-800">
                        {message.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Message Preview</p>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {message.message.length > 100
                    ? `${message.message.substring(0, 100)}...`
                    : message.message
                  }
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-xs text-gray-500 mb-2">Full Message</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.message}</p>
            </div>

            <div className="flex space-x-3">
              <a
                href={`mailto:${message.email}?subject=Re: ${message.subject}&body=Dear ${message.name},%0D%0A%0D%0AThank you for your message to Dutch Wall Fort.%0D%0A%0D%0A`}
                className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors duration-200 inline-flex items-center"
              >
                <Mail size={16} className="mr-2" />
                Reply via Email
              </a>

              {message.phone && (
                <a
                  href={`https://wa.me/${message.phone.replace(/[^0-9]/g, '')}?text=Hello ${message.name}, thank you for your message to Dutch Wall Fort.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200 inline-flex items-center"
                >
                  <MessageCircle size={16} className="mr-2" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Mail className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No messages found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter === 'all'
              ? 'No contact messages have been received yet.'
              : `No ${statusFilter} messages found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
