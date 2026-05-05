import { useEffect, useRef } from 'react';
import { DogWalk } from '../types/dogWalk';

interface AmapProps {
  dogWalks: DogWalk[];
}

declare global {
  interface Window {
    AMap: any;
    initAMap: () => void;
  }
}

export function Amap({ dogWalks }: AmapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!window.AMap) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://webapi.amap.com/maps?v=2.0&key=YOUR_AMAP_KEY';
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current) return;
      
      mapInstanceRef.current = new window.AMap.Map(mapRef.current, {
        zoom: 12,
        center: [116.4074, 39.9042],
        viewMode: '2D',
        mapStyle: 'amap://styles/normal'
      });

      addMarkers();
    }

    function addMarkers() {
      if (!mapInstanceRef.current) return;
      
      dogWalks.forEach((walk) => {
        const marker = new window.AMap.Marker({
          position: [walk.longitude, walk.latitude],
          title: `${walk.userName} - ${walk.dogName}`,
          label: {
            content: `🐕 ${walk.dogName}`,
            direction: 'top'
          }
        });
        
        const infoWindow = new window.AMap.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 8px 0;">${walk.userName}</h3>
              <p style="margin: 4px 0;">🐕 ${walk.dogName} (${walk.dogType})</p>
              <p style="margin: 4px 0;">📍 ${walk.location}</p>
              <p style="margin: 4px 0;">📅 ${walk.date} ${walk.time}</p>
            </div>
          `
        });

        marker.on('click', () => {
          infoWindow.open(mapInstanceRef.current, marker.getPosition());
        });

        mapInstanceRef.current.add(marker);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [dogWalks]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '400px', borderRadius: '12px' }}
    />
  );
}
