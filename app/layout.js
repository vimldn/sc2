import './globals.css'

export const metadata = {
  title: 'UK School Catchment Checker | Find Your Catchment Schools',
  description: 'Enter your UK postcode to instantly discover which state schools your child is eligible to attend. Check catchment areas for primary and secondary schools across England and Scotland.',
  keywords: 'school catchment, UK schools, catchment area checker, school eligibility, state schools, primary schools, secondary schools',
  openGraph: {
    title: 'UK School Catchment Checker',
    description: 'Find which schools your child is eligible to attend based on your postcode',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
