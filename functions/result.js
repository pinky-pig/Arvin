const chromium = require('chrome-aws-lambda')

exports.handler = async (event, context) => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  })

  const page = await browser.newPage()

  await page.goto('https://spacejelly.dev/', { waitUntil: 'networkidle2' })

  const screenshot = await page.screenshot({ encoding: 'binary' })

  await browser.close()

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'Ok',
      page: {
        title: '66',
        description: '77',
      },
    }),
  }
}
