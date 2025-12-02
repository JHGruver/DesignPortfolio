# Jacob Gruver - Design Portfolio

A modern, responsive portfolio website showcasing design projects and skills with a focus on compassionate design principles.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices (desktop, tablet, mobile)
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Smooth Navigation**: Fixed navigation bar with smooth scrolling to sections
- **Project Showcase**: Grid layout for displaying design projects with descriptions
- **Skills Section**: Organized display of design skills and tools
- **Contact Section**: Easy-to-find contact information and social links
- **Accessibility**: Keyboard navigation support and reduced motion preferences
- **Performance**: Optimized with lazy loading and debounced scroll events

## Structure

```
Design Portfolio/
├── index.html          # Main HTML file
├── style.css           # Stylesheet with responsive design
├── script.js           # JavaScript for interactivity
├── images/             # Image assets folder
│   └── JacobLongHair.webp
└── README.md           # This file
```

## Getting Started

### Local Development

1. **Open the website locally**:
   - Simply open `index.html` in your web browser
   - Or use a local development server:

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Python 2
   python -m SimpleHTTPServer 8000

   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

2. **View in browser**:
   - Navigate to `http://localhost:8000` (or just open the HTML file directly)

### Customization

1. **Update Personal Information**:
   - Edit [index.html](index.html) to update your name, bio, and content
   - Replace placeholder text in sections:
     - Hero section (lines 27-44)
     - About section (lines 47-58)
     - Projects section (lines 61-123)
     - Skills section (lines 126-167)
     - Contact section (lines 170-195)

2. **Add Your Projects**:
   - Add project images to the `images/` folder
   - Update the project cards in [index.html](index.html:71-121)
   - Customize project titles, descriptions, and tags

3. **Update Contact Information**:
   - Replace email address in [index.html](index.html:179)
   - Update LinkedIn URL in [index.html](index.html:183)
   - Update GitHub URL in [index.html](index.html:187)

4. **Customize Colors**:
   - Edit CSS variables in [style.css](style.css:2-12) to change the color scheme:
     - `--primary-color`: Main brand color
     - `--secondary-color`: Accent color
     - `--text-primary`: Main text color
     - `--text-secondary`: Secondary text color

5. **Add Your Photo**:
   - Replace `images/JacobLongHair.webp` with your profile photo
   - Recommended size: 400x400px or larger (square aspect ratio)
   - Supported formats: WEBP, JPG, PNG

## Deployment Options

### GitHub Pages (Free)

1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings > Pages
4. Select your main branch as the source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Free)

1. Create a Netlify account at [netlify.com](https://www.netlify.com)
2. Drag and drop your project folder to Netlify
3. Your site will be live instantly with a custom URL

### Vercel (Free)

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Import your GitHub repository or upload your project
3. Your site will deploy automatically

### Custom Domain

Once deployed, you can connect a custom domain through your hosting provider's settings.

## Security & Privacy

### Before Going Live

1. **Remove Image Metadata (EXIF Data)**
   - Photos may contain location data, camera info, and timestamps
   - Use tools to strip metadata:
     - Mac: Preview > Tools > Show Inspector > Remove location data
     - Online: [verexif.com](https://www.verexif.com)
     - App: ImageOptim (free, Mac)

2. **Protect Personal Information**
   - Don't include your full home address
   - Use a professional email (consider a dedicated portfolio email)
   - Consider using a contact form service to hide your email from bots:
     - [Formspree](https://formspree.io) (free tier available)
     - [Netlify Forms](https://www.netlify.com/products/forms/) (free with Netlify)
   - Avoid sharing phone numbers unless necessary
   - Don't include sensitive personal details in your bio

3. **Content Protection**
   - Add copyright notices to your work
   - Watermark important design images if concerned about theft
   - Consider adding a "Terms of Use" or "Copyright" section

4. **Platform-Specific Security**
   - **GitHub Pages**: Your repository is public - don't commit sensitive files
   - **Netlify/Vercel**: Enable HTTPS (usually automatic)
   - Use environment variables for any API keys (not needed for basic portfolio)

5. **Regular Maintenance**
   - Update contact info if it changes
   - Review what information is public periodically
   - Check for broken links quarterly
   - Update [.well-known/security.txt](.well-known/security.txt) expiration date yearly

### Files Added for Security

- **[robots.txt](robots.txt)**: Controls search engine crawling
- **[.well-known/security.txt](.well-known/security.txt)**: Provides security contact info (update email before deploying)
- **[.gitignore](.gitignore)**: Prevents committing sensitive files to version control

### Monitoring

Consider setting up:
- Google Search Console (monitor how your site appears in search)
- Basic analytics (Google Analytics, Plausible, or Fathom)
- Uptime monitoring (UptimeRobot - free tier available)

### What NOT to Include

- Social Security Number, ID numbers
- Full home address or precise location
- Personal phone number (unless you want recruiting calls)
- Private client work without permission
- Passwords or API keys in code
- Email addresses in plain text (use contact forms to prevent spam)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion support for users with motion sensitivity
- Focus indicators for keyboard users
- Alt text for images

## Performance Optimizations

- CSS animations with GPU acceleration
- Intersection Observer for lazy loading
- Debounced scroll events
- Optimized images with modern formats (WEBP)
- Minimal JavaScript bundle

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- Vanilla JavaScript (no frameworks required)
- Modern ES6+ features

## Future Enhancements

Consider adding:
- [ ] Contact form with email functionality
- [ ] Blog section for design articles
- [ ] Dark mode toggle
- [ ] More project detail pages
- [ ] Testimonials section
- [ ] Resume/CV download
- [ ] Animation library integration (GSAP, Framer Motion)
- [ ] Analytics tracking

## License

This project is open source and available for personal use.

## Contact

For questions or feedback about this portfolio:
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- GitHub: [Your Profile](https://github.com/yourprofile)

---

Designed with compassion by Jacob Gruver
