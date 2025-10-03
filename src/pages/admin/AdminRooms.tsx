import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roomsAPI } from '../../lib/api';
import { Bed, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Room {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  capacity: number;
  beds: string;
  price_from: number;
  is_active: boolean;
  created_at: string;
}

const AdminRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await roomsAPI.getAll();
      setRooms(response.data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRoomStatus = async (id: string, currentStatus: boolean) => {
    try {
      await roomsAPI.update(parseInt(id), { is_active: !currentStatus });
      fetchRooms();
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };

  const deleteRoom = async (id: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return;

    try {
      await roomsAPI.delete(parseInt(id));
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
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
        <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
        <Link
          to="/admin/rooms/new"
          className="bg-amber-600 text-white px-4 py-2 rounded-md font-medium hover:bg-amber-700 transition-colors duration-200 inline-flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Room
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price From
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
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Bed className="text-amber-600 mr-3" size={20} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{room.name}</div>
                      <div className="text-sm text-gray-500">{room.short_description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{room.capacity} guests</div>
                  <div className="text-sm text-gray-500">{room.beds}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    LKR {room.price_from.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleRoomStatus(room.id, room.is_active)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      room.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {room.is_active ? (
                      <>
                        <Eye size={12} className="mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff size={12} className="mr-1" />
                        Inactive
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    to={`/admin/rooms/edit/${room.id}`}
                    className="text-amber-600 hover:text-amber-900 inline-flex items-center"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteRoom(room.id)}
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

        {rooms.length === 0 && (
          <div className="text-center py-12">
            <Bed className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No rooms</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new room.</p>
            <div className="mt-6">
              <Link
                to="/admin/rooms/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
              >
                <Plus size={16} className="mr-2" />
                Add Room
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRooms;