---
date: 2023/06/13
desc: 是想页面路由跳转做个从下往上的动画，但是不改变父页面的。于是便学习嵌套路由来完成这个操作。
tags: ['#Nuxt']
cover: https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagesnest-route.gif
---

<img loading="lazy" decoding="async" data-nimg="fill" src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagesnest-route.gif" width=800/>  

<small>是想页面路由跳转做个从下往上的动画，但是不改变父页面的。于是便学习嵌套路由来完成这个操作。</small>  

**原因**

在设置路由动画 `slide` 的时候，感觉有点千篇一律了，然后在浏览到 [react.gg](https://react.gg/) 的时候，觉得这个从下往上弹出的效果还可以，挺适合我这个首页的，于是便尝试着实现一下。

**实现**

- Nuxt 嵌套路由
- Keyframes 动画
- 路由等动画结束后再跳转返回
