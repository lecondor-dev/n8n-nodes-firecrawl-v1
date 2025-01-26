import { INodeProperties } from 'n8n-workflow';

export const properties: INodeProperties[] = [
  {
    displayName: 'URLs',
    name: 'urls',
    type: 'string',
    typeOptions: {
      multipleValues: true,
      multipleValueButtonText: 'Add URL',
    },
    default: '',
    required: true,
    description: 'Enter one or more URLs to extract data from. Use wildcards (e.g., example.com/*) to crawl entire domains or sections.',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['extractData'],
      },
    },
  },
  {
    displayName: 'Extract Type',
    name: 'extractType',
    type: 'options',
    options: [
      {
        name: 'Simple Prompt (Recommended)',
        value: 'prompt',
        description: 'Use natural language to describe what data to extract',
      },
      {
        name: 'JSON Schema',
        value: 'schema',
        description: 'Define exact structure of data to extract',
      },
    ],
    default: 'prompt',
    description: 'Choose between using a simple prompt or detailed JSON schema for data extraction',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['extractData'],
      },
    },
  },
  {
    displayName: 'Prompt',
    name: 'prompt',
    type: 'string',
    typeOptions: {
      rows: 4,
    },
    default: 'Extract the following information:\n- Product name and price\n- Main features and benefits\n- Customer ratings if available\n- Contact information',
    placeholder: 'Describe what information you want to extract...',
    description: 'Describe in natural language what data you want to extract. Be specific about the information you need.',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['extractData'],
        extractType: ['prompt'],
      },
    },
  },
  {
    displayName: 'Schema',
    name: 'schema',
    type: 'json',
    default: `{
  "product": {
    "name": "string",
    "price": "number",
    "currency": "string"
  },
  "features": ["string"],
  "specifications": {
    "dimensions": "string",
    "weight": "string",
    "color": "string"
  },
  "ratings": {
    "average_score": "number",
    "total_reviews": "number"
  },
  "availability": "boolean",
  "last_updated": "string"
}`,
    description: 'Define the structure of data to extract using a JSON schema. Use "string", "number", "boolean", or arrays ([]) for lists.',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['extractData'],
        extractType: ['schema'],
      },
    },
  },
  {
    displayName: 'Enable Web Search',
    name: 'enableWebSearch',
    type: 'boolean',
    default: false,
    description: 'Whether the extraction can follow relevant links to gather additional context and information',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['extractData'],
      },
    },
  },
];