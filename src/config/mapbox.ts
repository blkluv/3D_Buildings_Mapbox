export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWl0cmkyMiIsImEiOiJjbTVubGQ4OXkwYm5vMmpzODFuaHQzeG05In0.Eo4oFInnAE9TI0HuM87Tog';

export const DEFAULT_MAP_CONFIG = {
  style: 'mapbox://styles/mapbox/light-v11', 
  center: [-84.4230, 33.6550] as [number, number], 
  zoom: 10.5, 
  pitch: 60, 
  bearing: -10,
  antialias: true
};

export const MAP_STYLES = {
  streets: 'mapbox://styles/mapbox/streets-v12',
  outdoors: 'mapbox://styles/mapbox/outdoors-v12',
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v12'
};
