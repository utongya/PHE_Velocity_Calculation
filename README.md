# PHE Velocity Calculator

A modern web application for calculating fluid velocity and flow characteristics in Plate Heat Exchangers (PHE). Built with React, TypeScript, and Next.js.

## Features

- **Real-time Calculations**: Instantly calculate fluid velocity based on PHE parameters
- **Comprehensive Results**: View flow gap, number of channels, flow area, and velocity
- **Port Velocity**: Optional port velocity calculation
- **Validation**: Automatic validation of velocity ranges with performance recommendations
- **Step-by-Step**: Detailed calculation steps showing all formulas
- **Modern UI**: Clean, responsive design with icons and color-coded results
- **Engineering Guide**: Complete documentation of calculation methodology

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Calculator Page

1. Enter operational parameters (flow rate)
2. Input design parameters (plates, passes, dimensions)
3. Click "Calculate Velocity" to see results
4. View detailed calculation steps and performance assessment

### Guide Page

Navigate to `/guide` to access the complete engineering documentation including:
- Core formulas
- Step-by-step calculation methodology
- Performance guidelines
- Example calculations

## Calculation Methodology

The application calculates fluid velocity using the following steps:

1. **Flow Gap**: `b = p - t`
2. **Number of Channels**: `N_ch = (N_pl - 1) / N_pass`
3. **Total Flow Area**: `A_flow = N_ch × W_p × b × φ`
4. **Velocity**: `v = Q / A_flow`

### Recommended Velocity Ranges

- **Optimal**: 0.6 - 2 m/s (for water)
- **Acceptable**: 0.3 - 3 m/s
- **Below 0.3 m/s**: Risk of fouling
- **Above 3 m/s**: Risk of erosion and high pressure drop

## Project Structure

```
PHE_Velocity_Calculation/
├── src/
│   ├── app/
│   │   ├── guide/
│   │   │   └── page.tsx          # Engineering guide page
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Home page (calculator)
│   ├── components/
│   │   ├── Calculator.tsx         # Main calculator component
│   │   ├── InputForm.tsx          # Input form component
│   │   ├── Navigation.tsx         # Navigation bar
│   │   └── ResultsDisplay.tsx     # Results display component
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   └── utils/
│       └── calculations.ts        # Calculation logic
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Engineering Considerations

- Number of channels must be an integer (validated automatically)
- Corrugation factor typically ranges from 1.04 to 1.25
- Default corrugation factor is 1.15 if manufacturer data unavailable
- Port velocity should typically be 2-5 m/s for water

## License

This project is for educational and engineering purposes.

## Deployment to GitHub Pages

This application is configured for automatic deployment to GitHub Pages.

### Setup GitHub Pages

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/utongya/PHE_Velocity_Calculation.git
git push -u origin main
```

2. Enable GitHub Pages:
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Build and deployment", select "GitHub Actions" as the source
   - The app will automatically deploy when you push to the main branch

3. Access your deployed app at:
   `https://utongya.github.io/PHE_Velocity_Calculation/`

### Manual Deployment

To build and deploy manually:
```bash
npm run build
# The static files will be in the 'out' directory
```

## Author

Developed by **Unnop Tongya**, Nalco Water

Engineering calculations based on standard PHE design methodology.
