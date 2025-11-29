# Farm To Table

A Farm-to-Table marketplace connecting consumers with local farmers selling fresh produce.

## Features

- **Browse Local Farms** - Discover family-owned farms in your area with detailed profiles
- **Shop Fresh Products** - Browse organic vegetables, fruits, dairy, meats, and artisan goods
- **Smart Filtering** - Filter by category, organic certification, and search by name
- **Shopping Cart** - Add products, adjust quantities, and checkout
- **Responsive Design** - Beautiful experience on desktop and mobile
- **Smooth Animations** - Delightful micro-interactions powered by Framer Motion

## Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **CSS Variables** - Theming and consistency

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── FarmCard.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Farms.jsx
│   ├── FarmDetail.jsx
│   ├── Products.jsx
│   └── Cart.jsx
├── context/         # React context providers
│   └── CartContext.jsx
├── data/            # Mock data
│   ├── farms.js
│   └── products.js
├── styles/          # Global styles
│   ├── index.css
│   └── App.css
├── App.jsx          # Root component
└── main.jsx         # Entry point
```

## Design System

### Colors

- **Forest Green** - Primary brand color
- **Terracotta** - Accent and CTAs
- **Golden** - Highlights and ratings
- **Cream** - Background and cards
- **Soil** - Text colors

### Typography

- **DM Serif Display** - Headings
- **DM Sans** - Body text

## License

MIT

