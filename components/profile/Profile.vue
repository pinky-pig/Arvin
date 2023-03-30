<script setup lang="ts">
const iconRef = ref<HTMLElement | null>(null)
const currentAvatar = ref('Arvin')
const handleSwitch = () => {
  currentAvatar.value = currentAvatar.value === 'Arvin' ? 'Arvin2' : 'Arvin'
}
</script>

<template>
  <Card>
    <div class="p-10 relative">
      <img class="w-96px h-96px mb-8 dark:bg-[var(--card--border)] rounded-full" src="/logo.png" alt="">

      <p style="z-index:1" class="intro-text">
        I’m
        <span style="font-family:Moranga Bold;font-size:40px">Arvin</span>
        , a front-end developer from Nanjing. I'm interested in Vue, Web Components, Drag, and Music.
      </p>

      <button class="switch-btn" @click="handleSwitch">
        <div ref="iconRef" class="icon" :class="currentAvatar === 'Arvin' ? 'icon_rotate_one' : 'icon_rotate_two'" style="transform: rotate(0);">
          <svg
            width="15.702"
            height="15.702"
            viewBox="0 0 15.702 15.702"
          >
            <g transform="translate(2.62 2.617)">
              <path d="M14.8,12.032a5.229,5.229,0,0,1-9.824,2.482" transform="translate(-4.34 -6.777)" fill="none" stroke="#F0F2F8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
              <path d="M4,9.149A5.231,5.231,0,0,1,13.83,6.731" transform="translate(-4.004 -4)" fill="none" stroke="#F0F2F8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
              <path d="M15.953,6.952h2.313V4.639" transform="translate(-8.135 -4.221)" fill="none" stroke="#F0F2F8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
              <path d="M6.825,15.825H4.512v2.313" transform="translate(-4.18 -8.088)" fill="none" stroke="#F0F2F8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
            </g>
            <path id="Path_9" data-name="Path 9" d="M0,0H15.7V15.7H0Z" fill="none" />
          </svg>
        </div>
        <p class="text">
          Toggle Arvin
        </p>
      </button>
    </div>
  </Card>
</template>

<style scoped>
.intro-text{
  text-align: start;
  font-size: 15px;
  font-family: "Silka Regular";
  line-height: 26px;
  letter-spacing: 0.5px;
  font-weight: 400;
  color: var(--text-color);
}
.switch-btn{
  box-shadow: rgb(48, 54, 61) 0px 0px 0px 2px;
  position: absolute;
  height: 36px;
  padding: 0px 12px;
  top: 20px;
  right: 20px;
  border: none;
  border-radius: 18px;
  background: transparent;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transition: all 0.2s ease-out 0s;
  will-change: box-shadow, transform;
  gap: 10px;
}
.switch-btn:hover{
  cursor: pointer;
  transition: box-shadow 0.2s ease-out 0s;
  box-shadow: rgb(48, 54, 61) 0px 0px 0px 5px;
}
.switch-btn .icon{
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

}
.switch-btn .text{
  line-height: normal;
  font-size: 14px;
  font-family: "Silka Medium";
  line-height: 24px;
  letter-spacing: 0.25px;
  font-weight: 400;
  color: rgb(240, 242, 248);
  margin-left: 6px;
}

.icon_rotate_one{
  animation: rotation .5s cubic-bezier(0.42, 0, 1, 1) forwards;
  transform: rotate(180deg);
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
.icon_rotate_two{
  animation: rotation-reverse .5s cubic-bezier(0.42, 0, 1, 1) forwards;
  transform: rotate(180deg);
}
@keyframes rotation-reverse {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
