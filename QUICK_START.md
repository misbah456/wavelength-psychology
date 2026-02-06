# Quick Start Guide

Your website is ready! Follow these simple steps to get it live.

## 📋 Before You Start

Make sure you have:
- [x] GitHub account (you have this: misbah456)
- [x] Cloudflare account with wavelengthpsychology.com domain
- [ ] Professional headshot photo (optional but recommended)

## 🚀 Deploy in 3 Steps

### Step 1: Push to GitHub (2 minutes)

Open Terminal and run these commands:

```bash
cd /Users/misbahalam/Downloads/wavelength_therapy
git push -u origin main
```

That's it! Your code is now on GitHub.

### Step 2: Connect Cloudflare Pages (5 minutes)

1. Go to https://dash.cloudflare.com/
2. Click "Workers & Pages" → "Create application" → "Pages" tab
3. Click "Connect to Git" → Select `wavelength-psychology` repository
4. Click "Begin setup"
5. Leave all settings as default
6. Click "Save and Deploy"

Wait ~1 minute for deployment to complete.

### Step 3: Connect Your Domain (3 minutes)

1. In your Cloudflare Pages project, click "Custom domains"
2. Click "Set up a custom domain"
3. Enter `wavelengthpsychology.com` → Click "Continue"
4. Wait 5-15 minutes for DNS propagation
5. Done! Your site is live 🎉

## ✨ Optional Improvements

### Add Your Photo
1. Save your professional headshot as `headshot.jpg`
2. Place it in `/Users/misbahalam/Downloads/wavelength_therapy/`
3. Push to GitHub:
```bash
git add headshot.jpg
git commit -m "Add professional headshot"
git push
```

### Update Contact Info
Edit `index.html` and replace:
- Email: Search for `dr.mallick@wavelengthpsychology.com` and update
- Phone: Search for `(XXX) XXX-XXXX` and update
- Location: Search for `[State/Region]` and update

Then push changes:
```bash
git add index.html
git commit -m "Update contact information"
git push
```

### Set Up Contact Form
The form currently shows messages but doesn't send emails. To fix:

**Easiest option - Formspree:**
1. Go to https://formspree.io (free plan works great)
2. Sign up and create a new form
3. Copy your form ID
4. Edit `index.html` line 217, replace the form tag with:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
```
5. Push changes to GitHub

## 📱 Test Your Site

Once live, check:
- Works on mobile (try your phone!)
- All links work
- Looks good in different browsers
- Forms show appropriate messages

## 🔄 Making Future Updates

Anytime you want to change your website:

1. Edit the files locally
2. Run these commands:
```bash
cd /Users/misbahalam/Downloads/wavelength_therapy
git add .
git commit -m "Description of your changes"
git push
```
3. Cloudflare automatically updates your live site in ~1 minute!

## 🎨 Customization Tips

- **Colors**: Edit `styles.css` (look for `:root` variables at the top)
- **Content**: Edit `index.html` (all text is easy to find and update)
- **Sections**: Add/remove sections by editing `index.html`

## ❓ Need Help?

See DEPLOYMENT.md for detailed troubleshooting.

Questions? Just ask!

---

**Your website files are in:** `/Users/misbahalam/Downloads/wavelength_therapy/`
**Your GitHub repo:** https://github.com/misbah456/wavelength-psychology
**Your domain:** wavelengthpsychology.com (once deployed!)
