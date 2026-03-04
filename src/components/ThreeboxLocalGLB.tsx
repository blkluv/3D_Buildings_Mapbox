import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import { MAPBOX_ACCESS_TOKEN } from '../config/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

declare global {
  interface Window {
    tb: any;
  }
}

const ThreeboxLocalGLB: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11', // Professional CRE Style
      center: [-84.4230, 33.6550], // Centered on Atlanta Airport Hub
      zoom: 10,
      pitch: 60,
      bearing: -10,
      antialias: true
    });

    mapRef.current.on('style.load', async () => {
      if (!mapRef.current) return;

      // 1. Fetch all 769 locations from the public JSON file
      const response = await fetch('/warehouses.json');
      const warehouseData = await response.json();

      mapRef.current.addLayer({
        id: 'custom-threebox-models',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function () {
          window.tb = new Threebox(
            mapRef.current!,
            mapRef.current!.getCanvas().getContext('webgl')!,
            { defaultLights: true }
          );

          const options = {
            obj: '/cantina5.0.glb',
            type: 'glb',
            scale: 1,
            units: 'meters',
            billboard: false
          };

          // 2. Loop through the FULL list of locations
          warehouseData.forEach((location: any) => {
            window.tb.loadObj(options, (model: any) => {
              model.setCoords([location.lng, location.lat, 0]);
              model.rotation.x = 0;
              model.rotation.y = 0;
              model.rotation.z = Math.random() * 360 * (Math.PI / 180);
              model.updateMatrix();
              window.tb.add(model);

              // Add Interactive Popups for each of the 769 sites
              new mapboxgl.Popup({ closeButton: false, offset: 30 })
                .setLngLat([location.lng, location.lat])
                .setHTML(`<strong>${location.name}</strong>`)
                .addTo(mapRef.current!);
            });
          });
        },
        render: function () {
          if (window.tb) {
            window.tb.update();
          }
        }
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    </div>
  );
};

export default ThreeboxLocalGLB;
