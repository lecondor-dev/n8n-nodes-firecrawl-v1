import { INodePropertyOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
  name: 'Extract',
  value: 'Extract',  // Changed to match the displayName casing
  description: 'Extract structured data from web pages',
  action: 'Extract data',
};

export * from './hooks';
export * from './properties';