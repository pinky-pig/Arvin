import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'

export function addMarkerToMapbox(map: mapboxgl.Map) {
  const el = document.createElement('div')
  el.innerHTML = `<logo-marker name="${'/logo.svg'}" />`
  new mapboxgl.Marker(el, {
    anchor: 'bottom',
    offset: [0, -20],
    draggable: true,
  })
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h1>Arvin</h1>'),
    )
    .setLngLat([118.888175, 32.048268] as LngLatLike)
    .addTo(map!)
}
export function addFogToMapbox(map: mapboxgl.Map) {
  map!.setFog({
    'range': [-1, 2],
    'horizon-blend': 0.3,
    'color': 'white',
    // 'high-color': '#add8e6',
    // 'space-color': '#d8f2ff',
    // 'star-intensity': 0.0,
  })

  // map!.setFog({
  //   'range': [1.0, 8.0],
  //   'color': [
  //     'interpolate',
  //     ['cubic-bezier', 0.2, 0.4, 0.6, 0.8],
  //     ['heatmap-density'],
  //     0.2,
  //     'rgb(103,169,207)',
  //     0.4,
  //     'rgb(209,229,240)',
  //     0.6,
  //     'rgb(255,219,199)',
  //     0.8,
  //     'rgb(255,255,25)',
  //     1,
  //     'rgb(255,255,255)',
  //   ],
  //   'horizon-blend': 0.01,
  // })
}
export function addlayerToMapbox(map: mapboxgl.Map) {
  map!.addLayer(
    {
      'id': 'add-3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height'],
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height'],
        ],
        'fill-extrusion-opacity': 0.6,
      },
    },
  )
}
