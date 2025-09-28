# Travel Blog Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from travel and lifestyle platforms like Airbnb and travel blog leaders, emphasizing visual storytelling and immersive experiences that showcase destinations and travel memories.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Dark background: #222 (main background)
- Card/section background: #333 (elevated surfaces)
- Brand accent: #3867d6 (primary blue for CTAs and highlights)

**Supporting Colors:**
- Text primary: #fff (main text)
- Text secondary: #eee (descriptive text)
- Borders/dividers: #444 (subtle separation)

### B. Typography
- **Font Family**: Nunito (Google Fonts) - modern, readable sans-serif perfect for travel content
- **Hierarchy**: 
  - Headers: 4rem (bold, uppercase)
  - Subheaders: 2.5-3.5rem
  - Body text: 1.5-1.7rem
  - Captions: 1.4rem

### C. Layout System
**Spacing Units**: Consistent use of rem-based spacing with primary units of 1rem, 1.5rem, 2rem, and 3rem for padding and margins. Grid-based layouts using CSS Grid with auto-fit columns for responsive behavior.

### D. Component Library

**Navigation**
- Fixed dark header with brand logo emphasizing "Wander" in accent blue
- Horizontal navigation for desktop, collapsible hamburger menu for mobile
- Smooth scroll navigation between sections

**Hero Section**
- Prominent content area with large typography and call-to-action
- Swiper.js image slider showcasing travel destinations
- Coverflow effect for dynamic visual presentation

**Content Cards**
- Service boxes with icon headers and descriptive content
- Gallery grid with hover effects revealing titles and action icons
- Pricing cards with clear hierarchy and prominent CTAs

**Interactive Elements**
- Buttons with subtle hover transitions to brand blue
- Image overlays with smooth animations
- Social sharing icons with visual feedback

### E. Image Slider Specifications
- **Container**: Fixed height (50rem) with proper overflow handling
- **Images**: 100% width, auto height, object-fit cover for consistency
- **Positioning**: Proper z-index layering to prevent overlapping
- **Transitions**: Smooth fade/slide effects between images
- **Responsive**: Adapts to mobile screens (27rem width minimum)

## Images
The website features a large hero image slider as the primary visual element, showcasing travel destinations with a coverflow effect. Additional images include:
- Gallery section with destination photos in grid layout
- About section with team/company imagery
- User profile pictures in testimonial section
- Service icons using Font Awesome library

## Mobile Responsiveness
- Breakpoints: 991px, 768px, 450px
- Font scaling from 62.5% to 50% for smaller screens
- Navigation transforms to mobile-friendly overlay
- Grid layouts adjust column counts automatically
- Image slider maintains functionality across all screen sizes

## Accessibility & Performance
- High contrast text on dark backgrounds
- Semantic HTML structure for screen readers
- Smooth scrolling and reduced motion considerations
- Optimized image loading and CDN-based font delivery