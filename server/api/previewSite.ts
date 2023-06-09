export default defineEventHandler(async () => {
  return {
    status: 0,
    info: '',
    data: {
      url: '',
      base64String: '',
    },
  }
})

// async function takeScreenshot(site = 'https://www.baidu.com') {
//   try {
//     // 启动 Chromium 浏览器
//     // 第一步：启动浏览器并打开新页面
//     const browser = await playwright.chromium.launch({
//       args: chromium.args,
//       executablePath: await chromium.executablePath || process.env.CHROME_EXECUTABLE_PATH,
//       headless: true,
//     })

//     // const browser = await chromium.launch()
//     const page = await browser.newPage()

//     // 第二步：加载网页并等待 DOM 准备就绪
//     await page.goto(site)
//     await page.waitForLoadState('domcontentloaded')

//     // 第三步：将整个页面截图并保存为文件。png 格式比较清楚，但是文件比较大
//     await page.screenshot({
//       path: 'screenshots/previewSite.jpeg',
//       quality: 10, // 并将质量设置为 50%，只适用于 jpeg 格式
//     })

//     // 第四步：关闭浏览器
//     await browser.close()

//     const imageBuffer = fs.readFileSync('screenshots/previewSite.jpeg')

//     // 第五步，转成 base64
//     const base64String = Buffer.from(imageBuffer).toString('base64')
//     // const blob = new Blob([imageBuffer], { type: 'image/jpeg' })
//     // const blobUrl = URL.createObjectURL(blob)
//     // eslint-disable-next-line no-console
//     console.log('截图已打印')

//     return {
//       status: 200,
//       info: '截图已打印',
//       data: {
//         url: 'screenshots/previewSite.jpeg',
//         base64String: `data:image/previewSite.jpeg;base64,${base64String}`,
//         // blobUrl,
//       },
//     }
//   }
//   catch (error) {
//     return {
//       status: 500,
//       info: (error as any).toString(),
//       data: {
//         url: '',
//         base64String: '',
//       },
//     }
//   }
// }
