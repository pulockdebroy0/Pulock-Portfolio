# Admin Panel Setup Guide

## Access Admin Panel

1. **Visit Admin Login**: Navigate to `https://pulockdebroy.com/admin/login`

2. **First Time Setup** (if no admin exists):
   - You will see a "Create your admin account" form
   - Enter your email and password (minimum 8 characters)
   - Click "Create Account"

3. **Login**: 
   - Use your admin email and password to login
   - You'll be directed to the admin dashboard

## Admin Credentials

After setup, use these credentials to access the admin panel:

**Email**: (Set during first-time setup)  
**Password**: (Set during first-time setup)

> **Note**: Store your admin credentials securely. You will need them to:
> - Manage portfolio items
> - Upload media/photos
> - Manage publications
> - Read contact messages
> - Update contact information

## Admin Features

### 1. Media Management (`/admin/media`)
- Upload and manage photos for the media gallery
- Add title, description, and mark as featured
- Delete or edit existing media
- Featured photos appear in the gallery's featured section

### 2. Portfolio Management (`/admin/portfolio`)
- Add/edit/delete portfolio projects
- Upload project images
- Set project categories and featured status

### 3. Publications (`/admin/publications`)
- Manage blog posts and publications
- Add content, images, and links
- Publish/archive publications

### 4. Messages (`/admin/messages`)
- View contact form submissions
- Mark messages as read
- Manage inquiries

### 5. Contact Info (`/admin/contact`)
- Update contact details
- Manage social media links
- Edit email and phone information

## Database Setup

The media table is automatically created. If needed, run:

```sql
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Notes

- Admin tokens are stored in secure HTTP-only cookies
- All admin operations require authentication
- Tokens expire after 7 days of inactivity
- Logout clears your session immediately

## Troubleshooting

**Forgot Password?**
- The system currently uses simple email/password authentication
- To reset, you'll need to contact the developer to reset your admin account

**Can't Login?**
- Ensure cookies are enabled in your browser
- Try clearing browser cache and logging in again
- Verify you're using the correct email address

**Media Upload Issues?**
- Ensure the image file is in a supported format (JPEG, PNG, WebP)
- Check file size is reasonable (under 10MB recommended)
- Verify your database connection is working

## Public Media Page

Your uploaded media is publicly accessible at:  
**URL**: `/media`  
**Full URL**: `https://pulockdebroy.com/media`

The media gallery shows:
- Featured images in a special featured section
- All other images in a grid gallery
- Click any image to view in full lightbox mode
