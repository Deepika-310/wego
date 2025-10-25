import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation } from 'lucide-react';
import { GOOGLE_MAPS_API_KEY, DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '../lib/googleMapsConfig';

interface GoogleMapViewProps {
  jobs: any[];
  onJobClick: (job: any) => void;
}

export function GoogleMapView({ jobs, onJobClick }: GoogleMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Get user's GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoadingLocation(false);
        },
        (error) => {
          console.log('Geolocation error:', error);
          setUserLocation(DEFAULT_MAP_CENTER);
          setLoadingLocation(false);
        }
      );
    } else {
      setUserLocation(DEFAULT_MAP_CENTER);
      setLoadingLocation(false);
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || loadingLocation || !userLocation) return;

    // Check if API key is configured
    if (GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
      setMapError(true);
      return;
    }

    // Initialize Google Maps
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader
      .load()
      .then(() => {
        if (!mapRef.current) return;

        const googleMap = new google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: DEFAULT_MAP_ZOOM,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        setMap(googleMap);

        // Add user location marker
        new google.maps.Marker({
          position: userLocation,
          map: googleMap,
          title: 'Your Location',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        // Add markers for each job
        jobs.forEach((job) => {
          const marker = new google.maps.Marker({
            position: job.coordinates,
            map: googleMap,
            title: job.title,
            animation: google.maps.Animation.DROP,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; max-width: 200px;">
                <h4 style="margin: 0 0 4px 0; font-weight: 600;">${job.title}</h4>
                <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${job.recruiterName}</p>
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #2563eb;">₹${job.moneyPerHour}/hr</p>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(googleMap, marker);
            onJobClick(job);
          });
        });
      })
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
        setMapError(true);
      });
  }, [jobs, onJobClick, loadingLocation, userLocation]);

  if (loadingLocation) {
    return (
      <div className="h-96 rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Navigation className="w-12 h-12 mx-auto mb-2 text-blue-600 animate-pulse" />
          <p className="text-muted-foreground">Getting your location...</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    // Fallback to static map view with styled background
    return (
      <div className="relative h-96 rounded-lg overflow-hidden" style={{
        background: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
      }}>
        {/* Map grid lines */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1976d2" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Streets */}
        <div className="absolute inset-0">
          <div className="absolute bg-white/50 h-2 w-full" style={{ top: '30%' }} />
          <div className="absolute bg-white/50 h-2 w-full" style={{ top: '60%' }} />
          <div className="absolute bg-white/50 w-2 h-full" style={{ left: '25%' }} />
          <div className="absolute bg-white/50 w-2 h-full" style={{ left: '65%' }} />
        </div>

        {/* User location indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-6 h-6 bg-blue-500/30 rounded-full animate-ping" />
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <p className="text-xs mb-2">📍 Job Locations</p>
          <p className="text-xs text-blue-600 mb-1">🔵 Your Location</p>
          <p className="text-xs text-muted-foreground">Click markers for details</p>
        </div>

        {/* Info Box */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
          <p className="text-xs mb-1">💡 Interactive Map</p>
          <p className="text-xs text-muted-foreground">
            Add Google Maps API key in <code className="bg-gray-200 px-1 rounded">googleMapsConfig.ts</code> for real map
          </p>
        </div>
        
        {/* Mock map pins with enhanced styling */}
        {jobs.slice(0, 3).map((job, index) => {
          const positions = [
            { top: '25%', left: '20%' },
            { top: '50%', right: '30%' },
            { top: '65%', left: '55%' },
          ];
          return (
            <button
              key={job.id}
              className="absolute group z-10"
              style={positions[index]}
              onClick={() => onJobClick(job)}
            >
              <div className="relative">
                <MapPin className="w-10 h-10 text-red-500 fill-red-500 drop-shadow-lg animate-bounce" />
                <div className="absolute w-8 h-8 bg-red-500/30 rounded-full -z-10 top-1 left-1 animate-ping" />
              </div>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none border border-gray-200">
                <p className="font-medium">{job.title}</p>
                <p className="text-blue-600">₹{job.moneyPerHour}/hr</p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200" />
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return <div ref={mapRef} className="h-96 rounded-lg overflow-hidden" />;
}
