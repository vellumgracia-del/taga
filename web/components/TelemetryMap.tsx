"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon issue di React Leaflet dengan Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Komponen helper agar peta mengikuti perubahan koordinat
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), {
      animate: true,
      duration: 1.5
    });
  }, [center, map]);
  return null;
}

interface TelemetryMapProps {
  lat: number;
  lng: number;
}

export default function TelemetryMap({ lat, lng }: TelemetryMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400 text-sm">Memuat Peta...</div>;

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm border border-gray-200">
      <MapContainer 
        center={[lat, lng]} 
        zoom={15} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <div className="font-poppins font-bold text-taniga-pine">Lokasi Truk Kargo</div>
            <div className="text-xs text-gray-500">Akurasi GPS Tinggi</div>
          </Popup>
        </Marker>
        <MapUpdater center={[lat, lng]} />
      </MapContainer>
    </div>
  );
}
