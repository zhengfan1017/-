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
      script.src = 'https://webapi.amap.com/maps?v=2.0&key=37c80d68fb16c2c0414980d05d533d3d';
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current) return;
      
      mapInstanceRef.current = new window.AMap.Map(mapRef.current, {
        zoom: 14,
        center: [123.43, 41.81], // 沈阳皇姑区黄河北大街位置
        viewMode: '2D',
        mapStyle: 'amap://styles/normal'
      });

      // 添加用户当前位置标记
      const userMarker = new window.AMap.Marker({
        position: [123.43, 41.81],
        title: '我的位置',
        label: {
          content: '📍 我的位置',
          direction: 'top'
        },
        icon: new window.AMap.Icon({
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIGZpbGw9IiMwMEU1RkYiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iOCIgZmlsbD0iIzAwODhGRiIvPgo8L3N2Zz4K',
          size: new window.AMap.Size(40, 40),
          imageSize: new window.AMap.Size(40, 40)
        })
      });
      mapInstanceRef.current.add(userMarker);

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
