# cPanel Deployment Guide

This guide will help you deploy your Next.js application to cPanel step by step.

## Prerequisites

- cPanel access with Node.js Selector enabled
- MongoDB connection string
- All project files uploaded to cPanel

## Step-by-Step Deployment

### Step 1: Upload Files to cPanel

1. Upload all project files to your cPanel directory (usually `public_html` or a subdirectory)
2. **IMPORTANT:** Make sure to upload:
   - All source files (`app/`, `components/`, `lib/`, etc.)
   - `package.json`
   - `app.js`
   - `.env` file (or create it in cPanel)
   - `next.config.mjs` (if exists)
   - `middleware.js`
   - All other configuration files

### Step 2: Set Up Environment Variables

1. In cPanel, go to **Node.js Selector**
2. Click on your application
3. Add these environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=3000
   ```
   (Note: PORT is usually set automatically by cPanel)

### Step 3: Install Dependencies

1. Open **Terminal** in cPanel (or use SSH)
2. Navigate to your project directory:
   ```bash
   cd ~/public_html/propertyshebabd
   ```
   (Replace with your actual directory path)

3. **Delete existing node_modules if it exists** (to avoid symlink issues):
   ```bash
   rm -rf node_modules package-lock.json
   ```

4. Install dependencies:
   ```bash
   npm install
   ```
   
   Wait for installation to complete. This may take 5-10 minutes.

### Step 4: Build the Application

After dependencies are installed, build the Next.js app:

```bash
npm run build
```

This will create the `.next` directory with the production build. Wait for it to complete (may take 2-5 minutes).

### Step 5: Start the Application

In cPanel Node.js Selector:

1. Go to **Node.js Selector**
2. Find your application
3. Click **Start App** or **Restart App**

The app should now start successfully!

## Troubleshooting Common Errors

### Error: "Cannot find module 'next'"

**Solution:**
```bash
# Navigate to project directory
cd ~/public_html/propertyshebabd

# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Error: "Could not find a production build in the '.next' directory"

**Solution:**
```bash
# Navigate to project directory
cd ~/public_html/propertyshebabd

# Build the application
npm run build

# Then restart the app in Node.js Selector
```

### Error: "Symlink node_modules is invalid"

**Solution:**
This happens when `node_modules` is symlinked outside the project directory. Fix it:

```bash
# Navigate to project directory
cd ~/public_html/propertyshebabd

# Remove symlinked node_modules
rm -rf node_modules

# Reinstall dependencies (this creates real node_modules, not symlink)
npm install --no-bin-links

# Or if that doesn't work:
npm install --legacy-peer-deps
```

### Error: "Port already in use"

**Solution:**
1. In Node.js Selector, stop all running Node.js apps
2. Check if another app is using the same port
3. Restart your app

### Application Not Starting

**Check logs:**
1. In Node.js Selector, click on your app
2. Check **stderr.log** and **stdout.log** files
3. Look for error messages and follow the solutions above

## Complete Deployment Checklist

- [ ] All files uploaded to cPanel
- [ ] `.env` file created with `MONGODB_URI` and `NODE_ENV=production`
- [ ] Node.js version selected (18.x or 20.x recommended)
- [ ] Dependencies installed (`npm install`)
- [ ] Application built (`npm run build`)
- [ ] App started in Node.js Selector
- [ ] No errors in stderr.log
- [ ] Application accessible via URL

## Post-Deployment

1. **Test your application:**
   - Visit your domain
   - Test admin login
   - Test API endpoints
   - Test database connections

2. **Monitor logs:**
   - Regularly check `stderr.log` and `stdout.log`
   - Fix any runtime errors

3. **Update application:**
   - When updating code, repeat Steps 3-5 (install, build, restart)

## Quick Commands Reference

```bash
# Navigate to project
cd ~/public_html/propertyshebabd

# Clean install
rm -rf node_modules package-lock.json
npm install

# Build
npm run build

# Check if .next directory exists
ls -la .next

# Check Node.js version
node -v

# Check npm version
npm -v
```

## Important Notes

1. **Never commit `node_modules`** - It's in `.gitignore` for a reason
2. **Always build before starting** - Production mode requires `.next` directory
3. **Use production mode** - Set `NODE_ENV=production` in environment variables
4. **Check file permissions** - Make sure Node.js can read all files
5. **Database connection** - Ensure MongoDB URI is correct and accessible from cPanel server

## Need Help?

If you encounter issues not covered here:
1. Check the error messages in `stderr.log`
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection string is valid
4. Make sure Node.js version is compatible (18.x or 20.x)

