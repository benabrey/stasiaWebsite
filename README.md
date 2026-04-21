# Aesthetics By Stasia - Photography Business Website

A professional, responsive website for a photography business built with HTML, CSS, and JavaScript.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Home Page**: Welcome section with hero image, services overview, and about information
- **Gallery Page**: Filterable gallery with categories (Portraits, Events, Products)
- **Contact Page**: Contact form with validation and contact information
- **Smooth Navigation**: Sticky navigation bar with smooth scrolling
- **Modern UI**: Clean, professional design with smooth animations and transitions

## 📁 Project Structure

```
AestheticsByStasia/
├── index.html              # Home page
├── gallery.html            # Gallery page with filter functionality
├── contact.html            # Contact page with form
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── script.js       # JavaScript functionality
│   └── images/             # Placeholder for image assets
└── README.md               # This file
```

## 🎨 Pages

### Home (index.html)
- Hero section with call-to-action button
- Services showcase (3 service cards)
- About section
- Navigation and footer

### Gallery (gallery.html)
- Gallery grid with 6 items
- Filter buttons (All, Portraits, Events, Products)
- Hover effects on gallery items
- Smooth filtering animation

### Contact (contact.html)
- Contact information section
- Contact form with validation
- Social media links
- Form submission handling with feedback

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript**: Interactive features (gallery filtering, form validation)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required

### Running the Project

1. **Option 1: Open directly**
   - Double-click `index.html` to open in your default browser
   - Or right-click and select "Open with" to choose a browser

2. **Option 2: Use a local server** (recommended for best results)
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Python 2
   python -m SimpleHTTPServer 8000

   # Using Node.js (if installed)
   npx http-server
   ```
   Then visit `http://localhost:8000` in your browser

3. **Option 3: Use VS Code Live Server**
   - Install the Live Server extension
   - Right-click on `index.html` and select "Open with Live Server"

## 📝 Customization

### Update Business Information
- Edit contact details in `contact.html`
- Update social media links in all pages
- Modify service descriptions in `index.html`

### Add Gallery Images
- Replace placeholder images in `assets/images/` directory
- Update image filenames in `gallery.html` if needed
- Ensure images are optimized for web

### Customize Colors
- Edit CSS variables in `assets/css/styles.css`:
  ```css
  :root {
      --primary-color: #2c3e50;
      --secondary-color: #e74c3c;
      --accent-color: #ecf0f1;
  }
  ```

### Update Company Name
- Search and replace "Aesthetics By Stasia" throughout the project
- Update the `<title>` tags in each HTML file
- Update the logo text in the navigation

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and up
- **Tablet**: 769px - 1199px
- **Mobile**: 480px - 768px
- **Small Mobile**: Below 480px

## ✨ Features Details

### Gallery Filtering
- Click filter buttons to view specific categories
- Smooth transitions between filtered views
- All button shows all gallery items

### Contact Form Validation
- Required field validation
- Email format validation
- Success/error message display
- Form resets after successful submission

### Navigation
- Sticky header stays visible while scrolling
- Active page indicator in navigation
- Smooth scrolling to sections
- Mobile-friendly menu

## 🔧 Troubleshooting

### Images not showing
- Ensure placeholder images are in `assets/images/` directory
- Check image filenames match exactly
- Use relative paths as shown in HTML files

### Form not working
- Check browser console for JavaScript errors
- Ensure form IDs match JavaScript selectors
- Verify JavaScript file is loaded

### Styling issues
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure CSS file is linked correctly
- Check for CSS syntax errors in console

## 📄 License

This project is available for personal and commercial use.

## 📧 Contact

For questions or support regarding this website template, please reach out.

---

**Last Updated**: April 2025
**Version**: 1.0.0
