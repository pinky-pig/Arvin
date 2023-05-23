// const chromium = require('chrome-aws-lambda')
// const playwright = require('playwright-core')

exports.handler = async function (event, context) {
  // const path = await chromium.executablePath
  // // eslint-disable-next-line no-console
  // console.log(path, 'executablePath')

  // const browser = await playwright.chromium.launch()
  // const page = await browser.newPage()

  // await page.goto('https://spacejelly.dev/')

  // const title = await page.title()
  // const description = await page.$eval('meta[name="description"]', element => element.content)

  // await browser.close()

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     status: 'Ok',
  //     page: {
  //       title,
  //       description,
  //     },
  //   }),
  // }
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'Ok',
      page: {},
    }),
  }
}
