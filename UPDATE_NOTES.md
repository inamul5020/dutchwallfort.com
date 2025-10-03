# Migration from Supabase to Express API

## Important Notice

The project has been migrated from Supabase to a custom Express.js API with PostgreSQL.

## What Changed

1. **Backend**: Supabase → Express.js REST API
2. **Authentication**: Supabase Auth → JWT with bcrypt
3. **Database**: Still PostgreSQL 16, but managed directly
4. **API Client**: Supabase client → Axios

## Files That Need Manual Updates

The following admin page files still reference Supabase and need to be updated to use the new API:

- src/pages/admin/AdminRooms.tsx
- src/pages/admin/AdminRoomForm.tsx
- src/pages/admin/AdminServices.tsx
- src/pages/admin/AdminServiceForm.tsx
- src/pages/admin/AdminBlog.tsx
- src/pages/admin/AdminBlogForm.tsx
- src/pages/admin/AdminBookings.tsx
- src/pages/admin/AdminDashboard.tsx
- src/components/BookingForm.tsx

## How to Update Admin Pages

Replace Supabase calls with API calls:

### Before (Supabase):
```typescript
import { supabase } from '../../lib/supabase';

const { data, error } = await supabase
  .from('rooms')
  .select('*');
```

### After (Express API):
```typescript
import { roomsAPI } from '../../lib/api';

try {
  const response = await roomsAPI.getAll();
  const rooms = response.data.rooms;
} catch (error) {
  console.error('Error fetching rooms:', error);
}
```

## API Reference

See `src/lib/api.ts` for all available API functions:

- authAPI: login, register, getProfile
- roomsAPI: getAll, getById, create, update, delete
- servicesAPI: getAll, getById, create, update, delete
- bookingsAPI: getAll, getById, create, updateStatus, delete
- blogAPI: getAll, getById, create, update, delete

## Database Access

Default admin credentials:
- Email: admin@dutchwallfort.com
- Password: admin123

## Next Steps

1. Update all admin pages to use the new API (listed above)
2. Test all CRUD operations
3. Update any custom Supabase queries to SQL/API calls
4. Remove any remaining Supabase references

