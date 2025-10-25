import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface IndiaMapViewProps {
  jobs: any[];
  onJobClick: (job: any) => void;
}

export function IndiaMapView({ jobs, onJobClick }: IndiaMapViewProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // City coordinates on the India map (approximate positions in %)
  const cities = [
    { name: 'Mumbai', top: '58%', left: '23%', jobs: jobs.slice(0, 2) },
    { name: 'Delhi', top: '28%', left: '40%', jobs: jobs.slice(2, 4) },
    { name: 'Bangalore', top: '72%', left: '38%', jobs: jobs.slice(0, 3) },
    { name: 'Hyderabad', top: '64%', left: '42%', jobs: jobs.slice(1, 3) },
    { name: 'Chennai', top: '72%', left: '48%', jobs: jobs.slice(2, 4) },
    { name: 'Kolkata', top: '48%', left: '62%', jobs: jobs.slice(0, 2) },
    { name: 'Pune', top: '62%', left: '30%', jobs: jobs.slice(1, 2) },
    { name: 'Ahmedabad', top: '48%', left: '28%', jobs: jobs.slice(3, 4) },
  ];

  return (
    <div className="relative h-96 bg-gradient-to-br from-orange-50 via-white to-green-50 rounded-lg overflow-hidden border-2 border-orange-200">
      {/* India Map SVG */}
      <svg
        viewBox="0 0 800 1000"
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}
      >
        {/* Simplified India outline */}
        <path
          d="M 400 100 
             L 420 120 L 440 150 L 460 180 L 480 220 L 490 260
             L 495 300 L 500 350 L 505 400 L 510 450
             L 515 500 L 520 550 L 525 600 L 530 650
             L 520 700 L 500 740 L 470 780 L 440 810 L 410 830
             L 380 840 L 350 830 L 320 810 L 290 780
             L 260 740 L 240 700 L 230 650 L 225 600
             L 220 550 L 215 500 L 210 450 L 205 400
             L 200 350 L 195 300 L 190 260 L 180 220
             L 170 180 L 160 150 L 180 120 L 200 100
             L 220 90 L 250 85 L 280 80 L 310 80 L 340 82
             L 370 88 L 400 100 Z"
          fill="#FFE5B4"
          stroke="#FF9933"
          strokeWidth="3"
          className="transition-all duration-300 hover:fill-orange-200"
        />
        
        {/* Tri-color stripes effect */}
        <defs>
          <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FF9933', stopOpacity: 0.1 }} />
            <stop offset="50%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#138808', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        
        <rect x="0" y="0" width="800" height="1000" fill="url(#indiaGradient)" />
      </svg>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-orange-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="text-xs">🇮🇳 India</span>
        </div>
        <p className="text-xs text-muted-foreground">Click cities for jobs</p>
      </div>

      {/* Your Location Indicator */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-blue-600" />
          <span className="text-xs">Your Location</span>
        </div>
      </div>

      {/* City Markers */}
      {cities.map((city) => (
        <div
          key={city.name}
          className="absolute"
          style={{ top: city.top, left: city.left, transform: 'translate(-50%, -50%)' }}
        >
          <button
            className="relative group"
            onClick={() => {
              if (city.jobs.length > 0) {
                setSelectedCity(city.name);
                onJobClick(city.jobs[0]);
              }
            }}
            onMouseEnter={() => setHoveredState(city.name)}
            onMouseLeave={() => setHoveredState(null)}
          >
            {/* Pulsing ring for cities with jobs */}
            {city.jobs.length > 0 && (
              <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping" />
              </div>
            )}
            
            {/* City marker */}
            <MapPin 
              className={`w-8 h-8 transition-all duration-200 ${
                city.jobs.length > 0 
                  ? 'text-red-500 fill-red-500 drop-shadow-lg' 
                  : 'text-gray-400 fill-gray-400'
              } ${hoveredState === city.name ? 'scale-125' : ''}`}
            />
            
            {/* City name and job count */}
            <div
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg border text-xs whitespace-nowrap transition-all duration-200 ${
                hoveredState === city.name ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <p className="font-medium">{city.name}</p>
              {city.jobs.length > 0 && (
                <p className="text-blue-600">{city.jobs.length} job{city.jobs.length > 1 ? 's' : ''}</p>
              )}
            </div>
          </button>
        </div>
      ))}

      {/* Selected City Info Panel */}
      {selectedCity && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-orange-200">
          <div className="flex items-center justify-between mb-3">
            <h4>{selectedCity}</h4>
            <button
              onClick={() => setSelectedCity(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {cities
              .find((c) => c.name === selectedCity)
              ?.jobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => onJobClick(job)}
                  className="w-full text-left p-2 hover:bg-gray-50 rounded border"
                >
                  <p className="font-medium text-sm">{job.title}</p>
                  <p className="text-xs text-muted-foreground">
                    ₹{job.moneyPerHour}/hr • {job.recruiterName}
                  </p>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-2 left-2 text-4xl opacity-50">🇮🇳</div>
      <div className="absolute bottom-2 right-2 text-sm text-muted-foreground bg-white/80 px-2 py-1 rounded">
        Interactive India Map
      </div>
    </div>
  );
}
