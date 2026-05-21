"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationPickerProps {
  initialLat?: number;
  initialLng?: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ position, setPosition, onLocationSelect }: any) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latlng = marker.getLatLng();
          setPosition(latlng);
          onLocationSelect(latlng.lat, latlng.lng);
        }
      },
    }),
    [setPosition, onLocationSelect],
  );

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customIcon}
    >
      <Popup>Pindahkan pin atau klik peta untuk menyesuaikan.</Popup>
    </Marker>
  );
}

export default function LocationPickerMap({ initialLat = -6.200000, initialLng = 106.816666, onLocationSelect }: LocationPickerProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<any>({ lat: initialLat, lng: initialLng });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-56 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 text-xs">Memuat Peta...</div>;

  return (
    <div className="w-full h-56 rounded-xl overflow-hidden shadow-inner border border-gray-200">
      <MapContainer center={[initialLat, initialLng]} zoom={13} scrollWheelZoom={true} className="w-full h-full relative z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
}
