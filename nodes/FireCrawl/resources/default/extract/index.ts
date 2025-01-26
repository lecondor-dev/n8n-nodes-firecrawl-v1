import { runHooks } from './hooks';
import { properties as rawProperties } from './properties';

export const option = {
  name: '🔍 Extract Data (AI)',
  value: 'Extract',
  description: 'Extract structured data from any webpage using AI',
  action: 'Extract structured data',
  details: 'Automatically extract structured data from webpages using either simple prompts or JSON schemas. Perfect for gathering product information, company details, or any other structured web data.',
};

const { properties } = runHooks(rawProperties);

export { properties };