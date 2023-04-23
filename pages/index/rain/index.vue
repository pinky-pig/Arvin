<script setup lang="ts">
import * as THREE from 'three'
import Settings from './settings.vue'

const settings = { fps: 30, parallaxVal: 1 }
let scene: any, camera: any, renderer: any, material: any
let videoElement: any
let clock = new THREE.Clock()

async function init() {
  const container = document.getElementById('rainContainer')
  renderer = new THREE.WebGLRenderer({
    antialias: false,
  })
  // renderer.setSize(
  //   (document.querySelector('.rain-node') as HTMLElement).offsetWidth,
  //   (document.querySelector('.rain-node') as HTMLElement).offsetHeight,
  // )
  renderer.setSize(window.innerWidth, window.innerHeight, 2)
  container!.appendChild(renderer.domElement)
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  material = new THREE.ShaderMaterial({
    uniforms: {
      u_tex0: { type: 't' },
      u_time: { value: 0, type: 'f' },
      u_intensity: { value: 0.4, type: 'f' },
      u_speed: { value: 0.25, type: 'f' },
      u_brightness: { value: 0.8, type: 'f' },
      u_normal: { value: 0.5, type: 'f' },
      u_zoom: { value: 2.61, type: 'f' },
      u_blur_intensity: { value: 0.5, type: 'f' },
      u_blur_iterations: { value: 16, type: 'i' },
      u_panning: { value: false, type: 'b' },
      u_post_processing: { value: true, type: 'b' },
      u_lightning: { value: false, type: 'b' },
      u_texture_fill: { value: true, type: 'b' },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: 'v2' },
      u_tex0_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: 'v2' },
    } as any,
    vertexShader: `
      varying vec2 vUv;        
      void main() {
          vUv = uv;
          gl_Position = vec4( position, 1.0 );    
      }
    `,
  })
  material.fragmentShader = await (await fetch('/rain/rain.frag')).text()

  new THREE.TextureLoader().load('/rain/image.jpg', (tex: any) => {
    material.uniforms.u_tex0_resolution.value = new THREE.Vector2(tex.image.width, tex.image.height)
    material.uniforms.u_tex0.value = tex
  })

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 1, 1), material)
  scene.add(quad)
}

function render() {
  setTimeout(() => {
    requestAnimationFrame(render)
  }, 1000 / settings.fps)

  // reset every 6hr
  if (clock.getElapsedTime() > 21600)
    clock = new THREE.Clock()
  material.uniforms.u_time.value = clock.getElapsedTime()

  renderer.render(scene, camera)
}

onMounted(() => {
  init()
  render()

  window.addEventListener('resize', (_e) => {
    // renderer.setSize(
    //   (document.querySelector('.rain-node') as HTMLElement).offsetWidth,
    //   (document.querySelector('.rain-node') as HTMLElement).offsetHeight,
    // )
    renderer.setSize(window.innerWidth, window.innerHeight, 2)
    material.uniforms.u_resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
  })
})

const rainSettings = reactive({
  intensityValue: 0.4,
  speedValue: 0.4,
  brightnessValue: 0.8,
  normalValue: 0.5,
  zoomValue: 2.61,
  lightningValue: false,
})
watch(rainSettings, () => {
  material.uniforms.u_intensity.value = rainSettings.intensityValue
  material.uniforms.u_speed.value = rainSettings.speedValue
  material.uniforms.u_brightness.value = rainSettings.brightnessValue
  material.uniforms.u_normal.value = rainSettings.normalValue
  material.uniforms.u_zoom.value = rainSettings.zoomValue
  material.uniforms.u_lightning.value = rainSettings.lightningValue
})

const backgroundSettings = reactive({
  blurQualityValue: 16,
  blurValue: 0.5,
  parallaxValue: 1,
  scaleToFillValue: true,
  panningValue: false,
  postProcessingValue: true,
})
watch(backgroundSettings, () => {
  material.uniforms.u_blur_iterations.value = backgroundSettings.blurQualityValue
  material.uniforms.u_blur_intensity.value = backgroundSettings.blurValue
  settings.parallaxVal = backgroundSettings.parallaxValue
  material.uniforms.u_texture_fill.value = backgroundSettings.scaleToFillValue
  material.uniforms.u_panning.value = backgroundSettings.panningValue
  material.uniforms.u_post_processing.value = backgroundSettings.postProcessingValue
})

const renderSettings = reactive({
  fps: 30,
})
watch(renderSettings, () => {
  settings.fps = renderSettings.fps
})

function changeBackground() {
  document.getElementById('filePicker')!.addEventListener('change', function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    if ((this as any).files[0] === undefined)
      return
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const file = (this as any).files[0]
    if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
      disposeVideoElement(videoElement)
      material.uniforms.u_tex0.value?.dispose()

      new THREE.TextureLoader().load(URL.createObjectURL(file), (tex: any) => {
        material.uniforms.u_tex0.value = tex
        material.uniforms.u_tex0_resolution.value = new THREE.Vector2(tex.image.width, tex.image.height)
      })
    }
    else if (file.type === 'video/mp4' || file.type === 'video/webm') {
      disposeVideoElement(videoElement)
      material.uniforms.u_tex0.value?.dispose()

      videoElement = createVideoElement(URL.createObjectURL(file))
      const videoTexture = new THREE.VideoTexture(videoElement)
      videoElement.addEventListener(
        'loadedmetadata',
        (e: any) => {
          material.uniforms.u_tex0_resolution.value = new THREE.Vector2(
            videoTexture.image.videoWidth,
            videoTexture.image.videoHeight,
          )
        },
        false,
      )
      material.uniforms.u_tex0.value = videoTexture
    }
  })

  document.getElementById('filePicker')!.click()
}

function createVideoElement(src: any) {
  const htmlVideo = document.createElement('video')
  htmlVideo.src = src
  htmlVideo.muted = true
  htmlVideo.loop = true
  htmlVideo.play()
  return htmlVideo
}
function disposeVideoElement(video: any) {
  if (video != null && video.hasAttribute('src')) {
    video.pause()
    video.removeAttribute('src') // empty source
    video.load()
  }
}

const isShowRainSettings = ref(false)
function handleIsOpenSettingsPanel() {
  isShowRainSettings.value = !isShowRainSettings.value
}

defineExpose({
  isShowRainSettings,
  handleIsOpenSettingsPanel,
})

definePageMeta({
  title: 'Mapbox',
  subtitle: '地图组件',
  key: route => route.fullPath,
  keepalive: true,
})
const router = useRouter()
const bubbleCardRef = ref<HTMLElement | null>(null)
function toHome() {
  bubbleCardRef.value && (bubbleCardRef.value as any).bubble(1)

  setTimeout(() => {
    router.push('/')
  }, 600)
}
</script>

<template>
  <BubbleCard ref="bubbleCardRef" :has-animation="true">
    <template #icon>
      <div class="return-arrow" @click="toHome">
        <div i-carbon:direction-loop-left />
      </div>
    </template>
    <template #title>
      Mapbox
    </template>

    <template #operate-button>
      <DarkToggle />
    </template>

    <div
      class="
        rain-node
        overflow-hidden
        bg-[var(--card--placeholder-bg)]
        w-full h-full
        flex justify-center items-center
        rounded-3xl
        "
    >
      <div class="overflow-hidden">
        <div id="rainContainer" />
        <input id="filePicker" type="file" accept=".jpg, .jpeg, .png, .mp4, .webm" style="visibility: hidden">

        <Settings
          v-if="true"
          :rain-settings="rainSettings"
          :background-settings="backgroundSettings"
          :render-settings="renderSettings"
          @changeBackground="changeBackground"
        />
      </div>
    </div>
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
.bottom{
  position: fixed;
  bottom: 30px;
  left: 0px;
  width: 100%;
}
.menu{
  position: fixed;
  bottom: 120px;
  left: 30px;
  width: 300px;
  height: 200px;
  background: var(--dockbar-placeholder-bg);
  border-radius: 20px;
}
</style>
