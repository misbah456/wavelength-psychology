# Deployment Guide: Cloudflare Pages

Follow these steps to deploy your website to wavelengthpsychology.com using Cloudflare Pages.

## Step 1: Push to GitHub

1. Open Terminal and navigate to the project directory:
```bash
cd /Users/misbahalam/Downloads/wavelength_therapy
```

2. Initialize git and push to GitHub:
```bash
# Initialize the repository
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit: Wavelength Psychology website"

# Add your GitHub repository as remote
git remote add origin https://github.com/misbah456/wavelength-psychology.git

# Push to GitHub
git branch -M main
git push -u origin main
```

If you get an error about the remote already existing, use:
```bash
git remote set-url origin https://github.com/misbah456/wavelength-psychology.git
git push -u origin main
```

## Step 2: Connect to Cloudflare Pages

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Navigate to "Workers & Pages" in the left sidebar

2. **Create a New Pages Project**
   - Click "Create application"
   - Select "Pages" tab
   - Click "Connect to Git"

3. **Connect GitHub Repository**
   - Click "Connect GitHub" (authorize if first time)
   - Select your repository: `misbah456/wavelength-psychology`
   - Click "Begin setup"

4. **Configure Build Settings**
   - **Project name**: `wavelength-psychology` (or your preference)
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: Leave empty (static site, no build needed)
   - **Build output directory**: `/` (root directory)
   - Click "Save and Deploy"

5. **Wait for Deployment**
   - Cloudflare will deploy your site (takes ~1 minute)
   - You'll get a URL like: `wavelength-psychology.pages.dev`
   - Test this URL to make sure everything looks good!

## Step 3: Connect Your Custom Domain

1. **In Cloudflare Pages Project**
   - Go to your project dashboard
   - Click "Custom domains" tab
   - Click "Set up a custom domain"

2. **Add Your Domain**
   - Enter: `wavelengthpsychology.com`
   - Click "Continue"
   - Cloudflare will automatically configure DNS (since your domain is already on Cloudflare)

3. **Add WWW Subdomain (Optional)**
   - Click "Set up a custom domain" again
   - Enter: `www.wavelengthpsychology.com`
   - This will redirect www to your main domain

4. **Wait for DNS Propagation**
   - Usually takes 5-15 minutes
   - SSL certificate is automatically provisioned
   - Once active, your site will be live at wavelengthpsychology.com!

## Step 4: Verify Everything Works

Visit your site and check:
- [ ] Site loads at wavelengthpsychology.com
- [ ] HTTPS (padlock icon) is working
- [ ] All sections display correctly
- [ ] Mobile responsive design works
- [ ] Navigation links work
- [ ] Forms show appropriate messages (even if backend isn't connected yet)

## Future Updates

To update your website:

1. **Make changes locally** to your HTML/CSS/JS files

2. **Push to GitHub**:
```bash
git add .
git commit -m "Description of changes"
git push
```

3. **Automatic Deployment**
   - Cloudflare Pages automatically rebuilds when you push to GitHub
   - Takes ~1 minute to deploy
   - No manual steps needed!

## Troubleshooting

### Site not showing after deployment?
- Check DNS settings in Cloudflare DNS dashboard
- Ensure CNAME record points to your Pages project

### Changes not showing?
- Wait 1-2 minutes for deployment
- Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check Cloudflare Pages dashboard for deployment status

### Images not loading?
- Ensure image files are committed to git
- Check file paths are correct
- Verify files were pushed to GitHub

## Optional: Set Up Form Backend

Your contact form needs a backend to actually send emails. Options:

### Option 1: Formspree (Easiest)
1. Go to https://formspree.io
2. Sign up for free
3. Create a new form
4. Update form action in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Cloudflare Workers
More advanced - I can help you set this up later if needed.

### Option 3: Third-party Contact Forms
- Tally.so
- Google Forms
- Typeform

## Need Help?

If you run into issues, let me know which step you're on and what error you're seeing!
