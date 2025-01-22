import { runHooks } from './hooks';
import { properties as rawProperties } from './properties';

export const option = {
  name: 'Extract Data',
  value: 'Extract',
  description: 'Extract structured data from URLs using prompts or schemas',
  action: 'Extract data from URLs',
};

const { properties } = runHooks(rawProperties);

export { properties };