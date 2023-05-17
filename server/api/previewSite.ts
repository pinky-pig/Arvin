import chromium from 'chrome-aws-lambda'

export default defineEventHandler(async () => {
  const res = await takeScreenshot()
  return res || {
    url: '',
    base64String: '',
    buffer: [],
  }
})

async function takeScreenshot(site = 'https://www.baidu.com') {
  const path = await chromium.executablePath

  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })

    const page = await browser.newPage()

    await page.goto('https://www.baidu.com', { waitUntil: 'networkidle2' })

    const screenshot = await page.screenshot({ encoding: 'binary' })

    await browser.close()

    return {
      status: 200,
      info: screenshot,
      data: {
        url: '',
        base64String: '',
        buffer: screenshot,
      },
    }
  }
  catch (error) {
    return {
      status: 500,
      info: (error as any).toString(),
      data: {
        url: '',
        base64String: '',
        buffer: [],
      },
    }
  }

  // return {
  //   status: 500,
  //   info: path.toString(),
  //   data: {
  //     url: '',
  //     base64String: '',
  //   },
  // }

  // try {
  //   // 启动 Chromium 浏览器
  //   // 第一步：启动浏览器并打开新页面

  //   const browser = await playwright.chromium.launch({
  //     args: chromium.args,
  //     executablePath: path,
  //     // executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  //     headless: chromium.headless,
  //   })

  //   // const browser = await chromium.launch()
  //   const page = await browser.newPage()

  //   // 第二步：加载网页并等待 DOM 准备就绪
  //   await page.goto(site)
  //   await page.waitForLoadState('domcontentloaded')

  //   // 第三步：将整个页面截图并保存为文件。png 格式比较清楚，但是文件比较大
  //   await page.screenshot({
  //     path: 'screenshots/previewSite.jpeg',
  //     quality: 10, // 并将质量设置为 50%，只适用于 jpeg 格式
  //   })

  //   // 第四步：关闭浏览器
  //   await browser.close()

  //   const imageBuffer = fs.readFileSync('screenshots/previewSite.jpeg')

  //   // 第五步，转成 base64
  //   const base64String = Buffer.from(imageBuffer).toString('base64')
  //   // const blob = new Blob([imageBuffer], { type: 'image/jpeg' })
  //   // const blobUrl = URL.createObjectURL(blob)
  //   // eslint-disable-next-line no-console
  //   console.log('截图已打印')

  //   return {
  //     status: 200,
  //     info: `截图已打印${path.toString()}`,
  //     data: {
  //       url: 'screenshots/previewSite.jpeg',
  //       base64String: `data:image/previewSite.jpeg;base64,${base64String}`,
  //       // blobUrl,
  //     },
  //   }
  // }
  // catch (error) {
  //   return {
  //     status: 500,
  //     info: (error as any).toString() + path.toString(),
  //     data: {
  //       url: '',
  //       base64String: '',
  //     },
  //   }
  // }
}
