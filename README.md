# Network Flow Snapshot - Supply Chain Lane Dashboard

A modern, interactive dashboard for visualizing and analyzing supply chain shipping lanes with real-time filtering, detailed metrics, and 7-day trend analysis.

Features

### Core Functionality
- **Smart Filtering**: Filter lanes by origin, destination, and transportation mode
- **Real-time Search**: Instant search across all lane data
- **Detailed Metrics**: View cost per ton, volume, lead time, and reliability scores
- **7-Day Trends**: Drill down into individual lanes to see performance trends
- **Responsive Design**: Optimized for desktop and tablet devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing

### Design Highlights
- Smooth transitions (≤200ms) for all interactions
- Full keyboard accessibility (Tab, Enter, Escape navigation)
- Modern UI with glassmorphism effects
- Custom SVG sparkline visualizations
- Micro-interactions and hover effects
- Gradient backgrounds in light mode
- Slide-in filter panel with smooth animations

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

## nstallation

### 1. Clone the Repository

```bash
git clone https://github.com/Maaziqbalbutt/dashboard.git
cd dashboard
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- React 18
- Vite
- Tailwind CSS
- Lucide React (for icons)
- Other required dependencies

### 3. Configure Tailwind CSS

The project should already have these files, but verify they exist:

**`tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**`postcss.config.js`:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**`src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Preview Production Build Locally

```bash
npm run preview
```

## Deployment

### Option 1: Vercel (Recommended)

**Quick Deploy:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Vite settings
4. Click "Deploy"

### Option 2: Netlify

**Using Netlify CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

**Or use Netlify Drop:**
1. Build: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder

### Option 3: GitHub Pages

**Setup:**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/dashboard",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dashboard/'
})
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Render

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create New → Static Site
4. Connect GitHub repository
5. Build Command: `npm run build`
6. Publish Directory: `dist`
7. Click "Create Static Site"

## Project Structure

```
supply-chain-dashboard/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main dashboard component
│   ├── App.css         # App-specific styles (minimal)
│   ├── index.css       # Global styles + Tailwind directives
│   └── main.jsx        # React entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── README.md           # This file
```

## Usage

### Filtering Lanes

1. **Search**: Type in the search box to filter by origin, destination, or lane ID
2. **Filter Panel**: Click the filter icon (top-right) to access advanced filters
3. **Origin/Destination**: Select specific locations from dropdowns
4. **Mode**: Filter by transportation mode (Truck/Rail)
5. **Clear Filters**: Reset all filters with one click

### Viewing Lane Details

1. Click any lane card to open detailed view
2. View comprehensive metrics:
   - Cost per Ton
   - Volume (in tons)
   - Lead Time (in days)
   - Reliability (percentage)
3. Analyze 7-day trends with sparkline visualizations
4. Close with X button or press `Escape`

### Keyboard Navigation

- `Tab`: Navigate through interactive elements
- `Enter`: Open lane details
- `Escape`: Close modals and panels
- Full ARIA support for screen readers

## Design Decisions

### UI & Interaction Choices

- **Card-based Layout**: Provides clear visual hierarchy and easy scanning
- **Slide-in Filter Panel**: Keeps main view uncluttered while providing powerful filtering
- **Modal Detail View**: Focuses attention on selected lane without navigation
- **Color Coding**: Trucks (blue) vs Rail (purple) for quick identification
- **Hover Effects**: Scale transforms provide tactile feedback

### Visualization Choices

- **Sparklines**: Compact 7-day trend visualization without overwhelming detail
- **Metric Cards**: Large, bold numbers for quick comprehension
- **Gradient Backgrounds**: Modern aesthetic in light mode
- **Dark Mode**: Reduces eye strain for extended use

### Technical Decisions

- **React Hooks**: Modern state management with useState and useMemo
- **Tailwind CSS**: Rapid development with utility-first approach
- **Lucide Icons**: Lightweight, consistent icon system
- **Vite**: Fast development and optimized production builds
- **In-memory Data**: No backend required for demo/prototype

## 🔧 Customization

### Adding New Lanes

Edit the `LANES_DATA` array in `src/App.jsx`:

```javascript
const LANES_DATA = [
  {
    "id": "YOUR-ID",
    "origin": "City, State",
    "destination": "City, State",
    "cost_per_ton": 100,
    "volume_tons": 2000,
    "lead_days": 3.5,
    "reliability": 0.90,
    "mode": "Truck"
  },
  // ... more lanes
];
```

### Adding Time Series Data

Add to `SERIES_DATA` object in `src/App.jsx`:

```javascript
const SERIES_DATA = {
  "YOUR-ID": [
    {
      "date": "2025-10-07",
      "shipments": 25,
      "avg_cost_per_ton": 100,
      "avg_lead_days": 3.5,
      "on_time_rate": 0.90
    },
    // ... 7 days of data
  ]
};
```

### Changing Colors

Modify Tailwind classes in `src/App.jsx` or extend the theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

## Troubleshooting

### Styles Not Appearing

1. Verify Tailwind is installed:
```bash
npm install -D tailwindcss@3.4.1 postcss autoprefixer
```

2. Check `src/index.css` has Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Restart dev server:
```bash
npm run dev
```

### Build Errors

Clear cache and rebuild:
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Port Already in Use

Change port in `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

## 📊 Data Structure

### Lane Object
```typescript
{
  id: string;              // Unique identifier (e.g., "AUR-BLK")
  origin: string;          // Origin city and state
  destination: string;     // Destination city and state
  cost_per_ton: number;    // Cost in dollars per ton
  volume_tons: number;     // Total volume in tons
  lead_days: number;       // Average lead time in days
  reliability: number;     // Reliability score (0-1)
  mode: string;            // Transportation mode ("Truck" or "Rail")
}
```

### Time Series Object
```typescript
{
  date: string;            // ISO date string
  shipments: number;       // Number of shipments
  avg_cost_per_ton: number;// Average cost per ton
  avg_lead_days: number;   // Average lead time
  on_time_rate: number;    // On-time delivery rate (0-1)
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Maaz Iqbal Butt**
- GitHub: [@Maaziqbalbutt](https://github.com/Maaziqbalbutt)

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by [Vite](https://vitejs.dev/)
