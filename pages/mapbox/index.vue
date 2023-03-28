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
  el.innerHTML = '<logo-marker name="http://placekitten.com/60/60" />'
  new mapboxgl.Marker(el)
    .setLngLat([118.888175, 32.048268] as LngLatLike)
    .addTo(map!)
})
onUnmounted(() => {
  map!.remove()
})
</script>

<template>
  <div ref="mapContainer" style="width: 672px; height: 435px;" />
</template>

<style scoped>

</style>
