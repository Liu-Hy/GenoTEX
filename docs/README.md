# GenoTEX Project Website

This directory contains the project website for the GenoTEX paper.

## Website URL

Once GitHub Pages is enabled, the website will be available at:
**https://liu-hy.github.io/GenoTEX/**

## Enabling GitHub Pages

To make this website live:

1. Go to your repository: https://github.com/Liu-Hy/GenoTEX
2. Click on **Settings** → **Pages** (in the left sidebar)
3. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: Select `website` and `/docs` folder
   - Click **Save**
4. Wait a few minutes for the deployment to complete

## Local Development

To view the website locally, simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
cd docs
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## Website Structure

- `index.html` - Main website page
- `css/style.css` - Styling and theme
- `js/script.js` - Interactive features
- `images/` - Logo and figures from the paper

## Features

- Responsive design for all devices
- Smooth scrolling navigation
- Interactive elements (scroll animations, copy citation, etc.)
- Green/teal color theme (genomics-themed)
- Professional layout showcasing research

## Updates

To update the website:

1. Make changes to the files in this directory
2. Commit and push to the `website` branch
3. GitHub Pages will automatically update the live site
