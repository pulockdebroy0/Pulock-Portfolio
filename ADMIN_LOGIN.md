# Admin Panel Login

## Credentials

**Email:** `pulockkumardeb02@gmail.com`  
**Password:** `Pulock2000@`

## Access Admin Panel

1. Go to: `https://pulockdebroy.com/admin/login`
2. Enter the email and password above
3. Click **Login**

## Initialize Admin Account (First Time Only)

If the admin account doesn't exist yet, run the initialization:

```bash
curl -X POST https://pulockdebroy.com/api/admin-init \
  -H "Content-Type: application/json" \
  -d '{"secret": "YOUR_ADMIN_SECRET"}'
```

Replace `YOUR_ADMIN_SECRET` with the value of the `ADMIN_SECRET` environment variable.

## Admin Features

- **Dashboard:** View system overview
- **Media:** Upload and manage photos
- **Portfolio:** Manage portfolio items
- **Publications:** Manage publications
- **Messages:** View contact form submissions
- **Contact Info:** Update contact information
- **Logout:** Safely logout from the admin panel

## Security Notes

- The login page no longer allows account creation
- Only the pre-configured admin account can access the panel
- Sessions are protected with HTTP-only cookies
- Passwords are hashed with bcrypt
