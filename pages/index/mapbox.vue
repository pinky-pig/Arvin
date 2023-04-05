<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { MapboxSetting } from '~~/config/param'
const color = useColorMode()

definePageMeta({
  title: 'Mapbox',
  subtitle: '地图组件',
  key: route => route.fullPath,
  keepalive: true,
})
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
    el.innerHTML = `<logo-marker name="${'/logo.svg'}" />`
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
  map?.remove()
})
watch(() => color.value, () => {
  map?.setStyle(color.value === 'dark' ? MapboxSetting.mapDarkStyle : MapboxSetting.mapLightStyle)
})

const router = useRouter()
const bubbleCardRef = ref<HTMLElement | null>(null)
function toHome() {
  bubbleCardRef.value && (bubbleCardRef.value as any).bubble(1)

  setTimeout(() => {
    router.push('/')
  }, 600)
}

function test() {
  // eslint-disable-next-line no-console
  console.log('test')
}
</script>

<template>
  <BubbleCard ref="bubbleCardRef">
    <template #icon>
      <div class="return-arrow" @click="toHome">
        <div i-carbon:direction-loop-left />
      </div>
    </template>
    <template #title>
      Mapbox
    </template>

    <div class="mapbox-container w-full h-full flex justify-center items-center">
      <div ref="mapContainer" class="map rounded-3xl w-672px h-435px" />
    </div>

    <template #bottom>
      <div class="bottom w-full flex justify-center items-center">
        <Dockbar>
          <DockbarItem :has-divide-line="false" tooltip="tooltip" @click="test">
            <div i-carbon:earth-southeast-asia class=" text-[var(--dockbar-text)] w-full h-full" />
          </DockbarItem>
          <DockbarItem :has-divide-line="true" tooltip="tooltip" @click="test">
            <div i-carbon:location class=" text-[var(--dockbar-text)] w-full h-full" />
          </DockbarItem>
          <DockbarItem :has-divide-line="false" tooltip="tooltip" @click="test">
            <div i-carbon:settings class=" text-[var(--dockbar-text)] w-full h-full" />
          </DockbarItem>
        </Dockbar>
      </div>
    </template>
  </BubbleCard>
</template>

<style scoped>
.map{
  transform: translateY(0); /* ios map 圆角 不生效解决方案 */
  overflow: hidden;
  background-color: var(--card--bg);
  border-color: var(--card--border);
  border-width: 2px;
  border-style: solid;
}
.return-arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: 14px;
  border-radius: 18px;
  color: var(--text-color);
  background: var(--card--bg);
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}
.return-arrow:hover{
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
</style>
