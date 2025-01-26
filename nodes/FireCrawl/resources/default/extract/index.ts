import { INodePropertyOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
  name: 'Extract',
  value: 'extract',
  description: 'Extract structured data from web pages',
  action: 'Extract data',
};

export * from './hooks';
export * from './properties';