<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'
import './lit-logo-marker'
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { MapboxSetting } from '~~/config/param'

const mapContainer = ref(null)
let map: mapboxgl.Map | null = null
onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [118.888175, 32.048268],
    zoom: 15,
    accessToken: MapboxSetting.token,
  })

  const el = document.createElement('div')
  el.className = 'marker'
  el.style.backgroundImage = 'url(https://placekitten.com/g/60/60/)'
  el.style.width = '60px'
  el.style.height = '60px'
  el.style.backgroundSize = '100%'
  new mapboxgl.Marker(el)
    .setLngLat([118.888175, 32.048268] as LngLatLike)
    .addTo(map!)
})
// console.log(customElements, 'customElements ')
onUnmounted(() => {
  map!.remove()
})
</script>

<template>
  <logo-marker />
  <div ref="mapContainer" style="width: 672px; height: 435px;" />
</template>

<style scoped>

</style>
