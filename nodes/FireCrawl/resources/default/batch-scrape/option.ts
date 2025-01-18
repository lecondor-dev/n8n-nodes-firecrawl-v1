import { INodePropertyOptions } from 'n8n-workflow'

export const option: INodePropertyOptions = {
  name: 'Batch Scrape',
  value: 'Batch Scrape',
  description: 'Submit multiple URLs for scraping in a single request',
  action: 'Batch scrape multiple URLs',
}