# 🧪 Testing Guide - WEgo App

## Quick Test Scenarios

### 🎯 Test 1: Worker - Chat from Works For You
**Steps**:
1. Click "Continue as Worker" on landing page
2. Login with any credentials
3. Click hamburger menu → "Works For You"
4. **Test Recruited Section**:
   - See 3 jobs in "Waiting for Your Response"
   - Click 💬 (chat) button on any job
   - ✅ Chat dialog should open
   - Type a message and send
   - ✅ Message should appear in chat
5. **Test Accepted Section**:
   - Click "Accept" on a recruited job
   - Job moves to "Accepted Jobs" section
   - Click 💬 (chat) button
   - ✅ Chat dialog should open
6. **Test Applied Section**:
   - See existing applied jobs
   - Click "Chat with Recruiter" button
   - ✅ Chat dialog should open

**Expected Result**: ✅ Chat works from all three sections

---

### 🗺️ Test 2: GPS-Enabled Google Maps
**Steps**:
1. Login as Worker
2. Click "Browse Jobs" in menu
3. Click "Map" tab
4. Browser asks for location permission
5. **Allow Location**:
   - Map centers on your actual GPS coordinates
   - Blue dot shows your location
   - Job markers appear on map
   - Click any job marker → Info window opens
6. **Deny Location** (test fallback):
   - Map centers on default location (Mumbai)
   - Still shows job markers
   - Still functional

**Expected Result**: ✅ Real GPS location or fallback working

**To Test Static Fallback**:
- Open `/lib/googleMapsConfig.ts`
- API key is 'YOUR_GOOGLE_MAPS_API_KEY'
- Map shows beautiful static view with mock pins
- All interactive elements work

---

### 🔔 Test 3: Notification with Dummy Data
**Steps**:
1. Login as Worker
2. Look at top-right corner
3. See bell icon with red badge showing "3"
4. Click bell icon
5. **Check Notification Panel**:
   - Shows "Nearby Jobs" header
   - Shows "3 jobs available near you"
   - First job: "📍 0.8 km away" + "5 min ago"
   - Second job: "📍 1.5 km away" + "15 min ago"
   - Third job: "📍 2.3 km away" + "1 hour ago"
6. Click any job → Job details open
7. Click X on notification → Notification removed
8. Click X on panel → Panel closes

**Expected Result**: ✅ 3 notifications always shown with distance and time

---

### 💼 Test 4: Complete Worker Flow
**Full Journey**:
1. **Landing** → Click "Continue as Worker"
2. **Auth** → Login
3. **Home** → See motivational dashboard
   - Weekly hours: 27/40
   - Earnings: ₹4,855
   - Achievements shown
4. **Browse Jobs** → List view
   - See 4 jobs
   - Check prices in ₹
5. **Browse Jobs** → Map view
   - Allow GPS
   - See your location
   - See job markers
6. **Notifications** → Check bell icon
   - Badge shows "3"
   - Open panel
   - See distances
7. **Apply for Job** → Click any job
   - See details
   - Click "Apply Now"
   - See success toast
8. **Works For You** → Menu → Works For You
   - See recruited jobs
   - Click Chat → Test messaging
   - Accept a job
   - Click QR Code → See QR
   - Click Chat again → Still works

**Expected Result**: ✅ Complete flow works smoothly

---

### 👔 Test 5: Complete Recruiter Flow
**Full Journey**:
1. **Landing** → Click "Continue as Recruiter"
2. **Auth** → Login
3. **Home** → See motivational dashboard
   - Active Jobs: 8
   - Applicants: 47
   - Budget tracker
   - Recent activity
4. **View Posts** → Click "View All Posts" card
   - See job listings
   - Each shows applicant count
5. **View Applicants** → Click "View Applicants" on any job
   - See worker list
   - See ratings
   - Click "Recruit" on a worker
6. **Job Status** → Click "View Status"
   - See accepted workers
   - See pending responses
   - Click Chat on any worker → Test messaging
7. **Post New Job** → Click "+ Post" button
   - Fill in job details
   - Enter rate in ₹
   - Submit
   - See new job in list

**Expected Result**: ✅ Complete recruiter flow works

---

## 🐛 Known Behavior (Not Bugs)

### GPS Maps:
- **First Load**: Browser asks for location permission
- **Permission Denied**: Falls back to Mumbai coordinates
- **No API Key**: Shows beautiful static map (still interactive)
- **Loading**: Shows "Getting your location..." briefly

### Notifications:
- **Always 3 jobs**: By design (dummy data)
- **Fixed distances**: 0.8km, 1.5km, 2.3km (dummy data)
- **Fixed times**: 5 min, 15 min, 1 hour (dummy data)

### Chat:
- **Message History**: Mock data shown initially
- **Messages**: Stored locally (not persistent without Supabase)
- **Auto-reply**: No recruiter auto-reply (future feature)

### Works For You:
- **Dummy Jobs**: 8+ jobs total (recruited + accepted + applied)
- **QR Codes**: Only for accepted jobs
- **Chat**: Available for all job types

---

## 📱 Mobile Testing

### Responsive Breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Test on Mobile:
1. Open app on mobile device or resize browser
2. Hamburger menu should appear
3. Cards should stack vertically
4. Map should be touch-friendly
5. Chat should be full-width
6. Notifications panel should fit screen

---

## ⚡ Quick Debug Checks

### Chat Not Opening?
- Check browser console for errors
- Verify ChatDialog component is imported
- Check that participant data includes recruiterName

### Map Not Showing?
- Check if location permission was granted
- Look for "Getting your location..." message
- Check browser console for Google Maps errors
- Verify GoogleMapView is imported

### No Notifications?
- Should always show 3 notifications
- Check bell icon for badge
- Verify NotificationBar component is rendered
- Check that jobs array has data

### Currency Wrong?
- All values should show ₹ symbol
- Check mockData.ts for rates (150, 180, 200, 160)
- Verify no $ symbols remain

---

## 🔍 Files to Check

### If Chat Issues:
- `/components/ChatDialog.tsx`
- `/components/MyWorksDialog.tsx`
- `/components/JobStatusDialog.tsx`

### If Map Issues:
- `/components/GoogleMapView.tsx`
- `/lib/googleMapsConfig.ts`
- `/components/WorkerDashboard.tsx`

### If Notification Issues:
- `/components/NotificationBar.tsx`
- `/components/WorkerDashboard.tsx`

### If Currency Issues:
- `/lib/mockData.ts`
- All component files (search for "$")

---

## ✅ Success Criteria

### Working Features:
- [x] Landing page loads
- [x] Can select role (Worker/Recruiter)
- [x] Can login
- [x] Dashboard shows for selected role
- [x] Jobs display in list view
- [x] Jobs display on map with GPS
- [x] Notifications show 3 jobs
- [x] Can apply for jobs
- [x] Works For You shows multiple sections
- [x] Chat works from all sections
- [x] QR codes generate for accepted jobs
- [x] Can scan QR codes
- [x] Recruiters can post jobs
- [x] Recruiters can view applicants
- [x] Recruiters can recruit workers
- [x] All currency in ₹

### App Health:
- No console errors
- No broken images
- No missing components
- Smooth navigation
- Responsive design working

---

## 🎉 Testing Complete Checklist

Use this checklist for full app testing:

**Worker Side:**
- [ ] Landing page → Select Worker
- [ ] Login successful
- [ ] Home dashboard loads
- [ ] Browse Jobs → List view works
- [ ] Browse Jobs → Map view works
- [ ] GPS location requested
- [ ] Notifications show 3 jobs
- [ ] Can click notifications
- [ ] Can apply for jobs
- [ ] Works For You loads
- [ ] Chat works from Recruited
- [ ] Chat works from Accepted
- [ ] Chat works from Applied
- [ ] QR code generates
- [ ] Can send messages
- [ ] History shows past jobs

**Recruiter Side:**
- [ ] Landing page → Select Recruiter
- [ ] Login successful
- [ ] Home dashboard loads
- [ ] View Posts works
- [ ] Can post new job
- [ ] View Applicants works
- [ ] Can recruit workers
- [ ] Job Status shows data
- [ ] Chat works from Status
- [ ] Budget tracker shows
- [ ] Recent activity displays
- [ ] All currency in ₹

**Cross-Cutting:**
- [ ] No $ symbols anywhere
- [ ] All ₹ symbols present
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Images load properly
- [ ] Animations smooth
- [ ] Toasts appear correctly

---

**Status**: Ready for Testing! 🚀
