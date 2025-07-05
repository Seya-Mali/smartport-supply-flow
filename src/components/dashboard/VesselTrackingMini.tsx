import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navigation, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Simplified ship types for the mini version
const SHIP_TYPES = {
  cargo: { label: 'Cargo', color: '#FFD700', symbol: '▶' },
  tanker: { label: 'Tanker', color: '#FF8C00', symbol: '▶' },
  passenger: { label: 'Cruise', color: '#32CD32', symbol: '▶' },
  fishing: { label: 'Fishing', color: '#4169E1', symbol: '▶' },
};

// Subset of vessels for mini map
const MINI_VESSELS = [
  { id: 1, name: 'Atlantic Cargo I', type: 'cargo', lat: 40.7589, lng: -73.9851, speed: 12.5 },
  { id: 2, name: 'Pacific Tanker', type: 'tanker', lat: 34.0522, lng: -118.2437, speed: 8.3 },
  { id: 3, name: 'Liberty Cruise', type: 'passenger', lat: 25.7617, lng: -80.1918, speed: 15.2 },
  { id: 4, name: 'North Sea Fisher', type: 'fishing', lat: 51.5074, lng: -0.1278, speed: 6.7 },
  { id: 5, name: 'Tokyo Express', type: 'cargo', lat: 35.6762, lng: 139.6503, speed: 16.8 },
  { id: 6, name: 'Singapore Tanker', type: 'tanker', lat: 1.3521, lng: 103.8198, speed: 9.4 },
  { id: 7, name: 'Rotterdam Giant', type: 'cargo', lat: 51.9244, lng: 4.4777, speed: 13.8 },
  { id: 8, name: 'Sydney Harbour Cruise', type: 'passenger', lat: -33.8688, lng: 151.2093, speed: 12.7 },
  { id: 9, name: 'Gulf Carrier', type: 'cargo', lat: 25.2048, lng: 55.2708, speed: 11.3 },
  { id: 10, name: 'Santos Steamer', type: 'cargo', lat: -23.9618, lng: -46.3322, speed: 12.6 },
];

// Major ports for mini map
const MINI_PORTS = [
  { id: 1, name: 'Port of Los Angeles', lat: 33.7387, lng: -118.2628, country: 'USA' },
  { id: 2, name: 'Port of Singapore', lat: 1.2966, lng: 103.8506, country: 'Singapore' },
  { id: 3, name: 'Port of Rotterdam', lat: 51.9244, lng: 4.4777, country: 'Netherlands' },
  { id: 4, name: 'Port of Shanghai', lat: 31.2304, lng: 121.4737, country: 'China' },
  { id: 5, name: 'Port of Dubai', lat: 25.2769, lng: 55.3214, country: 'UAE' },
  { id: 6, name: 'Port of Santos', lat: -23.9618, lng: -46.3322, country: 'Brazil' },
];

const createMiniVesselIcon = (type: keyof typeof SHIP_TYPES) => {
  const shipType = SHIP_TYPES[type];
  return L.divIcon({
    html: `
      <div style="
        color: ${shipType.color};
        font-size: 12px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
      ">
        ${shipType.symbol}
      </div>
    `,
    className: 'mini-vessel-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const createMiniPortIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        color: #2563eb;
        font-size: 12px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        background: rgba(255,255,255,0.9);
        border-radius: 50%;
        border: 2px solid #2563eb;
      ">
        ⚓
      </div>
    `,
    className: 'mini-port-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

export const VesselTrackingMini: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-blue-600" />
            Live Vessel Tracking
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/vessel-tracking')}
            className="flex items-center gap-1"
          >
            <Maximize2 className="h-3 w-3" />
            Full View
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 rounded-lg overflow-hidden border">
          <MapContainer
            center={[30, 0]}
            zoom={1}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            dragging={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            
            {MINI_VESSELS.map((vessel) => (
              <Marker
                key={vessel.id}
                position={[vessel.lat, vessel.lng]}
                icon={createMiniVesselIcon(vessel.type as keyof typeof SHIP_TYPES)}
              >
                <Popup>
                  <div className="p-1">
                    <h4 className="font-semibold text-xs">{vessel.name}</h4>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <Badge variant="outline" className="text-xs">
                          {SHIP_TYPES[vessel.type as keyof typeof SHIP_TYPES].label}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span>{vessel.speed} kts</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {MINI_PORTS.map((port) => (
              <Marker
                key={`port-${port.id}`}
                position={[port.lat, port.lng]}
                icon={createMiniPortIcon()}
              >
                <Popup>
                  <div className="p-1">
                    <h4 className="font-semibold text-xs text-blue-700">⚓ {port.name}</h4>
                    <div className="text-xs">
                      <span className="text-muted-foreground">{port.country}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground">
          Showing {MINI_VESSELS.length} vessels and {MINI_PORTS.length} major ports. Click "Full View" for complete tracking interface.
        </div>
      </CardContent>
    </Card>
  );
};
