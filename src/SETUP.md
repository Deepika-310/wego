# WEgo App - Setup Guide

## Quick Start

The app is ready to use immediately with mock data! Just select a role (Recruiter or Worker) and explore all features.

## Google Maps Setup (Optional)

To enable real Google Maps functionality:

### Step 1: Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" → "Library"
4. Search for "Maps JavaScript API" and enable it
5. Go to "APIs & Services" → "Credentials"
6. Click "Create Credentials" → "API Key"
7. Copy your API key

### Step 2: Configure API Key

1. Open `/lib/googleMapsConfig.ts`
2. Replace `'YOUR_GOOGLE_MAPS_API_KEY'` with your actual API key:

```typescript
export const GOOGLE_MAPS_API_KEY = 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxx';
```

### Step 3: Secure Your API Key (Important!)

1. In Google Cloud Console, go to your API key
2. Click "Edit API key"
3. Under "Application restrictions":
   - Select "HTTP referrers"
   - Add your domain (e.g., `yourdomain.com/*`)
4. Under "API restrictions":
   - Select "Restrict key"
   - Choose "Maps JavaScript API"
5. Save changes

### Step 4: Test

1. Log in as a Worker
2. Go to "Browse Jobs"
3. Click "Map" tab
4. You should now see an interactive Google Map with job markers!

## Testing the App

### Test as Recruiter:
1. Select "Recruiter" on landing page
2. Login (any email/password works)
3. Click "+ Post" to create a job
4. View applicants who applied
5. Recruit or reject workers
6. View job status and chat with workers

### Test as Worker:
1. Select "Worker" on landing page
2. Login (any email/password works)
3. **Home**: View your stats and goals
4. **Browse Jobs**: 
   - Switch between List and Map view
   - Click bell icon for nearby jobs
5. **Apply**: Click any job and apply
6. **Works For You**: Accept/decline job offers
7. **Chat**: Message recruiters
8. **History**: View past jobs

## Features Without Setup

These features work immediately without any configuration:

✅ Landing page with role selection  
✅ Authentication (mock)  
✅ Recruiter dashboard  
✅ Worker dashboard with motivational home  
✅ Job posting and browsing  
✅ Application system  
✅ Chat functionality  
✅ QR code generation  
✅ Time tracking and payment calculation  
✅ Notifications  
✅ Search functionality  
✅ History tracking  
✅ Profile management  
✅ Settings  

## Map View Behavior

- **With API Key**: Real interactive Google Maps with markers
- **Without API Key**: Beautiful fallback static map with animated markers

Both versions are fully functional for demonstration purposes!

## Demo Users

The app uses mock authentication. Any email/password will work:

**Sample Credentials:**
- Email: `demo@wego.com`
- Password: `any password`

## Customization

### Adjusting Default Location

Edit `/lib/googleMapsConfig.ts`:

```typescript
export const DEFAULT_MAP_CENTER = {
  lat: YOUR_LATITUDE,
  lng: YOUR_LONGITUDE
};

export const DEFAULT_MAP_ZOOM = 12; // Adjust zoom level
```

### Modifying Mock Data

Edit `/lib/mockData.ts` to add more:
- Jobs
- Workers
- Applications
- Chat messages

### Styling

- Global styles: `/styles/globals.css`
- Component styles: Tailwind CSS classes in components
- Theme colors: CSS variables in `globals.css`

## Troubleshooting

### Map Not Showing
- Check if API key is correctly set in `/lib/googleMapsConfig.ts`
- Verify "Maps JavaScript API" is enabled in Google Cloud Console
- Check browser console for any errors
- Ensure API key has no restrictions preventing usage

### Notifications Not Appearing
- The notification system works automatically
- Nearby jobs are randomly determined in the demo
- Refresh the page to see different nearby jobs

### Chat Not Working
- Chat only appears for jobs with active applications
- Go to "Works For You" to see chat options
- As recruiter, view job status to chat with workers

## Need Help?

The app is a fully functional prototype with:
- Complete UI/UX flow
- All features working with mock data
- Ready for demonstration
- Easy to extend with real backend

Enjoy using WEgo - Work Earn and Go! 🚀
