# Surprise Birthday App

A beautiful, interactive birthday surprise application built with Next.js, React, and Tailwind CSS.

## 🎉 Features

- Interactive birthday celebration interface
- Confetti animations
- RSVP modal functionality
- Responsive design
- Modern UI components with Radix UI
- Smooth animations with Framer Motion

## 🚀 Deployment

This app is configured for automatic deployment on Vercel with static export.

### Deploy to Vercel

1. **Connect Repository**: Go to [Vercel Dashboard](https://vercel.com/dashboard) and import this repository
2. **Configure Project**: 
   - Framework Preset: Next.js
   - Build Command: `npm run build` (automatically detected)
   - Output Directory: `out` (automatically detected)
3. **Deploy**: Click "Deploy" - Vercel will automatically build and deploy your app

### Environment Setup

No environment variables are required for this static export.

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/theophilusmunashe/surprisebirthday.git

# Navigate to project directory
cd surprisebirthday

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server (not needed for static export)
- `npm run lint` - Run ESLint
- `npm run export` - Build and export static files
- `npm run preview` - Preview the built static files locally

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── confetti-effect.tsx
│   ├── rsvp-modal.tsx
│   └── theme-provider.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
├── next.config.mjs       # Next.js configuration
├── vercel.json          # Vercel deployment configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🎨 Tech Stack

- **Framework**: Next.js 15.2.4
- **React**: 19
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod
- **Deployment**: Vercel (Static Export)

## 📝 Configuration

### Next.js Configuration

The app is configured for static export with:
- `output: 'export'` - Enables static HTML export
- `trailingSlash: true` - Adds trailing slashes to URLs
- `images: { unoptimized: true }` - Disables image optimization for static export

### Vercel Configuration

The `vercel.json` includes:
- Proper rewrites for SPA routing
- Security headers
- Optimized caching strategies

## 🔧 Troubleshooting

### Common Issues

1. **404 Errors on Vercel**: 
   - Ensure `vercel.json` rewrites are properly configured
   - Check that `output: 'export'` is set in `next.config.mjs`

2. **Build Failures**:
   - Verify all dependencies are installed
   - Check for TypeScript errors (currently ignored in build)

3. **Static Assets Not Loading**:
   - Ensure assets are in the `public/` directory
   - Use relative paths for static assets

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Please contact the repository owner for contribution guidelines.