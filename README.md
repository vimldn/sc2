# UK School Catchment Checker

A modern, professional web application that helps parents find which schools their children are eligible to attend based on their UK postcode.

![School Catchment Checker](https://img.shields.io/badge/Next.js-14-black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

- 🔍 **Instant Postcode Lookup** - Enter any UK postcode to find your local authority
- 🏫 **Council Catchment Links** - Direct links to 100+ council catchment finders
- 📍 **Location Details** - Shows local authority, region, country, and constituency
- 🎓 **Grammar School Info** - Information about 11+ areas in England
- 📱 **Fully Responsive** - Works beautifully on mobile, tablet, and desktop
- ⚡ **Fast & Modern** - Built with Next.js 14 and Tailwind CSS

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

The easiest way to deploy is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or use the CLI:

```bash
npm i -g vercel
vercel
```

## Data Sources

### Postcode Lookup
- [postcodes.io](https://postcodes.io) - Free UK postcode API (no key required)

### Council Catchment Data

**Councils with Open Data APIs:**
- Scotland (all 32 councils via spatialdata.gov.scot)
- York, Wokingham, Sheffield, Nottingham, Wiltshire, Gateshead

**Councils with Interactive Finders:**
- Hampshire, Gloucestershire, Bristol, and 100+ more

The app includes direct links to all council catchment finders across:
- 32 Scottish councils
- 50+ English county/unitary councils
- 32 London boroughs

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Fonts**: Fraunces (display), DM Sans (body)
- **APIs**: postcodes.io, various council ArcGIS endpoints
- **Deployment**: Vercel-ready

## Project Structure

```
├── app/
│   ├── globals.css      # Tailwind + custom styles
│   ├── layout.js        # Root layout with metadata
│   └── page.js          # Main search page
├── lib/
│   └── councils.js      # Council data & API endpoints
├── public/              # Static assets
├── tailwind.config.js   # Tailwind configuration
└── next.config.js       # Next.js configuration
```

## Expanding the Data

### Adding More Council APIs

Edit `lib/councils.js` to add new council ArcGIS endpoints:

```javascript
'Council Name': {
  country: 'England',
  hasData: true,
  apiType: 'arcgis',
  endpoints: {
    primary: 'https://...',
    secondary: 'https://...',
  },
  fallbackUrl: 'https://...',
},
```

### Point-in-Polygon Checking

For councils with GeoJSON catchment boundaries, you can add Turf.js checking:

```javascript
import * as turf from '@turf/turf';

const point = turf.point([longitude, latitude]);
const isInCatchment = turf.booleanPointInPolygon(point, catchmentPolygon);
```

## Contributing

Contributions are welcome! Particularly:

1. Adding new council catchment API endpoints
2. Improving the council URL database
3. Adding direct catchment polygon data
4. UI/UX improvements

## License

MIT License - feel free to use this for any purpose.

## Acknowledgments

- [postcodes.io](https://postcodes.io) for the free postcode API
- [data.gov.uk](https://data.gov.uk) for open government data
- All UK councils that publish open catchment data

---

Built with ❤️ for UK parents navigating school admissions
