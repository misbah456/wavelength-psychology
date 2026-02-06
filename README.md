# Wavelength Psychology

Professional therapy practice website for Dr. Zainub Mallick, PsyD.

## Website Structure

- **index.html** - Main website file
- **styles.css** - All styling and design
- **script.js** - Interactive functionality
- **headshot.jpg** - Professional photo (add your photo with this filename)

## Customization Guide

### 1. Add Your Professional Photo
- Save your headshot as `headshot.jpg` in the root directory
- Recommended: Professional photo with neutral background, 1200x1600px

### 2. Update Contact Information
Edit `index.html` and replace:
- Email: `dr.mallick@wavelengthpsychology.com`
- Phone: `(XXX) XXX-XXXX`
- Location: Add your city/state

### 3. Customize Content
Update sections in `index.html`:
- **About section**: Your bio and credentials
- **Specialties**: Adjust based on your focus areas
- **Approach**: Describe your therapeutic methods
- **FAQ**: Tailor to your practice details

### 4. Set Up Contact Form
The form currently shows success/error messages but needs a backend. Options:

**Option A: Formspree (Easiest)**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: Cloudflare Workers**
Create a worker to handle form submissions and send emails.

**Option C: Email Direct Link**
Replace form with `mailto:` link (less ideal for user experience).

### 5. Color Scheme
To change colors, edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4A90A4;  /* Main brand color */
    --primary-dark: #357a8c;   /* Darker shade */
    --accent-color: #89CFF0;   /* Accent highlights */
}
```

## Deployment to Cloudflare Pages

See DEPLOYMENT.md for step-by-step instructions.

## Local Development

To view locally, simply open `index.html` in your web browser.

For a local server:
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

© 2024 Wavelength Psychology. All rights reserved.
