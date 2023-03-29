<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { MapboxSetting } from '~~/config/param'
const color = useColorMode()

const mapContainer = ref(null)
let map: mapboxgl.Map | null = null
onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: color.value === 'dark' ? MapboxSetting.mapDarkStyle : MapboxSetting.mapLightStyle,
    center: [118.888175, 32.048268],
    zoom: 0,
    accessToken: MapboxSetting.token,
    antialias: true,
    pitch: 45,
    bearing: -17.6,
  })

  map.on('load', () => {
    const el = document.createElement('div')
    el.innerHTML = '<logo-marker />'
    new mapboxgl.Marker(el, {
      anchor: 'bottom',
      offset: [0, -20],
      draggable: true,
      // rotationAlignment: 'map',
    })
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<h1>Arvin</h1>'),
      )
      .setLngLat([118.888175, 32.048268] as LngLatLike)
      .addTo(map!)
    map!.addSource('earthquakes', {
      type: 'geojson',
      data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
    })

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

    // map!.flyTo({
    //   center: [138.7186086, 35.3606247],
    //   zoom: 12,
    //   duration: 10000,
    //   essential: true,
    //   pitch: 75,
    // })
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
  })
})
onUnmounted(() => {
  map!.remove()
})

watch(() => color.value, () => {
  map?.setStyle(color.value === 'dark' ? MapboxSetting.mapDarkStyle : MapboxSetting.mapLightStyle)
})
</script>

<template>
  <div ref="mapContainer" style="width: 672px; height: 435px;" />
</template>

<style scoped>

</style>
