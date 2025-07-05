import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ZoomIn, ZoomOut, RotateCcw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Ship types with colors and icons
export const SHIP_TYPES = {
  cargo: { 
    label: 'Cargo vessels', 
    color: '#FFD700', 
    icon: '🚢',
    symbol: '▶' 
  },
  tanker: { 
    label: 'Tankers', 
    color: '#FF8C00', 
    icon: '🛢️',
    symbol: '▶' 
  },
  passenger: { 
    label: 'Passenger / Cruise ships', 
    color: '#32CD32', 
    icon: '🛳️',
    symbol: '▶' 
  },
  fishing: { 
    label: 'Fishing ships', 
    color: '#4169E1', 
    icon: '🎣',
    symbol: '▶' 
  },
  yacht: { 
    label: 'Yachts / Sailing Vessels', 
    color: '#DA70D6', 
    icon: '⛵',
    symbol: '▶' 
  },
  military: { 
    label: 'Military', 
    color: '#DC143C', 
    icon: '⚓',
    symbol: '▶' 
  },
  tug: { 
    label: 'Tugs', 
    color: '#228B22', 
    icon: '🚤',
    symbol: '▶' 
  },
  auxiliary: { 
    label: 'Other type / Auxiliary', 
    color: '#4682B4', 
    icon: '🚁',
    symbol: '▶' 
  },
  unknown: { 
    label: 'Unknown', 
    color: '#808080', 
    icon: '❓',
    symbol: '▶' 
  }
};

// Major ports around the world
const PORTS = [
  // North America - Major Ports
  { id: 1, name: 'Port of Los Angeles', lat: 33.7387, lng: -118.2628, country: 'USA', type: 'Container', category: 'major' },
  { id: 2, name: 'Port of Long Beach', lat: 33.7701, lng: -118.2142, country: 'USA', type: 'Container', category: 'major' },
  { id: 3, name: 'Port of New York/New Jersey', lat: 40.6684, lng: -74.0375, country: 'USA', type: 'Container', category: 'major' },
  { id: 4, name: 'Port of Savannah', lat: 32.1363, lng: -81.1564, country: 'USA', type: 'Container', category: 'major' },
  { id: 5, name: 'Port of Seattle', lat: 47.5952, lng: -122.3316, country: 'USA', type: 'Container', category: 'major' },
  { id: 6, name: 'Port of Vancouver', lat: 49.2827, lng: -123.1207, country: 'Canada', type: 'Container', category: 'major' },
  
  // North America - Minor Ports
  { id: 37, name: 'Port of Oakland', lat: 37.8044, lng: -122.2711, country: 'USA', type: 'Container', category: 'minor' },
  { id: 38, name: 'Port of Charleston', lat: 32.7767, lng: -79.9311, country: 'USA', type: 'Container', category: 'minor' },
  { id: 39, name: 'Port of Houston', lat: 29.7604, lng: -95.3698, country: 'USA', type: 'Oil/Gas', category: 'minor' },
  { id: 40, name: 'Port of Miami', lat: 25.7617, lng: -80.1918, country: 'USA', type: 'Cruise', category: 'minor' },
  { id: 41, name: 'Port of Norfolk', lat: 36.8508, lng: -76.2859, country: 'USA', type: 'Container', category: 'minor' },
  { id: 42, name: 'Port of Boston', lat: 42.3601, lng: -71.0589, country: 'USA', type: 'General', category: 'minor' },
  { id: 43, name: 'Port of Montreal', lat: 45.5017, lng: -73.5673, country: 'Canada', type: 'Container', category: 'minor' },
  
  // Europe - Major Ports
  { id: 7, name: 'Port of Rotterdam', lat: 51.9244, lng: 4.4777, country: 'Netherlands', type: 'Container', category: 'major' },
  { id: 8, name: 'Port of Antwerp', lat: 51.2194, lng: 4.4025, country: 'Belgium', type: 'Container', category: 'major' },
  { id: 9, name: 'Port of Hamburg', lat: 53.5511, lng: 9.9937, country: 'Germany', type: 'Container', category: 'major' },
  { id: 10, name: 'Port of Felixstowe', lat: 51.9560, lng: 1.3522, country: 'UK', type: 'Container', category: 'major' },
  { id: 11, name: 'Port of Le Havre', lat: 49.4944, lng: 0.1079, country: 'France', type: 'Container', category: 'major' },
  { id: 12, name: 'Port of Barcelona', lat: 41.3851, lng: 2.1734, country: 'Spain', type: 'Container', category: 'major' },
  
  // Europe - Minor Ports
  { id: 44, name: 'Port of Bremen', lat: 53.0793, lng: 8.8017, country: 'Germany', type: 'Container', category: 'minor' },
  { id: 45, name: 'Port of Marseille', lat: 43.2965, lng: 5.3698, country: 'France', type: 'General', category: 'minor' },
  { id: 46, name: 'Port of Genoa', lat: 44.4056, lng: 8.9463, country: 'Italy', type: 'Container', category: 'minor' },
  { id: 47, name: 'Port of Valencia', lat: 39.4699, lng: -0.3763, country: 'Spain', type: 'Container', category: 'minor' },
  { id: 48, name: 'Port of Piraeus', lat: 37.9755, lng: 23.7348, country: 'Greece', type: 'Container', category: 'minor' },
  { id: 49, name: 'Port of Southampton', lat: 50.9097, lng: -1.4044, country: 'UK', type: 'Cruise', category: 'minor' },
  { id: 50, name: 'Port of Gdansk', lat: 54.3520, lng: 18.6466, country: 'Poland', type: 'Container', category: 'minor' },
  
  // Asia - Major Ports
  { id: 13, name: 'Port of Shanghai', lat: 31.2304, lng: 121.4737, country: 'China', type: 'Container', category: 'major' },
  { id: 14, name: 'Port of Singapore', lat: 1.2966, lng: 103.8506, country: 'Singapore', type: 'Container', category: 'major' },
  { id: 15, name: 'Port of Shenzhen', lat: 22.5431, lng: 114.0579, country: 'China', type: 'Container', category: 'major' },
  { id: 16, name: 'Port of Ningbo-Zhoushan', lat: 29.8683, lng: 121.5440, country: 'China', type: 'Container', category: 'major' },
  { id: 17, name: 'Port of Busan', lat: 35.0951, lng: 129.0756, country: 'South Korea', type: 'Container', category: 'major' },
  { id: 18, name: 'Port of Hong Kong', lat: 22.2783, lng: 114.1747, country: 'Hong Kong', type: 'Container', category: 'major' },
  { id: 19, name: 'Port of Tokyo', lat: 35.6528, lng: 139.7594, country: 'Japan', type: 'Container', category: 'major' },
  { id: 20, name: 'Port of Yokohama', lat: 35.4437, lng: 139.6380, country: 'Japan', type: 'Container', category: 'major' },
  { id: 21, name: 'Port of Kaohsiung', lat: 22.6273, lng: 120.3014, country: 'Taiwan', type: 'Container', category: 'major' },
  
  // Asia - Minor Ports
  { id: 51, name: 'Port of Qingdao', lat: 36.0986, lng: 120.3719, country: 'China', type: 'Container', category: 'minor' },
  { id: 52, name: 'Port of Tianjin', lat: 39.1042, lng: 117.2009, country: 'China', type: 'Container', category: 'minor' },
  { id: 53, name: 'Port of Kobe', lat: 34.6901, lng: 135.1956, country: 'Japan', type: 'Container', category: 'minor' },
  { id: 54, name: 'Port of Mumbai', lat: 19.0760, lng: 72.8777, country: 'India', type: 'Container', category: 'minor' },
  { id: 55, name: 'Port of Colombo', lat: 6.9271, lng: 79.8612, country: 'Sri Lanka', type: 'Container', category: 'minor' },
  { id: 56, name: 'Port of Manila', lat: 14.5995, lng: 120.9842, country: 'Philippines', type: 'Container', category: 'minor' },
  { id: 57, name: 'Port of Ho Chi Minh', lat: 10.8231, lng: 106.6297, country: 'Vietnam', type: 'Container', category: 'minor' },
  { id: 58, name: 'Port of Bangkok', lat: 13.7563, lng: 100.5018, country: 'Thailand', type: 'Container', category: 'minor' },
  
  // Middle East - Major Ports
  { id: 22, name: 'Port of Dubai', lat: 25.2769, lng: 55.3214, country: 'UAE', type: 'Container', category: 'major' },
  { id: 23, name: 'Port of Jebel Ali', lat: 25.0118, lng: 55.1370, country: 'UAE', type: 'Container', category: 'major' },
  { id: 24, name: 'Port of Jeddah', lat: 21.4858, lng: 39.1925, country: 'Saudi Arabia', type: 'Container', category: 'major' },
  
  // Middle East - Minor Ports
  { id: 59, name: 'Port of Kuwait', lat: 29.3759, lng: 47.9774, country: 'Kuwait', type: 'Oil/Gas', category: 'minor' },
  { id: 60, name: 'Port of Doha', lat: 25.2854, lng: 51.5310, country: 'Qatar', type: 'General', category: 'minor' },
  { id: 61, name: 'Port of Muscat', lat: 23.5859, lng: 58.4059, country: 'Oman', type: 'General', category: 'minor' },
  
  // Australia/Oceania - Major Ports
  { id: 25, name: 'Port of Melbourne', lat: -37.8407, lng: 144.9556, country: 'Australia', type: 'Container', category: 'major' },
  { id: 26, name: 'Port of Sydney', lat: -33.8568, lng: 151.2153, country: 'Australia', type: 'Container', category: 'major' },
  { id: 27, name: 'Port of Brisbane', lat: -27.3812, lng: 153.1508, country: 'Australia', type: 'Container', category: 'major' },
  { id: 28, name: 'Port of Auckland', lat: -36.8485, lng: 174.7633, country: 'New Zealand', type: 'Container', category: 'major' },
  
  // Australia/Oceania - Minor Ports
  { id: 62, name: 'Port of Adelaide', lat: -34.9285, lng: 138.6007, country: 'Australia', type: 'General', category: 'minor' },
  { id: 63, name: 'Port of Perth', lat: -31.9505, lng: 115.8605, country: 'Australia', type: 'General', category: 'minor' },
  { id: 64, name: 'Port of Wellington', lat: -41.2865, lng: 174.7762, country: 'New Zealand', type: 'General', category: 'minor' },
  
  // South America - Major Ports
  { id: 29, name: 'Port of Santos', lat: -23.9618, lng: -46.3322, country: 'Brazil', type: 'Container', category: 'major' },
  { id: 30, name: 'Port of Callao', lat: -12.0464, lng: -77.1428, country: 'Peru', type: 'Container', category: 'major' },
  { id: 31, name: 'Port of Valparaíso', lat: -33.0472, lng: -71.6127, country: 'Chile', type: 'Container', category: 'major' },
  
  // South America - Minor Ports
  { id: 65, name: 'Port of Rio de Janeiro', lat: -22.9068, lng: -43.1729, country: 'Brazil', type: 'General', category: 'minor' },
  { id: 66, name: 'Port of Buenos Aires', lat: -34.6118, lng: -58.3960, country: 'Argentina', type: 'Container', category: 'minor' },
  { id: 67, name: 'Port of Cartagena', lat: 10.3910, lng: -75.4794, country: 'Colombia', type: 'Container', category: 'minor' },
  
  // Africa - Major Ports
  { id: 32, name: 'Port of Durban', lat: -29.8587, lng: 31.0218, country: 'South Africa', type: 'Container', category: 'major' },
  { id: 33, name: 'Port of Cape Town', lat: -33.9249, lng: 18.4241, country: 'South Africa', type: 'Container', category: 'major' },
  { id: 34, name: 'Port of Alexandria', lat: 31.2001, lng: 29.9187, country: 'Egypt', type: 'Container', category: 'major' },
  { id: 35, name: 'Port of Lagos', lat: 6.4474, lng: 3.3903, country: 'Nigeria', type: 'Container', category: 'major' },
  
  // Africa - Minor Ports
  { id: 68, name: 'Port of Casablanca', lat: 33.5731, lng: -7.5898, country: 'Morocco', type: 'Container', category: 'minor' },
  { id: 69, name: 'Port of Mombasa', lat: -4.0435, lng: 39.6682, country: 'Kenya', type: 'Container', category: 'minor' },
  { id: 70, name: 'Port of Tema', lat: 5.6698, lng: -0.0166, country: 'Ghana', type: 'Container', category: 'minor' },
];

// Dummy vessel data with global distribution
const VESSELS = [
  // North America - West Coast
  { id: 1, name: 'Atlantic Cargo I', type: 'cargo', lat: 40.7589, lng: -73.9851, speed: 12.5, heading: 45, destination: 'Port of Long Beach' },
  { id: 2, name: 'Pacific Tanker', type: 'tanker', lat: 34.0522, lng: -118.2437, speed: 8.3, heading: 180, destination: 'Port of Los Angeles' },
  { id: 24, name: 'Golden Gate Cargo', type: 'cargo', lat: 37.8044, lng: -122.2711, speed: 11.7, heading: 225, destination: 'Port of Oakland' },
  { id: 25, name: 'Seattle Express', type: 'cargo', lat: 47.6062, lng: -122.3321, speed: 13.4, heading: 315, destination: 'Port of Seattle' },
  { id: 26, name: 'Oregon Tanker', type: 'tanker', lat: 45.5152, lng: -122.6784, speed: 9.8, heading: 180, destination: 'Port of Portland' },
  { id: 27, name: 'Vancouver Hauler', type: 'cargo', lat: 49.2827, lng: -123.1207, speed: 14.2, heading: 90, destination: 'Port of Vancouver' },
  
  // North America - East Coast
  { id: 28, name: 'New York Navigator', type: 'cargo', lat: 40.6684, lng: -74.0375, speed: 12.1, heading: 135, destination: 'Port of New York' },
  { id: 29, name: 'Charleston Carrier', type: 'cargo', lat: 32.7767, lng: -79.9311, speed: 10.9, heading: 270, destination: 'Port of Charleston' },
  { id: 30, name: 'Savannah Express', type: 'cargo', lat: 32.1363, lng: -81.1564, speed: 13.6, heading: 45, destination: 'Port of Savannah' },
  { id: 31, name: 'Miami Cruiser', type: 'passenger', lat: 25.7617, lng: -80.1918, speed: 16.8, heading: 180, destination: 'Miami Port' },
  { id: 32, name: 'Boston Clipper', type: 'cargo', lat: 42.3601, lng: -71.0589, speed: 11.3, heading: 90, destination: 'Port of Boston' },
  { id: 33, name: 'Norfolk Naval', type: 'military', lat: 36.8508, lng: -76.2859, speed: 20.5, heading: 225, destination: 'Naval Station Norfolk' },
  
  // Gulf of Mexico
  { id: 34, name: 'Houston Oil Giant', type: 'tanker', lat: 29.7604, lng: -95.3698, speed: 7.9, heading: 180, destination: 'Port of Houston' },
  { id: 35, name: 'Gulf Explorer', type: 'auxiliary', lat: 28.0000, lng: -90.0000, speed: 6.2, heading: 270, destination: 'Gulf Platform' },
  { id: 36, name: 'New Orleans Barge', type: 'cargo', lat: 29.9511, lng: -90.0715, speed: 8.4, heading: 45, destination: 'Port of New Orleans' },
  
  // Europe - North Sea
  { id: 3, name: 'Liberty Cruise', type: 'passenger', lat: 25.7617, lng: -80.1918, speed: 15.2, heading: 90, destination: 'Miami Port' },
  { id: 4, name: 'North Sea Fisher', type: 'fishing', lat: 51.5074, lng: -0.1278, speed: 6.7, heading: 270, destination: 'Thames Estuary' },
  { id: 5, name: 'Mediterranean Yacht', type: 'yacht', lat: 43.7696, lng: 7.4090, speed: 18.9, heading: 120, destination: 'Monaco Harbor' },
  { id: 6, name: 'Baltic Cargo', type: 'cargo', lat: 59.3293, lng: 18.0686, speed: 14.1, heading: 200, destination: 'Port of Stockholm' },
  { id: 37, name: 'Rotterdam Giant', type: 'cargo', lat: 51.9244, lng: 4.4777, speed: 13.8, heading: 90, destination: 'Port of Rotterdam' },
  { id: 38, name: 'Hamburg Express', type: 'cargo', lat: 53.5511, lng: 9.9937, speed: 12.7, heading: 180, destination: 'Port of Hamburg' },
  { id: 39, name: 'Antwerp Container', type: 'cargo', lat: 51.2194, lng: 4.4025, speed: 11.9, heading: 270, destination: 'Port of Antwerp' },
  { id: 40, name: 'Felixstowe Ferry', type: 'cargo', lat: 51.9560, lng: 1.3522, speed: 10.4, heading: 225, destination: 'Port of Felixstowe' },
  { id: 41, name: 'Le Havre Liner', type: 'cargo', lat: 49.4944, lng: 0.1079, speed: 12.3, heading: 135, destination: 'Port of Le Havre' },
  
  // Europe - Mediterranean
  { id: 42, name: 'Barcelona Cargo', type: 'cargo', lat: 41.3851, lng: 2.1734, speed: 13.1, heading: 90, destination: 'Port of Barcelona' },
  { id: 43, name: 'Genoa Express', type: 'cargo', lat: 44.4056, lng: 8.9463, speed: 11.6, heading: 180, destination: 'Port of Genoa' },
  { id: 44, name: 'Valencia Vessel', type: 'cargo', lat: 39.4699, lng: -0.3763, speed: 12.8, heading: 270, destination: 'Port of Valencia' },
  { id: 45, name: 'Piraeus Pride', type: 'cargo', lat: 37.9755, lng: 23.7348, speed: 10.7, heading: 315, destination: 'Port of Piraeus' },
  { id: 46, name: 'Marseille Mariner', type: 'cargo', lat: 43.2965, lng: 5.3698, speed: 11.2, heading: 45, destination: 'Port of Marseille' },
  
  // Asia - China
  { id: 7, name: 'Tokyo Express', type: 'cargo', lat: 35.6762, lng: 139.6503, speed: 16.8, heading: 315, destination: 'Port of Tokyo' },
  { id: 8, name: 'Singapore Tanker', type: 'tanker', lat: 1.3521, lng: 103.8198, speed: 9.4, heading: 45, destination: 'Port of Singapore' },
  { id: 9, name: 'Pearl River Tug', type: 'tug', lat: 22.3193, lng: 114.1694, speed: 4.2, heading: 180, destination: 'Hong Kong Port' },
  { id: 47, name: 'Shanghai Super', type: 'cargo', lat: 31.2304, lng: 121.4737, speed: 17.2, heading: 90, destination: 'Port of Shanghai' },
  { id: 48, name: 'Shenzhen Star', type: 'cargo', lat: 22.5431, lng: 114.0579, speed: 15.9, heading: 180, destination: 'Port of Shenzhen' },
  { id: 49, name: 'Ningbo Navigator', type: 'cargo', lat: 29.8683, lng: 121.5440, speed: 14.7, heading: 270, destination: 'Port of Ningbo' },
  { id: 50, name: 'Qingdao Queen', type: 'cargo', lat: 36.0986, lng: 120.3719, speed: 13.5, heading: 225, destination: 'Port of Qingdao' },
  { id: 51, name: 'Tianjin Titan', type: 'cargo', lat: 39.1042, lng: 117.2009, speed: 12.8, heading: 135, destination: 'Port of Tianjin' },
  
  // Asia - Japan & Korea
  { id: 52, name: 'Yokohama Yacht', type: 'passenger', lat: 35.4437, lng: 139.6380, speed: 14.3, heading: 90, destination: 'Port of Yokohama' },
  { id: 53, name: 'Kobe Carrier', type: 'cargo', lat: 34.6901, lng: 135.1956, speed: 13.1, heading: 270, destination: 'Port of Kobe' },
  { id: 54, name: 'Busan Bulk', type: 'cargo', lat: 35.0951, lng: 129.0756, speed: 12.4, heading: 180, destination: 'Port of Busan' },
  { id: 55, name: 'Seoul Shipper', type: 'cargo', lat: 37.5665, lng: 126.9780, speed: 11.7, heading: 315, destination: 'Port of Incheon' },
  
  // Asia - Southeast Asia
  { id: 56, name: 'Manila Mover', type: 'cargo', lat: 14.5995, lng: 120.9842, speed: 12.9, heading: 45, destination: 'Port of Manila' },
  { id: 57, name: 'Bangkok Barge', type: 'cargo', lat: 13.7563, lng: 100.5018, speed: 8.6, heading: 180, destination: 'Port of Bangkok' },
  { id: 58, name: 'Ho Chi Minh Hauler', type: 'cargo', lat: 10.8231, lng: 106.6297, speed: 11.3, heading: 270, destination: 'Port of Ho Chi Minh' },
  { id: 59, name: 'Kaohsiung Cargo', type: 'cargo', lat: 22.6273, lng: 120.3014, speed: 13.7, heading: 90, destination: 'Port of Kaohsiung' },
  
  // Asia - India & Sri Lanka
  { id: 60, name: 'Mumbai Merchant', type: 'cargo', lat: 19.0760, lng: 72.8777, speed: 10.8, heading: 225, destination: 'Port of Mumbai' },
  { id: 61, name: 'Colombo Carrier', type: 'cargo', lat: 6.9271, lng: 79.8612, speed: 12.1, heading: 135, destination: 'Port of Colombo' },
  { id: 62, name: 'Chennai Clipper', type: 'cargo', lat: 13.0827, lng: 80.2707, speed: 11.5, heading: 90, destination: 'Port of Chennai' },
  
  // Middle East
  { id: 10, name: 'Gulf Carrier', type: 'cargo', lat: 25.2048, lng: 55.2708, speed: 11.3, heading: 90, destination: 'Port of Dubai' },
  { id: 11, name: 'Red Sea Navigator', type: 'tanker', lat: 21.4225, lng: 39.8262, speed: 7.8, heading: 270, destination: 'Jeddah Port' },
  { id: 63, name: 'Jebel Ali Giant', type: 'cargo', lat: 25.0118, lng: 55.1370, speed: 14.6, heading: 180, destination: 'Port of Jebel Ali' },
  { id: 64, name: 'Kuwait Crude', type: 'tanker', lat: 29.3759, lng: 47.9774, speed: 8.7, heading: 315, destination: 'Port of Kuwait' },
  { id: 65, name: 'Doha Delivery', type: 'cargo', lat: 25.2854, lng: 51.5310, speed: 10.2, heading: 45, destination: 'Port of Doha' },
  { id: 66, name: 'Muscat Mover', type: 'cargo', lat: 23.5859, lng: 58.4059, speed: 9.8, heading: 180, destination: 'Port of Muscat' },
  
  // Australia/Oceania
  { id: 12, name: 'Sydney Harbour Cruise', type: 'passenger', lat: -33.8688, lng: 151.2093, speed: 12.7, heading: 135, destination: 'Sydney Harbour' },
  { id: 13, name: 'Melbourne Cargo', type: 'cargo', lat: -37.8136, lng: 144.9631, speed: 13.9, heading: 225, destination: 'Port of Melbourne' },
  { id: 67, name: 'Brisbane Bulk', type: 'cargo', lat: -27.3812, lng: 153.1508, speed: 12.4, heading: 90, destination: 'Port of Brisbane' },
  { id: 68, name: 'Auckland Admiral', type: 'cargo', lat: -36.8485, lng: 174.7633, speed: 11.8, heading: 270, destination: 'Port of Auckland' },
  { id: 69, name: 'Perth Pioneer', type: 'cargo', lat: -31.9505, lng: 115.8605, speed: 10.9, heading: 180, destination: 'Port of Perth' },
  { id: 70, name: 'Adelaide Ace', type: 'cargo', lat: -34.9285, lng: 138.6007, speed: 11.3, heading: 315, destination: 'Port of Adelaide' },
  
  // South America
  { id: 71, name: 'Santos Steamer', type: 'cargo', lat: -23.9618, lng: -46.3322, speed: 12.6, heading: 45, destination: 'Port of Santos' },
  { id: 72, name: 'Rio Ranger', type: 'cargo', lat: -22.9068, lng: -43.1729, speed: 11.4, heading: 180, destination: 'Port of Rio de Janeiro' },
  { id: 73, name: 'Buenos Aires Barge', type: 'cargo', lat: -34.6118, lng: -58.3960, speed: 10.7, heading: 270, destination: 'Port of Buenos Aires' },
  { id: 74, name: 'Callao Cargo', type: 'cargo', lat: -12.0464, lng: -77.1428, speed: 13.2, heading: 90, destination: 'Port of Callao' },
  { id: 75, name: 'Valparaíso Vessel', type: 'cargo', lat: -33.0472, lng: -71.6127, speed: 12.1, heading: 225, destination: 'Port of Valparaíso' },
  { id: 76, name: 'Cartagena Carrier', type: 'cargo', lat: 10.3910, lng: -75.4794, speed: 11.8, heading: 135, destination: 'Port of Cartagena' },
  
  // Africa
  { id: 77, name: 'Durban Delivery', type: 'cargo', lat: -29.8587, lng: 31.0218, speed: 12.3, heading: 315, destination: 'Port of Durban' },
  { id: 78, name: 'Cape Town Clipper', type: 'cargo', lat: -33.9249, lng: 18.4241, speed: 11.6, heading: 45, destination: 'Port of Cape Town' },
  { id: 79, name: 'Alexandria Express', type: 'cargo', lat: 31.2001, lng: 29.9187, speed: 10.9, heading: 180, destination: 'Port of Alexandria' },
  { id: 80, name: 'Lagos Liner', type: 'cargo', lat: 6.4474, lng: 3.3903, speed: 12.8, heading: 270, destination: 'Port of Lagos' },
  { id: 81, name: 'Casablanca Cargo', type: 'cargo', lat: 33.5731, lng: -7.5898, speed: 11.2, heading: 90, destination: 'Port of Casablanca' },
  { id: 82, name: 'Mombasa Merchant', type: 'cargo', lat: -4.0435, lng: 39.6682, speed: 10.5, heading: 225, destination: 'Port of Mombasa' },
  
  // Ocean Transit - Atlantic
  { id: 14, name: 'Trans-Atlantic Cargo', type: 'cargo', lat: 35.0000, lng: -40.0000, speed: 17.2, heading: 75, destination: 'European Port' },
  { id: 15, name: 'Atlantic Tanker II', type: 'tanker', lat: 20.0000, lng: -30.0000, speed: 10.1, heading: 315, destination: 'Caribbean Port' },
  { id: 83, name: 'Mid-Atlantic Express', type: 'cargo', lat: 40.0000, lng: -25.0000, speed: 18.4, heading: 90, destination: 'European Port' },
  { id: 84, name: 'Caribbean Cruiser', type: 'passenger', lat: 18.0000, lng: -65.0000, speed: 16.7, heading: 180, destination: 'Caribbean Island' },
  { id: 85, name: 'South Atlantic Sailor', type: 'cargo', lat: -15.0000, lng: -20.0000, speed: 15.3, heading: 225, destination: 'African Port' },
  
  // Ocean Transit - Pacific
  { id: 16, name: 'Pacific Express', type: 'cargo', lat: 30.0000, lng: -150.0000, speed: 19.5, heading: 270, destination: 'Asian Port' },
  { id: 17, name: 'Island Hopper', type: 'passenger', lat: -10.0000, lng: 150.0000, speed: 14.3, heading: 180, destination: 'Pacific Island' },
  { id: 86, name: 'Trans-Pacific Giant', type: 'cargo', lat: 35.0000, lng: -140.0000, speed: 20.1, heading: 270, destination: 'Asian Port' },
  { id: 87, name: 'Hawaii Hauler', type: 'cargo', lat: 21.3099, lng: -157.8581, speed: 13.7, heading: 45, destination: 'Honolulu Port' },
  { id: 88, name: 'Fiji Ferry', type: 'passenger', lat: -17.7134, lng: 178.0650, speed: 15.8, heading: 225, destination: 'Suva Port' },
  
  // Ocean Transit - Indian Ocean
  { id: 18, name: 'Monsoon Cargo', type: 'cargo', lat: -20.0000, lng: 70.0000, speed: 15.7, heading: 45, destination: 'Indian Port' },
  { id: 19, name: 'Spice Route Tanker', type: 'tanker', lat: 5.0000, lng: 80.0000, speed: 8.9, heading: 135, destination: 'Sri Lankan Port' },
  { id: 89, name: 'Indian Ocean Express', type: 'cargo', lat: -25.0000, lng: 65.0000, speed: 16.4, heading: 315, destination: 'African Port' },
  { id: 90, name: 'Seychelles Sailor', type: 'yacht', lat: -4.6796, lng: 55.4920, speed: 12.3, heading: 180, destination: 'Seychelles' },
  
  // Arctic & Special Operations
  { id: 20, name: 'Arctic Explorer', type: 'auxiliary', lat: 70.0000, lng: -8.0000, speed: 5.4, heading: 90, destination: 'Arctic Research Station' },
  { id: 21, name: 'Military Patrol', type: 'military', lat: 36.0000, lng: 5.0000, speed: 22.1, heading: 180, destination: 'Naval Base' },
  { id: 22, name: 'Fishing Fleet Leader', type: 'fishing', lat: -45.0000, lng: -60.0000, speed: 3.8, heading: 270, destination: 'Fishing Grounds' },
  { id: 23, name: 'Unknown Vessel', type: 'unknown', lat: 0.0000, lng: 0.0000, speed: 0.0, heading: 0, destination: 'Unknown' },
  
  // Additional Fishing Vessels
  { id: 91, name: 'North Atlantic Fisher', type: 'fishing', lat: 55.0000, lng: -30.0000, speed: 4.2, heading: 180, destination: 'Fishing Grounds' },
  { id: 92, name: 'Bering Sea Trawler', type: 'fishing', lat: 60.0000, lng: -175.0000, speed: 5.1, heading: 270, destination: 'Fishing Grounds' },
  { id: 93, name: 'Mediterranean Fisher', type: 'fishing', lat: 38.0000, lng: 15.0000, speed: 3.9, heading: 90, destination: 'Fishing Grounds' },
  
  // Additional Yachts & Luxury Vessels
  { id: 94, name: 'Caribbean Yacht', type: 'yacht', lat: 14.6413, lng: -61.0194, speed: 22.5, heading: 135, destination: 'Martinique' },
  { id: 95, name: 'Riviera Racer', type: 'yacht', lat: 43.5528, lng: 7.0174, speed: 28.3, heading: 90, destination: 'French Riviera' },
  { id: 96, name: 'Aegean Explorer', type: 'yacht', lat: 37.0000, lng: 25.0000, speed: 19.7, heading: 225, destination: 'Greek Islands' },
  
  // Additional Tugs & Support Vessels
  { id: 97, name: 'Panama Canal Tug', type: 'tug', lat: 9.0820, lng: -79.6825, speed: 3.5, heading: 90, destination: 'Panama Canal' },
  { id: 98, name: 'Suez Canal Assist', type: 'tug', lat: 30.5234, lng: 32.3426, speed: 4.1, heading: 180, destination: 'Suez Canal' },
  { id: 99, name: 'Port Pilot Boat', type: 'tug', lat: 40.4406, lng: -74.0594, speed: 8.7, heading: 315, destination: 'New York Harbor' },
  { id: 100, name: 'Emergency Response', type: 'auxiliary', lat: 51.4975, lng: 0.0000, speed: 15.6, heading: 45, destination: 'Thames Emergency' },
];

// Custom vessel icon component
const createVesselIcon = (type: keyof typeof SHIP_TYPES, heading: number) => {
  const shipType = SHIP_TYPES[type];
  return L.divIcon({
    html: `
      <div style="
        transform: rotate(${heading}deg);
        color: ${shipType.color};
        font-size: 16px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
      ">
        ${shipType.symbol}
      </div>
    `,
    className: 'custom-vessel-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Custom port icon component
const createPortIcon = (category: 'major' | 'minor' = 'major') => {
  const isMajor = category === 'major';
  const size = isMajor ? 24 : 18;
  const iconSize = isMajor ? 18 : 14;
  const borderWidth = isMajor ? 2 : 1;
  
  return L.divIcon({
    html: `
      <div style="
        color: #2563eb;
        font-size: ${iconSize}px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255,255,255,0.9);
        border-radius: 50%;
        border: ${borderWidth}px solid #2563eb;
        opacity: ${isMajor ? 1 : 0.8};
      ">
        ⚓
      </div>
    `,
    className: `custom-port-icon ${category}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Map control component
const MapControls = () => {
  const map = useMap();

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  const handleReset = () => {
    map.setView([20, 0], 2);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <Button size="sm" variant="outline" onClick={handleZoomIn} className="bg-white">
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={handleZoomOut} className="bg-white">
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={handleReset} className="bg-white">
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};

interface VesselTrackerProps {
  onClose?: () => void;
}

export const VesselTracker: React.FC<VesselTrackerProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(
    new Set(Object.keys(SHIP_TYPES))
  );
  const [showMajorPorts, setShowMajorPorts] = useState(true);
  const [showMinorPorts, setShowMinorPorts] = useState(true);
  const [filteredVessels, setFilteredVessels] = useState(VESSELS);

  useEffect(() => {
    const filtered = VESSELS.filter(vessel => selectedTypes.has(vessel.type));
    setFilteredVessels(filtered);
  }, [selectedTypes]);

  const visiblePorts = PORTS.filter(port => 
    (port.category === 'major' && showMajorPorts) || 
    (port.category === 'minor' && showMinorPorts)
  );

  const majorPorts = PORTS.filter(p => p.category === 'major');
  const minorPorts = PORTS.filter(p => p.category === 'minor');

  const handleTypeToggle = (type: string) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(type)) {
      newSelected.delete(type);
    } else {
      newSelected.add(type);
    }
    setSelectedTypes(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedTypes(new Set(Object.keys(SHIP_TYPES)));
  };

  const handleUnselectAll = () => {
    setSelectedTypes(new Set());
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="h-16 border-b bg-blue-600 text-white flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-blue-700 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="h-6 w-px bg-blue-400"></div>
          <h1 className="text-xl font-bold">VESSEL FILTERS</h1>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-700">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 border-r bg-white overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Filter Controls */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button size="sm" variant="outline" onClick={handleUnselectAll}>
                  Unselect All
                </Button>
              </div>
            </div>

            {/* Vessel Type Filters */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Vessel Type</h3>
              <div className="space-y-3">
                {Object.entries(SHIP_TYPES).map(([type, config]) => (
                  <div key={type} className="flex items-center space-x-3">
                    <Checkbox
                      id={type}
                      checked={selectedTypes.has(type)}
                      onCheckedChange={() => handleTypeToggle(type)}
                    />
                    <div 
                      className="w-4 h-4 flex items-center justify-center text-xs font-bold"
                      style={{ color: config.color }}
                    >
                      {config.symbol}
                    </div>
                    <label htmlFor={type} className="text-sm cursor-pointer flex-1">
                      {config.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Port Display Toggle */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-sm">Port Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="show-major-ports"
                    checked={showMajorPorts}
                    onCheckedChange={(checked) => setShowMajorPorts(checked === true)}
                  />
                  <div className="w-4 h-4 flex items-center justify-center text-sm font-bold text-blue-600">
                    ⚓
                  </div>
                  <label htmlFor="show-major-ports" className="text-sm cursor-pointer flex-1">
                    Major Ports ({majorPorts.length})
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="show-minor-ports"
                    checked={showMinorPorts}
                    onCheckedChange={(checked) => setShowMinorPorts(checked === true)}
                  />
                  <div className="w-4 h-4 flex items-center justify-center text-xs font-bold text-blue-600 opacity-80">
                    ⚓
                  </div>
                  <label htmlFor="show-minor-ports" className="text-sm cursor-pointer flex-1">
                    Minor Ports ({minorPorts.length})
                  </label>
                </div>
              </div>
            </div>

            {/* Active Vessels Count */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {filteredVessels.length} of {VESSELS.length} vessels
              </p>
              <p className="text-sm text-muted-foreground">
                {visiblePorts.length} of {PORTS.length} ports displayed
              </p>
              {(showMajorPorts || showMinorPorts) && (
                <p className="text-xs text-muted-foreground mt-1">
                  {showMajorPorts ? `${majorPorts.length} major` : '0 major'} • {showMinorPorts ? `${minorPorts.length} minor` : '0 minor'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <MapControls />
            
            {/* Vessel Markers */}
            {filteredVessels.map((vessel) => (
              <Marker
                key={`vessel-${vessel.id}`}
                position={[vessel.lat, vessel.lng]}
                icon={createVesselIcon(vessel.type as keyof typeof SHIP_TYPES, vessel.heading)}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold text-sm mb-2">{vessel.name}</h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <Badge 
                          variant="outline" 
                          style={{ borderColor: SHIP_TYPES[vessel.type as keyof typeof SHIP_TYPES].color }}
                        >
                          {SHIP_TYPES[vessel.type as keyof typeof SHIP_TYPES].label}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span>{vessel.speed} kts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heading:</span>
                        <span>{vessel.heading}°</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Destination:</span>
                        <span className="text-right">{vessel.destination}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Port Markers */}
            {visiblePorts.map((port) => (
              <Marker
                key={`port-${port.id}`}
                position={[port.lat, port.lng]}
                icon={createPortIcon(port.category as 'major' | 'minor')}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold text-sm mb-2 text-blue-700">
                      ⚓ {port.name}
                      <Badge 
                        variant="outline" 
                        className="ml-2 text-xs border-blue-500 text-blue-700"
                      >
                        {port.category}
                      </Badge>
                    </h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Country:</span>
                        <span className="font-medium">{port.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <Badge variant="outline" className="text-xs border-blue-500 text-blue-700">
                          {port.type} Port
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Coordinates:</span>
                        <span className="text-xs text-muted-foreground">
                          {port.lat.toFixed(2)}°, {port.lng.toFixed(2)}°
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
