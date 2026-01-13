'use client';

import { useState, useEffect } from 'react';
import { councilCatchmentUrls, postcodeToCouncil, councilsWithAPIs } from '@/lib/councils';

// Icons as components
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SchoolIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function Home() {
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Lookup postcode and find council
  async function handleSearch(e) {
    e.preventDefault();
    
    const cleanPostcode = postcode.trim().toUpperCase().replace(/\s+/g, '');
    
    if (!cleanPostcode) {
      setError('Please enter a postcode');
      return;
    }

    // Basic UK postcode validation
    const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]?[0-9][A-Z]{2}$/;
    if (!postcodeRegex.test(cleanPostcode)) {
      setError('Please enter a valid UK postcode');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Use postcodes.io to get location and local authority
      const response = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}`);
      const data = await response.json();

      if (data.status !== 200 || !data.result) {
        setError('Postcode not found. Please check and try again.');
        setLoading(false);
        return;
      }

      const { 
        postcode: formattedPostcode,
        admin_district,
        admin_county,
        region,
        country,
        latitude,
        longitude,
        parliamentary_constituency,
      } = data.result;

      // Determine the local authority for school admissions
      const localAuthority = admin_district || admin_county || region;
      
      // Check if we have data for this council
      const councilKey = Object.keys(councilsWithAPIs).find(
        key => key.toLowerCase() === localAuthority?.toLowerCase()
      );
      
      const councilData = councilKey ? councilsWithAPIs[councilKey] : null;
      
      // Find the catchment URL
      const catchmentUrl = Object.entries(councilCatchmentUrls).find(
        ([key]) => key.toLowerCase() === localAuthority?.toLowerCase()
      )?.[1];

      // Get postcode area for additional matching
      const postcodeArea = cleanPostcode.match(/^[A-Z]{1,2}/)?.[0];

      setResult({
        postcode: formattedPostcode,
        localAuthority,
        county: admin_county,
        region,
        country,
        latitude,
        longitude,
        constituency: parliamentary_constituency,
        hasApiData: !!councilData?.hasData,
        councilData,
        catchmentUrl: catchmentUrl || councilData?.fallbackUrl,
        postcodeArea,
      });

    } catch (err) {
      console.error('Error:', err);
      setError('Unable to look up postcode. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-brand-100/40 via-brand-50/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-100/30 via-teal-50/20 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-500 to-emerald-500 rounded-3xl shadow-xl shadow-brand-500/20 mb-6 sm:mb-8">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-surface-900 mb-4 tracking-tight text-balance">
            UK School Catchment
            <span className="gradient-text"> Checker</span>
          </h1>
          <p className="text-lg sm:text-xl text-surface-600 max-w-2xl mx-auto text-balance">
            Enter your postcode to find which schools your child is eligible to attend
          </p>
        </header>

        {/* Search Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 animate-slide-up">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <label htmlFor="postcode" className="sr-only">Enter your postcode</label>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400">
                  <MapPinIcon />
                </div>
                <input
                  type="text"
                  id="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  placeholder="Enter postcode (e.g. SW1A 1AA)"
                  className="input-field pl-12 font-mono tracking-wider"
                  autoComplete="postal-code"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center justify-center gap-2 sm:w-auto"
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <SearchIcon />
                    <span>Find Schools</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 animate-slide-down">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-stagger">
            {/* Location Summary */}
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center">
                  <MapPinIcon />
                </div>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-surface-900 mb-1">
                    {result.postcode}
                  </h2>
                  <p className="text-surface-600">
                    {result.localAuthority}{result.county && result.county !== result.localAuthority ? `, ${result.county}` : ''}, {result.country}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-surface-50 rounded-2xl">
                <div>
                  <p className="text-xs uppercase tracking-wider text-surface-500 mb-1">Local Authority</p>
                  <p className="font-medium text-surface-900">{result.localAuthority || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-surface-500 mb-1">Region</p>
                  <p className="font-medium text-surface-900">{result.region || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-surface-500 mb-1">Country</p>
                  <p className="font-medium text-surface-900">{result.country}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-surface-500 mb-1">Constituency</p>
                  <p className="font-medium text-surface-900 text-sm">{result.constituency || 'Unknown'}</p>
                </div>
              </div>
            </div>

            {/* Catchment Information */}
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <SchoolIcon />
                </div>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-surface-900 mb-1">
                    School Catchment Areas
                  </h2>
                  <p className="text-surface-600">
                    Schools your child may be eligible to attend
                  </p>
                </div>
              </div>

              {/* Council Status */}
              <div className={`flex items-start gap-3 p-4 rounded-2xl mb-6 ${
                result.hasApiData ? 'bg-brand-50 border border-brand-100' : 'bg-amber-50 border border-amber-100'
              }`}>
                {result.hasApiData ? (
                  <>
                    <CheckCircleIcon />
                    <div>
                      <p className="font-medium text-brand-900">
                        {result.localAuthority} has open catchment data
                      </p>
                      <p className="text-sm text-brand-700 mt-1">
                        This council publishes school catchment boundaries as open data.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-amber-500">
                      <InfoIcon />
                    </div>
                    <div>
                      <p className="font-medium text-amber-900">
                        Check {result.localAuthority}'s website for catchment areas
                      </p>
                      <p className="text-sm text-amber-700 mt-1">
                        This council has an interactive catchment checker on their website.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Action Button */}
              {result.catchmentUrl && (
                <a
                  href={result.catchmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white border-2 border-surface-200 rounded-2xl hover:border-brand-300 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                      <SchoolIcon />
                    </div>
                    <div>
                      <p className="font-semibold text-surface-900 group-hover:text-brand-600 transition-colors">
                        View Catchment Areas
                      </p>
                      <p className="text-sm text-surface-500">
                        {result.localAuthority} official school finder
                      </p>
                    </div>
                  </div>
                  <div className="text-surface-400 group-hover:text-brand-500 transition-colors">
                    <ExternalLinkIcon />
                  </div>
                </a>
              )}

              {/* Tips */}
              <div className="mt-6 p-4 bg-surface-50 rounded-2xl">
                <h3 className="font-semibold text-surface-900 mb-3 flex items-center gap-2">
                  <InfoIcon />
                  Important Information
                </h3>
                <ul className="space-y-2 text-sm text-surface-600">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-500 mt-0.5">•</span>
                    <span>Living in a catchment area doesn't guarantee a school place - it gives you higher priority in oversubscription criteria.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-500 mt-0.5">•</span>
                    <span>Catchment boundaries can change annually - always check the current year's admissions policy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-500 mt-0.5">•</span>
                    <span>Faith schools may use different criteria (e.g. parish boundaries) instead of catchment areas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-500 mt-0.5">•</span>
                    <span>Academies and free schools may set their own admission arrangements.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Grammar Schools Note */}
            {result.country === 'England' && (
              <div className="glass-card rounded-3xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-surface-900 mb-2">
                      Grammar Schools
                    </h2>
                    <p className="text-surface-600 mb-4">
                      Grammar schools in England use the 11+ entrance exam for admissions, not catchment areas. If you're interested in grammar schools, your child will need to sit the exam regardless of where you live.
                    </p>
                    <p className="text-sm text-surface-500">
                      Grammar school areas: Kent, Buckinghamshire, Lincolnshire, parts of Birmingham, Trafford, and select London boroughs.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!result && !loading && (
          <div className="text-center py-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-surface-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-semibold text-surface-700 mb-3">
              Find Your Catchment Schools
            </h2>
            <p className="text-surface-500 max-w-md mx-auto">
              Enter your postcode above to discover which primary and secondary schools you're in catchment for
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-surface-200 text-center">
          <p className="text-sm text-surface-500 mb-4">
            Data sourced from official council websites and the UK Government's postcode database.
            <br />
            Always verify catchment information with your local authority before making decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="https://postcodes.io" target="_blank" rel="noopener noreferrer" className="text-surface-400 hover:text-brand-600 transition-colors">
              Powered by postcodes.io
            </a>
            <span className="text-surface-300">•</span>
            <a href="https://data.gov.uk" target="_blank" rel="noopener noreferrer" className="text-surface-400 hover:text-brand-600 transition-colors">
              UK Open Data
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
