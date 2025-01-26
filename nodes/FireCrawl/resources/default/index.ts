import { INodeProperties, INodePropertyOptions } from 'n8n-workflow'
import { runHooks } from './hooks'

import * as submitACrawlJob from './submit-a-crawl-job'
import * as checkCrawlJobStatus from './check-crawl-job-status'
import * as crawlUrlWithWebsocketMonitoring from './crawl-url-with-websocket-monitoring'
import * as submitACrawlJobWithAWebhook from './submit-a-crawl-job-with-a-webhook'
import * as scrapeAUrlAndGetItsContent from './scrape-a-url-and-get-its-content'
import * as mapAWebsiteAndGetUrls from './map-a-website-and-get-urls'
import * as batchScrape from './batch-scrape'
import * as extract from './extract'

const operations: INodePropertyOptions[] = [
  extract.option,
  submitACrawlJob.option,
  checkCrawlJobStatus.option,
  crawlUrlWithWebsocketMonitoring.option,
  submitACrawlJobWithAWebhook.option,
  scrapeAUrlAndGetItsContent.option,
  mapAWebsiteAndGetUrls.option,
  batchScrape.option,
]

export const name = 'Default'

const operationSelect: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['Default'],
    },
  },
  options: operations,
  default: 'Extract',
}

export const rawProperties: INodeProperties[] = [
  operationSelect,
  ...extract.properties,
  ...submitACrawlJob.properties,
  ...checkCrawlJobStatus.properties,
  ...crawlUrlWithWebsocketMonitoring.properties,
  ...submitACrawlJobWithAWebhook.properties,
  ...scrapeAUrlAndGetItsContent.properties,
  ...mapAWebsiteAndGetUrls.properties,
  ...batchScrape.properties,
]

const { properties, methods } = runHooks(rawProperties)

export { properties, methods }
