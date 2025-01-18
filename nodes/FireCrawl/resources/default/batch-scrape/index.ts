import { IExecuteFunctions } from 'n8n-workflow'
import { properties } from './properties'
import { option } from './option'

export { properties, option }

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function execute(this: IExecuteFunctions) {
  const items = this.getInputData()
  const returnData = []

  for (let i = 0; i < items.length; i++) {
    try {
      const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as Record<string, unknown>
      
      // Make API call
      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: '/batch/scrape',
        body: {
          urls: this.getNodeParameter('urls', i) as string[],
          webhook: this.getNodeParameter('webhook', i, '') as string,
          formats: this.getNodeParameter('formats', i, []) as string[],
          onlyMainContent: additionalOptions.onlyMainContent,
          waitFor: additionalOptions.waitFor,
          mobile: additionalOptions.mobile,
          skipTlsVerification: additionalOptions.skipTlsVerification,
          timeout: additionalOptions.timeout,
          removeBase64Images: additionalOptions.removeBase64Images,
          ignoreInvalidURLs: additionalOptions.ignoreInvalidURLs,
          includeTags: additionalOptions.includeTags,
          excludeTags: additionalOptions.excludeTags,
          headers: additionalOptions.headers,
        },
      })

      // Get batch scrape ID from response
      const { id } = response

      // Poll for results if no webhook is specified
      if (!this.getNodeParameter('webhook', i, '')) {
        let status = 'scraping'
        let result

        while (status === 'scraping') {
          // Wait 2 seconds between polls
          await sleep(2000)

          // Check batch scrape status
          result = await this.helpers.httpRequest({
            method: 'GET',
            url: `/batch/scrape/${id}`,
          })

          status = result.status
        }

        if (status === 'completed') {
          returnData.push(result)
        } else {
          throw new Error('Batch scrape failed')
        }
      } else {
        // If webhook is specified, return the initial response
        returnData.push(response)
      }
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({ error: error.message })
        continue
      }
      throw error
    }
  }

  return this.prepareOutputData(returnData)
}