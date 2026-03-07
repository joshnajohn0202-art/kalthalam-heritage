# 🏨 Kalthalam Heritage Resort - User Module Documentation

## 📁 Module Structure

```
frontend/src/pages/user/
├── UserLayout.jsx                 (Main layout container)
├── UserLayout.css                 (Layout styling)
├── UserProfile.jsx                (User profile management)
├── UserProfile.css                (Profile styling)
├── UserDashboard.jsx              (Dashboard overview)
├── UserDashboard.css              (Dashboard styling)
├── Complaints.jsx                 (Complaints & issues)
├── Complaints.css                 (Complaints styling)
├── BookingRequest.jsx             (Booking management)
├── CheckAvailability.jsx          (Availability checker)
├── MyBookings.jsx                 (View bookings)
├── CottageDetails.jsx             (Cottage information)
├── Feedback.jsx                   (User feedback)
├── Payment.jsx                    (Payment processing)
├── ViewCottages.jsx               (Browse cottages)
├── PackagesAddons.jsx             (Packages & add-ons)
└── components/                    (Reusable components)
```

## 🎨 Design Features

### Color Scheme
- **Primary**: `#667eea` (Purple)
- **Secondary**: `#764ba2` (Dark Purple)
- **Accent**: `#2f855a` (Green)
- **Success**: `#15803d` (Dark Green)
- **Warning**: `#d97706` (Orange)
- **Danger**: `#c53030` (Red)
- **Background**: `#f8f9fa` (Light Gray)
- **Text Primary**: `#1e293b` (Dark)
- **Text Secondary**: `#64748b` (Gray)

### Layout Structure
- **Sidebar Navigation** (280px fixed width)
  - Resort logo and branding
  - Main navigation links with icons
  - Logout button at bottom
  - Responsive hamburger menu on mobile

- **Main Content Area**
  - Header with greeting and resort info
  - Full-height scrollable content area
  - Consistent padding and spacing

### Typography
- **Headings**: Segoe UI, Bold, Various sizes
- **Body**: Segoe UI, Regular, 14px-16px
- **Monospace**: For code/data

## 📱 Components Overview

### 1. UserLayout (Main Container)
```jsx
- Provides sidebar navigation
- Routes to all user pages
- Persistent header
- Responsive design
- Logout functionality
```

### 2. UserDashboard
```jsx
Features:
- Welcome banner with gradient
- Statistics cards (bookings, loyalty, status)
- Quick action buttons
- Recent bookings grid
- Featured offers section
- Fully responsive
```

### 3. UserProfile
```jsx
Features:
- Profile card with avatar
- Personal information display
- Family information (father/mother names)
- Emergency contact details
- Edit mode for profile updates
- Profile picture upload
- Booking history
- Statistics section
```

### 4. Complaints
```jsx
Features:
- Submit new complaints
- View complaint history
- Status badges (Pending, Resolved, etc.)
- Delete complaints
- Date tracking
- Status-based color coding
```

## 🎯 Key Features

### Responsive Design
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)
- ✅ Extra small (< 480px)

### Sidebar Navigation
- Fixed position
- Gradient background (purple to dark purple)
- Icon + label navigation items
- Active state highlighting
- Smooth transitions
- Mobile-responsive hamburger menu

### Cards & Buttons
- Hover animations
- Smooth transitions
- Gradient backgrounds
- Border highlights
- Box shadows for depth

### Forms
- Input validation
- Focus states
- Error handling
- Textarea with resizable option
- Dropdown selects

### Status Badges
- Pending (Orange)
- Resolved (Green)
- In Progress (Yellow)
- Closed (Blue)
- Customizable colors

## 🚀 Usage Example

```jsx
import UserLayout from './pages/user/UserLayout';
import UserProfile from './pages/user/UserProfile';
import UserDashboard from './pages/user/UserDashboard';
import Complaints from './pages/user/Complaints';

// In your router configuration
<Route path="/user" element={<UserLayout />}>
  <Route path="dashboard" element={<UserDashboard />} />
  <Route path="profile" element={<UserProfile />} />
  <Route path="complaints" element={<Complaints />} />
  <Route path="cottages" element={<ViewCottages />} />
  {/* ... other routes */}
</Route>
```

## 🎨 Customization

### Change Colors
Edit `:root` variables in `UserLayout.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #2f855a;
  /* ... more colors */
}
```

### Modify Sidebar Width
```css
.user-sidebar {
  width: 280px; /* Change this value */
}

.user-main-content {
  margin-left: 280px; /* Must match sidebar width */
}
```

### Update Typography
```css
body {
  font-family: 'Your Font', sans-serif;
  font-size: 16px;
}
```

## 📊 State Management

### UserProfile States
```jsx
- user: Complete user object
- editMode: Boolean for edit toggling
- formData: Temporary form data
- bookingHistory: Array of bookings
- showBookingHistory: Toggle visibility
- previewImage: Image preview URL
```

### Complaints States
```jsx
- complaintText: Current textarea input
- manualComplaints: Array of complaints
- showBookingHistory: Toggle list visibility
```

### UserDashboard States
```jsx
- userStats: Statistics object
- recentBookings: Bookings array
- quickActions: Actions array
```

## 🔐 Authentication

The module includes logout functionality:
```jsx
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/"); // Redirect to login
};
```

## 🎬 Animations

- **Hover Effects**: Smooth transitions (0.3s)
- **Card Lift**: `translateY(-5px)` on hover
- **Button Feedback**: Scale and shadow changes
- **Slide Animations**: For complaint cards

## 📈 Performance Optimizations

1. CSS classes instead of inline styles
2. Efficient event handlers
3. Memoization ready (can add React.memo)
4. Optimized re-renders
5. Lazy loading support

## 🐛 Common Issues & Solutions

### Issue: Sidebar not appearing
**Solution**: Ensure `UserLayout.css` is imported correctly
```jsx
import './UserLayout.css';
```

### Issue: Responsive design not working
**Solution**: Check viewport meta tag in HTML head
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Issue: Images not displaying
**Solution**: Check file paths and ensure images are in public folder

### Issue: Navigation links not working
**Solution**: Verify React Router setup and route configuration

## 📝 Best Practices

1. **Keep components focused** - Each component does one thing
2. **Use consistent spacing** - Follow the grid (20px, 30px, 40px)
3. **Maintain color consistency** - Use CSS variables
4. **Test responsiveness** - Check all breakpoints
5. **Optimize images** - Compress before using
6. **Use semantic HTML** - For accessibility

## 🔄 Integration Steps

1. **Copy all files** to `src/pages/user/`
2. **Import CSS** in each component
3. **Setup routing** in your main router file
4. **Configure API endpoints** for data fetching
5. **Test on all devices** and browsers

## 📞 Support

For issues or questions about the module:
1. Check the documentation above
2. Review the component code comments
3. Test with browser DevTools
4. Check console for errors

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Created for**: Kalthalam Heritage Resort
