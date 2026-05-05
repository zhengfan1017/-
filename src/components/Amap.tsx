
import { useEffect, useRef } from 'react';
import { DogWalk } from '../types/dogWalk';

interface AmapProps {
  dogWalks: DogWalk[];
}

declare global {
  interface Window {
    AMap: any;
    initAMap: () =&gt; void;
  }
}

export function Amap({ dogWalks }: AmapProps) {
  const mapRef = useRef&lt;HTMLDivElement&gt;(null);
  const mapInstanceRef = useRef&lt;any&gt;(null);

  useEffect(() =&gt; {
    if (!window.AMap) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://webapi.amap.com/maps?v=2.0&amp;key=YOUR_AMAP_KEY';
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
      
      dogWalks.forEach((walk) =&gt; {
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
            &lt;div style="padding: 10px;"&gt;
              &lt;h3 style="margin: 0 0 8px 0;"&gt;${walk.userName}&lt;/h3&gt;
              &lt;p style="margin: 4px 0;"&gt;🐕 ${walk.dogName} (${walk.dogType})&lt;/p&gt;
              &lt;p style="margin: 4px 0;"&gt;📍 ${walk.location}&lt;/p&gt;
              &lt;p style="margin: 4px 0;"&gt;📅 ${walk.date} ${walk.time}&lt;/p&gt;
            &lt;/div&gt;
          `
        });

        marker.on('click', () =&gt; {
          infoWindow.open(mapInstanceRef.current, marker.getPosition());
        });

        mapInstanceRef.current.add(marker);
      });
    }

    return () =&gt; {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [dogWalks]);

  return (
    &lt;div
      ref={mapRef}
      style={{ width: '100%', height: '400px', borderRadius: '12px' }}
    /&gt;
  );
}

