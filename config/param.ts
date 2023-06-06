export const SITE = {
  title: '博客',
  author: 'Arvin',
  description: '记录 Arvin 的不枯燥生活',
  keywords: 'Arvin,Pinky-pig,Blog,前端,Vue',
  icon: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imageslogo.svg',
  pic: 'https://cdn.fliggy.coblogPagem/upic/2XFNGI.png',
  homePage: '/',
  profilePage: '/profile',
  twitterId: 'ArvinnWang',
  githubId: 'pinky-pig',
  repo: 'pinky-pig/what-is-my-astro-blog',
  notion: 'https://hail-manatee-fc5.notion.site/a3d8b723782e48a3b3570980e83c70ae?v=0c510fa996e2492b943e7746c1bd9974',
}

export const navFilter = [
  { label: '项目', route: '/' },
  { label: '文章', route: '/blog' },
  { label: '归档', route: '/archives' },
]

export enum UnsplashSetting {
  ApplicationName = 'what-is-my-new-tab',
  AccessKey = 'KM1kMtcaYX2SZQR1m_o-pwg4RJZUVivPZgfJsbw5h2o',
  SecretKey = 'ma572d0k1fKQIBlLm49h9k3A7np9X_ezS1hfu4Upaeo',
}

export enum MapboxSetting {
  token = 'pk.eyJ1IjoicGlua3ktcGlnIiwiYSI6ImNsZnJvZ2Q1cDAwZ3ozcG56bXFwbjAzZjAifQ.eEOFvRbKqZHQ3OxeqPBsXw',
  mapLightStyle = 'mapbox://styles/pinky-pig/clgc32u1e004g01n2bitvj86a',
  mapDarkStyle = 'mapbox://styles/pinky-pig/clft35kll000o01osk8svnlfg',
}
